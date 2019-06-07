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
        var WritingView = views.action.WritingView;
        var WriteTriggerView = /** @class */ (function (_super) {
            __extends(WriteTriggerView, _super);
            function WriteTriggerView(infoObj) {
                var _this = _super.call(this) || this;
                /** 写作界面 */
                _this.zOrder = 0;
                _this.on(Laya.Event.CLICK, _this, _this.showWritingView);
                return _this;
            }
            WriteTriggerView.prototype.showWritingView = function () {
                var viewName = this.name;
                var spName = viewName.substring(0, viewName.length - 3);
                for (var j = 0; j < GameConfig.authorInfoArr.length; j++) {
                    var auObj = GameConfig.authorInfoArr[j];
                    if (auObj["name"] == spName) {
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = false;
                        }
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        GameConfig.writingAuthor.push(auObj["name"]);
                        GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                        this.writingView = new WritingView(auObj);
                        this.writingView.name = "writingView";
                        SceneLayerManager.sceneLayer.addChild(this.writingView);
                    }
                }
            };
            return WriteTriggerView;
        }(ui.common.WritingTriggerUI));
        common.WriteTriggerView = WriteTriggerView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=WriteTriggerView.js.map