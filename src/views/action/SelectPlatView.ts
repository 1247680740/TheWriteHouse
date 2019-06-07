namespace views.action {

    import SelectItemUI = ui.dialog.SelectItemUI;

    export class SelectPlatView extends ui.dialog.CheckItemUI {

        private static instance: SelectPlatView;
        private platObj: Object;

        constructor() {
            super();
            this.titleText.text = "平台选择";
            this.createList();
        }

        /** 创建列表 */
        createList(): void {
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.y = 175;
            this.gridContainer.vScrollBarSkin = "";
            if (GameConfig.hisObjArr.length > 0) {
                for (let i: number = 0; i < GameConfig.hisObjArr.length; i++) {
                    let hisObj: Object = GameConfig.hisObjArr[i];
                    if (hisObj["id"] == 5 || hisObj["id"] == 6) {
                        for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                            let platObj: Object = GameConfig.platGuDingArr[j];
                            if (platObj["unlock"] == hisObj["id"] && GameConfig.platArr.indexOf(platObj) == -1) {
                                GameConfig.platArr.push(platObj);
                            }
                        }
                    }
                }
            }
            for (let i: number = 0; i < GameConfig.platArr.length; i++) {
                this.platObj = GameConfig.platArr[i];
                let str: string = this.platObj["net"]
                let gridItem: SelectItemUI = new SelectItemUI();
                gridItem.listItemLabel.text = str;
                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                gridItem.name = i + "";
                this.gridContainer.addChild(gridItem);
                gridItem.on(Laya.Event.CLICK, this, this.returnValue);
            }

            GameConfig.cachData["platArr"] = GameConfig.platArr;
            // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
        }

        returnValue(event: Laya.Event): void {
            event.stopPropagation();
            let id: number = parseInt(event.target.name);
            // if (id == GameConfig.checkPlatID) {
            //     TipLayerManager.tipLayer.showDrawBgTip("不可选择相同的平台");
            // } else {
                GameConfig.checkPlatID = id;
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                let obj: Object = GameConfig.platArr[GameConfig.checkPlatID];
                let str: string = obj["net"];
                // views.action.WritingView.prototype.resetPlatView(str);
            // }
            Hash.playMusic(2);
        }

        setBg(): void {
            if (this.gridContainer.numChildren > 0) {
                Hash.playMusic(2);
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: SelectItemUI = this.gridContainer.getChildAt(i) as SelectItemUI;
                    if (i == GameConfig.checkPlatID) {
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