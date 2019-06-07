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
        var ListItemUI = ui.common.ListItemViewUI;
        var SelectElemView = /** @class */ (function (_super) {
            __extends(SelectElemView, _super);
            function SelectElemView() {
                var _this = _super.call(this) || this;
                _this.oldIndex = null;
                _this.needCost = 0;
                _this.selectStr = "";
                _this.titleText.text = "元素选择";
                _this.typeText.text = "元素";
                _this.typeIcon.skin = "gameUI/toolbar/idea.png";
                _this.bootomIcon.skin = "gameUI/toolbar/idea.png";
                _this.createList();
                _this.confirmBtn.on(Laya.Event.CLICK, _this, _this.confirmEle);
                return _this;
            }
            SelectElemView.prototype.confirmEle = function (event) {
                Hash.playMusic(2);
                event.stopPropagation();
                var payHole = this.getEleHole();
                if (payHole > GameConfig.brainHole) {
                    TipLayerManager.tipLayer.showDrawBgTip("你的灵感知不足！");
                }
                else {
                    SceneLayerManager.sceneLayer.removeChild(this);
                    GameConfig.displayPage -= 1;
                    for (var i = 0; i < GameConfig.curSelectEleNameArr.length; i++) {
                        var name_1 = GameConfig.curSelectEleNameArr[i];
                        this.selectStr = this.selectStr + name_1 + ",";
                    }
                    this.selectStr = this.selectStr.substr(0, this.selectStr.length - 1);
                    // views.action.WritingView.prototype.resetEleView(this.selectStr);
                }
            };
            /** 创建列表 */
            SelectElemView.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.vScrollBarSkin = "";
                for (var i = 0; i < GameConfig.hisObjArr.length; i++) {
                    var hisObj = GameConfig.hisObjArr[i];
                    for (var j = 0; j < GameConfig.eleGuDingArr.length; j++) {
                        var eleObj = GameConfig.eleGuDingArr[j];
                        if (eleObj["event"] == hisObj["id"] && GameConfig.eleArr.indexOf(eleObj) == -1) {
                            GameConfig.eleArr.push(eleObj);
                        }
                    }
                }
                for (var i = 0; i < GameConfig.eleArr.length; i++) {
                    this.eleObj = GameConfig.eleArr[i];
                    var str = this.eleObj["element"];
                    var cost = this.eleObj["cost"];
                    var gridItem = new ListItemUI();
                    gridItem.singleItem.visible = false;
                    gridItem.listItemLabel.text = str;
                    gridItem.cost.text = cost + "";
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
                GameConfig.cachData["eleArr"] = GameConfig.eleArr;
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
            };
            SelectElemView.prototype.returnValue = function (event) {
                Hash.playMusic(2);
                event.stopPropagation();
                var id = parseInt(event.target.name);
                var gridItem = this.gridContainer.getChildAt(id);
                var eleName = gridItem.listItemLabel.text;
                var eleObj = this.getCurEleObj(eleName);
                if (GameConfig.curSelectEleArr.length < 3) {
                    if (GameConfig.curSelectEleArr.indexOf(id) == -1) {
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                        gridItem.cost.bgColor = "#5D5D5D";
                        GameConfig.curSelectEleArr.push(id);
                        GameConfig.curSelectEleNameArr.push(eleName);
                        this.needCost = this.needCost + eleObj["cost"];
                        this.payCost.text = "所选元素一共需要" + this.needCost;
                    }
                    else {
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                        var index = GameConfig.curSelectEleArr.indexOf(id);
                        var nameIndex = GameConfig.curSelectEleNameArr.indexOf(eleName);
                        GameConfig.curSelectEleArr.splice(index, 1);
                        GameConfig.curSelectEleNameArr.splice(nameIndex, 1);
                        this.needCost = this.needCost - eleObj["cost"];
                        this.payCost.text = "所选元素一共需要" + this.needCost;
                    }
                }
                else {
                    if (GameConfig.curSelectEleArr.indexOf(id) == -1) {
                        TipLayerManager.tipLayer.showDrawBgTip("元素最多可选三个哦！");
                    }
                    else {
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                        var index = GameConfig.curSelectEleArr.indexOf(id);
                        var nameIndex = GameConfig.curSelectEleNameArr.indexOf(eleName);
                        GameConfig.curSelectEleArr.splice(index, 1);
                        GameConfig.curSelectEleNameArr.splice(nameIndex, 1);
                        this.needCost = this.needCost - eleObj["cost"];
                        this.payCost.text = "所选元素一共需要" + this.needCost;
                    }
                }
            };
            SelectElemView.prototype.getCurEleObj = function (eleName) {
                for (var i = 0; i < GameConfig.eleArr.length; i++) {
                    var eleObj = GameConfig.eleArr[i];
                    if (eleObj["element"] == eleName) {
                        return eleObj;
                    }
                }
            };
            SelectElemView.prototype.getEleHole = function () {
                var payHole = 0;
                for (var i = 0; i < GameConfig.curSelectEleNameArr.length; i++) {
                    var eleName = GameConfig.curSelectEleNameArr[i];
                    for (var index = 0; index < GameConfig.eleArr.length; index++) {
                        var eleObj = GameConfig.eleArr[index];
                        if (eleObj["element"] == eleName) {
                            payHole = payHole + eleObj["cost"];
                        }
                    }
                }
                return payHole;
            };
            SelectElemView.prototype.setBg = function () {
                Hash.playMusic(2);
                if (GameConfig.curSelectEleArr.length > 0) {
                    for (var n = 0; n < this.gridContainer.numChildren; n++) {
                        var gridItem = this.gridContainer.getChildAt(n);
                        var txt = gridItem.listItemLabel.text;
                        if (GameConfig.curSelectEleNameArr.indexOf(txt) == -1) {
                            gridItem.listItemLabel.color = "#5D5D5D";
                            gridItem.listItemLabel.bgColor = "#FFFFFF";
                            gridItem.cost.bgColor = "#FFFFFF";
                        }
                        else {
                            var newEleObj = this.getCurEleObj(txt);
                            gridItem.listItemLabel.color = "#FFFFFF";
                            gridItem.listItemLabel.bgColor = "#5D5D5D";
                            gridItem.cost.bgColor = "#5D5D5D";
                            this.needCost = this.needCost + newEleObj["cost"];
                        }
                    }
                    this.payCost.text = "所选元素一共需要" + this.needCost;
                }
                else {
                    this.payCost.text = "所选元素一共需要0";
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                    }
                }
            };
            return SelectElemView;
        }(ui.dialog.CheckEleItemUI));
        action.SelectElemView = SelectElemView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectElemView.js.map