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
        var StartWritingDialogView = /** @class */ (function (_super) {
            __extends(StartWritingDialogView, _super);
            function StartWritingDialogView(infoObj) {
                var _this = _super.call(this) || this;
                _this.eleNum = null;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2); //200, 300
                _this.mouseThrough = false;
                _this.addMask();
                _this.setValue(infoObj);
                _this.startBtn.on(Laya.Event.CLICK, _this, _this.startWriting, [infoObj]);
                return _this;
            }
            /** 数值初始化 */
            StartWritingDialogView.prototype.setValue = function (infoObj) {
                this.authorIcon.skin = infoObj["icon"];
                this.authorName.text = infoObj["name"];
                this.articalName.text = infoObj["pageName"];
                this.pasInit.value = infoObj["passionMin"] / 100; //文笔
                this.pasReset.value = infoObj["passionMin"] / 100;
                this.preInit.value = infoObj["precisenessMin"] / 100; //构思
                this.preReset.value = infoObj["precisenessMin"] / 100;
                this.curInit.value = infoObj["curiousMin"] / 100; //脑洞
                this.curReset.value = infoObj["curiousMin"] / 100;
                this.disInit.value = infoObj["disciplineMin"] / 100; //阅历
                this.disReset.value = infoObj["disciplineMin"] / 100;
                this.initPas = infoObj["passionMin"];
                this.initPre = infoObj["precisenessMin"];
                this.initCur = infoObj["curiousMin"];
                this.initDis = infoObj["disciplineMin"];
                this.pasVue = this.pasInit.value;
                this.preVue = this.preInit.value;
                this.curVue = this.curInit.value;
                this.disVue = this.disInit.value;
                this.peoPro.value = 0;
                this.stoPro.value = 0;
                this.innPro.value = 0;
                this.depPro.value = 0;
                this.pasStr.text = this.initPas + "/100";
                this.preStr.text = this.initPre + "/100";
                this.curStr.text = this.initCur + "/100";
                this.disStr.text = this.initDis + "/100";
                this.peoStr.text = "0/100";
                this.stoStr.text = "0/100";
                this.innStr.text = "0/100";
                this.depStr.text = "0/100";
                this.converTimes = 1;
                this.converMul = 1;
                this.startBtn.visible = false;
                this.startBtn.mouseEnabled = false;
                this.tipStr.visible = true;
                this.tipStr.text = "大纲编辑中";
                this.changeData();
            };
            /** 数值运算（保留两位小数） */
            StartWritingDialogView.prototype.countNum = function (num) {
                var str = parseFloat(num + "").toFixed(3);
                var str1 = str.substring(0, str.toString().length - 1);
                var value = parseFloat(str1);
                return value;
            };
            /** 进行文笔运动 */
            StartWritingDialogView.prototype.changeData = function () {
                // 文笔 - 人设   文笔 - 故事
                var peoVue = this.countNum(this.peoPro.value);
                var stoVue = this.countNum(this.stoPro.value);
                var pasPeo = Math.floor(this.initPas * (Hash.getRandomNum(50, 80) / 100) * this.converMul) + parseInt((peoVue * 200) + "");
                var pasSto = Math.floor(this.initPas * (Hash.getRandomNum(10, 30) / 100) * this.converMul) + parseInt((stoVue * 200) + "");
                this.proBarTween(this.pasReset, this.pasVue);
                Laya.Tween.to(this.peoPro, { value: pasPeo / 200 }, 3000, null);
                Laya.Tween.to(this.stoPro, { value: pasSto / 200 }, 3000, null, Handler.create(this, this.nextPre, [pasPeo, pasSto]));
            };
            /** 进行构思运动 */
            StartWritingDialogView.prototype.nextPre = function (pasPeo, pasSto) {
                this.peoStr.text = pasPeo + "/200";
                this.stoStr.text = pasSto + "/200";
                // 构思 - 人设   构思 - 故事   构思 - 创新   构思 - 深度
                var peoVue = this.countNum(this.peoPro.value);
                var stoVue = this.countNum(this.stoPro.value);
                var innVue = this.countNum(this.innPro.value);
                var depVue = this.countNum(this.depPro.value);
                var prePeo = Math.floor(this.initPre * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((peoVue * 200) + "");
                var preSto = Math.floor(this.initPre * (Hash.getRandomNum(20, 40) / 100) * this.converMul) + parseInt((stoVue * 200) + "");
                var preInn = Math.floor(this.initPre * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((innVue * 200) + "");
                var preDep = Math.floor(this.initPre * (Hash.getRandomNum(10, 30) / 100) * this.converMul) + parseInt((depVue * 200) + "");
                this.proBarTween(this.preReset, this.preVue);
                Laya.Tween.to(this.peoPro, { value: prePeo / 200 }, 3000, null);
                Laya.Tween.to(this.stoPro, { value: preSto / 200 }, 3000, null);
                Laya.Tween.to(this.innPro, { value: preInn / 200 }, 3000, null);
                Laya.Tween.to(this.depPro, { value: preDep / 200 }, 3000, null, Handler.create(this, this.nextCur, [prePeo, preSto, preInn, preDep]));
            };
            /** 进行脑洞运动判断 */
            StartWritingDialogView.prototype.nextCur = function (prePeo, preSto, preInn, preDep) {
                this.peoStr.text = prePeo + "/200";
                this.stoStr.text = preSto + "/200";
                this.innStr.text = preInn + "/200";
                this.depStr.text = preDep + "/200";
                // 脑洞 - 故事   脑洞 - 创新
                var stoVue = this.countNum(this.stoPro.value);
                var innVue = this.countNum(this.innPro.value);
                var curSto = Math.floor(this.initCur * (Hash.getRandomNum(20, 40) / 100) * this.converMul) + parseInt((stoVue * 200) + "");
                var curInn = Math.floor(this.initCur * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((innVue * 200) + "");
                this.proBarTween(this.curReset, this.curVue);
                Laya.Tween.to(this.stoPro, { value: curSto / 200 }, 3000, null);
                Laya.Tween.to(this.innPro, { value: curInn / 200 }, 3000, null, Handler.create(this, this.nextDis, [curSto, curInn]));
            };
            /** 进行阅历运动判断 */
            StartWritingDialogView.prototype.nextDis = function (curSto, curInn) {
                this.stoStr.text = curSto + "/200";
                this.innStr.text = curInn + "/200";
                // 阅历 - 故事   阅历 - 深度
                var stoVue = this.countNum(this.stoPro.value);
                var depVue = this.countNum(this.depPro.value);
                var disSto = Math.floor((this.initPre * 0.2 * this.converMul)) + parseInt((stoVue * 200) + "");
                var disDep = Math.floor((this.initPre * 0.8 * this.converMul)) + parseInt((depVue * 200) + "");
                this.proBarTween(this.disReset, this.disVue);
                Laya.Tween.to(this.stoPro, { value: disSto / 200 }, 3000, null);
                Laya.Tween.to(this.depPro, { value: disDep / 200 }, 3000, null, Handler.create(this, this.closeAction));
            };
            /** 运动完毕,判断是否进入下一阶段 */
            StartWritingDialogView.prototype.closeAction = function () {
                this.converTimes += 1;
                switch (this.converTimes) {
                    case 2:
                        this.tipStr.text = "初稿编辑中";
                        this.converMul = 0.5;
                        this.changeData();
                        break;
                    case 3:
                        var rateOne = (Hash.countRate(0.5) == 1 ? true : false);
                        if (rateOne) {
                            this.tipStr.text = "等一下....作者突然想到一个绝妙的主意";
                            this.converMul = 0.25;
                            this.changeData();
                        }
                        else {
                            this.changeBootom();
                        }
                        break;
                    case 4:
                        var rateTwo = (Hash.countRate(0.1) == 1 ? true : false);
                        if (rateTwo) {
                            this.tipStr.text = "精益求精....作者觉得文章还有提升空间";
                            this.converMul = 0.125;
                            this.changeData();
                        }
                        else {
                            this.changeBootom();
                        }
                        break;
                    case 5:
                        this.changeBootom();
                        break;
                }
            };
            StartWritingDialogView.prototype.changeBootom = function () {
                this.tipStr.visible = false;
                this.startBtn.visible = true;
                this.startBtn.mouseEnabled = true;
            };
            /** 顶部进度条动画 */
            StartWritingDialogView.prototype.proBarTween = function (bar, num) {
                Laya.Tween.to(bar, { value: 0 }, 3000, null, Handler.create(this, this.ComTween, [bar, num]));
            };
            StartWritingDialogView.prototype.ComTween = function (bar, num) {
                bar.value = num;
            };
            StartWritingDialogView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "StartWritingDialogViewConTain";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
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
            StartWritingDialogView.prototype.startWriting = function (infoObj) {
                /** 计算需要写作的天数 */
                var disciplineMin = infoObj["disciplineMin"];
                var rateNum = this.getWritingRateNum();
                var num = 30 - disciplineMin * 0.1 - disciplineMin * 0.2 * rateNum;
                var day = Math.floor(num);
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var obj = GameConfig.authorInfoArr[i];
                    if (infoObj["name"] == obj["name"]) {
                        obj["curStatus"] = 2;
                        obj["peoplePro"] = this.peoPro.value * 200; //人设
                        obj["storyPro"] = this.stoPro.value * 200; //故事
                        obj["innovatePro"] = this.innPro.value * 200; //创新
                        obj["depthPro"] = this.depPro.value * 200; //深度
                        obj["startWritingDay"] = day;
                        obj["startWritingTime"] = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                        GameConfig.startWritingTestObjArr.unshift(obj);
                        StartWritingDialogView.viewObj["view"] = this;
                        GameConfig.cachData["StartWritingObjArr"] = GameConfig.startWritingTestObjArr;
                    }
                }
                this.closeView();
            };
            StartWritingDialogView.prototype.getWritingRateNum = function () {
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(7) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum = everyObj["point"];
                        if (everyObj["level"] == 7) {
                            if (curNum == 1) {
                                return 0.9;
                            }
                            else if (curNum == 2) {
                                return 0.8;
                            }
                            else if (curNum == 3) {
                                return 0.7;
                            }
                            else {
                                return 1;
                            }
                        }
                    }
                }
                else {
                    return 1;
                }
            };
            /** 多线程操作 耗内存、CPU(待优化) */
            StartWritingDialogView.prototype.openNewViewTwo = function (obj) {
                var startDay = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                var diffDays = Hash.dateDifference(obj["startWritingTime"], startDay);
                var rateStr = (diffDays / obj["startWritingDay"]).toFixed(2);
                var outLine = parseFloat(rateStr);
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (obj["name"] == authorObj["name"]) {
                        authorObj["outLine"] = outLine;
                        obj["outLine"] = outLine;
                    }
                }
                if (diffDays >= obj["startWritingDay"]) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    for (var i = 0; i < GameConfig.startWritingTestObjArr.length; i++) {
                        var startObject = GameConfig.startWritingTestObjArr[i];
                        if (startObject["name"] == obj["name"]) {
                            GameConfig.startWritingTestObjArr.splice(i, 1);
                            i--;
                        }
                    }
                    GameConfig.cachData["StartWritingObjArr"] = GameConfig.startWritingTestObjArr;
                    this.releaseView = new views.action.ReleaseView(obj);
                    this.releaseView.name = "releaseView";
                    SceneLayerManager.sceneLayer.addChild(this.releaseView);
                }
                else {
                    return;
                }
            };
            StartWritingDialogView.prototype.closeView = function () {
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChild(this);
                SceneLayerManager.sceneLayer.removeChildByName("StartWritingDialogViewConTain");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            StartWritingDialogView.viewObj = new Object;
            return StartWritingDialogView;
        }(ui.action.StartWritingUI));
        action.StartWritingDialogView = StartWritingDialogView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=StartWritingDialogView.js.map