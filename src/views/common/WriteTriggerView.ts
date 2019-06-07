namespace views.common {

    import WritingView = views.action.WritingView;

    export class WriteTriggerView extends ui.common.WritingTriggerUI {

        private writingView: WritingView;

        constructor(infoObj: Object) {
            super();
            /** 写作界面 */
            this.zOrder = 0;
            this.on(Laya.Event.CLICK, this, this.showWritingView);
        }

        showWritingView(): void {
            let viewName: string = this.name;
            let spName: string = viewName.substring(0, viewName.length - 3);
            for (let j: number = 0; j < GameConfig.authorInfoArr.length; j++) {
                let auObj: Object = GameConfig.authorInfoArr[j];
                if (auObj["name"] == spName) {
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
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
        }
    }
}