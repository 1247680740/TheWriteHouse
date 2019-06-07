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
        var Sprite = Laya.Sprite;
        var HitArea = Laya.HitArea;
        var ApartInfoTbView = /** @class */ (function (_super) {
            __extends(ApartInfoTbView, _super);
            function ApartInfoTbView() {
                var _this = _super.call(this) || this;
                _this.guideStepArr = ResourceManager.guideArr;
                Laya.stage.removeChildByName("maskView");
                _this.x = (Laya.stage.width - _this.width) / 2; //70;
                _this.y = (Laya.stage.height - _this.height) / 2; //500;
                _this.addMask();
                Laya.stage.addChild(_this);
                _this.startgame.on(Laya.Event.CLICK, _this, _this.startgamefuc);
                _this.flushWorksInfoUI();
                return _this;
            }
            ApartInfoTbView.getInstance = function () {
                if (ApartInfoTbView.instance == null) {
                    ApartInfoTbView.instance = new ApartInfoTbView();
                }
                return ApartInfoTbView.instance;
            };
            ApartInfoTbView.prototype.flushWorksInfoUI = function () {
                this.homenumber.text = GameConfig.QueueNumber.toString();
                this.regmoney.text = GameConfig.initmoney.toString();
                var curDate = new Date();
                var month = curDate.getMonth() + 1;
                var day = curDate.getDay();
                this.regtime.text = curDate.getFullYear().toString() + '/' + month.toString() + '/' + curDate.getDate().toString();
            };
            ApartInfoTbView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                // 设置容器为画布缓存
                this.guideContainer.name = "maskView";
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.5;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                var height = Laya.stage.height - this.height;
                this.hitAreaOne.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            ApartInfoTbView.prototype.startgamefuc = function () {
                var engnum = 0;
                var chinum = 0;
                var totalnum = 0;
                for (var i = 0; i < this.inputname.text.length; i++) {
                    if (this.inputname.text.charCodeAt(i) < 128 && this.inputname.text.charCodeAt(i) >= 0) {
                        engnum += 1; //英文
                    }
                    else {
                        chinum += 2; // 中文
                    }
                }
                totalnum = engnum + chinum;
                if (this.inputname.text != '输入公寓名称' && totalnum > 10) {
                    TipLayerManager.tipLayer.showDrawBgTip("字符过长");
                    return;
                }
                if (this.inputname.text != '输入公寓名称' && this.inputname.text != '') {
                    GameConfig.ApartmentName = this.inputname.text;
                }
                this.closeView();
            };
            ApartInfoTbView.prototype.closeView = function () {
                Laya.stage.removeChildByName("maskView");
                Laya.stage.removeChild(this);
                var guideSteps = new Array();
                guideSteps.splice(0, guideSteps.length);
                for (var i = 0; i < this.guideStepArr.length; i++) {
                    var guideObj = this.guideStepArr[i];
                    if (guideObj["id"] == GameConfig.guideStepNum) {
                        guideSteps.push(guideObj);
                    }
                }
                var guideStepView = new views.common.GuideStep(GameConfig.guideStepNum, guideSteps);
                Laya.stage.addChild(guideStepView);
                Hash.playMusic(2);
            };
            return ApartInfoTbView;
        }(ui.common.ApartInfoTbUI));
        common.ApartInfoTbView = ApartInfoTbView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ApartInfoTbView.js.map