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
        var GetPlayerDialogView = /** @class */ (function (_super) {
            __extends(GetPlayerDialogView, _super);
            function GetPlayerDialogView() {
                var _this = _super.call(this) || this;
                _this.xx = 0;
                _this.yy = 0;
                _this.isFirst = true; //是否是初始化
                _this.xx = (Laya.stage.width - _this.width) / 2;
                _this.yy = (Laya.stage.height - _this.height) / 2;
                _this.pos(_this.xx, _this.yy);
                _this.curAuthorArr = new Array();
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                _this.refreshBtn.on(Laya.Event.CLICK, _this, _this.setDate);
                _this.assignment();
                return _this;
            }
            GetPlayerDialogView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new GetPlayerDialogView();
                }
                return this.instance;
            };
            /** 赋值 */
            GetPlayerDialogView.prototype.assignment = function () {
                if (this.isFirst && GameConfig.cachData["freshAuthor"] != null && GameConfig.cachData["freshAuthor"].length > 0) {
                    var arr = GameConfig.cachData["freshAuthor"];
                    this.curAuthorArr = arr;
                    GameConfig.freshAuthorArr = this.curAuthorArr;
                    this.setInfoDate(arr);
                    for (var i = 1; i < 5; i++) {
                        this.iconImg = this.iconBox.getChildByName("icon" + i);
                        this.iconImg.on(Laya.Event.CLICK, this, this.checkAuthor);
                    }
                }
                else {
                    this.setDate();
                    for (var i = 1; i < 5; i++) {
                        this.selectImg = this.getChildByName("select" + i);
                        this.iconImg = this.iconBox.getChildByName("icon" + i);
                        this.selectImg.visible = false;
                        this.iconImg.on(Laya.Event.CLICK, this, this.checkAuthor);
                    }
                }
            };
            GetPlayerDialogView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                Laya.stage.addChild(this.guideContainer);
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
            GetPlayerDialogView.prototype.closeView = function () {
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                Laya.stage.removeChildByName("maskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                var media = new views.events.MediaEvent( 2 );
            };
            GetPlayerDialogView.prototype.checkAuthor = function (event) {
                event.stopPropagation();
                var name = event.target.name;
                var i = name.substring(4);
                this.visible = false;
                views.player.PlayerDialogView.getInstance().createList(this.curAuthorArr, i);
            };
            GetPlayerDialogView.prototype.setDate = function () {
                if (GameConfig.money < parseInt(this.money.text)) {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                    return;
                }
                else {
                    for (var i = 1; i < 5; i++) {
                        this.selectImg = this.getChildByName("select" + i);
                        this.selectImg.visible = false;
                    }
                    this.curAuthorArr.splice(0, this.curAuthorArr.length);
                    this.testOBJ = new Object();
                    if (GameConfig.hisObjArr.length > 0) {
                        for (var i = 0; i < GameConfig.hisObjArr.length; i++) {
                            var hisObj = GameConfig.hisObjArr[i];
                            if (hisObj["id"] == 1 || hisObj["id"] == 2) {
                                for (var j = 0; j < GameConfig.guding.length; j++) {
                                    var gudingObj = GameConfig.guding[j];
                                    if (gudingObj["unlock"] == hisObj["id"] && GameConfig.authorArr.indexOf(gudingObj) == -1) {
                                        GameConfig.authorArr.splice(gudingObj["id"] - 1, 0, gudingObj);
                                        // GameConfig.authorArr.push(gudingObj);
                                    }
                                }
                            }
                        }
                    }
                    while (this.curAuthorArr.length < 4) {
                        if (this.testOBJ.hasOwnProperty("true")) {
                            delete this.testOBJ["true"];
                        }
                        this.authorInfoObj = Hash.weight_rand(GameConfig.authorArr);
                        if (this.curAuthorArr.length > 0) {
                            for (var i = 0; i < this.curAuthorArr.length; i++) {
                                var obj = this.curAuthorArr[i];
                                if (obj["id"] == this.authorInfoObj["id"]) {
                                    this.testOBJ["true"] = "true";
                                }
                            }
                            if (this.testOBJ.hasOwnProperty("true")) {
                                console.log("有相同的");
                            }
                            else {
                                this.curAuthorArr.push(this.authorInfoObj);
                            }
                        }
                        else {
                            this.curAuthorArr.push(this.authorInfoObj);
                        }
                    }
                    GameConfig.cachData["freshAuthor"] = this.curAuthorArr;
                    GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                    GameConfig.freshAuthorArr = this.curAuthorArr;
                    // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                    this.setInfoDate(this.curAuthorArr);
                }
            };
            /** 赋值 */
            GetPlayerDialogView.prototype.setInfoDate = function (arr) {
                var infoOBJ;
                if (arr.length > 4) {
                    arr.splice(0, 1);
                    arr.splice(arr.length - 1, 1);
                }
                if (GameConfig.cachData["freshMoney"] != 0 && this.isFirst) {
                    for (var i = 0; i < arr.length; i++) {
                        infoOBJ = arr[i];
                        var index = i + 1;
                        this.iconImg = this.iconBox.getChildByName("icon" + index);
                        this.nameStr = this.getChildByName("name" + index);
                        this.iconImg.skin = infoOBJ["icon"];
                        this.nameStr.text = infoOBJ["name"];
                    }
                    this.money.text = GameConfig.cachData["freshMoney"] + "";
                    GetPlayerDialogView.selectNum = GameConfig.cachData["selectNum"];
                    this.isFirst = false;
                    this.judgeStatus(arr);
                }
                else {
                    var moneyNum = 3000 * GetPlayerDialogView.selectNum;
                    GetPlayerDialogView.selectNum++;
                    for (var i = 0; i < arr.length; i++) {
                        infoOBJ = arr[i];
                        var index = i + 1;
                        this.iconImg = this.iconBox.getChildByName("icon" + index);
                        this.nameStr = this.getChildByName("name" + index);
                        this.iconImg.skin = infoOBJ["icon"];
                        this.nameStr.text = infoOBJ["name"];
                    }
                    var freshMoney = 3000 * GetPlayerDialogView.selectNum;
                    GameConfig.cachData["freshMoney"] = freshMoney;
                    GameConfig.cachData["selectNum"] = GetPlayerDialogView.selectNum;
                    // Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                    var lastMoney = GameConfig.money - moneyNum;
                    GameConfig.money = lastMoney;
                    this.money.text = freshMoney + "";
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                }
            };
            /** 重置数据 */
            GetPlayerDialogView.prototype.resetDate = function () {
                this.visible = true;
                while (this.curAuthorArr.length != 4) {
                    this.curAuthorArr.shift();
                    this.curAuthorArr.splice(this.curAuthorArr.length - 1, 1);
                }
                if (GameConfig.signingNum <= 0) {
                    for (var j = 0; j < this.curAuthorArr.length; j++) {
                        var index = j + 1;
                        var img = this.getChildByName("select" + index);
                        img.visible = false;
                    }
                }
                else {
                    for (var j = 0; j < this.curAuthorArr.length; j++) {
                        var obj = this.curAuthorArr[j];
                        var key = obj["id"] + "";
                        var index = j + 1;
                        var img = this.getChildByName("select" + index);
                        if (GameConfig.authorIdArr.indexOf(key) != -1) {
                            img.visible = true;
                        }
                        else {
                            img.visible = false;
                        }
                    }
                }
            };
            /** 初始化时判断签约状态 */
            GetPlayerDialogView.prototype.judgeStatus = function (arr) {
                while (arr.length != 4) {
                    arr.shift();
                    arr.splice(arr.length - 1, 1);
                }
                if (GameConfig.signingNum <= 0) {
                    for (var j = 0; j < arr.length; j++) {
                        var index = j + 1;
                        var img = this.getChildByName("select" + index);
                        img.visible = false;
                    }
                }
                else {
                    for (var j = 0; j < arr.length; j++) {
                        var obj = arr[j];
                        var key = obj["id"] + "";
                        var index = j + 1;
                        var img = this.getChildByName("select" + index);
                        if (GameConfig.authorIdArr.indexOf(key) != -1) {
                            img.visible = true;
                        }
                        else {
                            img.visible = false;
                        }
                    }
                }
            };
            GetPlayerDialogView.selectNum = 1; //0;
            return GetPlayerDialogView;
        }(ui.player.getAuthorDialogUI));
        player.GetPlayerDialogView = GetPlayerDialogView;
    })(player = views.player || (views.player = {}));
})(views || (views = {}));
//# sourceMappingURL=GetPlayerDialogView.js.map