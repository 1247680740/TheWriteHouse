namespace managers {
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
    export class ResourceManager {
        // static resLoader:ResLoader;

        /** 存放解析后的 format.json 对应的数据 */
        static infoObjArr: Array<Object> = new Array<Object>();
        /** 存放解析后的platForm.json 对应的数据 */
        static platObjArr: Array<Object> = new Array<Object>();
        /** 存放解析后的income.json 对应的数据 */
        static incomeArr: Array<Object> = new Array<Object>();
        /** 存放解析后的history.json 对应的数据 */
        static historyArr:Array<Object> = new Array<Object>();
        /** 存放解析后的subject.json 对应的数据 */
        static subjectArr:Array<Object> = new Array<Object>();
        /** 存放解析后的element.json 对应的数据 */
        static elementArr:Array<Object> = new Array<Object>();
        /** 存放解析后的awards.json 对应的数据 */
        static awardsArr:Array<Object> = new Array<Object>();
        /** 存放解析后的guide.json 对应的数据 */
        static guideArr:Array<Object> = new Array<Object>();
        /** 存放解析后的release.json对应的数据 */
        static releaseDataArr:Array<Object> = new Array<Object>();
        /** 存放解析后的talent.json对应的数据 */
        static achiveDataArr:Array<Object> = new Array<Object>();
        /** 存放解析后的achiveGoal.json对应的数据 */
        static achiveGoldArr:Array<Object> = new Array<Object>();
        /** 存放解析后的traint.json对应的数据 */
        static trainArr:Array<Object> = new Array<Object>();
        /** 存放解析后的writing.json对应的数据 */
        static holeArr:Array<Object> = new Array<Object>();
        /** 存放解析后的triggerEvent.json对应的数据 */
        static triggerArr:Array<Object> = new Array<Object>();

        static callback: Function;

        private static _instance: ResourceManager = undefined;

        constructor(interCls: InternalClass) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("ResourceManager is singleton, not allow to use constructor!");

            // ResourceManager.seedsObjArr = new Array<Object>();
        }

        static get instance(): ResourceManager {
            if (ResourceManager._instance === undefined)
                ResourceManager._instance = new ResourceManager(new InternalClass());
            return ResourceManager._instance;
        }

        /** 主要用于加载静态数据 */
        loadRes(fileUrlArr: Array<string>): void {
            ResLoader.eventDispatcher.once(Laya.Event.COMPLETE, this, this.resLoaderComplete);
            ResLoader.eventDispatcher.once(Laya.Event.PROGRESS, this, this.loadProgress);
            ResLoader.loadRes(fileUrlArr);
        }

        private resLoaderComplete(msg: any): void {
            // 作家信息
            let infoJson: any = ResLoader.getDataByFileName("format.json");
            ResourceManager.instance.parseInfosJson(infoJson);

            // 平台对应信息
            let platformJson:any = ResLoader.getDataByFileName("platform.json");
            ResourceManager.platObjArr = platformJson["data"];

            // 用户收入配置数据
            let incomeJson:any = ResLoader.getDataByFileName("income.json");
            ResourceManager.incomeArr = incomeJson["data"];

            /** 历史事件配置数据 */
            let historyJson:any = ResLoader.getDataByFileName("history.json");
            ResourceManager.historyArr = historyJson["data"];

            /** 题材列表信息 */
            let subjectJson:any = ResLoader.getDataByFileName("subject.json");
            ResourceManager.subjectArr = subjectJson["data"];

            /** 元素列表信息 */
            let elementJson:any = ResLoader.getDataByFileName("element.json");
            ResourceManager.elementArr = elementJson["data"];

            /** 评奖系统相关配置信息 */
            let awardsJson:any = ResLoader.getDataByFileName("awards.json");
            ResourceManager.awardsArr = awardsJson["data"];

            /** 新手导航相关配置信息 */
            let guideJson:any = ResLoader.getDataByFileName("guide.json");
            ResourceManager.guideArr = guideJson["data"];

            /** 发布需要相关数据 */
            let releaseJson:any = ResLoader.getDataByFileName("release.json");
            ResourceManager.releaseDataArr = releaseJson["data"];

            /** 成就系统相关数据 */
            let achiveJson:any = ResLoader.getDataByFileName("talent.json");
            ResourceManager.achiveDataArr = achiveJson["data"];
            
            /** 成绩目标相关数据 */
            let achiveGoldJson:any = ResLoader.getDataByFileName("achiveGoal.json");
            ResourceManager.achiveGoldArr = achiveGoldJson["data"];

            /** 作家培养相关数据 */
            let trainJson:any = ResLoader.getDataByFileName("train.json");
            ResourceManager.trainArr = trainJson["data"];

            /** 新写作系统首页灵感选择数据 */
            let holeJson:any = ResLoader.getDataByFileName("writing.json");
            ResourceManager.holeArr = holeJson["data"];

            /** 触发事件相应数据 */
            let triggerJson:any = ResLoader.getDataByFileName("triggerEvent.json");
            ResourceManager.triggerArr = triggerJson["data"];
        }

        /**
         * 加载进度
         */
        private loadProgress(event: Laya.Event): void {


        }

        /**
         * 解析 format.json
         */
        private parseInfosJson(jsonObj: any): any {
            try {
                ResourceManager.infoObjArr = jsonObj["data"];
            }
            catch (e) {
                console.log("format.json, " + e.message);
                return;
            }

            if(ResourceManager.callback)
                ResourceManager.callback(ResourceManager.infoObjArr);

        }
    }

    class InternalClass {

    }
}