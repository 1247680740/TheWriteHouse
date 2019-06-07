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
        var SelectSubJectView = /** @class */ (function (_super) {
            __extends(SelectSubJectView, _super);
            function SelectSubJectView() {
                var _this = _super.call(this) || this;
                _this.titleText.text = "题材选择";
                _this.createList();
                return _this;
            }
            SelectSubJectView.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.vScrollBarSkin = "";
                if (GameConfig.hisObjArr.length > 0) {
                    for (var i = 0; i < GameConfig.hisObjArr.length; i++) {
                        var hisObj = GameConfig.hisObjArr[i];
                        for (var j = 0; j < GameConfig.subGuDingArr.length; j++) {
                            var subObj = GameConfig.subGuDingArr[j];
                            if (subObj["event"] == hisObj["id"] && GameConfig.subArr.indexOf(subObj) == -1) {
                                GameConfig.subArr.push(subObj);
                            }
                        }
                    }
                }
                for (var i = 0; i < GameConfig.subArr.length; i++) {
                    this.subObj = GameConfig.subArr[i];
                    var str = this.subObj["theme"];
                    var cost = this.subObj["cost"];
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
                GameConfig.cachData["subArr"] = GameConfig.subArr;
            };
            SelectSubJectView.prototype.returnValue = function (event) {
                event.stopPropagation();
                var id = parseInt(event.target.name);
                // if (id == GameConfig.checkSubID) {
                //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的题材");
                // } else {
                GameConfig.checkSubID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                // views.action.WritingView.prototype.resetSubView(id);
                // }
                Hash.playMusic(2);
            };
            SelectSubJectView.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    Hash.playMusic(2);
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        if (i == GameConfig.checkSubID) {
                            gridItem.listItemLabel.color = "#FFFFFF";
                            gridItem.listItemLabel.bgColor = "#5D5D5D";
                            gridItem.cost.bgColor = "#5D5D5D";
                        }
                        else {
                            gridItem.listItemLabel.color = "#5D5D5D";
                            gridItem.listItemLabel.bgColor = "#FFFFFF";
                            gridItem.cost.bgColor = "#FFFFFF";
                        }
                    }
                }
            };
            return SelectSubJectView;
        }(ui.dialog.CheckItemUI));
        action.SelectSubJectView = SelectSubJectView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectSubJectView.js.map