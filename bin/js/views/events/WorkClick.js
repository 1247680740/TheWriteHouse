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
        var WorkClick = /** @class */ (function (_super) {
            __extends(WorkClick, _super);
            function WorkClick(_subStr, _eleStr, _platStr, _totalCollect, _totalSub, _totalIncom) {
                var _this = _super.call(this) || this;
                _this.subname.text = _subStr;
                _this.elename.text = _eleStr;
                _this.platname.text = _platStr;
                _this.totalsubname.text = _totalSub.toString();
                _this.incomename.text = _totalIncom.toString();
                _this.collectname.text = _totalCollect.toString();
                return _this;
            }
            return WorkClick;
        }(ui.event.WorksClickUI));
        events.WorkClick = WorkClick;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=WorkClick.js.map