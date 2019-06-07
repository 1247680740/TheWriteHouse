namespace views.player {

    import Sprite = Laya.Sprite;
    import List = Laya.List;

    export class PlayerStateInfoView extends ui.player.AuthorStateInfoUI {

        private static instance: PlayerStateInfoView;
        private curArr: Array<Object>;
        private incomeArr: Array<Object> = ResourceManager.incomeArr;
        private subJectArr: Array<string> = GameConfig.subJectArr;
        private incomeObj: Object;
        private platObj: Object;
        private everyDaySubsArr: Array<number> = new Array<number>();
        private everyDayFans: Array<number> = new Array<number>();
        private sp1: Sprite;
        private sp2: Sprite;
        private sp3: Sprite;
        static curNum: number;
        static list: Laya.List;
        private isFirstBool: Boolean = true;
        private progressArr: Array<Object> = [];
        private posArr: Array<number> = new Array<number>();
        private posArrx: Array<number> = new Array<number>();
        private tween_process: Boolean = false;
        constructor() {
            super();
        }

        public static getInstance(): PlayerStateInfoView {
            if (this.instance == null) {
                this.instance = new PlayerStateInfoView();
            }
            return this.instance;
        }

        addMousePos(event: Laya.Event): void {
            this.posArr.push(event.target.mouseY);
            this.posArrx.push(event.target.mouseX)
        }

        removePosArr(): void {
            if (this.tween_process) {
                return
            }
            var suby = this.posArr[this.posArr.length - 1] - this.posArr[0]
            var subx = this.posArrx[this.posArrx.length - 1] - this.posArrx[0]
            if (Math.abs(subx) > Math.abs(suby)) { //X偏移量大
                return
            }
            if (this.posArr[this.posArr.length - 1] > this.posArr[0]) { //向下
                if (GameConfig.barStatus == 1) {
                    this.posArr.splice(0, this.posArr.length);
                    let newY: number = PlayerStateInfoView.list.y + 190;
                    this.tween_process = true;
                    Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 1000, Laya.Ease.sineInOut, Handler.create(this, this.changePosOne));
                }
            }
            this.posArrx = [];
        }
        removePosArr1(): void {
            if (this.tween_process) {
                return
            }
            Hash.playMusic(2);
            if (GameConfig.barStatus == 2 && this.mouseY < Laya.stage.height && this.mouseY > Laya.stage.height - this.smallBg2.height) {
                this.posArr.splice(0, this.posArr.length);
                let newY: number = PlayerStateInfoView.list.y + 190;
                this.tween_process = true;
                Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 200, Laya.Ease.sineInOut, Handler.create(this, this.changePosTwo));
            }
            this.posArrx = [];
        }
        changePosOne(): void {
            GameConfig.barStatus = 2;
            this.updataSource(GameConfig.curAuthorArr);
            let newY: number = PlayerStateInfoView.list.y - 190;
            Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 200, Laya.Ease.sineInOut, Handler.create(this, this.changePosbigOne));
        }

        changePosTwo(): void {
            GameConfig.barStatus = 1;
            let newY: number = PlayerStateInfoView.list.y - 190;
            Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 800, Laya.Ease.sineInOut, Handler.create(this, this.changePosbigTwo));
            this.updataSource(GameConfig.curAuthorArr);

        }
        changePosbigOne(): void {
            this.tween_process = false;
        }
        changePosbigTwo(): void {
            this.tween_process = false;
        }
        createList(): void {
            // this.progressArr = new Array<number>();
            PlayerStateInfoView.curNum = 0;
            PlayerStateInfoView.list = new List();
            PlayerStateInfoView.list.name = "state_list";
            PlayerStateInfoView.list.itemRender = PlayerStateInfoView;
            PlayerStateInfoView.list.repeatX = 1;
            PlayerStateInfoView.list.repeatY = 1;
            PlayerStateInfoView.list.x = 0;    //(Laya.stage.width - this.width) / 2 + 180;
            PlayerStateInfoView.list.y = Laya.stage.height - this.height;         //950 - this.height / 2 - 15;
            PlayerStateInfoView.list.hScrollBarSkin = "";
            PlayerStateInfoView.list.setContentSize(600, 220);
            PlayerStateInfoView.list.scrollBar.scrollSize = 600;
            PlayerStateInfoView.list.scrollBar.thumbPercent = 1 / GameConfig.signingNum;
            PlayerStateInfoView.list.scrollBar.rollRatio = 0.1;
            PlayerStateInfoView.list.selectEnable = true;
            PlayerStateInfoView.list.zOrder = 1;
            SceneLayerManager.sceneLayer.addChild(PlayerStateInfoView.list);
            this.changeView(PlayerStateInfoView.curNum);
            PlayerStateInfoView.list.on(Laya.Event.MOUSE_DOWN, this, this.disMouse);
            PlayerStateInfoView.list.on(Laya.Event.MOUSE_UP, this, this.startMouse);
            PlayerStateInfoView.list.mouseHandler = new Handler(this, this.showSingleView);
            PlayerStateInfoView.list.scrollBar.changeHandler = new Handler(this, this.scrollChange);
            PlayerStateInfoView.list.scrollBar.on(Laya.Event.CHANGE, this, this.disMouse);
            PlayerStateInfoView.list.scrollBar.on(Laya.Event.START, this, this.startSlid);
            PlayerStateInfoView.list.scrollBar.on(Laya.Event.END, this, this.endSlid);
            PlayerStateInfoView.list.on(Laya.Event.MOUSE_MOVE, this, this.addMousePos);
            PlayerStateInfoView.list.on(Laya.Event.MOUSE_UP, this, this.removePosArr); //横向判断如果是x偏移量大就不调用removePosArr
            PlayerStateInfoView.list.on(Laya.Event.CLICK, this, this.removePosArr1);
        }

        /** 滚动条开始滚动事件 */
        startSlid(): void {
            if (this.tween_process) {
                return
            }
            GameConfig.statusSlidNum.splice(0, GameConfig.statusSlidNum.length - 1);
        }

        /** 滚动条结束滚动相关事件 */
        endSlid(): void {
            if (this.tween_process) {
                return
            }
            if (GameConfig.statusSlidNum.length > 1) {
                let one: number = GameConfig.statusSlidNum[0];
                let two: number = GameConfig.statusSlidNum[GameConfig.statusSlidNum.length - 1];
                if (one > two) {
                    if (PlayerStateInfoView.curNum > 0) {  //GameConfig.testNum
                        PlayerStateInfoView.curNum -= 1;
                        this.changeViewThree(PlayerStateInfoView.curNum);
                    }
                } else if (one < two) {
                    if (PlayerStateInfoView.curNum < GameConfig.signingNum + 1) {
                        PlayerStateInfoView.curNum += 1;
                        this.changeViewThree(PlayerStateInfoView.curNum);
                    } else {
                        this.changeViewThree(PlayerStateInfoView.curNum);
                    }
                } else {
                    this.changeViewThree(PlayerStateInfoView.curNum);
                }
            }
            GameConfig.statusSlidNum.splice(0, GameConfig.statusSlidNum.length - 1);
        }

        /** Item运动时间一（运动时间长） */
        changeView(num: number): void {
            PlayerStateInfoView.list.tweenTo(num, 200, Handler.create(this, this.startMouse));
        }

        /** Item运动时间二（运动时间短） */
        changeViewTwo(num: number): void {
            PlayerStateInfoView.list.tweenTo(num, 0.5, Handler.create(this, this.startMouse));
        }

        changeViewThree(num: number): void {
            PlayerStateInfoView.list.tweenTo(num, 200, Handler.create(this, this.startMouseThree, [num]));
        }

        startMouseThree(num: number): void {
            if (num == GameConfig.signingNum + 1) {
                PlayerStateInfoView.curNum = 1;
                this.changeViewTwo(PlayerStateInfoView.curNum);
            } else if (num == 0) {
                PlayerStateInfoView.curNum = GameConfig.signingNum;
                this.changeViewTwo(PlayerStateInfoView.curNum);
            } else {
                this.startMouse();
            }
        }

        /** 屏蔽鼠标事件 */
        disMouse(): void {
            Laya.stage.mouseEnabled = false;
            SceneLayerManager.sceneLayer.closeSceneEnable();
        }

        /** 启用鼠标事件 */
        startMouse(): void {
            PlayerStateInfoView.list.mouseEnabled = true;
            Laya.stage.mouseEnabled = true;
            SceneLayerManager.sceneLayer.openSceneEnable();
        }

        updataSource(arr: Array<Object>): void {
            PlayerStateInfoView.list.array = arr;
            PlayerStateInfoView.list.renderHandler = new Handler(this, this.upDateItem);
            this.changeView(PlayerStateInfoView.curNum);
        }

        upDateItem(cell: PlayerStateInfoView, index: number): void {
            cell.name = index + "";
            cell.setInfoData(cell.dataSource);
        }

        showSingleView(event: Laya.Event, index: number): void {
            if (event.type != "mousedown") {
                return;
            } else {
                if (event.target.name == "iconSkin") {
                    let obj: Object = PlayerStateInfoView.list.getItem(index);
                    let name: string = obj["name"];
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let singlePlayerInfoView: views.player.SinglePlayerInfoView = new views.player.SinglePlayerInfoView(name);
                    SceneLayerManager.sceneLayer.addChild(singlePlayerInfoView);
                    singlePlayerInfoView.x = (Laya.stage.width - singlePlayerInfoView.width) / 2;   //210;
                    singlePlayerInfoView.y = (Laya.stage.height - singlePlayerInfoView.height) / 2;       //200;
                    Hash.playMusic(2);
                } else {
                    return;
                }
            }
        }

        setInfoData(auObj: Object): void {
            this.incomeObj = this.getIncomeObj();
            let fansNum: number = GameConfig.fans;  //粉丝
            let platName: string = auObj["platStr"];  //获取所选平台;
            let userTotal: number = this.incomeObj["userTotal"]; //网文总用户
            let platWeightNum: number = this.getPlatWeight(platName); //获取所选平台权重
            let weightTotal: number = this.getWeightTotal();  //总权重
            let weight: number = platWeightNum / weightTotal; //平台权重比
            let people: number = auObj["peoplePro"];  //人设
            let story: number = auObj["storyPro"]; //故事
            let innovate: number = auObj["innovatePro"]; //创新
            let depth: number = auObj["depthPro"]; //深度
            let subPrice: number = this.incomeObj["subPrice"];
            let perfect: number = this.getPerfect(auObj);  //获取完美搭配
            let good: number = this.getGood(auObj);  //获取优秀搭配
            let thirtyPageNum = auObj["thirtyPageNum"];  //作者近三十天所写的章数
            let share: number = auObj["share"];

            if (!auObj.hasOwnProperty("everyDayCollectArr") && !auObj.hasOwnProperty("everyDaySubsArr") && !auObj.hasOwnProperty("everyDayIncomeArr")) {
                if (GameConfig.year != auObj["awardYear"]) {
                    auObj["awardYear"] = GameConfig.year;
                    auObj["yearCollect"] = 0;
                    auObj["yearFans"] = 0;
                    auObj["yearSubs"] = 0;
                    auObj["yearIncome"] = 0;
                }
                auObj["yearNature"] = 500;
                let everyDayCollectArr: Array<number> = new Array<number>();
                let everyDaySubsArr: Array<number> = new Array<number>();
                let everyDayIncomeArr: Array<number> = new Array<number>();

                /** 计算每日数据 */
                let ToTalCollect: number = this.countCollect(auObj, everyDayCollectArr);
                let everyDayCoolect: number = Math.floor((GameConfig.fans / 500 * (Hash.getRandomNum(8, 12) / 10) + (userTotal * weight - GameConfig.fans - ToTalCollect) / 500 * (0.8 + good * 0.1 + perfect * 0.1)) * (Hash.getRandomNum(8, 12)) - ToTalCollect * 0.01);  //每日收藏
                let everyDaySubs: number = Math.floor(ToTalCollect * 0.1 * (people + story + innovate + depth) / 400 * thirtyPageNum / 30 * (Hash.getRandomNum(8, 12) / 10)); //每日订阅  
                let everyDayInCom: number = Math.floor(everyDaySubs * subPrice);  //每日收入
                let everyDayFans: number = Math.floor(ToTalCollect / 30 * (Hash.getRandomNum(4, 12) / 10));
                /** 存储每日数据 */
                everyDayCollectArr.push(everyDayCoolect);
                everyDaySubsArr.push(everyDaySubs);
                everyDayIncomeArr.push(everyDayInCom);

                /** 上年作品的相关得分属性 */
                auObj["yearCollect"] = auObj["yearCollect"] + everyDayCoolect;
                auObj["yearFans"] = auObj["yearFans"] + everyDayFans;
                auObj["yearSubs"] = auObj["yearSubs"] + everyDaySubs;
                auObj["yearIncome"] = auObj["yearIncome"] + everyDayInCom;

                /** 重置金钱 */
                let houseReward: number = Math.floor(everyDayInCom * (1 - (share / 100))); //每日计入的公寓收入
                GameConfig.money = GameConfig.money + houseReward;
                GameConfig.gainmoney = GameConfig.gainmoney + houseReward;
                views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);

                let ToTalIncome: number = this.countIncome(auObj, everyDayIncomeArr);  //总收入
                let TotalSubs: number = this.countSubs(auObj, everyDaySubsArr);  //总订阅
                GameConfig.fans = GameConfig.fans + everyDayFans;
                views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
                this.egRate(auObj, everyDayCollectArr, everyDaySubsArr, everyDayIncomeArr);
            } else {
                let everyDayCollectArr: Array<number> = auObj["everyDayCollectArr"];
                let everyDaySubsArr: Array<number> = auObj["everyDaySubsArr"];
                let everyDayIncomeArr: Array<number> = auObj["everyDayIncomeArr"];

                let ToTalCollect: number = this.countCollect(auObj, everyDayCollectArr);  //总收藏
                let everyDayCoolect: number = Math.floor((GameConfig.fans / 500 * (Hash.getRandomNum(8, 12) / 10) + (userTotal * weight - GameConfig.fans - ToTalCollect) / 500 * (0.8 + good * 0.1 + perfect * 0.1)) * (Hash.getRandomNum(8, 12)) - ToTalCollect * 0.01);  //每日收藏
                let everyDaySubs: number = Math.floor(ToTalCollect * 0.1 * (people + story + innovate + depth) / 400 * thirtyPageNum / 30 * (Hash.getRandomNum(8, 12) / 10));  //每日订阅  
                let everyDayInCom: number = Math.floor(everyDaySubs * subPrice);  //每日收入  
                let everyDayFans: number = Math.floor(ToTalCollect / 30 * (Hash.getRandomNum(4, 12) / 10));

                everyDayCollectArr.push(everyDayCoolect);
                everyDaySubsArr.push(everyDaySubs);
                everyDayIncomeArr.push(everyDayInCom);

                if (GameConfig.year == auObj["awardYear"]) {
                    auObj["yearCollect"] = auObj["yearCollect"] + everyDayCoolect;
                    auObj["yearFans"] = auObj["yearFans"] + everyDayFans;
                    auObj["yearSubs"] = auObj["yearSubs"] + everyDaySubs;
                    auObj["yearIncome"] = auObj["yearIncome"] + everyDayInCom;
                }

                /** 重置金钱 */
                let houseReward: number = Math.floor(everyDayInCom * (1 - (share / 100))); //每日计入的公寓收入
                GameConfig.money = GameConfig.money + houseReward;
                GameConfig.gainmoney = GameConfig.gainmoney + houseReward;
                views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);

                let ToTalIncome: number = this.countIncome(auObj, everyDayIncomeArr);  //总收入
                let TotalSubs: number = this.countSubs(auObj, everyDaySubsArr);  //总订阅
                GameConfig.fans = GameConfig.fans + everyDayFans;
                views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
                this.egRate(auObj, everyDayCollectArr, everyDaySubsArr, everyDayIncomeArr);
            }
        }

        removeProObj(infoObj: Object) {
            if (this.progressArr.length > 0) {
                for (let i: number = 0; i < this.progressArr.length; i++) {
                    let obj: Object = this.progressArr[i];
                    if (obj["name"] == infoObj["name"]) {
                        this.progressArr.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        egRate(infoObj: Object, everyDayCollectArr: Array<number>, everyDaySubsArr: Array<number>, everyDayIncomeArr: Array<number>): void {
            while (everyDayCollectArr.length > 8) {
                everyDayCollectArr = this.unshiftArr(everyDayCollectArr);
            }
            while (everyDaySubsArr.length > 8) {
                everyDaySubsArr = this.unshiftArr(everyDaySubsArr);
            }
            while (everyDayIncomeArr.length > 8) {
                everyDayIncomeArr = this.unshiftArr(everyDayIncomeArr);
            }
            infoObj["everyDayCollectArr"] = everyDayCollectArr;
            infoObj["everyDaySubsArr"] = everyDaySubsArr;
            infoObj["everyDayIncomeArr"] = everyDayIncomeArr;
            let everyDayCollectPosArr: Array<number> = this.getPosArr(everyDayCollectArr);
            let everyDaySubsPosArr: Array<number> = this.getPosArr(everyDaySubsArr);
            let everyDayIncomePosArr: Array<number> = this.getPosArr(everyDayIncomeArr);
            infoObj["everyDayCollectPosArr"] = everyDayCollectPosArr;
            infoObj["everyDaySubsPosArr"] = everyDaySubsPosArr;
            infoObj["everyDayIncomePosArr"] = everyDayIncomePosArr;

            for (let j: number = 0; j < GameConfig.authorInfoArr.length; j++) {
                let lineObj: Object = GameConfig.authorInfoArr[j];
                if (lineObj["name"] == infoObj["name"]) {
                    lineObj["everyDayCollectPosArr"] = everyDayCollectPosArr;
                    lineObj["everyDaySubsPosArr"] = everyDaySubsPosArr;
                    lineObj["everyDayIncomePosArr"] = everyDayIncomePosArr;
                }
            }
            // this.removeLines();
            // this.sp1 = this.createSpg(this.sp1, "spg1");
            // this.sp2 = this.createSpg(this.sp2, "spg2");
            // this.sp3 = this.createSpg(this.sp3, "spg3");
            // this.sp1.graphics.drawLines(195, 90, everyDayCollectPosArr, "#FF5F60", 5);
            // this.sp2.graphics.drawLines(195, 60, everyDaySubsPosArr, "#EEEE00", 5);
            // this.sp3.graphics.drawLines(195, 60, everyDayIncomePosArr, "#7EC0EE", 5);
        }

        /** 计算总收藏 */
        countCollect(infoObj: Object, collectArr: Array<number>): number {
            if (collectArr.length < 1) {
                infoObj["totalCollect"] = infoObj["totalCollect"];
                return infoObj["totalCollect"];
            } else {
                let everyCollect: number = collectArr[collectArr.length - 1];
                infoObj["totalCollect"] = infoObj["totalCollect"] + everyCollect;
                for (let i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let authorObj: Object = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == infoObj["name"]) {
                        authorObj["totalCollect"] = infoObj["totalCollect"];
                        return infoObj["totalCollect"];
                    }
                }
            }
        }

        /** 计算总订阅 */
        countSubs(infoObj: Object, subsArr: Array<number>): number {
            if (subsArr.length < 1) {
                infoObj["totalSubs"] = infoObj["totalSubs"];
                return infoObj["totalSubs"];
            } else {
                let everySubs: number = subsArr[subsArr.length - 1];
                infoObj["totalSubs"] = infoObj["totalSubs"] + everySubs;
                for (let i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let authorObj: Object = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == infoObj["name"]) {
                        authorObj["totalSubs"] = infoObj["totalSubs"];
                        return infoObj["totalSubs"];
                    }
                }
            }
        }

        /** 计算总收入 */
        countIncome(infoObj: Object, incomeArr: Array<number>): number {
            let everyIncome: number = incomeArr[incomeArr.length - 1];
            infoObj["totalIncom"] = infoObj["totalIncom"] + everyIncome;
            for (let i = 0; i < GameConfig.authorInfoArr.length; i++) {
                let authorObj: Object = GameConfig.authorInfoArr[i];
                if (authorObj["name"] == infoObj["name"]) {
                    authorObj["totalIncome"] = infoObj["totalIncom"];
                }
            }
            return infoObj["totalIncom"];
        }

        getPerfect(infoObj: Object): number {
            let perfect: number = 0;
            let perfectArr: Array<number>;
            for (let m: number = 0; m < ResourceManager.holeArr.length; m++) {
                let holeObj: Object = ResourceManager.holeArr[m];
                if (holeObj["theme"] == infoObj["subStr"]) {
                    perfectArr = holeObj["perfect"];
                }
            }
            for (let index: number = 0; index < GameConfig.authorInfoArr.length; index++) {
                let auObj: Object = GameConfig.authorInfoArr[index];
                if (auObj["name"] == infoObj["name"]) {
                    let eleIdArr: Array<number> = auObj["eleIdArr"];
                    for (let p: number = 0; p < eleIdArr.length; p++) {
                        let id: number = eleIdArr[p];
                        if (perfectArr.indexOf(id) != -1) {
                            perfect = 2;
                        }
                    }
                }
            }
            return perfect;
        }

        getGood(infoObj: Object): number {
            let goodNum: number = 0;
            let goodArr: Array<number>;
            for (let m: number = 0; m < ResourceManager.holeArr.length; m++) {
                let holeObj: Object = ResourceManager.holeArr[m];
                if (holeObj["theme"] == infoObj["subStr"]) {
                    goodArr = holeObj["wonderful"];
                }
            }
            for (let index: number = 0; index < GameConfig.authorInfoArr.length; index++) {
                let auObj: Object = GameConfig.authorInfoArr[index];
                if (auObj["name"] == infoObj["name"]) {
                    let eleIdArr: Array<number> = auObj["eleIdArr"];
                    for (let p: number = 0; p < eleIdArr.length; p++) {
                        let id: number = eleIdArr[p];
                        if (goodArr.indexOf(id) != -1) {
                            goodNum = 1;
                        }
                    }
                }
            }
            return goodNum;
        }


        /** 滚动条变化事件 */
        scrollChange(value: number): void {
            GameConfig.statusSlidNum.push(value);
        }

        /** 移除自己 */
        removeObj(): void {
            SceneLayerManager.sceneLayer.removeChildByName("state_list");
        }

        /** 发布信息隐藏 */
        hideInfo(): void {
            this.TopBg.visible = true;
            this.iconBg.visible = true;
            this.iconSkin.visible = true;
            this.nameStr.visible = true;
            this.bgBig.visible = true;
            this.statusName.visible = true;
            this.progressValue.visible = true;
            this.bgTop.visible = false;
            this.bgBottom.visible = false;
            this.pageName.visible = false;
            this.orangePoint.visible = false;
            this.yellowPoint.visible = false;
            this.bluePoint.visible = false;
            this.collecLabel.visible = false;
            this.subsLabel.visible = false;
            this.fansLabel.visible = false;
            this.smallBg1.visible = false;
            this.smallBg2.visible = false;
            this.smallName.visible = false;
            this.smallPage.visible = false;
            this.smallStatus.visible = false;
        }

        /** 进度信息隐藏 */
        hideProInfo(): void {
            this.TopBg.visible = true;
            this.iconBg.visible = true;
            this.iconSkin.visible = true;
            this.nameStr.visible = true;
            this.bgBig.visible = false;
            this.statusName.visible = false;
            this.progressValue.visible = false;
            this.bgTop.visible = true;
            this.bgBottom.visible = true;
            this.pageName.visible = true;
            this.orangePoint.visible = true;
            this.yellowPoint.visible = true;
            this.bluePoint.visible = true;
            this.collecLabel.visible = true;
            this.subsLabel.visible = true;
            this.fansLabel.visible = true;
            this.smallBg1.visible = false;
            this.smallBg2.visible = false;
            this.smallName.visible = false;
            this.smallPage.visible = false;
            this.smallStatus.visible = false;
        }

        /** 隐藏大部分内容 */
        hideAllInfo(): void {
            this.TopBg.visible = false;
            this.iconBg.visible = false;
            this.bgBig.visible = false;
            this.bgTop.visible = false;
            this.bgBottom.visible = false;
            this.iconSkin.visible = false;
            this.nameStr.visible = false;
            this.statusName.visible = false;
            this.progressValue.visible = false;
            this.pageName.visible = false;
            this.orangePoint.visible = false;
            this.collecLabel.visible = false;
            this.yellowPoint.visible = false;
            this.subsLabel.visible = false;
            this.bluePoint.visible = false;
            this.fansLabel.visible = false;
            this.smallBg1.visible = true;
            this.smallBg2.visible = true;
            this.smallName.visible = true;
            this.smallPage.visible = true;
            this.smallStatus.visible = true;
        }

        /** 隐藏部分 */
        hideDemo(): void {
            this.smallBg1.visible = false;
            this.smallBg2.visible = false;
            this.smallName.visible = false;
            this.smallPage.visible = false;
            this.smallStatus.visible = false;
        }

        /** 获取当前收入信息 */
        getIncomeObj(): Object {
            let year: number = GameConfig.year;
            for (let i: number = 0; i < this.incomeArr.length; i++) {
                let getIncomeObj: Object = this.incomeArr[i];
                if (getIncomeObj["year"] == year) {
                    return getIncomeObj;
                }
            }
        }

        /** 获取作者所选平台名称 */
        getPlatName(obj: Object): string {
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let infoObj: Object = GameConfig.authorInfoArr[i];
                if (obj["name"] == infoObj["name"]) {
                    return infoObj["plat"];
                }
            }
        }

        /** 获取所选平台单独对象 */
        getPlatObj(platName: string): Object {
            for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                let getPlatOBj: Object = GameConfig.platGuDingArr[j];
                if (getPlatOBj["net"] == platName) {
                    return getPlatOBj;
                }
            }
        }

        /** 获取所选平台权重 */
        getPlatWeight(platName: string): number {
            for (let i: number = 0; i < GameConfig.platGuDingArr.length; i++) {
                let obj: Object = GameConfig.platGuDingArr[i];
                if (obj["net"] == platName) {
                    return obj["weight"];
                }
            }
        }

        /** 获取总的权重数量 */
        getWeightTotal(): number {
            let weight: number = 0;
            for (var j = 0; j < GameConfig.platArr.length; j++) {
                let getPlatOBj: Object = GameConfig.platArr[j];
                // if (getPlatOBj["unlock"] == 1) {
                weight = weight + getPlatOBj["weight"]
                // }
            }
            return weight;
        }

        /** 获取题材加成 */
        getSubBuffStr(subArr: Array<number>): string {
            let buffStr: string = "";
            for (let i: number = 0; i < subArr.length; i++) {
                let index: number = subArr[i];
                for (let j: number = 0; j < this.subJectArr.length; j++) {
                    if (j == index) {
                        buffStr = buffStr + this.subJectArr[j]
                    }
                }
            }
            return buffStr;

        }

        /** 题材加成 */
        judgeStr(subBuffStr: string, subStr: string): number {
            if (subBuffStr.indexOf(subStr) != -1) {
                return 1;
            } else {
                return 0;
            }
        }

        /** 获取所选题材 */
        getSubStr(obj: Object): string {
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let InfoObj: Object = GameConfig.authorInfoArr[i];
                if (InfoObj["name"] == obj["name"]) {
                    return InfoObj["subStr"];
                }
            }
        }

        unshiftArr(arr: Array<number>): Array<number> {
            arr.splice(0, 1);
            return arr;
        }

        getPosArr(arr: Array<number>): Array<number> {
            var maxNum = Math.max.apply(null, arr);
            let posArr: Array<number> = new Array<number>();
            for (let i: number = 0; i < arr.length; i++) {
                let x: number = i * 50;
                let y: number = 50 + 10 + (1 - arr[i] / maxNum) * 120;
                posArr.push(x);
                posArr.push(y);
            }
            return posArr;
        }

        /** 获取每日收藏天赋加成 */
        getCollectSub(): number {
            let levelArr: Array<number> = [];
            levelArr.splice(0, levelArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                levelArr.push(everyObj["level"]);
            }
            if (levelArr.indexOf(2) != -1) {
                for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                    let everyObj: Object = GameConfig.everyLevelArr[i];
                    let curNum: number = everyObj["point"];
                    if (everyObj["level"] == 2) {
                        if (curNum == 1) {
                            return 1.01;
                        } else if (curNum == 2) {
                            return 1.02;
                        } else if (curNum == 3) {
                            return 1.03;
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        /** 获取每日订阅天赋加成 */
        getScripSub(rateNum: number): number {
            let levelArr: Array<number> = [];
            levelArr.splice(0, levelArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                levelArr.push(everyObj["level"]);
            }
            if (levelArr.indexOf(rateNum) != -1) {
                for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                    let everyObj: Object = GameConfig.everyLevelArr[i];
                    let curNum: number = everyObj["point"];
                    if (everyObj["level"] == rateNum) {
                        if (curNum == 1) {
                            return 1.01;
                        } else if (curNum == 2) {
                            return 1.02;
                        } else if (curNum == 3) {
                            return 1.03;
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        /** 获取每日收入天赋加成 */
        getIncomeRate(rateNum: number): number {
            let levelArr: Array<number> = [];
            levelArr.splice(0, levelArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                levelArr.push(everyObj["level"]);
            }
            if (levelArr.indexOf(rateNum) != -1) {
                for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                    let everyObj: Object = GameConfig.everyLevelArr[i];
                    let curNum: number = everyObj["point"];
                    if (everyObj["level"] == rateNum) {
                        if (curNum == 1) {
                            return 1.2;
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        createSpg(sp: Sprite, nameStr: string): Sprite {
            this.removeChildByName(nameStr);
            sp = new Sprite();
            sp.name = nameStr;
            this.addChild(sp);
            return sp;
        }

        removeLines(): void {
            this.removeChildByName("spg1");
            this.removeChildByName("spg2");
            this.removeChildByName("spg3");
        }

        setValue(): void {
            this.progressValue.skin = "../laya/assets/gameUI/AuthorData/progress.png";
            this.progressValue.value = 1;
        }
    }
}