var controllers;
(function (controllers) {
    var player;
    (function (player) {
        var PlayerInfoModel = models.player.PlayerInfoModel;
        var EventDispatcher = laya.events.EventDispatcher;
        /**
        * 玩家信息控制器
        */
        var PlayerInfoCtrl = /** @class */ (function () {
            function PlayerInfoCtrl() {
                /**
                 * 玩家信息是否初始化完成
                 */
                this.isPlayerInfoInited = false;
                // if (!PlayerInfoCtrl.playerInfoView)
                //     PlayerInfoCtrl.playerInfoView = new views.player.PlayerInfoView();
            }
            Object.defineProperty(PlayerInfoCtrl, "instance", {
                get: function () {
                    if (!PlayerInfoCtrl._instance)
                        PlayerInfoCtrl._instance = new PlayerInfoCtrl();
                    return PlayerInfoCtrl._instance;
                },
                enumerable: true,
                configurable: true
            });
            /** 获取玩家UID */
            PlayerInfoCtrl.prototype.request_getUID = function () {
                PlayerInfoModel.instance.request_getUserID();
            };
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
            PlayerInfoCtrl.disposeModel = function () {
                PlayerInfoModel.dispose();
            };
            PlayerInfoCtrl.playerInfoModel = PlayerInfoModel.instance;
            PlayerInfoCtrl.eventDispatcher = new EventDispatcher();
            return PlayerInfoCtrl;
        }());
        player.PlayerInfoCtrl = PlayerInfoCtrl;
    })(player = controllers.player || (controllers.player = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=PlayerInfoCtrl.js.map