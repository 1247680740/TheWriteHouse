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
        var LoginView = views.common.LoginView;
        var SubCtrl = controllers.login.SubCtrl;
        var LoginToolBarView = /** @class */ (function (_super) {
            __extends(LoginToolBarView, _super);
            function LoginToolBarView() {
                var _this = _super.call(this) || this;
                _this.phoneLogin.on(Laya.Event.CLICK, _this, _this.changeView);
                _this.fastGame.on(Laya.Event.CLICK, _this, _this.startFastGame);
                return _this;
            }
            /** 切换到手机号登陆界面 */
            LoginToolBarView.prototype.changeView = function () {
                if (Laya.LocalStorage.getItem("cachData") != null) {
                    GameConfig.cachData = JSON.parse(Laya.LocalStorage.getItem("cachData"));
                    if (GameConfig.cachData["userId"].length == 8) {
                        TipLayerManager.getInstance().initTip();
                        GameConfig.money = GameConfig.cachData["money"];
                        GameConfig.fans = GameConfig.cachData["fans"];
                        GameConfig.brainHole = GameConfig.cachData["brainHole"];
                        views.common.LoginView.getInstance().fastGameView(GameConfig.cachData);
                    }
                    else {
                        LoginView.getInstance().removeNode();
                    }
                }
                else {
                    LoginView.getInstance().removeNode();
                }
            };
            /**快速开始游戏 */
            LoginToolBarView.prototype.startFastGame = function () {
                /**请求临时账号 */
                if (Laya.LocalStorage.getItem("cachData") == null) {
                    this.loadAllLayer();
                    SubCtrl.getInstance().getTemporaryID();
                }
                else {
                    TipLayerManager.getInstance().initTip();
                    GameConfig.cachData = JSON.parse(Laya.LocalStorage.getItem("cachData"));
                    GameConfig.money = GameConfig.cachData["money"];
                    GameConfig.fans = GameConfig.cachData["fans"];
                    GameConfig.brainHole = GameConfig.cachData["brainHole"];
                    views.common.LoginView.getInstance().fastGameView(GameConfig.cachData);
                }
            };
            /** 登录成功后，加载各层视图，存储（初始化）相关数据 */
            LoginToolBarView.prototype.loadAllLayer = function () {
                TipLayerManager.getInstance().initTip();
                GameConfig.authorArr = new Array();
                GameConfig.platArr = new Array();
                GameConfig.subArr = new Array();
                GameConfig.eleArr = new Array();
                WritingConfig.enableHoleArr = new Array();
                GameConfig.authorArr = GameConfig.authorArr.concat(GameConfig.guding);
                GameConfig.platArr = GameConfig.platArr.concat(GameConfig.platGuDingArr);
                GameConfig.subArr = GameConfig.subArr.concat(GameConfig.subGuDingArr);
                GameConfig.eleArr = GameConfig.eleArr.concat(GameConfig.eleGuDingArr);
                WritingConfig.enableHoleArr = WritingConfig.enableHoleArr.concat(ResourceManager.holeArr);
                for (var i = 0; i < GameConfig.authorArr.length; i++) {
                    var authorObj = GameConfig.authorArr[i];
                    if (authorObj["special"] == 1) {
                        GameConfig.authorArr.splice(i, 1);
                        i--;
                    }
                }
                for (var j = 0; j < GameConfig.platArr.length; j++) {
                    var platObj = GameConfig.platArr[j];
                    if (platObj["id"] == 3 || platObj["id"] == 4) {
                        GameConfig.platArr.splice(j, 1);
                        j--;
                    }
                }
                for (var n = 0; n < GameConfig.subArr.length; n++) {
                    var subObj = GameConfig.subArr[n];
                    if (subObj["unlock"] == 0) {
                        GameConfig.subArr.splice(n, 1);
                        n--;
                    }
                }
                for (var m = 0; m < GameConfig.eleArr.length; m++) {
                    var eleObj = GameConfig.eleArr[m];
                    if (eleObj["unlock"] == 0) {
                        GameConfig.eleArr.splice(m, 1);
                        m--;
                    }
                }
                for (var d = 0; d < WritingConfig.enableHoleArr.length; d++) {
                    var holeObj = WritingConfig.enableHoleArr[d];
                    if (holeObj["event"] != 0) {
                        WritingConfig.enableHoleArr.splice(d, 1);
                        d--;
                    }
                }
                GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                GameConfig.cachData["platArr"] = GameConfig.platArr;
                GameConfig.cachData["subArr"] = GameConfig.subArr;
                GameConfig.cachData["eleArr"] = GameConfig.eleArr;
                GameConfig.cachData["enableHoleArr"] = WritingConfig.enableHoleArr;
                this.initData();
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
            };
            LoginToolBarView.prototype.initData = function () {
                GameConfig.cachData["year"] = GameConfig.year = 2001;
                GameConfig.cachData["month"] = GameConfig.month = 1;
                GameConfig.cachData["day"] = GameConfig.day = 1;
                GameConfig.cachData["money"] = GameConfig.money;
                GameConfig.cachData["fans"] = GameConfig.fans;
                GameConfig.cachData["brainHole"] = GameConfig.brainHole;
                GameConfig.cachData["homeFloor"] = GameConfig.homeFloor;
                GameConfig.cachData["finishFirstStep"] = true;
                GameConfig.cachData["curHisObj"] = {};
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                GameConfig.cachData["subTimeNum"] = GameConfig.subTimeNum;
                GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                GameConfig.cachData["eleNum"] = 0;
                GameConfig.cachData["subNum"] = 0;
                GameConfig.cachData["subTopNum"] = GameConfig.subTopNum;
                GameConfig.cachData["eleTopNum"] = GameConfig.eleTopNum;
                GameConfig.cachData["articalNameArr"] = GameConfig.articalNameArr;
                GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                GameConfig.cachData["hisObjArr"] = GameConfig.hisObjArr;
                GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                GameConfig.cachData["ReleaseObjArr"] = [];
                GameConfig.cachData["StartWritingObjArr"] = [];
                GameConfig.cachData["everyLevelArr"] = GameConfig.everyLevelArr;
                GameConfig.cachData["hasTalentPoint"] = GameConfig.hasTalentPoint;
                GameConfig.cachData["defHasTalentPoint"] = GameConfig.defHasTalentPoint;
                GameConfig.cachData["loanarr"] = GameConfig.loanarr;
                GameConfig.cachData["achiArr"] = GameConfig.achiArr;
                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                GameConfig.cachData["curJobBtnArr"] = IdentityConfig.curJobBtnArr;
                GameConfig.cachData["curjobPoint"] = IdentityConfig.curjobPoint;
                GameConfig.cachData["actPlotArr"] = WritingConfig.actPlotArr;
                GameConfig.cachData["actPlotObjArr"] = WritingConfig.actPlotObjArr;
                GameConfig.cachData["QueueNumber"] = GameConfig.QueueNumber;
                GameConfig.cachData["HistoryCompArr"] = GameConfig.HistoryCompArr;
            };
            return LoginToolBarView;
        }(ui.toolBar.LoginToolBarUI));
        toolbar.LoginToolBarView = LoginToolBarView;
    })(toolbar = views.toolbar || (views.toolbar = {}));
})(views || (views = {}));
//# sourceMappingURL=LoginToolBarView.js.map