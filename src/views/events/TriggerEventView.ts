namespace views.events {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import Sprite = Laya.Sprite;

    export class TriggerEventView extends ui.event.TriggerEventUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(trigerObj: Object) {
            super();
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.zOrder = 2;
            this.addMask();
            this.setValue(trigerObj);
            this.getBtn.on(Laya.Event.CLICK, this, this.removeView);
        }

        addMask() {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "trigerMaskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
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

        setValue(trigerObj: Object): void {
            let str: string = trigerObj["string"];
            if (trigerObj["showType"] == 0) {
                this.triggerBg.skin = "gameUI/event/newsIcon.png";
                this.getBtn.label = "收起报纸";
                this.newsLabel.visible = true;
                this.paperLabel.visible = false;
            } else {
                this.triggerBg.skin = "gameUI/event/paperIcon.png";
                this.getBtn.label = "收起信件";
                this.newsLabel.visible = false;
                this.paperLabel.visible = true;
            }
            if(trigerObj["reward"] == 1){
                GameConfig.money = GameConfig.money + trigerObj["value"];
                views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
            }else if(trigerObj["reward"] == 2){
                GameConfig.fans = GameConfig.fans + trigerObj["value"];
                views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
            }
            switch (trigerObj["id"]) {
                case 1:
                    str = str.replace("$公寓名称", GameConfig.ApartmentName);
                    this.newsLabel.text = str;
                    break;
                case 2:
                    str = str.replace("$首部作品名称", IdentityConfig.isFirstPageName);
                    this.newsLabel.text = str;
                    break;
                case 3:
                    str = str.replace(/\$公寓名称/g, GameConfig.ApartmentName);
                    str = str.replace(/\$作者名称/g, IdentityConfig.firstFinishAuthor);
                    str = str.replace(/\$平台名称/g, IdentityConfig.firstFinishPlatName);
                    str = str.replace(/\$作品名称/g, IdentityConfig.firstFinishPageName);
                    // str2 = str2.replace("$公寓名称", GameConfig.ApartmentName);
                    // str2 = str2.replace("$作者名称", IdentityConfig.firstFinishAuthor);
                    // str2 = str2.replace("$平台名称", IdentityConfig.firstFinishPlatName);
                    // str2 = str2.replace("$作品名称", IdentityConfig.firstFinishPageName);
                    this.newsLabel.text = str;
                    break;
                case 4:
                    str = str.replace("$作者名称", IdentityConfig.firstEnlistAuthor);
                    str = str.replace("$公寓名称", GameConfig.ApartmentName);
                    this.newsLabel.text = str;
                    break;
                case 5:
                    str = str.replace("$首部作品名称", IdentityConfig.isFirstPageName);
                    this.paperLabel.text = str;
                    break;
                case 6:
                    str = str.replace(/\$公寓名称/g, GameConfig.ApartmentName);
                    str = str.replace(/\$作者名称/g, IdentityConfig.firstWinAuthor);
                    str = str.replace(/\$平台名称/g, IdentityConfig.firstWinPlatname);
                    str = str.replace(/\$作品名称/g, IdentityConfig.firstWinPageName);
                    str = str.replace(/\$奖项名称/g, IdentityConfig.firstWinName);
                    this.newsLabel.text = str;
                    break;
            }
        }

        removeView(): void {
            SceneLayerManager.sceneLayer.removeChildByName("trigerMaskView");
            SceneLayerManager.sceneLayer.removeChild(this);
            GameConfig.displayPage -= 1;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }
    }
}