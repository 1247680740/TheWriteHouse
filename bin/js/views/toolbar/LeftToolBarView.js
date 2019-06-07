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
    var toolbar;
    (function (toolbar) {
        var LeftToolBarView = /** @class */ (function (_super) {
            __extends(LeftToolBarView, _super);
            function LeftToolBarView(auObj) {
                var _this = _super.call(this) || this;
                _this.zOrder = 0;
                _this.pageName.text = auObj["pageName"];
                _this.on(Laya.Event.CLICK, _this, _this.showNextView);
                return _this;
            }
            LeftToolBarView.prototype.showNextView = function () {
                var nameStr = this.name.substring(0, this.name.length - 8);
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    if (auObj["name"] == nameStr) {
                        if (auObj["curStatus"] == 3) {
                            // if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            //     let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                            //     list.visible = false;
                            // }
                            GameConfig.displayPage += 1;
                            SceneLayerManager.sceneLayer.stopEvent();
                            this.operaTingView = new views.action.OperaTingView(auObj);
                            this.operaTingView.name = auObj["name"] + "ope";
                            SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                        }
                    }
                }
            };
            return LeftToolBarView;
        }(ui.toolBar.LeftToolBarUI));
        toolbar.LeftToolBarView = LeftToolBarView;
    })(toolbar = views.toolbar || (views.toolbar = {}));
})(views || (views = {}));
//# sourceMappingURL=LeftToolBarView.js.map