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
        var SelectTestView = /** @class */ (function (_super) {
            __extends(SelectTestView, _super);
            function SelectTestView() {
                var _this = _super.call(this) || this;
                _this.oldIndex = null;
                _this.titleText.text = "元素选择";
                _this.createList();
                return _this;
            }
            SelectTestView.getInstance = function () {
                if (!SelectTestView.instance)
                    SelectTestView.instance = new SelectTestView();
                return SelectTestView.instance;
            };
            /** 创建list列表 */
            SelectTestView.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.vScrollBarSkin = "";
                for (var i = 0; i < GameConfig.elemArr.length; i++) {
                    var str = GameConfig.elemArr[i];
                    var gridItem = new ListItemUI();
                    gridItem.listItemLabel.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    this.gridContainer.addChild(gridItem);
                }
            };
            SelectTestView.checkFID = null;
            return SelectTestView;
        }(ui.dialog.TestCheckUI));
        action.SelectTestView = SelectTestView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectTestView.js.map