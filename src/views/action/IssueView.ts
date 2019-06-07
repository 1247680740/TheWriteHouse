namespace views.action {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import Sprite = Laya.Sprite;

    export class IssueView extends ui.action.IssueViewUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private scoreView: views.action.ScoreView;
        private totalScoreView: views.action.TotalScoreView;
        private selectSingleDataView: views.action.SelectSingleDataView;

        constructor(infoObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.addMask();
            this.platLabel.on(Laya.Event.CLICK, this, this.selectSingleData);
            this.spaceLabel.on(Laya.Event.CLICK, this, this.selectSingleData);
            this.issueBtn.on(Laya.Event.CLICK, this, this.startIssue, [infoObj]);
            this.pageName.text = infoObj["pageName"];
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "IssueMaskView";
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

        selectSingleData(event: Laya.Event): void {
            let name: string = event.target.name;
            GameConfig.displayPage += 1;
            this.visible = false;
            this.selectSingleDataView = new views.action.SelectSingleDataView(name);
            SceneLayerManager.sceneLayer.addChild(this.selectSingleDataView);
            this.selectSingleDataView.pos((Laya.stage.width - this.selectSingleDataView.width) / 2, 250);
        }

        resetLabel(str: string): void {
            let view: views.action.IssueView = SceneLayerManager.sceneLayer.getChildByName("issueView") as views.action.IssueView;
            let platLabel: Laya.Label = view.getChildByName("platLabel") as Laya.Label;
            view.visible = true;
            platLabel.text = str;
        }

        resetPaceLabel(str: string): void {
            let view: views.action.IssueView = SceneLayerManager.sceneLayer.getChildByName("issueView") as views.action.IssueView;
            let spaceLabel: Laya.Label = view.getChildByName("spaceLabel") as Laya.Label;
            view.visible = true;
            spaceLabel.text = str;
        }

        startIssue(infoObj: Object): void {
            if (this.pageName.text == "" || this.platLabel.text == "点击选择" || this.spaceLabel.text == "点击选择") {
                TipLayerManager.tipLayer.showDrawBgTip("信息不完整无法发布");
            } else {
                let spaceNum: number;
                let randomNum: number = Hash.getRandomNum(60, 70);
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let auObj: Object = GameConfig.authorInfoArr[i];
                    if (auObj["name"] == infoObj["name"]) {
                        if (this.spaceLabel.text == "长篇") {
                            spaceNum = Hash.getRandomNum(750, 1250);
                        } else if (this.spaceLabel.text == "中篇") {
                            spaceNum = Hash.getRandomNum(400, 600);
                        } else if (this.spaceLabel.text == "短篇") {
                            spaceNum = Hash.getRandomNum(200, 300);
                        }
                        auObj["pageName"] = this.pageName.text;
                        auObj["platStr"] = this.platLabel.text;
                        auObj["spaceStr"] = this.spaceLabel.text;
                        auObj["spaceNum"] = spaceNum;   //篇幅数

                        auObj["releaseTime"] = randomNum;  //发布计时
                        auObj["releaseStartTime"] = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;  //发布时间
                        auObj["curStatus"] = 3;  //状态
                        auObj["totalGain"] = 0;  //总增益
                        auObj["totalCollect"] = 0;
                        auObj["totalSubs"] = 0;
                        auObj["totalIncom"] = 0;
                        auObj["operaNum"] = 3;
                        GameConfig.releaseTestObjArr.unshift(auObj);
                        GameConfig.cachData["ReleaseObjArr"] = GameConfig.releaseTestObjArr;  //发布作者数据集
                        SceneLayerManager.sceneLayer.removeChild(this);
                        SceneLayerManager.sceneLayer.removeChildByName("IssueMaskView");

                        /** 判断是否是第一次发布 */
                        if(IdentityConfig.isFirstIssuePage == false){
                            IdentityConfig.isFirstIssuePage = true;
                            IdentityConfig.isFirstAuthorName = auObj["name"];
                            IdentityConfig.isFirstPageName = auObj["pageName"];
                            IdentityConfig.isFirstPlatName = auObj["platStr"];
                            GameConfig.cachData["isFirstIssuePage"] = IdentityConfig.isFirstIssuePage;
                            GameConfig.cachData["isFirstAuthorName"] = IdentityConfig.isFirstAuthorName;
                            GameConfig.cachData["isFirstPageName"] = IdentityConfig.isFirstPageName;
                            GameConfig.cachData["isFirstPlatName"] = IdentityConfig.isFirstPlatName;
                        }
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
        }

        public createScoreTwo(obj: Object): void {
            let startDay: string = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
            let diffDays: number = Hash.dateDifference(obj["releaseStartTime"], startDay);

            if (diffDays == 60) {
                obj["totalGain"] = 0;
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let authorObj: Object = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == obj["name"]) {
                        authorObj["totalGain"] = 0;
                    }
                }
            }
            if (diffDays == 30) {
                SceneLayerManager.sceneLayer.stopEvent();
                GameConfig.displayPage += 1;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                    list.visible = false;
                }
                let curObj: Object = SceneLayerManager.sceneLayer.selectObj(obj);
                this.scoreView = new views.action.ScoreView(curObj);
                SceneLayerManager.sceneLayer.addChild(this.scoreView);

            }
        }
    }
}