namespace views.events {

    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;

    export class AwardsView extends ui.action.HistoryViewUI {

        private awardArr: Array<Object> = ResourceManager.awardsArr;
        private curAwardArr: Array<Object>;
        private infoArr: Array<any>;
        private tauchNum: number = -1;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private winAuthorArr: Array<Object>;  //获奖作者集合

        constructor(topFansObj: Object, topSubsObj: Object, topNatureObj: Object, topIncomeObj: Object, bottomNatureObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.initPage();
            this.title.text = "颁奖典礼";
            this.closeBtn.label = "确定";
            this.historyLabel.text = "这次的XX大奖我们也获得了提名,颁奖典礼马上要开始了，我们也去看看吧";
            if (GameConfig.authorInfoArr.length > 0) {
                if (topFansObj == null) {
                    this.storageInfoTwo();
                } else {
                    this.storageInfo(topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj);
                }
            } else {
                this.storageInfoTwo();
            }
            this.judgeName();
            this.addMask();
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
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

        /** 判断是否自己文章中奖 */
        judgeName(): void {
            let nameStrArr: Array<string> = new Array<string>();
            nameStrArr.splice(0, nameStrArr.length);
            for (let i: number = 0; i < this.curAwardArr.length; i++) {
                let wawObj: Object = this.curAwardArr[i];
                nameStrArr.push(wawObj["opus"]);
            }
            if (GameConfig.articalNameArr.length > 0) {
                for (var index = 0; index < GameConfig.articalNameArr.length; index++) {
                    let pageName: string = GameConfig.articalNameArr[index];
                    if (nameStrArr.indexOf(pageName) != -1) {
                        GameConfig.isMyPageAward = true;
                    }
                }
            }
        }

        storageInfo(topFansObj: Object, topSubsObj: Object, topNatureObj: Object, topIncomeObj: Object, bottomNatureObj: Object): void {
            this.curAwardArr = new Array<Object>();
            this.winAuthorArr = new Array<Object>();
            this.infoArr = new Array<any>();
            for (let i = 0; i < this.awardArr.length; i++) {
                let awardObj: Object = this.awardArr[i];
                if (awardObj["session"] == GameConfig.sessionNum) {
                    this.curAwardArr.push(awardObj);
                }
            }
            for (let j: number = 0; j < this.curAwardArr.length; j++) {
                let obj: Object = this.curAwardArr[j];
                let num1Arr: Array<number> = obj["num1"];
                let num2: number = obj["num2"];
                let name: string = obj["name"];
                let curInfoArr: Array<string> = new Array<string>();
                if (name == "最佳新人奖") {
                    curInfoArr.push(name);
                    if (topFansObj["yearFans"] > num1Arr[0] && topFansObj["yearCollect"] > num1Arr[1]) {
                        curInfoArr.push(topFansObj["pageName"]);
                        topFansObj["winName"] = name;
                        this.winAuthorArr.push(topFansObj);
                    } else {
                        curInfoArr.push(obj["opus"]);
                    }
                    this.infoArr.push(curInfoArr);
                } else if (name == "最佳人气奖") {
                    curInfoArr.push(name);
                    if (topSubsObj["yearSubs"] > num1Arr[num1Arr.length - 1]) {
                        curInfoArr.push(topSubsObj["pageName"]);
                        topSubsObj["winName"] = name;
                        this.winAuthorArr.push(topSubsObj);
                    } else {
                        curInfoArr.push(obj["opus"]);
                    }
                    this.infoArr.push(curInfoArr);
                } else if (name == "最佳文学奖") {
                    curInfoArr.push(name);
                    if (topNatureObj["yearNature"] > num1Arr[num1Arr.length - 1]) {
                        curInfoArr.push(topNatureObj["pageName"]);
                        topNatureObj["winName"] = name;
                        this.winAuthorArr.push(topNatureObj);
                    } else {
                        curInfoArr.push(obj["opus"]);
                    }
                    this.infoArr.push(curInfoArr);
                } else if (name == "首富奖") {
                    curInfoArr.push(name);
                    if (topIncomeObj["yearIncome"] > num1Arr[num1Arr.length - 1]) {
                        curInfoArr.push(topIncomeObj["pageName"]);
                        topIncomeObj["winName"] = name;
                        this.winAuthorArr.push(topIncomeObj);
                    } else {
                        curInfoArr.push(obj["opus"]);
                    }
                    this.infoArr.push(curInfoArr);
                } else if (name == "最烂文学奖") {
                    curInfoArr.push(name);
                    if (bottomNatureObj["yearNature"] < num2) {
                        curInfoArr.push(bottomNatureObj["pageName"]);
                    } else {
                        curInfoArr.push(obj["opus"]);
                    }
                    this.infoArr.push(curInfoArr);
                }
                if (IdentityConfig.isFirstWin == false) {
                    if (this.winAuthorArr.length > 0) {
                        var data4 = this.winAuthorArr.sort(this.compare('id'));
                        let curObj: Object = data4[0];
                        IdentityConfig.isFirstWin = true;
                        IdentityConfig.firstWinAuthor = curObj["name"];
                        IdentityConfig.firstWinPageName = curObj["pageName"];
                        IdentityConfig.firstWinName = curObj["winName"];
                        IdentityConfig.firstWinPlatname = curObj["platStr"];
                        GameConfig.cachData["isFirstWin"] = IdentityConfig.isFirstWin;
                        GameConfig.cachData["firstWinAuthor"] = IdentityConfig.firstWinAuthor;
                        GameConfig.cachData["firstWinPageName"] = IdentityConfig.firstWinPageName;
                        GameConfig.cachData["firstWinName"] = IdentityConfig.firstWinName;

                    }
                }
            }
        }

        compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
        }

