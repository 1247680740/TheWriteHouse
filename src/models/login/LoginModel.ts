namespace models.login
{
    import SubCtrl = controllers.login.SubCtrl;

	/**
	 * 提交数据模型层
	 */
	export class LoginModel
	{

		private static instance:LoginModel;
		/** 服务器返回的数据 */
		receiveData: any;
		/** 请求前自带的数据 */
		takeData: any;
		/** 响应数据处理完毕回调 */
		static callback:Function;
		/** 请求玩家在服务器编号方式 */
		static _calltype:number = 0;
		constructor()
		{
            
		}

		static getInstance():LoginModel
		{
			if(!LoginModel.instance)
				LoginModel.instance = new LoginModel();
			return this.instance;
		}

		/** 获取手机登录验证码及临时账号（nums:用户手机号） */
        request_getCode(nums:string):void{
            HttpServiceProxy.request("phoneLogin.do",{"nums":nums},this.getCode,{"nums":nums});
        }

		/** 获取快速开始游戏临时账号 */
		request_getTemporaryID():void{
			HttpServiceProxy.request("getAccount.do",null,this.getTemporaryID);
		}

		/** 获取玩家本身排位 */
		request_getPlayerQueueNumber(nums:string):void{
			if ( nums == '1' ) { //手机注册
				HttpServiceProxy.request("getQueueNumber.do",{"status":1,"nums":GameConfig.registerID});
			}else if (nums == '2') { // 快速登陆 服务器直接+1
				HttpServiceProxy.request("getQueueNumber.do",{ "status":2 });
			}
		}

		/** 存储数据 */
		request_savaData(data:Object):void{
			GameConfig.storageStr = JSON.stringify(data);
			HttpServiceProxy.request("onFile.do",{"data":data},this.returnStatus);
		}

        getCode(receiveData?:any):void{
            this.receiveData = receiveData;
            let receOBJ:Object = this.receiveData;
			GameConfig.fuwuStr= receOBJ["content"];
            GameConfig.registerID = receOBJ["account"];
			GameConfig.CodeNum = parseInt(receOBJ["num"]);
			GameConfig.cachData["userId"] = GameConfig.registerID;
            // this.request_getPlayerQueueNumber('1'); // 获取玩家编号排名
			GameConfig._calltype = 1;
			HttpServiceProxy.request("getQueueNumber.do",{"status":1,"nums":GameConfig.registerID});
        }

		getTemporaryID(receiveData?:any):void{
			this.receiveData = receiveData;
			let key:string
			let temporaryOBJ:Object = this.receiveData;
			if (temporaryOBJ.hasOwnProperty("_api")) {
				GameConfig.temporaryID = temporaryOBJ["account"]
				GameConfig.cachData["userId"] = GameConfig.temporaryID;
				// Laya.LocalStorage.setItem("cachData",JSON.stringify(GameConfig.cachData));
			}
			LoginModel.instance.handleCallback(temporaryOBJ);
			GameConfig._calltype = 2;
			HttpServiceProxy.request("getQueueNumber.do",{"status":2});
		}
		
		getPlayerQueueNumber(receiveData?:any):void{
			this.receiveData = receiveData;
			GameConfig.QueueNumber = this.receiveData['apartmentID'];
			GameConfig.cachData["QueueNumber"] = GameConfig.QueueNumber;
			if (GameConfig._calltype == 2) {
				let authorworks = views.common.ApartInfoTbView.getInstance();
				authorworks.flushWorksInfoUI();
			}
		}

		returnStatus(receiveData?:any):void{

		}


		handleCallback(takeData?:any):void
		{
			if(LoginModel.callback)
			{
				if(takeData)
					LoginModel.callback(takeData);
				else
					LoginModel.callback();
			}
		}
	}
}