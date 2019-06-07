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
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var MaskAreView = /** @class */ (function (_super) {
            __extends(MaskAreView, _super);
            function MaskAreView() {
                var _this = _super.call(this) || this;
                _this.drawMask();
                return _this;
            }
            MaskAreView.prototype.drawMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.5;
                if (GameConfig.authorInfoArr.length > 0) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height - list.height, "#000000");
                }
                else {
                    maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                }
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            return MaskAreView;
        }(Sprite));
        common.MaskAreView = MaskAreView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=MaskAreView.js.map