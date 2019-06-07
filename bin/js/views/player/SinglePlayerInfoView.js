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
        var WritingView = views.action.WritingView;
        var HitArea = Laya.HitArea;
        var SinglePlayerInfoView = /** @class */ (function (_super) {
            __extends(SinglePlayerInfoView, _super);
            function SinglePlayerInfoView(playerName) {
                var _this = _super.call(this) || this;
                /** 题材 */
                _this.subjectStr = "";
                /** 元素类型 */
                _this.elementStr = "";
                /** 特长 */
                _this.talentStr = "";
                _this.info = "";
                // this.dragArea = "0,0,256,41";
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.zOrder = 2;
                _this.Btn1.label = "写作";
                _this.Btn2.label = "解约";
                SinglePlayerInfoView.infoObj = _this.getInfoObj(playerName);
                _this.setInfoData(SinglePlayerInfoView.infoObj);
                if (SceneLayerManager.sceneLayer.getChildByName("singleMaskView") == null) {
                    _this.addMask();
                }
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.onClose);
                _this.Btn1.on(Laya.Event.CLICK, _this, _this.onBtn1Click);
                _this.Btn2.on(Laya.Event.CLICK, _this, _this.onBtn2Click);
                return _this;
            }
            SinglePlayerInfoView.getInstance = function (name) {
                if (this.instance == null) {
                    this.instance = new SinglePlayerInfoView(name);
                }
                return this.instance;
            };
            SinglePlayerInfoView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "singleMaskView";
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
            SinglePlayerInfoView.prototype.getInfoObj = function (name) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var obj = GameConfig.authorInfoArr[i];
                    var str = obj["name"];
                    if (str == name) {
                        return obj;
                    }
                }
            };
            /** 赋值 */
            SinglePlayerInfoView.prototype.setInfoData = function (infoObj) {
                var str;
                for (str in infoObj) {
                    var id = infoObj["id"];
                    this.nameStr.text = infoObj["name"];
                    this.authorIcon.skin = infoObj["icon"];
                    this.passionMin.value = parseInt(infoObj["passionMin"]) / 100; //激情下限
                    this.passionMax.value = parseInt(infoObj["passionMax"]) / 100; //激情上限
                    this.precisenessMin.value = parseInt(infoObj["precisenessMin"]) / 100; //严谨下限
                    this.precisenessMax.value = parseInt(infoObj["precisenessMax"]) / 100; //严谨上限
                    this.disciplineMin.value = parseInt(infoObj["disciplineMin"]) / 100; //自律下限
                    this.disciplineMax.value = parseInt(infoObj["disciplineMax"]) / 100; //自律上限
                    this.curiousMin.value = parseInt(infoObj["curiousMin"]) / 100; //好奇下限
                    this.curiousMax.value = parseInt(infoObj["curiousMax"]) / 100; //好奇上限
                    this.dividedInto.text = infoObj["share"] + "%"; //分红
                    this.salary.text = (infoObj["monthlySalary"] * 12) + ""; //年薪
                    this.damages.text = infoObj["penalSum"] + "倍"; //违约金
                    this.term.text = infoObj["writing"] + "本";
                    var subject = infoObj["subject"]; //擅长题材
                    var element = infoObj["element"]; //擅长元素
                    var talent = infoObj["talent"]; //特长
                    this.subjectStr = this.getType(subject, GameConfig.subJectArr); //擅长题材
                    this.elementStr = this.getType(element, GameConfig.elemArr); //擅长元素
                    this.talentStr = this.getType(talent, GameConfig.talentArr); //特长
                    // this.specialStr = parseInt(infoObj["special"]) + "";  //是否特殊
                }
                /** 赋值显示 */
                this.theme.text = this.subjectStr;
                this.element.text = this.elementStr;
                this.characteristic.text = this.talentStr;
                // this.getDate();
            };
            /** 判断类型 */
            /** infoArr:数据值，dataArr:类型 */
            SinglePlayerInfoView.prototype.getType = function (infoArr, dataArr) {
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
            /** 获取当前时间戳 */
            SinglePlayerInfoView.prototype.getDate = function () {
                var date = new Date();
                var Y = date.getFullYear() + '/';
                var nextY = date.getFullYear() + 1 + "/";
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                ;
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                var nextYVelue = nextY + M + D + h + m + s + '';
                var date2 = new Date(nextYVelue);
                var t_result = date2.getTime() - date.getTime();
                //剩余时间换算
                var t_result_day = Math.round(t_result / 1000 / 60 / 60 / 24);
                localStorage.setItem("day", t_result_day + '');
                if (parseInt(localStorage.getItem("day")) == 365) {
                    this.term.text = "1年";
                }
                else {
                    if (parseInt(localStorage.getItem("day")) < 10) {
                        this.term.text = "0" + parseInt(localStorage.getItem("day")) + "天";
                    }
                    else {
                        this.term.text = parseInt(localStorage.getItem("day")) + "天";
                    }
                }
            };
            /** 按钮一的点击事件 */
            SinglePlayerInfoView.prototype.onBtn1Click = function (event) {
                event.stopPropagation();
                switch (this.Btn1.label) {
                    case "立即签约":
                        if (GameConfig.signingNum >= GameConfig.homeFloor) {
                            TipLayerManager.tipLayer.showDrawBgTip("签约的人数已经够啦！不能签了");
                        }
                        else {
                            GameConfig.signingNum += 1;
                            this.Btn1.label = "写作";
                            this.Btn2.label = "解约";
                            this.Btn1.centerX = null;
                            this.Btn1.x = 101;
                            this.Btn2.visible = true;
                            this.Btn2.mouseEnabled = true;
                            var nameStr = this.nameStr.text;
                            for (var i = 0; i < GameConfig.guding.length; i++) {
                                var obj = GameConfig.guding[i];
                                if (obj["name"] == nameStr) {
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
                                    GameConfig.authorIdArr.push(id);
                                    GameConfig.authorInfoArr.push(obj);
                                    for (var j = 0; j < GameConfig.authorArr.length; j++) {
                                        var curObj = GameConfig.authorArr[j];
                                        if (curObj["id"] == parseInt(id)) {
                                            GameConfig.authorArr.splice(j, 1);
                                        }
                                    }
                                }
                            }
                            //人多力量大
                            var avchidata = managers.ResourceManager.achiveGoldArr;
                            if (GameConfig.authorInfoArr.length == avchidata[2]['aim']) {
                                var achive = new views.events.AchiEvent(2);
                            }
                            SceneLayerManager.sceneLayer.createBoy(nameStr);
                            GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                            GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                        }
                        break;
                    case "写作":
                        if (GameConfig.writingAuthor.indexOf(SinglePlayerInfoView.infoObj["name"]) != -1) {
                            TipLayerManager.tipLayer.showDrawBgTip("该作者正在写作....");
                        }
                        else {
                            if (GameConfig.writingAuthor.indexOf(SinglePlayerInfoView.infoObj["name"]) == -1) {
                                GameConfig.writingAuthor.push(SinglePlayerInfoView.infoObj["name"]);
                            }
                            GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                            SceneLayerManager.sceneLayer.removeChild(this);
                            SceneLayerManager.sceneLayer.removeChildByName("singleMaskView");
                            this.writingView = new WritingView(SinglePlayerInfoView.infoObj);
                            this.writingView.name = "writingView";
                            SceneLayerManager.sceneLayer.addChild(this.writingView);
                        }
                        break;
                }
                Hash.playMusic(2);
            };
            /** 按钮二的点击事件 */
            SinglePlayerInfoView.prototype.onBtn2Click = function (event) {
                event.stopPropagation();
                var nameStr = this.nameStr.text;
                if (GameConfig.writingAuthor.indexOf(nameStr) != -1) {
                    TipLayerManager.tipLayer.showDrawBgTip("当前作者正在写作中，暂时无法解约");
                }
                else {
                    var Btn1 = this.getChildByName("Btn1");
                    var Btn2 = this.getChildByName("Btn2");
                    for (var i = 0; i < GameConfig.guding.length; i++) {
                        var obj = GameConfig.guding[i];
                        if (obj["name"] == nameStr) {
                            GameConfig.displayPage += 1;
                            SceneLayerManager.sceneLayer.stopEvent();
                            // SceneLayerManager.sceneLayer.removeChildByName("maskView");
                            var money = obj["penalSum"] * parseInt(this.salary.text);
                            this.confirmPanelMoney = new views.common.ConfirmPenalSumMoney(money, nameStr, Btn1, Btn2);
                            Laya.stage.addChild(this.confirmPanelMoney);
                            this.info = "提前解约需支付违约金" + money;
                            this.confirmPanelMoney.contentTxt.text = this.info;
                            money = 0;
                        }
                    }
                }
                GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                Hash.playMusic(2);
            };
            SinglePlayerInfoView.prototype.surrender = function (nameStr, Btn1, Btn2) {
                Btn1.label = "立即签约";
                Btn1.centerX = 0;
                Btn2.visible = false;
                Btn2.mouseEnabled = false;
                GameConfig.signingNum -= 1;
                SceneLayerManager.sceneLayer.deleteAuthor(nameStr);
                for (var i = 0; i < GameConfig.guding.length; i++) {
                    var obj = GameConfig.guding[i];
                    if (obj["name"] == nameStr) {
                        var id = obj["id"] + "";
                        var index = obj["id"] - 1;
                        GameConfig.authorArr.splice(index, 0, obj);
                        var idIndex = GameConfig.authorIdArr.indexOf(id);
                        GameConfig.authorIdArr.splice(idIndex, 1);
                        GameConfig.authorInfoArr.splice(idIndex, 1);
                        return;
                    }
                }
                GameConfig.cachData["authorArr"] = GameConfig.authorArr;
            };
            SinglePlayerInfoView.prototype.onClose = function (event) {
                event.stopPropagation();
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChildByName("singleMaskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return SinglePlayerInfoView;
        }(ui.player.AuthorDialogUI));
        player.SinglePlayerInfoView = SinglePlayerInfoView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=SinglePlayerInfoView.js.map