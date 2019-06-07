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
    var events;
    (function (events) {
        var Sprite = Laya.Sprite;
        var HitArea = Laya.HitArea;
        var AchiveView = /** @class */ (function (_super) {
            __extends(AchiveView, _super);
            function AchiveView() {
                var _this = _super.call(this) || this;
                _this.statusChange = true;
                var achiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                if (achiveView) {
                    return _this;
                }
                Laya.stage.removeChildByName("maskView");
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                SceneLayerManager.sceneLayer.stopEvent();
                _this.addMask();
                _this.name = "achiveView";
                _this.visible = true;
                SceneLayerManager.sceneLayer.addChild(_this);
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.pointTip.text = "剩余点数：" + GameConfig.hasTalentPoint;
                _this.talentBtn.skin = "gameUI/common/button_off.png";
                _this.avchiBtn.skin = "gameUI/common/button_on.png";
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                _this.talentBtn.on(Laya.Event.CLICK, _this, _this.showTalent);
                _this.avchiBtn.on(Laya.Event.CLICK, _this, _this.showAchiView);
                views.events.AchiItem.getInstance().createList();
                return _this;
            }
            AchiveView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
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
            AchiveView.prototype.changeStatus = function (name) {
                switch (name) {
                    case "talentBtn":
                        this.talentBtn.skin = "gameUI/common/button_on.png";
                        this.avchiBtn.skin = "gameUI/common/button_off.png";
                        break;
                    case "avchiBtn":
                        this.talentBtn.skin = "gameUI/common/button_off.png";
                        this.avchiBtn.skin = "gameUI/common/button_on.png";
                        break;
                }
            };
            AchiveView.prototype.showTalent = function (event) {
                if (this.statusChange) {
                    this.statusChange = false;
                    var achiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                    views.events.AchiItem.getInstance().changeStatus();
                    var name_1 = event.target.name;
                    this.changeStatus(name_1);
                    this.addTalentChildView();
                    var talentChildView = this.getChildByName("talentChildView");
                    talentChildView.visible = true;
                    Hash.playMusic(2);
                }
                else {
                    return;
                }
            };
            AchiveView.prototype.showAchiView = function (event) {
                if (!this.statusChange) {
                    this.statusChange = true;
                    var achiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                    var name_2 = event.target.name;
                    this.changeStatus(name_2);
                    views.events.AchiItem.getInstance().createList();
                    if (achiveView.getChildByName("talentChildView") != null) {
                        var testList = this.getChildByName("achi_list");
                        var talentChildView = this.getChildByName("talentChildView");
                        views.events.AchiItem.getInstance().changeTrue();
                        talentChildView.visible = false;
                    }
                    Hash.playMusic(2);
                }
                else {
                    return;
                }
            };
            AchiveView.prototype.addTalentChildView = function () {
                GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    GameConfig.unlockIDArr.push(everyObj["level"]);
                }
                this.talentChildView = views.events.TalentChildView.getInstance();
                this.talentChildView.name = "talentChildView";
                this.addChild(this.talentChildView);
            };
            AchiveView.prototype.closeView = function () {
                GameConfig.isFistUnlock = true;
                GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    GameConfig.unlockIDArr.push(everyObj["level"]);
                }
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                SceneLayerManager.sceneLayer.removeChild(this);
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                this.talentChildView = views.events.TalentChildView.getInstance();
                this.talentChildView.initData();
                this.talentChildView.removeSelf();
                var addtal = views.events.AddTalentView.getInstance();
                addtal.removeSelf();
                Hash.playMusic(2);
            };
            return AchiveView;
        }(ui.event.AchiveViewUI));
        events.AchiveView = AchiveView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AchiveView.js.map