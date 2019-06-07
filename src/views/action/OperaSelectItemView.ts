namespace views.action {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import Sprite = Laya.Sprite;

    export class OperaSelectItemView extends ui.action.OperaSelectItemUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private operaTingView: views.action.OperaTingView;
        private attributeView: views.action.AttributeView;
        private addEleView: views.action.AddEleView;
        private releaseView: views.action.ReleaseView;
        
        constructor(infoObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.addMask();
            this.attributeBtn.on(Laya.Event.CLICK, this, this.startAttribute, [infoObj]);
            this.addEleBtn.on(Laya.Event.CLICK, this, this.startAdd, [infoObj]);
            this.ReleaseBtn.on(Laya.Event.CLICK, this, this.startRelease, [infoObj]);
            this.backBtn.on(Laya.Event.CLICK, this, this.backView, [infoObj]);
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "OperaItemMaskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);
            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);
            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;
        }

        /** 加载属性优化界面 */
        startAttribute(infoObj:Object): void {
            this.backView();
            this.attributeView = new views.action.AttributeView(infoObj);
            SceneLayerManager.sceneLayer.addChild(this.attributeView);
        }

        startAdd(infoObj:Object): void {
            this.backView();
            this.addEleView = new views.action.AddEleView(infoObj);
            SceneLayerManager.sceneLayer.addChild(this.addEleView);
        }
        startRelease(infoObj:Object): void {
            this.backView();
            this.releaseView = new views.action.ReleaseView(infoObj);
            this.releaseView.name = "releaseView";
            SceneLayerManager.sceneLayer.addChild(this.releaseView);
        }

        backView(): void {
            SceneLayerManager.sceneLayer.removeChildByName("OperaItemMaskView");
            SceneLayerManager.sceneLayer.removeChild(this);
        }

        backMainView(infoObj:Object): void {
            this.backView();
            this.operaTingView = new views.action.OperaTingView(infoObj);
            this.operaTingView.name = infoObj["name"] + "ope";
            SceneLayerManager.sceneLayer.addChild(this.operaTingView);
        }

    }

}