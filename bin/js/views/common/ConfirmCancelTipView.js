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
        var Event = laya.events.Event;
        var ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI;
        /**
         * 带有确定、取消按钮的提示框
         */
        var ConfirmCancelTipView = /** @class */ (function (_super) {
            __extends(ConfirmCancelTipView, _super);
            function ConfirmCancelTipView() {
                var _this = _super.call(this) || this;
                _this.name = "ConfirmCancelTipView";
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.visible = true;
                _this.confirmBtn.on(Event.CLICK, _this, _this.builderHome);
                _this.cancelBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                _this.closeBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                return _this;
            }
            ConfirmCancelTipView.getInstance = function () {
                if (!ConfirmCancelTipView.instance) {
                    ConfirmCancelTipView.instance = new ConfirmCancelTipView();
                }
                return ConfirmCancelTipView.instance;
            };
            ConfirmCancelTipView.prototype.builderHome = function (event) {
                event.stopPropagation();
                SceneLayerManager.sceneLayer.buildHome(2);
                this.cancelBtnFn();
            };
            ConfirmCancelTipView.prototype.cancelBtnFn = function () {
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                Laya.stage.removeChildByName("CancelTipView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return ConfirmCancelTipView;
        }(ConfirmCancelTipUI));
        common.ConfirmCancelTipView = ConfirmCancelTipView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ConfirmCancelTipView.js.map