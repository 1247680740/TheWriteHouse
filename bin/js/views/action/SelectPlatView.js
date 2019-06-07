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
        var SelectPlatView = /** @class */ (function (_super) {
            __extends(SelectPlatView, _super);
            function SelectPlatView() {
                var _this = _super.call(this) || this;
                _this.titleText.text = "平台选择";
                _this.createList();
                return _this;
            }
            /** 创建列表 */
            SelectPlatView.prototype.createList = function () {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
                this.gridContainer.y = 175;
                this.gridContainer.vScrollBarSkin = "";
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
                for (var i = 0; i < GameConfig.platArr.length; i++) {
                    this.platObj = GameConfig.platArr[i];
                    var str = this.platObj["net"];
                    var gridItem = new SelectItemUI();
                    gridItem.listItemLabel.text = str;
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    gridItem.name = i + "";
                    this.gridContainer.addChild(gridItem);
                    gridItem.on(Laya.Event.CLICK, this, this.returnValue);
                }
                GameConfig.cachData["platArr"] = GameConfig.platArr;
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
            };
            SelectPlatView.prototype.returnValue = function (event) {
                event.stopPropagation();
                var id = parseInt(event.target.name);
                // if (id == GameConfig.checkPlatID) {
                //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的平台");
                // } else {
                GameConfig.checkPlatID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                var obj = GameConfig.platArr[GameConfig.checkPlatID];
                var str = obj["net"];
                // views.action.WritingView.prototype.resetPlatView(str);
                // }
                Hash.playMusic(2);
            };
            SelectPlatView.prototype.setBg = function () {
                if (this.gridContainer.numChildren > 0) {
                    Hash.playMusic(2);
                    for (var i = 0; i < this.gridContainer.numChildren; i++) {
                        var gridItem = this.gridContainer.getChildAt(i);
                        if (i == GameConfig.checkPlatID) {
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
            return SelectPlatView;
        }(ui.dialog.CheckItemUI));
        action.SelectPlatView = SelectPlatView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=SelectPlatView.js.map