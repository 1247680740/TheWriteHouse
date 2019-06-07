namespace views.common {

    export class TestView extends ui.dialog.ChangeDataUI {

        private static instance: TestView;

        constructor() {
            super();
            this.x = (Laya.stage.width - this.width) / 2;
            this.y = (Laya.stage.height - this.height) / 2;
            this.conBtn.on(Laya.Event.CLICK, this, this.conChange);
            this.cancleBtn.on(Laya.Event.CLICK, this, this.cancleChange);
        }

        public static getInstance(): TestView {
            if (this.instance == null) {
                this.instance = new TestView();
            }
            return this.instance;
        }

        conChange(): void {
            console.log(isNaN(parseInt(this.moneyStr.text)));
            if(this.moneyStr.text != null && this.moneyStr.text != "" && !isNaN(parseInt(this.moneyStr.text))){
                let money:number = parseInt(this.moneyStr.text);
                views.toolbar.TopToolBarView.getInstance().resetMoney(money);
            }
            if(this.holeStr.text != null && this.holeStr.text != "" && !isNaN(parseInt(this.holeStr.text))){
                let hole:number = parseInt(this.holeStr.text);
                views.toolbar.TopToolBarView.getInstance().resetHole(hole);
            }
            if(this.fansStr.text != null && this.fansStr.text != "" && !isNaN(parseInt(this.fansStr.text))){
                let fans:number = parseInt(this.fansStr.text);
                views.toolbar.TopToolBarView.getInstance().resetFans(fans);
            }
            this.cancleChange();
        }

        cancleChange(): void {
            Laya.stage.removeChild(this);
            GameConfig.displayPage -= 1;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }

    }

}