namespace views.player {

    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;
    import AuthorTrainItemUI = ui.player.AuthorTrainItemUI;
    import AuthorIconItemUI = ui.player.AuthorIconItemUI;

    export class PlayerTrainView extends ui.player.AuthorTrainUI {

        private trainArr: Array<Object> = ResourceManager.trainArr;
        private curAuthorArr: Array<Object>;

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private isFirst: boolean = true;
        private ProNum: number = 0;
        
        constructor() {
            super();
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.addMask();
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            /** 给两个Panel赋值 */
            this.setPanelData();
            /** 作者属性赋值 */
            let newObj: Object = this.curAuthorArr[0];
            this.initView(newObj);
            /** 重置项目状态 */
            this.resetPanelStatus();
            SceneLayerManager.sceneLayer.stopEvent();
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "playerTrainViewMask";
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

        /** 给两个Panel赋值 */
        setPanelData(): void {
            let posArr: Array<number> = new Array<number>();
            this.curAuthorArr = new Array<Object>();
            posArr.splice(0, posArr.length);
            this.curAuthorArr.splice(0, this.curAuthorArr.length);

            if (!this.trainArr)
                return;
            this.trainPanel.removeChildren(0, this.trainPanel.numChildren - 1);
            this.authorPanel.removeChildren(0, this.trainPanel.numChildren - 1);
            this.trainPanel.vScrollBarSkin = "";
            this.authorPanel.hScrollBarSkin = "";
            let len: number = this.trainArr.length;
            let i: number;
            for (i = 0; i < len; i++) {
                let trainObj: Object = this.trainArr[i];
                let gridItem: AuthorTrainItemUI = new AuthorTrainItemUI();
                gridItem.ProAc.value = 0;
                gridItem.ProAc.visible = false;
                gridItem.name = trainObj["name"];
                gridItem.proName.text = trainObj["name"];
                gridItem.costNum.text = trainObj["cost"] + "";
                switch (trainObj["time"]) {
                    case 1:
                        this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                        break;
                    case 2:
                        this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                        break;
                    case 3:
                        this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                        break;
                    case 4:
                        this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                        break;
                    case 5:
                        for (let i: number = 1; i < 6; i++) {
                            let img: Laya.Image = gridItem.getChildByName("time" + i) as Laya.Image;
                            img.visible = true;
                            img.skin = "gameUI/AuthorData/cube_green.png";
                        }
                        break;
                }

                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                this.trainPanel.addChild(gridItem);
                // 点击每一项
                gridItem.on(Laya.Event.CLICK, this, this.gridItemClked, [trainObj]);
                gridItem.on(Laya.Event.DOUBLE_CLICK, this, this.showProAc, [trainObj]);
            }
            /** 添加作者列表 */
            for (let n: number = 0; n < GameConfig.authorInfoArr.length; n++) {
                let obj: Object = GameConfig.authorInfoArr[n];
                posArr.push(obj["authorPosY"]);
            }

            posArr = posArr.sort();
            for (let m: number = 0; m < posArr.length; m++) {
                let posNum: number = posArr[m];
                for (let d: number = 0; d < GameConfig.authorInfoArr.length; d++) {
                    let authorObj: Object = GameConfig.authorInfoArr[d];
                    if (authorObj["authorPosY"] == posNum) {
                        this.curAuthorArr.push(authorObj);
                    }
                }
            }

            for (let j: number = 0; j < this.curAuthorArr.length; j++) {
                let authorObj: Object = this.curAuthorArr[j];
                let iconGridItem: AuthorIconItemUI = new AuthorIconItemUI();
                iconGridItem.name = authorObj["name"];
                iconGridItem.icon.skin = authorObj["icon"];
                iconGridItem.iconBg.skin = "gameUI/AuthorData/q_0" + authorObj["quality"] + ".png";
                iconGridItem.x = j * (iconGridItem.width + 10);
                iconGridItem.y = 2;
                this.authorPanel.addChild(iconGridItem);
                iconGridItem.on(Laya.Event.CLICK, this, this.checkAuthor, [authorObj]);
            }
        }

        initView(newObj: Object): void {
            let authorIconItemUI: AuthorIconItemUI = this.authorPanel.getChildByName(newObj["name"]) as AuthorIconItemUI;
            this.passAddAtr.visible = false;
            this.preAddStr.visible = false;
            this.disAddStr.visible = false;
            this.curAddStr.visible = false;
            /** 选择作者背景改变 */
            for (let index = 0; index < this.curAuthorArr.length; index++) {
                let obj: Object = this.curAuthorArr[index];
                let authorIconItemUI: AuthorIconItemUI = this.authorPanel.getChildByName(obj["name"]) as AuthorIconItemUI;
                authorIconItemUI.selectBg.visible = false;
            }
            authorIconItemUI.selectBg.visible = true;
            authorIconItemUI.selectBg.skin = "gameUI/AuthorData/select.png";
            /** 给作者属性赋值 */
            this.icon.skin = newObj["icon"];
            this.AuthorName.text = newObj["name"];
            this.passion.value = parseInt(newObj["passionMin"]) / 100;
            this.preciseness.value = parseInt(newObj["precisenessMin"]) / 100;
            this.discipline.value = parseInt(newObj["disciplineMin"]) / 100;
            this.curious.value = parseInt(newObj["curiousMin"]) / 100
            let surLevel: number = 7 - (newObj["yearLeave"] - 1);
            for (let k: number = 1; k < 8; k++) {
                let img: Laya.Image = this.getChildByName("day" + k) as Laya.Image;
                img.skin = "gameUI/AuthorData/cube_grey.png";
            }
            if (newObj["yearLeave"] > 0) {
                for (let l: number = surLevel; l < 8; l++) {
                    let imgc1: Laya.Image = this.getChildByName("day" + l) as Laya.Image;
                    imgc1.skin = "gameUI/AuthorData/cube_green.png";
                }
            }
        }

        initViewTwo(newObjTwo: Object): void {
            let authorIconItemUI: AuthorIconItemUI = this.authorPanel.getChildByName(newObjTwo["name"]) as AuthorIconItemUI;
            this.passAddAtr.visible = false;
            this.preAddStr.visible = false;
            this.disAddStr.visible = false;
            this.curAddStr.visible = false;
            /** 选择作者背景改变 */
            for (let index = 0; index < this.curAuthorArr.length; index++) {
                let obj: Object = this.curAuthorArr[index];
                let authorIconItemUI: AuthorIconItemUI = this.authorPanel.getChildByName(obj["name"]) as AuthorIconItemUI;
                authorIconItemUI.selectBg.visible = false;
            }
            authorIconItemUI.selectBg.visible = true;
            authorIconItemUI.selectBg.skin = "gameUI/AuthorData/select.png";
            /** 给作者属性赋值 */
            this.icon.skin = newObjTwo["icon"];
            this.AuthorName.text = newObjTwo["name"];
            this.passion.value = parseInt(newObjTwo["passionMin"]) / 100;
            this.preciseness.value = parseInt(newObjTwo["precisenessMin"]) / 100;
            this.discipline.value = parseInt(newObjTwo["disciplineMin"]) / 100;
            this.curious.value = parseInt(newObjTwo["curiousMin"]) / 100
        }

        judgeTimeStatus(gridItem: AuthorTrainItemUI, len: number): void {
            for (let i: number = 1; i < 6; i++) {
                let img: Laya.Image = gridItem.getChildByName("time" + i) as Laya.Image;
                img.visible = false;
            }
            for (let index = 1; index < len; index++) {
                let img: Laya.Image = gridItem.getChildByName("time" + index) as Laya.Image;
                img.visible = true;
                img.skin = "gameUI/AuthorData/cube_green.png";
            }
        }

        gridItemClked(trainObj: Object): void {
            // 获取当前作者对象
            let curObj: Object = this.getCurAuthorObj();

            if (GameConfig.money < trainObj["cost"] || curObj["yearLeave"] < trainObj["time"]) {
                return;
            } else {
                for (let n: number = 0; n < this.trainArr.length; n++) {
                    let newTrainObj: Object = this.trainArr[n];
                    let authorTrainItemUI: AuthorTrainItemUI = this.trainPanel.getChildByName(newTrainObj["name"]) as AuthorTrainItemUI;
                    authorTrainItemUI.bigBg.skin = "gameUI/common/writeBg.png";
                }
                let authorTrainItemUITwo: AuthorTrainItemUI = this.trainPanel.getChildByName(trainObj["name"]) as AuthorTrainItemUI;
                authorTrainItemUITwo.bigBg.skin = "gameUI/AuthorData/green.png";
            }
            Hash.playMusic(2);
        }

        showProAc(trainObj: Object): void {
            // 获取当前作者对象
            let authorTrainItemUITwo: AuthorTrainItemUI = this.trainPanel.getChildByName(trainObj["name"]) as AuthorTrainItemUI;
            let curObj: Object = this.getCurAuthorObj();
            if (GameConfig.money < trainObj["cost"] || curObj["yearLeave"] < trainObj["time"] || authorTrainItemUITwo.ProAc.visible == true || this.ProNum > 0) {
                return;
            } else {
                this.ProNum += 1;
                let rate: number = Hash.countRate(trainObj["perfect"]);
                this.judgeYearLevel(trainObj);
                authorTrainItemUITwo.ProAc.value = 0;
                authorTrainItemUITwo.ProAc.visible = true;
                this.authorPanel.mouseEnabled = false;
                Laya.Tween.to(authorTrainItemUITwo.ProAc, { value: 1 }, 2000, null, Handler.create(this, this.resetProAc, [trainObj, rate]));
            }
            Hash.playMusic(2);
        }

        /** 进行年假数量计算 */
        judgeYearLevel(trainObj: Object): void {
            let newObj: Object = new Object();
            for (let i: number = 0; i < this.curAuthorArr.length; i++) {
                let author: Object = this.curAuthorArr[i];
                if (author["name"] == this.AuthorName.text) {
                    author["yearLeave"] = author["yearLeave"] - trainObj["time"];
                    newObj = author;
                }
            }
            let surLevel: number = 7 - (newObj["yearLeave"] - 1);
            for (let k: number = 1; k < 8; k++) {
                let img: Laya.Image = this.getChildByName("day" + k) as Laya.Image;
                img.skin = "gameUI/AuthorData/cube_grey.png";
            }
            if (newObj["yearLeave"] > 0) {
                for (let l: number = surLevel; l < 8; l++) {
                    let imgc1: Laya.Image = this.getChildByName("day" + l) as Laya.Image;
                    imgc1.skin = "gameUI/AuthorData/cube_green.png";
                }
            }
        }

        resetProAc(trainObj: Object, rate: number): void {
            let authorTrainItemUITwo: AuthorTrainItemUI = this.trainPanel.getChildByName(trainObj["name"]) as AuthorTrainItemUI;
            let addBuffArr: Array<Object> = new Array<Object>();
            let dataObj: Object = new Object();
            this.ProNum -= 1;
            authorTrainItemUITwo.ProAc.value = 0;
            authorTrainItemUITwo.ProAc.visible = false;

            /** 进行数据削减 */
            GameConfig.money = GameConfig.money - trainObj["cost"];
            views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);

            for (let i: number = 0; i < this.curAuthorArr.length; i++) {
                let author: Object = this.curAuthorArr[i];
                if (author["name"] == this.AuthorName.text) {
                    let buffArr: Array<number> = trainObj["buff"];
                    let valueArr: Array<number> = trainObj["value"];

                    if (author["yearLeave"] == 0) {
                        for (let n: number = 0; n < this.trainArr.length; n++) {
                            let newTrainObj: Object = this.trainArr[n];
                            let authorTrainItemUI: AuthorTrainItemUI = this.trainPanel.getChildByName(newTrainObj["name"]) as AuthorTrainItemUI;
                            authorTrainItemUI.bigBg.skin = "gameUI/common/writeBg.png";
                        }
                    }

                    dataObj["passionMin"] = 0;
                    dataObj["precisenessMin"] = 0;
                    dataObj["disciplineMin"] = 0;
                    dataObj["curiousMin"] = 0;

                    for (let n: number = 0; n < buffArr.length; n++) {
                        let buff: number = buffArr[n];
                        let random: number = Hash.getRandomNum(1, valueArr[n]);
                        switch (buff) {
                            case 1:
                                if (author["passionMin"] != 100) {
                                    if (rate == 1) {
                                        author["passionMin"] += valueArr[n];
                                        dataObj["passionMin"] = valueArr[n]
                                    } else {
                                        author["passionMin"] += random;
                                        dataObj["passionMin"] = random;
                                    }
                                }
                                break;
                            case 2:
                                if (author["precisenessMin"] != 100) {
                                    if (rate == 1) {
                                        author["precisenessMin"] += valueArr[n];
                                        dataObj["precisenessMin"] = valueArr[n];
                                    } else {
                                        author["precisenessMin"] += random;
                                        dataObj["precisenessMin"] = random;
                                    }
                                }
                                break;
                            case 3:
                                if (author["disciplineMin"] != 100) {
                                    if (rate == 1) {
                                        author["disciplineMin"] += valueArr[n];
                                        dataObj["disciplineMin"] = valueArr[n];
                                    } else {
                                        author["disciplineMin"] += random;
                                        dataObj["disciplineMin"] = random;
                                    }
                                }
                                break;
                            case 4:
                                if (author["curiousMin"] != 100) {
                                    if (rate == 1) {
                                        author["curiousMin"] += valueArr[n];
                                        dataObj["curiousMin"] = valueArr[n];
                                    } else {
                                        author["curiousMin"] += random;
                                        dataObj["curiousMin"] = random;
                                    }
                                }
                                break;
                        }
                    }
                    addBuffArr.push(dataObj);
                }
            }
            let retObj: Object = this.getAuthorObj();
            this.initViewTwo(retObj);
            this.resetAddTip(addBuffArr);
            this.resetPanelStatus();

            if (rate == 1) {
                TipLayerManager.tipLayer.showDrawBgTip("PERFECT!!!!");
            }
            this.authorPanel.mouseEnabled = true;
        }

