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
    var layers;
    (function (layers) {
        var BaseView = views.base.BaseView;
        var GameConfig = configs.GameConfig;
        /**
         * UI层（存放各个场景中的通用UI，也用于切换场景）
         */
        var UILayer = /** @class */ (function (_super) {
            __extends(UILayer, _super);
            function UILayer() {
                var _this = _super.call(this) || this;
                _this.topToolBarView = views.toolbar.TopToolBarView.getInstance();
                _this.topToolBarView.x = 0;
                _this.topToolBarView.y = 0;
                _this.addChild(_this.topToolBarView);
                _this.topToolBarView.resetMoney(GameConfig.money);
                _this.topToolBarView.resetFans(GameConfig.fans);
                _this.topToolBarView.resetHole(GameConfig.brainHole);
                _this.timerBackView = views.common.TimeBackView.instance;
                _this.timerBackView.x = (Laya.stage.width - _this.timerBackView.width) / 2;
                _this.timerBackView.y = _this.topToolBarView.height;
                _this.rightToolBarView = views.toolbar.RightToolBarView.getInstance();
                _this.rightToolBarView.x = (Laya.stage.width - _this.rightToolBarView.width);
                _this.rightToolBarView.y = Laya.stage.height / 3 - 100;
                _this.addChild(_this.timerBackView);
                _this.addChild(_this.rightToolBarView);
                return _this;
            }
            Object.defineProperty(UILayer, "instance", {
                get: function () {
                    if (!UILayer._instance)
                        UILayer._instance = new UILayer();
                    return UILayer._instance;
                },
                enumerable: true,
                configurable: true
            });
            UILayer.prototype.init = function (event) {
                _super.prototype.init.call(this);
            };
            return UILayer;
        }(BaseView));
        layers.UILayer = UILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=UILayer.js.map