namespace views.player {

    import Event = Laya.Event;
    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;
    import AuthorJobIconItemUI = ui.player.AuthorJobIconItemUI;

    export class PlayerWritingListView extends ui.player.AuthorWritingUI {

        private enableWriting: Array<Object>;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private writingView: views.action.WritingView;
        private posArr: Array<number>;
        private curAuthorArr: Array<Object>;

        constructor() {
            super();
            this.x = (Laya.stage.width - this.width) / 2;
            this.y = (Laya.stage.height - this.height) / 2;
            this.addMask();
            this.init();
            this.closeBtn.on(Laya.Event.CLICK, this, this.removeView);
        }

        /** 添加遮罩 */
        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "playerWritingListMask";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            Laya.stage.addChild(this.guideContainer);
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

        /** 初始化页面 */
        init(): void {
            this.enableWriting = new Array<Object>();
            this.curAuthorArr = new Array<Object>();
            this.posArr = new Array<number>();
            this.enableWriting.splice(0, this.enableWriting.length);
            this.curAuthorArr.splice(0, this.curAuthorArr.length);
            this.posArr.splice(0, this.posArr.length);

            /** 获取可写作者列表并赋值 */
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let curObj: Object = GameConfig.authorInfoArr[i];
                if (GameConfig.writingAuthor.indexOf(curObj["name"]) == -1) {
                    this.enableWriting.push(curObj);
                    this.posArr.push(curObj["authorPosY"]);
                }
            }
            this.posArr = this.posArr.sort();
            for (let n: number = 0; n < this.posArr.length; n++) {
                let posNum: number = this.posArr[n];
                for (let d: number = 0; d < this.enableWriting.length; d++) {
                    let authorObj: Object = this.enableWriting[d];
                    if (authorObj["authorPosY"] == posNum) {
                        this.curAuthorArr.push(authorObj);
                    }
                }
            }
            /** 给简历列表赋值 */
            for (let j: number = 0; j < this.curAuthorArr.length; j++) {
                let callObj: Object = this.curAuthorArr[j];
                let gridItem: AuthorJobIconItemUI = new AuthorJobIconItemUI();
                gridItem.delAuthor.mouseEnabled = false;
                gridItem.delAuthor.visible = false;
                gridItem.authorName.text = callObj["name"];
                gridItem.playerIcon.skin = callObj["icon"];
                gridItem.playerBg.skin = "gameUI/AuthorData/q_0" + callObj["quality"] + ".png";
                this.gridContainer.addChild(gridItem);
                if (j >= 4) {
                    gridItem.x = parseInt((j - 4) % 4 + "") * (gridItem.width + 25);
                    gridItem.y = (parseInt((j - 4) / 4 + "") + 1) * (gridItem.height + 20);
                }
                else {
                    gridItem.x = j * (gridItem.width + 10);
                }
                gridItem.playerIcon.on(Event.CLICK, this, this.startWriting, [callObj]);
            }
        }

        startWriting(curObj: Object): void {
            Laya.stage.removeChild(this);
            Laya.stage.removeChildByName("playerWritingListMask");
            this.writingView = new views.action.WritingView(curObj);
            this.writingView.name = "writingView";
            SceneLayerManager.sceneLayer.addChild(this.writingView);
        }

        removeView(): void {
            GameConfig.displayPage -= 1;
            Laya.stage.removeChild(this);
            Laya.stage.removeChildByName("playerWritingListMask");
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