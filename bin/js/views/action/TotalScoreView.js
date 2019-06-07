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
    var action;
    (function (action) {
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var TotalScoreView = /** @class */ (function (_super) {
            __extends(TotalScoreView, _super);
            function TotalScoreView(infoObj) {
                var _this = _super.call(this) || this;
                _this.incomeArr = ResourceManager.incomeArr;
                _this.platArr = ResourceManager.platObjArr;
                _this.subJectArr = GameConfig.subJectArr;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2); //200, 300
                _this.Title.text = "完本成绩";
                _this.rankStr.text = "总排名";
                _this.collectStr.text = "总收藏";
                _this.reWardStr.text = "总收入";
                _this.incomeStr.text = "公寓收入";
                _this.tipStr.text = "总成绩还不错，再接再厉吧！";
                _this.setValue(infoObj);
                _this.addMask();
                _this.releaseBtn.on(Laya.Event.CLICK, _this, _this.closeView, [infoObj]);
                return _this;
            }
            TotalScoreView.prototype.setValue = function (infoObj) {
                this.incomeObj = this.getIncomeObj();
                this.platObj = this.getPlatInfo(infoObj["platStr"]); // =========
                var totalIncom = infoObj["totalIncom"];
                var totalCollect = infoObj["totalCollect"];
                var textTotal = this.incomeObj["textTotal"]; //网文总量    
                var userTotal = this.incomeObj["userTotal"]; //总用户   
                var vermicelli = this.incomeObj["vermicelli"]; //粉丝打赏
                var userReward = this.incomeObj["userReward"]; //用户打赏
                var peoplePro = infoObj["peoplePro"]; //人设数值  
                var storyPro = infoObj["storyPro"]; //故事数值 
                var innovatePro = infoObj["innovatePro"]; //创新数值
                var depthPro = infoObj["depthPro"]; //深度数值  
                var subStr = infoObj["subStr"]; //题材类型
                var platWeight = this.platObj["weight"]; //单独权重数量   
                var weightTotal = this.getWeightTotal(); //总权重    
                var weight = platWeight / weightTotal; //权重比    
                var subBuffStr = this.getSubBuffStr(this.platObj["buff"]); //题材加成数据
                var subBuffNum = this.judgeStr(subBuffStr, subStr); //题材加成
                var share = infoObj["share"];
                var gradeNum = Math.floor(textTotal * weight * ((Hash.getRandomNum(8, 12)) / 10) / 10 - ((peoplePro + storyPro + innovatePro + depthPro) / 500 * 10 + totalCollect / (userTotal * weight) * 100)); //排名 
                var houseReward = Math.floor(totalIncom * (1 - (share / 100))); //公寓收入
                infoObj["gradeNum"] = gradeNum;
                infoObj["houseReward"] = houseReward;
                // console.log("作者名称：" + infoObj["name"] + " 排名：" + gradeNum + " 收藏：" + collectNum + " 打赏：" + reWardNum + " 公寓收入：" + houseReward);
                this.rankTxt.text = gradeNum + "";
                this.collectTxt.text = totalCollect + "";
                this.reWardTxt.text = totalIncom + "";
                this.incomeTxt.text = houseReward + "";
            };
            TotalScoreView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = false;
                }
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            /** 获取当前收入信息 */
            TotalScoreView.prototype.getIncomeObj = function () {
                var year = GameConfig.year;
                for (var i = 0; i < this.incomeArr.length; i++) {
                    var getIncomeObj = this.incomeArr[i];
                    if (getIncomeObj["year"] == year) {
                        return getIncomeObj;
                    }
                }
            };
            /** 获取单独平台信息 */
            TotalScoreView.prototype.getPlatInfo = function (platName) {
                for (var j = 0; j < this.platArr.length; j++) {
                    var getPlatOBj = this.platArr[j];
                    if (getPlatOBj["net"] == platName) {
                        return getPlatOBj;
                    }
                }
            };
            /** 获取总的权重数量 */
            TotalScoreView.prototype.getWeightTotal = function () {
                var weight = 0;
                for (var j = 0; j < GameConfig.platArr.length; j++) {
                    var getPlatOBj = GameConfig.platArr[j];
                    weight = weight + getPlatOBj["weight"];
                }
                return weight;
            };
            /** 获取题材加成返回数据 */
            TotalScoreView.prototype.getSubBuffStr = function (subArr) {
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
            /** 判断字符串中是否包含某一个字符 */
            TotalScoreView.prototype.judgeStr = function (subBuffStr, subStr) {
                if (subBuffStr.indexOf(subStr) != -1) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            TotalScoreView.prototype.closeView = function (infoObj) {
                //牛刀小试
                var avchidata = managers.ResourceManager.achiveGoldArr;
                if (GameConfig.articalNameArr.length == avchidata[0]['aim']) {
                    var achive = new views.events.AchiEvent(0);
                }
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                // if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                //     let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                //     list.visible = true;
                // }
                for (var d = 0; d < GameConfig.writingAuthor.length; d++) {
                    var authorName = GameConfig.writingAuthor[d];
                    if (authorName == infoObj["name"]) {
                        GameConfig.writingAuthor.splice(d, 1);
                        d--;
                    }
                }
                GameConfig.cachData["writingAuthor"] = GameConfig.writingAuthor;
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var obj = GameConfig.authorInfoArr[i];
                    if (infoObj["name"] == obj["name"]) {
                        obj["finishNum"] = obj["finishNum"] + 1;
                        obj["totalCollect"] = 0;
                        obj["totalSubs"] = 0;
                        obj["totalIncom"] = 0;
                        GameConfig.HistoryCompArr.push({
                            'authorName': obj['name'], 'pageName': obj['pageName'], 'subStr': obj['subStr'], 'eleStr': obj['eleStr'], 'platStr': obj['platStr'],
                            'totalCollect': obj['totalCollect'], 'totalSub': obj['totalSubs'], 'totalIncom': obj['totalIncom'], 'finishTime': Laya.Browser.now().toString()
                        });
                    }
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                var arr = GameConfig.authorInfoArr;
                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    if (obj["name"] == infoObj["name"]) {
                        if (obj["finishNum"] == obj["writing"]) {
                            SceneLayerManager.sceneLayer.stopEvent();
                            var monthlySalary = obj["monthlySalary"] * (1 + obj["finishNum"] / 3 + 0 / 2 + 0) + "";
                            var sala = parseInt(monthlySalary);
                            this.signInfo = obj["name"] + "已到续约日期了，是否续约呢？(续约后的基础月薪为" + sala + ")";
                            this.confirmRenew = new views.common.ConfirmRenew(obj, sala);
                            this.confirmRenew.contentTxt.text = this.signInfo;
                            // 引导所在容器
                            var guideContainer2 = new Sprite();
                            guideContainer2.name = "reneWMaskView";
                            // 设置容器为画布缓存
                            guideContainer2.cacheAs = "bitmap";
                            Laya.stage.addChild(guideContainer2);
                            guideContainer2.addChild(this.confirmRenew);
                            //绘制遮罩区，含透明度，可见游戏背景
                            var maskArea2 = new Sprite();
                            maskArea2.alpha = 0.8;
                            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                                var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                                list.visible = false;
                            }
                            maskArea2.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                            guideContainer2.addChild(maskArea2);
                            var hitAreaOne2 = new HitArea();
                            hitAreaOne2.hit.drawRect(this.confirmRenew.x, this.confirmRenew.y, this.confirmRenew.width, this.confirmRenew.height, null);
                            guideContainer2.hitArea = hitAreaOne2;
                            guideContainer2.mouseEnabled = true;
                            Laya.stage.addChild(this.confirmRenew);
                        }
                    }
                }
                Hash.playMusic(2);
            };
            return TotalScoreView;
        }(ui.action.ScoreUI));
        action.TotalScoreView = TotalScoreView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=TotalScoreView.js.map