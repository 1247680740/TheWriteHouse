var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var common;
    (function (common) {
        var TimeBackView = /** @class */ (function (_super) {
            __extends(TimeBackView, _super);
            function TimeBackView() {
                var _this = _super.call(this) || this;
                // private authorInfoView: views.player.PlayerStateInfoView;
                _this.hisArr = ResourceManager.historyArr;
                _this.guideStepArr = ResourceManager.guideArr;
                _this.spenMoney = 0;
                _this.isBoolean = true;
                _this.subNum = 0;
                _this.eleNum = 0;
                Laya.timer.loop(1000, _this, _this.timerback);
                return _this;
            }
            Object.defineProperty(TimeBackView, "instance", {
                get: function () {
                    if (!TimeBackView._instance)
                        TimeBackView._instance = new TimeBackView();
                    return TimeBackView._instance;
                },
                enumerable: true,
                configurable: true
            });
            TimeBackView.prototype.timerback = function () {
                // 坚持就是胜利 计算时间是否超过1小时
                var avchidata = managers.ResourceManager.achiveGoldArr;
                if (GameConfig.entergametime && Math.floor((Laya.Browser.now() - GameConfig.entergametime) / 1000) == avchidata[3]['aim'] * 3600) {
                    var achive = new views.events.AchiEvent(3);
                }
                var year = parseInt(this.year.text);
                var month = parseInt(this.month.text);
                var day = parseInt(this.day.text);
                day++;
                if (month == 2) {
                    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                        if (day == 30) {
                            this.arriveDay(year, month, day);
                        }
                        else {
                            this.usualDay(year, month, day);
                        }
                    }
                    else {
                        if (day == 29) {
                            this.arriveDay(year, month, day);
                        }
                        else {
                            this.usualDay(year, month, day);
                        }
                    }
                }
                else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    if (day == 31) {
                        this.arriveDay(year, month, day);
                    }
                    else {
                        this.usualDay(year, month, day);
                    }
                }
                else {
                    if (day == 32) {
                        this.arriveDay(year, month, day);
                    }
                    else {
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
                    for (var i_1 = 0; i_1 < GameConfig.authorInfoArr.length; i_1++) {
                        var curObj = GameConfig.authorInfoArr[i_1];
                        if (curObj["curStatus"] == 3) {
                            views.player.PlayerStateInfoView.getInstance().setInfoData(curObj);
                        }
                    }
                }
                /** 历史事件触发日期 */
                this.curData = this.year.text + "-" + this.month.text + "-" + this.day.text;
                this.differDays = Hash.dateDifference(GameConfig.GameStartData, this.curData);
                for (var i = 0; i < this.hisArr.length; i++) {
                    var hisObj = this.hisArr[i];
                    if (this.differDays == hisObj["date"]) {
                        SceneLayerManager.sceneLayer.stopEvent();
                        GameConfig.curHisObj = hisObj;
                        GameConfig.cachData["curHisObj"] = GameConfig.curHisObj;
                        GameConfig.displayPage += 1;
                        var info = hisObj["text"];
                        var historyView = new views.events.HistoryEventView(hisObj);
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
                }
                else {
                    this.setPopuValue(GameConfig.curHisObj);
                }
                /** 判断是否触发评奖机制（需要传递去年相关数据作者对象） */
                if (GameConfig.year > 2001 && GameConfig.month == 3 && GameConfig.day == 1) {
                    GameConfig.sessionNum += 1;
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    if (GameConfig.authorInfoArr.length > 0) {
                        var topFansObj = this.getTopFanObj();
                        var topSubsObj = this.getTopSubsObj();
                        var topNatureObj = this.getTopNatureObj();
                        var bottomNatureObj = this.getBottomNatureObj();
                        var topIncomeObj = this.getTopIncomeObj();
                        if ((topFansObj["awardYear"] > 0 && GameConfig.year - topFansObj["awardYear"] > 1) || topFansObj["awardYear"] == 0) {
                            var awardView = new views.events.AwardsView(null, null, null, null, null);
                            SceneLayerManager.sceneLayer.addChild(awardView);
                        }
                        else {
                            var awardView = new views.events.AwardsView(topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj);
                            SceneLayerManager.sceneLayer.addChild(awardView);
                        }
                    }
                    else {
                        var awardView = new views.events.AwardsView(null, null, null, null, null);
                        SceneLayerManager.sceneLayer.addChild(awardView);
                    }
                }
                //日进斗金
                if (GameConfig.gainmoney >= avchidata[5]['aim'] && (GameConfig.achiArr[5] == '' || GameConfig.achiArr[5] == null)) {
                    var achive = new views.events.AchiEvent(5);
                }
                /** 发布之后运算 */
                this.testRelease();
                /** 进行触发事件的判断 */
                this.judgeTrigger();
                /** 判断是否到招聘季节 */
                this.judgeOpenYear();
                /** 判断是否完美 */
                this.judgePerfect();
            };
            TimeBackView.prototype.judgePerfect = function () {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    if (auObj["curStatus"] == 3) {
                        var curDay = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                        var diffDay = Hash.dateDifference(auObj["releaseStartTime"], curDay);
                        var sorArr = new Array();
                        sorArr.splice(0, sorArr.length);
                        if (diffDay == 6) {
                            var selSubStr = auObj["subStr"];
                            var selEleArr = this.returnEleArr(auObj["eleStr"]);
                            for (var n = 0; n < WritingConfig.actPlotObjArr.length; n++) {
                                var actObj = WritingConfig.actPlotObjArr[n];
                                var eleVueArr = new Array();
                                eleVueArr.splice(0, eleVueArr.length);
                                if (actObj["name"] == selSubStr) {
                                    var newObjArr = actObj["value"];
                                    for (var p = 0; p < newObjArr.length; p++) {
                                        var newObj = newObjArr[p];
                                        eleVueArr.push(newObj["name"]);
                                    }
                                    for (var m = 0; m < selEleArr.length; m++) {
                                        var selStr = selEleArr[m];
                                        var curholeObj = this.getCurHoleObj(selSubStr);
                                        var wonArr = curholeObj["wonderful"];
                                        var perArr = curholeObj["perfect"];
                                        var returnObj = this.returnActPlotObj(newObjArr, selStr);
                                        if (eleVueArr.indexOf(selStr) == -1 || returnObj["times"] == 1) {
                                            var eleObj = this.getSelEleObj(selStr);
                                            if (wonArr.indexOf(eleObj["id"]) != -1) {
                                                var str = selSubStr + "和" + selStr + "的组合非常完美，" + auObj["name"] + "写的" + auObj["pageName"] + "受到热捧。";
                                                var oneObj = { "id": 2, "string": str };
                                                sorArr.push(oneObj);
                                            }
                                            else if (perArr.indexOf(eleObj["id"]) != -1) {
                                                var str = selSubStr + "和" + selStr + "是个不错的尝试，" + auObj["name"] + "写的" + auObj["pageName"] + "广受好评。";
                                                var twoObj = { "id": 1, "string": str };
                                                sorArr.push(twoObj);
                                            }
                                            else {
                                                var str = auObj["name"] + "写的" + auObj["pageName"] + "尝试了" + selSubStr + "和" + selStr + "的组合，是否会开启一条新的写作风格呢？。";
                                                var threeObj = { "id": 3, "string": str };
                                                sorArr.push(threeObj);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (sorArr.length > 0) {
                            sorArr = sorArr.sort(this.compare('id'));
                            var obj = sorArr[sorArr.length - 1];
                            GameConfig.displayPage += 1;
                            SceneLayerManager.sceneLayer.stopEvent();
                            var perfectDialogView = new views.events.PerfectDialogView(obj);
                        }
                    }
                }
            };
            TimeBackView.prototype.returnActPlotObj = function (newObjArr, plotStr) {
                for (var i = 0; i < newObjArr.length; i++) {
                    var newObj = newObjArr[i];
                    if (newObj["name"] == plotStr) {
                        return newObj;
                    }
                }
            };
            /** 数组对象排序 */
            TimeBackView.prototype.compare = function (property) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    return value2 - value1; // 升序
                };
            };
            TimeBackView.prototype.getSelEleObj = function (eleStr) {
                for (var k = 0; k < ResourceManager.elementArr.length; k++) {
                    var eleObj = ResourceManager.elementArr[k];
                    if (eleObj["element"] == eleStr) {
                        return eleObj;
                    }
                }
            };
            TimeBackView.prototype.getCurHoleObj = function (subStr) {
                for (var i = 0; i < ResourceManager.holeArr.length; i++) {
                    var holeObj = ResourceManager.holeArr[i];
                    if (holeObj["theme"] == subStr) {
                        return holeObj;
                    }
                }
            };
            TimeBackView.prototype.returnEleArr = function (eleStr) {
                var newArr = new Array();
                newArr.splice(0, newArr.length);
                if (eleStr.indexOf(",") == -1) {
                    newArr.push(eleStr);
                    return newArr;
                }
                else {
                    newArr = eleStr.split(",");
                    return newArr;
                }
            };
            TimeBackView.prototype.testRelease = function () {
                var arr = GameConfig.releaseTestObjArr;
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var object = arr[i];
                        views.action.IssueView.prototype.createScoreTwo(object);
                    }
                }
            };
            TimeBackView.prototype.judgeTrigger = function () {
                /** 触发事件判断 */
                /** 判断第一次发布作品后相关事件 */
                if (IdentityConfig.isFirstIssuePage) {
                    IdentityConfig.firstIssueTime += 1;
                    GameConfig.cachData["firstIssueTime"] = IdentityConfig.firstIssueTime;
                    if (IdentityConfig.firstIssueTime == 8) {
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        var curTrigerObj = ResourceManager.triggerArr[0];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
                        SceneLayerManager.sceneLayer.addChild(triggerOne);
                    }
                    else if (IdentityConfig.firstIssueTime == 61) {
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        var curTrigerObj = ResourceManager.triggerArr[1];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
                        SceneLayerManager.sceneLayer.addChild(triggerOne);
                    }
                    else if (IdentityConfig.firstIssueTime == 30) {
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        var curTrigerObj = ResourceManager.triggerArr[4];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
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
                        var curTrigerObj = ResourceManager.triggerArr[2];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
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
                        var curTrigerObj = ResourceManager.triggerArr[3];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
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
                        var curTrigerObj = ResourceManager.triggerArr[5];
                        var triggerOne = new views.events.TriggerEventView(curTrigerObj);
                        SceneLayerManager.sceneLayer.addChild(triggerOne);
                    }
                }
            };
            /** 招聘季判断 */
            TimeBackView.prototype.judgeOpenYear = function () {
                if (GameConfig.month == 1 && GameConfig.day == 15) {
                    var guideSteps = new Array();
                    guideSteps.splice(0, guideSteps.length);
                    IdentityConfig.jobYear += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    GameConfig.displayPage += 1;
                    if (GameConfig.year <= 2001) {
                        for (var i = 0; i < this.guideStepArr.length; i++) {
                            var guideObj = this.guideStepArr[i];
                            if (guideObj["id"] == 2) {
                                guideSteps.push(guideObj);
                            }
                        }
                        var guideStepView = new views.common.GuideStep(2, guideSteps);
                        Laya.stage.addChild(guideStepView);
                    }
                    else {
                        for (var i = 0; i < this.guideStepArr.length; i++) {
                            var guideObj = this.guideStepArr[i];
                            if (guideObj["id"] == 2 && guideObj["step"] == 1) {
                                guideSteps.push(guideObj);
                            }
                        }
                        var guideStepView = new views.common.GuideStep(2, guideSteps);
                        Laya.stage.addChild(guideStepView);
                    }
                }
            };
            /** 取签约作者中粉丝最多的作者对象 */
            TimeBackView.prototype.getTopFanObj = function () {
                var fansInfoObj = new Object();
                var boolFans = this.judgeEqual("yearFans");
                /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
                if (boolFans) {
                    fansInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
                }
                else {
                    fansInfoObj = this.judgeMaxObj("yearFans");
                }
                return fansInfoObj;
            };
            /** 取签约作者中去年订阅数最多的作者对象 */
            TimeBackView.prototype.getTopSubsObj = function () {
                var subsInfoObj = new Object();
                var boolSubs = this.judgeEqual("yearSubs");
                /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
                if (boolSubs) {
                    subsInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
                }
                else {
                    subsInfoObj = this.judgeMaxObj("yearSubs");
                }
                return subsInfoObj;
            };
            /** 取签约作者中去年属性最高的作者对象 */
            TimeBackView.prototype.getTopNatureObj = function () {
                var natureInfoObj = new Object();
                var boolNature = this.judgeEqual("yearNature");
                /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
                if (boolNature) {
                    natureInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
                }
                else {
                    natureInfoObj = this.judgeMaxObj("yearNature");
                }
                return natureInfoObj;
            };
            /** 取签约作者中去年属性最低的作者对象 */
            TimeBackView.prototype.getBottomNatureObj = function () {
                var natureInfoObj = new Object();
                var boolNature = this.judgeEqual("yearNature");
                /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
                if (boolNature) {
                    natureInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
                }
                else {
                    natureInfoObj = this.judgeMinObj("yearNature");
                }
                return natureInfoObj;
            };
            /** 取签约作者中去年总收入最高的作者对象 */
            TimeBackView.prototype.getTopIncomeObj = function () {
                var incomeInfoObj = new Object();
                var boolIncome = this.judgeEqual("yearIncome");
                /** 如果作者去年获取的粉丝数都相等 就随机取一个作者对象 */
                if (boolIncome) {
                    incomeInfoObj = Hash.selectItemFromArray(GameConfig.authorInfoArr);
                }
                else {
                    incomeInfoObj = this.judgeMaxObj("yearIncome");
                }
                return incomeInfoObj;
            };
            /** 判断一个数组元素是否全部相等 */
            TimeBackView.prototype.judgeEqual = function (name) {
                var bool = true;
                var firstObj = GameConfig.authorInfoArr[0];
                var len = GameConfig.authorInfoArr.length;
                if (len > 1) {
                    for (var i = 1; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj[name] !== firstObj[name]) {
                            bool = false;
                        }
                    }
                }
                return bool;
            };
            /** 获取数组元素最大值对象 */
            TimeBackView.prototype.judgeMaxObj = function (name) {
                var maxObj = GameConfig.authorInfoArr[0];
                var len = GameConfig.authorInfoArr.length;
                if (len > 1) {
                    for (var i = 1; i < len; i++) {
                        var authObj = GameConfig.authorInfoArr[i];
                        if (authObj[name] > maxObj[name]) {
                            maxObj = authObj;
                        }
                    }
                }
                return maxObj;
            };
            /** 获取数组元素最小值对象 */
            TimeBackView.prototype.judgeMinObj = function (name) {
                var minObj = GameConfig.authorInfoArr[0];
                var len = GameConfig.authorInfoArr.length;
                if (len > 1) {
                    for (var i = 1; i < len; i++) {
                        var authObj = GameConfig.authorInfoArr[i];
                        if (authObj[name] > minObj[name]) {
                            minObj = authObj;
                        }
                    }
                }
                return minObj;
            };
            TimeBackView.prototype.setPopuValue = function (hisObj) {
                var subArr = hisObj["theme_buff"];
                var subDuration = hisObj["tb_duration"];
                var eleArr = hisObj["element_buff"];
                var eleDuration = hisObj["eb_duration"];
                if (GameConfig.cachData["subNum"] != 0) {
                    this.subNum = GameConfig.cachData["subNum"];
                    this.eleNum = GameConfig.cachData["eleNum"];
                }
                /** 判断题材增益 */
                if (GameConfig.subTimeNum > 0) {
                    if (GameConfig.subTimeNum < GameConfig.subTopNum) {
                        GameConfig.subTimeNum += 1;
                    }
                    else {
                        GameConfig.subTimeNum = 0;
                        GameConfig.popularValue = GameConfig.popularValue - this.subNum;
                        if (GameConfig.popularValue < 0) {
                            GameConfig.popularValue = 0;
                        }
                        else if (GameConfig.popularValue > 2) {
                            GameConfig.popularValue = 2;
                        }
                    }
                    GameConfig.cachData["subTimeNum"] = GameConfig.subTimeNum;
                    GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                }
                else {
                    if (subDuration > 0) {
                        GameConfig.subTimeNum += 1;
                        GameConfig.subTopNum = subDuration;
                        var returnSub = this.getsubArr(subArr);
                        if (GameConfig.hisStr != null && GameConfig.hisStr != "" && GameConfig.hisStr.length > 0) {
                            for (var i = 0; i < returnSub.length; i++) {
                                var subStr = returnSub[i];
                                if (GameConfig.hisStr.indexOf(subStr) != -1) {
                                    this.subNum = 1;
                                    GameConfig.popularValue = this.subNum + GameConfig.popularValue;
                                    break;
                                }
                                else {
                                    this.subNum = 0;
                                }
                            }
                        }
                        else {
                            GameConfig.popularValue = 0;
                        }
                    }
                    else {
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
                    }
                    else {
                        GameConfig.eleTimeNum = 0;
                        GameConfig.popularValue = GameConfig.popularValue - this.eleNum;
                        if (GameConfig.popularValue < 0) {
                            GameConfig.popularValue = 0;
                        }
                        else if (GameConfig.popularValue > 2) {
                            GameConfig.popularValue = 2;
                        }
                    }
                    GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                    GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                    // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                }
                else {
                    if (eleDuration > 0) {
                        GameConfig.eleTimeNum += 1;
                        GameConfig.eleTopNum = eleDuration;
                        var returnEle = this.geteleArr(eleArr);
                        if (GameConfig.hisStr != null && GameConfig.hisStr != "" && GameConfig.hisStr.length > 0) {
                            for (var i = 0; i < returnEle.length; i++) {
                                var eleStr = returnEle[i];
                                if (GameConfig.hisStr.indexOf(eleStr) != -1) {
                                    this.eleNum = 1;
                                    GameConfig.popularValue = this.eleNum + GameConfig.popularValue;
                                    break;
                                }
                                else {
                                    this.eleNum = 0;
                                }
                            }
                        }
                        else {
                            GameConfig.popularValue = 0;
                        }
                    }
                    else {
                        this.eleNum = 0;
                        GameConfig.popularValue = this.eleNum + GameConfig.popularValue;
                    }
                    GameConfig.cachData["eleNum"] = this.eleNum;
                    GameConfig.cachData["eleTimeNum"] = GameConfig.eleTimeNum;
                    GameConfig.cachData["eleTopNum"] = GameConfig.eleTopNum;
                    GameConfig.cachData["popularValue"] = GameConfig.popularValue;
                }
            };
            TimeBackView.prototype.getsubArr = function (subArr) {
                var returnSub = [];
                var gudingSubArr = ResourceManager.subjectArr;
                for (var i = 0; i < subArr.length; i++) {
                    var index = subArr[i];
                    for (var j = 0; j < gudingSubArr.length; j++) {
                        var subObj = gudingSubArr[j];
                        if (subObj["id"] == index) {
                            returnSub.push(subObj["theme"]);
                        }
                    }
                }
                return returnSub;
            };
            TimeBackView.prototype.geteleArr = function (eleArr) {
                var returnEle = [];
                var gudingEleArr = ResourceManager.elementArr;
                for (var i = 0; i < eleArr.length; i++) {
                    var index = eleArr[i];
                    for (var j = 0; j < gudingEleArr.length; j++) {
                        var eleObj = gudingEleArr[j];
                        if (eleObj["id"] == index) {
                            returnEle.push(eleObj["element"]);
                        }
                    }
                }
                return returnEle;
            };
            /** 获取临时数据源 */
            TimeBackView.prototype.getCurDataSource = function () {
                var arr = new Array();
                if (GameConfig.authorInfoArr.length > 1) {
                    var obj1 = GameConfig.authorInfoArr[0];
                    var obj2 = GameConfig.authorInfoArr[GameConfig.authorInfoArr.length - 1];
                    for (var i = GameConfig.authorInfoArr.length - 1; i >= 0; i--) {
                        var curObj = GameConfig.authorInfoArr[i];
                        arr.push(curObj);
                    }
                    arr.unshift(obj1);
                    arr.push(obj2);
                    return arr;
                }
                else {
                    arr = GameConfig.authorInfoArr;
                    return arr;
                }
            };
            /** 到月底 */
            TimeBackView.prototype.arriveDay = function (year, month, day) {
                day = 1;
                var dayStr = "0" + day;
                this.day.text = dayStr;
                month += 1;
                var res = managers.ResourceManager.incomeArr;
                if (month == 13) {
                    month = 1;
                    year += 1;
                    var monthStr = "0" + month;
                    this.month.text = monthStr;
                    this.year.text = year + "";
                    if (GameConfig.signingNum > 0) {
                        for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                            var obj = GameConfig.authorInfoArr[i];
                            obj["yearLeave"] = 7;
                            var moeney = obj["monthlySalary"] * 12;
                            this.spenMoney = this.spenMoney + moeney;
                        }
                    }
                    for (var i = 0; i < GameConfig.loanarr.length; i++) {
                        if (year - GameConfig.loanarr[i] > 10) {
                            GameConfig.loanarr[i] = null;
                        }
                    }
                    var loan_money = 0;
                    for (var i = 0; i < GameConfig.loanarr.length; i++) {
                        for (var j = 0; j < res.length; j++) {
                            if (GameConfig.loanarr[i] == res[j]['year']) {
                                loan_money = loan_money + Math.floor(res[j]['spreaMoney'] * 0.12);
                            }
                        }
                    }
                    /** 给签约作者恢复20点心情值 */
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["mood"] + 20 > 100) {
                            authorObj["mood"] = 100;
                        }
                        else {
                            authorObj["mood"] = authorObj["mood"] + 20;
                        }
                    }
                    this.LoanPayment = new views.common.LoanPayment(this.spenMoney, loan_money);
                    Laya.stage.addChild(this.LoanPayment);
                    this.info = "是否支付作者共" + this.spenMoney + "年薪？";
                    GameConfig.displayPage += 1;
                    for (var i = 0; i < GameConfig.loanarr.length; i++) {
                        if (year - GameConfig.loanarr[i] >= 10) {
                            GameConfig.loanarr[i] = null;
                        }
                    }
                    GameConfig.cachData['loanarr'] = GameConfig.loanarr;
                    SceneLayerManager.sceneLayer.stopEvent();
                    this.spenMoney = 0;
                }
                else {
                    var monthLength = month.toString().length;
                    var monthStr = void 0;
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
            };
            /** 平时日期 */
            TimeBackView.prototype.usualDay = function (year, month, day) {
                var dayLength = day.toString().length;
                var dayStr;
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
            };
            TimeBackView.prototype.stopTimer = function () {
                Laya.timer.clear(this, this.timerback);
            };
            TimeBackView.prototype.startTimer = function () {
                Laya.timer.loop(1000, this, this.timerback);
            };
            /**重置时间 */
            TimeBackView.prototype.resetTime = function (year, month, day) {
                this.year.text = year + "";
                var dayLength = day.toString().length;
                var monthLength = month.toString().length;
                var dayStr;
                var monthStr;
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
            };
            return TimeBackView;
        }(ui.common.TimeBackUI));
        common.TimeBackView = TimeBackView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=TimeBackView.js.map