namespace views.common {

    export class TimeBackView extends ui.common.TimeBackUI {

        private static _instance: TimeBackView;
        private conFirmPayMoney: views.common.ConfirmYearSalary;
        private LoanPayment: views.common.LoanPayment;
        private confirmRenew: views.common.ConfirmRenew;
        // private authorInfoView: views.player.PlayerStateInfoView;
        private hisArr: Array<Object> = ResourceManager.historyArr;
        private guideStepArr: Array<Object> = ResourceManager.guideArr;
        private spenMoney: number = 0;
        private info: string;
        private signInfo: string;
        private isBoolean: Boolean = true;
        private curArr: Array<Object>;
        private curData: string;
        private differDays: number;
        private subNum: number = 0;
        private eleNum: number = 0;

        static get instance(): TimeBackView {
            if (!TimeBackView._instance)
                TimeBackView._instance = new TimeBackView();
            return TimeBackView._instance;
        }

        constructor() {
            super();
            Laya.timer.loop(1000, this, this.timerback);
        }

        timerback(): void {
            // 坚持就是胜利 计算时间是否超过1小时
            let avchidata: Array<Object> = managers.ResourceManager.achiveGoldArr;
            if (GameConfig.entergametime && Math.floor((Laya.Browser.now() - GameConfig.entergametime) / 1000) == avchidata[3]['aim'] * 3600) {
                var achive: views.events.AchiEvent = new views.events.AchiEvent(3)
            }
            let year: number = parseInt(this.year.text);
            let month: number = parseInt(this.month.text);
            let day: number = parseInt(this.day.text);
            day++;
            if (month == 2) {
                if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                    if (day == 30) {
                        this.arriveDay(year, month, day);
                    } else {
                        this.usualDay(year, month, day);
                    }
                } else {
                    if (day == 29) {
                        this.arriveDay(year, month, day);
                    } else {
                        this.usualDay(year, month, day);
                    }
                }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                if (day == 31) {
                    this.arriveDay(year, month, day);
                } else {
                    this.usualDay(year, month, day);
                }
            } else {
                if (day == 32) {
                    this.arriveDay(year, month, day);
                } else {
                    this.usualDay(year, month, day);
                }
            }
            GameConfig.year = parseInt(this.year.text);
            GameConfig.month = parseInt(this.month.text);
            GameConfig.day = parseInt(this.day.text);

            GameConfig.cachData["year"] = GameConfig.year;
            GameConfig.cachData["month"] = GameConfig.month;
            GameConfig.cachData["day"] = GameConfig.day;

            if (GameConfig.signingNum > 0) {
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let curObj: Object = GameConfig.authorInfoArr[i];
                    if (curObj["curStatus"] == 3) {
                        views.player.PlayerStateInfoView.getInstance().setInfoData(curObj);
                    }
                }
            }

            /** 历史事件触发日期 */
            this.curData = this.year.text + "-" + this.month.text + "-" + this.day.text;
            this.differDays = Hash.dateDifference(GameConfig.GameStartData, this.curData);
            for (var i = 0; i < this.hisArr.length; i++) {
                let hisObj: Object = this.hisArr[i];
                if (this.differDays == hisObj["date"]) {
                    SceneLayerManager.sceneLayer.stopEvent();
                    GameConfig.curHisObj = hisObj;
                    GameConfig.cachData["curHisObj"] = GameConfig.curHisObj;
                    GameConfig.displayPage += 1;
                    let info: string = hisObj["text"];
                    let historyView: views.events.HistoryEventView = new views.events.HistoryEventView(hisObj);
                    historyView.newsLabel.text = info;
                    SceneLayerManager.sceneLayer.addChild(historyView);
                }
            }

            /** 判断是否有增益效果 */
            if (GameConfig.curHisObj == null || GameConfig.curHisObj == "") {
                GameConfig.popularValue = 0;
                GameConfig.subTimeNum = 0;
                GameConfig.eleTimeNum = 0;
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                GameConfig.cachData["subTimeNum"] = GameConfig.subTimeNum;
                GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
            } else {
                this.setPopuValue(GameConfig.curHisObj);
            }

