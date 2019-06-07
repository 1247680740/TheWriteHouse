namespace views.events {

    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;

    export class HistoryEventView extends ui.event.TriggerEventUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(hisObj: Object) {
            super();
            this.x = (Laya.stage.width - this.width) / 2;   //250;
            this.y = (Laya.stage.height - this.height) / 2;   //350;
            this.zOrder = 3;
            this.triggerBg.skin = "gameUI/event/newsIcon.png";
            this.paperLabel.visible =false;
            this.newsLabel.visible =true;
            this.getBtn.label = "收起报纸";
            this.addMask();
            this.resetData(hisObj);
            this.getBtn.on(Laya.Event.CLICK, this, this.closeView);
        }


        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "maskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 3;
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = false;
            }
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;

        }

        resetData(hisObj:Object) {
            GameConfig.hisObjArr.push(hisObj);
            GameConfig.cachData["hisObjArr"] = GameConfig.hisObjArr;
            for (let i:number = 0; i < ResourceManager.holeArr.length; i++) {
                let holeObj:Object = ResourceManager.holeArr[i];
                if(holeObj["event"] == hisObj["id"] && WritingConfig.enableHoleArr.indexOf(holeObj) == -1){
                    WritingConfig.enableHoleArr.push(holeObj);
                }
            }
            GameConfig.cachData["enableHoleArr"] = WritingConfig.enableHoleArr;
        }

        closeView(event: Laya.Event): void {
            event.stopPropagation();
            SceneLayerManager.sceneLayer.removeChild(this);
            GameConfig.displayPage -= 1;
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
            Hash.playMusic(2);
        }

    }
}