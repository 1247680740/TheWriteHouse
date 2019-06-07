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
        var GameConfig = configs.GameConfig;
        var TopToolBarUI = ui.toolBar.TopToolBarUI;
        /**
         * 顶部工具条视图
         */
        var TopToolBarView = /** @class */ (function (_super) {
            __extends(TopToolBarView, _super);
            function TopToolBarView() {
                var _this = _super.call(this) || this;
                if (isNaN(GameConfig.cachData["money"])) {
                    GameConfig.cachData["fans"] = GameConfig.fans;
                    GameConfig.cachData["money"] = GameConfig.money;
                    GameConfig.cachData["brainHole"] = GameConfig.brainHole;
                }
                else {
                    GameConfig.money = GameConfig.cachData["money"];
                    GameConfig.fans = GameConfig.cachData["fans"];
                    GameConfig.brainHole = GameConfig.cachData["brainHole"];
                }
                _this.money.text = GameConfig.money + "";
                _this.fans.text = GameConfig.fans + "";
                _this.brainHole.text = GameConfig.brainHole + "";
                return _this;
            }
            TopToolBarView.getInstance = function () {
                if (!TopToolBarView.instance)
                    TopToolBarView.instance = new TopToolBarView();
                return TopToolBarView.instance;
            };
            TopToolBarView.prototype.resetMoney = function (money) {
                GameConfig.money = money;
                this.money.text = money + "";
                GameConfig.cachData["money"] = GameConfig.money;
            };
            TopToolBarView.prototype.resetFans = function (fans) {
                GameConfig.fans = fans;
                this.fans.text = fans + "";
                GameConfig.cachData["fans"] = GameConfig.fans;
            };
            TopToolBarView.prototype.resetHole = function (brainHole) {
                GameConfig.brainHole = brainHole;
                this.brainHole.text = brainHole + "";
                GameConfig.cachData["brainHole"] = GameConfig.brainHole;
            };
            return TopToolBarView;
        }(TopToolBarUI));
        toolbar.TopToolBarView = TopToolBarView;
    })(toolbar = views.toolbar || (views.toolbar = {}));
})(views || (views = {}));
//# sourceMappingURL=TopToolBarView.js.map