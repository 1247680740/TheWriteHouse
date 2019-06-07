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
    var action;
    (function (action) {
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var OperaSelectItemView = /** @class */ (function (_super) {
            __extends(OperaSelectItemView, _super);
            function OperaSelectItemView(infoObj) {
                var _this = _super.call(this) || this;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.addMask();
                _this.attributeBtn.on(Laya.Event.CLICK, _this, _this.startAttribute, [infoObj]);
                _this.addEleBtn.on(Laya.Event.CLICK, _this, _this.startAdd, [infoObj]);
                _this.ReleaseBtn.on(Laya.Event.CLICK, _this, _this.startRelease, [infoObj]);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backView, [infoObj]);
                return _this;
            }
            OperaSelectItemView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "OperaItemMaskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            /** 加载属性优化界面 */
            OperaSelectItemView.prototype.startAttribute = function (infoObj) {
                this.backView();
                this.attributeView = new views.action.AttributeView(infoObj);
                SceneLayerManager.sceneLayer.addChild(this.attributeView);
            };
            OperaSelectItemView.prototype.startAdd = function (infoObj) {
                this.backView();
                this.addEleView = new views.action.AddEleView(infoObj);
                SceneLayerManager.sceneLayer.addChild(this.addEleView);
            };
            OperaSelectItemView.prototype.startRelease = function (infoObj) {
                this.backView();
                this.releaseView = new views.action.ReleaseView(infoObj);
                this.releaseView.name = "releaseView";
                SceneLayerManager.sceneLayer.addChild(this.releaseView);
            };
            OperaSelectItemView.prototype.backView = function () {
                SceneLayerManager.sceneLayer.removeChildByName("OperaItemMaskView");
                SceneLayerManager.sceneLayer.removeChild(this);
            };
            OperaSelectItemView.prototype.backMainView = function (infoObj) {
                this.backView();
                this.operaTingView = new views.action.OperaTingView(infoObj);
                this.operaTingView.name = infoObj["name"] + "ope";
                SceneLayerManager.sceneLayer.addChild(this.operaTingView);
            };
            return OperaSelectItemView;
        }(ui.action.OperaSelectItemUI));
        action.OperaSelectItemView = OperaSelectItemView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=OperaSelectItemView.js.map