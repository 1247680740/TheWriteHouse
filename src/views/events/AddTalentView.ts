namespace views.events {

    export class AddTalentView extends ui.event.TipAddUI {

        private static instance: AddTalentView;
        private xx: number;
        private yy: number;
        private totalNum: number;
        private addNum: number;
        private curBoxNum: number;
        private curHasPointNum:number;

        constructor() {
            super();
            this.name = "addtalentview";
            this.on(Laya.Event.CLICK, this, this.judgeName);
        }


        public static getInstance(): AddTalentView {
            if (this.instance == null) {
                this.instance = new AddTalentView();
            }
            return this.instance;
        }

        judgeName(event: Laya.Event): void {
            event.stopPropagation();
            let name: string = event.target.name;
            Hash.playMusic(2);
            switch (name) {
                case "addTle":
                    this.addTelNum();
                    break;
                case "delTle":
                    this.delTleNum();
                    break;
                default:
                    this.removeSelf();
                    break;
            }
        }

        addTelNum(): void {
            this.addNum += 1;
            this.curHasPointNum -= 1;
            if (this.addNum == this.totalNum || this.curHasPointNum <= 0) {
                this.addTle.skin = "gameUI/event/button_plus_off.png";
                this.addTle.mouseEnabled = false;
            } else {
                this.addTle.skin = "gameUI/event/button_plus.png";
                this.addTle.mouseEnabled = true;
            }
            this.pointNum.text = this.addNum + "/" + this.totalNum;
            this.delTle.skin = "gameUI/event/button_minus.png";
            this.delTle.mouseEnabled = true;
            views.events.TalentChildView.prototype.resetData(this.curBoxNum, this.addNum, this.totalNum,this.curHasPointNum);
        }

        delTleNum(): void {
            this.addNum -= 1;
            this.curHasPointNum += 1;
            if (this.addNum <= 0) {
                this.delTle.skin = "gameUI/event/button_minus_off.png";
                this.delTle.mouseEnabled = false;
            } else {
                this.delTle.skin = "gameUI/event/button_minus.png";
                this.delTle.mouseEnabled = true;
            }
            this.pointNum.text = this.addNum + "/" + this.totalNum;
            this.addTle.skin = "gameUI/event/button_plus.png";
            this.addTle.mouseEnabled = true;
            views.events.TalentChildView.prototype.resetData(this.curBoxNum, this.addNum, this.totalNum,this.curHasPointNum);
        }

        resetTipStr(i: number, addNum: number, totalNum: number,curHasNum:number): void {
            //判断是否可以加点....
            this.curBoxNum = i;
            this.addNum = addNum;
            this.totalNum = totalNum;
            this.curHasPointNum = curHasNum;
            let newArr: Array<number> = new Array<number>();
            newArr.splice(0, newArr.length);
            this.pointNum.text = this.addNum + "/" + this.totalNum;

            if (GameConfig.everyLevelArr.length > 0) {
                for (let j = 0; j < GameConfig.everyLevelArr.length; j++) {
                    let everyObj: Object = GameConfig.everyLevelArr[j];
                    newArr.push(everyObj["level"]);
                }
            }
            if (GameConfig.isFistUnlock) {
                GameConfig.isFistUnlock = false;
                if (newArr.indexOf(i) != -1) {
                    this.frilyTip.visible = false;
                    this.addTle.visible = true;
                    this.delTle.visible = true;
                    this.pointNum.visible = true;
                    if (this.curHasPointNum <= 0) {
                        this.addTle.skin = "gameUI/event/button_plus_off.png";
                        this.addTle.mouseEnabled = false;
                        if (this.addNum <= 0) {
                            this.delTle.skin = "gameUI/event/button_minus_off.png";
                            this.delTle.mouseEnabled = false;
                        } else {
                            this.judgeStatus(i);
                        }
                    } else {
                        if (this.addNum == this.totalNum) {
                            this.addTle.skin = "gameUI/event/button_plus_off.png";
                            this.addTle.mouseEnabled = false;
                            this.judgeStatus(i);
                        } else if (this.addNum <= 0) {
                            if ( i == 1){
                                this.addTle.skin = "gameUI/event/button_plus.png";
                                this.delTle.skin = "gameUI/event/button_minus_off.png";
                                this.addTle.mouseEnabled = true;
                                this.delTle.mouseEnabled = false; 
                            }else{
                                if ( this.curHasPointNum < GameConfig.defHasTalentPoint ) {
                                    this.addTle.skin = "gameUI/event/button_plus.png";
                                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                                    this.addTle.mouseEnabled = true;
                                    this.delTle.mouseEnabled = false; 
                                }else{
                                    this.frilyTip.visible = true;
                                    this.addTle.visible = false;
                                    this.delTle.visible = false;
                                    this.addTle.mouseEnabled = false;
                                    this.delTle.mouseEnabled = false;
                                    this.pointNum.visible = false;
                                }  
                            }
                        } else {
                            this.addTle.skin = "gameUI/event/button_plus.png";
                            this.addTle.mouseEnabled = true;
                            this.judgeStatus(i);
                        }
                    }
                } else {
                    this.frilyTip.visible = true;
                    this.addTle.visible = false;
                    this.delTle.visible = false;
                    this.addTle.mouseEnabled = false;
                    this.delTle.mouseEnabled = false;
                    this.pointNum.visible = false;
                }
            } else {
                if (GameConfig.unlockIDArr.indexOf(i) != -1) {
                    this.frilyTip.visible = false;
                    this.addTle.visible = true;
                    this.delTle.visible = true;
                    this.pointNum.visible = true;
                    if (this.curHasPointNum <= 0) {
                        this.addTle.skin = "gameUI/event/button_plus_off.png";
                        this.addTle.mouseEnabled = false;
                        if (this.addNum <= 0) {
                            this.delTle.skin = "gameUI/event/button_minus_off.png";
                            this.delTle.mouseEnabled = false;
                        } else {
                            this.judgeStatus(i);
                        }
                    } else {
                        if (this.addNum == this.totalNum) {
                            this.addTle.skin = "gameUI/event/button_plus_off.png";
                            this.addTle.mouseEnabled = false;
                            this.judgeStatus(i);
                        } else if (this.addNum <= 0) {     
                            if ( i == 1){
                                this.addTle.skin = "gameUI/event/button_plus.png";
                                this.delTle.skin = "gameUI/event/button_minus_off.png";
                                this.addTle.mouseEnabled = true;
                                this.delTle.mouseEnabled = false; 
                            }else{
                                if ( this.curHasPointNum  < GameConfig.defHasTalentPoint ) {
                                    this.addTle.skin = "gameUI/event/button_plus.png";
                                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                                    this.addTle.mouseEnabled = true;
                                    this.delTle.mouseEnabled = false; 
                                }else{
                                    this.frilyTip.visible = true;
                                    this.addTle.visible = false;
                                    this.delTle.visible = false;
                                    this.addTle.mouseEnabled = false;
                                    this.delTle.mouseEnabled = false;
                                    this.pointNum.visible = false;
                                }  
                            }            
                        } else {
                            this.addTle.skin = "gameUI/event/button_plus.png";
                            this.addTle.mouseEnabled = true;
                            this.judgeStatus(i);
                        }
                    }
                } else {
                    this.frilyTip.visible = true;
                    this.addTle.visible = false;
                    this.delTle.visible = false;
                    this.addTle.mouseEnabled = false;
                    this.delTle.mouseEnabled = false;
                    this.pointNum.visible = false;
                }
            }

            /** 获取加点提示信息 */
            for (let m: number = 0; m < ResourceManager.achiveDataArr.length; m++) {
                let achveObj: Object = ResourceManager.achiveDataArr[m];
                if (achveObj["id"] == i) {
                    this.tipText.text = achveObj["string"];
                    return;
                }
            }
        }

        judgeStatus(i:number): void {
            let curView: AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as AchiveView;
            let telView: TalentChildView = curView.getChildByName("talentChildView") as TalentChildView;
            switch (i) {
                case 1:
                    this.getStatus(2,4,telView);
                    break;
                case 2:
                    this.getStatus(4,6,telView);
                    break;
                case 3:
                    this.getStatus(6,8,telView);
                    break;
                case 4:
                    this.getStatus(8,9,telView);
                    break;
                case 5:
                    this.getStatus(8,10,telView);
                    break;
                case 6:
                    this.getStatus(9,11,telView);
                    break;
                case 7:
                    this.getStatus(10,11,telView);
                    break;
            }
        }

        getStatus(startNum:number,endNum:number,telView: TalentChildView):void{
            for (let d:number = startNum; d < endNum; d++) {
                let curBox: Laya.Box = telView.getChildByName("coBox" + d) as Laya.Box;
                let lbStr: Laya.Label = curBox.getChildByName("lb" + d) as Laya.Label;
                let img: Laya.Image = curBox.getChildByName("img" + d) as Laya.Image;
                let btoomStr:string = lbStr.text;
                let addNum:number = parseInt(btoomStr.substr(0,1));
                if(addNum > 0){
                    this.delTle.skin = "gameUI/event/button_minus_off.png";
                    this.delTle.mouseEnabled = false;
                    return;
                }else{
                    this.delTle.skin = "gameUI/event/button_minus.png";
                    this.delTle.mouseEnabled = true;
                }
            }
        }
    }
}