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
         * 带有确定、取消按钮的提示框
         */
        var ConfirmPenalSumMoney = /** @class */ (function (_super) {
            __extends(ConfirmPenalSumMoney, _super);
            function ConfirmPenalSumMoney(money, name, Btn1, Btn2) {
                var _this = _super.call(this) || this;
                _this.name = "confirmPenalSumMoney";
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.visible = true;
                _this.addMask();
                _this.confirmBtn.on(Event.CLICK, _this, _this.payMoney, [money, name, Btn1, Btn2]);
                _this.cancelBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                _this.closeBtn.on(Event.CLICK, _this, _this.cancelBtnFn);
                return _this;
            }
            ConfirmPenalSumMoney.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "PenalSumMoney";
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
            ConfirmPenalSumMoney.prototype.payMoney = function (money, name, Btn1, Btn2, viewNum) {
                if (GameConfig.money < money) {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                }
                else {
                    GameConfig.money = GameConfig.money - money;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    views.player.SinglePlayerInfoView.getInstance(name).surrender(name, Btn1, Btn2);
                }
                this.cancelBtnFn();
            };
            ConfirmPenalSumMoney.prototype.cancelBtnFn = function () {
                Laya.stage.removeChild(this);
                Laya.stage.removeChildByName("PenalSumMoney");
                console.log(Laya.stage.getChildByName("PenalSumMoney"));
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return ConfirmPenalSumMoney;
        }(ConfirmCancelTipUI));
        common.ConfirmPenalSumMoney = ConfirmPenalSumMoney;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ConfirmPenalSumMoney.js.map