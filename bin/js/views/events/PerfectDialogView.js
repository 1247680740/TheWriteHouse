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
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var PerfectDialogView = /** @class */ (function (_super) {
            __extends(PerfectDialogView, _super);
            function PerfectDialogView(obj) {
                var _this = _super.call(this) || this;
                _this.addMask();
                _this.perfectStr.text = obj["string"];
                _this.guideContainer.on(Laya.Event.CLICK, _this, _this.removeView);
                return _this;
            }
            PerfectDialogView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "perfectMaskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.guideContainer.addChild(this);
                this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, Laya.stage.width, Laya.stage.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            PerfectDialogView.prototype.removeView = function () {
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return PerfectDialogView;
        }(ui.dialog.PerfectDialogViewUI));
        events.PerfectDialogView = PerfectDialogView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=PerfectDialogView.js.map