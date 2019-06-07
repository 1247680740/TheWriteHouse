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
        var AddTalentView = /** @class */ (function (_super) {
            __extends(AddTalentView, _super);
            function AddTalentView() {
                var _this = _super.call(this) || this;
                _this.name = "addtalentview";
                _this.on(Laya.Event.CLICK, _this, _this.judgeName);
                return _this;
            }
            AddTalentView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new AddTalentView();
                }
                return this.instance;
            };
            AddTalentView.prototype.judgeName = function (event) {
                event.stopPropagation();
                var name = event.target.name;
                Hash.playMusic(2);
                switch (name) {
                    case "addTle":
                        this.addTelNum();
                        break;
                    case "delTle":
                        this.delTleNum();
                        break;
                    default:
                        this.removeSelf();
                        break;
                }
            };
            AddTalentView.prototype.addTelNum = function () {
                this.addNum += 1;
                this.curHasPointNum -= 1;
                if (this.addNum == this.totalNum || this.curHasPointNum <= 0) {
                    this.addTle.skin = "gameUI/event/button_plus_off.png";
                    this.addTle.mouseEnabled = false;
                }
                else {
                    this.addTle.skin = "gameUI/event/button_plus.png";
                    this.addTle.mouseEnabled = true;
                }
                this.pointNum.text = this.addNum + "/" + this.totalNum;
                this.delTle.skin = "gameUI/event/button_minus.png";
                this.delTle.mouseEnabled = true;
                views.events.TalentChildView.prototype.resetData(this.curBoxNum, this.addNum, this.totalNum, this.curHasPointNum);
            };
            AddTalentView.prototype.delTleNum = function () {
                this.addNum -= 1;
                this.curHasPointNum += 1;
                if (this.addNum <= 0) {
                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                    this.delTle.mouseEnabled = false;
                }
                else {
                    this.delTle.skin = "gameUI/event/button_minus.png";
                    this.delTle.mouseEnabled = true;
                }
                this.pointNum.text = this.addNum + "/" + this.totalNum;
                this.addTle.skin = "gameUI/event/button_plus.png";
                this.addTle.mouseEnabled = true;
                views.events.TalentChildView.prototype.resetData(this.curBoxNum, this.addNum, this.totalNum, this.curHasPointNum);
            };
            AddTalentView.prototype.resetTipStr = function (i, addNum, totalNum, curHasNum) {
                //判断是否可以加点....
                this.curBoxNum = i;
                this.addNum = addNum;
                this.totalNum = totalNum;
                this.curHasPointNum = curHasNum;
                var newArr = new Array();
                newArr.splice(0, newArr.length);
                this.pointNum.text = this.addNum + "/" + this.totalNum;
                if (GameConfig.everyLevelArr.length > 0) {
                    for (var j = 0; j < GameConfig.everyLevelArr.length; j++) {
                        var everyObj = GameConfig.everyLevelArr[j];
                        newArr.push(everyObj["level"]);
                    }
                }
                if (GameConfig.isFistUnlock) {
                    GameConfig.isFistUnlock = false;
                    if (newArr.indexOf(i) != -1) {
                        this.frilyTip.visible = false;
                        this.addTle.visible = true;
                        this.delTle.visible = true;
                        this.pointNum.visible = true;
                        if (this.curHasPointNum <= 0) {
                            this.addTle.skin = "gameUI/event/button_plus_off.png";
                            this.addTle.mouseEnabled = false;
                            if (this.addNum <= 0) {
                                this.delTle.skin = "gameUI/event/button_minus_off.png";
                                this.delTle.mouseEnabled = false;
                            }
                            else {
                                this.judgeStatus(i);
                            }
                        }
                        else {
                            if (this.addNum == this.totalNum) {
                                this.addTle.skin = "gameUI/event/button_plus_off.png";
                                this.addTle.mouseEnabled = false;
                                this.judgeStatus(i);
                            }
                            else if (this.addNum <= 0) {
                                if (i == 1) {
                                    this.addTle.skin = "gameUI/event/button_plus.png";
                                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                                    this.addTle.mouseEnabled = true;
                                    this.delTle.mouseEnabled = false;
                                }
                                else {
                                    if (this.curHasPointNum < GameConfig.defHasTalentPoint) {
                                        this.addTle.skin = "gameUI/event/button_plus.png";
                                        this.delTle.skin = "gameUI/event/button_minus_off.png";
                                        this.addTle.mouseEnabled = true;
                                        this.delTle.mouseEnabled = false;
                                    }
                                    else {
                                        this.frilyTip.visible = true;
                                        this.addTle.visible = false;
                                        this.delTle.visible = false;
                                        this.addTle.mouseEnabled = false;
                                        this.delTle.mouseEnabled = false;
                                        this.pointNum.visible = false;
                                    }
                                }
                            }
                            else {
                                this.addTle.skin = "gameUI/event/button_plus.png";
                                this.addTle.mouseEnabled = true;
                                this.judgeStatus(i);
                            }
                        }
                    }
                    else {
                        this.frilyTip.visible = true;
                        this.addTle.visible = false;
                        this.delTle.visible = false;
                        this.addTle.mouseEnabled = false;
                        this.delTle.mouseEnabled = false;
                        this.pointNum.visible = false;
                    }
                }
                else {
                    if (GameConfig.unlockIDArr.indexOf(i) != -1) {
                        this.frilyTip.visible = false;
                        this.addTle.visible = true;
                        this.delTle.visible = true;
                        this.pointNum.visible = true;
                        if (this.curHasPointNum <= 0) {
                            this.addTle.skin = "gameUI/event/button_plus_off.png";
                            this.addTle.mouseEnabled = false;
                            if (this.addNum <= 0) {
                                this.delTle.skin = "gameUI/event/button_minus_off.png";
                                this.delTle.mouseEnabled = false;
                            }
                            else {
                                this.judgeStatus(i);
                            }
                        }
                        else {
                            if (this.addNum == this.totalNum) {
                                this.addTle.skin = "gameUI/event/button_plus_off.png";
                                this.addTle.mouseEnabled = false;
                                this.judgeStatus(i);
                            }
                            else if (this.addNum <= 0) {
                                if (i == 1) {
                                    this.addTle.skin = "gameUI/event/button_plus.png";
                                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                                    this.addTle.mouseEnabled = true;
                                    this.delTle.mouseEnabled = false;
                                }
                                else {
                                    if (this.curHasPointNum < GameConfig.defHasTalentPoint) {
                                        this.addTle.skin = "gameUI/event/button_plus.png";
                                        this.delTle.skin = "gameUI/event/button_minus_off.png";
                                        this.addTle.mouseEnabled = true;
                                        this.delTle.mouseEnabled = false;
                                    }
                                    else {
                                        this.frilyTip.visible = true;
                                        this.addTle.visible = false;
                                        this.delTle.visible = false;
                                        this.addTle.mouseEnabled = false;
                                        this.delTle.mouseEnabled = false;
                                        this.pointNum.visible = false;
                                    }
                                }
                            }
                            else {
                                this.addTle.skin = "gameUI/event/button_plus.png";
                                this.addTle.mouseEnabled = true;
                                this.judgeStatus(i);
                            }
                        }
                    }
                    else {
                        this.frilyTip.visible = true;
                        this.addTle.visible = false;
                        this.delTle.visible = false;
                        this.addTle.mouseEnabled = false;
                        this.delTle.mouseEnabled = false;
                        this.pointNum.visible = false;
                    }
                }
                /** 获取加点提示信息 */
                for (var m = 0; m < ResourceManager.achiveDataArr.length; m++) {
                    var achveObj = ResourceManager.achiveDataArr[m];
                    if (achveObj["id"] == i) {
                        this.tipText.text = achveObj["string"];
                        return;
                    }
                }
            };
            AddTalentView.prototype.judgeStatus = function (i) {
                var curView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                var telView = curView.getChildByName("talentChildView");
                switch (i) {
                    case 1:
                        this.getStatus(2, 4, telView);
                        break;
                    case 2:
                        this.getStatus(4, 6, telView);
                        break;
                    case 3:
                        this.getStatus(6, 8, telView);
                        break;
                    case 4:
                        this.getStatus(8, 9, telView);
                        break;
                    case 5:
                        this.getStatus(8, 10, telView);
                        break;
                    case 6:
                        this.getStatus(9, 11, telView);
                        break;
                    case 7:
                        this.getStatus(10, 11, telView);
                        break;
                }
            };
            AddTalentView.prototype.getStatus = function (startNum, endNum, telView) {
                for (var d = startNum; d < endNum; d++) {
                    var curBox = telView.getChildByName("coBox" + d);
                    var lbStr = curBox.getChildByName("lb" + d);
                    var img = curBox.getChildByName("img" + d);
                    var btoomStr = lbStr.text;
                    var addNum = parseInt(btoomStr.substr(0, 1));
                    if (addNum > 0) {
                        this.delTle.skin = "gameUI/event/button_minus_off.png";
                        this.delTle.mouseEnabled = false;
                        return;
                    }
                    else {
                        this.delTle.skin = "gameUI/event/button_minus.png";
                        this.delTle.mouseEnabled = true;
                    }
                }
            };
            return AddTalentView;
        }(ui.event.TipAddUI));
        events.AddTalentView = AddTalentView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AddTalentView.js.map