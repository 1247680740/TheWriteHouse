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
        var AddTalentView = views.events.AddTalentView;
        var TalentChildView = /** @class */ (function (_super) {
            __extends(TalentChildView, _super);
            function TalentChildView() {
                var _this = _super.call(this) || this;
                _this.centerX = 0;
                _this.y = 175;
                for (var i = 1; i < 11; i++) {
                    _this.getChildByName("coBox" + i).on(Laya.Event.CLICK, _this, _this.setStatus);
                }
                _this.coffinBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                _this.resetBtn.on(Laya.Event.CLICK, _this, _this.resetPointData);
                _this.initData();
                return _this;
            }
            TalentChildView.getInstance = function () {
                if (TalentChildView.instance == null) {
                    TalentChildView.instance = new views.events.TalentChildView();
                }
                return TalentChildView.instance;
            };
            TalentChildView.prototype.closeView = function (event) {
                event.stopPropagation();
                GameConfig.isFistUnlock = true;
                GameConfig.everyLevelArr.splice(0, GameConfig.everyLevelArr.length);
                GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
                var curView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                var telView = curView.getChildByName("talentChildView");
                for (var j = 1; j < 11; j++) {
                    var curBox = telView.getChildByName("coBox" + j);
                    var lbStr = curBox.getChildByName("lb" + j);
                    var img = curBox.getChildByName("img" + j);
                    if (lbStr.visible == true) {
                        var newObj = new Object();
                        var curStr = lbStr.text;
                        var curNum = parseInt(curStr.substr(0, 1));
                        newObj["level"] = j;
                        newObj["point"] = curNum;
                        GameConfig.everyLevelArr.push(newObj);
                    }
                }
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    GameConfig.unlockIDArr.push(everyObj["level"]);
                }
                var hasPointStr = curView.pointTip.text;
                GameConfig.hasTalentPoint = parseInt(hasPointStr.substring(5, hasPointStr.length));
                GameConfig.cachData["everyLevelArr"] = GameConfig.everyLevelArr;
                GameConfig.cachData["hasTalentPoint"] = GameConfig.hasTalentPoint;
                var addtal = views.events.AddTalentView.getInstance();
                if (addtal) {
                    addtal.removeSelf();
                }
                Hash.playMusic(2);
            };
            TalentChildView.prototype.setStatus = function (event) {
                event.stopPropagation();
                var yNum;
                var i;
                var name = event.target.name;
                if (name == "coBox10") {
                    i = parseInt(name.substr(name.length - 2, 2));
                }
                else {
                    i = parseInt(name.substr(name.length - 1, 1));
                }
                /** 获取页面当前拥有的点数 */
                var curView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                var hasPointStr = curView.pointTip.text;
                var curHasNum = parseInt(hasPointStr.substring(5, hasPointStr.length));
                var box = this.getChildByName(name);
                var lbStr = box.getChildByName("lb" + i);
                var curStr = lbStr.text;
                var addNum = parseInt(curStr.substr(0, 1));
                var totalNum = parseInt(curStr.substr(curStr.length - 1, 1));
                /** 获取当前点击对象的数值传递进添加数值页面 */
                this.addTalentView = AddTalentView.getInstance();
                this.addChild(this.addTalentView);
                this.addTalentView.resetTipStr(i, addNum, totalNum, curHasNum);
                if (i < 4) {
                    yNum = box.y + box.height;
                }
                else {
                    yNum = box.y - this.addTalentView.height;
                }
                this.addTalentView.centerX = 0;
                this.addTalentView.y = yNum;
                Hash.playMusic(2);
            };
            /** 初始化状态 */
            TalentChildView.prototype.initData = function () {
                var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                for (var index = 0; index < GameConfig.everyLevelArr.length; index++) {
                    var talObj = GameConfig.everyLevelArr[index];
                    var coBox = this.getChildByName("coBox" + talObj["level"]);
                    var lbStr = coBox.getChildByName("lb" + talObj["level"]);
                    var img = coBox.getChildByName("img" + talObj["level"]);
                    lbStr.visible = true;
                    img.skin = "gameUI/event/talent_on.png";
                    if (talObj["level"] < 8) {
                        lbStr.text = talObj["point"] + "/3";
                    }
                    else {
                        lbStr.text = talObj["point"] + "/1";
                    }
                    if (numArr.indexOf(talObj["level"]) != -1) {
                        numArr.splice(numArr.indexOf(talObj["level"]), 1);
                    }
                }
                for (var j = 0; j < numArr.length; j++) {
                    var element = numArr[j];
                    var coBox = this.getChildByName("coBox" + element);
                    var lbStr = coBox.getChildByName("lb" + element);
                    var img = coBox.getChildByName("img" + element);
                    lbStr.visible = false;
                    img.skin = "gameUI/event/talent_off.png";
                }
                GameConfig.cachData["everyLevelArr"] = GameConfig.everyLevelArr;
                GameConfig.cachData["hasTalentPoint"] = GameConfig.hasTalentPoint;
                GameConfig.cachData["defHasTalentPoint"] = GameConfig.defHasTalentPoint;
            };
            TalentChildView.prototype.resetData = function (i, addNum, totalNum, curHasPoint) {
                var curView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                curView.pointTip.text = "剩余点数：" + curHasPoint;
                var telView = curView.getChildByName("talentChildView");
                var curBox = telView.getChildByName("coBox" + i);
                var lbStr = curBox.getChildByName("lb" + i);
                var img = curBox.getChildByName("img" + i);
                lbStr.text = addNum + "/" + totalNum;
                if (addNum == totalNum) {
                    switch (i) {
                        case 1:
                            this.unLock(2, 4, telView);
                            break;
                        case 2:
                            this.unLock(4, 6, telView);
                            break;
                        case 3:
                            this.unLock(6, 8, telView);
                            break;
                        case 4:
                            var curBox_1 = telView.getChildByName("coBox5");
                            var lbStr_1 = curBox_1.getChildByName("lb5");
                            var curStr = lbStr_1.text;
                            var addNum_1 = parseInt(curStr.substr(0, 1));
                            var totalNum_1 = parseInt(curStr.substr(curStr.length - 1, 1));
                            if (addNum_1 == totalNum_1) {
                                this.unLock(8, 9, telView);
                            }
                            break;
                        case 5:
                            var curBox2 = telView.getChildByName("coBox4");
                            var lbStr2 = curBox2.getChildByName("lb4");
                            var curStr2 = lbStr2.text;
                            var addNum2 = parseInt(curStr2.substr(0, 1));
                            var totalNum2 = parseInt(curStr2.substr(curStr2.length - 1, 1));
                            var curBox3 = telView.getChildByName("coBox6");
                            var lbStr3 = curBox3.getChildByName("lb6");
                            var curStr3 = lbStr3.text;
                            var addNum3 = parseInt(curStr3.substr(0, 1));
                            var totalNum3 = parseInt(curStr3.substr(curStr3.length - 1, 1));
                            if (addNum2 == totalNum2) {
                                this.unLock(8, 9, telView);
                            }
                            if (addNum3 == totalNum3) {
                                this.unLock(9, 10, telView);
                            }
                            break;
                        case 6:
                            var curBox4 = telView.getChildByName("coBox5");
                            var lbStr4 = curBox4.getChildByName("lb5");
                            var curStr4 = lbStr4.text;
                            var addNum4 = parseInt(curStr4.substr(0, 1));
                            var totalNum4 = parseInt(curStr4.substr(curStr4.length - 1, 1));
                            var curBox5 = telView.getChildByName("coBox7");
                            var lbStr5 = curBox5.getChildByName("lb7");
                            var curStr5 = lbStr5.text;
                            var addNum5 = parseInt(curStr5.substr(0, 1));
                            var totalNum5 = parseInt(curStr5.substr(curStr5.length - 1, 1));
                            if (addNum4 == totalNum4) {
                                this.unLock(9, 10, telView);
                            }
                            if (addNum5 == totalNum5) {
                                this.unLock(10, 11, telView);
                            }
                            break;
                        case 7:
                            var curBox6 = telView.getChildByName("coBox6");
                            var lbStr6 = curBox6.getChildByName("lb6");
                            var curStr6 = lbStr6.text;
                            var addNum6 = parseInt(curStr6.substr(0, 1));
                            var totalNum6 = parseInt(curStr6.substr(curStr6.length - 1, 1));
                            if (addNum6 == totalNum6) {
                                this.unLock(10, 11, telView);
                            }
                            break;
                    }
                }
                else {
                    switch (i) {
                        case 1:
                            this.lock(2, 4, telView);
                            break;
                        case 2:
                            this.lock(4, 6, telView);
                            break;
                        case 3:
                            this.lock(6, 8, telView);
                            break;
                        case 4:
                            this.lock(8, 9, telView);
                            break;
                        case 5:
                            this.lock(8, 10, telView);
                            break;
                        case 6:
                            this.lock(9, 11, telView);
                            break;
                        case 7:
                            this.lock(10, 11, telView);
                            break;
                    }
                }
            };
            /** 重置点数 */
            TalentChildView.prototype.resetPointData = function (event) {
                event.stopPropagation();
                var hasNum = 0;
                for (var i = 1; i < 11; i++) {
                    var curBox = this.getChildByName("coBox" + i);
                    var curImg = curBox.getChildByName("img" + i);
                    var curLabel = curBox.getChildByName("lb" + i);
                    if (i == 1) {
                        curLabel.text = "0/3";
                        curImg.skin = "gameUI/event/talent_on.png";
                        curLabel.visible = true;
                    }
                    else {
                        curImg.skin = "gameUI/event/talent_off.png";
                        curLabel.text = "0/3";
                        if (i >= 8) {
                            curLabel.text = "0/1";
                        }
                        curLabel.visible = false;
                    }
                }
                var curView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                curView.pointTip.text = "剩余点数：" + GameConfig.defHasTalentPoint;
                GameConfig.hasTalentPoint = GameConfig.defHasTalentPoint;
                GameConfig.everyLevelArr = [{ "level": 1, "point": 0 }];
                var addtal = views.events.AddTalentView.getInstance();
                if (addtal) {
                    addtal.removeSelf();
                }
                Hash.playMusic(2);
            };
            TalentChildView.prototype.unLock = function (k, p, telView) {
                for (var a = k; a < p; a++) {
                    var curBox = telView.getChildByName("coBox" + a);
                    var lbStr = curBox.getChildByName("lb" + a);
                    var img = curBox.getChildByName("img" + a);
                    img.skin = "gameUI/event/talent_on.png";
                    lbStr.visible = true;
                    GameConfig.unlockIDArr.push(a);
                }
            };
            TalentChildView.prototype.lock = function (k, p, telView) {
                for (var a = k; a < p; a++) {
                    var curBox = telView.getChildByName("coBox" + a);
                    var lbStr = curBox.getChildByName("lb" + a);
                    var img = curBox.getChildByName("img" + a);
                    img.skin = "gameUI/event/talent_off.png";
                    lbStr.visible = false;
                    if (GameConfig.unlockIDArr.indexOf(a) != -1) {
                        GameConfig.unlockIDArr.splice(GameConfig.unlockIDArr.indexOf(a), 1);
                    }
                }
            };
            return TalentChildView;
        }(ui.event.TalentChildViewUI));
        events.TalentChildView = TalentChildView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=TalentChildView.js.map