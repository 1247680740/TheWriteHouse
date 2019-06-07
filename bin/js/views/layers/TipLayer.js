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
        * 游戏弹出层
        * 弹出UI层，不会隐藏，嵌入 TipManager 中，将弹出框添加至 TipLayer 后进行显示
        */
        var TipLayer = /** @class */ (function (_super) {
            __extends(TipLayer, _super);
            function TipLayer() {
                var _this = _super.call(this) || this;
                _this.name = "TipLayer";
                _this.isCheck = true;
                _this.zOrder = 99999;
                _this.updateZOrder();
                _this.on(Laya.Event.ADDED, _this, _this.addedFn);
                _this.on(Laya.Event.COMPONENT_ADDED, _this, _this.compAddedFn);
                return _this;
            }
            TipLayer.prototype.addedFn = function () {
                console.log("==== TipLayer,addedFn() ");
            };
            TipLayer.prototype.compAddedFn = function () {
                console.log("==== TipLayer,compAddedFn() ");
            };
            TipLayer.getInstance = function () {
                if (!TipLayer.instance)
                    TipLayer.instance = new TipLayer();
                return TipLayer.instance;
            };
            /**
             * 显示带有不同背景的信息提示
             */
            TipLayer.prototype.showDrawBgTip = function (info, pos) {
                if (!info)
                    return;
                var tip = views.common.DrawBgTip.instance;
                tip.cacheAs = "bitmap";
                if (!this.getChildByName("drawBgTip")) {
                    tip.name = "drawBgTip";
                    this.addChild(tip);
                }
                tip.visible = true;
                tip.showTip(info);
                if (pos) {
                    tip.x = pos.x;
                    tip.y = pos.y;
                }
                else {
                    tip.x = GameConfig.GAME_WINDOW_WIDTH - tip.width >> 1;
                    tip.y = GameConfig.GAME_WINDOW_HEIGHT - tip.height >> 1;
                }
            };
            return TipLayer;
        }(BaseView));
        layers.TipLayer = TipLayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=TipLayer.js.map