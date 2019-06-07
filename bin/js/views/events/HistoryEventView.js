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
        var HistoryEventView = /** @class */ (function (_super) {
            __extends(HistoryEventView, _super);
            function HistoryEventView(hisObj) {
                var _this = _super.call(this) || this;
                _this.x = (Laya.stage.width - _this.width) / 2; //250;
                _this.y = (Laya.stage.height - _this.height) / 2; //350;
                _this.zOrder = 3;
                _this.triggerBg.skin = "gameUI/event/newsIcon.png";
                _this.paperLabel.visible = false;
                _this.newsLabel.visible = true;
                _this.getBtn.label = "收起报纸";
                _this.addMask();
                _this.resetData(hisObj);
                _this.getBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                return _this;
            }
            HistoryEventView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 3;
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
            HistoryEventView.prototype.resetData = function (hisObj) {
                GameConfig.hisObjArr.push(hisObj);
                GameConfig.cachData["hisObjArr"] = GameConfig.hisObjArr;
                for (var i = 0; i < ResourceManager.holeArr.length; i++) {
                    var holeObj = ResourceManager.holeArr[i];
                    if (holeObj["event"] == hisObj["id"] && WritingConfig.enableHoleArr.indexOf(holeObj) == -1) {
                        WritingConfig.enableHoleArr.push(holeObj);
                    }
                }
                GameConfig.cachData["enableHoleArr"] = WritingConfig.enableHoleArr;
            };
            HistoryEventView.prototype.closeView = function (event) {
                event.stopPropagation();
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return HistoryEventView;
        }(ui.event.TriggerEventUI));
        events.HistoryEventView = HistoryEventView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=HistoryEventView.js.map