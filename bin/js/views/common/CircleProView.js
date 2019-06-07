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
        var CircleProView = /** @class */ (function (_super) {
            __extends(CircleProView, _super);
            function CircleProView() {
                var _this = _super.call(this) || this;
                _this.endAngle = 0;
                _this.zOrder = 0;
                Laya.timer.loop(WritingConfig.proAddTime, _this, _this.addPro);
                _this.on(Laya.Event.CLICK, _this, _this.changeView);
                return _this;
            }
            CircleProView.prototype.addPro = function () {
                this.endAngle += WritingConfig.proAddNum;
                if (this.endAngle > 360) {
                    this.endAngle = 0;
                    Laya.timer.clearAll(this);
                    this.removeSelf();
                    switch (WritingConfig.proAddNum) {
                        case 0:
                            WritingConfig.proAddNum = 18;
                            WritingConfig.proAddTime = 25;
                            break;
                        case 9:
                            WritingConfig.proAddNum = 9;
                            WritingConfig.proAddTime = 50;
                            break;
                        case 18:
                            WritingConfig.proAddNum = 9;
                            WritingConfig.proAddTime = 50;
                            break;
                    }
                }
                this.cirImg.graphics.drawPie(27, 27, 27, 0, this.endAngle, "#77C9B7");
            };
            CircleProView.prototype.changeView = function () {
                switch (WritingConfig.proAddNum) {
                    case 0:
                        WritingConfig.proAddNum = 0;
                        WritingConfig.proAddTime = 0;
                        break;
                    case 9:
                        WritingConfig.proAddNum = 18;
                        WritingConfig.proAddTime = 25;
                        break;
                    case 18:
                        WritingConfig.proAddNum = 0;
                        WritingConfig.proAddTime = 0;
                        break;
                }
                /** 移除当前页面 */
                Laya.timer.clearAll(this);
                this.removeSelf();
                /** 增加工作时间 */
                var viewName = this.name;
                var spName = viewName.substring(0, viewName.length - 3);
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var curObj = GameConfig.authorInfoArr[n];
                    if (curObj["name"] == spName) {
                        if (curObj["actWork"] - 10 < 0) {
                            curObj["actWork"] = 0;
                        }
                        else {
                            curObj["actWork"] = curObj["actWork"] - 10;
                        }
                        console.log("当前工作时间：" + curObj["actWork"]);
                    }
                }
                views.layers.SpAction.prototype.changeIconView(spName);
            };
            return CircleProView;
        }(ui.common.CircleProViewUI));
        common.CircleProView = CircleProView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=CircleProView.js.map