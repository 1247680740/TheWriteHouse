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
        var SelectSingleDataView = /** @class */ (function (_super) {
            __extends(SelectSingleDataView, _super);
            function SelectSingleDataView(name) {
                var _this = _super.call(this) || this;
                _this.oldIndex = null;
                _this.zOrder = 2;
                _this.judgeType(name);
                return _this;
            }
            SelectSingleDataView.prototype.judgeType = function (name) {
                switch (name) {
                    case "platLabel":
                        this.titleText.text = "平台选择";
                        this.getData(1);
                        this.createList(1);
                        break;
                    case "spaceLabel":
                        this.titleText.text = "篇幅选择";
                        this.getData(2);
                        this.createList(2);
                        break;
                }
            };
            /** 获取当前需要的数据源 */
            SelectSingleDataView.prototype.getData = function (typeId) {
                this.curDataArr = new Array();
                this.curDataArr.splice(0, this.curDataArr.length);
                switch (typeId) {
                    case 1:
                        if (GameConfig.hisObjArr.length > 0) {
                            for (var i = 0; i < GameConfig.hisObjArr.length; i++) {
                                var hisObj = GameConfig.hisObjArr[i];
                                if (hisObj["id"] == 5 || hisObj["id"] == 6) {
                                    for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                                        var platObj = GameConfig.platGuDingArr[j];
                                        if (platObj["unlock"] == hisObj["id"] && GameConfig.platArr.indexOf(platObj) == -1) {
                                            GameConfig.platArr.push(platObj);
                                        }
                                    }
                                }
                            }
                        }
                        GameConfig.cachData["platArr"] = GameConfig.platArr;
                        this.curDataArr = GameConfig.platArr;
                        break;
                    case 2:
                        this.curDataArr = [{ "id": 1, "name": "长篇" }, { "id": 2, "name": "中篇" }, { "id": 2, "name": "短篇" }];
                        break;
                }
            };
            /** 创建列表 */
            SelectSingleDataView.prototype.createList = function (typeId) {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.y = 175;
                this.gridContainer.vScrollBarSkin = "";
                var str;
                for (var i = 0; i < this.curDataArr.length; i++) {
                    this.curObj = this.curDataArr[i];
                    if (typeId == 1) {
                        str = this.curObj["net"];
                    }
                    else if (typeId == 2) {
                        str = this.curObj["name"];
                    }
                    var gridItem = new ListItemUI();
                    gridItem.listItemLabel.visible = false;
                    gridItem.cost.visible = false;
                    gridItem.singleItem.visible = true;
                    gridItem.singleItem.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = str;
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue, [str, typeId]);
                }
            };
            SelectSingleDataView.prototype.returnValue = function (str1, typeId) {
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChild(this);
                switch (typeId) {
                    case 1:
                        views.action.IssueView.prototype.resetLabel(str1);
                        break;
                    case 2:
                        views.action.IssueView.prototype.resetPaceLabel(str1);
                        break;
                }
            };
            SelectSingleDataView.checkFID = null;
            return SelectSingleDataView;
        }(ui.dialog.CheckItemUI));
        action.SelectSingleDataView = SelectSingleDataView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectSingleDataView.js.map