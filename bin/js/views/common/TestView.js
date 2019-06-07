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
    var common;
    (function (common) {
        var TestView = /** @class */ (function (_super) {
            __extends(TestView, _super);
            function TestView() {
                var _this = _super.call(this) || this;
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.conBtn.on(Laya.Event.CLICK, _this, _this.conChange);
                _this.cancleBtn.on(Laya.Event.CLICK, _this, _this.cancleChange);
                return _this;
            }
            TestView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new TestView();
                }
                return this.instance;
            };
            TestView.prototype.conChange = function () {
                console.log(isNaN(parseInt(this.moneyStr.text)));
                if (this.moneyStr.text != null && this.moneyStr.text != "" && !isNaN(parseInt(this.moneyStr.text))) {
                    var money = parseInt(this.moneyStr.text);
                    views.toolbar.TopToolBarView.getInstance().resetMoney(money);
                }
                if (this.holeStr.text != null && this.holeStr.text != "" && !isNaN(parseInt(this.holeStr.text))) {
                    var hole = parseInt(this.holeStr.text);
                    views.toolbar.TopToolBarView.getInstance().resetHole(hole);
                }
                if (this.fansStr.text != null && this.fansStr.text != "" && !isNaN(parseInt(this.fansStr.text))) {
                    var fans = parseInt(this.fansStr.text);
                    views.toolbar.TopToolBarView.getInstance().resetFans(fans);
                }
                this.cancleChange();
            };
            TestView.prototype.cancleChange = function () {
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return TestView;
        }(ui.dialog.ChangeDataUI));
        common.TestView = TestView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=TestView.js.map