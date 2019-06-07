namespace views.toolbar {

    export class LeftToolBarView extends ui.toolBar.LeftToolBarUI {

        private operaTingView: views.action.OperaTingView;

        constructor(auObj: Object) {
            super();
            this.zOrder = 0;
            this.pageName.text = auObj["pageName"];
            this.on(Laya.Event.CLICK, this, this.showNextView);
        }

        showNextView(): void {
            let nameStr: string = this.name.substring(0, this.name.length - 8);
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let auObj: Object = GameConfig.authorInfoArr[i];
                if (auObj["name"] == nameStr) {
                    if (auObj["curStatus"] == 3) {
                        // if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        //     let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        //     list.visible = false;
                        // }
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        this.operaTingView = new views.action.OperaTingView(auObj);
                        this.operaTingView.name = auObj["name"]+"ope";
                        SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                    }

                }
            }
        }
    }
}