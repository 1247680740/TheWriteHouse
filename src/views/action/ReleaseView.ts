namespace views.action {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import Sprite = Laya.Sprite;
    import BaseView = views.base.BaseView;

    export class ReleaseView extends ui.action.ReleaseUI {
        private static instance: ReleaseView;
        private selectReleaseData: views.action.SelectReleaseData;
        private selectConductView: views.action.SelectConductView;
        private scoreView: views.action.ScoreView;
        private totalScoreView: views.action.TotalScoreView;
        private operaTingView: views.action.OperaTingView;
        private platArr: Array<any>;
        private platObj: Object;
        private timeBack: number = 0;
        private writingTime: number = 0;
        private sexObjArr: Array<Object> = [];
        private ageObjArr: Array<Object> = [];
        private eduObjArr: Array<Object> = [];
        private hasObjArr: Array<Object> = [];
        private totalGain: number;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        public static viewObj: Object = new Object;

        constructor(infoObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.addMask();
            this.sexBtn.on(Laya.Event.CLICK, this, this.checkData);
            this.ageBtn.on(Laya.Event.CLICK, this, this.checkData);
            this.eduBtn.on(Laya.Event.CLICK, this, this.checkData);
            this.conductBtn.on(Laya.Event.CLICK, this, this.checkConduct);
            this.releaseBtn.on(Laya.Event.CLICK, this, this.release, [infoObj]);
            this.backBtn.on(Laya.Event.CLICK, this, this.backView, [infoObj]);
            let needMoney: number = GameConfig.sexMoney + GameConfig.ageMoney + GameConfig.eduMoney;
            this.moneyTip.text = "总共需要花费" + needMoney + "个金币";
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "ReleaseViewMaskView";
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


        checkData(event: Laya.Event): void {
            event.stopPropagation();
            let strArr: Array<string> = new Array<string>();
            strArr.splice(0, strArr.length);
            let name: string = event.target.name;
            let btn: Laya.Button = this.getChildByName(name) as Laya.Button;
            if (btn.label == "点击选择") {
                console.log("没有选择元素");
            } else {
                let btnLabel: string = btn.label + ",";
                strArr = btnLabel.split(",");
                for (let i = 0; i < strArr.length; i++) {
                    let testStr: string = strArr[i];
                    if (testStr == "") {
                        strArr.splice(i, 1);
                    }
                }
            }
            GameConfig.displayPage += 1;
            this.visible = false;
            this.selectReleaseData = new views.action.SelectReleaseData(name);
            SceneLayerManager.sceneLayer.addChild(this.selectReleaseData);
            this.selectReleaseData.pos((Laya.stage.width - this.selectReleaseData.width) / 2, (Laya.stage.height - this.selectReleaseData.height) / 2);  //300, 250
            this.selectReleaseData.setBg(name, strArr);
            Hash.playMusic(2);
        }

        resetDataView(eventName: string, selectStr: string): void {
            let view: views.action.ReleaseView = SceneLayerManager.sceneLayer.getChildByName("releaseView") as views.action.ReleaseView;
            let btn: Laya.Button = view.getChildByName(eventName) as Laya.Button;
            let conductBtn: Laya.Button = view.getChildByName("conductBtn") as Laya.Button;
            let labelBox: Laya.Box = view.getChildByName("labelBox") as Laya.Box;
            let moneyTip: Laya.Label = labelBox.getChildByName("moneyTip") as Laya.Label;
            view.visible = true;
            if (selectStr == "") {
                btn.label = "点击选择";
            } else {
                btn.label = selectStr;
            }
            let payMoney: number = this.juggePayMoney(conductBtn);
            moneyTip.text = "总共需要花费" + payMoney + "个金币";
        }

        /** 选择宣传方式 */
        checkConduct(): void {
            GameConfig.displayPage += 1;
            SceneLayerManager.sceneLayer.stopEvent();
            this.visible = false;
            this.selectConductView = new views.action.SelectConductView();
            SceneLayerManager.sceneLayer.addChild(this.selectConductView);
            this.selectConductView.pos((Laya.stage.width - this.selectConductView.width) / 2, (Laya.stage.height - this.selectConductView.height) / 2);  //300, 250
            this.selectConductView.setBg();
            Hash.playMusic(2);
        }

        resetDuctView(id: number): void {
            let view: views.action.ReleaseView = SceneLayerManager.sceneLayer.getChildByName("releaseView") as views.action.ReleaseView;
            let conductBtn: Laya.Button = view.getChildByName("conductBtn") as Laya.Button;
            let labelBox: Laya.Box = view.getChildByName("labelBox") as Laya.Box;
            let moneyTip: Laya.Label = labelBox.getChildByName("moneyTip") as Laya.Label;
            view.visible = true;
            conductBtn.label = GameConfig.conductArr[id];
            let payMoney: number = this.juggePayMoney(conductBtn);
            moneyTip.text = "总共需要花费" + payMoney + "个金币";
        }

        release(infoObj: Object): void {
            this.totalGain = 0;
            if (this.sexBtn.label == "点击选择" || this.ageBtn.label == "点击选择" || this.eduBtn.label == "点击选择" || this.conductBtn.label == "点击选择") {
                TipLayerManager.tipLayer.showDrawBgTip("信息不完整，无法发布");
            } else {
                this.setObjArrData();
                let totalMoney: number = GameConfig.sexMoney + GameConfig.ageMoney + GameConfig.eduMoney;

                /** 判断性别是否有增益 */
                this.judgeSex(this.sexBtn.label);
                /** 判断年龄是否有增益 */
                this.judgeAge(this.ageBtn.label);
                /** 判读学历是否有增益 */
                this.judgeEdu(this.eduBtn.label)
                /** 判别题材是否有增益 */
                this.totalGain = this.judgeSub(infoObj, this.hasObjArr);

                if (this.conductBtn.label == "引流推广") {
                    totalMoney = (1 + 0.5) * totalMoney;
                    this.totalGain = this.totalGain + 50;
                } else if (this.conductBtn.label == "精准投放") {
                    totalMoney = (1 + 1) * totalMoney;
                    this.totalGain = this.totalGain + 100;
                }
                let rateNum: number = this.getReleaseSub();
                totalMoney = Math.floor(totalMoney * rateNum);

                if (totalMoney > GameConfig.money) {
                    TipLayerManager.tipLayer.showDrawBgTip("你的金币不足");
                } else {
                    GameConfig.money = GameConfig.money - totalMoney;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);

                    // infoObj["totalGain"] = this.totalGain;
                    GameConfig.checkConductID = null;
                    GameConfig.sexMoney = 0;
                    GameConfig.ageMoney = 0;
                    GameConfig.eduMoney = 0;
                    this.totalGain = 0;
                    this.savaDate(infoObj);
                }


            }
            Hash.playMusic(2);
        }

        /** 判断需要多少钱 */
        juggePayMoney(conductBtn: Laya.Button): number {
            let zongMoney: number = GameConfig.ageMoney + GameConfig.sexMoney + GameConfig.eduMoney;
            if (conductBtn.label == "引流推广") {
                zongMoney = (1 + 0.5) * zongMoney;
            } else if (conductBtn.label == "精准投放") {
                zongMoney = (1 + 1) * zongMoney;
            } else {

            }
            let releaseRateNum: number = this.getReleaseSub();
            zongMoney = Math.floor(zongMoney * releaseRateNum);
            return zongMoney;
        }

        /** 获取天赋发布消费加成 */
        getReleaseSub(): number {
            let levelArr: Array<number> = [];
            levelArr.splice(0, levelArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                levelArr.push(everyObj["level"]);
            }
            if (levelArr.indexOf(3) != -1) {
                for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                    let everyObj: Object = GameConfig.everyLevelArr[i];
                    let curNum: number = everyObj["point"];
                    if (everyObj["level"] == 3) {
                        if (curNum == 1) {
                            return 0.9;
                        } else if (curNum == 2) {
                            return 0.8;
                        } else if (curNum == 3) {
                            return 0.7;
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        setObjArrData(): void {
            this.sexObjArr.splice(0, this.sexObjArr.length);
            this.ageObjArr.splice(0, this.ageObjArr.length);
            this.eduObjArr.splice(0, this.eduObjArr.length);
            this.hasObjArr.splice(0, this.hasObjArr.length);
            for (var i = 0; i < ResourceManager.releaseDataArr.length; i++) {
                let relObj: Object = ResourceManager.releaseDataArr[i];
                let typeID: number = relObj["typeID"];
                switch (typeID) {
                    case 1:
                        this.sexObjArr.push(relObj);
                        break;
                    case 2:
                        this.ageObjArr.push(relObj);
                        break;
                    case 3:
                        this.eduObjArr.push(relObj);
                        break;
                }
            }
        }


        judgeSex(sexStr: string): void {
            for (let j: number = 0; j < ResourceManager.releaseDataArr.length; j++) {
                let relObj: Object = ResourceManager.releaseDataArr[j];
                if (sexStr.indexOf(relObj["name"]) != -1) {
                    this.hasObjArr.push(relObj)
                }
            }
        }

        judgeAge(ageStr: string): void {
            for (let j: number = 0; j < this.ageObjArr.length; j++) {
                let relObj: Object = this.ageObjArr[j];
                if (ageStr.indexOf(relObj["name"]) != -1) {
                    this.hasObjArr.push(relObj)
                }
            }
        }

        judgeEdu(eduStr: string): void {
            for (let j: number = 0; j < this.eduObjArr.length; j++) {
                let relObj: Object = this.eduObjArr[j];
                if (eduStr.indexOf(relObj["name"]) != -1) {
                    this.hasObjArr.push(relObj)
                }
            }
        }

        judgeSub(infoObj: Object, hasObjArr: Array<Object>): number {
            let gain: number = 0
            for (let i: number = 0; i < hasObjArr.length; i++) {
                let hasObj: Object = hasObjArr[i];

                let themeArr: Array<number> = hasObj["theme"];
                let buff1Arr: Array<number> = hasObj["buff1"];
                let elementArr: Array<number> = hasObj["element"];
                let buff2Arr: Array<number> = hasObj["buff2"];

                let subStr: string = infoObj["subStr"];
                let eleStr: string = infoObj["eleStr"];
                let eleStrArr: Array<string> = eleStr.split(",");
                let eleIdArr: Array<number> = this.getEleIdArr(eleStrArr);
                let index: number = this.getsubIndex(subStr);
                for (let j = 0; j < themeArr.length; j++) {
                    let theme: number = themeArr[j];
                    if (theme = index) {
                        gain = gain + buff1Arr[j];
                    } else {
                        gain = gain + 0;
                    }
                }

                for (let m: number = 0; m < eleIdArr.length; m++) {
                    let eleId: number = eleIdArr[m];
                    for (let z: number = 0; z < elementArr.length; z++) {
                        let elemID: number = elementArr[z];
                        if (eleId == elemID) {
                            gain = gain + buff2Arr[z];
                        } else {
                            gain = gain + 0;
                        }
                    }
                }
            }
            return gain;
        }

        getsubIndex(subStr: string): number {
            for (let i: number = 0; i < GameConfig.subJectArr.length; i++) {
                let sub: string = GameConfig.subJectArr[i];
                if (sub == subStr) {
                    return i;
                }
            }
        }

        getEleIdArr(eleStrArr: Array<string>): Array<number> {
            let eleIdArr: Array<number> = new Array<number>();
            eleIdArr.splice(0, eleIdArr.length);
            for (let i: number = 0; i < eleStrArr.length; i++) {
                let eleStr: string = eleStrArr[i];
                for (let j: number = 0; j < GameConfig.elemArr.length; j++) {
                    let element: string = GameConfig.elemArr[j];
                    if (element == eleStr) {
                        eleIdArr.push(j);
                    }
                }
            }
            return eleIdArr;
        }

        savaDate(infoObj: Object): void {
            SceneLayerManager.sceneLayer.removeChild(this);
            SceneLayerManager.sceneLayer.removeChildByName("ReleaseViewMaskView");
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let obj: Object = GameConfig.authorInfoArr[i];
                if (infoObj["name"] == obj["name"]) {
                    // obj["totalGain"] = infoObj["totalGain"];
                    obj["ageStr"] = this.ageBtn.label;
                    obj["sexStr"] = this.sexBtn.label;
                    obj["eduStr"] = this.eduBtn.label;
                    obj["ductStr"] = this.conductBtn.label;
                    obj["operaNum"] = obj["operaNum"] - 1;
                    this.operaTingView = new views.action.OperaTingView(obj);
                    this.operaTingView.name = infoObj["name"] + "ope";
                    SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                }
            }
        }

        backView(infoObj: Object): void {
            SceneLayerManager.sceneLayer.removeChild(this);
            SceneLayerManager.sceneLayer.removeChildByName("ReleaseViewMaskView");
            this.operaTingView = new views.action.OperaTingView(infoObj);
            this.operaTingView.name = infoObj["name"] + "ope";
            SceneLayerManager.sceneLayer.addChild(this.operaTingView);
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
                let curObj: Object = SceneLayerManager.sceneLayer.selectObj(obj);
                this.scoreView = new views.action.ScoreView(curObj);
                SceneLayerManager.sceneLayer.addChild(this.scoreView);

            } else if (diffDays == obj["releaseTime"]) {
                let subStr: string = obj["subStr"];
                let eleStr: string = obj["eleStr"];
                GameConfig.hisStr.replace(subStr + eleStr, "");
                if (GameConfig.writingAuthor.length <= 0) {
                    GameConfig.hisStr = "";
                }
                obj["curStatus"] = 0;
                GameConfig.displayPage += 1;
                for (let i: number = 0; i < GameConfig.releaseTestObjArr.length; i++) {
                    let object: Object = GameConfig.releaseTestObjArr[i];
                    if (obj["name"] == object["name"]) {
                        GameConfig.releaseTestObjArr.splice(i, 1);
                        SceneLayerManager.sceneLayer.stopEvent();
                        let curTotalObj: Object = SceneLayerManager.sceneLayer.selectObj(obj);
                        this.totalScoreView = new views.action.TotalScoreView(curTotalObj);
                        SceneLayerManager.sceneLayer.addChild(this.totalScoreView);
                    }
                }
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let object: Object = GameConfig.authorInfoArr[i];
                    if (obj["name"] == object["name"]) {
                        object["curStatus"] = 0;
                    }
                }
                if (GameConfig.releaseTestObjArr.length <= 0) {
                    delete GameConfig.cachData["ReleaseObjArr"];
                }
            }
        }

        resetTotal(infoObj: Object): void {
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let authorObj: Object = GameConfig.authorInfoArr[i];
                if (authorObj["name"] == infoObj["name"]) {
                    authorObj["totalGain"] = 0;
                }
            }
        }
    }
}