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
        var AuthorJobIconItemUI = ui.player.AuthorJobIconItemUI;
        var PlayerJobDialogView = /** @class */ (function (_super) {
            __extends(PlayerJobDialogView, _super);
            function PlayerJobDialogView(payOBj) {
                var _this = _super.call(this) || this;
                _this.name = "playerJobDialogView";
                _this.curPayObj = payOBj;
                _this.addMask();
                _this.initView();
                console.log(GameConfig.displayPage);
                if (_this.curPayObj == null) {
                    _this.nullBox.visible = true;
                    _this.hasBox.visible = false;
                    var today = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                    var Tomorrow = IdentityConfig.jobYear + "-1-15";
                    var day = Hash.dateDifference(today, Tomorrow);
                    _this.dayNum.text = day + "天";
                }
                else {
                    _this.hasBox.visible = true;
                    _this.nullBox.visible = false;
                    _this.job1.on(Laya.Event.CLICK, _this, _this.callAuthor);
                    _this.job2.on(Laya.Event.CLICK, _this, _this.callAuthor);
                    _this.job3.on(Laya.Event.CLICK, _this, _this.callAuthor);
                    _this.job4.on(Laya.Event.CLICK, _this, _this.callAuthor);
                }
                _this.madeAuthor.on(Laya.Event.CLICK, _this, _this.recoverPro);
                _this.recyclePro.on(Laya.Event.CLICK, _this, _this.recycleData);
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.removeView);
                return _this;
            }
            /** 添加遮罩区域 */
            PlayerJobDialogView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.width = Laya.stage.width;
                this.guideContainer.height = Laya.stage.height;
                this.guideContainer.name = "PlayerJobDialogViewMask";
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
            /**  召唤作者*/
            PlayerJobDialogView.prototype.callAuthor = function (event) {
                Hash.playMusic(1);
                var name = event.target.name;
                if (IdentityConfig.curJobBtnArr.indexOf(name) != -1) {
                    var quaArr = new Array();
                    quaArr.splice(0, quaArr.length);
                    for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                        var auObj = IdentityConfig.curCallAuthorArr[i];
                        quaArr.push(auObj["quality"]);
                    }
                    if (IdentityConfig.curCallAuthorArr.length >= 12) {
                        if (quaArr.indexOf(1) != -1) {
                            var index = quaArr.indexOf(1);
                            var curObj = IdentityConfig.curCallAuthorArr[index];
                            IdentityConfig.curCallAuthorArr.splice(index, 1);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            this.recoverPoint(curObj);
                            this.callBackAuthor(name);
                        }
                        else {
                            TipLayerManager.tipLayer.showDrawBgTip("当前简历过多，请回收后再进行招募");
                        }
                    }
                    else {
                        this.callBackAuthor(name);
                    }
                }
                else {
                    TipLayerManager.tipLayer.showDrawBgTip("未激活");
                }
            };
            /** 进行招募作者 */
            PlayerJobDialogView.prototype.callBackAuthor = function (name) {
                var checkArr = new Array();
                checkArr.splice(0, checkArr.length);
                var rateArr = [0.3, 0.2, 0.1];
                var job2Arr = [{ "quality": 1, "weight": 3 }, { "quality": 2, "weight": 7 }];
                var job3Arr = [{ "quality": 2, "weight": 4 }, { "quality": 3, "weight": 6 }];
                ;
                var job4Arr = [{ "quality": 3, "weight": 5 }, { "quality": 4, "weight": 5 }];
                ;
                switch (name) {
                    case "job1":
                        if (this.curPayObj["selNum"] < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                            return;
                        }
                        else {
                            checkArr = this.getJob1EnabelAuthor(1);
                            var authorObjOne = Hash.weight_rand(checkArr);
                            if (authorObjOne != null) {
                                /** 进行赋值 */
                                IdentityConfig.curCallAuthorArr.push(authorObjOne);
                                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            }
                            /** 进行解锁几率判断 */
                            var rate = Hash.countRate(rateArr[0]);
                            if (rate == 1) {
                                if (IdentityConfig.curJobBtnArr.indexOf("job2") == -1) {
                                    IdentityConfig.curJobBtnArr.push("job2");
                                }
                            }
                            this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                        }
                        this.initView();
                        break;
                    case "job2":
                        if (this.curPayObj["selNum"] < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                            return;
                        }
                        else {
                            /** 首先通过权重获取品质 */
                            var job2Obj = Hash.weight_rand(job2Arr);
                            /** 获取最终可选类表 */
                            checkArr = this.getJob1EnabelAuthor(job2Obj["quality"]);
                            var authorObjTwo = Hash.weight_rand(checkArr);
                            if (authorObjTwo != null) {
                                /** 进行赋值 */
                                IdentityConfig.curCallAuthorArr.push(authorObjTwo);
                                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            }
                            /** 进行解锁几率判断 */
                            var rateTwo = Hash.countRate(rateArr[1]);
                            if (rateTwo == 1) {
                                if (IdentityConfig.curJobBtnArr.indexOf("job3") == -1) {
                                    IdentityConfig.curJobBtnArr.push("job3");
                                }
                            }
                            if (IdentityConfig.curJobBtnArr.indexOf("job2") != -1) {
                                var index = IdentityConfig.curJobBtnArr.indexOf("job2");
                                IdentityConfig.curJobBtnArr.splice(index, 1);
                            }
                            this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                        }
                        this.initView();
                        break;
                    case "job3":
                        if (this.curPayObj["selNum"] < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                            return;
                        }
                        else {
                            /** 首先通过权重获取品质 */
                            var job3Obj = Hash.weight_rand(job3Arr);
                            checkArr = this.getJob1EnabelAuthor(job3Obj["quality"]);
                            var authorObjThree = Hash.weight_rand(checkArr);
                            if (authorObjThree != null) {
                                /** 进行赋值 */
                                IdentityConfig.curCallAuthorArr.push(authorObjThree);
                                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            }
                            /** 进行解锁几率判断 */
                            var rateThree = Hash.countRate(rateArr[2]);
                            if (rateThree == 1) {
                                if (IdentityConfig.curJobBtnArr.indexOf("job4") == -1) {
                                    IdentityConfig.curJobBtnArr.push("job4");
                                }
                            }
                            if (IdentityConfig.curJobBtnArr.indexOf("job3") != -1) {
                                var index = IdentityConfig.curJobBtnArr.indexOf("job3");
                                IdentityConfig.curJobBtnArr.splice(index, 1);
                            }
                            this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                        }
                        this.initView();
                        break;
                    case "job4":
                        if (this.curPayObj["selNum"] < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                            return;
                        }
                        else {
                            /** 首先通过权重获取品质 */
                            var job4Obj = Hash.weight_rand(job4Arr);
                            checkArr = this.getJob1EnabelAuthor(job4Obj["quality"]);
                            var authorObjFour = Hash.weight_rand(checkArr);
                            if (authorObjFour != null) {
                                /** 进行赋值 */
                                IdentityConfig.curCallAuthorArr.push(authorObjFour);
                                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                            }
                            if (IdentityConfig.curJobBtnArr.indexOf("job4") != -1) {
                                var index = IdentityConfig.curJobBtnArr.indexOf("job4");
                                IdentityConfig.curJobBtnArr.splice(index, 1);
                            }
                            this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                        }
                        this.initView();
                        break;
                }
            };
            /** 初始状态值 */
            PlayerJobDialogView.prototype.initView = function () {
                if (this.recyclePro.value >= 1) {
                    this.madeAuthor.disabled = false;
                }
                else {
                    this.madeAuthor.disabled = true;
                }
                this.AuthorListPanel.removeChildren(0, this.AuthorListPanel.numChildren);
                this.recyclePro.value = IdentityConfig.curjobPoint / 500;
                if (this.curPayObj != null) {
                    var hasBox = this.getChildByName("hasBox");
                    for (var i = 1; i < 5; i++) {
                        var imgName = "job" + i;
                        var img = hasBox.getChildByName(imgName);
                        if (IdentityConfig.curJobBtnArr.indexOf(imgName) != -1) {
                            img.disabled = false;
                        }
                        else {
                            img.disabled = true;
                        }
                    }
                    this.lowNum.text = "剩余次数：" + this.curPayObj["selNum"];
                }
                /** 给简历列表赋值 */
                for (var j = 0; j < IdentityConfig.curCallAuthorArr.length; j++) {
                    var callObj = IdentityConfig.curCallAuthorArr[j];
                    var gridItem = new AuthorJobIconItemUI();
                    gridItem.authorName.text = callObj["name"];
                    gridItem.playerIcon.skin = callObj["icon"];
                    gridItem.playerBg.skin = "gameUI/AuthorData/q_0" + callObj["quality"] + ".png";
                    this.AuthorListPanel.addChild(gridItem);
                    if (j >= 4) {
                        gridItem.x = parseInt((j - 4) % 4 + "") * (gridItem.width + 12);
                        gridItem.y = (parseInt((j - 4) / 4 + "") + 1) * (gridItem.height + 7);
                    }
                    else {
                        gridItem.x = j * (gridItem.width + 12);
                    }
                    gridItem.playerIcon.on(Event.CLICK, this, this.updateRightContent, [callObj, this.curPayObj]);
                    gridItem.delAuthor.visible = false; //屏蔽叉号
                    // gridItem.delAuthor.on(Event.CLICK, this, this.delAuthorData, [callObj]);
                }
            };
            /** 恢复回收值进度条 */
            PlayerJobDialogView.prototype.recoverPro = function () {
                Laya.Tween.to(this.recyclePro, { value: 0 }, 3000, null, Handler.create(this, this.resetProValue));
                Hash.playMusic(2);
            };
            PlayerJobDialogView.prototype.resetProValue = function () {
                this.recyclePro.value = 0;
                IdentityConfig.curjobPoint = 0;
                GameConfig.cachData["curjobPoint"] = IdentityConfig.curjobPoint;
                this.initView();
            };
            /** 显示简历详细信息 */
            PlayerJobDialogView.prototype.updateRightContent = function (callObj, curPayObj) {
                Hash.playMusic(2);
                GameConfig.displayPage += 1;
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
                this.playerSingleJobView = new views.player.PlayerSingleJobView(callObj, curPayObj);
            };
            /** 回收单个作者简历 */
            PlayerJobDialogView.prototype.delAuthorData = function (callObj) {
                console.log("你要删除" + callObj["name"]);
                if (callObj["quality"] == 3 || callObj["quality"] == 4) {
                    this.tipView = new ui.common.ConfirmCancelTipUIUI();
                    this.tipView.x = (Laya.stage.width - this.tipView.width) / 2;
                    this.tipView.y = (Laya.stage.height - this.tipView.height) / 2;
                    this.tipView.contentTxt.text = "你回收的简历中包含“高级简历”，是否确定回收？";
                    this.tipView.visible = true;
                    this.mouseEnabled = false;
                    Laya.stage.addChild(this.tipView);
                    this.tipView.confirmBtn.on(Event.CLICK, this, this.removeOneTipView, [callObj]);
                    this.tipView.closeBtn.on(Event.CLICK, this, this.removeTipViewOne);
                    this.tipView.cancelBtn.on(Event.CLICK, this, this.removeTipViewOne);
                }
                else {
                    this.resetView(callObj);
                }
                Hash.playMusic(2);
            };
            PlayerJobDialogView.prototype.removeOneTipView = function (callObj) {
                // this.removeChild(this.tipView);
                this.tipView.removeSelf();
                this.resetView(callObj);
                this.mouseEnabled = true;
            };
            PlayerJobDialogView.prototype.removeTipViewOne = function () {
                // this.removeChild(this.tipView);
                this.tipView.removeSelf();
                this.mouseEnabled = true;
            };
            PlayerJobDialogView.prototype.resetView = function (callObj) {
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    if (curObj["name"] == callObj["name"]) {
                        IdentityConfig.curCallAuthorArr.splice(i, 1);
                        GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        this.recoverPoint(callObj);
                    }
                }
                this.initView();
            };
            /** 获取招聘可选取的作者列表 */
            PlayerJobDialogView.prototype.getJob1EnabelAuthor = function (quality) {
                var enableCheck = new Array();
                enableCheck.splice(0, enableCheck.length);
                for (var i = 0; i < GameConfig.authorArr.length; i++) {
                    var gudingObj = GameConfig.authorArr[i];
                    if (gudingObj["quality"] == quality) {
                        enableCheck.push(gudingObj);
                    }
                }
                for (var j = 0; j < enableCheck.length; j++) {
                    var enaObj = enableCheck[j];
                    for (var index = 0; index < GameConfig.authorInfoArr.length; index++) {
                        var auObj = GameConfig.authorInfoArr[index];
                        if (enaObj["name"] == auObj["name"]) {
                            enableCheck.splice(j, 1);
                            j--;
                        }
                    }
                }
                for (var m = 0; m < enableCheck.length; m++) {
                    var enaObjTwo = enableCheck[m];
                    for (var n = 0; n < IdentityConfig.curCallAuthorArr.length; n++) {
                        var curObj = IdentityConfig.curCallAuthorArr[n];
                        if (enaObjTwo["name"] == curObj["name"]) {
                            enableCheck.splice(m, 1);
                            m--;
                        }
                    }
                }
                return enableCheck;
            };
            PlayerJobDialogView.prototype.recycleData = function () {
                var auqArr = new Array();
                auqArr.splice(0, auqArr.length);
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var auObj = IdentityConfig.curCallAuthorArr[i];
                    auqArr.push(auObj["quality"]);
                }
                if (auqArr.indexOf(3) == -1 && auqArr.indexOf(4) == -1) {
                    this.delCallObj();
                }
                else {
                    this.tipView = new ui.common.ConfirmCancelTipUIUI();
                    this.tipView.x = (Laya.stage.width - this.tipView.width) / 2;
                    this.tipView.y = (Laya.stage.height - this.tipView.height) / 2;
                    this.tipView.contentTxt.text = "你回收的简历中包含“高级简历”，是否确定回收？";
                    this.tipView.visible = true;
                    this.mouseEnabled = false;
                    Laya.stage.addChild(this.tipView);
                    this.tipView.confirmBtn.on(Event.CLICK, this, this.removeTwoTipView);
                    this.tipView.closeBtn.on(Event.CLICK, this, this.removeTipViewTwo);
                    this.tipView.cancelBtn.on(Event.CLICK, this, this.removeTipViewTwo);
                }
                Hash.playMusic(2);
            };
            PlayerJobDialogView.prototype.removeTwoTipView = function () {
                this.tipView.removeSelf();
                this.mouseEnabled = true;
                this.delCallObj();
            };
            PlayerJobDialogView.prototype.removeTipViewTwo = function () {
                this.tipView.removeSelf();
                this.mouseEnabled = true;
                this.delQuaLow();
            };
            /** 清空全部作者 */
            PlayerJobDialogView.prototype.delCallObj = function () {
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    this.recoverPoint(curObj);
                }
                IdentityConfig.curCallAuthorArr.splice(0, IdentityConfig.curCallAuthorArr.length);
                GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                this.initView();
            };
            /** 清空品质为1,2的作者 */
            PlayerJobDialogView.prototype.delQuaLow = function () {
                for (var i = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    var curObj = IdentityConfig.curCallAuthorArr[i];
                    if (curObj["quality"] == 1 || curObj["quality"] == 2) {
                        this.recoverPoint(curObj);
                        IdentityConfig.curCallAuthorArr.splice(i, 1);
                        GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        i--;
                    }
                }
                this.initView();
            };
            /** 回收添加点数 */
            PlayerJobDialogView.prototype.recoverPoint = function (callObj) {
                switch (callObj["quality"]) {
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
            };
            PlayerJobDialogView.prototype.removeView = function () {
                Hash.playMusic(2);
                if (this.curPayObj == null) {
                    this.outJob();
                }
                else {
                    if (this.curPayObj["selNum"] > 0) {
                        this.conffimTipView = new ui.common.ConfirmCancelTipUIUI();
                        this.conffimTipView.x = (Laya.stage.width - this.conffimTipView.width) / 2;
                        this.conffimTipView.y = (Laya.stage.height - this.conffimTipView.height) / 2;
                        this.conffimTipView.contentTxt.text = "你还有剩余的招聘机会，是否确认放弃";
                        this.conffimTipView.visible = true;
                        this.mouseEnabled = false;
                        this.conffimTipView.zOrder = 3;
                        SceneLayerManager.sceneLayer.addChild(this.conffimTipView);
                        this.conffimTipView.confirmBtn.on(Event.CLICK, this, this.outJobTwo);
                        this.conffimTipView.closeBtn.on(Event.CLICK, this, this.reBackJob);
                        this.conffimTipView.cancelBtn.on(Event.CLICK, this, this.reBackJob);
                    }
                    else {
                        this.outJob();
                    }
                }
            };
            PlayerJobDialogView.prototype.reBackJob = function () {
                this.conffimTipView.removeSelf();
                this.mouseEnabled = true;
            };
            PlayerJobDialogView.prototype.outJobTwo = function () {
                this.reBackJob();
                this.outJob();
            };
            PlayerJobDialogView.prototype.outJob = function () {
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
                GameConfig.displayPage -= 1;
                console.log(GameConfig.displayPage);
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return PlayerJobDialogView;
        }(ui.player.AuthorJobDialogUI));
        player.PlayerJobDialogView = PlayerJobDialogView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerJobDialogView.js.map