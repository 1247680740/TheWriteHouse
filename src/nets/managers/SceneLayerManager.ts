namespace managers {

    /** 场景层管理器 */
    export class SceneLayerManager {
       
        /** 大厅层 */
        static sceneLayer: views.layers.SceneLayer;

        /** 层容器 */
        private layersArr: views.base.BaseView[] = [];

        /** 是否为首次显示 */
        private isFirstShow: boolean = true;

        static instance: SceneLayerManager;

        constructor(interCls: InternalClass) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("SceneLayerManager is singleton, not allow to use constructor!");
        }

        static getInstance(): SceneLayerManager {
            if (!SceneLayerManager.instance)
                SceneLayerManager.instance = new SceneLayerManager(new InternalClass());
            return SceneLayerManager.instance;
        }

        /** 大厅场景 */
        initHallScene(): void {
            // laya.media.SoundManager.playMusic("res/sounds/bgm.wav",0);
            if (!SceneLayerManager.sceneLayer) {
                SceneLayerManager.sceneLayer = new views.layers.SceneLayer();
                SceneLayerManager.sceneLayer.hitTestPrior = false;
                SceneLayerManager.sceneLayer.name = "sceneLayer";
                this.layersArr.push(SceneLayerManager.sceneLayer);
            }
            this.switchSceneState(SceneLayerManager.sceneLayer);
        }

        /**
         * 切换场景间的显示状态
         * @param curLayer 需显示的场景，其它的隐藏
         */
        private switchSceneState(curLayer: views.base.BaseView): void {
            if (this.layersArr.length == 0)
                return;
            if (!curLayer)
                return;
            let i: number;
            let len: number = this.layersArr.length;
            let view: views.base.BaseView;
            for (i = 0; i < len; i++) {
                view = this.layersArr[i];
                if (!view)
                    continue;

                if (curLayer.name == view.name)
                    curLayer.visible = true;
                else
                    view.visible = false;
            }
        }
    }

    class InternalClass {

    }
}