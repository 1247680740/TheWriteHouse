namespace views.action {

    import ListItemUI = ui.common.ListItemViewUI;

    export class SelectReleaseData extends ui.dialog.CheckEleItemUI {

        private list: Laya.List;
        private listItemUI: ListItemUI;
        private needMoney: number;
        private selectStr: string;
        private releaseDataArr: Array<Object> = ResourceManager.releaseDataArr;
        private incomeArr: Array<Object> = ResourceManager.incomeArr;
        private curDataArr: Array<Object>;
        private curPreaObj: Object;
        private curSelectArr: Array<number> = [];
        private curSelectNameArr: Array<string> = [];
        private eventName: string;

        constructor(name: string) {
            super();
            this.zOrder = 2;
            this.typeIcon.skin = "";
            this.bootomIcon.skin = "";
            this.needMoney = 0;
            this.selectStr = "";
            this.eventName = name;
            this.curDataArr = new Array<Object>();
            this.judgeType(name);
            this.confirmBtn.on(Laya.Event.CLICK, this, this.confirmEle,[name]);
        }

        /** 判断选择类型返回响应数据 */
        judgeType(name: string): void {
            switch (name) {
                case "sexBtn":
                    this.titleText.text = "性别选择";
                    this.typeText.text = "性别";
                    this.getCurArr(1);
                    this.createList(this.curDataArr);
                    break;
                case "ageBtn":
                    this.titleText.text = "年龄选择";
                    this.typeText.text = "年龄";
                    this.getCurArr(2);
                    this.createList(this.curDataArr);
                    break;
                case "eduBtn":
                    this.titleText.text = "学历选择";
                    this.typeText.text = "学历";
                    this.getCurArr(3);
                    this.createList(this.curDataArr);
                    break;
                default:
                    break;
            }
        }

        getCurArr(typeId: number) {
            for (let i: number = 0; i < this.releaseDataArr.length; i++) {
                let releaseObj: Object = this.releaseDataArr[i];
                if (releaseObj["typeID"] == typeId) {
                    this.curDataArr.push(releaseObj);
                }
            }
            for (let j: number = 0; j < this.incomeArr.length; j++) {
                let incomeObj: Object = this.incomeArr[j];
                if (incomeObj["year"] == GameConfig.year) {
                    this.curPreaObj = incomeObj;
                }
            }
        }

        /** 创建列表 */
        createList(arr: Array<Object>): void {
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.vScrollBarSkin = "";

            for (let i: number = 0; i < arr.length; i++) {
                let relObj = arr[i];
                let str: string = relObj["name"];
                let cost: number = relObj["cost"];
                let preMoney: number = this.curPreaObj["spreaMoney"];
                let payMoney: number = cost * preMoney;
                let gridItem: ListItemUI = new ListItemUI();
                gridItem.singleItem.visible =false;
                gridItem.listItemLabel.text = str;
                gridItem.cost.text = payMoney + "";
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
            let gridItem: ListItemUI = this.gridContainer.getChildAt(id) as ListItemUI;
            let gridName: string = gridItem.listItemLabel.text;
            let gridMoney: number = parseInt(gridItem.cost.text);

            if (this.curSelectArr.indexOf(id) == -1) {
                gridItem.listItemLabel.color = "#FFFFFF";
                gridItem.listItemLabel.bgColor = "#5D5D5D";
                gridItem.cost.bgColor = "#5D5D5D";
                this.curSelectArr.push(id);
                this.curSelectNameArr.push(gridName);
                this.needMoney = this.needMoney + gridMoney;
                this.payCost.text = "所选推广一共需要" + this.needMoney;
            } else {
                gridItem.listItemLabel.color = "#5D5D5D";
                gridItem.listItemLabel.bgColor = "#FFFFFF";
                gridItem.cost.bgColor = "#FFFFFF";
                let index: number = this.curSelectArr.indexOf(id);
                let nameIndex: number = this.curSelectNameArr.indexOf(gridName);
                this.curSelectArr.splice(index, 1);
                this.curSelectNameArr.splice(nameIndex, 1);
                this.needMoney = this.needMoney - gridMoney;
                this.payCost.text = "所选推广一共需要" + this.needMoney;
            }
        }

        confirmEle(name:String): void {
            if (this.needMoney > GameConfig.money) {
                TipLayerManager.tipLayer.showDrawBgTip("你的金币不足！");
            } else {
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                for (let i: number = 0; i < this.curSelectNameArr.length; i++) {
                    let name: string = this.curSelectNameArr[i];
                    this.selectStr = this.selectStr + name + ","
                }
                this.selectStr = this.selectStr.substr(0, this.selectStr.length - 1);
                switch (name) {
                    case "sexBtn":
                        GameConfig.sexMoney = this.needMoney;
                        break;
                    case "ageBtn":
                        GameConfig.ageMoney = this.needMoney;
                        break;
                    case "eduBtn":
                        GameConfig.eduMoney = this.needMoney;
                        break;
                    default:
                        break;
                }
                views.action.ReleaseView.prototype.resetDataView(this.eventName, this.selectStr);
                this.initData();
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

        initData(): void {
            this.curDataArr.splice(0, this.curDataArr.length);
            this.curSelectArr.splice(0, this.curSelectArr.length);
            this.curSelectNameArr.splice(0, this.curSelectNameArr.length);
            this.needMoney = 0;
            this.selectStr = "";
            this.eventName = "";
        }

        setBg(eventName: string, strArr: Array<string>): void {
            if (strArr.length > 0) {
                this.getDataID(eventName,strArr);
                for (let n: number = 0; n < this.gridContainer.numChildren; n++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(n) as ListItemUI;
                    let txt: string = gridItem.listItemLabel.text;
                    let gridMoney: number = parseInt(gridItem.cost.text);
                    if (strArr.indexOf(txt) == -1) {
                        gridItem.listItemLabel.color = "#5D5D5D";
                        gridItem.listItemLabel.bgColor = "#FFFFFF";
                        gridItem.cost.bgColor = "#FFFFFF";
                    } else {
                        gridItem.listItemLabel.color = "#FFFFFF";
                        gridItem.listItemLabel.bgColor = "#5D5D5D";
                        gridItem.cost.bgColor = "#5D5D5D";
                        this.needMoney = this.needMoney + gridMoney;
                    }

                }
                this.payCost.text = "所选推广一共需要" + this.needMoney;
            } else {
                this.payCost.text = "所选推广一共需要0";
                for (let i: number = 0; i < this.gridContainer.numChildren; i++) {
                    let gridItem: ListItemUI = this.gridContainer.getChildAt(i) as ListItemUI;
                    gridItem.listItemLabel.color = "#5D5D5D";
                    gridItem.listItemLabel.bgColor = "#FFFFFF";
                    gridItem.cost.bgColor = "#FFFFFF";
                }
            }
        }

        getDataID(eventName: string, strArr: Array<string>): void {
            switch (eventName) {
                case "sexBtn":
                    for (let i: number = 0; i < strArr.length; i++) {
                        let strName: string = strArr[i];
                        for (let j: number = 0; j < this.releaseDataArr.length; j++) {
                            let releaObj: Object = this.releaseDataArr[j];
                            if (releaObj["typeID"] == 1) {
                                if (releaObj["name"] == strName) {
                                    this.curSelectNameArr.push(strName);
                                    this.curSelectArr.push(releaObj["type"]-1);
                                }
                            }
                        }
                    }
                    break;
                case "ageBtn":
                    for (let i: number = 0; i < strArr.length; i++) {
                        let strName: string = strArr[i];
                        for (let j: number = 0; j < this.releaseDataArr.length; j++) {
                            let releaObj: Object = this.releaseDataArr[j];
                            if (releaObj["typeID"] == 2) {
                                if (releaObj["name"] == strName) {
                                    this.curSelectNameArr.push(strName);
                                    this.curSelectArr.push(releaObj["type"]-1);
                                }
                            }
                        }
                    }
                    break;
                case "eduBtn":
                    for (let i: number = 0; i < strArr.length; i++) {
                        let strName: string = strArr[i];
                        for (let j: number = 0; j < this.releaseDataArr.length; j++) {
                            let releaObj: Object = this.releaseDataArr[j];
                            if (releaObj["typeID"] == 3) {
                                if (releaObj["name"] == strName) {
                                    this.curSelectNameArr.push(strName);
                                    this.curSelectArr.push(releaObj["type"]-1);
                                }
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }

    }


}