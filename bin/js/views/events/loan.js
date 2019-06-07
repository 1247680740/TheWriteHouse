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
//贷款系统
/** 实现方案
    1 数据库需要存储是哪一年申请的贷款
*/
var res = managers.ResourceManager;
var ConfirmCancelTipView = views.common.ConfirmCancelTipView;
var _Sprite = Laya.Sprite;
var HitArea = Laya.HitArea;
var views;
(function (views) {
    var events;
    (function (events) {
        var Loan = /** @class */ (function (_super) {
            __extends(Loan, _super);
            function Loan() {
                var _this = _super.call(this) || this;
                _this.changeState = 1;
                var _logn = Laya.stage.getChildByName("lognView");
                if (_logn) {
                    return _this;
                }
                Laya.stage.removeChildByName("maskView");
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                _this.addMask();
                _this.name = 'lognView';
                _this.visible = true;
                _this.loanbtn.skin = 'gameUI/AuthorData/loan.png';
                _this.fullbtn.skin = '';
                // Laya.stage.addChild(this);
                _this.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(_this);
                _this.Determine.skin = "gameUI/common/buttonA.png";
                _this.giveup.skin = "gameUI/common/buttonB.png";
                _this.tittle.text = '加盖楼层';
                _this.loanlabel.text = '贷款';
                _this.shoufu.text = '首付';
                _this.ninahuan.text = '年还';
                _this.qixina.text = '期限';
                _this.zongji.text = '总计';
                _this.full.text = '全款';
                var exl = res.incomeArr;
                for (var i = 0; i < exl.length; i++) {
                    if (GameConfig.year == exl[i]['year']) {
                        _this.loanlabel1.text = '' + exl[i]['spreaMoney'] * 0.2; // 首付
                        _this.loanlabel2.text = '' + exl[i]['spreaMoney'] * 0.12; // 年还
                        _this.loanlabel3.text = '10年'; // 期限
                        _this.loanlabel4.text = '' + exl[i]['spreaMoney'] * 1.4; // 总计
                        _this.full1.text = exl[i]['spreaMoney']; // 全款  
                        _this.full2.text = '0'; // 年还
                        _this.full3.text = '0年'; // 期限
                        _this.full4.text = '' + exl[i]['spreaMoney']; // 总计           
                    }
                }
                _this.loanbtn.on(Laya.Event.CLICK, _this, _this.selectloan); //确定   
                _this.fullbtn.on(Laya.Event.CLICK, _this, _this.selectfull); //放弃 
                _this.Determine.on(Laya.Event.CLICK, _this, _this.sure); //确定   
                _this.giveup.on(Laya.Event.CLICK, _this, _this.giveUpfunc); //放弃
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.Determine.label = '施工';
                _this.giveup.label = '放弃';
                SceneLayerManager.sceneLayer.stopEvent();
                return _this;
            }
            Loan.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new _Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
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
            Loan.prototype.selectloan = function () {
                this.changeState = 1;
                this.loanbtn.skin = "gameUI/AuthorData/loan.png";
                this.fullbtn.skin = '';
                Hash.playMusic(2);
            };
            Loan.prototype.selectfull = function () {
                this.changeState = 2;
                this.loanbtn.skin = '';
                this.fullbtn.skin = "gameUI/AuthorData/loan.png";
                Hash.playMusic(2);
            };
            Loan.prototype.sure = function () {
                SceneLayerManager.sceneLayer.buildHome(this.changeState);
                this.closeView();
                Hash.playMusic(2);
            };
            Loan.prototype.giveUpfunc = function () {
                this.closeView();
                Hash.playMusic(2);
            };
            Loan.prototype.closeView = function () {
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                // Laya.stage.removeChild(this);
                SceneLayerManager.sceneLayer.removeChild(this);
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return Loan;
        }(ui.event.LoanUI));
        events.Loan = Loan;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=Loan.js.map