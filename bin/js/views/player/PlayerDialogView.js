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
        var List = Laya.List;
        var WritingView = views.action.WritingView;
        var PlayerDialogView = /** @class */ (function (_super) {
            __extends(PlayerDialogView, _super);
            function PlayerDialogView() {
                var _this = _super.call(this) || this;
                _this.xx = 0;
                _this.yy = 0;
                _this.info = "";
                _this.viewNum = 0;
                /** 元素类型 */
                _this.elementARR = GameConfig.elemArr;
                /** 题材 */
                _this.subjectARR = GameConfig.subJectArr;
                /** 特长 */
                _this.talentARR = GameConfig.talentArr;
                // this.dragArea = "0,0,256,41";
                _this.authorArr = managers.ResourceManager.infoObjArr;
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.onClose);
                _this.Btn2.mouseEnabled = true;
                _this.Btn1.on(Laya.Event.CLICK, _this, _this.onBtn1Click);
                _this.Btn2.on(Laya.Event.CLICK, _this, _this.onBtn2Click);
                return _this;
            }
            PlayerDialogView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new PlayerDialogView();
                }
                return this.instance;
            };
            /** 创建list列表 */
            PlayerDialogView.prototype.createList = function (arr, i) {
                GameConfig.displayPage += 1;
                this.curArr = this.returnNewArr(arr);
                PlayerDialogView.curNum = parseInt(i);
                PlayerDialogView.list = new List();
                PlayerDialogView.list.name = "view_list";
                PlayerDialogView.list.itemRender = PlayerDialogView;
                PlayerDialogView.list.repeatX = 1;
                PlayerDialogView.list.repeatY = 1;
                PlayerDialogView.list.x = (Laya.stage.width - this.width) / 2;
                PlayerDialogView.list.y = (Laya.stage.height - this.height) / 2 - 20;
                PlayerDialogView.list.hScrollBarSkin = "";
                PlayerDialogView.list.setContentSize(550, 790);
                PlayerDialogView.list.selectEnable = false;
                PlayerDialogView.list.scrollBar.scrollSize = 550;
                PlayerDialogView.list.scrollBar.thumbPercent = 0.25;
                PlayerDialogView.list.scrollBar.tick = 2;
                PlayerDialogView.list.scrollBar.rollRatio = 0.5;
                PlayerDialogView.list.renderHandler = new Handler(this, this.upDateItem);
                Laya.stage.addChild(PlayerDialogView.list);
                PlayerDialogView.list.array = this.curArr;
                this.changeView(PlayerDialogView.curNum);
                PlayerDialogView.list.scrollBar.changeHandler = new Handler(this, this.scrollChange);
                PlayerDialogView.list.scrollBar.on(Laya.Event.CHANGE, this, this.disMouse);
                PlayerDialogView.list.scrollBar.on(Laya.Event.START, this, this.startSlid);
                PlayerDialogView.list.scrollBar.on(Laya.Event.END, this, this.endSlid);
            };
            PlayerDialogView.prototype.returnNewArr = function (arr) {
                var obj1 = arr[0];
                var obj2 = arr[arr.length - 1];
                arr.unshift(obj2);
                arr.push(obj1);
                return arr;
            };
            /** 屏蔽鼠标事件 */
            PlayerDialogView.prototype.disMouse = function () {
                Laya.stage.mouseEnabled = false;
                PlayerDialogView.list.mouseEnabled = false;
            };
            /** 滚动条开始滚动事件 */
            PlayerDialogView.prototype.startSlid = function () {
                GameConfig.slidNum.splice(0, GameConfig.slidNum.length - 1);
            };
            /** 滚动条结束滚动相关事件 */
            PlayerDialogView.prototype.endSlid = function () {
                if (GameConfig.slidNum.length > 1) {
                    var one = GameConfig.slidNum[0];
                    var two = GameConfig.slidNum[GameConfig.slidNum.length - 1];
                    if (one > two) {
                        if (PlayerDialogView.curNum > 0) {
                            PlayerDialogView.curNum -= 1;
                            this.changeViewThree(PlayerDialogView.curNum);
                        }
                    }
                    else if (one < two) {
                        if (PlayerDialogView.curNum < 5) {
                            PlayerDialogView.curNum += 1;
                            if (PlayerDialogView.curNum == 2) {
                                PlayerDialogView.Btn1Str = "";
                                PlayerDialogView.Btn2Str = "";
                                var item1 = PlayerDialogView.list.getCell(1);
                                PlayerDialogView.Btn1Str = item1.Btn1.label;
                                PlayerDialogView.Btn2Str = item1.Btn2.label;
                            }
                            else if (PlayerDialogView.curNum == 5) {
                                var item5 = PlayerDialogView.list.getCell(5);
                                item5.Btn1.label = PlayerDialogView.Btn1Str;
                                item5.Btn2.label = PlayerDialogView.Btn2Str;
                            }
                            this.changeViewThree(PlayerDialogView.curNum);
                        }
                    }
                }
                GameConfig.slidNum.splice(0, GameConfig.slidNum.length - 1);
            };
            /** 滚动条变化事件 */
            PlayerDialogView.prototype.scrollChange = function (value) {
                GameConfig.slidNum.push(value);
            };
            /** Item运动时间一（运动时间长） */
            PlayerDialogView.prototype.changeView = function (num) {
                PlayerDialogView.list.tweenTo(num, 200, Handler.create(this, this.startMouse));
            };
            PlayerDialogView.prototype.changeViewThree = function (num) {
                PlayerDialogView.list.tweenTo(num, 200, Handler.create(this, this.startMouseThree, [num]));
            };
            /** Item运动时间二（运动时间短） */
            PlayerDialogView.prototype.changeViewTwo = function (num) {
                PlayerDialogView.list.tweenTo(num, 0.5, Handler.create(this, this.startMouse));
            };
            /** 启用鼠标事件 */
            PlayerDialogView.prototype.startMouse = function () {
                Laya.stage.mouseEnabled = true;
                PlayerDialogView.list.mouseEnabled = true;
            };
            PlayerDialogView.prototype.startMouseThree = function (num) {
                if (num == 5) {
                    PlayerDialogView.curNum = 1;
                    this.changeViewTwo(PlayerDialogView.curNum);
                }
                else if (num == 0) {
                    PlayerDialogView.curNum = 4;
                    this.changeViewTwo(PlayerDialogView.curNum);
                }
                else {
                    this.startMouse();
                }
            };
            /** 渲染数据 */
            PlayerDialogView.prototype.upDateItem = function (cell, index) {
                cell.name = index + "";
                cell.setInfoData(cell.dataSource);
            };
            PlayerDialogView.prototype.onClose = function (event) {
                event.stopPropagation();
                Laya.stage.removeChildByName("view_list");
                GameConfig.displayPage -= 1;
                player.GetPlayerDialogView.getInstance().resetDate();
            };
            /** 赋值 */
            PlayerDialogView.prototype.setInfoData = function (infoObj) {
                var str;
                for (str in infoObj) {
                    GameConfig.nameStr = infoObj["name"];
                    GameConfig.AuthorID = infoObj["id"] + "";
                    GameConfig.icon = infoObj["icon"];
                    GameConfig.passionMinStr = parseInt(infoObj["passionMin"]) / 100; //激情下限
                    GameConfig.passionMaxStr = parseInt(infoObj["passionMax"]) / 100; //激情上限
                    GameConfig.precisenessMinStr = parseInt(infoObj["precisenessMin"]) / 100; //严谨下限
                    GameConfig.precisenessMaxStr = parseInt(infoObj["precisenessMax"]) / 100; //严谨上限
                    GameConfig.disciplineMinStr = parseInt(infoObj["disciplineMin"]) / 100; //自律下限
                    GameConfig.disciplineMaxStr = parseInt(infoObj["disciplineMax"]) / 100; //自律上限
                    GameConfig.curiousMinStr = parseInt(infoObj["curiousMin"]) / 100; //好奇下限
                    GameConfig.curiousMaxStr = parseInt(infoObj["curiousMax"]) / 100; //好奇上限
                    GameConfig.specialStr = parseInt(infoObj["special"]) + ""; //是否特殊
                    GameConfig.shareStr = infoObj["share"] + "%"; //分红
                    GameConfig.monthlySalaryStr = (infoObj["monthlySalary"] * 12) + ""; //年薪
                    GameConfig.penalSumStr = infoObj["penalSum"] + "倍"; //违约金
                    var subject = infoObj["subject"]; //擅长题材
                    var element = infoObj["element"]; //擅长元素
                    var talent = infoObj["talent"]; //特长
                    GameConfig.subjectStr = this.getType(subject, this.subjectARR); //擅长题材
                    GameConfig.elementStr = this.getType(element, this.elementARR); //擅长元素
                    GameConfig.talentStr = this.getType(talent, this.talentARR); //特长
                }
                if (GameConfig.signingNum > 0) {
                    if (GameConfig.authorIdArr.indexOf(GameConfig.AuthorID) != -1) {
                        this.Btn1.label = "写作";
                        this.Btn2.label = "解约";
                    }
                    else {
                        this.Btn1.label = "立即签约";
                        this.Btn2.label = "下一个";
                    }
                }
                else {
                    this.Btn1.label = "立即签约";
                    this.Btn2.label = "下一个";
                }
                /** 赋值显示 */
                this.nameStr.text = GameConfig.nameStr;
                this.authorIcon.skin = GameConfig.icon;
                this.passionMax.value = GameConfig.passionMaxStr;
                this.passionMin.value = GameConfig.passionMinStr;
                this.precisenessMax.value = GameConfig.precisenessMaxStr;
                this.precisenessMin.value = GameConfig.precisenessMinStr;
                this.disciplineMax.value = GameConfig.disciplineMaxStr;
                this.disciplineMin.value = GameConfig.disciplineMinStr;
                this.curiousMax.value = GameConfig.curiousMaxStr;
                this.curiousMin.value = GameConfig.curiousMinStr;
                this.theme.text = GameConfig.subjectStr;
                this.element.text = GameConfig.elementStr;
                this.salary.text = GameConfig.monthlySalaryStr;
                this.dividedInto.text = GameConfig.shareStr;
                this.damages.text = GameConfig.penalSumStr;
                this.characteristic.text = GameConfig.talentStr;
                this.term.text = infoObj["writing"] + "本";
                // this.getDate();
            };
            /** 判断类型 */
            /** infoArr:数据值，dataArr:类型 */
            PlayerDialogView.prototype.getType = function (infoArr, dataArr) {
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
            PlayerDialogView.prototype.getDate = function () {
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
            PlayerDialogView.prototype.onBtn1Click = function (event) {
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
                            var nameStr_1 = this.nameStr.text;
                            for (var i = 0; i < GameConfig.guding.length; i++) {
                                var obj = GameConfig.guding[i];
                                if (obj["name"] == nameStr_1) {
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
                                    obj["timeNum"] = 0;
                                    obj["yearLeave"] = 7;
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
                            SceneLayerManager.sceneLayer.createBoy(nameStr_1);
                        }
                        //人多力量大
                        var avchidata = managers.ResourceManager.achiveGoldArr;
                        if (GameConfig.authorInfoArr.length == avchidata[2]['aim']) {
                            var achive = new views.events.AchiEvent(2);
                        }
                        GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                        GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                        // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                        break;
                    case "写作":
                        var nameStr = this.nameStr.text;
                        if (GameConfig.writingAuthor.indexOf(nameStr) != -1) {
                            TipLayerManager.tipLayer.showDrawBgTip("该作者正在写作....");
                        }
                        else {
                            Laya.stage.removeChildByName("maskView");
                            for (var i = 0; i < GameConfig.guding.length; i++) {
                                var obj = GameConfig.guding[i];
                                if (obj["name"] == nameStr) {
                                    GameConfig.writingAuthor.push(obj["name"]);
                                    GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                                    // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                                    views.player.GetPlayerDialogView.getInstance().closeView();
                                    Laya.stage.removeChild(PlayerDialogView.list);
                                    this.writingView = new WritingView(obj);
                                    this.writingView.name = "writingView";
                                    SceneLayerManager.sceneLayer.addChild(this.writingView);
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            };
            /** 按钮二的点击事件 */
            PlayerDialogView.prototype.onBtn2Click = function (event) {
                event.stopPropagation();
                switch (this.Btn2.label) {
                    case "下一个":
                        // console.log("PlayerDialogView.curNum：" + PlayerDialogView.curNum);
                        if (PlayerDialogView.curNum < 5) {
                            PlayerDialogView.curNum++;
                            if (PlayerDialogView.curNum == 2) {
                                PlayerDialogView.Btn1Str = "";
                                PlayerDialogView.Btn2Str = "";
                                var item1 = PlayerDialogView.list.getCell(1);
                                PlayerDialogView.Btn1Str = item1.Btn1.label;
                                PlayerDialogView.Btn2Str = item1.Btn2.label;
                            }
                            else if (PlayerDialogView.curNum == 5) {
                                var item5 = PlayerDialogView.list.getCell(5);
                                item5.Btn1.label = PlayerDialogView.Btn1Str;
                                item5.Btn2.label = PlayerDialogView.Btn2Str;
                            }
                            this.changeViewThree(PlayerDialogView.curNum);
                        }
                        else {
                            // console.log(+"PlayerDialogView.curNum：" + PlayerDialogView.curNum);
                        }
                        break;
                    case "解约":
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
                                    var money = obj["penalSum"] * parseInt(this.salary.text);
                                    this.confirmPanelMoney = new views.common.ConfirmPenalSumMoney(money, nameStr, Btn1, Btn2, this.viewNum);
                                    Laya.stage.addChild(this.confirmPanelMoney);
                                    this.info = "提前解约需支付违约金" + money;
                                    this.confirmPanelMoney.contentTxt.text = this.info;
                                    money = 0;
                                }
                            }
                        }
                        GameConfig.cachData["authorInfoArr"] = GameConfig.authorInfoArr;
                        // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                        break;
                }
            };
            PlayerDialogView.prototype.surrender = function (nameStr, Btn1, Btn2) {
                Btn1.label = "立即签约";
                Btn2.label = "下一个";
                GameConfig.signingNum -= 1;
                SceneLayerManager.sceneLayer.deleteAuthor(nameStr);
                for (var i = 0; i < GameConfig.guding.length; i++) {
                    var obj = GameConfig.guding[i];
                    if (obj["name"] == nameStr) {
                        var id = obj["id"] + "";
                        var index = obj["id"] - 1;
                        GameConfig.authorArr.splice(index, 0, obj);
                        // GameConfig.authorArr.push(obj);
                        var idIndex = GameConfig.authorIdArr.indexOf(id);
                        GameConfig.authorIdArr.splice(idIndex, 1);
                        GameConfig.authorInfoArr.slice(idIndex, 1);
                    }
                }
                GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
            };
            return PlayerDialogView;
        }(ui.player.AuthorDialogUI));
        player.PlayerDialogView = PlayerDialogView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerDialogView.js.map