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
        var AttributeView = /** @class */ (function (_super) {
            __extends(AttributeView, _super);
            function AttributeView(infoObj) {
                var _this = _super.call(this) || this;
                /** 写作倒计时 */
                _this.timeNum = 30;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.init(infoObj);
                _this.startWritingBtn.on(Laya.Event.CLICK, _this, _this.startAtri, [infoObj]);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backView, [infoObj]);
                return _this;
            }
            AttributeView.prototype.init = function (auObj) {
                this.lineBox.visible = false;
                this.tipStr.visible = true;
                this.Iam.visible = true;
                this.startWritingBtn.label = "属性优化";
                this.authorIcon.skin = auObj["icon"];
                this.Iam.skin = auObj["icon"];
                this.authorName.text = auObj["name"];
                this.articalName.text = auObj["pageName"];
                if (auObj["articalTip"].length > 9) {
                    this.ellipStr.visible = true;
                }
                else {
                    this.ellipStr.visible = false;
                }
                this.articalTip.text = auObj["articalTip"];
                var eleStr = auObj["eleStr"];
                eleStr = eleStr.replace(/,/g, "、");
                this.labelTip.text = "标签：" + eleStr;
                if (this.labelTip.text.length > 9) {
                    this.ellipStrTwo.visible = true;
                }
                else {
                    this.ellipStrTwo.visible = false;
                }
                this.peoMax.value = auObj["peopleProMax"] / 100;
                this.stoMax.value = auObj["storyProMax"] / 100;
                this.newMax.value = auObj["innovateProMax"] / 100;
                this.depMax.value = auObj["depthProMax"] / 100;
                this.peoMin.value = auObj["peoplePro"] / 100;
                this.stoMin.value = auObj["storyPro"] / 100;
                this.newMin.value = auObj["innovatePro"] / 100;
                this.depMin.value = auObj["depthPro"] / 100;
                this.peoStr.text = auObj["peoplePro"] + "/100";
                this.stoStr.text = auObj["storyPro"] + "/100";
                this.newStr.text = auObj["innovatePro"] + "/100";
                this.depStr.text = auObj["depthPro"] + "/100";
            };
            AttributeView.prototype.startAtri = function (infoObj) {
                if (this.startWritingBtn.label == "优化完成") {
                    this.backView(infoObj);
                }
                else if (this.startWritingBtn.label == "属性优化") {
                    this.startWritingBtn.label = "00:30";
                    Laya.timer.loop(1000, this, this.timeBack, [infoObj]);
                    Laya.timer.loop(2000, this, this.addPro, [infoObj]);
                }
                else {
                    return;
                }
            };
            AttributeView.prototype.timeBack = function (infoObj) {
                this.timeNum -= 1;
                if (this.timeNum < 0) {
                    Laya.timer.clearAll(this);
                    this.backBtn.mouseEnabled = true;
                    this.startWritingBtn.mouseEnabled = true;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var BakcObj = GameConfig.authorInfoArr[i];
                        if (BakcObj["name"] == infoObj["name"]) {
                            BakcObj["peoplePro"] = parseInt(this.peoMin.value * 100 + "");
                            BakcObj["storyPro"] = parseInt(this.stoMin.value * 100 + "");
                            BakcObj["innovatePro"] = parseInt(this.newMin.value * 100 + "");
                            BakcObj["depthPro"] = parseInt(this.depMin.value * 100 + "");
                            BakcObj["operaNum"] = BakcObj["operaNum"] - 1;
                            this.startWritingBtn.visible = false;
                            TipLayerManager.tipLayer.showDrawBgTip("优化已完成");
                        }
                    }
                    // this.startWritingBtn.label = "优化完成";
                }
                else {
                    this.backBtn.mouseEnabled = false;
                    this.startWritingBtn.mouseEnabled = false;
                    if (this.timeNum < 10) {
                        var str = "00:0" + this.timeNum;
                        this.startWritingBtn.label = str;
                    }
                    else {
                        var str = "00:" + this.timeNum;
                        this.startWritingBtn.label = str;
                    }
                }
            };
            AttributeView.prototype.addPro = function (infoObj) {
                var totalNum = infoObj["passionMin"] + infoObj["precisenessMin"] + infoObj["disciplineMin"] + infoObj["curiousMin"]; //文笔  构思  阅历  脑洞
                var hashNum = Hash.getRandomNum(10, 20) / 100;
                var addNum = Math.round(totalNum / 10 * hashNum);
                var weiArr = new Array();
                weiArr.splice(0, weiArr.length);
                var pasObj = { "name": "passionMin", "weight": infoObj["passionMin"] };
                var preObj = { "name": "precisenessMin", "weight": infoObj["precisenessMin"] };
                var disObj = { "name": "disciplineMin", "weight": infoObj["disciplineMin"] };
                var curObj = { "name": "curiousMin", "weight": infoObj["curiousMin"] };
                weiArr.push(pasObj);
                weiArr.push(preObj);
                weiArr.push(disObj);
                weiArr.push(curObj);
                var bigObj = Hash.weight_rand(weiArr);
                var index = Math.floor((Math.random() * 4));
                switch (bigObj["name"]) {
                    case "passionMin":
                        var peoNum = this.peoMin.value + addNum / 100;
                        this.tipStr.text = WritingConfig.peoLangue[index];
                        Laya.Tween.to(this.peoMin, { value: peoNum }, 1000, null, Handler.create(this, this.changePeoVue, [peoNum, addNum]));
                        break;
                    case "precisenessMin":
                        var stoNum = this.stoMin.value + addNum / 100;
                        this.tipStr.text = WritingConfig.stoLangue[index];
                        Laya.Tween.to(this.stoMin, { value: stoNum }, 1000, null, Handler.create(this, this.changeStoVue, [stoNum, addNum]));
                        break;
                    case "disciplineMin":
                        var depNum = this.depMin.value + addNum / 100;
                        this.tipStr.text = WritingConfig.depLangue[index];
                        Laya.Tween.to(this.depMin, { value: depNum }, 1000, null, Handler.create(this, this.changeDepVue, [depNum, addNum]));
                        break;
                    case "curiousMin":
                        var newNum = this.newMin.value + addNum / 100;
                        this.tipStr.text = WritingConfig.newLangue[index];
                        Laya.Tween.to(this.newMin, { value: newNum }, 1000, null, Handler.create(this, this.changeNewVue, [newNum, addNum]));
                        break;
                }
            };
            AttributeView.prototype.changePeoVue = function (peoNum, addNum) {
                this.peoStr.text = parseInt(peoNum * 100 + "") + "/100";
                this.tipStr.text = "+人设:" + addNum;
            };
            AttributeView.prototype.changeStoVue = function (stoNum, addNum) {
                this.stoStr.text = parseInt(stoNum * 100 + "") + "/100";
                this.tipStr.text = "+故事:" + addNum;
            };
            AttributeView.prototype.changeDepVue = function (depNum, addNum) {
                this.depStr.text = parseInt(depNum * 100 + "") + "/100";
                this.tipStr.text = "+深度:" + addNum;
            };
            AttributeView.prototype.changeNewVue = function (newNum, addNum) {
                this.newStr.text = parseInt(newNum * 100 + "") + "/100";
                this.tipStr.text = "+新意:" + addNum;
            };
            AttributeView.prototype.backView = function (infoObj) {
                this.removeSelf();
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    if (auObj["name"] == infoObj["name"]) {
                        this.operaTingView = new views.action.OperaTingView(auObj);
                        this.operaTingView.name = auObj["name"] + "ope";
                        SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                    }
                }
            };
            return AttributeView;
        }(ui.action.OperaTingUI));
        action.AttributeView = AttributeView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=AttributeView.js.map