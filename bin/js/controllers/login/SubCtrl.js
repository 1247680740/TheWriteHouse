var controllers;
(function (controllers) {
    var login;
    (function (login) {
        /** 提交获奖用户信息相关控制器 */
        var SubCtrl = /** @class */ (function () {
            function SubCtrl() {
                if (!SubCtrl.loginModel)
                    SubCtrl.loginModel = models.login.LoginModel.getInstance();
                if (!SubCtrl.loginView)
                    SubCtrl.loginView = new views.common.LoginView();
                if (!SubCtrl.loginToolBarView)
                    SubCtrl.loginToolBarView = new views.toolbar.LoginToolBarView();
                if (!SubCtrl.phoneLoginView)
                    SubCtrl.phoneLoginView = new views.toolbar.PhoneLoginView();
            }
            SubCtrl.getInstance = function () {
                if (!SubCtrl.instance)
                    SubCtrl.instance = new SubCtrl();
                return this.instance;
            };
            /** 获取验证码 */
            SubCtrl.prototype.getCode = function (nums) {
                SubCtrl.loginModel.request_getCode(nums);
            };
            /** 获取快速游戏临时账号 */
            SubCtrl.prototype.getTemporaryID = function () {
                models.login.LoginModel.callback = this.fastGame;
                SubCtrl.loginModel.request_getTemporaryID();
            };
            /** 获取玩家在全服排位 */
            SubCtrl.prototype.getPlayerQueueNumber = function (nums) {
                models.login.LoginModel.callback = this.fastGame;
                SubCtrl.loginModel.request_getPlayerQueueNumber(nums);
            };
            /** 游戏存档 */
            SubCtrl.prototype.request_savaData = function (data) {
                models.login.LoginModel.call = this.savaSuccess;
                SubCtrl.loginModel.request_savaData(data);
            };
            SubCtrl.prototype.fastGame = function (receiveData) {
                SubCtrl.loginView.fastGameView(null);
            };
            SubCtrl.prototype.savaSuccess = function () {
            };
            return SubCtrl;
        }());
        login.SubCtrl = SubCtrl;
    })(login = controllers.login || (controllers.login = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=SubCtrl.js.map