namespace views.events {

    import Box = Laya.Box;
    import AddTalentView = views.events.AddTalentView;

    export class TalentChildView extends ui.event.TalentChildViewUI {

        private addTalentView: AddTalentView;
        private static  instance:TalentChildView;

        constructor() {
            super();
            this.centerX = 0;
            this.y = 175;
            for (let i: number = 1; i < 11; i++) {
                (this.getChildByName("coBox" + i) as Laya.Box).on(Laya.Event.CLICK, this, this.setStatus);
            }
            this.coffinBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.resetBtn.on(Laya.Event.CLICK, this, this.resetPointData);
            this.initData();
        }

        public static getInstance():TalentChildView{
            if(TalentChildView.instance == null){
                TalentChildView.instance = new views.events.TalentChildView();
            }
            return TalentChildView.instance;
        }

        closeView(event:Laya.Event): void { //确定 按钮
            event.stopPropagation();
            GameConfig.isFistUnlock = true;
            GameConfig.everyLevelArr.splice(0, GameConfig.everyLevelArr.length);
            GameConfig.unlockIDArr.splice(0, GameConfig.unlockIDArr.length);
            let curView: AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as AchiveView;
            let telView: TalentChildView = curView.getChildByName("talentChildView") as TalentChildView;
            for (let j: number = 1; j < 11; j++) {
                let curBox: Laya.Box = telView.getChildByName("coBox" + j) as Laya.Box;
                let lbStr: Laya.Label = curBox.getChildByName("lb" + j) as Laya.Label;
                let img: Laya.Image = curBox.getChildByName("img" + j) as Laya.Image;
                if (lbStr.visible == true) {
                    let newObj: Object = new Object();
                    let curStr: string = lbStr.text;
                    let curNum: number = parseInt(curStr.substr(0, 1));
                    newObj["level"] = j;
                    newObj["point"] = curNum;
                    GameConfig.everyLevelArr.push(newObj);
                }

            }
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                GameConfig.unlockIDArr.push(everyObj["level"]);
            }
            let hasPointStr:string = curView.pointTip.text;
            GameConfig.hasTalentPoint = parseInt(hasPointStr.substring(5,hasPointStr.length));
            GameConfig.cachData["everyLevelArr"] = GameConfig.everyLevelArr;
            GameConfig.cachData["hasTalentPoint"] = GameConfig.hasTalentPoint;
            let addtal = views.events.AddTalentView.getInstance();
            if ( addtal ){ // 如果小界面显示着就隐藏
                addtal.removeSelf();
            }    
            Hash.playMusic(2);    
        }

        setStatus(event: Laya.Event): void {
            event.stopPropagation();
            let yNum: number;
            let i: number;
            let name: string = event.target.name;
            if (name == "coBox10") {
                i = parseInt(name.substr(name.length - 2, 2));
            } else {
                i = parseInt(name.substr(name.length - 1, 1));
            }
            /** 获取页面当前拥有的点数 */
            let curView: AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as AchiveView;
            let hasPointStr:string = curView.pointTip.text;
            let curHasNum:number = parseInt(hasPointStr.substring(5,hasPointStr.length));

            let box: Box = this.getChildByName(name) as Laya.Box;
            let lbStr: Laya.Label = box.getChildByName("lb" + i) as Laya.Label;
            let curStr: string = lbStr.text;
            let addNum: number = parseInt(curStr.substr(0, 1));
            let totalNum: number = parseInt(curStr.substr(curStr.length - 1, 1));
            /** 获取当前点击对象的数值传递进添加数值页面 */
            this.addTalentView = AddTalentView.getInstance();
            this.addChild(this.addTalentView);
            this.addTalentView.resetTipStr(i, addNum, totalNum,curHasNum);
            if (i < 4) {
                yNum = box.y + box.height;
            } else {
                yNum = box.y - this.addTalentView.height;
            }
            this.addTalentView.centerX = 0;
            this.addTalentView.y = yNum;
            Hash.playMusic(2);
        }

