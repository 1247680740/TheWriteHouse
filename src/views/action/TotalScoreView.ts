namespace views.action {

    import WritingView = views.action.WritingView;
    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import CSSStyle = laya.display.css.CSSStyle;
    import HTMLDivElement = laya.html.dom.HTMLDivElement;
    import Sprite = Laya.Sprite;
    import BaseView = views.base.BaseView;

    export class TotalScoreView extends ui.action.ScoreUI {

        private static instance: TotalScoreView;
        private incomeArr: Array<Object> = ResourceManager.incomeArr;
        private platArr: Array<Object> = ResourceManager.platObjArr;
        private subJectArr: Array<string> = GameConfig.subJectArr;
        private incomeObj: Object;
        private platObj: Object;
        private signInfo: string;
        private confirmRenew: views.common.ConfirmRenew;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(infoObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);  //200, 300
            this.Title.text = "完本成绩";
            this.rankStr.text = "总排名";
            this.collectStr.text = "总收藏";
            this.reWardStr.text = "总收入";
            this.incomeStr.text = "公寓收入";
            this.tipStr.text = "总成绩还不错，再接再厉吧！";
            this.setValue(infoObj);
            this.addMask();
            this.releaseBtn.on(Laya.Event.CLICK, this, this.closeView, [infoObj]);
        }

        setValue(infoObj: Object): void {

            this.incomeObj = this.getIncomeObj();
            this.platObj = this.getPlatInfo(infoObj["platStr"]);   // =========
            let totalIncom: number = infoObj["totalIncom"];
            let totalCollect: number = infoObj["totalCollect"];

            let textTotal: number = this.incomeObj["textTotal"]; //网文总量    
            let userTotal: number = this.incomeObj["userTotal"]; //总用户   
            let vermicelli: number = this.incomeObj["vermicelli"]; //粉丝打赏
            let userReward: number = this.incomeObj["userReward"]; //用户打赏
            let peoplePro: number = infoObj["peoplePro"]; //人设数值  
            let storyPro: number = infoObj["storyPro"]; //故事数值 
            let innovatePro: number = infoObj["innovatePro"]; //创新数值
            let depthPro: number = infoObj["depthPro"]; //深度数值  
            let subStr: string = infoObj["subStr"];  //题材类型
            let platWeight: number = this.platObj["weight"]; //单独权重数量   
            let weightTotal: number = this.getWeightTotal();  //总权重    
            let weight: number = platWeight / weightTotal;  //权重比    
            let subBuffStr: string = this.getSubBuffStr(this.platObj["buff"]); //题材加成数据
            let subBuffNum: number = this.judgeStr(subBuffStr, subStr); //题材加成
            let share: number = infoObj["share"];

            let gradeNum: number = Math.floor(textTotal * weight * ((Hash.getRandomNum(8, 12)) / 10) / 10 - ((peoplePro + storyPro + innovatePro + depthPro) / 500 * 10 + totalCollect / (userTotal * weight) * 100)); //排名 
            let houseReward: number = Math.floor(totalIncom * (1 - (share / 100))); //公寓收入
            infoObj["gradeNum"] = gradeNum;
            infoObj["houseReward"] = houseReward;
            // console.log("作者名称：" + infoObj["name"] + " 排名：" + gradeNum + " 收藏：" + collectNum + " 打赏：" + reWardNum + " 公寓收入：" + houseReward);

            this.rankTxt.text = gradeNum + "";
            this.collectTxt.text = totalCollect + "";
            this.reWardTxt.text = totalIncom + "";
            this.incomeTxt.text = houseReward + "";
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "maskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = false;
            }
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;

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

        /** 获取单独平台信息 */
        getPlatInfo(platName: string): Object {
            for (var j = 0; j < this.platArr.length; j++) {
                let getPlatOBj: Object = this.platArr[j];
                if (getPlatOBj["net"] == platName) {
                    return getPlatOBj;
                }
            }
        }


        /** 获取总的权重数量 */
        getWeightTotal(): number {
            let weight: number = 0;
            for (var j = 0; j < GameConfig.platArr.length; j++) {
                let getPlatOBj: Object = GameConfig.platArr[j];
                weight = weight + getPlatOBj["weight"]
            }
            return weight;
        }

        /** 获取题材加成返回数据 */
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

        /** 判断字符串中是否包含某一个字符 */
        judgeStr(subBuffStr: string, subStr: string): number {
            if (subBuffStr.indexOf(subStr) != -1) {
                return 1;
            } else {
                return 0;
            }
        }

        closeView(infoObj: Object): void {
            //牛刀小试
            let avchidata: Array<Object> = managers.ResourceManager.achiveGoldArr;
            if (GameConfig.articalNameArr.length == avchidata[0]['aim']) {
                var achive: views.events.AchiEvent = new views.events.AchiEvent(0);
            }
            SceneLayerManager.sceneLayer.removeChild(this);
            GameConfig.displayPage -= 1;
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            // if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
            //     let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
            //     list.visible = true;
            // }
            for (let d: number = 0; d < GameConfig.writingAuthor.length; d++) {
                let authorName: string = GameConfig.writingAuthor[d];
                if (authorName == infoObj["name"]) {
                    GameConfig.writingAuthor.splice(d, 1);
                    d--;
                }
            }
            GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let obj: Object = GameConfig.authorInfoArr[i];
                if (infoObj["name"] == obj["name"]) {
                    obj["finishNum"] = obj["finishNum"] + 1;
                    obj["totalCollect"] = 0;
                    obj["totalSubs"] = 0;
                    obj["totalIncom"] = 0;
                    GameConfig.HistoryCompArr.push({
                        'authorName': obj['name'], 'pageName': obj['pageName'], 'subStr': obj['subStr'], 'eleStr': obj['eleStr'], 'platStr': obj['platStr'],
                        'totalCollect': obj['totalCollect'], 'totalSub': obj['totalSubs'], 'totalIncom': obj['totalIncom'], 'finishTime': Laya.Browser.now().toString()
                    })
                }
            }
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
            let arr: Array<Object> = GameConfig.authorInfoArr;
            for (let i: number = 0; i < arr.length; i++) {
                let obj: Object = arr[i];
                if (obj["name"] == infoObj["name"]) {
                    if (obj["finishNum"] == obj["writing"]) {
                        SceneLayerManager.sceneLayer.stopEvent();
                        let monthlySalary: string = obj["monthlySalary"] * (1 + obj["finishNum"] / 3 + 0 / 2 + 0) + "";
                        let sala: number = parseInt(monthlySalary);
                        this.signInfo = obj["name"] + "已到续约日期了，是否续约呢？(续约后的基础月薪为" + sala + ")";
                        this.confirmRenew = new views.common.ConfirmRenew(obj, sala);
                        this.confirmRenew.contentTxt.text = this.signInfo;

                        // 引导所在容器
                        let guideContainer2: Sprite = new Sprite();
                        guideContainer2.name = "reneWMaskView";
                        // 设置容器为画布缓存
                        guideContainer2.cacheAs = "bitmap";
                        Laya.stage.addChild(guideContainer2);
                        guideContainer2.addChild(this.confirmRenew);

                        //绘制遮罩区，含透明度，可见游戏背景
                        let maskArea2: Sprite = new Sprite();
                        maskArea2.alpha = 0.8;
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                            list.visible = false;
                        }
                        maskArea2.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                        guideContainer2.addChild(maskArea2);

                        let hitAreaOne2: HitArea = new HitArea();
                        hitAreaOne2.hit.drawRect(this.confirmRenew.x, this.confirmRenew.y, this.confirmRenew.width, this.confirmRenew.height, null);

                        guideContainer2.hitArea = hitAreaOne2;
                        guideContainer2.mouseEnabled = true;
                        Laya.stage.addChild(this.confirmRenew);
                    }
                }
            }
            Hash.playMusic(2);
        }

    }
}