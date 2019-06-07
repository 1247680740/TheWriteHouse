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
        var SelectAreView = /** @class */ (function (_super) {
            __extends(SelectAreView, _super);
            function SelectAreView() {
                var _this = _super.call(this) || this;
                _this.titleText.text = "时代选择";
                _this.createList();
                return _this;
            }
            SelectAreView.getInstance = function () {
                if (!SelectAreView.instance)
                    SelectAreView.instance = new SelectAreView();
                return SelectAreView.instance;
            };
            /** 创建列表 */
            SelectAreView.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.y = 130;
                this.gridContainer.vScrollBarSkin = "";
                for (var i = 0; i < GameConfig.eraArr.length; i++) {
                    var str = GameConfig.eraArr[i];
                    var gridItem = new ListItemUI();
                    gridItem.singleItem.visible = false;
                    gridItem.listItemLabel.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
            };
            SelectAreView.prototype.returnValue = function (event) {
                event.stopPropagation();
                var id = parseInt(event.target.name);
                if (id == GameConfig.checkAreID) {
                    TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的时代");
                }
                else {
                    GameConfig.checkAreID = id;
                    SceneLayerManager.sceneLayer.removeChild(this);
                    GameConfig.displayPage -= 1;
                    // views.action.WritingView.prototype.resetPlatView(null);
                }
            };
            SelectAreView.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        if (i == GameConfig.checkAreID) {
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
            return SelectAreView;
        }(ui.dialog.CheckItemUI));
        action.SelectAreView = SelectAreView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectAreView.js.map