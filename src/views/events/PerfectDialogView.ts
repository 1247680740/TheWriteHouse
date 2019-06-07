namespace views.events {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import Sprite = Laya.Sprite;

    export class PerfectDialogView extends ui.dialog.PerfectDialogViewUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(obj: Object) {
            super();
            this.addMask();
            this.perfectStr.text = obj["string"];
            this.guideContainer.on(Laya.Event.CLICK, this, this.removeView);
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "perfectMaskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.guideContainer.addChild(this);
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, Laya.stage.width, Laya.stage.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;
        }

        removeView(): void {
            SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }
    }
}