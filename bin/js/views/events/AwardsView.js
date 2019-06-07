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
        var AwardsView = /** @class */ (function (_super) {
            __extends(AwardsView, _super);
            function AwardsView(topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj) {
                var _this = _super.call(this) || this;
                _this.awardArr = ResourceManager.awardsArr;
                _this.tauchNum = -1;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.initPage();
                _this.title.text = "颁奖典礼";
                _this.closeBtn.label = "确定";
                _this.historyLabel.text = "这次的XX大奖我们也获得了提名,颁奖典礼马上要开始了，我们也去看看吧";
                if (GameConfig.authorInfoArr.length > 0) {
                    if (topFansObj == null) {
                        _this.storageInfoTwo();
                    }
                    else {
                        _this.storageInfo(topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj);
                    }
                }
                else {
                    _this.storageInfoTwo();
                }
                _this.judgeName();
                _this.addMask();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                return _this;
            }
            AwardsView.prototype.addMask = function () {
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
            /** 判断是否自己文章中奖 */
            AwardsView.prototype.judgeName = function () {
                var nameStrArr = new Array();
                nameStrArr.splice(0, nameStrArr.length);
                for (var i = 0; i < this.curAwardArr.length; i++) {
                    var wawObj = this.curAwardArr[i];
                    nameStrArr.push(wawObj["opus"]);
                }
                if (GameConfig.articalNameArr.length > 0) {
                    for (var index = 0; index < GameConfig.articalNameArr.length; index++) {
                        var pageName = GameConfig.articalNameArr[index];
                        if (nameStrArr.indexOf(pageName) != -1) {
                            GameConfig.isMyPageAward = true;
                        }
                    }
                }
            };
            AwardsView.prototype.storageInfo = function (topFansObj, topSubsObj, topNatureObj, topIncomeObj, bottomNatureObj) {
                this.curAwardArr = new Array();
                this.winAuthorArr = new Array();
                this.infoArr = new Array();
                for (var i = 0; i < this.awardArr.length; i++) {
                    var awardObj = this.awardArr[i];
                    if (awardObj["session"] == GameConfig.sessionNum) {
                        this.curAwardArr.push(awardObj);
                    }
                }
                for (var j = 0; j < this.curAwardArr.length; j++) {
                    var obj = this.curAwardArr[j];
                    var num1Arr = obj["num1"];
                    var num2 = obj["num2"];
                    var name_1 = obj["name"];
                    var curInfoArr = new Array();
                    if (name_1 == "最佳新人奖") {
                        curInfoArr.push(name_1);
                        if (topFansObj["yearFans"] > num1Arr[0] && topFansObj["yearCollect"] > num1Arr[1]) {
                            curInfoArr.push(topFansObj["pageName"]);
                            topFansObj["winName"] = name_1;
                            this.winAuthorArr.push(topFansObj);
                        }
                        else {
                            curInfoArr.push(obj["opus"]);
                        }
                        this.infoArr.push(curInfoArr);
                    }
                    else if (name_1 == "最佳人气奖") {
                        curInfoArr.push(name_1);
                        if (topSubsObj["yearSubs"] > num1Arr[num1Arr.length - 1]) {
                            curInfoArr.push(topSubsObj["pageName"]);
                            topSubsObj["winName"] = name_1;
                            this.winAuthorArr.push(topSubsObj);
                        }
                        else {
                            curInfoArr.push(obj["opus"]);
                        }
                        this.infoArr.push(curInfoArr);
                    }
                    else if (name_1 == "最佳文学奖") {
                        curInfoArr.push(name_1);
                        if (topNatureObj["yearNature"] > num1Arr[num1Arr.length - 1]) {
                            curInfoArr.push(topNatureObj["pageName"]);
                            topNatureObj["winName"] = name_1;
                            this.winAuthorArr.push(topNatureObj);
                        }
                        else {
                            curInfoArr.push(obj["opus"]);
                        }
                        this.infoArr.push(curInfoArr);
                    }
                    else if (name_1 == "首富奖") {
                        curInfoArr.push(name_1);
                        if (topIncomeObj["yearIncome"] > num1Arr[num1Arr.length - 1]) {
                            curInfoArr.push(topIncomeObj["pageName"]);
                            topIncomeObj["winName"] = name_1;
                            this.winAuthorArr.push(topIncomeObj);
                        }
                        else {
                            curInfoArr.push(obj["opus"]);
                        }
                        this.infoArr.push(curInfoArr);
                    }
                    else if (name_1 == "最烂文学奖") {
                        curInfoArr.push(name_1);
                        if (bottomNatureObj["yearNature"] < num2) {
                            curInfoArr.push(bottomNatureObj["pageName"]);
                        }
                        else {
                            curInfoArr.push(obj["opus"]);
                        }
                        this.infoArr.push(curInfoArr);
                    }
                    if (IdentityConfig.isFirstWin == false) {
                        if (this.winAuthorArr.length > 0) {
                            var data4 = this.winAuthorArr.sort(this.compare('id'));
                            var curObj = data4[0];
                            IdentityConfig.isFirstWin = true;
                            IdentityConfig.firstWinAuthor = curObj["name"];
                            IdentityConfig.firstWinPageName = curObj["pageName"];
                            IdentityConfig.firstWinName = curObj["winName"];
                            IdentityConfig.firstWinPlatname = curObj["platStr"];
                            GameConfig.cachData["isFirstWin"] = IdentityConfig.isFirstWin;
                            GameConfig.cachData["firstWinAuthor"] = IdentityConfig.firstWinAuthor;
                            GameConfig.cachData["firstWinPageName"] = IdentityConfig.firstWinPageName;
                            GameConfig.cachData["firstWinName"] = IdentityConfig.firstWinName;
                        }
                    }
                }
            };
            AwardsView.prototype.compare = function (property) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    return value1 - value2; // 升序
                };
            };
            AwardsView.prototype.storageInfoTwo = function () {
                this.curAwardArr = new Array();
                this.infoArr = new Array();
                for (var i = 0; i < this.awardArr.length; i++) {
                    var awardObj = this.awardArr[i];
                    if (awardObj["session"] == GameConfig.sessionNum) {
                        this.curAwardArr.push(awardObj);
                    }
                }
                for (var j = 0; j < this.curAwardArr.length; j++) {
                    var curInfoArr = new Array();
                    var obj = this.curAwardArr[j];
                    var name_2 = obj["name"];
                    curInfoArr.push(name_2);
                    curInfoArr.push(obj["opus"]);
                    this.infoArr.push(curInfoArr);
                }
            };
            AwardsView.prototype.initPage = function () {
                this.historyLabel.visible = true;
                this.pageName.visible = false;
                this.awardTitle.visible = false;
            };
            AwardsView.prototype.resetPage = function () {
                this.historyLabel.visible = false;
                this.pageName.visible = true;
                this.awardTitle.visible = true;
            };
            AwardsView.prototype.closeView = function () {
                if (this.tauchNum >= this.infoArr.length - 1) {
                    this.tauchNum = -1;
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
                    //TODO:榜上有名
                    if (GameConfig.achiArr[4] == null || GameConfig.achiArr[4] == '') {
                        for (var i = 0; i < GameConfig.articalNameArr.length; i++) {
                            for (var j = 0; j < this.infoArr.length; j++) {
                                if (GameConfig.articalNameArr[i] == this.infoArr[j][1]) {
                                    GameConfig.isMyPageAward = true;
                                    var avchidata = managers.ResourceManager.achiveGoldArr;
                                    var achive = new views.events.AchiEvent(4);
                                    GameConfig.winAwardNum = GameConfig.winAwardNum + 1;
                                    // break;
                                }
                            }
                        }
                    }
                    Hash.playMusic(2);
                }
                else {
                    this.resetPage();
                    this.tauchNum += 1;
                    this.awardTitle.text = "获得本次" + this.infoArr[this.tauchNum][0] + "的作品是：";
                    this.pageName.text = "《" + this.infoArr[this.tauchNum][1] + "》";
                }
            };
            return AwardsView;
        }(ui.action.HistoryViewUI));
        events.AwardsView = AwardsView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AwardsView.js.map