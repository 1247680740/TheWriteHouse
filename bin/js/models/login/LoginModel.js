var models;
(function (models) {
    var login;
    (function (login) {
        /**
         * 提交数据模型层
         */
        var LoginModel = /** @class */ (function () {
            function LoginModel() {
            }
            LoginModel.getInstance = function () {
                if (!LoginModel.instance)
                    LoginModel.instance = new LoginModel();
                return this.instance;
            };
            /** 获取手机登录验证码及临时账号（nums:用户手机号） */
            LoginModel.prototype.request_getCode = function (nums) {
                HttpServiceProxy.request("phoneLogin.do", { "nums": nums }, this.getCode, { "nums": nums });
            };
            /** 获取快速开始游戏临时账号 */
            LoginModel.prototype.request_getTemporaryID = function () {
                HttpServiceProxy.request("getAccount.do", null, this.getTemporaryID);
            };
            /** 获取玩家本身排位 */
            LoginModel.prototype.request_getPlayerQueueNumber = function (nums) {
                if (nums == '1') {
                    HttpServiceProxy.request("getQueueNumber.do", { "status": 1, "nums": GameConfig.registerID });
                }
                else if (nums == '2') {
                    HttpServiceProxy.request("getQueueNumber.do", { "status": 2 });
                }
            };
            /** 存储数据 */
            LoginModel.prototype.request_savaData = function (data) {
                GameConfig.storageStr = JSON.stringify(data);
                HttpServiceProxy.request("onFile.do", { "data": data }, this.returnStatus);
            };
            LoginModel.prototype.getCode = function (receiveData) {
                this.receiveData = receiveData;
                var receOBJ = this.receiveData;
                GameConfig.fuwuStr = receOBJ["content"];
                GameConfig.registerID = receOBJ["account"];
                GameConfig.CodeNum = parseInt(receOBJ["num"]);
                GameConfig.cachData["userId"] = GameConfig.registerID;
                // this.request_getPlayerQueueNumber('1'); // 获取玩家编号排名
                GameConfig._calltype = 1;
                HttpServiceProxy.request("getQueueNumber.do", { "status": 1, "nums": GameConfig.registerID });
            };
            LoginModel.prototype.getTemporaryID = function (receiveData) {
                this.receiveData = receiveData;
                var key;
                var temporaryOBJ = this.receiveData;
                if (temporaryOBJ.hasOwnProperty("_api")) {
                    GameConfig.temporaryID = temporaryOBJ["account"];
                    GameConfig.cachData["userId"] = GameConfig.temporaryID;
                    // Laya.LocalStorage.setItem("cachData",JSON.stringify(GameConfig.cachData));
                }
                LoginModel.instance.handleCallback(temporaryOBJ);
                GameConfig._calltype = 2;
                HttpServiceProxy.request("getQueueNumber.do", { "status": 2 });
            };
            LoginModel.prototype.getPlayerQueueNumber = function (receiveData) {
                this.receiveData = receiveData;
                GameConfig.QueueNumber = this.receiveData['apartmentID'];
                GameConfig.cachData["QueueNumber"] = GameConfig.QueueNumber;
                if (GameConfig._calltype == 2) {
                    var authorworks = views.common.ApartInfoTbView.getInstance();
                    authorworks.flushWorksInfoUI();
                }
            };
            LoginModel.prototype.returnStatus = function (receiveData) {
            };
            LoginModel.prototype.handleCallback = function (takeData) {
                if (LoginModel.callback) {
                    if (takeData)
                        LoginModel.callback(takeData);
                    else
                        LoginModel.callback();
                }
            };
            /** 请求玩家在服务器编号方式 */
            LoginModel._calltype = 0;
            return LoginModel;
        }());
        login.LoginModel = LoginModel;
    })(login = models.login || (models.login = {}));
})(models || (models = {}));
//# sourceMappingURL=LoginModel.js.map