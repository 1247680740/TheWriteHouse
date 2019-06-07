namespace views.action {

    import ListItemUI = ui.common.ListItemViewUI;

    export class SelectSingleDataView extends ui.dialog.CheckItemUI {

        private static instance: SelectSingleDataView;
        private listItemUI: ListItemUI;
        private oldIndex: number = null;
        static checkFID: number = null;
        private curDataArr: Array<Object>;
        private curObj: Object;

        constructor(name: string) {
            super();
            this.zOrder = 2;
            this.judgeType(name);
        }

        judgeType(name: string): void {
            switch (name) {
                case "platLabel":
                    this.titleText.text = "平台选择";
                    this.getData(1);
                    this.createList(1);
                    break;
                case "spaceLabel":
                    this.titleText.text = "篇幅选择";
                    this.getData(2);
                    this.createList(2);
                    break;
            }
        }

        /** 获取当前需要的数据源 */
        getData(typeId: number): void {
            this.curDataArr = new Array<Object>();
            this.curDataArr.splice(0,this.curDataArr.length);
            switch (typeId) {
                case 1:
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
                    GameConfig.cachData["platArr"] = GameConfig.platArr;
                    this.curDataArr = GameConfig.platArr;
                    break;
                case 2:
                    this.curDataArr = [{"id":1,"name":"长篇"},{"id":2,"name":"中篇"},{"id":2,"name":"短篇"}];
                    break;
            }
        }

        /** 创建列表 */
        createList(typeId: number): void {
            this.gridContainer.removeChildren(0, this.gridContainer.numChildren - 1);
            this.gridContainer.y = 175;
            this.gridContainer.vScrollBarSkin = "";
            let str: string;
            for (let i: number = 0; i < this.curDataArr.length; i++) {
                this.curObj = this.curDataArr[i];
                if (typeId == 1) {
                    str = this.curObj["net"];
                }else if(typeId == 2){
                    str = this.curObj["name"];
                }
                let gridItem: ListItemUI = new ListItemUI();
                gridItem.listItemLabel.visible = false;
                gridItem.cost.visible = false;
                gridItem.singleItem.visible = true;
                gridItem.singleItem.text = str;
                gridItem.x = 0;
                gridItem.y = i * gridItem.height;
                gridItem.name = str;
                this.gridContainer.addChild(gridItem);
                gridItem.on(Laya.Event.CLICK, this, this.returnValue, [str, typeId]);
            }
        }

        returnValue(str1: string, typeId: number): void {
            GameConfig.displayPage -= 1;
            SceneLayerManager.sceneLayer.removeChild(this);
            switch (typeId) {
                case 1:
                    views.action.IssueView.prototype.resetLabel(str1);
                    break;
                case 2:
                    views.action.IssueView.prototype.resetPaceLabel(str1);
                    break;
            }
        }

    }


}