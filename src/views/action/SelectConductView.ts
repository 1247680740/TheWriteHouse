namespace views.action {

    import SelectItemUI = ui.dialog.SelectItemUI;

    export class SelectConductView extends ui.dialog.CheckItemUI {

        constructor() {
            super();
            this.titleText.text = "宣传选择";
            this.zOrder = 2;
            this.createList();
        }


        createList(): void {
            for (let i: number = 0; i < GameConfig.conductArr.length; i++) {
                let conductStr:string = GameConfig.conductArr[i];
                let gridItem: SelectItemUI = new SelectItemUI();
                gridItem.listItemLabel.text = conductStr;
                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                gridItem.name = i + "";
                this.gridContainer.addChild(gridItem);
                gridItem.on(Laya.Event.CLICK, this, this.returnValue);
            }
        }

        returnValue(event: Laya.Event): void {
            event.stopPropagation();
            let id: number = parseInt(event.target.name);
            // if (id == GameConfig.checkConductID) {
            //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的宣传方式");
            // } else {
                GameConfig.checkConductID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                views.action.ReleaseView.prototype.resetDuctView(id);
            // }
        }

        setBg(): void {
            if (this.gridContainer.numChildren > 0) {
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: SelectItemUI = this.gridContainer.getChildAt(i) as SelectItemUI;
                    if (i == GameConfig.checkConductID) {
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                    } else {
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                    }
                }
            }
        }


    }
}