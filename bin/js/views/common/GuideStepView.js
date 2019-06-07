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
    var common;
    (function (common) {
        var HitArea = Laya.HitArea;
        var HTMLDivElement = laya.html.dom.HTMLDivElement;
        var Sprite = Laya.Sprite;
        var GuideStep = /** @class */ (function (_super) {
            __extends(GuideStep, _super);
            function GuideStep(step, guideSteps) {
                var _this = _super.call(this) || this;
                _this.guideStepArr = ResourceManager.guideArr;
                _this.guideStep = -1;
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = Laya.stage.height - (_this.height + 20);
                _this.guideSteps = new Array();
                _this.guideSteps = guideSteps;
                _this.curStatus = step;
                _this.initGuide(step);
                return _this;
            }
            GuideStep.prototype.initGuide = function (step) {
                // 引导所在容器
                this.guideContainer = new Sprite();
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.5;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"); // - this.height
                this.guideContainer.addChild(maskArea);
                this.guideContainer.on(Laya.Event.MOUSE_DOWN, this, this.nextStep);
                this.hitAreaOne = new HitArea();
                var height = Laya.stage.height - this.height;
                this.hitAreaOne.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
                this.nextStep(step);
            };
            GuideStep.prototype.nextStep = function (step) {
                if (this.guideStep == this.guideSteps.length - 1) {
                    this.guideSteps.splice(0, this.guideSteps.length);
                    Laya.stage.removeChild(this.guideContainer);
                    Laya.stage.removeChild(this);
                    if (this.curStatus == 1) {
                        GameConfig.displayPage -= 1;
                        if (Laya.stage.getChildByName("div")) {
                            Laya.stage.removeChildByName("div");
                        }
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                        GameConfig.cachData["finishFirstStep"] = true;
                    }
                    else if (this.curStatus == 2) {
                        if (GameConfig.year <= 2001) {
                            var payObjArr = [{ "selNum": 40, "money": 0 }, { "selNum": 60, "money": 30000 }, { "selNum": 80, "money": 60000 }];
                            var openJobView = new views.common.OpenJobSelView(payObjArr);
                            openJobView.name = "openJobView";
                            SceneLayerManager.sceneLayer.addChild(openJobView);
                        }
                        else {
                            var payObjArr = [{ "selNum": 40, "money": 15000 }, { "selNum": 60, "money": 30000 }, { "selNum": 80, "money": 60000 }];
                            var openJobView = new views.common.OpenJobSelView(payObjArr);
                            openJobView.name = "openJobView";
                            SceneLayerManager.sceneLayer.addChild(openJobView);
                        }
                    }
                }
                else {
                    GameConfig.cachData["finishFirstStep"] = false;
                    var colorArr = new Array();
                    var subArr = new Array();
                    var posArr = [0];
                    var testSubArr = new Array();
                    var testPosArr = [];
                    this.guideStep += 1;
                    var stepObj = this.guideSteps[this.guideStep];
                    var str = stepObj["string"];
                    var arr = void 0;
                    var div = new HTMLDivElement();
                    var html = "";
                    var colorID = 0;
                    var reg = /#/g;
                    var match = void 0;
                    while ((match = reg.exec(str)) !== null) {
                        posArr.push(match.index);
                        testPosArr.push(match.index);
                        var colorStr = str.substr(match.index, 7);
                        colorArr.push(colorStr);
                        arr = str.split(colorStr);
                        var testStr = "";
                        for (var i = 0; i < arr.length; i++) {
                            var curStr = arr[i];
                            testStr = testStr + curStr;
                        }
                        str = testStr;
                    }
                    if (posArr.length > 1) {
                        for (var j = 0; j < posArr.length; j++) {
                            var pos = posArr[j];
                            if (j < posArr.length - 1) {
                                var pos2 = posArr[j + 1];
                                var len = pos2 - pos;
                                var sub = str.substr(pos, len);
                                subArr.push(sub);
                            }
                            else {
                                var len = str.length - pos;
                                var sub = str.substr(pos, len);
                                subArr.push(sub);
                            }
                        }
                        for (var j = 0; j < testPosArr.length; j++) {
                            var pos = testPosArr[j];
                            if (j < testPosArr.length - 1) {
                                var pos2 = testPosArr[j + 1];
                                var len = pos2 - pos;
                                var sub = str.substr(pos, len);
                                testSubArr.push(sub);
                            }
                            else {
                                var len = str.length - pos;
                                var sub = str.substr(pos, len);
                                testSubArr.push(sub);
                            }
                        }
                        for (var n = 0; n < subArr.length; n++) {
                            var subStr = subArr[n];
                            if (testSubArr.indexOf(subStr) != -1) {
                                html = html + "<span style='font-weight:bold;font:24px SimHei;color:" + colorArr[colorID] + "'>" + subStr + "</span>";
                                colorID += 1;
                            }
                            else {
                                html = html + "<span style='font-weight:bold;font:24px SimHei'>" + subStr + "</span>";
                            }
                        }
                        div.style.wordWrap = true;
                        div.style.width = 413;
                        div.style.height = 186;
                        div.style.align = "left";
                        this.guideStepLabel.text = "";
                        div.innerHTML = html;
                        div.name = "div";
                        Laya.stage.addChild(div);
                        div.pos(152, (Laya.stage.height - this.height) + 50);
                    }
                    else {
                        Laya.stage.removeChildByName("div");
                        this.guideStepLabel.color = "#000000";
                        this.guideStepLabel.text = str;
                    }
                    this.guideName.text = stepObj["name"];
                }
            };
            return GuideStep;
        }(ui.common.GuideStepUI));
        common.GuideStep = GuideStep;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=GuideStepView.js.map