namespace controllers.login {

    import Event = laya.events.Event;
    import LoginModel = models.login.LoginModel;
    import LoginView = views.common.LoginView;
    import LoginToolBarView = views.toolbar.LoginToolBarView;
    import PhoneLoginView = views.toolbar.PhoneLoginView;

    /** 提交获奖用户信息相关控制器 */
    export class SubCtrl {
        private static instance: SubCtrl;
        private static loginModel:LoginModel;
        private static loginView:LoginView;
        private static loginToolBarView:LoginToolBarView;
        private static phoneLoginView:PhoneLoginView;

        constructor() {
            if(!SubCtrl.loginModel)
				SubCtrl.loginModel = models.login.LoginModel.getInstance();
            if(!SubCtrl.loginView)
                SubCtrl.loginView = new views.common.LoginView();
            if(!SubCtrl.loginToolBarView)
                SubCtrl.loginToolBarView = new views.toolbar.LoginToolBarView();
            if(!SubCtrl.phoneLoginView)
                SubCtrl.phoneLoginView = new views.toolbar.PhoneLoginView();
        }

        static getInstance(): SubCtrl {
            if (!SubCtrl.instance)
                SubCtrl.instance = new SubCtrl();
            return this.instance;
        }

        /** 获取验证码 */
        getCode(nums: string): void {
            SubCtrl.loginModel.request_getCode(nums);
        }

        /** 获取快速游戏临时账号 */
        getTemporaryID():void{
            models.login.LoginModel.callback = this.fastGame;
            SubCtrl.loginModel.request_getTemporaryID();
        }

        /** 获取玩家在全服排位 */
        getPlayerQueueNumber(nums:string):void{
            models.login.LoginModel.callback = this.fastGame;
            SubCtrl.loginModel.request_getPlayerQueueNumber(nums);
        }

        /** 游戏存档 */
        request_savaData(data:Object):void{
            models.login.LoginModel.call = this.savaSuccess;
            SubCtrl.loginModel.request_savaData(data);
        }

        fastGame(receiveData?:any):void{
            SubCtrl.loginView.fastGameView(null);
        }

        savaSuccess():void{
 
        }

    }
}