var managers;
(function (managers) {
    var UILayerManager = /** @class */ (function () {
        function UILayerManager(interCls) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("UIManger is singleton, not allow to use constructor!");
            if (!UILayerManager.uiLayer)
                UILayerManager.uiLayer = new views.layers.UILayer();
        }
        UILayerManager.getInstance = function () {
            if (!UILayerManager.instance)
                UILayerManager.instance = new UILayerManager(new InternalClass());
            return UILayerManager.instance;
        };
        UILayerManager.prototype.initMainUI = function () {
            // 大厅UI
            if (!UILayerManager.uiLayer) {
                UILayerManager.uiLayer = views.layers.UILayer.instance;
                UILayerManager.uiLayer.name = "teaGardenUI";
                UILayerManager.uiLayer.pos(0, 0);
                managers.SceneLayerManager.sceneLayer.addChild(UILayerManager.uiLayer);
            }
            UILayerManager.uiLayer.visible = true;
        };
        return UILayerManager;
    }());
    managers.UILayerManager = UILayerManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=UILayerManager.js.map