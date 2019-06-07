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
    var common;
    (function (common) {
        var BtnView = /** @class */ (function (_super) {
            __extends(BtnView, _super);
            function BtnView() {
                var _this = _super.call(this) || this;
                _this.Btn1.on(Laya.Event.CLICK, _this, _this.addBtn1Click);
                _this.Btn2.on(Laya.Event.CLICK, _this, _this.addBtn2Click);
                return _this;
            }
            BtnView.prototype.addBtn1Click = function () {
                switch (this.Btn1.label) {
                    case "立即签约":
                        views.player.PlayerDialogView.getInstance().savaLoaclData();
                        break;
                    case "写作":
                        break;
                    default:
                        break;
                }
            };
            BtnView.prototype.addBtn2Click = function () {
                switch (this.Btn2.label) {
                    case "继续寻找":
                        this.authorArr = managers.ResourceManager.infoObjArr;
                        this.authorInfoObj = views.player.PlayerDialogView.getInstance().weight_rand(this.authorArr);
                        views.player.PlayerDialogView.getInstance().setInfoData(this.authorInfoObj);
                        break;
                    case "解约":
                        break;
                    default:
                        break;
                }
            };
            return BtnView;
        }(ui.player.BtnViewUI));
        common.BtnView = BtnView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=BtnView.js.map