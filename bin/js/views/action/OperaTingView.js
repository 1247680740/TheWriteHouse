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
        var OperaTingView = /** @class */ (function (_super) {
            __extends(OperaTingView, _super);
            function OperaTingView(auObj) {
                var _this = _super.call(this) || this;
                _this.incomeArr = ResourceManager.incomeArr;
                _this.zOrder = 2;
                _this.setValue(auObj);
                _this.startWritingBtn.on(Laya.Event.CLICK, _this, _this.startOpering);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backView);
                return _this;
            }
            OperaTingView.prototype.setValue = function (auObj) {
                this.tipStr.visible = false;
                this.Iam.visible = false;
                this.authorIcon.skin = auObj["icon"];
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
                this.collectStr.text = "收藏：" + auObj["totalCollect"];
                this.subStr.text = "订阅：" + auObj["totalSubs"];
                this.incomeStr.text = "收入" + auObj["totalIncom"];
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
                this.startWritingBtn.label = "作品运营（" + auObj["operaNum"] + "）";
                this.removeLines();
                this.sp1 = this.createSpg(this.sp1, "spg1");
                this.sp2 = this.createSpg(this.sp2, "spg2");
                this.sp3 = this.createSpg(this.sp3, "spg3");
                this.sp1.graphics.drawLines(7, -20, auObj["everyDayCollectPosArr"], "#FF5F60", 3);
                this.sp2.graphics.drawLines(7, -50, auObj["everyDaySubsPosArr"], "#EEEE00", 3);
                this.sp3.graphics.drawLines(7, -50, auObj["everyDayIncomePosArr"], "#7EC0EE", 3);
            };
            OperaTingView.prototype.removeLines = function () {
                this.bootomBg.removeChildByName("spg1");
                this.bootomBg.removeChildByName("spg2");
                this.bootomBg.removeChildByName("spg3");
            };
            OperaTingView.prototype.createSpg = function (sp, nameStr) {
                this.removeChildByName(nameStr);
                sp = new Sprite();
                sp.name = nameStr;
                this.bootomBg.addChild(sp);
                return sp;
            };
            OperaTingView.prototype.startOpering = function () {
                var curObj = this.getAuthorObj();
                if (curObj["operaNum"] <= 0) {
                    TipLayerManager.tipLayer.showDrawBgTip("当前运营点数不足");
                }
                else {
                    SceneLayerManager.sceneLayer.removeChild(this);
                    var operaSelectUI = new views.action.OperaSelectItemView(curObj);
                    SceneLayerManager.sceneLayer.addChild(operaSelectUI);
                }
            };
            OperaTingView.prototype.getAuthorObj = function () {
                var nameStr = this.name.substring(0, this.name.length - 3);
                ;
                for (var j = 0; j < GameConfig.authorInfoArr.length; j++) {
                    var auObj = GameConfig.authorInfoArr[j];
                    if (auObj["name"] == nameStr) {
                        return auObj;
                    }
                }
            };
            OperaTingView.prototype.backView = function () {
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            return OperaTingView;
        }(ui.action.OperaTingUI));
        action.OperaTingView = OperaTingView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=OperaTingView.js.map