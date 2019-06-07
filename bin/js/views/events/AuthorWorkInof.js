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
    var events;
    (function (events) {
        var AuthorWorkInfo = /** @class */ (function (_super) {
            __extends(AuthorWorkInfo, _super);
            function AuthorWorkInfo() {
                var _this = _super.call(this) || this;
                _this.pos(((Laya.stage.width - _this.width) / 2) - 50, (Laya.stage.height - _this.height) / 2);
                _this.name = "authorInfo";
                _this.flushAuthorInfoUI();
                return _this;
            }
            AuthorWorkInfo.getInstance = function () {
                if (AuthorWorkInfo.instance == null) {
                    AuthorWorkInfo.instance = new AuthorWorkInfo();
                }
                return AuthorWorkInfo.instance;
            };
            AuthorWorkInfo.prototype.flushAuthorInfoUI = function () {
                this.aportname.text = GameConfig.ApartmentName;
                this.apartnum.text = GameConfig.QueueNumber.toString();
                this.homenum.text = (GameConfig.homeFloor).toString();
                this.athor.text = GameConfig.authorInfoArr.length.toString();
                this.worknum.text = GameConfig.articalNameArr.length.toString();
                this.awardnum.text = GameConfig.winAwardNum.toString();
                this.currmoney.text = GameConfig.money.toString();
                this.awradtotal.text = GameConfig.gainmoney.toString();
                this.fansnum.text = GameConfig.fans.toString();
                var onlinetime = Laya.Browser.now() - GameConfig.playtime;
                var curDate = new Date();
                var sec = Math.floor(onlinetime / 1000) % 60;
                var min = Math.floor(onlinetime / (1000 * 60)) % 60;
                var hour = Math.floor(onlinetime / (1000 * 3600)) % 3600;
                var _sec = sec >= 0 && sec < 10 ? '0' + sec : sec;
                var _min = min >= 0 && min < 10 ? '0' + min : min;
                var _hour = hour >= 0 && hour < 10 ? '0' + hour : hour;
                this.beintime.text = '' + _hour + ': ' + _min + ': ' + _sec;
            };
            AuthorWorkInfo.prototype.closeView = function () {
                // Laya.stage.removeChild(this);
                this.removeSelf();
            };
            return AuthorWorkInfo;
        }(ui.common.detailInfoUI));
        events.AuthorWorkInfo = AuthorWorkInfo;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AuthorWorkInof.js.map