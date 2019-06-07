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
        var PlotSingleItemUI = ui.action.PlotSingleItemUI;
        var AddEleView = /** @class */ (function (_super) {
            __extends(AddEleView, _super);
            function AddEleView(infoObj) {
                var _this = _super.call(this) || this;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.zOrder = 2;
                _this.initView(infoObj);
                _this.plotConffimBtn.on(Laya.Event.CLICK, _this, _this.backMainView, [infoObj]);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backMainView, [infoObj]);
                return _this;
            }
            AddEleView.prototype.initView = function (infoObj) {
                this.holeBtn.visible = false;
                this.plotBtn.visible = false;
                this.writBtn.visible = false;
                this.holeGrid.visible = false;
                this.plotGrid.visible = true;
                this.plotBox.visible = true;
                this.writBox.visible = false;
                this.friendBox.visible = false;
                this.themeStr.visible = true;
                this.plotConffimBtn.visible = true;
                this.plotConffimBtn.mouseEnabled = true;
                this.backBtn.visible = true;
                this.backBtn.mouseEnabled = true;
                this.backWritBtn.visible = false;
                this.backWritBtn.mouseEnabled = false;
                this.plotGrid.vScrollBarSkin = "";
                this.curSelectArr = new Array();
                this.curReSelectArr = new Array();
                this.curSelectArr.splice(0, this.curSelectArr.length);
                this.curReSelectArr.splice(0, this.curReSelectArr.length);
                var eleStr = infoObj["eleStr"];
                if (eleStr.indexOf(",") == -1) {
                    this.curSelectArr.push(eleStr);
                }
                else {
                    this.curSelectArr = eleStr.split(",");
                }
                for (var m = 0; m < ResourceManager.holeArr.length; m++) {
                    var holeObj = ResourceManager.holeArr[m];
                    if (holeObj["theme"] == infoObj["subStr"]) {
                        this.curHoleObj = holeObj;
                    }
                }
                this.themeStr.text = "选择合适的剧情元素";
                this.plotGrid.removeChildren(0, this.plotGrid.numChildren);
                var wonArr = this.curHoleObj["wonderful"];
                var perArr = this.curHoleObj["perfect"];
                for (var i = 0; i < GameConfig.eleArr.length; i++) {
                    var eleObj = GameConfig.eleArr[i];
                    var plotItemUI = new PlotSingleItemUI();
                    plotItemUI.name = eleObj["element"];
                    plotItemUI.eleStr.text = eleObj["element"];
                    plotItemUI.hotStr.text = "中";
                    if (this.curSelectArr.indexOf(eleObj["element"]) != -1) {
                        plotItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                    }
                    else {
                        plotItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                    }
                    if (WritingConfig.actPlotObjArr.length > 0 && WritingConfig.actPlotArr.indexOf(this.curHoleObj["theme"]) != -1) {
                        for (var index = 0; index < WritingConfig.actPlotObjArr.length; index++) {
                            var actObj = WritingConfig.actPlotObjArr[index];
                            var curActArr = new Array();
                            curActArr.splice(0, curActArr.length);
                            if (actObj["name"] == this.curHoleObj["theme"]) {
                                var newObjArr = actObj["value"];
                                for (var m = 0; m < newObjArr.length; m++) {
                                    var newObj = newObjArr[m];
                                    curActArr.push(newObj["name"]);
                                }
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
            };
            AddEleView.prototype.checkPlot = function (eleObj) {
                if (this.curSelectArr.indexOf(eleObj["element"]) != -1) {
                    TipLayerManager.tipLayer.showDrawBgTip("之前选择的元素无法取消哦~");
                }
                else if (this.curReSelectArr.length == 1) {
                    TipLayerManager.tipLayer.showDrawBgTip("最多可重选一个剧情");
                }
                else {
                    this.curSelectArr.push(eleObj["element"]);
                    this.curReSelectArr.push(eleObj["element"]);
                    for (var i = 0; i < this.plotGrid.numChildren; i++) {
                        var plotSingleItemUI = this.plotGrid.getChildAt(i);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                    }
                    for (var j = 0; j < this.curSelectArr.length; j++) {
                        var element = this.curSelectArr[j];
                        var plotSingleItemUI = this.plotGrid.getChildByName(element);
                        plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                    }
                }
            };
            AddEleView.prototype.backMainView = function (infoObj) {
                this.removeSelf();
                // let eleStr:string = this.returnEleStr();
                for (var index = 0; index < GameConfig.authorInfoArr.length; index++) {
                    var auObj = GameConfig.authorInfoArr[index];
                    if (auObj["name"] == infoObj["name"]) {
                        // auObj["eleStr"] = eleStr;
                        // auObj["operaNum"] = auObj["operaNum"]-1;
                        this.operaTingView = new views.action.OperaTingView(auObj);
                        this.operaTingView.name = infoObj["name"] + "ope";
                        SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                    }
                }
            };
            AddEleView.prototype.returnEleStr = function () {
                var eleStr = "";
                for (var i = 0; i < this.curSelectArr.length; i++) {
                    var plotName = this.curSelectArr[i];
                    eleStr = eleStr + plotName + ",";
                }
                eleStr = eleStr.substring(0, eleStr.length - 1);
                return eleStr;
            };
            return AddEleView;
        }(ui.action.WritingUI));
        action.AddEleView = AddEleView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=AddEleView.js.map