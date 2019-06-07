namespace models.player {
    import HttpServiceProxy = nets.HttpServiceProxy;

    export class PlayerInfoModel {
        /** VO 数据类 */
        static playerInfo: PlayerInfoVO;

        /** 服务器返回的数据 */
        static receiveData: any;
        /** 请求前自带的数据 */
        static takeData: any;

        private static _instance: PlayerInfoModel;

        static callback: Function;  

        constructor() {
            PlayerInfoModel.playerInfo = new PlayerInfoVO();

        }

        static get instance(): PlayerInfoModel {
            if (!PlayerInfoModel._instance)
                PlayerInfoModel._instance = new PlayerInfoModel();
            return PlayerInfoModel._instance;
        }

        /** 请求玩家账号 */
        request_getUserID() :void{
            HttpServiceProxy.request("",null,this.getUserId);
        }

        /** 请求玩家数据信息 */
        // request_getUserInfo(): void {
        //     HttpServiceProxy.request("getUserInfo", { 'sf': IdentityConfig.uid }, this.getUserInfoOverFn, IdentityConfig.uid);
        // }

        getUserId(receiveData?:any):void{
            
        }

        /**
         * 注意(this)：此回调函数的作用域已不再是 PlayerInfoModel 类本身，可能是 [object Window]
         */
        // private getUserInfoOverFn(receiveData?: any, takeData?: any): void {
        //     if (receiveData)
        //         PlayerInfoModel.receiveData = receiveData;
        //     if (takeData)
        //         PlayerInfoModel.takeData = takeData;

        //     if (PlayerInfoModel.callback)
        //         PlayerInfoModel.callback();
        // }

        static dispose(): void {
            this.callback = null;
            this.receiveData = null;
            this.takeData = null;

        }

    }
}