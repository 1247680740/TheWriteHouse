namespace views.action {

    import ListItemUI = ui.common.ListItemViewUI;

    export class SelectAreView extends ui.dialog.CheckItemUI {

        private static instance: SelectAreView;

        constructor() {
            super();
            this.titleText.text = "时代选择";
            this.createList();
        }

        static getInstance(): SelectAreView {
            if (!SelectAreView.instance)
                SelectAreView.instance = new SelectAreView();
            return SelectAreView.instance;
        }

        /** 创建列表 */
        createList(): void {
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.y = 130;
            this.gridContainer.vScrollBarSkin = "";
            for (let i: number = 0; i < GameConfig.eraArr.length; i++) {
                let str: string = GameConfig.eraArr[i];
                let gridItem: ListItemUI = new ListItemUI();
                gridItem.singleItem.visible =false;
                gridItem.listItemLabel.text = str;
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
            if (id == GameConfig.checkAreID) {
                TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的时代");
            } else {
                GameConfig.checkAreID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                // views.action.WritingView.prototype.resetPlatView(null);
            }
        }

        setBg(): void {
            if (this.gridContainer.numChildren > 0) {
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(i) as ListItemUI;
                    if(i == GameConfig.checkAreID){
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                    }else{
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                    }
                }
            }
        }
    }
}