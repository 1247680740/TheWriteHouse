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
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var AuthorTrainItemUI = ui.player.AuthorTrainItemUI;
        var AuthorIconItemUI = ui.player.AuthorIconItemUI;
        var PlayerTrainView = /** @class */ (function (_super) {
            __extends(PlayerTrainView, _super);
            function PlayerTrainView() {
                var _this = _super.call(this) || this;
                _this.trainArr = ResourceManager.trainArr;
                _this.isFirst = true;
                _this.ProNum = 0;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.addMask();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                /** 给两个Panel赋值 */
                _this.setPanelData();
                /** 作者属性赋值 */
                var newObj = _this.curAuthorArr[0];
                _this.initView(newObj);
                /** 重置项目状态 */
                _this.resetPanelStatus();
                SceneLayerManager.sceneLayer.stopEvent();
                return _this;
            }
            PlayerTrainView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "playerTrainViewMask";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            /** 给两个Panel赋值 */
            PlayerTrainView.prototype.setPanelData = function () {
                var posArr = new Array();
                this.curAuthorArr = new Array();
                posArr.splice(0, posArr.length);
                this.curAuthorArr.splice(0, this.curAuthorArr.length);
                if (!this.trainArr)
                    return;
                this.trainPanel.removeChildren(0, this.trainPanel.numChildren - 1);
                this.authorPanel.removeChildren(0, this.trainPanel.numChildren - 1);
                this.trainPanel.vScrollBarSkin = "";
                this.authorPanel.hScrollBarSkin = "";
                var len = this.trainArr.length;
                var i;
                for (i = 0; i < len; i++) {
                    var trainObj = this.trainArr[i];
                    var gridItem = new AuthorTrainItemUI();
                    gridItem.ProAc.value = 0;
                    gridItem.ProAc.visible = false;
                    gridItem.name = trainObj["name"];
                    gridItem.proName.text = trainObj["name"];
                    gridItem.costNum.text = trainObj["cost"] + "";
                    switch (trainObj["time"]) {
                        case 1:
                            this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                            break;
                        case 2:
                            this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                            break;
                        case 3:
                            this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                            break;
                        case 4:
                            this.judgeTimeStatus(gridItem, trainObj["time"] + 1);
                            break;
                        case 5:
                            for (var i_1 = 1; i_1 < 6; i_1++) {
                                var img = gridItem.getChildByName("time" + i_1);
                                img.visible = true;
                                img.skin = "gameUI/AuthorData/cube_green.png";
                            }
                            break;
                    }
                    gridItem.x = 0;
                    gridItem.y = i * gridItem.height;
                    this.trainPanel.addChild(gridItem);
                    // 点击每一项
                    gridItem.on(Laya.Event.CLICK, this, this.gridItemClked, [trainObj]);
                    gridItem.on(Laya.Event.DOUBLE_CLICK, this, this.showProAc, [trainObj]);
                }
                /** 添加作者列表 */
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var obj = GameConfig.authorInfoArr[n];
                    posArr.push(obj["authorPosY"]);
                }
                posArr = posArr.sort();
                for (var m = 0; m < posArr.length; m++) {
                    var posNum = posArr[m];
                    for (var d = 0; d < GameConfig.authorInfoArr.length; d++) {
                        var authorObj = GameConfig.authorInfoArr[d];
                        if (authorObj["authorPosY"] == posNum) {
                            this.curAuthorArr.push(authorObj);
                        }
                    }
                }
                for (var j = 0; j < this.curAuthorArr.length; j++) {
                    var authorObj = this.curAuthorArr[j];
                    var iconGridItem = new AuthorIconItemUI();
                    iconGridItem.name = authorObj["name"];
                    iconGridItem.icon.skin = authorObj["icon"];
                    iconGridItem.iconBg.skin = "gameUI/AuthorData/q_0" + authorObj["quality"] + ".png";
                    iconGridItem.x = j * (iconGridItem.width + 10);
                    iconGridItem.y = 2;
                    this.authorPanel.addChild(iconGridItem);
                    iconGridItem.on(Laya.Event.CLICK, this, this.checkAuthor, [authorObj]);
                }
            };
            PlayerTrainView.prototype.initView = function (newObj) {
                var authorIconItemUI = this.authorPanel.getChildByName(newObj["name"]);
                this.passAddAtr.visible = false;
                this.preAddStr.visible = false;
                this.disAddStr.visible = false;
                this.curAddStr.visible = false;
                /** 选择作者背景改变 */
                for (var index = 0; index < this.curAuthorArr.length; index++) {
                    var obj = this.curAuthorArr[index];
                    var authorIconItemUI_1 = this.authorPanel.getChildByName(obj["name"]);
                    authorIconItemUI_1.selectBg.visible = false;
                }
                authorIconItemUI.selectBg.visible = true;
                authorIconItemUI.selectBg.skin = "gameUI/AuthorData/select.png";
                /** 给作者属性赋值 */
                this.icon.skin = newObj["icon"];
                this.AuthorName.text = newObj["name"];
                this.passion.value = parseInt(newObj["passionMin"]) / 100;
                this.preciseness.value = parseInt(newObj["precisenessMin"]) / 100;
                this.discipline.value = parseInt(newObj["disciplineMin"]) / 100;
                this.curious.value = parseInt(newObj["curiousMin"]) / 100;
                var surLevel = 7 - (newObj["yearLeave"] - 1);
                for (var k = 1; k < 8; k++) {
                    var img = this.getChildByName("day" + k);
                    img.skin = "gameUI/AuthorData/cube_grey.png";
                }
                if (newObj["yearLeave"] > 0) {
                    for (var l = surLevel; l < 8; l++) {
                        var imgc1 = this.getChildByName("day" + l);
                        imgc1.skin = "gameUI/AuthorData/cube_green.png";
                    }
                }
            };
            PlayerTrainView.prototype.initViewTwo = function (newObjTwo) {
                var authorIconItemUI = this.authorPanel.getChildByName(newObjTwo["name"]);
                this.passAddAtr.visible = false;
                this.preAddStr.visible = false;
                this.disAddStr.visible = false;
                this.curAddStr.visible = false;
                /** 选择作者背景改变 */
                for (var index = 0; index < this.curAuthorArr.length; index++) {
                    var obj = this.curAuthorArr[index];
                    var authorIconItemUI_2 = this.authorPanel.getChildByName(obj["name"]);
                    authorIconItemUI_2.selectBg.visible = false;
                }
                authorIconItemUI.selectBg.visible = true;
                authorIconItemUI.selectBg.skin = "gameUI/AuthorData/select.png";
                /** 给作者属性赋值 */
                this.icon.skin = newObjTwo["icon"];
                this.AuthorName.text = newObjTwo["name"];
                this.passion.value = parseInt(newObjTwo["passionMin"]) / 100;
                this.preciseness.value = parseInt(newObjTwo["precisenessMin"]) / 100;
                this.discipline.value = parseInt(newObjTwo["disciplineMin"]) / 100;
                this.curious.value = parseInt(newObjTwo["curiousMin"]) / 100;
            };
            PlayerTrainView.prototype.judgeTimeStatus = function (gridItem, len) {
                for (var i = 1; i < 6; i++) {
                    var img = gridItem.getChildByName("time" + i);
                    img.visible = false;
                }
                for (var index = 1; index < len; index++) {
                    var img = gridItem.getChildByName("time" + index);
                    img.visible = true;
                    img.skin = "gameUI/AuthorData/cube_green.png";
                }
            };
            PlayerTrainView.prototype.gridItemClked = function (trainObj) {
                // 获取当前作者对象
                var curObj = this.getCurAuthorObj();
                if (GameConfig.money < trainObj["cost"] || curObj["yearLeave"] < trainObj["time"]) {
                    return;
                }
                else {
                    for (var n = 0; n < this.trainArr.length; n++) {
                        var newTrainObj = this.trainArr[n];
                        var authorTrainItemUI = this.trainPanel.getChildByName(newTrainObj["name"]);
                        authorTrainItemUI.bigBg.skin = "gameUI/common/writeBg.png";
                    }
                    var authorTrainItemUITwo = this.trainPanel.getChildByName(trainObj["name"]);
                    authorTrainItemUITwo.bigBg.skin = "gameUI/AuthorData/green.png";
                }
                Hash.playMusic(2);
            };
            PlayerTrainView.prototype.showProAc = function (trainObj) {
                // 获取当前作者对象
                var authorTrainItemUITwo = this.trainPanel.getChildByName(trainObj["name"]);
                var curObj = this.getCurAuthorObj();
                if (GameConfig.money < trainObj["cost"] || curObj["yearLeave"] < trainObj["time"] || authorTrainItemUITwo.ProAc.visible == true || this.ProNum > 0) {
                    return;
                }
                else {
                    this.ProNum += 1;
                    var rate = Hash.countRate(trainObj["perfect"]);
                    this.judgeYearLevel(trainObj);
                    authorTrainItemUITwo.ProAc.value = 0;
                    authorTrainItemUITwo.ProAc.visible = true;
                    this.authorPanel.mouseEnabled = false;
                    Laya.Tween.to(authorTrainItemUITwo.ProAc, { value: 1 }, 2000, null, Handler.create(this, this.resetProAc, [trainObj, rate]));
                }
                Hash.playMusic(2);
            };
            /** 进行年假数量计算 */
            PlayerTrainView.prototype.judgeYearLevel = function (trainObj) {
                var newObj = new Object();
                for (var i = 0; i < this.curAuthorArr.length; i++) {
                    var author = this.curAuthorArr[i];
                    if (author["name"] == this.AuthorName.text) {
                        author["yearLeave"] = author["yearLeave"] - trainObj["time"];
                        newObj = author;
                    }
                }
                var surLevel = 7 - (newObj["yearLeave"] - 1);
                for (var k = 1; k < 8; k++) {
                    var img = this.getChildByName("day" + k);
                    img.skin = "gameUI/AuthorData/cube_grey.png";
                }
                if (newObj["yearLeave"] > 0) {
                    for (var l = surLevel; l < 8; l++) {
                        var imgc1 = this.getChildByName("day" + l);
                        imgc1.skin = "gameUI/AuthorData/cube_green.png";
                    }
                }
            };
            PlayerTrainView.prototype.resetProAc = function (trainObj, rate) {
                var authorTrainItemUITwo = this.trainPanel.getChildByName(trainObj["name"]);
                var addBuffArr = new Array();
                var dataObj = new Object();
                this.ProNum -= 1;
                authorTrainItemUITwo.ProAc.value = 0;
                authorTrainItemUITwo.ProAc.visible = false;
                /** 进行数据削减 */
                GameConfig.money = GameConfig.money - trainObj["cost"];
                views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                for (var i = 0; i < this.curAuthorArr.length; i++) {
                    var author = this.curAuthorArr[i];
                    if (author["name"] == this.AuthorName.text) {
                        var buffArr = trainObj["buff"];
                        var valueArr = trainObj["value"];
                        if (author["yearLeave"] == 0) {
                            for (var n = 0; n < this.trainArr.length; n++) {
                                var newTrainObj = this.trainArr[n];
                                var authorTrainItemUI = this.trainPanel.getChildByName(newTrainObj["name"]);
                                authorTrainItemUI.bigBg.skin = "gameUI/common/writeBg.png";
                            }
                        }
                        dataObj["passionMin"] = 0;
                        dataObj["precisenessMin"] = 0;
                        dataObj["disciplineMin"] = 0;
                        dataObj["curiousMin"] = 0;
                        for (var n = 0; n < buffArr.length; n++) {
                            var buff = buffArr[n];
                            var random = Hash.getRandomNum(1, valueArr[n]);
                            switch (buff) {
                                case 1:
                                    if (author["passionMin"] != 100) {
                                        if (rate == 1) {
                                            author["passionMin"] += valueArr[n];
                                            dataObj["passionMin"] = valueArr[n];
                                        }
                                        else {
                                            author["passionMin"] += random;
                                            dataObj["passionMin"] = random;
                                        }
                                    }
                                    break;
                                case 2:
                                    if (author["precisenessMin"] != 100) {
                                        if (rate == 1) {
                                            author["precisenessMin"] += valueArr[n];
                                            dataObj["precisenessMin"] = valueArr[n];
                                        }
                                        else {
                                            author["precisenessMin"] += random;
                                            dataObj["precisenessMin"] = random;
                                        }
                                    }
                                    break;
                                case 3:
                                    if (author["disciplineMin"] != 100) {
                                        if (rate == 1) {
                                            author["disciplineMin"] += valueArr[n];
                                            dataObj["disciplineMin"] = valueArr[n];
                                        }
                                        else {
                                            author["disciplineMin"] += random;
                                            dataObj["disciplineMin"] = random;
                                        }
                                    }
                                    break;
                                case 4:
                                    if (author["curiousMin"] != 100) {
                                        if (rate == 1) {
                                            author["curiousMin"] += valueArr[n];
                                            dataObj["curiousMin"] = valueArr[n];
                                        }
                                        else {
                                            author["curiousMin"] += random;
                                            dataObj["curiousMin"] = random;
                                        }
                                    }
                                    break;
                            }
                        }
                        addBuffArr.push(dataObj);
                    }
                }
                var retObj = this.getAuthorObj();
                this.initViewTwo(retObj);
                this.resetAddTip(addBuffArr);
                this.resetPanelStatus();
                if (rate == 1) {
                    TipLayerManager.tipLayer.showDrawBgTip("PERFECT!!!!");
                }
                this.authorPanel.mouseEnabled = true;
            };
            PlayerTrainView.prototype.resetAddTip = function (addBuffArr) {
                var buffObj = addBuffArr[addBuffArr.length - 1];
                var key;
                for (key in buffObj) {
                    var randomNum = buffObj[key];
                    switch (key) {
                        case "passionMin":
                            if (randomNum > 0) {
                                this.passAddAtr.visible = true;
                                this.passAddAtr.text = "+" + randomNum;
                            }
                            break;
                        case "precisenessMin":
                            if (randomNum > 0) {
                                this.preAddStr.visible = true;
                                this.preAddStr.text = "+" + randomNum;
                            }
                            break;
                        case "disciplineMin":
                            if (randomNum > 0) {
                                this.disAddStr.visible = true;
                                this.disAddStr.text = "+" + randomNum;
                            }
                            break;
                        case "curiousMin":
                            if (randomNum > 0) {
                                this.curAddStr.visible = true;
                                this.curAddStr.text = "+" + randomNum;
                            }
                            break;
                    }
                }
            };
            PlayerTrainView.prototype.resetPanelStatus = function () {
                var name = this.AuthorName.text;
                var newObj = this.getCurAuthorObj();
                for (var i = 0; i < this.trainArr.length; i++) {
                    var trainObj = this.trainArr[i];
                    var item = this.trainPanel.getChildByName(trainObj["name"]);
                    if (GameConfig.money < trainObj["cost"]) {
                        item.costNum.color = "#DE5246";
                    }
                    else {
                        item.costNum.color = "#585656";
                    }
                    if (newObj["yearLeave"] < trainObj["time"]) {
                        for (var d = 1; d < 6; d++) {
                            var img = item.getChildByName("time" + d);
                            if (img.visible == true) {
                                img.skin = "gameUI/AuthorData/cube_grey.png";
                            }
                        }
                    }
                    else {
                        for (var d = 1; d < 6; d++) {
                            var img = item.getChildByName("time" + d);
                            if (img.visible == true) {
                                img.skin = "gameUI/AuthorData/cube_green.png";
                            }
                        }
                    }
                }
            };
            PlayerTrainView.prototype.checkAuthor = function (authorObj) {
                this.initView(authorObj);
                this.resetPanelStatus();
                Hash.playMusic(2);
            };
            /** 获取选中的条目对应的作者对象 */
            PlayerTrainView.prototype.getAuthorObj = function () {
                for (var o = 0; o < GameConfig.authorInfoArr.length; o++) {
                    var authObj = GameConfig.authorInfoArr[o];
                    if (authObj["name"] == this.AuthorName.text) {
                        return authObj;
                    }
                }
            };
            /** 获取选中的条目对应的this.curAuthorArr中的作者对象 */
            PlayerTrainView.prototype.getCurAuthorObj = function () {
                for (var j = 0; j < this.curAuthorArr.length; j++) {
                    var authObj = this.curAuthorArr[j];
                    if (authObj["name"] == this.AuthorName.text) {
                        return authObj;
                    }
                }
            };
            PlayerTrainView.prototype.closeView = function () {
                GameConfig.displayPage -= 1;
                Laya.stage.removeChild(this);
                Laya.stage.removeChildByName("playerTrainViewMask");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return PlayerTrainView;
        }(ui.player.AuthorTrainUI));
        player.PlayerTrainView = PlayerTrainView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=PlayerTrainView.js.map