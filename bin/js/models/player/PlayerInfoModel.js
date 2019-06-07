var models;
(function (models) {
    var player;
    (function (player) {
        var HttpServiceProxy = nets.HttpServiceProxy;
        var PlayerInfoModel = /** @class */ (function () {
            function PlayerInfoModel() {
                PlayerInfoModel.playerInfo = new player.PlayerInfoVO();
            }
            Object.defineProperty(PlayerInfoModel, "instance", {
                get: function () {
                    if (!PlayerInfoModel._instance)
                        PlayerInfoModel._instance = new PlayerInfoModel();
                    return PlayerInfoModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            /** 请求玩家账号 */
            PlayerInfoModel.prototype.request_getUserID = function () {
                HttpServiceProxy.request("", null, this.getUserId);
            };
            /** 请求玩家数据信息 */
            // request_getUserInfo(): void {
            //     HttpServiceProxy.request("getUserInfo", { 'sf': IdentityConfig.uid }, this.getUserInfoOverFn, IdentityConfig.uid);
            // }
            PlayerInfoModel.prototype.getUserId = function (receiveData) {
            };
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
            PlayerInfoModel.dispose = function () {
                this.callback = null;
                this.receiveData = null;
                this.takeData = null;
            };
            return PlayerInfoModel;
        }());
        player.PlayerInfoModel = PlayerInfoModel;
    })(player = models.player || (models.player = {}));
})(models || (models = {}));
//# sourceMappingURL=PlayerInfoModel.js.map