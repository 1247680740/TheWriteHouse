namespace views.action {

    import ListItemUI = ui.common.ListItemViewUI;

    export class SelectElemView extends ui.dialog.CheckEleItemUI {

        private list: Laya.List;
        private listItemUI: ListItemUI;
        private oldIndex: number = null;
        private eleObj: Object;
        private needCost: number;
        private selectStr: string;

        constructor() {
            super();
            this.needCost = 0;
            this.selectStr = "";
            this.titleText.text = "元素选择";
            this.typeText.text = "元素";
            this.typeIcon.skin = "gameUI/toolbar/idea.png";
            this.bootomIcon.skin = "gameUI/toolbar/idea.png";
            this.createList();
            this.confirmBtn.on(Laya.Event.CLICK, this, this.confirmEle);
        }


        confirmEle(event:Laya.Event): void {
            Hash.playMusic(2);
            event.stopPropagation();
            let payHole:number = this.getEleHole();
            if(payHole>GameConfig.brainHole){
                TipLayerManager.tipLayer.showDrawBgTip("你的灵感知不足！");
            }else{
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                for (let i: number = 0; i < GameConfig.curSelectEleNameArr.length; i++) {
                    let name: string = GameConfig.curSelectEleNameArr[i];
                    this.selectStr = this.selectStr + name + ","
                }
                this.selectStr = this.selectStr.substr(0, this.selectStr.length - 1);
                // views.action.WritingView.prototype.resetEleView(this.selectStr);
            }
        }

        /** 创建列表 */
        createList(): void {
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.vScrollBarSkin = "";
            for (let i: number = 0; i < GameConfig.hisObjArr.length; i++) {
                let hisObj: Object = GameConfig.hisObjArr[i];
                for (let j: number = 0; j < GameConfig.eleGuDingArr.length; j++) {
                    let eleObj: Object = GameConfig.eleGuDingArr[j];
                    if (eleObj["event"] == hisObj["id"] && GameConfig.eleArr.indexOf(eleObj) == -1) {
                        GameConfig.eleArr.push(eleObj);
                    }
                }
            }

            for (let i: number = 0; i < GameConfig.eleArr.length; i++) {
                this.eleObj = GameConfig.eleArr[i];
                let str: string = this.eleObj["element"];
                let cost: number = this.eleObj["cost"];
                let gridItem: ListItemUI = new ListItemUI();
                gridItem.singleItem.visible =false;
                gridItem.listItemLabel.text = str;
                gridItem.cost.text = cost + "";
                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                gridItem.name = i + "";
                this.gridContainer.addChild(gridItem);
                gridItem.on(Laya.Event.CLICK, this, this.returnValue);
            }
            GameConfig.cachData["eleArr"] = GameConfig.eleArr;
            // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
        }

        returnValue(event: Laya.Event): void {
            Hash.playMusic(2);
            event.stopPropagation();
            let id: number = parseInt(event.target.name);
            let gridItem: ListItemUI = this.gridContainer.getChildAt(id) as ListItemUI;
            let eleName: string = gridItem.listItemLabel.text;
            let eleObj: Object = this.getCurEleObj(eleName);

            if (GameConfig.curSelectEleArr.length < 3) {
                if (GameConfig.curSelectEleArr.indexOf(id) == -1) {
                    gridItem.listItemLabel.color = "#FFFFFF";
                    gridItem.listItemLabel.bgColor = "#5D5D5D";
                    gridItem.cost.bgColor = "#5D5D5D";
                    GameConfig.curSelectEleArr.push(id);
                    GameConfig.curSelectEleNameArr.push(eleName);
                    this.needCost = this.needCost + eleObj["cost"];
                    this.payCost.text = "所选元素一共需要" + this.needCost;
                } else {
                    gridItem.listItemLabel.color = "#5D5D5D";
                    gridItem.listItemLabel.bgColor = "#FFFFFF";
                    gridItem.cost.bgColor = "#FFFFFF";
                    let index: number = GameConfig.curSelectEleArr.indexOf(id);
                    let nameIndex: number = GameConfig.curSelectEleNameArr.indexOf(eleName);
                    GameConfig.curSelectEleArr.splice(index, 1);
                    GameConfig.curSelectEleNameArr.splice(nameIndex, 1);
                    this.needCost = this.needCost - eleObj["cost"];
                    this.payCost.text = "所选元素一共需要" + this.needCost;
                }
            } else {
                if (GameConfig.curSelectEleArr.indexOf(id) == -1) {
                    TipLayerManager.tipLayer.showDrawBgTip("元素最多可选三个哦！");
                } else {
                    gridItem.listItemLabel.color = "#5D5D5D";
                    gridItem.listItemLabel.bgColor = "#FFFFFF";
                    gridItem.cost.bgColor = "#FFFFFF";
                    let index: number = GameConfig.curSelectEleArr.indexOf(id);
                    let nameIndex: number = GameConfig.curSelectEleNameArr.indexOf(eleName);
                    GameConfig.curSelectEleArr.splice(index, 1);
                    GameConfig.curSelectEleNameArr.splice(nameIndex, 1);
                    this.needCost = this.needCost - eleObj["cost"];
                    this.payCost.text = "所选元素一共需要" + this.needCost;
                }
            }
        }

        getCurEleObj(eleName: string): Object {
            for (let i: number = 0; i < GameConfig.eleArr.length; i++) {
                let eleObj: Object = GameConfig.eleArr[i];
                if (eleObj["element"] == eleName) {
                    return eleObj;
                }
            }
        }

        getEleHole(): number {
            let payHole: number = 0;
            for (let i: number = 0; i < GameConfig.curSelectEleNameArr.length; i++) {
                let eleName: string = GameConfig.curSelectEleNameArr[i];
                for (var index = 0; index < GameConfig.eleArr.length; index++) {
                    let eleObj: Object = GameConfig.eleArr[index];
                    if (eleObj["element"] == eleName) {
                        payHole = payHole + eleObj["cost"];
                    }
                }
            }
            return payHole;
        }

        setBg(): void {
            Hash.playMusic(2);
            if (GameConfig.curSelectEleArr.length > 0) {
                for (let n: number = 0; n < this.gridContainer.numChildren; n++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(n) as ListItemUI;
                    let txt: string = gridItem.listItemLabel.text;
                    if (GameConfig.curSelectEleNameArr.indexOf(txt) == -1) {
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                    } else {
                        let newEleObj: Object = this.getCurEleObj(txt);
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                        gridItem.cost.bgColor = "#5D5D5D";
                        this.needCost = this.needCost + newEleObj["cost"];
                    }

                }
                this.payCost.text = "所选元素一共需要" + this.needCost;
                
            } else {
                this.payCost.text = "所选元素一共需要0";
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(i) as ListItemUI;
                    gridItem.listItemLabel.color = "#5D5D5D";
                    gridItem.listItemLabel.bgColor = "#FFFFFF";
                    gridItem.cost.bgColor = "#FFFFFF";
                }
            }
        }

    }


}