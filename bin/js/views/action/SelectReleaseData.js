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
        var SelectReleaseData = /** @class */ (function (_super) {
            __extends(SelectReleaseData, _super);
            function SelectReleaseData(name) {
                var _this = _super.call(this) || this;
                _this.releaseDataArr = ResourceManager.releaseDataArr;
                _this.incomeArr = ResourceManager.incomeArr;
                _this.curSelectArr = [];
                _this.curSelectNameArr = [];
                _this.zOrder = 2;
                _this.typeIcon.skin = "";
                _this.bootomIcon.skin = "";
                _this.needMoney = 0;
                _this.selectStr = "";
                _this.eventName = name;
                _this.curDataArr = new Array();
                _this.judgeType(name);
                _this.confirmBtn.on(Laya.Event.CLICK, _this, _this.confirmEle, [name]);
                return _this;
            }
            /** 判断选择类型返回响应数据 */
            SelectReleaseData.prototype.judgeType = function (name) {
                switch (name) {
                    case "sexBtn":
                        this.titleText.text = "性别选择";
                        this.typeText.text = "性别";
                        this.getCurArr(1);
                        this.createList(this.curDataArr);
                        break;
                    case "ageBtn":
                        this.titleText.text = "年龄选择";
                        this.typeText.text = "年龄";
                        this.getCurArr(2);
                        this.createList(this.curDataArr);
                        break;
                    case "eduBtn":
                        this.titleText.text = "学历选择";
                        this.typeText.text = "学历";
                        this.getCurArr(3);
                        this.createList(this.curDataArr);
                        break;
                    default:
                        break;
                }
            };
            SelectReleaseData.prototype.getCurArr = function (typeId) {
                for (var i = 0; i < this.releaseDataArr.length; i++) {
                    var releaseObj = this.releaseDataArr[i];
                    if (releaseObj["typeID"] == typeId) {
                        this.curDataArr.push(releaseObj);
                    }
                }
                for (var j = 0; j < this.incomeArr.length; j++) {
                    var incomeObj = this.incomeArr[j];
                    if (incomeObj["year"] == GameConfig.year) {
                        this.curPreaObj = incomeObj;
                    }
                }
            };
            /** 创建列表 */
            SelectReleaseData.prototype.createList = function (arr) {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.vScrollBarSkin = "";
                for (var i = 0; i < arr.length; i++) {
                    var relObj = arr[i];
                    var str = relObj["name"];
                    var cost = relObj["cost"];
                    var preMoney = this.curPreaObj["spreaMoney"];
                    var payMoney = cost * preMoney;
                    var gridItem = new ListItemUI();
                    gridItem.singleItem.visible = false;
                    gridItem.listItemLabel.text = str;
                    gridItem.cost.text = payMoney + "";
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
            };
            SelectReleaseData.prototype.returnValue = function (event) {
                event.stopPropagation();
                var id = parseInt(event.target.name);
                var gridItem = this.gridContainer.getChildAt(id);
                var gridName = gridItem.listItemLabel.text;
                var gridMoney = parseInt(gridItem.cost.text);
                if (this.curSelectArr.indexOf(id) == -1) {
                    gridItem.listItemLabel.color = "#FFFFFF";
                    gridItem.listItemLabel.bgColor = "#5D5D5D";
                    gridItem.cost.bgColor = "#5D5D5D";
                    this.curSelectArr.push(id);
                    this.curSelectNameArr.push(gridName);
                    this.needMoney = this.needMoney + gridMoney;
                    this.payCost.text = "所选推广一共需要" + this.needMoney;
                }
                else {
                    gridItem.listItemLabel.color = "#5D5D5D";
                    gridItem.listItemLabel.bgColor = "#FFFFFF";
                    gridItem.cost.bgColor = "#FFFFFF";
                    var index = this.curSelectArr.indexOf(id);
                    var nameIndex = this.curSelectNameArr.indexOf(gridName);
                    this.curSelectArr.splice(index, 1);
                    this.curSelectNameArr.splice(nameIndex, 1);
                    this.needMoney = this.needMoney - gridMoney;
                    this.payCost.text = "所选推广一共需要" + this.needMoney;
                }
            };
            SelectReleaseData.prototype.confirmEle = function (name) {
                if (this.needMoney > GameConfig.money) {
                    TipLayerManager.tipLayer.showDrawBgTip("你的金币不足！");
                }
                else {
                    SceneLayerManager.sceneLayer.removeChild(this);
                    GameConfig.displayPage -= 1;
                    for (var i = 0; i < this.curSelectNameArr.length; i++) {
                        var name_1 = this.curSelectNameArr[i];
                        this.selectStr = this.selectStr + name_1 + ",";
                    }
                    this.selectStr = this.selectStr.substr(0, this.selectStr.length - 1);
                    switch (name) {
                        case "sexBtn":
                            GameConfig.sexMoney = this.needMoney;
                            break;
                        case "ageBtn":
                            GameConfig.ageMoney = this.needMoney;
                            break;
                        case "eduBtn":
                            GameConfig.eduMoney = this.needMoney;
                            break;
                        default:
                            break;
                    }
                    views.action.ReleaseView.prototype.resetDataView(this.eventName, this.selectStr);
                    this.initData();
                }
            };
            SelectReleaseData.prototype.getCurEleObj = function (eleName) {
                for (var i = 0; i < GameConfig.eleArr.length; i++) {
                    var eleObj = GameConfig.eleArr[i];
                    if (eleObj["element"] == eleName) {
                        return eleObj;
                    }
                }
            };
            SelectReleaseData.prototype.initData = function () {
                this.curDataArr.splice(0, this.curDataArr.length);
                this.curSelectArr.splice(0, this.curSelectArr.length);
                this.curSelectNameArr.splice(0, this.curSelectNameArr.length);
                this.needMoney = 0;
                this.selectStr = "";
                this.eventName = "";
            };
            SelectReleaseData.prototype.setBg = function (eventName, strArr) {
                if (strArr.length > 0) {
                    this.getDataID(eventName, strArr);
                    for (var n = 0; n < this.gridContainer.numChildren; n++) {
                        var gridItem = this.gridContainer.getChildAt(n);
                        var txt = gridItem.listItemLabel.text;
                        var gridMoney = parseInt(gridItem.cost.text);
                        if (strArr.indexOf(txt) == -1) {
                            gridItem.listItemLabel.color = "#5D5D5D";
                            gridItem.listItemLabel.bgColor = "#FFFFFF";
                            gridItem.cost.bgColor = "#FFFFFF";
                        }
                        else {
                            gridItem.listItemLabel.color = "#FFFFFF";
                            gridItem.listItemLabel.bgColor = "#5D5D5D";
                            gridItem.cost.bgColor = "#5D5D5D";
                            this.needMoney = this.needMoney + gridMoney;
                        }
                    }
                    this.payCost.text = "所选推广一共需要" + this.needMoney;
                }
                else {
                    this.payCost.text = "所选推广一共需要0";
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                    }
                }
            };
            SelectReleaseData.prototype.getDataID = function (eventName, strArr) {
                switch (eventName) {
                    case "sexBtn":
                        for (var i = 0; i < strArr.length; i++) {
                            var strName = strArr[i];
                            for (var j = 0; j < this.releaseDataArr.length; j++) {
                                var releaObj = this.releaseDataArr[j];
                                if (releaObj["typeID"] == 1) {
                                    if (releaObj["name"] == strName) {
                                        this.curSelectNameArr.push(strName);
                                        this.curSelectArr.push(releaObj["type"] - 1);
                                    }
                                }
                            }
                        }
                        break;
                    case "ageBtn":
                        for (var i = 0; i < strArr.length; i++) {
                            var strName = strArr[i];
                            for (var j = 0; j < this.releaseDataArr.length; j++) {
                                var releaObj = this.releaseDataArr[j];
                                if (releaObj["typeID"] == 2) {
                                    if (releaObj["name"] == strName) {
                                        this.curSelectNameArr.push(strName);
                                        this.curSelectArr.push(releaObj["type"] - 1);
                                    }
                                }
                            }
                        }
                        break;
                    case "eduBtn":
                        for (var i = 0; i < strArr.length; i++) {
                            var strName = strArr[i];
                            for (var j = 0; j < this.releaseDataArr.length; j++) {
                                var releaObj = this.releaseDataArr[j];
                                if (releaObj["typeID"] == 3) {
                                    if (releaObj["name"] == strName) {
                                        this.curSelectNameArr.push(strName);
                                        this.curSelectArr.push(releaObj["type"] - 1);
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            };
            return SelectReleaseData;
        }(ui.dialog.CheckEleItemUI));
        action.SelectReleaseData = SelectReleaseData;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectReleaseData.js.map