        storageInfoTwo(): void {
            this.curAwardArr = new Array<Object>();
            this.infoArr = new Array<any>();

            for (let i = 0; i < this.awardArr.length; i++) {
                let awardObj: Object = this.awardArr[i];
                if (awardObj["session"] == GameConfig.sessionNum) {
                    this.curAwardArr.push(awardObj);
                }
            }
            for (var j = 0; j < this.curAwardArr.length; j++) {
                let curInfoArr: Array<string> = new Array<string>();
                let obj: Object = this.curAwardArr[j];
                let name: string = obj["name"];
                curInfoArr.push(name);
                curInfoArr.push(obj["opus"]);
                this.infoArr.push(curInfoArr);
            }
        }

        initPage(): void {
            this.historyLabel.visible = true;
            this.pageName.visible = false;
            this.awardTitle.visible = false;
        }

        resetPage(): void {
            this.historyLabel.visible = false;
            this.pageName.visible = true;
            this.awardTitle.visible = true;
        }

        closeView(): void {
            if (this.tauchNum >= this.infoArr.length - 1) {
                this.tauchNum = -1;
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
                //TODO:榜上有名
                if (GameConfig.achiArr[4] == null || GameConfig.achiArr[4] == '') {
                    for (var i: number = 0; i < GameConfig.articalNameArr.length; i++) {
                        for (var j: number = 0; j < this.infoArr.length; j++) {
                            if (GameConfig.articalNameArr[i] == this.infoArr[j][1]) {
                                GameConfig.isMyPageAward = true;
                                let avchidata: Array<Object> = managers.ResourceManager.achiveGoldArr;
                                var achive: views.events.AchiEvent = new views.events.AchiEvent(4)
                                GameConfig.winAwardNum = GameConfig.winAwardNum + 1;
                                // break;
                            }
                        }
                    }
                }
                Hash.playMusic(2);
            } else {
                this.resetPage();
                this.tauchNum += 1;
                this.awardTitle.text = "获得本次" + this.infoArr[this.tauchNum][0] + "的作品是："
                this.pageName.text = "《" + this.infoArr[this.tauchNum][1] + "》"
            }
        }
    }
}