        /** 初始化状态 */
        initData(): void {
            let numArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            for (var index = 0; index < GameConfig.everyLevelArr.length; index++) {
                let talObj: Object = GameConfig.everyLevelArr[index];
                let coBox: Box = this.getChildByName("coBox" + talObj["level"]) as Laya.Box
                let lbStr: Laya.Label = coBox.getChildByName("lb" + talObj["level"]) as Laya.Label;
                let img: Laya.Image = coBox.getChildByName("img" + talObj["level"]) as Laya.Image;
                lbStr.visible = true;
                img.skin = "gameUI/event/talent_on.png";
                if (talObj["level"] < 8) {
                    lbStr.text = talObj["point"] + "/3";
                } else {
                    lbStr.text = talObj["point"] + "/1";
                }
                if(numArr.indexOf(talObj["level"]) != -1){
                    numArr.splice(numArr.indexOf(talObj["level"]),1);
                }
            }
            for (var j = 0; j < numArr.length; j++) {
                var element:number = numArr[j];
                let coBox: Box = this.getChildByName("coBox"+element) as Laya.Box
                let lbStr: Laya.Label = coBox.getChildByName("lb"+element) as Laya.Label;
                let img: Laya.Image = coBox.getChildByName("img"+element) as Laya.Image;
                lbStr.visible = false;
                img.skin = "gameUI/event/talent_off.png";
            }
            GameConfig.cachData["everyLevelArr"] = GameConfig.everyLevelArr;
            GameConfig.cachData["hasTalentPoint"] = GameConfig.hasTalentPoint;
            GameConfig.cachData["defHasTalentPoint"] = GameConfig.defHasTalentPoint;
        }


