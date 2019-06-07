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
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var TriggerEventView = /** @class */ (function (_super) {
            __extends(TriggerEventView, _super);
            function TriggerEventView(trigerObj) {
                var _this = _super.call(this) || this;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.zOrder = 2;
                _this.addMask();
                _this.setValue(trigerObj);
                _this.getBtn.on(Laya.Event.CLICK, _this, _this.removeView);
                return _this;
            }
            TriggerEventView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "trigerMaskView";
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
            TriggerEventView.prototype.setValue = function (trigerObj) {
                var str = trigerObj["string"];
                if (trigerObj["showType"] == 0) {
                    this.triggerBg.skin = "gameUI/event/newsIcon.png";
                    this.getBtn.label = "收起报纸";
                    this.newsLabel.visible = true;
                    this.paperLabel.visible = false;
                }
                else {
                    this.triggerBg.skin = "gameUI/event/paperIcon.png";
                    this.getBtn.label = "收起信件";
                    this.newsLabel.visible = false;
                    this.paperLabel.visible = true;
                }
                if (trigerObj["reward"] == 1) {
                    GameConfig.money = GameConfig.money + trigerObj["value"];
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                }
                else if (trigerObj["reward"] == 2) {
                    GameConfig.fans = GameConfig.fans + trigerObj["value"];
                    views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
                }
                switch (trigerObj["id"]) {
                    case 1:
                        str = str.replace("$公寓名称", GameConfig.ApartmentName);
                        this.newsLabel.text = str;
                        break;
                    case 2:
                        str = str.replace("$首部作品名称", IdentityConfig.isFirstPageName);
                        this.newsLabel.text = str;
                        break;
                    case 3:
                        str = str.replace(/\$公寓名称/g, GameConfig.ApartmentName);
                        str = str.replace(/\$作者名称/g, IdentityConfig.firstFinishAuthor);
                        str = str.replace(/\$平台名称/g, IdentityConfig.firstFinishPlatName);
                        str = str.replace(/\$作品名称/g, IdentityConfig.firstFinishPageName);
                        // str2 = str2.replace("$公寓名称", GameConfig.ApartmentName);
                        // str2 = str2.replace("$作者名称", IdentityConfig.firstFinishAuthor);
                        // str2 = str2.replace("$平台名称", IdentityConfig.firstFinishPlatName);
                        // str2 = str2.replace("$作品名称", IdentityConfig.firstFinishPageName);
                        this.newsLabel.text = str;
                        break;
                    case 4:
                        str = str.replace("$作者名称", IdentityConfig.firstEnlistAuthor);
                        str = str.replace("$公寓名称", GameConfig.ApartmentName);
                        this.newsLabel.text = str;
                        break;
                    case 5:
                        str = str.replace("$首部作品名称", IdentityConfig.isFirstPageName);
                        this.paperLabel.text = str;
                        break;
                    case 6:
                        str = str.replace(/\$公寓名称/g, GameConfig.ApartmentName);
                        str = str.replace(/\$作者名称/g, IdentityConfig.firstWinAuthor);
                        str = str.replace(/\$平台名称/g, IdentityConfig.firstWinPlatname);
                        str = str.replace(/\$作品名称/g, IdentityConfig.firstWinPageName);
                        str = str.replace(/\$奖项名称/g, IdentityConfig.firstWinName);
                        this.newsLabel.text = str;
                        break;
                }
            };
            TriggerEventView.prototype.removeView = function () {
                SceneLayerManager.sceneLayer.removeChildByName("trigerMaskView");
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return TriggerEventView;
        }(ui.event.TriggerEventUI));
        events.TriggerEventView = TriggerEventView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=TriggerEventView.js.map