        resetAddTip(addBuffArr: Array<Object>): void {
            let buffObj: Object = addBuffArr[addBuffArr.length - 1];
            let key: string;
            for (key in buffObj) {
                let randomNum: number = buffObj[key];
                switch (key) {
                    case "passionMin":
                        if (randomNum > 0) {
                            this.passAddAtr.visible = true;
                            this.passAddAtr.text = "+" + randomNum;
                        }
                        break;
                    case "precisenessMin":
                        if (randomNum > 0) {
                            this.preAddStr.visible = true;
                            this.preAddStr.text = "+" + randomNum;
                        }
                        break;
                    case "disciplineMin":
                        if (randomNum > 0) {
                            this.disAddStr.visible = true;
                            this.disAddStr.text = "+" + randomNum;
                        }
                        break;
                    case "curiousMin":
                        if (randomNum > 0) {
                            this.curAddStr.visible = true;
                            this.curAddStr.text = "+" + randomNum;
                        }
                        break;
                }
            }
        }

        resetPanelStatus(): void {
            let name: string = this.AuthorName.text;
            let newObj: Object = this.getCurAuthorObj();

            for (let i = 0; i < this.trainArr.length; i++) {
                let trainObj: Object = this.trainArr[i];
                let item: AuthorTrainItemUI = this.trainPanel.getChildByName(trainObj["name"]) as AuthorTrainItemUI;
                if (GameConfig.money < trainObj["cost"]) {
                    item.costNum.color = "#DE5246";
                } else {
                    item.costNum.color = "#585656";
                }
                if (newObj["yearLeave"] < trainObj["time"]) {
                    for (let d: number = 1; d < 6; d++) {
                        let img: Laya.Image = item.getChildByName("time" + d) as Laya.Image;
                        if (img.visible == true) {
                            img.skin = "gameUI/AuthorData/cube_grey.png";
                        }
                    }
                } else {
                    for (let d: number = 1; d < 6; d++) {
                        let img: Laya.Image = item.getChildByName("time" + d) as Laya.Image;
                        if (img.visible == true) {
                            img.skin = "gameUI/AuthorData/cube_green.png";
                        }
                    }
                }
            }

        }

        checkAuthor(authorObj: Object): void {
            this.initView(authorObj);
            this.resetPanelStatus();
            Hash.playMusic(2);
        }

        /** 获取选中的条目对应的作者对象 */
        getAuthorObj(): Object {
            for (let o: number = 0; o < GameConfig.authorInfoArr.length; o++) {
                let authObj: Object = GameConfig.authorInfoArr[o];
                if (authObj["name"] == this.AuthorName.text) {
                    return authObj;
                }
            }
        }

        /** 获取选中的条目对应的this.curAuthorArr中的作者对象 */
        getCurAuthorObj(): Object {
            for (let j: number = 0; j < this.curAuthorArr.length; j++) {
                let authObj: Object = this.curAuthorArr[j];
                if (authObj["name"] == this.AuthorName.text) {
                    return authObj;
                }
            }
        }

        closeView(): void {
            GameConfig.displayPage -= 1;
            Laya.stage.removeChild(this);
            Laya.stage.removeChildByName("playerTrainViewMask");
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