        resetData(i: number, addNum: number, totalNum: number,curHasPoint): void {
            let curView: AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as AchiveView;
            curView.pointTip.text = "剩余点数：" + curHasPoint;
            let telView: TalentChildView = curView.getChildByName("talentChildView") as TalentChildView;
            let curBox: Laya.Box = telView.getChildByName("coBox" + i) as Laya.Box;
            let lbStr: Laya.Label = curBox.getChildByName("lb" + i) as Laya.Label;
            let img: Laya.Image = curBox.getChildByName("img" + i) as Laya.Image;
            lbStr.text = addNum + "/" + totalNum;
            if (addNum == totalNum) {
                switch (i) {
                    case 1:
                        this.unLock(2, 4, telView);
                        break;
                    case 2:
                        this.unLock(4, 6, telView);
                        break;
                    case 3:
                        this.unLock(6, 8, telView);
                        break;
                    case 4:
                        let curBox: Laya.Box = telView.getChildByName("coBox5") as Laya.Box;
                        let lbStr: Laya.Label = curBox.getChildByName("lb5") as Laya.Label;
                        let curStr: string = lbStr.text;
                        let addNum: number = parseInt(curStr.substr(0, 1));
                        let totalNum: number = parseInt(curStr.substr(curStr.length - 1, 1));
                        if (addNum == totalNum) {
                            this.unLock(8, 9, telView);
                        }
                        break;
                    case 5:
                        let curBox2: Laya.Box = telView.getChildByName("coBox4") as Laya.Box;
                        let lbStr2: Laya.Label = curBox2.getChildByName("lb4") as Laya.Label;
                        let curStr2: string = lbStr2.text;
                        let addNum2: number = parseInt(curStr2.substr(0, 1));
                        let totalNum2: number = parseInt(curStr2.substr(curStr2.length - 1, 1));

                        let curBox3: Laya.Box = telView.getChildByName("coBox6") as Laya.Box;
                        let lbStr3: Laya.Label = curBox3.getChildByName("lb6") as Laya.Label;
                        let curStr3: string = lbStr3.text;
                        let addNum3: number = parseInt(curStr3.substr(0, 1));
                        let totalNum3: number = parseInt(curStr3.substr(curStr3.length - 1, 1));
                        if (addNum2 == totalNum2) {
                            this.unLock(8, 9, telView);
                        } 
                        if (addNum3 == totalNum3) {
                            this.unLock(9, 10, telView);
                        }
                        break;
                    case 6:
                        let curBox4: Laya.Box = telView.getChildByName("coBox5") as Laya.Box;
                        let lbStr4: Laya.Label = curBox4.getChildByName("lb5") as Laya.Label;
                        let curStr4: string = lbStr4.text;
                        let addNum4: number = parseInt(curStr4.substr(0, 1));
                        let totalNum4: number = parseInt(curStr4.substr(curStr4.length - 1, 1));

                        let curBox5: Laya.Box = telView.getChildByName("coBox7") as Laya.Box;
                        let lbStr5: Laya.Label = curBox5.getChildByName("lb7") as Laya.Label;
                        let curStr5: string = lbStr5.text;
                        let addNum5: number = parseInt(curStr5.substr(0, 1));
                        let totalNum5: number = parseInt(curStr5.substr(curStr5.length - 1, 1));
                        if (addNum4 == totalNum4) {
                            this.unLock(9, 10, telView);
                        }
                        if (addNum5 == totalNum5) {
                            this.unLock(10, 11, telView);
                        }
                        break;
                    case 7:
                        let curBox6: Laya.Box = telView.getChildByName("coBox6") as Laya.Box;
                        let lbStr6: Laya.Label = curBox6.getChildByName("lb6") as Laya.Label;
                        let curStr6: string = lbStr6.text;
                        let addNum6: number = parseInt(curStr6.substr(0, 1));
                        let totalNum6: number = parseInt(curStr6.substr(curStr6.length - 1, 1));
                        if (addNum6 == totalNum6) {
                            this.unLock(10, 11, telView);
                        }
                        break;
                }
            } else {
                switch (i) {
                    case 1:
                        this.lock(2, 4, telView);
                        break;
                    case 2:
                        this.lock(4, 6, telView);
                        break;
                    case 3:
                        this.lock(6, 8, telView);
                        break;
                    case 4:
                        this.lock(8, 9, telView);
                        break;
                    case 5:
                        this.lock(8, 10, telView);
                        break;
                    case 6:
                        this.lock(9, 11, telView);
                        break;
                    case 7:
                        this.lock(10, 11, telView);
                        break;
                }
            }
        }
        /** 重置点数 */
        resetPointData(event:Laya.Event):void{ //按钮重置
            event.stopPropagation();
            let hasNum:number = 0;
            for (let i:number = 1; i < 11; i++) {
                let curBox:Laya.Box = this.getChildByName("coBox"+i) as Laya.Box;
                let curImg:Laya.Image = curBox.getChildByName("img"+i) as Laya.Image;
                let curLabel:Laya.Label = curBox.getChildByName("lb"+i) as Laya.Label;
                if(i == 1){
                    curLabel.text = "0/3";
                    curImg.skin = "gameUI/event/talent_on.png";
                    curLabel.visible = true;
                }else{
                    curImg.skin = "gameUI/event/talent_off.png";
                    curLabel.text = "0/3";
                    if ( i >= 8) {
                        curLabel.text = "0/1";
                    }
                    curLabel.visible = false;
                }
            }
            let curView: AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as AchiveView;
            curView.pointTip.text = "剩余点数：" + GameConfig.defHasTalentPoint;
            GameConfig.hasTalentPoint = GameConfig.defHasTalentPoint;
            GameConfig.everyLevelArr = [{"level":1,"point":0}];
            let addtal = views.events.AddTalentView.getInstance();
            if ( addtal ){ // 如果小界面显示着就隐藏
                addtal.removeSelf();
            }
            Hash.playMusic(2);
        }

        unLock(k: number, p: number, telView: TalentChildView): void {
            for (let a: number = k; a < p; a++) {
                let curBox: Laya.Box = telView.getChildByName("coBox" + a) as Laya.Box;
                let lbStr: Laya.Label = curBox.getChildByName("lb" + a) as Laya.Label;
                let img: Laya.Image = curBox.getChildByName("img" + a) as Laya.Image;
                img.skin = "gameUI/event/talent_on.png";
                lbStr.visible = true;
                GameConfig.unlockIDArr.push(a);
            }
        }

        lock(k: number, p: number, telView: TalentChildView): void {
            for (let a: number = k; a < p; a++) {
                let curBox: Laya.Box = telView.getChildByName("coBox" + a) as Laya.Box;
                let lbStr: Laya.Label = curBox.getChildByName("lb" + a) as Laya.Label;
                let img: Laya.Image = curBox.getChildByName("img" + a) as Laya.Image;
                img.skin = "gameUI/event/talent_off.png";
                lbStr.visible = false;
                if (GameConfig.unlockIDArr.indexOf(a) != -1) {
                    GameConfig.unlockIDArr.splice(GameConfig.unlockIDArr.indexOf(a), 1);
                }
            }
        }
    }
}