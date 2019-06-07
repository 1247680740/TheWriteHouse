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
        var WorkItem = /** @class */ (function (_super) {
            __extends(WorkItem, _super);
            function WorkItem(pagename, author) {
                var _this = _super.call(this) || this;
                _this.authorname.text = author;
                _this.workname.text = pagename;
                return _this;
            }
            WorkItem.prototype.compare = function (property) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    return value1 - value2; // 升序
                };
            };
            WorkItem.prototype.setInfoData = function (obj) {
                this.workname.text = obj['pageName']; //作品名称
                this.authorname.text = obj['authorName']; //作则名称
            };
            return WorkItem;
        }(ui.event.WorksListUI));
        events.WorkItem = WorkItem;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=WorkItem.js.map