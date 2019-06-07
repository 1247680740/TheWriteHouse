var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var player;
    (function (player) {
        var Sprite = Laya.Sprite;
        var List = Laya.List;
        var PlayerStateInfoView = /** @class */ (function (_super) {
            __extends(PlayerStateInfoView, _super);
            function PlayerStateInfoView() {
                var _this = _super.call(this) || this;
                _this.incomeArr = ResourceManager.incomeArr;
                _this.subJectArr = GameConfig.subJectArr;
                _this.everyDaySubsArr = new Array();
                _this.everyDayFans = new Array();
                _this.isFirstBool = true;
                _this.progressArr = [];
                _this.posArr = new Array();
                _this.posArrx = new Array();
                _this.tween_process = false;
                return _this;
            }
            PlayerStateInfoView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new PlayerStateInfoView();
                }
                return this.instance;
            };
            PlayerStateInfoView.prototype.addMousePos = function (event) {
                this.posArr.push(event.target.mouseY);
                this.posArrx.push(event.target.mouseX);
            };
            PlayerStateInfoView.prototype.removePosArr = function () {
                if (this.tween_process) {
                    return;
                }
                var suby = this.posArr[this.posArr.length - 1] - this.posArr[0];
                var subx = this.posArrx[this.posArrx.length - 1] - this.posArrx[0];
                if (Math.abs(subx) > Math.abs(suby)) {
                    return;
                }
                if (this.posArr[this.posArr.length - 1] > this.posArr[0]) {
                    if (GameConfig.barStatus == 1) {
                        this.posArr.splice(0, this.posArr.length);
                        var newY = PlayerStateInfoView.list.y + 190;
                        this.tween_process = true;
                        Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 1000, Laya.Ease.sineInOut, Handler.create(this, this.changePosOne));
                    }
                }
                this.posArrx = [];
            };
            PlayerStateInfoView.prototype.removePosArr1 = function () {
                if (this.tween_process) {
                    return;
                }
                Hash.playMusic(2);
                if (GameConfig.barStatus == 2 && this.mouseY < Laya.stage.height && this.mouseY > Laya.stage.height - this.smallBg2.height) {
                    this.posArr.splice(0, this.posArr.length);
                    var newY = PlayerStateInfoView.list.y + 190;
                    this.tween_process = true;
                    Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 200, Laya.Ease.sineInOut, Handler.create(this, this.changePosTwo));
                }
                this.posArrx = [];
            };
            PlayerStateInfoView.prototype.changePosOne = function () {
                GameConfig.barStatus = 2;
                this.updataSource(GameConfig.curAuthorArr);
                var newY = PlayerStateInfoView.list.y - 190;
                Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 200, Laya.Ease.sineInOut, Handler.create(this, this.changePosbigOne));
            };
            PlayerStateInfoView.prototype.changePosTwo = function () {
                GameConfig.barStatus = 1;
                var newY = PlayerStateInfoView.list.y - 190;
                Laya.Tween.to(PlayerStateInfoView.list, { y: newY }, 800, Laya.Ease.sineInOut, Handler.create(this, this.changePosbigTwo));
                this.updataSource(GameConfig.curAuthorArr);
            };
            PlayerStateInfoView.prototype.changePosbigOne = function () {
                this.tween_process = false;
            };
            PlayerStateInfoView.prototype.changePosbigTwo = function () {
                this.tween_process = false;
            };
            PlayerStateInfoView.prototype.createList = function () {
                // this.progressArr = new Array<number>();
                PlayerStateInfoView.curNum = 0;
                PlayerStateInfoView.list = new List();
                PlayerStateInfoView.list.name = "state_list";
                PlayerStateInfoView.list.itemRender = PlayerStateInfoView;
                PlayerStateInfoView.list.repeatX = 1;
                PlayerStateInfoView.list.repeatY = 1;
                PlayerStateInfoView.list.x = 0; //(Laya.stage.width - this.width) / 2 + 180;
                PlayerStateInfoView.list.y = Laya.stage.height - this.height; //950 - this.height / 2 - 15;
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
            };
            /** 滚动条开始滚动事件 */
            PlayerStateInfoView.prototype.startSlid = function () {
                if (this.tween_process) {
                    return;
                }
                GameConfig.statusSlidNum.splice(0, GameConfig.statusSlidNum.length - 1);
            };
            /** 滚动条结束滚动相关事件 */
            PlayerStateInfoView.prototype.endSlid = function () {
                if (this.tween_process) {
                    return;
                }
                if (GameConfig.statusSlidNum.length > 1) {
                    var one = GameConfig.statusSlidNum[0];
                    var two = GameConfig.statusSlidNum[GameConfig.statusSlidNum.length - 1];
                    if (one > two) {
                        if (PlayerStateInfoView.curNum > 0) {
                            PlayerStateInfoView.curNum -= 1;
                            this.changeViewThree(PlayerStateInfoView.curNum);
                        }
                    }
                    else if (one < two) {
                        if (PlayerStateInfoView.curNum < GameConfig.signingNum + 1) {
                            PlayerStateInfoView.curNum += 1;
                            this.changeViewThree(PlayerStateInfoView.curNum);
                        }
                        else {
                            this.changeViewThree(PlayerStateInfoView.curNum);
                        }
                    }
                    else {
                        this.changeViewThree(PlayerStateInfoView.curNum);
                    }
                }
                GameConfig.statusSlidNum.splice(0, GameConfig.statusSlidNum.length - 1);
            };
            /** Item运动时间一（运动时间长） */
            PlayerStateInfoView.prototype.changeView = function (num) {
                PlayerStateInfoView.list.tweenTo(num, 200, Handler.create(this, this.startMouse));
            };
            /** Item运动时间二（运动时间短） */
            PlayerStateInfoView.prototype.changeViewTwo = function (num) {
                PlayerStateInfoView.list.tweenTo(num, 0.5, Handler.create(this, this.startMouse));
            };
            PlayerStateInfoView.prototype.changeViewThree = function (num) {
                PlayerStateInfoView.list.tweenTo(num, 200, Handler.create(this, this.startMouseThree, [num]));
            };
            PlayerStateInfoView.prototype.startMouseThree = function (num) {
                if (num == GameConfig.signingNum + 1) {
                    PlayerStateInfoView.curNum = 1;
                    this.changeViewTwo(PlayerStateInfoView.curNum);
                }
                else if (num == 0) {
                    PlayerStateInfoView.curNum = GameConfig.signingNum;
                    this.changeViewTwo(PlayerStateInfoView.curNum);
                }
                else {
                    this.startMouse();
                }
            };
            /** 屏蔽鼠标事件 */
            PlayerStateInfoView.prototype.disMouse = function () {
                Laya.stage.mouseEnabled = false;
                SceneLayerManager.sceneLayer.closeSceneEnable();
            };
            /** 启用鼠标事件 */
            PlayerStateInfoView.prototype.startMouse = function () {
                PlayerStateInfoView.list.mouseEnabled = true;
                Laya.stage.mouseEnabled = true;
                SceneLayerManager.sceneLayer.openSceneEnable();
            };
            PlayerStateInfoView.prototype.updataSource = function (arr) {
                PlayerStateInfoView.list.array = arr;
                PlayerStateInfoView.list.renderHandler = new Handler(this, this.upDateItem);
                this.changeView(PlayerStateInfoView.curNum);
            };
            PlayerStateInfoView.prototype.upDateItem = function (cell, index) {
                cell.name = index + "";
                cell.setInfoData(cell.dataSource);
            };
            PlayerStateInfoView.prototype.showSingleView = function (event, index) {
                if (event.type != "mousedown") {
                    return;
                }
                else {
                    if (event.target.name == "iconSkin") {
                        var obj = PlayerStateInfoView.list.getItem(index);
                        var name_1 = obj["name"];
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        var singlePlayerInfoView = new views.player.SinglePlayerInfoView(name_1);
                        SceneLayerManager.sceneLayer.addChild(singlePlayerInfoView);
                        singlePlayerInfoView.x = (Laya.stage.width - singlePlayerInfoView.width) / 2; //210;
                        singlePlayerInfoView.y = (Laya.stage.height - singlePlayerInfoView.height) / 2; //200;
                        Hash.playMusic(2);
                    }
                    else {
                        return;
                    }
                }
            };
            PlayerStateInfoView.prototype.setInfoData = function (auObj) {
                this.incomeObj = this.getIncomeObj();
                var fansNum = GameConfig.fans; //粉丝
                var platName = auObj["platStr"]; //获取所选平台;
                var userTotal = this.incomeObj["userTotal"]; //网文总用户
                var platWeightNum = this.getPlatWeight(platName); //获取所选平台权重
                var weightTotal = this.getWeightTotal(); //总权重
                var weight = platWeightNum / weightTotal; //平台权重比
                var people = auObj["peoplePro"]; //人设
                var story = auObj["storyPro"]; //故事
                var innovate = auObj["innovatePro"]; //创新
                var depth = auObj["depthPro"]; //深度
                var subPrice = this.incomeObj["subPrice"];
                var perfect = this.getPerfect(auObj); //获取完美搭配
                var good = this.getGood(auObj); //获取优秀搭配
                var thirtyPageNum = auObj["thirtyPageNum"]; //作者近三十天所写的章数
                var share = auObj["share"];
                if (!auObj.hasOwnProperty("everyDayCollectArr") && !auObj.hasOwnProperty("everyDaySubsArr") && !auObj.hasOwnProperty("everyDayIncomeArr")) {
                    if (GameConfig.year != auObj["awardYear"]) {
                        auObj["awardYear"] = GameConfig.year;
                        auObj["yearCollect"] = 0;
                        auObj["yearFans"] = 0;
                        auObj["yearSubs"] = 0;
                        auObj["yearIncome"] = 0;
                    }
                    auObj["yearNature"] = 500;
                    var everyDayCollectArr = new Array();
                    var everyDaySubsArr = new Array();
                    var everyDayIncomeArr = new Array();
                    /** 计算每日数据 */
                    var ToTalCollect = this.countCollect(auObj, everyDayCollectArr);
                    var everyDayCoolect = Math.floor((GameConfig.fans / 500 * (Hash.getRandomNum(8, 12) / 10) + (userTotal * weight - GameConfig.fans - ToTalCollect) / 500 * (0.8 + good * 0.1 + perfect * 0.1)) * (Hash.getRandomNum(8, 12)) - ToTalCollect * 0.01); //每日收藏
                    var everyDaySubs = Math.floor(ToTalCollect * 0.1 * (people + story + innovate + depth) / 400 * thirtyPageNum / 30 * (Hash.getRandomNum(8, 12) / 10)); //每日订阅  
                    var everyDayInCom = Math.floor(everyDaySubs * subPrice); //每日收入
                    var everyDayFans = Math.floor(ToTalCollect / 30 * (Hash.getRandomNum(4, 12) / 10));
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
                    var houseReward = Math.floor(everyDayInCom * (1 - (share / 100))); //每日计入的公寓收入
                    GameConfig.money = GameConfig.money + houseReward;
                    GameConfig.gainmoney = GameConfig.gainmoney + houseReward;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    var ToTalIncome = this.countIncome(auObj, everyDayIncomeArr); //总收入
                    var TotalSubs = this.countSubs(auObj, everyDaySubsArr); //总订阅
                    GameConfig.fans = GameConfig.fans + everyDayFans;
                    views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
                    this.egRate(auObj, everyDayCollectArr, everyDaySubsArr, everyDayIncomeArr);
                }
                else {
                    var everyDayCollectArr = auObj["everyDayCollectArr"];
                    var everyDaySubsArr = auObj["everyDaySubsArr"];
                    var everyDayIncomeArr = auObj["everyDayIncomeArr"];
                    var ToTalCollect = this.countCollect(auObj, everyDayCollectArr); //总收藏
                    var everyDayCoolect = Math.floor((GameConfig.fans / 500 * (Hash.getRandomNum(8, 12) / 10) + (userTotal * weight - GameConfig.fans - ToTalCollect) / 500 * (0.8 + good * 0.1 + perfect * 0.1)) * (Hash.getRandomNum(8, 12)) - ToTalCollect * 0.01); //每日收藏
                    var everyDaySubs = Math.floor(ToTalCollect * 0.1 * (people + story + innovate + depth) / 400 * thirtyPageNum / 30 * (Hash.getRandomNum(8, 12) / 10)); //每日订阅  
                    var everyDayInCom = Math.floor(everyDaySubs * subPrice); //每日收入  
                    var everyDayFans = Math.floor(ToTalCollect / 30 * (Hash.getRandomNum(4, 12) / 10));
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
                    var houseReward = Math.floor(everyDayInCom * (1 - (share / 100))); //每日计入的公寓收入
                    GameConfig.money = GameConfig.money + houseReward;
                    GameConfig.gainmoney = GameConfig.gainmoney + houseReward;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    var ToTalIncome = this.countIncome(auObj, everyDayIncomeArr); //总收入
                    var TotalSubs = this.countSubs(auObj, everyDaySubsArr); //总订阅
                    GameConfig.fans = GameConfig.fans + everyDayFans;
                    views.toolbar.TopToolBarView.getInstance().resetFans(GameConfig.fans);
                    this.egRate(auObj, everyDayCollectArr, everyDaySubsArr, everyDayIncomeArr);
                }
            };
            PlayerStateInfoView.prototype.removeProObj = function (infoObj) {
                if (this.progressArr.length > 0) {
                    for (var i = 0; i < this.progressArr.length; i++) {
                        var obj = this.progressArr[i];
                        if (obj["name"] == infoObj["name"]) {
                            this.progressArr.splice(i, 1);
                            i--;
                        }
                    }
                }
            };
            PlayerStateInfoView.prototype.egRate = function (infoObj, everyDayCollectArr, everyDaySubsArr, everyDayIncomeArr) {
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
                var everyDayCollectPosArr = this.getPosArr(everyDayCollectArr);
                var everyDaySubsPosArr = this.getPosArr(everyDaySubsArr);
                var everyDayIncomePosArr = this.getPosArr(everyDayIncomeArr);
                infoObj["everyDayCollectPosArr"] = everyDayCollectPosArr;
                infoObj["everyDaySubsPosArr"] = everyDaySubsPosArr;
                infoObj["everyDayIncomePosArr"] = everyDayIncomePosArr;
                for (var j = 0; j < GameConfig.authorInfoArr.length; j++) {
                    var lineObj = GameConfig.authorInfoArr[j];
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
            };
            /** 计算总收藏 */
            PlayerStateInfoView.prototype.countCollect = function (infoObj, collectArr) {
                if (collectArr.length < 1) {
                    infoObj["totalCollect"] = infoObj["totalCollect"];
                    return infoObj["totalCollect"];
                }
                else {
                    var everyCollect = collectArr[collectArr.length - 1];
                    infoObj["totalCollect"] = infoObj["totalCollect"] + everyCollect;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == infoObj["name"]) {
                            authorObj["totalCollect"] = infoObj["totalCollect"];
                            return infoObj["totalCollect"];
                        }
                    }
                }
            };
            /** 计算总订阅 */
            PlayerStateInfoView.prototype.countSubs = function (infoObj, subsArr) {
                if (subsArr.length < 1) {
                    infoObj["totalSubs"] = infoObj["totalSubs"];
                    return infoObj["totalSubs"];
                }
                else {
                    var everySubs = subsArr[subsArr.length - 1];
                    infoObj["totalSubs"] = infoObj["totalSubs"] + everySubs;
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var authorObj = GameConfig.authorInfoArr[i];
                        if (authorObj["name"] == infoObj["name"]) {
                            authorObj["totalSubs"] = infoObj["totalSubs"];
                            return infoObj["totalSubs"];
                        }
                    }
                }
            };
            /** 计算总收入 */
            PlayerStateInfoView.prototype.countIncome = function (infoObj, incomeArr) {
                var everyIncome = incomeArr[incomeArr.length - 1];
                infoObj["totalIncom"] = infoObj["totalIncom"] + everyIncome;
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == infoObj["name"]) {
                        authorObj["totalIncome"] = infoObj["totalIncom"];
                    }
                }
                return infoObj["totalIncom"];
            };
            PlayerStateInfoView.prototype.getPerfect = function (infoObj) {
                var perfect = 0;
                var perfectArr;
                for (var m = 0; m < ResourceManager.holeArr.length; m++) {
                    var holeObj = ResourceManager.holeArr[m];
                    if (holeObj["theme"] == infoObj["subStr"]) {
                        perfectArr = holeObj["perfect"];
                    }
                }
                for (var index = 0; index < GameConfig.authorInfoArr.length; index++) {
                    var auObj = GameConfig.authorInfoArr[index];
                    if (auObj["name"] == infoObj["name"]) {
                        var eleIdArr = auObj["eleIdArr"];
                        for (var p = 0; p < eleIdArr.length; p++) {
                            var id = eleIdArr[p];
                            if (perfectArr.indexOf(id) != -1) {
                                perfect = 2;
                            }
                        }
                    }
                }
                return perfect;
            };
            PlayerStateInfoView.prototype.getGood = function (infoObj) {
                var goodNum = 0;
                var goodArr;
                for (var m = 0; m < ResourceManager.holeArr.length; m++) {
                    var holeObj = ResourceManager.holeArr[m];
                    if (holeObj["theme"] == infoObj["subStr"]) {
                        goodArr = holeObj["wonderful"];
                    }
                }
                for (var index = 0; index < GameConfig.authorInfoArr.length; index++) {
                    var auObj = GameConfig.authorInfoArr[index];
                    if (auObj["name"] == infoObj["name"]) {
                        var eleIdArr = auObj["eleIdArr"];
                        for (var p = 0; p < eleIdArr.length; p++) {
                            var id = eleIdArr[p];
                            if (goodArr.indexOf(id) != -1) {
                                goodNum = 1;
                            }
                        }
                    }
                }
                return goodNum;
            };
            /** 滚动条变化事件 */
            PlayerStateInfoView.prototype.scrollChange = function (value) {
                GameConfig.statusSlidNum.push(value);
            };
            /** 移除自己 */
            PlayerStateInfoView.prototype.removeObj = function () {
                SceneLayerManager.sceneLayer.removeChildByName("state_list");
            };
            /** 发布信息隐藏 */
            PlayerStateInfoView.prototype.hideInfo = function () {
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
            };
            /** 进度信息隐藏 */
            PlayerStateInfoView.prototype.hideProInfo = function () {
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
            };
            /** 隐藏大部分内容 */
            PlayerStateInfoView.prototype.hideAllInfo = function () {
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
            };
            /** 隐藏部分 */
            PlayerStateInfoView.prototype.hideDemo = function () {
                this.smallBg1.visible = false;
                this.smallBg2.visible = false;
                this.smallName.visible = false;
                this.smallPage.visible = false;
                this.smallStatus.visible = false;
            };
            /** 获取当前收入信息 */
            PlayerStateInfoView.prototype.getIncomeObj = function () {
                var year = GameConfig.year;
                for (var i = 0; i < this.incomeArr.length; i++) {
                    var getIncomeObj = this.incomeArr[i];
                    if (getIncomeObj["year"] == year) {
                        return getIncomeObj;
                    }
                }
            };
            /** 获取作者所选平台名称 */
            PlayerStateInfoView.prototype.getPlatName = function (obj) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var infoObj = GameConfig.authorInfoArr[i];
                    if (obj["name"] == infoObj["name"]) {
                        return infoObj["plat"];
                    }
                }
            };
            /** 获取所选平台单独对象 */
            PlayerStateInfoView.prototype.getPlatObj = function (platName) {
                for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                    var getPlatOBj = GameConfig.platGuDingArr[j];
                    if (getPlatOBj["net"] == platName) {
                        return getPlatOBj;
                    }
                }
            };
            /** 获取所选平台权重 */
            PlayerStateInfoView.prototype.getPlatWeight = function (platName) {
                for (var i = 0; i < GameConfig.platGuDingArr.length; i++) {
                    var obj = GameConfig.platGuDingArr[i];
                    if (obj["net"] == platName) {
                        return obj["weight"];
                    }
                }
            };
            /** 获取总的权重数量 */
            PlayerStateInfoView.prototype.getWeightTotal = function () {
                var weight = 0;
                for (var j = 0; j < GameConfig.platArr.length; j++) {
                    var getPlatOBj = GameConfig.platArr[j];
                    // if (getPlatOBj["unlock"] == 1) {
                    weight = weight + getPlatOBj["weight"];
                    // }
                }
                return weight;
            };
            /** 获取题材加成 */
            PlayerStateInfoView.prototype.getSubBuffStr = function (subArr) {
                var buffStr = "";
                for (var i = 0; i < subArr.length; i++) {
                    var index = subArr[i];
                    for (var j = 0; j < this.subJectArr.length; j++) {
                        if (j == index) {
                            buffStr = buffStr + this.subJectArr[j];
                        }
                    }
                }
                return buffStr;
            };
            /** 题材加成 */
            PlayerStateInfoView.prototype.judgeStr = function (subBuffStr, subStr) {
                if (subBuffStr.indexOf(subStr) != -1) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            /** 获取所选题材 */
            PlayerStateInfoView.prototype.getSubStr = function (obj) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var InfoObj = GameConfig.authorInfoArr[i];
                    if (InfoObj["name"] == obj["name"]) {
                        return InfoObj["subStr"];
                    }
                }
            };
            PlayerStateInfoView.prototype.unshiftArr = function (arr) {
                arr.splice(0, 1);
                return arr;
            };
            PlayerStateInfoView.prototype.getPosArr = function (arr) {
                var maxNum = Math.max.apply(null, arr);
                var posArr = new Array();
                for (var i = 0; i < arr.length; i++) {
                    var x = i * 50;
                    var y = 50 + 10 + (1 - arr[i] / maxNum) * 120;
                    posArr.push(x);
                    posArr.push(y);
                }
                return posArr;
            };
            /** 获取每日收藏天赋加成 */
            PlayerStateInfoView.prototype.getCollectSub = function () {
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(2) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum = everyObj["point"];
                        if (everyObj["level"] == 2) {
                            if (curNum == 1) {
                                return 1.01;
                            }
                            else if (curNum == 2) {
                                return 1.02;
                            }
                            else if (curNum == 3) {
                                return 1.03;
                            }
                            else {
                                return 1;
                            }
                        }
                    }
                }
                else {
                    return 1;
                }
            };
            /** 获取每日订阅天赋加成 */
            PlayerStateInfoView.prototype.getScripSub = function (rateNum) {
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(rateNum) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum = everyObj["point"];
                        if (everyObj["level"] == rateNum) {
                            if (curNum == 1) {
                                return 1.01;
                            }
                            else if (curNum == 2) {
                                return 1.02;
                            }
                            else if (curNum == 3) {
                                return 1.03;
                            }
                            else {
                                return 1;
                            }
                        }
                    }
                }
                else {
                    return 1;
                }
            };
            /** 获取每日收入天赋加成 */
            PlayerStateInfoView.prototype.getIncomeRate = function (rateNum) {
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(rateNum) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum = everyObj["point"];
                        if (everyObj["level"] == rateNum) {
                            if (curNum == 1) {
                                return 1.2;
                            }
                            else {
                                return 1;
                            }
                        }
                    }
                }
                else {
                    return 1;
                }
            };
            PlayerStateInfoView.prototype.createSpg = function (sp, nameStr) {
                this.removeChildByName(nameStr);
                sp = new Sprite();
                sp.name = nameStr;
                this.addChild(sp);
                return sp;
            };
            PlayerStateInfoView.prototype.removeLines = function () {
                this.removeChildByName("spg1");
                this.removeChildByName("spg2");
                this.removeChildByName("spg3");
            };
            PlayerStateInfoView.prototype.setValue = function () {
                this.progressValue.skin = "../laya/assets/gameUI/AuthorData/progress.png";
                this.progressValue.value = 1;
            };
            return PlayerStateInfoView;
        }(ui.player.AuthorStateInfoUI));
        player.PlayerStateInfoView = PlayerStateInfoView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerStateInfoView.js.map