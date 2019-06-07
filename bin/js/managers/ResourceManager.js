var managers;
(function (managers) {
    // import ResLoader = commons.resLoad.ResLoader;
    /**
     * ResLoader 的资源管理器
     * @example
     *   // IMAGE
     *   let imgTexture: laya.resource.Texture = ResLoader.getDataByFileName("testJPG.jpg");
     *   let s: Sprite = new Sprite();
     *   s.graphics.drawTexture(imgTexture);
     *   s.pos(0, Laya.stage.height / 5);
     *   Laya.stage.addChild(s);
     *
     *   // JSON
     *   let testJson: JSON = ResLoader.getDataByFileName("testSWF.json");
     *   console.log("== Json ele:" + testJson["frames"]["7.png"]["frame"]["h"]);
     */
    var ResourceManager = /** @class */ (function () {
        function ResourceManager(interCls) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("ResourceManager is singleton, not allow to use constructor!");
            // ResourceManager.seedsObjArr = new Array<Object>();
        }
        Object.defineProperty(ResourceManager, "instance", {
            get: function () {
                if (ResourceManager._instance === undefined)
                    ResourceManager._instance = new ResourceManager(new InternalClass());
                return ResourceManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /** 主要用于加载静态数据 */
        ResourceManager.prototype.loadRes = function (fileUrlArr) {
            ResLoader.eventDispatcher.once(Laya.Event.COMPLETE, this, this.resLoaderComplete);
            ResLoader.eventDispatcher.once(Laya.Event.PROGRESS, this, this.loadProgress);
            ResLoader.loadRes(fileUrlArr);
        };
        ResourceManager.prototype.resLoaderComplete = function (msg) {
            // 作家信息
            var infoJson = ResLoader.getDataByFileName("format.json");
            ResourceManager.instance.parseInfosJson(infoJson);
            // 平台对应信息
            var platformJson = ResLoader.getDataByFileName("platform.json");
            ResourceManager.platObjArr = platformJson["data"];
            // 用户收入配置数据
            var incomeJson = ResLoader.getDataByFileName("income.json");
            ResourceManager.incomeArr = incomeJson["data"];
            /** 历史事件配置数据 */
            var historyJson = ResLoader.getDataByFileName("history.json");
            ResourceManager.historyArr = historyJson["data"];
            /** 题材列表信息 */
            var subjectJson = ResLoader.getDataByFileName("subject.json");
            ResourceManager.subjectArr = subjectJson["data"];
            /** 元素列表信息 */
            var elementJson = ResLoader.getDataByFileName("element.json");
            ResourceManager.elementArr = elementJson["data"];
            /** 评奖系统相关配置信息 */
            var awardsJson = ResLoader.getDataByFileName("awards.json");
            ResourceManager.awardsArr = awardsJson["data"];
            /** 新手导航相关配置信息 */
            var guideJson = ResLoader.getDataByFileName("guide.json");
            ResourceManager.guideArr = guideJson["data"];
        };
        /**
         * 加载进度
         */
        ResourceManager.prototype.loadProgress = function (event) {
        };
        /**
         * 解析 format.json
         */
        ResourceManager.prototype.parseInfosJson = function (jsonObj) {
            try {
                ResourceManager.infoObjArr = jsonObj["data"];
            }
            catch (e) {
                console.log("format.json, " + e.message);
                return;
            }
            if (ResourceManager.callback)
                ResourceManager.callback(ResourceManager.infoObjArr);
        };
        // static resLoader:ResLoader;
        /** 存放解析后的 format.json 对应的数据 */
        ResourceManager.infoObjArr = new Array();
        /** 存放解析后的platForm.json 对应的数据 */
        ResourceManager.platObjArr = new Array();
        /** 存放解析后的income.json 对应的数据 */
        ResourceManager.incomeArr = new Array();
        /** 存放解析后的history.json 对应的数据 */
        ResourceManager.historyArr = new Array();
        /** 存放解析后的subject.json 对应的数据 */
        ResourceManager.subjectArr = new Array();
        /** 存放解析后的element.json 对应的数据 */
        ResourceManager.elementArr = new Array();
        /** 存放解析后的awards.json 对应的数据 */
        ResourceManager.awardsArr = new Array();
        /** 存放解析后的guide.json 对应的数据 */
        ResourceManager.guideArr = new Array();
        ResourceManager._instance = undefined;
        return ResourceManager;
    }());
    managers.ResourceManager = ResourceManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=ResourceManager.js.map