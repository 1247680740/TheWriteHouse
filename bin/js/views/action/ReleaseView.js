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
    var action;
    (function (action) {
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var ReleaseView = /** @class */ (function (_super) {
            __extends(ReleaseView, _super);
            function ReleaseView(infoObj) {
                var _this = _super.call(this) || this;
                _this.timeBack = 0;
                _this.writingTime = 0;
                _this.sexObjArr = [];
                _this.ageObjArr = [];
                _this.eduObjArr = [];
                _this.hasObjArr = [];
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.addMask();
                _this.sexBtn.on(Laya.Event.CLICK, _this, _this.checkData);
                _this.ageBtn.on(Laya.Event.CLICK, _this, _this.checkData);
                _this.eduBtn.on(Laya.Event.CLICK, _this, _this.checkData);
                _this.conductBtn.on(Laya.Event.CLICK, _this, _this.checkConduct);
                _this.releaseBtn.on(Laya.Event.CLICK, _this, _this.release, [infoObj]);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backView, [infoObj]);
                var needMoney = GameConfig.sexMoney + GameConfig.ageMoney + GameConfig.eduMoney;
                _this.moneyTip.text = "总共需要花费" + needMoney + "个金币";
                return _this;
            }
            ReleaseView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "ReleaseViewMaskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = false;
                }
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            ReleaseView.prototype.checkData = function (event) {
                event.stopPropagation();
                var strArr = new Array();
                strArr.splice(0, strArr.length);
                var name = event.target.name;
                var btn = this.getChildByName(name);
                if (btn.label == "点击选择") {
                    console.log("没有选择元素");
                }
                else {
                    var btnLabel = btn.label + ",";
                    strArr = btnLabel.split(",");
                    for (var i = 0; i < strArr.length; i++) {
                        var testStr = strArr[i];
                        if (testStr == "") {
                            strArr.splice(i, 1);
                        }
                    }
                }
                GameConfig.displayPage += 1;
                this.visible = false;
                this.selectReleaseData = new views.action.SelectReleaseData(name);
                SceneLayerManager.sceneLayer.addChild(this.selectReleaseData);
                this.selectReleaseData.pos((Laya.stage.width - this.selectReleaseData.width) / 2, (Laya.stage.height - this.selectReleaseData.height) / 2); //300, 250
                this.selectReleaseData.setBg(name, strArr);
                Hash.playMusic(2);
            };
            ReleaseView.prototype.resetDataView = function (eventName, selectStr) {
                var view = SceneLayerManager.sceneLayer.getChildByName("releaseView");
                var btn = view.getChildByName(eventName);
                var conductBtn = view.getChildByName("conductBtn");
                var labelBox = view.getChildByName("labelBox");
                var moneyTip = labelBox.getChildByName("moneyTip");
                view.visible = true;
                if (selectStr == "") {
                    btn.label = "点击选择";
                }
                else {
                    btn.label = selectStr;
                }
                var payMoney = this.juggePayMoney(conductBtn);
                moneyTip.text = "总共需要花费" + payMoney + "个金币";
            };
            /** 选择宣传方式 */
            ReleaseView.prototype.checkConduct = function () {
                GameConfig.displayPage += 1;
                SceneLayerManager.sceneLayer.stopEvent();
                this.visible = false;
                this.selectConductView = new views.action.SelectConductView();
                SceneLayerManager.sceneLayer.addChild(this.selectConductView);
                this.selectConductView.pos((Laya.stage.width - this.selectConductView.width) / 2, (Laya.stage.height - this.selectConductView.height) / 2); //300, 250
                this.selectConductView.setBg();
                Hash.playMusic(2);
            };
            ReleaseView.prototype.resetDuctView = function (id) {
                var view = SceneLayerManager.sceneLayer.getChildByName("releaseView");
                var conductBtn = view.getChildByName("conductBtn");
                var labelBox = view.getChildByName("labelBox");
                var moneyTip = labelBox.getChildByName("moneyTip");
                view.visible = true;
                conductBtn.label = GameConfig.conductArr[id];
                var payMoney = this.juggePayMoney(conductBtn);
                moneyTip.text = "总共需要花费" + payMoney + "个金币";
            };
            ReleaseView.prototype.release = function (infoObj) {
                this.totalGain = 0;
                if (this.sexBtn.label == "点击选择" || this.ageBtn.label == "点击选择" || this.eduBtn.label == "点击选择" || this.conductBtn.label == "点击选择") {
                    TipLayerManager.tipLayer.showDrawBgTip("信息不完整，无法发布");
                }
                else {
                    this.setObjArrData();
                    var totalMoney = GameConfig.sexMoney + GameConfig.ageMoney + GameConfig.eduMoney;
                    /** 判断性别是否有增益 */
                    this.judgeSex(this.sexBtn.label);
                    /** 判断年龄是否有增益 */
                    this.judgeAge(this.ageBtn.label);
                    /** 判读学历是否有增益 */
                    this.judgeEdu(this.eduBtn.label);
                    /** 判别题材是否有增益 */
                    this.totalGain = this.judgeSub(infoObj, this.hasObjArr);
                    if (this.conductBtn.label == "引流推广") {
                        totalMoney = (1 + 0.5) * totalMoney;
                        this.totalGain = this.totalGain + 50;
                    }
                    else if (this.conductBtn.label == "精准投放") {
                        totalMoney = (1 + 1) * totalMoney;
                        this.totalGain = this.totalGain + 100;
                    }
                    var rateNum = this.getReleaseSub();
                    totalMoney = Math.floor(totalMoney * rateNum);
                    if (totalMoney > GameConfig.money) {
                        TipLayerManager.tipLayer.showDrawBgTip("你的金币不足");
                    }
                    else {
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
            };
            /** 判断需要多少钱 */
            ReleaseView.prototype.juggePayMoney = function (conductBtn) {
                var zongMoney = GameConfig.ageMoney + GameConfig.sexMoney + GameConfig.eduMoney;
                if (conductBtn.label == "引流推广") {
                    zongMoney = (1 + 0.5) * zongMoney;
                }
                else if (conductBtn.label == "精准投放") {
                    zongMoney = (1 + 1) * zongMoney;
                }
                else {
                }
                var releaseRateNum = this.getReleaseSub();
                zongMoney = Math.floor(zongMoney * releaseRateNum);
                return zongMoney;
            };
            /** 获取天赋发布消费加成 */
            ReleaseView.prototype.getReleaseSub = function () {
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(3) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum = everyObj["point"];
                        if (everyObj["level"] == 3) {
                            if (curNum == 1) {
                                return 0.9;
                            }
                            else if (curNum == 2) {
                                return 0.8;
                            }
                            else if (curNum == 3) {
                                return 0.7;
                            }
                            else {
                                return 1;
                            }
                        }
                    }
                }
                else {
                    return 1;
                }
            };
            ReleaseView.prototype.setObjArrData = function () {
                this.sexObjArr.splice(0, this.sexObjArr.length);
                this.ageObjArr.splice(0, this.ageObjArr.length);
                this.eduObjArr.splice(0, this.eduObjArr.length);
                this.hasObjArr.splice(0, this.hasObjArr.length);
                for (var i = 0; i < ResourceManager.releaseDataArr.length; i++) {
                    var relObj = ResourceManager.releaseDataArr[i];
                    var typeID = relObj["typeID"];
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
            };
            ReleaseView.prototype.judgeSex = function (sexStr) {
                for (var j = 0; j < ResourceManager.releaseDataArr.length; j++) {
                    var relObj = ResourceManager.releaseDataArr[j];
                    if (sexStr.indexOf(relObj["name"]) != -1) {
                        this.hasObjArr.push(relObj);
                    }
                }
            };
            ReleaseView.prototype.judgeAge = function (ageStr) {
                for (var j = 0; j < this.ageObjArr.length; j++) {
                    var relObj = this.ageObjArr[j];
                    if (ageStr.indexOf(relObj["name"]) != -1) {
                        this.hasObjArr.push(relObj);
                    }
                }
            };
            ReleaseView.prototype.judgeEdu = function (eduStr) {
                for (var j = 0; j < this.eduObjArr.length; j++) {
                    var relObj = this.eduObjArr[j];
                    if (eduStr.indexOf(relObj["name"]) != -1) {
                        this.hasObjArr.push(relObj);
                    }
                }
            };
            ReleaseView.prototype.judgeSub = function (infoObj, hasObjArr) {
                var gain = 0;
                for (var i = 0; i < hasObjArr.length; i++) {
                    var hasObj = hasObjArr[i];
                    var themeArr = hasObj["theme"];
                    var buff1Arr = hasObj["buff1"];
                    var elementArr = hasObj["element"];
                    var buff2Arr = hasObj["buff2"];
                    var subStr = infoObj["subStr"];
                    var eleStr = infoObj["eleStr"];
                    var eleStrArr = eleStr.split(",");
                    var eleIdArr = this.getEleIdArr(eleStrArr);
                    var index = this.getsubIndex(subStr);
                    for (var j = 0; j < themeArr.length; j++) {
                        var theme = themeArr[j];
                        if (theme = index) {
                            gain = gain + buff1Arr[j];
                        }
                        else {
                            gain = gain + 0;
                        }
                    }
                    for (var m = 0; m < eleIdArr.length; m++) {
                        var eleId = eleIdArr[m];
                        for (var z = 0; z < elementArr.length; z++) {
                            var elemID = elementArr[z];
                            if (eleId == elemID) {
                                gain = gain + buff2Arr[z];
                            }
                            else {
                                gain = gain + 0;
                            }
                        }
                    }
                }
                return gain;
            };
            ReleaseView.prototype.getsubIndex = function (subStr) {
                for (var i = 0; i < GameConfig.subJectArr.length; i++) {
                    var sub = GameConfig.subJectArr[i];
                    if (sub == subStr) {
                        return i;
                    }
                }
            };
            ReleaseView.prototype.getEleIdArr = function (eleStrArr) {
                var eleIdArr = new Array();
                eleIdArr.splice(0, eleIdArr.length);
                for (var i = 0; i < eleStrArr.length; i++) {
                    var eleStr = eleStrArr[i];
                    for (var j = 0; j < GameConfig.elemArr.length; j++) {
                        var element = GameConfig.elemArr[j];
                        if (element == eleStr) {
                            eleIdArr.push(j);
                        }
                    }
                }
                return eleIdArr;
            };
            ReleaseView.prototype.savaDate = function (infoObj) {
                SceneLayerManager.sceneLayer.removeChild(this);
                SceneLayerManager.sceneLayer.removeChildByName("ReleaseViewMaskView");
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var obj = GameConfig.authorInfoArr[i];
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
            };
            ReleaseView.prototype.backView = function (infoObj) {
                SceneLayerManager.sceneLayer.removeChild(this);
                SceneLayerManager.sceneLayer.removeChildByName("ReleaseViewMaskView");
                this.operaTingView = new views.action.OperaTingView(infoObj);
                this.operaTingView.name = infoObj["name"] + "ope";
                SceneLayerManager.sceneLayer.addChild(this.operaTingView);
            };
            ReleaseView.prototype.createScoreTwo = function (obj) {
                var startDay = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                var diffDays = Hash.dateDifference(obj["releaseStartTime"], startDay);
                if (diffDays == 60) {
                    obj["totalGain"] = 0;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == obj["name"]) {
                            authorObj["totalGain"] = 0;
                        }
                    }
                }
                if (diffDays == 30) {
                    SceneLayerManager.sceneLayer.stopEvent();
                    GameConfig.displayPage += 1;
                    var curObj = SceneLayerManager.sceneLayer.selectObj(obj);
                    this.scoreView = new views.action.ScoreView(curObj);
                    SceneLayerManager.sceneLayer.addChild(this.scoreView);
                }
                else if (diffDays == obj["releaseTime"]) {
                    var subStr = obj["subStr"];
                    var eleStr = obj["eleStr"];
                    GameConfig.hisStr.replace(subStr + eleStr, "");
                    if (GameConfig.writingAuthor.length <= 0) {
                        GameConfig.hisStr = "";
                    }
                    obj["curStatus"] = 0;
                    GameConfig.displayPage += 1;
                    for (var i = 0; i < GameConfig.releaseTestObjArr.length; i++) {
                        var object = GameConfig.releaseTestObjArr[i];
                        if (obj["name"] == object["name"]) {
                            GameConfig.releaseTestObjArr.splice(i, 1);
                            SceneLayerManager.sceneLayer.stopEvent();
                            var curTotalObj = SceneLayerManager.sceneLayer.selectObj(obj);
                            this.totalScoreView = new views.action.TotalScoreView(curTotalObj);
                            SceneLayerManager.sceneLayer.addChild(this.totalScoreView);
                        }
                    }
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var object = GameConfig.authorInfoArr[i];
                        if (obj["name"] == object["name"]) {
                            object["curStatus"] = 0;
                        }
                    }
                    if (GameConfig.releaseTestObjArr.length <= 0) {
                        delete GameConfig.cachData["ReleaseObjArr"];
                    }
                }
            };
            ReleaseView.prototype.resetTotal = function (infoObj) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == infoObj["name"]) {
                        authorObj["totalGain"] = 0;
                    }
                }
            };
            ReleaseView.viewObj = new Object;
            return ReleaseView;
        }(ui.action.ReleaseUI));
        action.ReleaseView = ReleaseView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=ReleaseView.js.map