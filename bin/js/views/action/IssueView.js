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
    var action;
    (function (action) {
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var IssueView = /** @class */ (function (_super) {
            __extends(IssueView, _super);
            function IssueView(infoObj) {
                var _this = _super.call(this) || this;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.addMask();
                _this.platLabel.on(Laya.Event.CLICK, _this, _this.selectSingleData);
                _this.spaceLabel.on(Laya.Event.CLICK, _this, _this.selectSingleData);
                _this.issueBtn.on(Laya.Event.CLICK, _this, _this.startIssue, [infoObj]);
                _this.pageName.text = infoObj["pageName"];
                return _this;
            }
            IssueView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "IssueMaskView";
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
            IssueView.prototype.selectSingleData = function (event) {
                var name = event.target.name;
                GameConfig.displayPage += 1;
                this.visible = false;
                this.selectSingleDataView = new views.action.SelectSingleDataView(name);
                SceneLayerManager.sceneLayer.addChild(this.selectSingleDataView);
                this.selectSingleDataView.pos((Laya.stage.width - this.selectSingleDataView.width) / 2, 250);
            };
            IssueView.prototype.resetLabel = function (str) {
                var view = SceneLayerManager.sceneLayer.getChildByName("issueView");
                var platLabel = view.getChildByName("platLabel");
                view.visible = true;
                platLabel.text = str;
            };
            IssueView.prototype.resetPaceLabel = function (str) {
                var view = SceneLayerManager.sceneLayer.getChildByName("issueView");
                var spaceLabel = view.getChildByName("spaceLabel");
                view.visible = true;
                spaceLabel.text = str;
            };
            IssueView.prototype.startIssue = function (infoObj) {
                if (this.pageName.text == "" || this.platLabel.text == "点击选择" || this.spaceLabel.text == "点击选择") {
                    TipLayerManager.tipLayer.showDrawBgTip("信息不完整无法发布");
                }
                else {
                    var spaceNum = void 0;
                    var randomNum = Hash.getRandomNum(60, 70);
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var auObj = GameConfig.authorInfoArr[i];
                        if (auObj["name"] == infoObj["name"]) {
                            if (this.spaceLabel.text == "长篇") {
                                spaceNum = Hash.getRandomNum(750, 1250);
                            }
                            else if (this.spaceLabel.text == "中篇") {
                                spaceNum = Hash.getRandomNum(400, 600);
                            }
                            else if (this.spaceLabel.text == "短篇") {
                                spaceNum = Hash.getRandomNum(200, 300);
                            }
                            auObj["pageName"] = this.pageName.text;
                            auObj["platStr"] = this.platLabel.text;
                            auObj["spaceStr"] = this.spaceLabel.text;
                            auObj["spaceNum"] = spaceNum; //篇幅数
                            auObj["releaseTime"] = randomNum; //发布计时
                            auObj["releaseStartTime"] = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day; //发布时间
                            auObj["curStatus"] = 3; //状态
                            auObj["totalGain"] = 0; //总增益
                            auObj["totalCollect"] = 0;
                            auObj["totalSubs"] = 0;
                            auObj["totalIncom"] = 0;
                            auObj["operaNum"] = 3;
                            GameConfig.releaseTestObjArr.unshift(auObj);
                            GameConfig.cachData["ReleaseObjArr"] = GameConfig.releaseTestObjArr; //发布作者数据集
                            SceneLayerManager.sceneLayer.removeChild(this);
                            SceneLayerManager.sceneLayer.removeChildByName("IssueMaskView");
                            /** 判断是否是第一次发布 */
                            if (IdentityConfig.isFirstIssuePage == false) {
                                IdentityConfig.isFirstIssuePage = true;
                                IdentityConfig.isFirstAuthorName = auObj["name"];
                                IdentityConfig.isFirstPageName = auObj["pageName"];
                                IdentityConfig.isFirstPlatName = auObj["platStr"];
                                GameConfig.cachData["isFirstIssuePage"] = IdentityConfig.isFirstIssuePage;
                                GameConfig.cachData["isFirstAuthorName"] = IdentityConfig.isFirstAuthorName;
                                GameConfig.cachData["isFirstPageName"] = IdentityConfig.isFirstPageName;
                                GameConfig.cachData["isFirstPlatName"] = IdentityConfig.isFirstPlatName;
                            }
                            GameConfig.displayPage -= 1;
                            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                                var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                                list.visible = true;
                            }
                            if (GameConfig.displayPage <= 0) {
                                SceneLayerManager.sceneLayer.openEvent();
                            }
                        }
                    }
                }
            };
            IssueView.prototype.createScoreTwo = function (obj) {
                var startDay = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                var diffDays = Hash.dateDifference(obj["releaseStartTime"], startDay);
                if (diffDays == 60) {
                    obj["totalGain"] = 0;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == obj["name"]) {
                            authorObj["totalGain"] = 0;
                        }
                    }
                }
                if (diffDays == 30) {
                    SceneLayerManager.sceneLayer.stopEvent();
                    GameConfig.displayPage += 1;
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                        list.visible = false;
                    }
                    var curObj = SceneLayerManager.sceneLayer.selectObj(obj);
                    this.scoreView = new views.action.ScoreView(curObj);
                    SceneLayerManager.sceneLayer.addChild(this.scoreView);
                }
            };
            return IssueView;
        }(ui.action.IssueViewUI));
        action.IssueView = IssueView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=IssueView.js.map