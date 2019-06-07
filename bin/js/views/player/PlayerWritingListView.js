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
    var player;
    (function (player) {
        var Event = Laya.Event;
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var AuthorJobIconItemUI = ui.player.AuthorJobIconItemUI;
        var PlayerWritingListView = /** @class */ (function (_super) {
            __extends(PlayerWritingListView, _super);
            function PlayerWritingListView() {
                var _this = _super.call(this) || this;
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.addMask();
                _this.init();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.removeView);
                return _this;
            }
            /** 添加遮罩 */
            PlayerWritingListView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "playerWritingListMask";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            /** 初始化页面 */
            PlayerWritingListView.prototype.init = function () {
                this.enableWriting = new Array();
                this.curAuthorArr = new Array();
                this.posArr = new Array();
                this.enableWriting.splice(0, this.enableWriting.length);
                this.curAuthorArr.splice(0, this.curAuthorArr.length);
                this.posArr.splice(0, this.posArr.length);
                /** 获取可写作者列表并赋值 */
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var curObj = GameConfig.authorInfoArr[i];
                    if (GameConfig.writingAuthor.indexOf(curObj["name"]) == -1) {
                        this.enableWriting.push(curObj);
                        this.posArr.push(curObj["authorPosY"]);
                    }
                }
                this.posArr = this.posArr.sort();
                for (var n = 0; n < this.posArr.length; n++) {
                    var posNum = this.posArr[n];
                    for (var d = 0; d < this.enableWriting.length; d++) {
                        var authorObj = this.enableWriting[d];
                        if (authorObj["authorPosY"] == posNum) {
                            this.curAuthorArr.push(authorObj);
                        }
                    }
                }
                /** 给简历列表赋值 */
                for (var j = 0; j < this.curAuthorArr.length; j++) {
                    var callObj = this.curAuthorArr[j];
                    var gridItem = new AuthorJobIconItemUI();
                    gridItem.delAuthor.mouseEnabled = false;
                    gridItem.delAuthor.visible = false;
                    gridItem.authorName.text = callObj["name"];
                    gridItem.playerIcon.skin = callObj["icon"];
                    gridItem.playerBg.skin = "gameUI/AuthorData/q_0" + callObj["quality"] + ".png";
                    this.gridContainer.addChild(gridItem);
                    if (j >= 4) {
                        gridItem.x = parseInt((j - 4) % 4 + "") * (gridItem.width + 25);
                        gridItem.y = (parseInt((j - 4) / 4 + "") + 1) * (gridItem.height + 20);
                    }
                    else {
                        gridItem.x = j * (gridItem.width + 10);
                    }
                    gridItem.playerIcon.on(Event.CLICK, this, this.startWriting, [callObj]);
                }
            };
            PlayerWritingListView.prototype.startWriting = function (curObj) {
                Laya.stage.removeChild(this);
                Laya.stage.removeChildByName("playerWritingListMask");
                this.writingView = new views.action.WritingView(curObj);
                this.writingView.name = "writingView";
                SceneLayerManager.sceneLayer.addChild(this.writingView);
            };
            PlayerWritingListView.prototype.removeView = function () {
                GameConfig.displayPage -= 1;
                Laya.stage.removeChild(this);
                Laya.stage.removeChildByName("playerWritingListMask");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return PlayerWritingListView;
        }(ui.player.AuthorWritingUI));
        player.PlayerWritingListView = PlayerWritingListView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerWritingListView.js.map