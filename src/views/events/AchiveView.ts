namespace views.events {

    import Event = Laya.Event;
    import TalentChildView = views.events.TalentChildView;
    import Sprite = Laya.Sprite;
    import HitArea = Laya.HitArea;
    export class AchiveView extends ui.event.AchiveViewUI {

        private talentChildView: TalentChildView;
        private achiItem: views.events.AchiItem;
        private statusChange: boolean = true;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor() {
            super();
            let achiveView: views.events.AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as views.events.AchiveView;
            if ( achiveView ){ //防止重复添加
                return
            }
            Laya.stage.removeChildByName("maskView");
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            SceneLayerManager.sceneLayer.stopEvent();
            this.addMask();
            this.name = "achiveView";
            this.visible = true;
            SceneLayerManager.sceneLayer.addChild(this);
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.pointTip.text = "剩余点数：" + GameConfig.hasTalentPoint;
            this.talentBtn.skin = "gameUI/common/button_off.png";
            this.avchiBtn.skin = "gameUI/common/button_on.png";
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.talentBtn.on(Laya.Event.CLICK, this, this.showTalent);
            this.avchiBtn.on(Laya.Event.CLICK, this, this.showAchiView);
            views.events.AchiItem.getInstance().createList();
        }
        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "maskView";
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
        changeStatus(name: string): void {
            switch (name) {
                case "talentBtn":
                    this.talentBtn.skin = "gameUI/common/button_on.png";
                    this.avchiBtn.skin = "gameUI/common/button_off.png";
                    break;
                case "avchiBtn":
                    this.talentBtn.skin = "gameUI/common/button_off.png";
                    this.avchiBtn.skin = "gameUI/common/button_on.png";
                    break;
            }
        }

        showTalent(event: Event): void {
            if (this.statusChange) {
                this.statusChange = false;
                let achiveView: views.events.AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as views.events.AchiveView;
                views.events.AchiItem.getInstance().changeStatus();
                let name: string = event.target.name;
                this.changeStatus(name);
                this.addTalentChildView();
                let talentChildView: views.events.TalentChildView = this.getChildByName("talentChildView") as views.events.TalentChildView;
                talentChildView.visible = true;
                Hash.playMusic(2);
            } else {
                return;
            }
        }


        showAchiView(event: Event): void {
            if (!this.statusChange) {
                this.statusChange = true;
                let achiveView: views.events.AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as views.events.AchiveView;
                let name: string = event.target.name;
                this.changeStatus(name);
                views.events.AchiItem.getInstance().createList();
                if (achiveView.getChildByName("talentChildView") != null) {
                    let testList: Laya.List = this.getChildByName("achi_list") as Laya.List;
                    let talentChildView: views.events.TalentChildView = this.getChildByName("talentChildView") as views.events.TalentChildView;
                    views.events.AchiItem.getInstance().changeTrue();
                    talentChildView.visible = false;
                }
                Hash.playMusic(2);
            } else {
                return;
            }
        }

        addTalentChildView(): void {
            GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                GameConfig.unlockIDArr.push(everyObj["level"]);
            }
            this.talentChildView = views.events.TalentChildView.getInstance();
            this.talentChildView.name = "talentChildView";
            this.addChild(this.talentChildView);
        }

        closeView(): void {
            GameConfig.isFistUnlock = true;
            GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                GameConfig.unlockIDArr.push(everyObj["level"]);
            }
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            SceneLayerManager.sceneLayer.removeChild(this);
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
            this.talentChildView = views.events.TalentChildView.getInstance();
            this.talentChildView.initData();
            this.talentChildView.removeSelf();
            let addtal = views.events.AddTalentView.getInstance();
            addtal.removeSelf();
            Hash.playMusic(2);
        }
    }
}