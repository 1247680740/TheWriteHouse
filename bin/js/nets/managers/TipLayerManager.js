var managers;
(function (managers) {
    // import TipLayer = views.layers.TipLayer;
    /**
     * 弹出层管理器（最上层的弹出框）
     */
    var TipLayerManager = /** @class */ (function () {
        /**
         * 弹出层管理器
         */
        function TipLayerManager() {
            TipLayerManager.tipLayer = new views.layers.TipLayer();
            TipLayerManager.tipLayer.name = "tipLayer";
        }
        TipLayerManager.getInstance = function () {
            if (!TipLayerManager.instance)
                TipLayerManager.instance = new TipLayerManager();
            return TipLayerManager.instance;
        };
        TipLayerManager.prototype.initTip = function () {
            GameConfig.guding = managers.ResourceManager.infoObjArr; //作者信息所有值
            GameConfig.platGuDingArr = managers.ResourceManager.platObjArr; //平台信息所有值
            GameConfig.subGuDingArr = managers.ResourceManager.subjectArr; //题材信息所有值
            GameConfig.eleGuDingArr = managers.ResourceManager.elementArr; //元素信息所有值
        };
        return TipLayerManager;
    }());
    managers.TipLayerManager = TipLayerManager;
})(managers || (managers = {}));
//# sourceMappingURL=TipLayerManager.js.map