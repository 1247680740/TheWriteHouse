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
        var SelectItemUI = ui.dialog.SelectItemUI;
        var SelectConductView = /** @class */ (function (_super) {
            __extends(SelectConductView, _super);
            function SelectConductView() {
                var _this = _super.call(this) || this;
                _this.titleText.text = "宣传选择";
                _this.zOrder = 2;
                _this.createList();
                return _this;
            }
            SelectConductView.prototype.createList = function () {
                for (var i = 0; i < GameConfig.conductArr.length; i++) {
                    var conductStr = GameConfig.conductArr[i];
                    var gridItem = new SelectItemUI();
                    gridItem.listItemLabel.text = conductStr;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
            };
            SelectConductView.prototype.returnValue = function (event) {
                event.stopPropagation();
                var id = parseInt(event.target.name);
                // if (id == GameConfig.checkConductID) {
                //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的宣传方式");
                // } else {
                GameConfig.checkConductID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                views.action.ReleaseView.prototype.resetDuctView(id);
                // }
            };
            SelectConductView.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        if (i == GameConfig.checkConductID) {
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
            return SelectConductView;
        }(ui.dialog.CheckItemUI));
        action.SelectConductView = SelectConductView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectConductView.js.map