            /** 判断是否触发评奖机制（需要传递去年相关数据作者对象） */
            if (GameConfig.year > 2001 && GameConfig.month == 3 && GameConfig.day == 1) {
                GameConfig.sessionNum += 1;
                GameConfig.displayPage += 1;
                SceneLayerManager.sceneLayer.stopEvent();
                if (GameConfig.authorInfoArr.length > 0) {
                    let topFansObj: Object = this.getTopFanObj();
                    let topSubsObj: Object = this.getTopSubsObj();
                    let topNatureObj: Object = this.getTopNatureObj();
                    let bottomNatureObj: Object = this.getBottomNatureObj();
                    let topIncomeObj: Object = this.getTopIncomeObj();
                    if ((topFansObj["awardYear"] > 0 && GameConfig.year - topFansObj["awardYear"] > 1) || topFansObj["awardYear"] == 0) {
                        let awardView: views.events.AwardsView = new views.events.AwardsView(null, null, null, null, null);
                        SceneLayerManager.sceneLayer.addChild(awardView);
                    } else {
                        let awardView: views.events.AwardsView = new views.events.AwardsView(topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj);
                        SceneLayerManager.sceneLayer.addChild(awardView);
                    }
                } else {
                    let awardView: views.events.AwardsView = new views.events.AwardsView(null, null, null, null, null);
                    SceneLayerManager.sceneLayer.addChild(awardView);
                }
            }
            //日进斗金
            if (GameConfig.gainmoney >= avchidata[5]['aim'] && (GameConfig.achiArr[5] == '' || GameConfig.achiArr[5] == null)) {
                var achive: views.events.AchiEvent = new views.events.AchiEvent(5)
            }

            /** 发布之后运算 */
            this.testRelease();

            /** 进行触发事件的判断 */
            this.judgeTrigger();

            /** 判断是否到招聘季节 */
            this.judgeOpenYear();

