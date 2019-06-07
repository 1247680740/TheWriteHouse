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
        var SingleHoleUI = ui.action.SingleHoleUI;
        var PlotSingleItemUI = ui.action.PlotSingleItemUI;
        var SingleAuthorItemUI = ui.action.SingleAuthorItemUI;
        var WritingView = /** @class */ (function (_super) {
            __extends(WritingView, _super);
            function WritingView(infoObj) {
                var _this = _super.call(this) || this;
                /**当前选择的剧情名称集合 */
                _this.curSelectPlotName = [];
                /** 是否第一次打开写作界面 */
                _this.isFirstWriteBtn = true;
                /** 写作倒计时 */
                _this.timeNum = 30;
                /** 特约作者集合 */
                _this.digiAuthorInfoArr = [];
                _this.pos(0, 0); //(Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2
                _this.zOrder = 2;
                _this.addMask();
                _this.initData();
                _this.initView();
                _this.holeBtn.on(Laya.Event.CLICK, _this, _this.showHoleView);
                _this.plotBtn.on(Laya.Event.CLICK, _this, _this.showPlotView);
                _this.plotConffimBtn.on(Laya.Event.CLICK, _this, _this.showWritView, [infoObj]);
                _this.writBtn.on(Laya.Event.CLICK, _this, _this.showWritView, [infoObj]);
                _this.startWritingBtn.on(Laya.Event.CLICK, _this, _this.startWriting, [infoObj]);
                _this.assiPeo.on(Laya.Event.CLICK, _this, _this.showAuthorList, [infoObj]);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.closeBtnFn, [infoObj["name"]]);
                _this.backWritBtn.on(Laya.Event.CLICK, _this, _this.returnWriteBoxTwo);
                return _this;
            }
            WritingView.prototype.initView = function () {
                this.judgeStatus();
                this.themeStr.text = "选择一个灵感开始写作";
                this.plotBox.visible = false;
                this.plotGrid.visible = false;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
                this.curHoleNameArr = new Array();
                this.curHoleObjArr = new Array();
                this.curHoleNameArr.splice(0, this.curHoleNameArr.length);
                this.curHoleObjArr.splice(0, this.curHoleObjArr.length);
                this.holeGrid.removeChildren(0, this.holeGrid.numChildren);
                while (this.curHoleObjArr.length < 4) {
                    var holeObj = Hash.weight_rand(WritingConfig.enableHoleArr);
                    if (this.curHoleNameArr.indexOf(holeObj["theme"]) == -1) {
                        this.curHoleNameArr.push(holeObj["theme"]);
                        this.curHoleObjArr.push(holeObj);
                    }
                }
                for (var i = 0; i < this.curHoleObjArr.length; i++) {
                    var curholeObj = this.curHoleObjArr[i];
                    var gridItem = new SingleHoleUI();
                    gridItem.name = curholeObj["theme"];
                    gridItem.selectBg.skin = "gameUI/action/item1.png";
                    gridItem.icon.skin = "gameUI/action/fengmian.png";
                    gridItem.nameStr.text = curholeObj["theme"];
                    gridItem.tipStr.text = curholeObj["string"];
                    gridItem.selectIcon.visible = false;
                    this.holeGrid.addChild(gridItem);
                    if (i >= 2) {
                        gridItem.x = parseInt((i - 2) % 4 + "") * (gridItem.width + 20);
                        gridItem.y = (parseInt((i - 2) / 4 + "") + 1) * (gridItem.height + 10);
                    }
                    else {
                        gridItem.x = i * (gridItem.width + 20);
                    }
                    gridItem.on(Laya.Event.CLICK, this, this.checkHole, [curholeObj]);
                }
            };
            WritingView.prototype.checkHole = function (curholeObj) {
                for (var i = 0; i < this.holeGrid.numChildren; i++) {
                    var singgleHole = this.holeGrid.getChildAt(i);
                    singgleHole.selectBg.skin = "gameUI/action/item1.png";
                    singgleHole.selectIcon.visible = false;
                }
                var checkHole = this.holeGrid.getChildByName(curholeObj["theme"]);
                checkHole.selectBg.skin = "gameUI/action/item2.png";
                checkHole.selectIcon.visible = true;
                this.curHoleObj = curholeObj;
                this.plotBtn.mouseEnabled = true;
                var plotStr = this.plotBtn.getChildByName("plotStr");
                plotStr.color = "#000000";
                this.showPlotView(null);
            };
            WritingView.prototype.checkPlot = function (eleObj) {
                if (this.curSelectPlotName.indexOf(eleObj["element"]) != -1) {
                    var index = this.curSelectPlotName.indexOf(eleObj["element"]);
                    this.curSelectPlotName.splice(index, 1);
                    for (var i = 0; i < this.plotGrid.numChildren; i++) {
                        var plotSingleItemUI = this.plotGrid.getChildAt(i);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                    }
                    for (var j = 0; j < this.curSelectPlotName.length; j++) {
                        var element = this.curSelectPlotName[j];
                        var plotSingleItemUI = this.plotGrid.getChildByName(element);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                    }
                }
                else if (this.curSelectPlotName.length >= 3) {
                    TipLayerManager.tipLayer.showDrawBgTip("最多可选三个剧情");
                }
                else {
                    this.curSelectPlotName.push(eleObj["element"]);
                    for (var i = 0; i < this.plotGrid.numChildren; i++) {
                        var plotSingleItemUI = this.plotGrid.getChildAt(i);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                    }
                    for (var j = 0; j < this.curSelectPlotName.length; j++) {
                        var element = this.curSelectPlotName[j];
                        var plotSingleItemUI = this.plotGrid.getChildByName(element);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                    }
                }
            };
            WritingView.prototype.showHoleView = function () {
                this.curSelectBtnName = "holeBtn";
                this.themeStr.visible = true;
                this.themeStr.text = "选择一个灵感开始写作";
                this.holeGrid.visible = true;
                this.plotBox.visible = false;
                this.plotGrid.visible = false;
                this.plotConffimBtn.visible = false;
                this.plotConffimBtn.mouseEnabled = false;
                this.writBox.visible = false;
                this.friendBox.visible = false;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
                this.judgeStatus();
            };
            WritingView.prototype.showPlotView = function (event) {
                this.curSelectBtnName = "plotBtn";
                this.themeStr.visible = true;
                this.writBox.visible = false;
                this.friendBox.visible = false;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
                if (event != null) {
                    this.themeStr.text = "选择合适的剧情元素";
                    this.holeGrid.visible = false;
                    this.plotBox.visible = true;
                    this.plotGrid.visible = true;
                    this.plotConffimBtn.visible = true;
                    this.plotConffimBtn.mouseEnabled = true;
                }
                else {
                    this.themeStr.text = "选择合适的剧情元素";
                    this.holeGrid.visible = false;
                    this.plotBox.visible = true;
                    this.plotGrid.visible = true;
                    this.plotConffimBtn.visible = true;
                    this.plotConffimBtn.mouseEnabled = true;
                    this.plotGrid.vScrollBarSkin = "";
                    this.curSelectPlotName.splice(0, this.curSelectPlotName.length);
                    this.plotGrid.removeChildren(0, this.plotGrid.numChildren);
                    var wonArr = this.curHoleObj["wonderful"];
                    var perArr = this.curHoleObj["perfect"];
                    for (var i = 0; i < GameConfig.eleArr.length; i++) {
                        var eleObj = GameConfig.eleArr[i];
                        var plotItemUI = new PlotSingleItemUI();
                        plotItemUI.name = eleObj["element"];
                        plotItemUI.eleStr.text = eleObj["element"];
                        plotItemUI.hotStr.text = "中";
                        plotItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                        if (WritingConfig.actPlotObjArr.length > 0 && WritingConfig.actPlotArr.indexOf(this.curHoleObj["theme"]) != -1) {
                            var curActArr = new Array();
                            curActArr.splice(0, curActArr.length);
                            for (var index = 0; index < WritingConfig.actPlotObjArr.length; index++) {
                                var actObj = WritingConfig.actPlotObjArr[index];
                                if (actObj["name"] == this.curHoleObj["theme"]) {
                                    var valueObjArr = actObj["value"];
                                    for (var k = 0; k < valueObjArr.length; k++) {
                                        var valueObj = valueObjArr[k];
                                        curActArr.push(valueObj["name"]);
                                    }
                                    // let curActArr: Array<string> = actObj["value"];
                                    if (curActArr.indexOf(eleObj["element"]) != -1) {
                                        if (wonArr.indexOf(eleObj["id"]) != -1) {
                                            plotItemUI.adapterStr.text = "50%";
                                        }
                                        else if (perArr.indexOf(eleObj["id"]) != -1) {
                                            plotItemUI.adapterStr.text = "100%";
                                        }
                                        else {
                                            plotItemUI.adapterStr.text = "40%";
                                        }
                                    }
                                    else {
                                        plotItemUI.adapterStr.text = "未知";
                                    }
                                }
                            }
                        }
                        else {
                            plotItemUI.adapterStr.text = "未知";
                        }
                        plotItemUI.x = 0;
                        plotItemUI.y = i * (plotItemUI.height + 7);
                        this.plotGrid.addChild(plotItemUI);
                        // 点击每一项选择剧情，最多选择三次
                        plotItemUI.on(Laya.Event.CLICK, this, this.checkPlot, [eleObj]);
                    }
                }
                this.judgeStatus();
            };
            WritingView.prototype.showWritView = function (infoObj) {
                if (this.curSelectPlotName.length <= 0) {
                    TipLayerManager.tipLayer.showDrawBgTip("请选择至少一个剧情元素");
                }
                else {
                    this.curSelectBtnName = "writBtn";
                    this.themeStr.visible = false;
                    this.holeGrid.visible = false;
                    this.plotGrid.visible = false;
                    this.plotBox.visible = false;
                    this.friendBox.visible = false;
                    this.plotConffimBtn.visible = false;
                    this.plotConffimBtn.mouseEnabled = false;
                    this.writBox.visible = true;
                    this.writBtn.mouseEnabled = true;
                    this.backBtn.visible = true;
                    this.backBtn.mouseEnabled = true;
                    this.backWritBtn.visible = false;
                    this.backWritBtn.mouseEnabled = false;
                    if (this.isFirstWriteBtn) {
                        this.isFirstWriteBtn = false;
                        var writStr = this.writBtn.getChildByName("writStr");
                        writStr.color = "#000000";
                        this.authorIcon.skin = infoObj["icon"];
                        this.Iam.skin = infoObj["icon"];
                        this.assiPeo.skin = "gameUI/action/select_helper.png";
                        this.authorName.text = infoObj["name"];
                        this.articalName.text = "新作品" + GameConfig.articalNameArr.length;
                    }
                    var proArr = this.curHoleObj["standard"];
                    this.peoMin.value = 0;
                    this.stoMin.value = 0;
                    this.newMin.value = 0;
                    this.depMin.value = 0;
                    if (this.curHoleObj["string"].length > 9) {
                        this.ellipStr.visible = true;
                    }
                    else {
                        this.ellipStr.visible = false;
                    }
                    this.articalTip.text = this.curHoleObj["string"];
                    this.labelTip.text = "标签：" + this.returnPlotStr();
                    if (this.labelTip.text.length > 9) {
                        this.ellipStrTwo.visible = true;
                    }
                    else {
                        this.ellipStrTwo.visible = false;
                    }
                    this.peoMax.value = proArr[0] / 100;
                    this.stoMax.value = proArr[1] / 100;
                    this.newMax.value = proArr[2] / 100;
                    this.depMax.value = proArr[3] / 100;
                    switch (this.curSelectPlotName.length) {
                        case 2:
                            this.peoMax.value = this.peoMax.value + 0.05;
                            this.stoMax.value = this.stoMax.value + 0.05;
                            this.newMax.value = this.newMax.value + 0.05;
                            this.depMax.value = this.depMax.value + 0.05;
                            break;
                        case 3:
                            this.peoMax.value = this.peoMax.value + 0.1;
                            this.stoMax.value = this.stoMax.value + 0.1;
                            this.newMax.value = this.newMax.value + 0.1;
                            this.depMax.value = this.depMax.value + 0.1;
                            break;
                    }
                    this.peoStr.text = parseInt(this.peoMin.value * 100 + "") + "/100";
                    this.stoStr.text = parseInt(this.stoMin.value * 100 + "") + "/100";
                    this.newStr.text = parseInt(this.newMin.value * 100 + "") + "/100";
                    this.depStr.text = parseInt(this.depMin.value * 100 + "") + "/100";
                    this.judgeStatus();
                }
            };
            WritingView.prototype.startWriting = function (infoObj) {
                var actSubArr = new Array();
                var returnArrAc = new Array();
                returnArrAc.splice(0, returnArrAc.length);
                actSubArr.splice(0, actSubArr.length);
                if (this.startWritingBtn.label == "开始写作") {
                    SceneLayerManager.sceneLayer.removeChildByName(infoObj["name"] + "tri");
                    GameConfig.hisStr = GameConfig.hisStr + infoObj["subStr"] + infoObj["eleStr"];
                    /** 签约作者心情值计算 */
                    if (this.curSelectAssiAuthor.hasOwnProperty("name")) {
                        for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                            var auObj = GameConfig.authorInfoArr[i];
                            if (auObj["name"] == this.curSelectAssiAuthor["name"]) {
                                auObj["mood"] = auObj["mood"] - 20;
                            }
                        }
                    }
                    /** 将特殊灵感从可选灵感中剔除 */
                    for (var d = 0; d < this.curHoleObjArr.length; d++) {
                        var holeObj = this.curHoleObjArr[d];
                        if (holeObj["sole"] == 1) {
                            for (var o = 0; o < WritingConfig.enableHoleArr.length; o++) {
                                var enaObj = WritingConfig.enableHoleArr[o];
                                if (enaObj["id"] == holeObj["id"]) {
                                    WritingConfig.enableHoleArr.splice(o, 1);
                                }
                            }
                        }
                    }
                    if (GameConfig.articalNameArr.indexOf(this.articalName.text) == -1) {
                        GameConfig.articalNameArr.push(this.articalName.text);
                        GameConfig.cachData["articalNameArr"] = GameConfig.articalNameArr;
                    }
                    /** 将选择的题材存进激活数据中 */
                    if (WritingConfig.actPlotArr.indexOf(this.curHoleObj["theme"]) == -1) {
                        WritingConfig.actPlotArr.push(this.curHoleObj["theme"]);
                    }
                    for (var k = 0; k < WritingConfig.actPlotObjArr.length; k++) {
                        var acObj = WritingConfig.actPlotObjArr[k];
                        actSubArr.push(acObj["name"]);
                    }
                    if (actSubArr.indexOf(this.curHoleObj["theme"]) != -1) {
                        for (var k = 0; k < WritingConfig.actPlotObjArr.length; k++) {
                            var acObj = WritingConfig.actPlotObjArr[k];
                            var vueArr = new Array();
                            vueArr.splice(0, vueArr.length);
                            if (acObj["name"] == this.curHoleObj["theme"]) {
                                var valueObjArr = acObj["value"];
                                for (var p = 0; p < valueObjArr.length; p++) {
                                    var valueObj = valueObjArr[p];
                                    vueArr.push(valueObj["name"]);
                                }
                                // let vueArr: Array<string> = acObj["value"];
                                for (var p = 0; p < this.curSelectPlotName.length; p++) {
                                    var plotName = this.curSelectPlotName[p];
                                    if (vueArr.indexOf(plotName) == -1) {
                                        var newObj = { "name": plotName, "times": 1 };
                                        // vueArr.push(plotName);
                                        valueObjArr.push(newObj);
                                    }
                                    else {
                                        for (var d = 0; d < valueObjArr.length; d++) {
                                            var valueObj = valueObjArr[d];
                                            if (valueObj["name"] == plotName) {
                                                valueObj["times"] = valueObj["times"] + 1;
                                            }
                                            // vueArr.push(valueObj["name"]);
                                        }
                                    }
                                }
                                acObj["value"] = valueObjArr;
                            }
                        }
                    }
                    else {
                        var nameObj = new Object();
                        var newObjArr = new Array();
                        newObjArr.splice(0, newObjArr.length);
                        nameObj["name"] = this.curHoleObj["theme"];
                        for (var index = 0; index < this.curSelectPlotName.length; index++) {
                            var eleStr = this.curSelectPlotName[index];
                            var newObj = { "name": eleStr, "times": 1 };
                            newObjArr.push(newObj);
                        }
                        // nameObj["value"] = this.curSelectPlotName;
                        nameObj["value"] = newObjArr;
                        WritingConfig.actPlotObjArr.push(nameObj);
                    }
                    /** 判断当前作者选择的元素ID并保存 */
                    var eleIdArr = new Array();
                    eleIdArr.splice(0, eleIdArr.length);
                    for (var k = 0; k < this.curSelectPlotName.length; k++) {
                        var pltName = this.curSelectPlotName[k];
                        for (var n = 0; n < ResourceManager.elementArr.length; n++) {
                            var elementObj = ResourceManager.elementArr[n];
                            if (elementObj["element"] == pltName && eleIdArr.indexOf(elementObj["id"]) == -1) {
                                eleIdArr.push(elementObj["id"]);
                            }
                        }
                    }
                    for (var l = 0; l < GameConfig.authorInfoArr.length; l++) {
                        var auObj = GameConfig.authorInfoArr[l];
                        if (auObj["name"] == infoObj["name"]) {
                            auObj["eleIdArr"] = eleIdArr;
                            infoObj["eleIdArr"] = eleIdArr;
                        }
                    }
                    /** 将此作者添加进正在写作的作者行列中 */
                    if (GameConfig.writingAuthor.indexOf(this.authorName.text) == -1) {
                        GameConfig.writingAuthor.push(this.authorName.text);
                    }
                    GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                    GameConfig.cachData["actPlotArr"] = WritingConfig.actPlotArr;
                    GameConfig.cachData["enableHoleArr"] = WritingConfig.enableHoleArr;
                    GameConfig.cachData["actPlotObjArr"] = WritingConfig.actPlotObjArr;
                    /** 判断作者数据与协助者数据大小 */
                    if (this.curSelectAssiAuthor.hasOwnProperty("name")) {
                        var maxAssObj = this.getMaxCurObj(this.curSelectAssiAuthor);
                        returnArrAc = this.replaceData(maxAssObj, infoObj);
                        infoObj = returnArrAc[0];
                    }
                    else if (this.curSelectContriAuthor.hasOwnProperty("name")) {
                        var maxConObj = this.getMaxCurObj(this.curSelectContriAuthor);
                        returnArrAc = this.replaceData(maxConObj, infoObj);
                        infoObj = returnArrAc[0];
                    }
                    else {
                        returnArrAc = [infoObj, 0];
                    }
                    this.assiPeo.mouseEnabled = false;
                    this.holeBtn.mouseEnabled = false;
                    this.plotBtn.mouseEnabled = false;
                    var holeStr = this.holeBtn.getChildByName("holeStr");
                    var plotStr = this.plotBtn.getChildByName("plotStr");
                    holeStr.color = "#A09F97";
                    plotStr.color = "#A09F97";
                    this.startWritingBtn.label = "00:30";
                    Laya.timer.loop(1000, this, this.timeBack);
                    Laya.timer.loop(2000, this, this.addPro, [returnArrAc]);
                }
                else if (this.startWritingBtn.label == "发布作品") {
                    SceneLayerManager.sceneLayer.removeChild(this);
                    SceneLayerManager.sceneLayer.removeChildByName("WritingViewConTain");
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == infoObj["name"]) {
                            authorObj["subStr"] = this.curHoleObj["theme"];
                            authorObj["eleStr"] = this.returnEleStr();
                            authorObj["articalTip"] = this.curHoleObj["string"];
                            authorObj["peoplePro"] = parseInt(this.peoMin.value * 100 + "");
                            authorObj["storyPro"] = parseInt(this.stoMin.value * 100 + "");
                            authorObj["innovatePro"] = parseInt(this.newMin.value * 100 + "");
                            authorObj["depthPro"] = parseInt(this.depMin.value * 100 + "");
                            authorObj["peopleProMax"] = parseInt(this.peoMax.value * 100 + "");
                            authorObj["storyProMax"] = parseInt(this.stoMax.value * 100 + "");
                            authorObj["innovateProMax"] = parseInt(this.newMax.value * 100 + "");
                            authorObj["depthProMax"] = parseInt(this.depMax.value * 100 + "");
                            authorObj["pageName"] = this.articalName.text;
                            this.issueView = new views.action.IssueView(authorObj); //ReleaseView(authorObj);
                            this.issueView.name = "issueView";
                            SceneLayerManager.sceneLayer.addChild(this.issueView);
                        }
                    }
                }
                else if (this.startWritingBtn.label == "闭关写作") {
                    var chaPeo = 0;
                    var chaSto = 0;
                    var chaNew = 0;
                    var chaDep = 0;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == infoObj["name"]) {
                            authorObj["subStr"] = this.curHoleObj["theme"];
                            authorObj["eleStr"] = this.returnEleStr();
                            authorObj["articalTip"] = this.curHoleObj["string"];
                            authorObj["peoplePro"] = parseInt(this.peoMin.value * 100 + "");
                            authorObj["storyPro"] = parseInt(this.stoMin.value * 100 + "");
                            authorObj["innovatePro"] = parseInt(this.newMin.value * 100 + "");
                            authorObj["depthPro"] = parseInt(this.depMin.value * 100 + "");
                            authorObj["peopleProMax"] = parseInt(this.peoMax.value * 100 + "");
                            authorObj["storyProMax"] = parseInt(this.stoMax.value * 100 + "");
                            authorObj["innovateProMax"] = parseInt(this.newMax.value * 100 + "");
                            authorObj["depthProMax"] = parseInt(this.depMax.value * 100 + "");
                            authorObj["pageName"] = this.articalName.text;
                            authorObj["curStatus"] = 2;
                            if (this.peoMin.value < this.peoMax.value) {
                                chaPeo = parseInt(this.peoMax.value * 100 + "") - parseInt(this.peoMin.value * 100 + "");
                            }
                            if (this.stoMin.value < this.stoMax.value) {
                                chaSto = parseInt(this.stoMax.value * 100 + "") - parseInt(this.stoMin.value * 100 + "");
                            }
                            if (this.newMin.value < this.newMax.value) {
                                chaNew = parseInt(this.newMax.value * 100 + "") - parseInt(this.newMin.value * 100 + "");
                            }
                            if (this.depMin.value < this.depMax.value) {
                                chaDep = parseInt(this.depMax.value * 100 + "") - parseInt(this.depMin.value * 100 + "");
                            }
                            var overNum = (chaPeo + chaSto + chaNew + chaDep) * 2;
                            authorObj["overNum"] = overNum;
                        }
                    }
                    GameConfig.displayPage -= 1;
                    SceneLayerManager.sceneLayer.removeChild(this);
                    SceneLayerManager.sceneLayer.removeChildByName("WritingViewConTain");
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                        list.visible = true;
                    }
                    if (GameConfig.displayPage <= 0) {
                        SceneLayerManager.sceneLayer.openEvent();
                    }
                    Hash.playMusic(2);
                }
                else {
                    return;
                }
            };
            WritingView.prototype.getMaxCurObj = function (curSelObj) {
                var sortArr = new Array();
                sortArr.splice(0, sortArr.length);
                for (var i = 0; i < GameConfig.guding.length; i++) {
                    var obj = GameConfig.guding[i];
                    if (obj["name"] == curSelObj["name"]) {
                        var pasObj = { "id": obj["id"], "sub": "文笔", "value": obj["passionMin"], "subId": 1 }; //文笔
                        var preObj = { "id": obj["id"], "sub": "构思", "value": obj["precisenessMin"], "subId": 2 }; //构思
                        var disObj = { "id": obj["id"], "sub": "阅历", "value": obj["disciplineMin"], "subId": 4 }; //阅历
                        var curObj = { "id": obj["id"], "sub": "脑洞", "value": obj["curiousMin"], "subId": 3 }; //脑洞
                        sortArr.push(pasObj);
                        sortArr.push(preObj);
                        sortArr.push(disObj);
                        sortArr.push(curObj);
                        sortArr = sortArr.sort(this.compare('value', 'subId'));
                        return sortArr[0];
                    }
                }
            };
            /** 回传数组，里面包含比原著大的类型 */
            WritingView.prototype.replaceData = function (maxObj, infoObj) {
                var returnArr = new Array();
                returnArr.splice(0, returnArr.length);
                switch (maxObj["sub"]) {
                    case "文笔":
                        if (maxObj["value"] > infoObj["passionMin"]) {
                            infoObj["passionMin"] = maxObj["value"];
                            returnArr = [infoObj, 1];
                            return returnArr;
                        }
                        else {
                            returnArr = [infoObj, 0];
                            return returnArr;
                        }
                    case "构思":
                        if (maxObj["value"] > infoObj["precisenessMin"]) {
                            infoObj["precisenessMin"] = maxObj["value"];
                            returnArr = [infoObj, 2];
                            return returnArr;
                        }
                        else {
                            returnArr = [infoObj, 0];
                            return returnArr;
                        }
                    case "阅历":
                        if (maxObj["value"] > infoObj["disciplineMin"]) {
                            infoObj["disciplineMin"] = maxObj["value"];
                            returnArr = [infoObj, 3];
                            return returnArr;
                        }
                        else {
                            returnArr = [infoObj, 0];
                            return returnArr;
                        }
                    case "脑洞":
                        if (maxObj["value"] > infoObj["curiousMin"]) {
                            infoObj["curiousMin"] = maxObj["value"];
                            returnArr = [infoObj, 4];
                            return returnArr;
                        }
                        else {
                            returnArr = [infoObj, 0];
                            return returnArr;
                        }
                }
            };
            WritingView.prototype.returnEleStr = function () {
                var eleStr = "";
                for (var i = 0; i < this.curSelectPlotName.length; i++) {
                    var plotName = this.curSelectPlotName[i];
                    eleStr = eleStr + plotName + ",";
                }
                eleStr = eleStr.substring(0, eleStr.length - 1);
                return eleStr;
            };
            /** 显示协助作者列表 */
            WritingView.prototype.showAuthorList = function (infoObj) {
                this.themeStr.visible = false;
                this.holeGrid.visible = false;
                this.plotGrid.visible = false;
                this.plotBox.visible = false;
                this.plotConffimBtn.visible = false;
                this.plotConffimBtn.mouseEnabled = false;
                this.writBox.visible = false;
                this.writBtn.visible = false;
                this.holeBtn.visible = false;
                this.plotBtn.visible = false;
                this.writBtn.mouseEnabled = false;
                this.holeBtn.mouseEnabled = false;
                this.plotBtn.mouseEnabled = false;
                this.friendBox.visible = true;
                this.backBtn.visible = false;
                this.backBtn.mouseEnabled = false;
                this.backWritBtn.visible = true;
                this.backWritBtn.mouseEnabled = true;
                var oneArr = new Array();
                var twoArr = new Array();
                this.siginGrid.removeChildren(0, this.siginGrid.numChildren);
                this.contriGrid.removeChildren(0, this.contriGrid.numChildren);
                this.siginGrid.vScrollBarSkin = "";
                this.contriGrid.vScrollBarSkin = "";
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var curObj = GameConfig.authorInfoArr[i];
                    if (curObj["name"] != infoObj["name"]) {
                        var pushObj = this.getBigObj(curObj);
                        oneArr.push(pushObj);
                    }
                }
                for (var m = 0; m < this.digiAuthorInfoArr.length; m++) {
                    var digiObj = this.digiAuthorInfoArr[m];
                    if (digiObj["name"] != infoObj["name"]) {
                        var pushDigiObj = this.getContriAuthor(digiObj);
                        twoArr.push(pushDigiObj);
                    }
                }
                oneArr = oneArr.sort(this.compare('value', 'id'));
                twoArr = twoArr.sort(this.compare('value', 'id'));
                /** 给签约作者栏赋值 */
                for (var j = 0; j < oneArr.length; j++) {
                    var smallObj = oneArr[j];
                    var singleAuthorItemUI = new SingleAuthorItemUI();
                    singleAuthorItemUI.name = smallObj["name"];
                    singleAuthorItemUI.authorName.text = smallObj["name"];
                    switch (smallObj["quality"]) {
                        case 1:
                            singleAuthorItemUI.authorName.color = "#8AD281";
                            break;
                        case 2:
                            singleAuthorItemUI.authorName.color = "#4E94FF";
                            break;
                        case 3:
                            singleAuthorItemUI.authorName.color = "#A5A5FF";
                            break;
                        case 4:
                            singleAuthorItemUI.authorName.color = "#FFB200";
                            break;
                    }
                    singleAuthorItemUI.typeStr.text = smallObj["sub"];
                    singleAuthorItemUI.typeVue.text = smallObj["value"] + "";
                    singleAuthorItemUI.lastStr.text = "心情";
                    singleAuthorItemUI.lastVue.text = smallObj["mood"] + "";
                    if (smallObj["mood"] < 40) {
                        singleAuthorItemUI.lastVue.color = "#FF0000";
                    }
                    else {
                        singleAuthorItemUI.lastVue.color = "#A3C880";
                    }
                    singleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                    singleAuthorItemUI.x = 0;
                    singleAuthorItemUI.y = j * (singleAuthorItemUI.height + 15);
                    this.siginGrid.addChild(singleAuthorItemUI);
                    singleAuthorItemUI.on(Laya.Event.CLICK, this, this.checkInfoAuthor, [smallObj]);
                }
                if (this.curSelectAssiAuthor.hasOwnProperty("name")) {
                    var signUI = this.siginGrid.getChildByName(this.curSelectAssiAuthor["name"]);
                    signUI.selectBg.skin = "gameUI/action/ditu4.png";
                }
                /**给特约作者栏赋值 */
                for (var n = 0; n < twoArr.length; n++) {
                    var twoObj = twoArr[n];
                    var dingleAuthorItemUI = new SingleAuthorItemUI();
                    dingleAuthorItemUI.name = twoObj["name"];
                    dingleAuthorItemUI.authorName.text = twoObj["name"];
                    switch (twoObj["quality"]) {
                        case 1:
                            dingleAuthorItemUI.authorName.color = "#8AD281";
                            break;
                        case 2:
                            dingleAuthorItemUI.authorName.color = "#4E94FF";
                            break;
                        case 3:
                            dingleAuthorItemUI.authorName.color = "#A5A5FF";
                            break;
                        case 4:
                            dingleAuthorItemUI.authorName.color = "#FFB200";
                            break;
                    }
                    dingleAuthorItemUI.typeStr.text = twoObj["sub"];
                    dingleAuthorItemUI.typeVue.text = twoObj["value"] + "";
                    dingleAuthorItemUI.lastStr.text = "花费";
                    dingleAuthorItemUI.lastVue.text = twoObj["cost"] + "";
                    if (twoObj["cost"] > GameConfig.money) {
                        dingleAuthorItemUI.lastVue.color = "#FF0000";
                    }
                    else {
                        dingleAuthorItemUI.lastVue.color = "#A3C880";
                    }
                    dingleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                    dingleAuthorItemUI.x = 0;
                    dingleAuthorItemUI.y = n * (dingleAuthorItemUI.height + 15);
                    this.contriGrid.addChild(dingleAuthorItemUI);
                    dingleAuthorItemUI.on(Laya.Event.CLICK, this, this.checkContriInfoAuthor, [twoObj]);
                }
                if (this.curSelectContriAuthor.hasOwnProperty("name")) {
                    var contriUI = this.contriGrid.getChildByName(this.curSelectContriAuthor["name"]);
                    contriUI.selectBg.skin = "gameUI/action/ditu4.png";
                }
            };
            /** 选择签约作者 */
            WritingView.prototype.checkInfoAuthor = function (smallObj) {
                if (smallObj["mood"] < 40) {
                    TipLayerManager.tipLayer.showDrawBgTip("我太累了，也该歇歇了");
                    this.returnWriteBox();
                }
                else {
                    if (smallObj["name"] == this.curSelectAssiAuthor["name"]) {
                        for (var key in this.curSelectAssiAuthor) {
                            if (this.curSelectAssiAuthor.hasOwnProperty(key)) {
                                delete this.curSelectAssiAuthor[key];
                            }
                        }
                        this.returnWriteBox();
                        return;
                    }
                    else {
                        this.curSelectAssiAuthor = smallObj;
                        for (var i = 0; i < this.siginGrid.numChildren; i++) {
                            var singleAuthorItemUI = this.siginGrid.getChildAt(i);
                            singleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                        }
                        var singleAuthorItemUICheck = this.siginGrid.getChildByName(smallObj["name"]);
                        singleAuthorItemUICheck.selectBg.skin = "gameUI/action/ditu4.png";
                        /** 特约作者恢复初始信息*/
                        var key_1;
                        for (key_1 in this.curSelectContriAuthor) {
                            if (this.curSelectContriAuthor.hasOwnProperty(key_1)) {
                                delete this.curSelectContriAuthor[key_1];
                            }
                        }
                        this.curSelectContriAuthor = new Object();
                        for (var n = 0; n < this.contriGrid.numChildren; n++) {
                            var singleAuthorItemUI = this.contriGrid.getChildAt(n);
                            singleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                        }
                        this.returnWriteBox();
                    }
                }
            };
            /** 选择特约作者 */
            WritingView.prototype.checkContriInfoAuthor = function (twoObj) {
                if (twoObj["cost"] > GameConfig.money) {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不足");
                    this.returnWriteBox();
                }
                else {
                    if (twoObj["name"] == this.curSelectContriAuthor["name"]) {
                        for (var key in this.curSelectContriAuthor) {
                            if (this.curSelectContriAuthor.hasOwnProperty(key)) {
                                delete this.curSelectContriAuthor[key];
                            }
                        }
                        this.returnWriteBox();
                        return;
                    }
                    else {
                        GameConfig.money = GameConfig.money + this.payMoney - twoObj["cost"];
                        views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                        this.payMoney = twoObj["cost"];
                        this.curSelectContriAuthor = twoObj;
                        for (var i = 0; i < this.contriGrid.numChildren; i++) {
                            var singleAuthorItemUI = this.contriGrid.getChildAt(i);
                            singleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                        }
                        var singleAuthorItemUICheck = this.contriGrid.getChildByName(twoObj["name"]);
                        singleAuthorItemUICheck.selectBg.skin = "gameUI/action/ditu4.png";
                        /** 签约作者恢复初始信息*/
                        var key_2;
                        for (key_2 in this.curSelectAssiAuthor) {
                            if (this.curSelectAssiAuthor.hasOwnProperty(key_2)) {
                                delete this.curSelectAssiAuthor[key_2];
                            }
                        }
                        this.curSelectAssiAuthor = new Object();
                        for (var n = 0; n < this.siginGrid.numChildren; n++) {
                            var singleAuthorItemUI = this.siginGrid.getChildAt(n);
                            singleAuthorItemUI.selectBg.skin = "gameUI/action/ditu3.png";
                        }
                        this.returnWriteBox();
                    }
                }
            };
            WritingView.prototype.returnWriteBox = function () {
                this.writBox.visible = true;
                this.friendBox.visible = false;
                this.writBtn.visible = true;
                this.holeBtn.visible = true;
                this.plotBtn.visible = true;
                this.writBtn.mouseEnabled = true;
                this.holeBtn.mouseEnabled = true;
                this.plotBtn.mouseEnabled = true;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
                var iconStr;
                if (this.curSelectAssiAuthor.hasOwnProperty("name")) {
                    iconStr = this.getMathAuthor(this.curSelectAssiAuthor);
                    this.assiPeo.skin = iconStr;
                }
                else if (this.curSelectContriAuthor.hasOwnProperty("name")) {
                    iconStr = this.getMathAuthor(this.curSelectContriAuthor);
                    this.assiPeo.skin = iconStr;
                }
                else {
                    this.assiPeo.skin = "gameUI/action/select_helper.png";
                }
            };
            WritingView.prototype.returnWriteBoxTwo = function () {
                this.writBox.visible = true;
                this.friendBox.visible = false;
                this.writBtn.visible = true;
                this.holeBtn.visible = true;
                this.plotBtn.visible = true;
                this.holeBtn.mouseEnabled = true;
                this.plotBtn.mouseEnabled = true;
                this.writBtn.mouseEnabled = true;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
            };
            WritingView.prototype.getMathAuthor = function (obj) {
                for (var m = 0; m < GameConfig.guding.length; m++) {
                    var guObj = GameConfig.guding[m];
                    if (guObj["name"] == obj["name"]) {
                        return guObj["icon"];
                    }
                }
            };
            WritingView.prototype.getBigObj = function (curInfoObj) {
                var sortArr = new Array();
                sortArr.splice(0, sortArr.length);
                var pasObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "文笔", "value": curInfoObj["passionMin"], "subId": 1, "mood": curInfoObj["mood"], "quality": curInfoObj["quality"] }; //文笔
                var preObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "构思", "value": curInfoObj["precisenessMin"], "subId": 2, "mood": curInfoObj["mood"], "quality": curInfoObj["quality"] }; //构思
                var disObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "阅历", "value": curInfoObj["disciplineMin"], "subId": 4, "mood": curInfoObj["mood"], "quality": curInfoObj["quality"] }; //阅历
                var curObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "脑洞", "value": curInfoObj["curiousMin"], "subId": 3, "mood": curInfoObj["mood"], "quality": curInfoObj["quality"] }; //脑洞
                sortArr.push(pasObj);
                sortArr.push(preObj);
                sortArr.push(disObj);
                sortArr.push(curObj);
                sortArr = sortArr.sort(this.compare('value', 'subId'));
                return sortArr[sortArr.length - 1];
            };
            WritingView.prototype.getContriAuthor = function (curInfoObj) {
                var contriSortArr = new Array();
                contriSortArr.splice(0, contriSortArr.length);
                var pasObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "文笔", "value": curInfoObj["passionMin"], "subId": 1, "cost": curInfoObj["special_cost"], "quality": curInfoObj["quality"] }; //文笔
                var preObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "构思", "value": curInfoObj["precisenessMin"], "subId": 2, "cost": curInfoObj["special_cost"], "quality": curInfoObj["quality"] }; //构思
                var disObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "阅历", "value": curInfoObj["disciplineMin"], "subId": 4, "cost": curInfoObj["special_cost"], "quality": curInfoObj["quality"] }; //阅历
                var curObj = { "name": curInfoObj["name"], "id": curInfoObj["id"], "sub": "脑洞", "value": curInfoObj["curiousMin"], "subId": 3, "cost": curInfoObj["special_cost"], "quality": curInfoObj["quality"] }; //脑洞
                contriSortArr.push(pasObj);
                contriSortArr.push(preObj);
                contriSortArr.push(disObj);
                contriSortArr.push(curObj);
                contriSortArr = contriSortArr.sort(this.compare('value', 'subId'));
                return contriSortArr[0];
            };
            /** 数组对象排序 */
            WritingView.prototype.compare = function (property, proTwo) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    var value3 = obj1[proTwo];
                    var value4 = obj2[proTwo];
                    if (value1 == value2) {
                        return value3 - value4; //升序
                    }
                    else {
                        return value2 - value1; // 升序
                    }
                };
            };
            WritingView.prototype.timeBack = function () {
                this.timeNum -= 1;
                if (this.timeNum < 0) {
                    Laya.timer.clearAll(this);
                    if (this.peoMin.value >= this.peoMax.value && this.stoMin.value >= this.stoMax.value && this.newMin.value >= this.newMax.value && this.depMin.value >= this.depMax.value) {
                        this.startWritingBtn.label = "发布作品";
                    }
                    else if (this.peoMin.value < this.peoMax.value || this.stoMin.value < this.stoMax.value || this.newMin.value < this.newMax.value || this.depMin.value < this.depMax.value) {
                        this.startWritingBtn.label = "闭关写作";
                        this.IamStr.visible = true;
                        this.assiStr.visible = false;
                        this.IamStr.text = "好像还不够好，我努力一下";
                    }
                }
                else {
                    if (this.timeNum < 10) {
                        var str = "00:0" + this.timeNum;
                        this.startWritingBtn.label = str;
                    }
                    else {
                        var str = "00:" + this.timeNum;
                        this.startWritingBtn.label = str;
                    }
                }
            };
            WritingView.prototype.addPro = function (returnArrAc) {
                var infoObj = returnArrAc[0];
                var statusNum = returnArrAc[1];
                var totalNum = infoObj["passionMin"] + infoObj["precisenessMin"] + infoObj["disciplineMin"] + infoObj["curiousMin"]; //文笔  构思  阅历  脑洞
                var hashNum = Hash.getRandomNum(10, 30) / 100;
                var addNum = Math.round(totalNum / 5 * hashNum);
                var weiArr = new Array();
                weiArr.splice(0, weiArr.length);
                var pasObj = { "name": "passionMin", "weight": infoObj["passionMin"] };
                var preObj = { "name": "precisenessMin", "weight": infoObj["precisenessMin"] };
                var disObj = { "name": "disciplineMin", "weight": infoObj["disciplineMin"] };
                var curObj = { "name": "curiousMin", "weight": infoObj["curiousMin"] };
                weiArr.push(pasObj);
                weiArr.push(preObj);
                weiArr.push(disObj);
                weiArr.push(curObj);
                var bigObj = Hash.weight_rand(weiArr);
                var index = Math.floor((Math.random() * 4));
                switch (bigObj["name"]) {
                    case "passionMin":
                        var peoNum = this.peoMin.value + addNum / 100;
                        if (statusNum == 1) {
                            this.judgeStrStatus(statusNum, index);
                        }
                        else {
                            this.assiStr.visible = false;
                            this.IamStr.visible = true;
                            this.IamStr.text = WritingConfig.peoLangue[index];
                        }
                        Laya.Tween.to(this.peoMin, { value: peoNum }, 1000, null, Handler.create(this, this.changePeoVue, [peoNum, addNum, statusNum, "passionMin"]));
                        break;
                    case "precisenessMin":
                        var stoNum = this.stoMin.value + addNum / 100;
                        if (statusNum == 2) {
                            this.judgeStrStatus(statusNum, index);
                        }
                        else {
                            this.assiStr.visible = false;
                            this.IamStr.visible = true;
                            this.IamStr.text = WritingConfig.peoLangue[index];
                        }
                        Laya.Tween.to(this.stoMin, { value: stoNum }, 1000, null, Handler.create(this, this.changeStoVue, [stoNum, addNum, statusNum, "precisenessMin"]));
                        break;
                    case "disciplineMin":
                        var depNum = this.depMin.value + addNum / 100;
                        if (statusNum == 3) {
                            this.judgeStrStatus(statusNum, index);
                        }
                        else {
                            this.assiStr.visible = false;
                            this.IamStr.visible = true;
                            this.IamStr.text = WritingConfig.peoLangue[index];
                        }
                        Laya.Tween.to(this.depMin, { value: depNum }, 1000, null, Handler.create(this, this.changeDepVue, [depNum, addNum, statusNum, "disciplineMin"]));
                        break;
                    case "curiousMin":
                        var newNum = this.newMin.value + addNum / 100;
                        if (statusNum == 4) {
                            this.judgeStrStatus(statusNum, index);
                        }
                        else {
                            this.assiStr.visible = false;
                            this.IamStr.visible = true;
                            this.IamStr.text = WritingConfig.peoLangue[index];
                        }
                        Laya.Tween.to(this.newMin, { value: newNum }, 1000, null, Handler.create(this, this.changeNewVue, [newNum, addNum, statusNum, "curiousMin"]));
                        break;
                }
            };
            WritingView.prototype.judgeStrStatus = function (statusNum, index) {
                this.IamStr.visible = false;
                this.assiStr.visible = true;
                this.assiStr.text = WritingConfig.peoLangue[index];
            };
            WritingView.prototype.judgeStrStatusTwo = function (statusNum, txtStr, addNum, typeStr) {
                switch (typeStr) {
                    case "passionMin":
                        if (statusNum == 1) {
                            this.commonOne(txtStr, addNum);
                        }
                        else {
                            this.commonTwo(txtStr, addNum);
                        }
                        break;
                    case "precisenessMin":
                        if (statusNum == 2) {
                            this.commonOne(txtStr, addNum);
                        }
                        else {
                            this.commonTwo(txtStr, addNum);
                        }
                        break;
                    case "disciplineMin":
                        if (statusNum == 3) {
                            this.commonOne(txtStr, addNum);
                        }
                        else {
                            this.commonTwo(txtStr, addNum);
                        }
                        break;
                    case "curiousMin":
                        if (statusNum == 4) {
                            this.commonOne(txtStr, addNum);
                        }
                        else {
                            this.commonTwo(txtStr, addNum);
                        }
                        break;
                }
            };
            WritingView.prototype.commonOne = function (txtStr, addNum) {
                this.IamStr.visible = false;
                this.assiStr.visible = true;
                this.assiStr.text = txtStr + addNum;
            };
            WritingView.prototype.commonTwo = function (txtStr, addNum) {
                this.assiStr.visible = false;
                this.IamStr.visible = true;
                this.IamStr.text = txtStr + addNum;
            };
            WritingView.prototype.changePeoVue = function (peoNum, addNum, statusNum, typeStr) {
                this.peoStr.text = parseInt(peoNum * 100 + "") + "/100";
                // this.IamStr.text = "+人设:" + addNum;
                this.judgeStrStatusTwo(statusNum, "+人设:", addNum, typeStr);
            };
            WritingView.prototype.changeStoVue = function (stoNum, addNum, statusNum, typeStr) {
                this.stoStr.text = parseInt(stoNum * 100 + "") + "/100";
                // this.IamStr.text = "+故事:" + addNum;
                this.judgeStrStatusTwo(statusNum, "+故事:", addNum, typeStr);
            };
            WritingView.prototype.changeDepVue = function (depNum, addNum, statusNum, typeStr) {
                this.depStr.text = parseInt(depNum * 100 + "") + "/100";
                // this.IamStr.text = "+深度:" + addNum;
                this.judgeStrStatusTwo(statusNum, "+深度:", addNum, typeStr);
            };
            WritingView.prototype.changeNewVue = function (newNum, addNum, statusNum, typeStr) {
                this.newStr.text = parseInt(newNum * 100 + "") + "/100";
                // this.IamStr.text = "+新意:" + addNum;
                this.judgeStrStatusTwo(statusNum, "+新意:", addNum, typeStr);
            };
            WritingView.prototype.initData = function () {
                this.payMoney = 0;
                this.curSelectBtnName = "holeBtn";
                this.themeStr.visible = true;
                this.holeBtn.mouseEnabled = true;
                this.plotBtn.mouseEnabled = false;
                this.writBtn.mouseEnabled = false;
                this.plotConffimBtn.visible = false;
                this.plotConffimBtn.mouseEnabled = false;
                this.writBox.visible = false;
                this.friendBox.visible = false;
                var holeStr = this.holeBtn.getChildByName("holeStr");
                var plotStr = this.plotBtn.getChildByName("plotStr");
                var writStr = this.writBtn.getChildByName("writStr");
                holeStr.color = "#000000";
                plotStr.color = "#A09F97";
                writStr.color = "#A09F97";
                this.curSelectPlotName.splice(0, this.curSelectPlotName.length);
                this.digiAuthorInfoArr.splice(0, this.digiAuthorInfoArr.length);
                for (var i = 0; i < GameConfig.guding.length; i++) {
                    var guObj = GameConfig.guding[i];
                    if (guObj["special_cost"] != 0) {
                        this.digiAuthorInfoArr.push(guObj);
                    }
                    ;
                }
                this.curSelectAssiAuthor = new Object();
                this.curSelectContriAuthor = new Object();
            };
            WritingView.prototype.judgeStatus = function () {
                switch (this.curSelectBtnName) {
                    case "holeBtn":
                        this.holeBtn.x = 505;
                        this.plotBtn.x = 495;
                        this.writBtn.x = 495;
                        break;
                    case "plotBtn":
                        this.holeBtn.x = 495;
                        this.plotBtn.x = 505;
                        this.writBtn.x = 495;
                        break;
                    case "writBtn":
                        this.holeBtn.x = 495;
                        this.plotBtn.x = 495;
                        this.writBtn.x = 505;
                        break;
                }
            };
            WritingView.prototype.returnPlotStr = function () {
                var str = "";
                for (var i = 0; i < this.curSelectPlotName.length; i++) {
                    var elemStr = this.curSelectPlotName[i];
                    str = str + elemStr + "、";
                }
                str = str.substring(0, str.length - 1);
                return str;
            };
            WritingView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "WritingViewConTain";
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
            WritingView.prototype.closeBtnFn = function (name) {
                if (this.startWritingBtn.label == "开始写作") {
                    for (var i = 0; i < GameConfig.writingAuthor.length; i++) {
                        var nameStr = GameConfig.writingAuthor[i];
                        if (nameStr == name) {
                            GameConfig.writingAuthor.splice(i, 1);
                            i--;
                        }
                    }
                    if (GameConfig.articalNameArr.indexOf(this.articalName.text) != -1) {
                        for (var j = 0; j < GameConfig.articalNameArr.length; j++) {
                            var articalName = GameConfig.articalNameArr[j];
                            if (articalName == this.articalName.text) {
                                GameConfig.articalNameArr.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                        var auObj = GameConfig.authorInfoArr[n];
                        if (auObj["name"] == name) {
                            auObj["curStatus"] = 0;
                            var hisStr = auObj["subStr"] + auObj["eleStr"];
                            if (GameConfig.hisStr.indexOf(hisStr) != -1) {
                                GameConfig.hisStr.replace(hisStr, "");
                            }
                        }
                    }
                    GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                    GameConfig.cachData["articalNameArr"] = GameConfig.articalNameArr;
                    GameConfig.displayPage -= 1;
                    SceneLayerManager.sceneLayer.removeChild(this);
                    SceneLayerManager.sceneLayer.removeChildByName("WritingViewConTain");
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                        list.visible = true;
                    }
                    if (GameConfig.displayPage <= 0) {
                        SceneLayerManager.sceneLayer.openEvent();
                    }
                    Hash.playMusic(2);
                }
                else {
                    return;
                }
            };
            return WritingView;
        }(ui.action.WritingUI));
        action.WritingView = WritingView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=WritingView.js.map