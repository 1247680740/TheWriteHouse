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
        var Event = laya.events.Event;
        var ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI;
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        /**
         * 支付年薪页面
         */
        var ConfirmYearSalary = /** @class */ (function (_super) {
            __extends(ConfirmYearSalary, _super);
            function ConfirmYearSalary(money) {
                var _this = _super.call(this) || this;
                _this.name = "ConfirmYearSalary";
                _this.confirmBtn.x = null;
                _this.confirmBtn.centerX = 0;
                _this.cancelBtn.visible = false;
                _this.cancelBtn.mouseEnabled = false;
                _this.closeBtn.visible = false;
                _this.closeBtn.mouseEnabled = false;
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.visible = true;
                _this.addMask();
                _this.confirmBtn.on(Event.CLICK, _this, _this.payMoney, [money]);
                return _this;
            }
            ConfirmYearSalary.getInstance = function (money) {
                if (!ConfirmYearSalary.instance) {
                    ConfirmYearSalary.instance = new ConfirmYearSalary(money);
                }
                return ConfirmYearSalary.instance;
            };
            ConfirmYearSalary.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = false;
                }
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            ConfirmYearSalary.prototype.payMoney = function (money) {
                if (GameConfig.money < money) {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                }
                else {
                    GameConfig.money = GameConfig.money - money;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    this.cancelBtnFn();
                }
            };
            ConfirmYearSalary.prototype.cancelBtnFn = function () {
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                Laya.stage.removeChildByName("maskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return ConfirmYearSalary;
        }(ConfirmCancelTipUI));
        common.ConfirmYearSalary = ConfirmYearSalary;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ConfirmYearSalary.js.map