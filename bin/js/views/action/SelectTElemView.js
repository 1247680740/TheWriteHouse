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
        var SelectTElemView = /** @class */ (function (_super) {
            __extends(SelectTElemView, _super);
            function SelectTElemView() {
                var _this = _super.call(this) || this;
                // private static instance: SelectTElemView;
                _this.oldIndex = null;
                _this.titleText.text = "元素选择";
                // this.createList();
                _this.createList();
                return _this;
            }
            // static getInstance(): SelectTElemView {
            //     if (!SelectTElemView.instance)
            //         SelectTElemView.instance = new SelectTElemView();
            //     return SelectTElemView.instance;
            // }
            /** 创建列表 */
            SelectTElemView.prototype.createList = function () {
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
                    var gridItem = new ListItemUI();
                    gridItem.listItemLabel.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
            };
            SelectTElemView.prototype.returnValue = function (event) {
                var id = parseInt(event.target.name);
                var fID = GameConfig.checkFID;
                var sID = GameConfig.checkSID;
                GameConfig.checkTID = id;
                if (id == fID || id == sID || fID == sID) {
                    TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的元素");
                }
                else {
                    GameConfig.displayPage -= 1;
                    SceneLayerManager.sceneLayer.removeChild(this);
                    views.action.WritingView.prototype.resetTEleView(id);
                }
            };
            SelectTElemView.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        switch (i) {
                            case GameConfig.checkFID:
                                gridItem.listItemLabel.color = "#FFFFFF";
                                gridItem.listItemLabel.bgColor = "#5D5D5D";
                                break;
                            case GameConfig.checkSID:
                                gridItem.listItemLabel.color = "#FFFFFF";
                                gridItem.listItemLabel.bgColor = "#5D5D5D";
                                break;
                            case GameConfig.checkTID:
                                gridItem.listItemLabel.color = "#FFFFFF";
                                gridItem.listItemLabel.bgColor = "#5D5D5D";
                                break;
                            default:
                                gridItem.listItemLabel.color = "#5D5D5D";
                                gridItem.listItemLabel.bgColor = "#FFFFFF";
                                break;
                        }
                    }
                }
            };
            return SelectTElemView;
        }(ui.dialog.CheckItemUI));
        action.SelectTElemView = SelectTElemView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectTElemView.js.map