            /** 判断是否完美 */
            this.judgePerfect();
        }

        judgePerfect(): void {
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let auObj: Object = GameConfig.authorInfoArr[i];
                if (auObj["curStatus"] == 3) {
                    let curDay: string = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                    let diffDay: number = Hash.dateDifference(auObj["releaseStartTime"], curDay);
                    let sorArr: Array<Object> = new Array<Object>();
                    sorArr.splice(0, sorArr.length);
                    if (diffDay == 6) {
                        let selSubStr: string = auObj["subStr"];
                        let selEleArr: Array<string> = this.returnEleArr(auObj["eleStr"]);
                        for (let n: number = 0; n < WritingConfig.actPlotObjArr.length; n++) {
                            let actObj: Object = WritingConfig.actPlotObjArr[n];
                            let eleVueArr: Array<string> = new Array<string>();
                            eleVueArr.splice(0,eleVueArr.length);
                            if (actObj["name"] == selSubStr) {
                                let newObjArr: Array<Object> = actObj["value"];
                                for (let p:number = 0; p < newObjArr.length; p++) {
                                    let newObj:Object = newObjArr[p];
                                    eleVueArr.push(newObj["name"]);
                                }
                                for (let m: number = 0; m < selEleArr.length; m++) {
                                    let selStr: string = selEleArr[m];
                                    let curholeObj: Object = this.getCurHoleObj(selSubStr);
                                    let wonArr: Array<number> = curholeObj["wonderful"];
                                    let perArr: Array<number> = curholeObj["perfect"];
                                    let returnObj:Object = this.returnActPlotObj(newObjArr,selStr);
                                    if (eleVueArr.indexOf(selStr) == -1 || returnObj["times"] == 1) {
                                        let eleObj: Object = this.getSelEleObj(selStr);
                                        if (wonArr.indexOf(eleObj["id"]) != -1) {
                                            let str: string = selSubStr + "和" + selStr + "的组合非常完美，" + auObj["name"] + "写的" + auObj["pageName"] + "受到热捧。"
                                            let oneObj: Object = { "id": 2, "string": str }
                                            sorArr.push(oneObj);
                                        } else if (perArr.indexOf(eleObj["id"]) != -1) {
                                            let str: string = selSubStr + "和" + selStr + "是个不错的尝试，" + auObj["name"] + "写的" + auObj["pageName"] + "广受好评。"
                                            let twoObj: Object = { "id": 1, "string": str }
                                            sorArr.push(twoObj);
                                        } else {
                                            let str: string = auObj["name"] + "写的" + auObj["pageName"] + "尝试了" + selSubStr + "和" + selStr + "的组合，是否会开启一条新的写作风格呢？。"
                                            let threeObj: Object = { "id": 3, "string": str }
                                            sorArr.push(threeObj);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (sorArr.length > 0) {
                        sorArr = sorArr.sort(this.compare('id'));
                        let obj: Object = sorArr[sorArr.length - 1];
                        GameConfig.displayPage+=1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        let perfectDialogView:views.events.PerfectDialogView = new views.events.PerfectDialogView(obj);
                    }
                }
            }
        }

        returnActPlotObj(newObjArr:Array<Object>,plotStr:string):Object{
            for(let i:number = 0; i<newObjArr.length;i++){
                let newObj:Object = newObjArr[i];
                if(newObj["name"] == plotStr){
                    return newObj;
                }
            }
        }

        /** 数组对象排序 */
        compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value2 - value1;     // 升序
            }
        }

        getSelEleObj(eleStr: string): Object {
            for (let k: number = 0; k < ResourceManager.elementArr.length; k++) {
                let eleObj: Object = ResourceManager.elementArr[k];
                if (eleObj["element"] == eleStr) {
                    return eleObj;
                }
            }
        }

        getCurHoleObj(subStr: string): Object {
            for (let i: number = 0; i < ResourceManager.holeArr.length; i++) {
                let holeObj: Object = ResourceManager.holeArr[i];
                if (holeObj["theme"] == subStr) {
                    return holeObj;
                }
            }
        }

        returnEleArr(eleStr: string): Array<string> {
            let newArr: Array<string> = new Array<string>();
            newArr.splice(0, newArr.length);
            if (eleStr.indexOf(",") == -1) {
                newArr.push(eleStr);
                return newArr;
            } else {
                newArr = eleStr.split(",");
                return newArr;
            }
        }


        testRelease(): void {
            let arr: Array<Object> = GameConfig.releaseTestObjArr;
            if (arr.length > 0) {
                for (let i: number = 0; i < arr.length; i++) {
                    let object: Object = arr[i];
                    views.action.IssueView.prototype.createScoreTwo(object);
                }
            }
        }

        judgeTrigger(): void {
            /** 触发事件判断 */
            /** 判断第一次发布作品后相关事件 */
            if (IdentityConfig.isFirstIssuePage) {
                IdentityConfig.firstIssueTime += 1;
                GameConfig.cachData["firstIssueTime"] = IdentityConfig.firstIssueTime;
                if (IdentityConfig.firstIssueTime == 8) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[0];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                } else if (IdentityConfig.firstIssueTime == 61) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[1];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                } else if (IdentityConfig.firstIssueTime == 30) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[4];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                }
            }

            /** 判断首部完结作品相关事件 */
            if (IdentityConfig.isFirstFinish == true && IdentityConfig.firstFinishTime < 7) {
                IdentityConfig.firstFinishTime += 1;
                GameConfig.cachData["firstFinishTime"] = IdentityConfig.firstFinishTime;
                if (IdentityConfig.firstFinishTime == 6) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[2];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                }
            }

            /** 判断首次招募高阶作者事件 */
            if (IdentityConfig.isFirstEnlist == true && IdentityConfig.firstEnlistTime < 7) {
                IdentityConfig.firstEnlistTime += 1;
                GameConfig.cachData["firstEnlistTime"] = IdentityConfig.firstEnlistTime;
                if (IdentityConfig.firstEnlistTime == 6) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[3];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                }
            }

            /** 判断首次中奖作品相关事件 */
            if (IdentityConfig.isFirstWin == true && IdentityConfig.firstWinTime < 7) {
                IdentityConfig.firstWinTime += 1;
                GameConfig.cachData["firstWinTime"] = IdentityConfig.firstWinTime;
                if (IdentityConfig.firstWinTime == 6) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let curTrigerObj: Object = ResourceManager.triggerArr[5];
                    let triggerOne: views.events.TriggerEventView = new views.events.TriggerEventView(curTrigerObj);
                    SceneLayerManager.sceneLayer.addChild(triggerOne);
                }
            }
        }

        /** 招聘季判断 */
        judgeOpenYear(): void {
            if (GameConfig.month == 1 && GameConfig.day == 15) {
                let guideSteps: Array<Object> = new Array<Object>();
                guideSteps.splice(0, guideSteps.length);
                IdentityConfig.jobYear += 1;
                SceneLayerManager.sceneLayer.stopEvent();
                GameConfig.displayPage += 1;
                if (GameConfig.year <= 2001) {
                    for (let i = 0; i < this.guideStepArr.length; i++) {
                        let guideObj: Object = this.guideStepArr[i];
                        if (guideObj["id"] == 2) {
                            guideSteps.push(guideObj);
                        }
                    }
                    let guideStepView: views.common.GuideStep = new views.common.GuideStep(2, guideSteps);
                    Laya.stage.addChild(guideStepView);

                } else {
                    for (let i = 0; i < this.guideStepArr.length; i++) {
                        let guideObj: Object = this.guideStepArr[i];
                        if (guideObj["id"] == 2 && guideObj["step"] == 1) {
                            guideSteps.push(guideObj);
                        }
                    }
                    let guideStepView: views.common.GuideStep = new views.common.GuideStep(2, guideSteps);
                    Laya.stage.addChild(guideStepView);
                }
            }
        }


        /** 取签约作者中粉丝最多的作者对象 */
        getTopFanObj(): Object {
            let fansInfoObj: Object = new Object();
            let boolFans: boolean = this.judgeEqual("yearFans");
            /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
            if (boolFans) {
                fansInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
            } else {
                fansInfoObj = this.judgeMaxObj("yearFans");
            }
            return fansInfoObj;
        }

        /** 取签约作者中去年订阅数最多的作者对象 */
        getTopSubsObj(): Object {
            let subsInfoObj: Object = new Object();
            let boolSubs: boolean = this.judgeEqual("yearSubs");
            /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
            if (boolSubs) {
                subsInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
            } else {
                subsInfoObj = this.judgeMaxObj("yearSubs");
            }
            return subsInfoObj;
        }

        /** 取签约作者中去年属性最高的作者对象 */
        getTopNatureObj(): Object {
            let natureInfoObj: Object = new Object();
            let boolNature: boolean = this.judgeEqual("yearNature");
            /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
            if (boolNature) {
                natureInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
            } else {
                natureInfoObj = this.judgeMaxObj("yearNature");
            }
            return natureInfoObj;
        }

        /** 取签约作者中去年属性最低的作者对象 */
        getBottomNatureObj(): Object {
            let natureInfoObj: Object = new Object();
            let boolNature: boolean = this.judgeEqual("yearNature");
            /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
            if (boolNature) {
                natureInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
            } else {
                natureInfoObj = this.judgeMinObj("yearNature");
            }
            return natureInfoObj;
        }

        /** 取签约作者中去年总收入最高的作者对象 */
        getTopIncomeObj(): Object {
            let incomeInfoObj: Object = new Object();
            let boolIncome: boolean = this.judgeEqual("yearIncome");
            /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
            if (boolIncome) {
                incomeInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
            } else {
                incomeInfoObj = this.judgeMaxObj("yearIncome");
            }
            return incomeInfoObj;
        }

        /** 判断一个数组元素是否全部相等 */
        judgeEqual(name: string): boolean {
            let bool: boolean = true;
            let firstObj: Object = GameConfig.authorInfoArr[0];
            let len: number = GameConfig.authorInfoArr.length;
            if (len > 1) {
                for (let i = 1; i < GameConfig.authorInfoArr.length; i++) {
                    let authorObj: Object = GameConfig.authorInfoArr[i];
                    if (authorObj[name] !== firstObj[name]) {
                        bool = false
                    }
                }
            }
            return bool;
        }

        /** 获取数组元素最大值对象 */
        judgeMaxObj(name: string): Object {
            let maxObj: Object = GameConfig.authorInfoArr[0];
            let len: number = GameConfig.authorInfoArr.length;
            if (len > 1) {
                for (let i = 1; i < len; i++) {
                    let authObj: Object = GameConfig.authorInfoArr[i];
                    if (authObj[name] > maxObj[name]) {
                        maxObj = authObj;
                    }
                }
            }
            return maxObj;
        }

        /** 获取数组元素最小值对象 */
        judgeMinObj(name: string): Object {
            let minObj: Object = GameConfig.authorInfoArr[0];
            let len: number = GameConfig.authorInfoArr.length;
            if (len > 1) {
                for (let i = 1; i < len; i++) {
                    let authObj: Object = GameConfig.authorInfoArr[i];
                    if (authObj[name] > minObj[name]) {
                        minObj = authObj;
                    }
                }
            }
            return minObj;
        }


        setPopuValue(hisObj: Object): void {
            let subArr: Array<number> = hisObj["theme_buff"];
            let subDuration: number = hisObj["tb_duration"];
            let eleArr: Array<number> = hisObj["element_buff"];
            let eleDuration: number = hisObj["eb_duration"];

            if (GameConfig.cachData["subNum"] != 0) {
                this.subNum = GameConfig.cachData["subNum"];
                this.eleNum = GameConfig.cachData["eleNum"];
            }

            /** 判断题材增益 */
            if (GameConfig.subTimeNum > 0) {
                if (GameConfig.subTimeNum < GameConfig.subTopNum) {
                    GameConfig.subTimeNum += 1;
                } else {
                    GameConfig.subTimeNum = 0;
                    GameConfig.popularValue = GameConfig.popularValue - this.subNum;
                    if (GameConfig.popularValue < 0) {
                        GameConfig.popularValue = 0;
                    } else if (GameConfig.popularValue > 2) {
                        GameConfig.popularValue = 2;
                    }
                }
                GameConfig.cachData["subTimeNum"] = GameConfig.subTimeNum;
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
            } else {
                if (subDuration > 0) {
                    GameConfig.subTimeNum += 1;
                    GameConfig.subTopNum = subDuration;
                    let returnSub: Array<string> = this.getsubArr(subArr);
                    if (GameConfig.hisStr != null && GameConfig.hisStr != "" && GameConfig.hisStr.length > 0) {
                        for (let i: number = 0; i < returnSub.length; i++) {
                            let subStr: string = returnSub[i];
                            if (GameConfig.hisStr.indexOf(subStr) != -1) {
                                this.subNum = 1;
                                GameConfig.popularValue = this.subNum + GameConfig.popularValue;
                                break;
                            } else {
                                this.subNum = 0;
                            }
                        }
                    } else {
                        GameConfig.popularValue = 0;
                    }
                } else {
                    this.subNum = 0;
                    GameConfig.popularValue = this.subNum + GameConfig.popularValue;
                }
                GameConfig.cachData["subNum"] = this.subNum;
                GameConfig.cachData["subTimeNum"] = GameConfig.subTimeNum;
                GameConfig.cachData["subTopNum"] = GameConfig.subTopNum;
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
            }


            /** 判断元素增益 */
            if (GameConfig.eleTimeNum > 0) {
                if (GameConfig.eleTimeNum < GameConfig.eleTopNum) {
                    GameConfig.eleTimeNum += 1;
                } else {
                    GameConfig.eleTimeNum = 0;
                    GameConfig.popularValue = GameConfig.popularValue - this.eleNum;
                    if (GameConfig.popularValue < 0) {
                        GameConfig.popularValue = 0;
                    } else if (GameConfig.popularValue > 2) {
                        GameConfig.popularValue = 2;
                    }
                }
                GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));

            } else {
                if (eleDuration > 0) {
                    GameConfig.eleTimeNum += 1;
                    GameConfig.eleTopNum = eleDuration;
                    let returnEle: Array<string> = this.geteleArr(eleArr);
                    if (GameConfig.hisStr != null && GameConfig.hisStr != "" && GameConfig.hisStr.length > 0) {
                        for (let i: number = 0; i < returnEle.length; i++) {
                            let eleStr: string = returnEle[i];
                            if (GameConfig.hisStr.indexOf(eleStr) != -1) {
                                this.eleNum = 1;
                                GameConfig.popularValue = this.eleNum + GameConfig.popularValue;
                                break;
                            } else {
                                this.eleNum = 0;
                            }
                        }
                    } else {
                        GameConfig.popularValue = 0;
                    }
                } else {
                    this.eleNum = 0;
                    GameConfig.popularValue = this.eleNum + GameConfig.popularValue;
                }
                GameConfig.cachData["eleNum"] = this.eleNum;
                GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                GameConfig.cachData["eleTopNum"] = GameConfig.eleTopNum;
                GameConfig.cachData["popularValue"] = GameConfig.popularValue;
            }
        }

        getsubArr(subArr: Array<number>): Array<string> {
            let returnSub: Array<string> = [];
            let gudingSubArr: Array<Object> = ResourceManager.subjectArr;
            for (let i: number = 0; i < subArr.length; i++) {
                let index: number = subArr[i];
                for (let j: number = 0; j < gudingSubArr.length; j++) {
                    let subObj: Object = gudingSubArr[j];
                    if (subObj["id"] == index) {
                        returnSub.push(subObj["theme"]);
                    }
                }
            }
            return returnSub;
        }

        geteleArr(eleArr: Array<number>): Array<string> {
            let returnEle: Array<string> = [];
            let gudingEleArr: Array<Object> = ResourceManager.elementArr;
            for (let i: number = 0; i < eleArr.length; i++) {
                let index: number = eleArr[i];
                for (var j = 0; j < gudingEleArr.length; j++) {
                    let eleObj: Object = gudingEleArr[j];
                    if (eleObj["id"] == index) {
                        returnEle.push(eleObj["element"]);
                    }
                }
            }

            return returnEle;
        }

        /** 获取临时数据源 */
        getCurDataSource(): Array<Object> {
            let arr: Array<Object> = new Array<Object>();
            if (GameConfig.authorInfoArr.length > 1) {
                let obj1: Object = GameConfig.authorInfoArr[0];
                let obj2: Object = GameConfig.authorInfoArr[GameConfig.authorInfoArr.length - 1];
                for (let i: number = GameConfig.authorInfoArr.length - 1; i >= 0; i--) {
                    let curObj: Object = GameConfig.authorInfoArr[i];
                    arr.push(curObj);
                }
                arr.unshift(obj1);
                arr.push(obj2);
                return arr;
            } else {
                arr = GameConfig.authorInfoArr;
                return arr;
            }
        }

        /** 到月底 */
        arriveDay(year: number, month: number, day: number): void {
            day = 1;
            let dayStr: string = "0" + day;
            this.day.text = dayStr;
            month += 1;
            var res = managers.ResourceManager.incomeArr
            if (month == 13) {
                month = 1;
                year += 1;
                let monthStr: string = "0" + month;
                this.month.text = monthStr;
                this.year.text = year + "";
                if (GameConfig.signingNum > 0) {
                    for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                        let obj: Object = GameConfig.authorInfoArr[i];
                        obj["yearLeave"] = 7;
                        let moeney: number = obj["monthlySalary"] * 12;
                        this.spenMoney = this.spenMoney + moeney;
                    }
                }
                for (let i: number = 0; i < GameConfig.loanarr.length; i++) {
                    if (year - GameConfig.loanarr[i] > 10) { //还款超过10次
                        GameConfig.loanarr[i] = null;
                    }
                }
                var loan_money: number = 0;
                for (let i: number = 0; i < GameConfig.loanarr.length; i++) {
                    for (let j: number = 0; j < res.length; j++) {
                        if (GameConfig.loanarr[i] == res[j]['year']) {
                            loan_money = loan_money + Math.floor(res[j]['spreaMoney'] * 0.12)
                        }
                    }
                }
                /** 给签约作者恢复20点心情值 */
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let authorObj: Object = GameConfig.authorInfoArr[i];
                    if (authorObj["mood"] + 20 > 100) {
                        authorObj["mood"] = 100;
                    } else {
                        authorObj["mood"] = authorObj["mood"] + 20;
                    }
                }
                this.LoanPayment = new views.common.LoanPayment(this.spenMoney, loan_money);
                Laya.stage.addChild(this.LoanPayment);
                this.info = "是否支付作者共" + this.spenMoney + "年薪？";
                GameConfig.displayPage += 1;
                for (let i: number = 0; i < GameConfig.loanarr.length; i++) {
                    if (year - GameConfig.loanarr[i] >= 10) { //还款超过10次
                        GameConfig.loanarr[i] = null;
                    }
                }
                GameConfig.cachData['loanarr'] = GameConfig.loanarr
                SceneLayerManager.sceneLayer.stopEvent();
                this.spenMoney = 0;
            } else {
                let monthLength: number = month.toString().length;
                let monthStr: string;
                switch (monthLength) {
                    case 1:
                        monthStr = "0" + month;
                        this.month.text = monthStr;
                        break;
                    default:
                        monthStr = month + "";
                        this.month.text = monthStr;
                        break;
                }
            }
        }

        /** 平时日期 */
        usualDay(year: number, month: number, day: number): void {
            let dayLength: number = day.toString().length;
            let dayStr: string;
            switch (dayLength) {
                case 1:
                    dayStr = "0" + day;
                    this.day.text = dayStr;
                    break;

                default:
                    dayStr = day + "";
                    this.day.text = dayStr;
                    break;
            }
        }

        stopTimer(): void {
            Laya.timer.clear(this, this.timerback);
        }

        startTimer(): void {
            Laya.timer.loop(1000, this, this.timerback);
        }

        /**重置时间 */
        resetTime(year: number, month: number, day: number): void {
            this.year.text = year + "";
            let dayLength: number = day.toString().length;
            let monthLength: number = month.toString().length;
            let dayStr: string;
            let monthStr: string;
            switch (dayLength) {
                case 1:
                    dayStr = "0" + day;
                    this.day.text = dayStr;
                    break;

                default:
                    dayStr = day + "";
                    this.day.text = dayStr;
                    break;
            }
            switch (monthLength) {
                case 1:
                    monthStr = "0" + month;
                    this.month.text = monthStr;
                    break;
                default:
                    monthStr = month + "";
                    this.month.text = monthStr;
                    break;
            }

            GameConfig.year = parseInt(this.year.text);
            GameConfig.month = parseInt(this.month.text);
            GameConfig.day = parseInt(this.day.text);

            GameConfig.cachData["year"] = GameConfig.year;
            GameConfig.cachData["month"] = GameConfig.month;
            GameConfig.cachData["day"] = GameConfig.day;
            // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
        }

    }
}