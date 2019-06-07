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
        var Sprite = Laya.Sprite;
        var HitArea = Laya.HitArea;
        var Event = Laya.Event;
        var AuthorIconItemUI = ui.player.AuthorIconItemUI;
        var PlayerSingleJobView = /** @class */ (function (_super) {
            __extends(PlayerSingleJobView, _super);
            function PlayerSingleJobView(callObj, payObj) {
                var _this = _super.call(this) || this;
                _this.isFirst = true;
                _this.curPayObj = payObj;
                _this.addMask();
                _this.initData(callObj);
                _this.Btn1.on(Laya.Event.CLICK, _this, _this.returnView);
                _this.Btn2.on(Laya.Event.CLICK, _this, _this.delAuthor);
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.removeView);
                return _this;
            }
            PlayerSingleJobView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.width = Laya.stage.width;
                this.guideContainer.height = Laya.stage.height;
                this.guideContainer.name = "playerSingleJobViewMask";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.pos(0, 0);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.guideContainer.addChild(this);
                this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            PlayerSingleJobView.prototype.initData = function (playerObjTwo) {
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                this.gridContainer.hScrollBarSkin = "";
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    var iconGridItem = new AuthorIconItemUI();
                    iconGridItem.name = curObj["name"];
                    iconGridItem.icon.skin = curObj["icon"];
                    iconGridItem.iconBg.skin = "gameUI/AuthorData/q_0" + curObj["quality"] + ".png";
                    iconGridItem.x = i * (iconGridItem.width + 10);
                    iconGridItem.y = 2;
                    this.gridContainer.addChild(iconGridItem);
                    iconGridItem.on(Laya.Event.CLICK, this, this.checkAuthor, [curObj]);
                }
                this.resetTopData(playerObjTwo);
            };
            PlayerSingleJobView.prototype.resetTopData = function (playerObjTwo) {
                this.nameStr.text = playerObjTwo["name"];
                this.authorIcon.skin = playerObjTwo["icon"];
                this.passionMin.value = playerObjTwo["passionMin"] / 100;
                this.precisenessMin.value = playerObjTwo["precisenessMin"] / 100;
                this.disciplineMin.value = playerObjTwo["disciplineMin"] / 100;
                this.curiousMin.value = playerObjTwo["curiousMin"] / 100;
                this.dividedInto.text = playerObjTwo["share"] + "%";
                this.salary.text = (playerObjTwo["monthlySalary"] * 12) + "";
                this.damages.text = playerObjTwo["penalSum"] + "倍";
                this.term.text = playerObjTwo["writing"] + "本";
                this.passStr.text = playerObjTwo["passionMin"] + "/100";
                this.preStr.text = playerObjTwo["precisenessMin"] + "/100";
                this.disStr.text = playerObjTwo["disciplineMin"] + "/100";
                this.curStr.text = playerObjTwo["curiousMin"] + "/100";
                this.characteristic.text = this.getType(playerObjTwo["talent"], GameConfig.talentArr); //特长
                if (playerObjTwo["passionMin"] < 100) {
                    this.passStr.x = 345;
                }
                else {
                    this.passStr.x = 336;
                }
                if (playerObjTwo["precisenessMin"] < 100) {
                    this.preStr.x = 345;
                }
                else {
                    this.preStr.x = 336;
                }
                if (playerObjTwo["disciplineMin"] < 100) {
                    this.disStr.x = 345;
                }
                else {
                    this.disStr.x = 336;
                }
                if (playerObjTwo["curiousMin"] < 100) {
                    this.curStr.x = 345;
                }
                else {
                    this.curStr.x = 336;
                }
                switch (playerObjTwo["quality"]) {
                    case 1:
                        this.nameStr.color = "#8AD281";
                        break;
                    case 2:
                        this.nameStr.color = "#4E94FF";
                        break;
                    case 3:
                        this.nameStr.color = "#A5A5FF";
                        break;
                    case 4:
                        this.nameStr.color = "#FAC96E";
                        break;
                }
            };
            /** 删除简历 */
            PlayerSingleJobView.prototype.delAuthor = function () {
                var nameStr = this.nameStr.text;
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    if (curObj["name"] == nameStr) {
                        if (curObj["quality"] == 3 || curObj["quality"] == 4) {
                            this.tipView = new ui.common.ConfirmCancelTipUIUI();
                            this.tipView.x = (Laya.stage.width - this.tipView.width) / 2;
                            this.tipView.y = (Laya.stage.height - this.tipView.height) / 2;
                            this.tipView.contentTxt.text = "你回收的简历中包含“高级简历”，是否确定回收？";
                            this.tipView.visible = true;
                            this.mouseEnabled = false;
                            Laya.stage.addChild(this.tipView);
                            this.tipView.confirmBtn.on(Event.CLICK, this, this.showTipView, [curObj]);
                            this.tipView.closeBtn.on(Event.CLICK, this, this.removeTipView);
                            this.tipView.cancelBtn.on(Event.CLICK, this, this.removeTipView);
                        }
                        else {
                            this.resetView(curObj);
                        }
                    }
                }
                Hash.playMusic(2);
            };
            PlayerSingleJobView.prototype.showTipView = function (curObj) {
                this.tipView.removeSelf();
                this.mouseEnabled = true;
                this.resetView(curObj);
            };
            PlayerSingleJobView.prototype.removeTipView = function () {
                this.tipView.removeSelf();
                this.mouseEnabled = true;
            };
            PlayerSingleJobView.prototype.resetView = function (curTwoObj) {
                var nextObj = new Object;
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    if (curObj["name"] == curTwoObj["name"]) {
                        if ((i + 1) >= IdentityConfig.curCallAuthorArr.length) {
                            nextObj = IdentityConfig.curCallAuthorArr[0];
                        }
                        else {
                            nextObj = IdentityConfig.curCallAuthorArr[i + 1];
                        }
                        switch (curTwoObj["quality"]) {
                            case 1:
                                IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 1;
                                break;
                            case 2:
                                IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 10;
                                break;
                            case 3:
                                IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 50;
                                break;
                            case 4:
                                IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 100;
                                break;
                        }
                        GameConfig.cachData["curjobPoint"] = IdentityConfig.curjobPoint;
                        IdentityConfig.curCallAuthorArr.splice(i, 1);
                        GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                    }
                }
                if (IdentityConfig.curCallAuthorArr.length <= 0) {
                    this.removeView();
                }
                else {
                    this.initData(nextObj);
                }
            };
            /** 获取特长类型 */
            PlayerSingleJobView.prototype.getType = function (infoArr, dataArr) {
                var str;
                for (var i = 0; i < infoArr.length; i++) {
                    for (var j = 0; j < dataArr.length; j++) {
                        if (infoArr[i] == j) {
                            str = dataArr[j] + ",";
                        }
                    }
                }
                str = str.substr(0, str.length - 1);
                return str;
            };
            PlayerSingleJobView.prototype.checkAuthor = function (curObj) {
                this.resetTopData(curObj);
            };
            /** 立即签约 */
            PlayerSingleJobView.prototype.returnView = function () {
                var name = this.nameStr.text;
                var nextObj = new Object;
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    if (curObj["name"] == name) {
                        if ((i + 1) >= IdentityConfig.curCallAuthorArr.length) {
                            nextObj = IdentityConfig.curCallAuthorArr[0];
                        }
                        else {
                            nextObj = IdentityConfig.curCallAuthorArr[i + 1];
                        }
                        if (GameConfig.signingNum >= GameConfig.homeFloor) {
                            TipLayerManager.tipLayer.showDrawBgTip("签约的人数已经够啦！不能签了");
                        }
                        else {
                            GameConfig.signingNum += 1;
                            IdentityConfig.curCallAuthorArr.splice(i, 1);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            for (var i_1 = 0; i_1 < GameConfig.guding.length; i_1++) {
                                var obj = GameConfig.guding[i_1];
                                if (obj["name"] == name) {
                                    obj["curStatus"] = 0;
                                    obj["finishNum"] = 0;
                                    /** 更新年、去年总收藏、去年总粉丝、去年总订阅、去年总收入、去年总属性 */
                                    obj["awardYear"] = 0;
                                    obj["yearCollect"] = 0;
                                    obj["yearFans"] = 0;
                                    obj["yearSubs"] = 0;
                                    obj["yearIncome"] = 0;
                                    obj["yearNature"] = 0;
                                    obj["totalCollect"] = 0;
                                    obj["totalSubs"] = 0;
                                    obj["totalIncom"] = 0;
                                    obj["outLine"] = 0;
                                    obj["totalGain"] = 0;
                                    obj["sportStatus"] = 0;
                                    obj["yearLeave"] = 7;
                                    obj["writingStartTime"] = "";
                                    // obj["startWritingTime"] = "";
                                    obj["releaseStartTime"] = "";
                                    obj["mood"] = 100; //初始心情值
                                    obj["actWork"] = 0; //工作时间
                                    obj["actRest"] = 0; //休息时间
                                    obj["twoWorkTime"] = 0; //在状态二时的工作时间计时
                                    obj["overNum"] = 0; //状态不达标时需要补得时长
                                    obj["pageNum"] = 0; //作者工作每秒钟写的章数
                                    obj["spaceNum"] = 0; //作者需要写的总章数
                                    obj["thirtyPageNum"] = 0; //作者近三十天写的章数
                                    obj["eleIdArr"] = []; //作者选择元素Id集合
                                    var id = obj["id"] + "";
                                    if (GameConfig.authorIdArr.indexOf(id) == -1) {
                                        GameConfig.authorIdArr.push(id);
                                    }
                                    GameConfig.authorInfoArr.push(obj);
                                    for (var j = 0; j < GameConfig.authorArr.length; j++) {
                                        var curObj_1 = GameConfig.authorArr[j];
                                        if (curObj_1["id"] == parseInt(id)) {
                                            GameConfig.authorArr.splice(j, 1);
                                            j--;
                                        }
                                    }
                                    /** 判断是否是第一次招到高阶作者 */
                                    if (IdentityConfig.isFirstEnlist == false && obj["quality"] == 4) {
                                        IdentityConfig.isFirstEnlist = true;
                                        IdentityConfig.firstEnlistAuthor = obj["name"];
                                        GameConfig.cachData["isFirstEnlist"] = IdentityConfig.isFirstEnlist;
                                        GameConfig.cachData["firstEnlistAuthor"] = IdentityConfig.firstEnlistAuthor;
                                    }
                                }
                            }
                            SceneLayerManager.sceneLayer.createBoy(name);
                            if (IdentityConfig.curCallAuthorArr.length <= 0) {
                                this.removeView();
                            }
                            else {
                                this.initData(nextObj);
                            }
                        }
                        //人多力量大
                        var avchidata = managers.ResourceManager.achiveGoldArr;
                        if (GameConfig.authorInfoArr.length == avchidata[2]['aim']) {
                            var achive = new views.events.AchiEvent(2);
                        }
                        GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                        GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                    }
                }
                Hash.playMusic(2);
            };
            PlayerSingleJobView.prototype.removeView = function () {
                Hash.playMusic(2);
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
                this.playerJobDialogView = new views.player.PlayerJobDialogView(this.curPayObj);
            };
            return PlayerSingleJobView;
        }(ui.player.AuthorJobSingleViewUI));
        player.PlayerSingleJobView = PlayerSingleJobView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerSingleJobView.js.map