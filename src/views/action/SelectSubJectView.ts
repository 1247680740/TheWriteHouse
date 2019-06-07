namespace views.action {

    import ListItemUI = ui.common.ListItemViewUI;

    export class SelectSubJectView extends ui.dialog.CheckItemUI {

        private subObj:Object;
        constructor() {
            super();
            this.titleText.text = "题材选择";
            this.createList();
        }
        
        createList():void{
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.vScrollBarSkin = "";
            if(GameConfig.hisObjArr.length>0){
                for (let  i= 0; i < GameConfig.hisObjArr.length; i++) {
                    let hisObj:Object = GameConfig.hisObjArr[i];
                    for (let j = 0; j < GameConfig.subGuDingArr.length; j++) {
                        let subObj:Object = GameConfig.subGuDingArr[j];
                        if(subObj["event"] == hisObj["id"] && GameConfig.subArr.indexOf(subObj) == -1){
                            GameConfig.subArr.push(subObj);
                        }
                    }
                }
            }
            for (let i: number = 0; i < GameConfig.subArr.length; i++) {
                this.subObj = GameConfig.subArr[i];
                let str:string = this.subObj["theme"];
                let cost:number = this.subObj["cost"];
                let gridItem: ListItemUI = new ListItemUI();
                gridItem.singleItem.visible =false;
                gridItem.listItemLabel.text = str;
                gridItem.cost.text = cost+"";
                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                gridItem.name = i + "";
                this.gridContainer.addChild(gridItem);
                gridItem.on(Laya.Event.CLICK, this, this.returnValue);
            }

            GameConfig.cachData["subArr"] = GameConfig.subArr;
        }

        returnValue(event: Laya.Event): void {
            event.stopPropagation();
            let id: number = parseInt(event.target.name);
            // if (id == GameConfig.checkSubID) {
            //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的题材");
            // } else {
                GameConfig.checkSubID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                // views.action.WritingView.prototype.resetSubView(id);
            // }
            Hash.playMusic(2);
        }

        setBg(): void {
            if (this.gridContainer.numChildren > 0) {
                Hash.playMusic(2);
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(i) as ListItemUI;
                    if(i == GameConfig.checkSubID){
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                        gridItem.cost.bgColor = "#5D5D5D";
                    }else{
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                    }
                }
            }
        }


    }
}