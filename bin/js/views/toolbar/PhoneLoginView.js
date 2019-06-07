var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var toolbar;
    (function (toolbar) {
        var SubCtrl = controllers.login.SubCtrl;
        var PhoneLoginView = /** @class */ (function (_super) {
            __extends(PhoneLoginView, _super);
            function PhoneLoginView() {
                var _this = _super.call(this) || this;
                _this.flag = false;
                _this.message = "";
                _this.myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
                _this.timeNum = 60;
                _this.startGameBtn.mouseEnabled = false;
                _this.sendCode.on(Laya.Event.CLICK, _this, _this.getCode);
                _this.startGameBtn.on(Laya.Event.CLICK, _this, _this.startGame);
                return _this;
            }
            /** 获取验证码 */
            PhoneLoginView.prototype.getCode = function () {
                this.phoneNums = this.phoneNum.text;
                if (this.phoneNums == "") {
                    this.message = "手机号码不能为空！";
                    this.alertMessage(this.message);
                }
                else if (this.phoneNums.length != 11) {
                    this.message = "请输入11位手机号码！";
                    this.alertMessage(this.message);
                }
                else if (!this.myreg.test(this.phoneNums)) {
                    this.message = "请输入有效的手机号码！";
                    this.alertMessage(this.message);
                }
                else {
                    SubCtrl.getInstance().getCode(this.phoneNums);
                    Laya.timer.loop(1000, this, this.timerBack);
                }
            };
            /** 填充验证码倒计时 */
            PhoneLoginView.prototype.timerBack = function () {
                this.startGameBtn.mouseEnabled = true;
                this.sendCode.label = "";
                this.timeNum--;
                if (this.timeNum <= 0) {
                    Laya.timer.clearAll(this);
                    this.sendCode.mouseEnabled = true;
                    this.sendCode.label = "获取验证码";
                    this.timeNum = 60;
                }
                else {
                    this.sendCode.mouseEnabled = false;
                    this.sendCode.label = this.timeNum + "";
                }
            };
            /** 手机登录进入游戏判定 */
            PhoneLoginView.prototype.startGame = function () {
                if (this.code.text == "" || parseInt(this.code.text) != GameConfig.CodeNum) {
                    TipLayerManager.tipLayer.showDrawBgTip("验证码为空或不正确请重新输入", null);
                }
                else {
                    if (GameConfig.fuwuStr == "" || GameConfig.fuwuStr == null) {
                        views.toolbar.LoginToolBarView.prototype.loadAllLayer();
                        views.common.LoginView.prototype.fastGameView(null);
                    }
                    else {
                        TipLayerManager.getInstance().initTip();
                        var str = GameConfig.fuwuStr.replace(/\'/g, "\"");
                        GameConfig.cachData = JSON.parse(str);
                        GameConfig.money = GameConfig.cachData["money"];
                        GameConfig.fans = GameConfig.cachData["fans"];
                        GameConfig.brainHole = GameConfig.cachData["brainHole"];
                        views.common.LoginView.getInstance().fastGameView(GameConfig.cachData);
                    }
                }
            };
            /** 报错信息提示 */
            PhoneLoginView.prototype.alertMessage = function (mesage) {
                if (mesage != "") {
                    TipLayerManager.tipLayer.showDrawBgTip(mesage);
                }
            };
            return PhoneLoginView;
        }(ui.toolBar.PhoneLoginUI));
        toolbar.PhoneLoginView = PhoneLoginView;
    })(toolbar = views.toolbar || (views.toolbar = {}));
})(views || (views = {}));
//# sourceMappingURL=PhoneLoginView.js.map