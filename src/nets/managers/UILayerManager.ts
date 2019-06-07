namespace managers {

    import Sprite = laya.display.Sprite;

    export class UILayerManager {

        static uiLayer: views.layers.UILayer;
        private static instance: UILayerManager;

        uiName: string;

        constructor(interCls: InternalClass) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("UIManger is singleton, not allow to use constructor!");

            if (!UILayerManager.uiLayer)
                UILayerManager.uiLayer = new views.layers.UILayer();
        }

        static getInstance(): UILayerManager {
            if (!UILayerManager.instance)
                UILayerManager.instance = new UILayerManager(new InternalClass());
            return UILayerManager.instance;
        }

        initMainUI(): void {
            // 大厅UI
            if (!UILayerManager.uiLayer) {
                UILayerManager.uiLayer =  views.layers.UILayer.instance;
                UILayerManager.uiLayer.name = "teaGardenUI";
                UILayerManager.uiLayer.pos(0,0);
                SceneLayerManager.sceneLayer.addChild(UILayerManager.uiLayer);
            }
            UILayerManager.uiLayer.visible = true;
        }
    }


    class InternalClass {

    }
}