namespace controllers.player {
    import PlayerInfoModel = models.player.PlayerInfoModel;
    import EventDispatcher = laya.events.EventDispatcher;
	/**
	* 玩家信息控制器
	*/
    export class PlayerInfoCtrl {
        static playerInfoModel: PlayerInfoModel = PlayerInfoModel.instance;
        static eventDispatcher: EventDispatcher = new EventDispatcher();

        private static _instance: PlayerInfoCtrl;

		/**
		 * 玩家信息是否初始化完成
		 */
        isPlayerInfoInited: boolean = false;

        constructor() {
            // if (!PlayerInfoCtrl.playerInfoView)
            //     PlayerInfoCtrl.playerInfoView = new views.player.PlayerInfoView();
        }

        static get instance(): PlayerInfoCtrl {
            if (!PlayerInfoCtrl._instance)
                PlayerInfoCtrl._instance = new PlayerInfoCtrl();
            return PlayerInfoCtrl._instance;
        }

        /** 获取玩家UID */
        request_getUID():void{
            PlayerInfoModel.instance.request_getUserID();
        }

        /** 请求玩家信息数据 */
        // request_getUserInfo(): void {
        //     PlayerInfoModel.callback = this.getUserInfoOver;
        //     PlayerInfoModel.instance.request_getUserInfo();
        // }

        /** 数据的填充，玩家信息的显示 */
        // getUserInfoOver(): void {
        //     if (!PlayerInfoCtrl.playerInfoModel)
        //         return;

        //     if (!this.isPlayerInfoInited) {
        //         if (!PlayerInfoCtrl.eventDispatcher)
        //             PlayerInfoCtrl.eventDispatcher = new EventDispatcher();
        //         PlayerInfoCtrl.eventDispatcher.event(HttpConfig.SERVER_CONNECTED);	// 登录成功 !
        //     }
        //     this.isPlayerInfoInited = true;
        // }


        /** model 数据的清理 */
        static disposeModel(): void {
            PlayerInfoModel.dispose();

        }

    }
}