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
        var SelectSubJectTest = /** @class */ (function (_super) {
            __extends(SelectSubJectTest, _super);
            function SelectSubJectTest() {
                var _this = _super.call(this) || this;
                _this.titleText.text = "题材选择";
                _this.createList();
                return _this;
            }
            SelectSubJectTest.getInstance = function () {
                if (!SelectSubJectTest.instance)
                    SelectSubJectTest.instance = new SelectSubJectTest();
                return SelectSubJectTest.instance;
            };
            /** 创建列表 */
            SelectSubJectTest.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.vScrollBarSkin = "";
                for (var i = 0; i < GameConfig.subJectArr.length; i++) {
                    var str = GameConfig.subJectArr[i];
                    var gridItem = new ListItemUI();
                    gridItem.listItemLabel.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
            };
            SelectSubJectTest.prototype.returnValue = function (event) {
                var id = parseInt(event.target.name);
                if (id == GameConfig.checkSubID) {
                    TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的题材");
                }
                else {
                    GameConfig.checkSubID = id;
                    GameConfig.displayPage -= 1;
                    SceneLayerManager.sceneLayer.removeChild(this);
                    views.action.WritingView.prototype.resetSubViewTest(id);
                }
            };
            SelectSubJectTest.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        if (i == GameConfig.checkSubID) {
                            gridItem.listItemLabel.color = "#FFFFFF";
                            gridItem.listItemLabel.bgColor = "#5D5D5D";
                        }
                        else {
                            gridItem.listItemLabel.color = "#5D5D5D";
                            gridItem.listItemLabel.bgColor = "#FFFFFF";
                        }
                    }
                }
            };
            return SelectSubJectTest;
        }(ui.dialog.CheckItemUI));
        action.SelectSubJectTest = SelectSubJectTest;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectSubJectTest.js.map