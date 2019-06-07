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
var BaseView = views.base.BaseView;
var CircleProView = views.common.CircleProView;
var PreIconViewUI = ui.common.PreIconViewUI;
var views;
(function (views) {
    var layers;
    (function (layers) {
        var SpAction = /** @class */ (function (_super) {
            __extends(SpAction, _super);
            function SpAction(nameStr) {
                var _this = _super.call(this) || this;
                _this.scene = SceneLayerManager.sceneLayer.getChildByName("scene");
                _this.camera = _this.scene.getChildByName("camera");
                // Laya.stage.on(Laya.Event.BLUR, this, this.pauseAction);
                // Laya.stage.on(Laya.Event.FOCUS, this, this.startAction);
                _this.action(nameStr);
                return _this;
            }
            SpAction.prototype.action = function (nameStr) {
                var statusOne = [{ "id": 2, "name": "休息" }, { "id": 3, "name": "工作" }];
                var statusObjOne = new Object();
                if (GameConfig.authorInfoArr.length > 0) {
                    var author = this.getAuthorObj(nameStr);
                    var spObj = this.scene.getChildByName(nameStr);
                    if (author["curStatus"] == 3) {
                        if (SceneLayerManager.sceneLayer.getChildByName(nameStr + "LeftTool") == null) {
                            var leftToolBarView = new views.toolbar.LeftToolBarView(author);
                            /** 创建左侧点击界面 */
                            var outVecOne = new Laya.Vector3();
                            this.camera.viewport.project(spObj.transform.position, this.camera.projectionViewMatrix, outVecOne);
                            var point = new Laya.Point();
                            point.x = outVecOne.x / Laya.stage.clientScaleX;
                            point.y = outVecOne.y / Laya.stage.clientScaleY;
                            leftToolBarView.name = nameStr + "LeftTool";
                            SceneLayerManager.sceneLayer.addChild(leftToolBarView);
                            leftToolBarView.pos(0, point.y - 160);
                        }
                    }
                    else if (author["curStatus"] == 0) {
                        if (SceneLayerManager.sceneLayer.getChildByName(nameStr + "LeftTool") != null) {
                            SceneLayerManager.sceneLayer.removeChildByName(nameStr + "LeftTool");
                        }
                    }
                    if (author["actWork"] == 0 && author["actRest"] == 0) {
                        if (spObj.transform.position.x == 0 || spObj.transform.position.x == -1.5 || spObj.transform.position.x >= 1) {
                            var nameStr_1 = author["name"];
                            if (author["sportStatus"] == 0) {
                                statusObjOne = statusOne[1];
                            }
                            else if (author["sportStatus"] == 1) {
                                statusObjOne = statusOne[1];
                            }
                            else if (author["sportStatus"] == 2) {
                                statusObjOne = statusOne[0];
                            }
                            this.judgeStatus(statusObjOne, nameStr_1, author);
                        }
                        else {
                            var nameStr_2 = author["name"];
                            if (author["sportStatus"] == 0) {
                                statusObjOne = statusOne[1];
                            }
                            else if (author["sportStatus"] == 1) {
                                statusObjOne = statusOne[1];
                            }
                            else if (author["sportStatus"] == 2) {
                                statusObjOne = statusOne[0];
                            }
                            this.judgeStatusTwo(statusObjOne, nameStr_2, author);
                        }
                    }
                    else if (author["actWork"] != 0) {
                        Laya.timer.loop(1000, this, this.countWorkTime, [spObj, author]);
                    }
                    else if (author["actRest"] != 0) {
                        Laya.timer.loop(1000, this, this.countRestTime, [author]);
                    }
                }
            };
            SpAction.prototype.judgeStatus = function (statusObj, nameStr, authorObj) {
                if (this.scene.getChildByName(nameStr) != null) {
                    var author3D = this.scene.getChildByName(nameStr);
                    switch (statusObj["name"]) {
                        case "休息":
                            author3D.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                            Laya.Tween.to(author3D.transform.position, { x: 1, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upRest, [author3D, authorObj]));
                            break;
                        case "工作":
                            switch (authorObj["sportStatus"]) {
                                case 0://静止
                                    author3D.transform.rotate(new Laya.Vector3(0, -90, 0), true, false);
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    break;
                                case 1://休息
                                    author3D.transform.rotate(new Laya.Vector3(0, -90, -90), true, false);
                                    author3D.transform.position.x = author3D.transform.position.x - 1;
                                    author3D.transform.position.y = authorObj["authorPosY"];
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    break;
                            }
                            break;
                    }
                }
            };
            SpAction.prototype.judgeStatusTwo = function (statusObj, nameStr, authorObj) {
                if (this.scene.getChildByName(nameStr) != null) {
                    var author3D = this.scene.getChildByName(nameStr);
                    switch (statusObj["name"]) {
                        case "休息":
                            Laya.Tween.to(author3D.transform.position, { x: 1, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upRest, [author3D, authorObj]));
                            break;
                        case "工作":
                            switch (authorObj["sportStatus"]) {
                                case 0://静止
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    break;
                                case 1://休息
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    break;
                            }
                            break;
                    }
                }
            };
            /** 工作 */
            SpAction.prototype.upWork = function (author3D, authObj) {
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var curObj = GameConfig.authorInfoArr[n];
                    if (curObj["name"] == authObj["name"]) {
                        curObj["sportStatus"] = 2;
                        curObj["actWork"] = 1;
                        Laya.timer.loop(1000, this, this.countWorkTime, [author3D, curObj]);
                    }
                }
            };
            /** 上床休息 */
            SpAction.prototype.upRest = function (author3D, authorObj) {
                author3D.transform.rotate(new Laya.Vector3(-90, -90, 0), true, false);
                author3D.transform.position.y = author3D.transform.position.y + 0.4;
                author3D.transform.position.x = author3D.transform.position.x + 1;
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var curObj = GameConfig.authorInfoArr[n];
                    if (curObj["name"] == authorObj["name"]) {
                        curObj["sportStatus"] = 1;
                        curObj["actRest"] = 1;
                        Laya.timer.loop(1000, this, this.countRestTime, [curObj]);
                    }
                }
            };
            /** 计算休息时间 */
            SpAction.prototype.countRestTime = function (authObj) {
                var newObj = this.getAuthorObj(authObj["name"]);
                newObj["actRest"] = newObj["actRest"] + 1;
                if (newObj["actRest"] > 10) {
                    Laya.timer.clear(this, this.countRestTime);
                    for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                        var curObj = GameConfig.authorInfoArr[n];
                        if (curObj["name"] == newObj["name"]) {
                            curObj["actRest"] = 0;
                            this.action(curObj["name"]);
                        }
                    }
                }
            };
            /** 计算工作时间 */
            SpAction.prototype.countWorkTime = function (author3D, authObj) {
                var newObj = this.getAuthorObj(authObj["name"]);
                newObj["actWork"] = newObj["actWork"] + 1;
                console.log("工作者：" + newObj["name"] + " 工作时间：" + newObj["actWork"]);
                if (newObj["curStatus"] == 0) {
                    var bool = this.judgeRate();
                    if (bool) {
                        if (SceneLayerManager.sceneLayer.getChildByName(authObj["name"] + "tri") == null) {
                            var writeTriggerView = new views.common.WriteTriggerView(authObj);
                            /** 创建写作触发界面 */
                            var outVec = new Laya.Vector3();
                            this.camera.viewport.project(author3D.transform.position, this.camera.projectionViewMatrix, outVec);
                            var point = new Laya.Point();
                            point.x = outVec.x / Laya.stage.clientScaleX;
                            point.y = outVec.y / Laya.stage.clientScaleY;
                            writeTriggerView.name = newObj["name"] + "tri";
                            SceneLayerManager.sceneLayer.addChild(writeTriggerView);
                            if (author3D.transform.position.x > 1) {
                                writeTriggerView.pos(point.x - 70, point.y - 160);
                            }
                            else {
                                writeTriggerView.pos(point.x - 70, point.y - 190);
                            }
                        }
                    }
                    if (newObj["actWork"] >= 20) {
                        Laya.timer.clear(this, this.countWorkTime);
                        for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                            var curObj = GameConfig.authorInfoArr[n];
                            if (curObj["name"] == newObj["name"]) {
                                curObj["actWork"] = 0;
                                this.action(curObj["name"]);
                            }
                        }
                    }
                }
                else {
                    if (newObj["curStatus"] == 2) {
                        for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                            var twoObj = GameConfig.authorInfoArr[n];
                            if (twoObj["name"] == authObj["name"]) {
                                twoObj["twoWorkTime"] += 1;
                                console.log("加班总时长：" + twoObj["overNum"] + " 当前加班时间：" + twoObj["twoWorkTime"]);
                                if (twoObj["twoWorkTime"] == twoObj["overNum"]) {
                                    twoObj["twoWorkTime"] = 0;
                                    twoObj["overNum"] = 0;
                                    GameConfig.displayPage += 1;
                                    SceneLayerManager.sceneLayer.stopEvent();
                                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                                        var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                                        list.visible = false;
                                    }
                                    this.issueView = new views.action.IssueView(twoObj);
                                    this.issueView.name = "issueView";
                                    SceneLayerManager.sceneLayer.addChild(this.issueView);
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        var randomNum = Hash.getRandomNum(3, 5);
                        for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                            var threeObj = GameConfig.authorInfoArr[n];
                            if (threeObj["name"] == authObj["name"]) {
                                threeObj["pageNum"] += randomNum;
                                if (SceneLayerManager.sceneLayer.getChildByName(threeObj["name"] + "LeftTool") != null) {
                                    var leftToolBarView = SceneLayerManager.sceneLayer.getChildByName(threeObj["name"] + "LeftTool");
                                    leftToolBarView.proVue.value = threeObj["pageNum"] / threeObj["spaceNum"];
                                }
                                console.log("总章数：" + threeObj["spaceNum"] + " 当前写的章数：" + threeObj["pageNum"]);
                                var startDay = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                                var diffDays = Hash.dateDifference(threeObj["releaseStartTime"], startDay);
                                if (diffDays <= 30) {
                                    threeObj["thirtyPageNum"] = threeObj["pageNum"];
                                }
                                if (threeObj["pageNum"] >= threeObj["spaceNum"]) {
                                    threeObj["pageNum"] = 0;
                                    threeObj["spaceNum"] = 0;
                                    threeObj["curStatus"] = 0;
                                    threeObj["thirtyPageNum"] = 0;
                                    var subStr = threeObj["subStr"];
                                    var eleStr = threeObj["eleStr"];
                                    GameConfig.hisStr.replace(subStr + eleStr, "");
                                    if (GameConfig.writingAuthor.length <= 0) {
                                        GameConfig.hisStr = "";
                                    }
                                    for (var i = 0; i < GameConfig.releaseTestObjArr.length; i++) {
                                        var object = GameConfig.releaseTestObjArr[i];
                                        if (object["name"] == threeObj["name"]) {
                                            GameConfig.releaseTestObjArr.splice(i, 1);
                                        }
                                    }
                                    GameConfig.cachData["ReleaseObjArr"] = GameConfig.releaseTestObjArr;
                                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                                        var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                                        list.visible = false;
                                    }
                                    /** 判断是否是首部作品的第一次完结 */
                                    if (IdentityConfig.isFirstFinish == false) {
                                        IdentityConfig.isFirstFinish = true;
                                        IdentityConfig.firstFinishAuthor = authObj["name"];
                                        IdentityConfig.firstFinishPageName = authObj["pageName"];
                                        IdentityConfig.firstFinishPlatName = authObj["platStr"];
                                        GameConfig.cachData["isFirstFinish"] = IdentityConfig.isFirstFinish;
                                        GameConfig.cachData["firstFinishAuthor"] = IdentityConfig.firstFinishAuthor;
                                        GameConfig.cachData["firstFinishPage"] = IdentityConfig.firstFinishPageName;
                                        GameConfig.cachData["firstFinishPlatName"] = IdentityConfig.firstFinishPlatName;
                                    }
                                    GameConfig.displayPage += 1;
                                    SceneLayerManager.sceneLayer.stopEvent();
                                    this.totalScoreView = new views.action.TotalScoreView(threeObj);
                                    SceneLayerManager.sceneLayer.addChild(this.totalScoreView);
                                    return;
                                }
                            }
                        }
                    }
                    if (newObj["actWork"] == 28) {
                        if (WritingConfig.proAddNum == 0) {
                            TipLayerManager.tipLayer.showDrawBgTip("未成功激活进度气泡");
                            WritingConfig.proAddNum = 18;
                            WritingConfig.proAddTime = 25;
                        }
                        else {
                            if (SceneLayerManager.sceneLayer.getChildByName(newObj["name"] + "cir") == null && GameConfig.stopTimer == false && GameConfig.displayPage <= 0) {
                                /** 创建写作进度条 */
                                var outVec = new Laya.Vector3();
                                this.camera.viewport.project(author3D.transform.position, this.camera.projectionViewMatrix, outVec);
                                var point = new Laya.Point();
                                point.x = outVec.x / Laya.stage.clientScaleX;
                                point.y = outVec.y / Laya.stage.clientScaleY;
                                var cirProView = new CircleProView();
                                cirProView.name = newObj["name"] + "cir";
                                SceneLayerManager.sceneLayer.addChild(cirProView);
                                cirProView.pos(point.x + 10, point.y - 120);
                            }
                        }
                    }
                    if (newObj["actWork"] > 30) {
                        Laya.timer.clear(this, this.countWorkTime);
                        for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                            var curObj = GameConfig.authorInfoArr[n];
                            if (curObj["name"] == newObj["name"]) {
                                curObj["actWork"] = 0;
                                this.action(curObj["name"]);
                            }
                        }
                    }
                }
            };
            SpAction.prototype.judgeRate = function () {
                var bool;
                var randomNum = Math.random() * 60;
                if (randomNum < 1) {
                    bool = true;
                    return bool;
                }
                else {
                    bool = false;
                    return bool;
                }
            };
            /** 更换表情页面 */
            SpAction.prototype.changeIconView = function (spName) {
                var scene = SceneLayerManager.sceneLayer.getChildByName("scene");
                var camera = scene.getChildByName("camera");
                if (scene.getChildByName(spName) != null) {
                    var sp = scene.getChildByName(spName);
                    var dObj = this.getAuthorObj(spName);
                    var posX = sp.transform.position.x;
                    if (posX > -1.5 && posX <= 1) {
                        Laya.Tween.clearAll(sp.transform.position);
                        sp.transform.rotate(new Laya.Vector3(0, -180, 0), true, false);
                        Laya.Tween.to(sp.transform.position, { x: -1.5, y: sp.transform.position.y, z: sp.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [sp, dObj]));
                    }
                    else if (posX > 1) {
                        Laya.Tween.clearAll(sp.transform.position);
                        sp.transform.rotate(new Laya.Vector3(0, -90, -90), true, false);
                        sp.transform.position.x = sp.transform.position.x - 1;
                        sp.transform.position.y = dObj["authorPosY"];
                        Laya.Tween.to(sp.transform.position, { x: -1.5, y: sp.transform.position.y, z: sp.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [sp, dObj]));
                    }
                    /** 创建表情气泡*/
                    var outVec = new Laya.Vector3();
                    camera.viewport.project(sp.transform.position, camera.projectionViewMatrix, outVec);
                    var point = new Laya.Point();
                    point.x = outVec.x / Laya.stage.clientScaleX;
                    point.y = outVec.y / Laya.stage.clientScaleY;
                    var preIconViewUI = new PreIconViewUI();
                    preIconViewUI.name = spName + "pre";
                    SceneLayerManager.sceneLayer.addChild(preIconViewUI);
                    preIconViewUI.pos(point.x + 10, point.y - 110);
                    Laya.timer.once(1000, this, this.removePreIconView, [spName]);
                }
            };
            SpAction.prototype.removePreIconView = function (spName) {
                if (SceneLayerManager.sceneLayer.getChildByName(spName + "pre") != null) {
                    SceneLayerManager.sceneLayer.removeChildByName(spName + "pre");
                }
            };
            SpAction.prototype.getAuthorObj = function (spName) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == spName) {
                        return authorObj;
                    }
                }
            };
            SpAction.prototype.resetAction = function () {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    SceneLayerManager.sceneLayer.removeChildByName(auObj["name"] + "spA");
                    var author3D = layers.SceneLayer.scene.getChildByName(auObj["name"]);
                    var posX = author3D.transform.position.x;
                    if ((posX > -1.5 && posX < 0) || (posX > 0 && posX <= 1)) {
                        switch (auObj["sportStatus"]) {
                            case 0:
                                author3D.transform.rotate(new Laya.Vector3(0, 90, 0), true, false);
                                break;
                            case 1:
                                author3D.transform.rotate(new Laya.Vector3(0, 90, 0), true, false);
                                break;
                            case 2:
                                author3D.transform.rotate(new Laya.Vector3(0, -90, 0), true, false);
                                break;
                        }
                    }
                    else if (posX <= -1.5) {
                        author3D.transform.rotate(new Laya.Vector3(0, 90, 0), true, false);
                    }
                    else if (posX > 1) {
                        author3D.transform.rotate(new Laya.Vector3(90, 0, 0), true, false);
                    }
                    author3D.transform.position = new Laya.Vector3(0, auObj["authorPosY"], 0.2);
                    auObj["actWork"] = 0;
                    auObj["actRest"] = 0;
                    auObj["sportStatus"] = 0;
                    Laya.Tween.clearAll(author3D.transform.position);
                    Laya.timer.clearAll(this);
                }
            };
            /** 重聚焦点，重新添加模型动作 */
            SpAction.prototype.createAction = function () {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    var nameStr = auObj["name"];
                    var spAction = new views.layers.SpAction(nameStr);
                    spAction.name = nameStr + "spA";
                    SceneLayerManager.sceneLayer.addChild(spAction);
                }
            };
            /** 暂停动作 */
            SpAction.prototype.pauseAction = function () {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var auObj = GameConfig.authorInfoArr[i];
                    var nameStr = auObj["name"];
                    var author3D = layers.SceneLayer.scene.getChildByName(nameStr);
                    var spView = SceneLayerManager.sceneLayer.getChildByName(nameStr + "spA");
                    Laya.Tween.clearAll(author3D.transform.position);
                    Laya.timer.clearAll(spView);
                    SceneLayerManager.sceneLayer.removeChildByName(nameStr + "spA");
                }
            };
            /** 开启动作 */
            SpAction.prototype.startAction = function () {
                if (GameConfig.displayPage <= 0) {
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var auObj = GameConfig.authorInfoArr[i];
                        var nameStr = auObj["name"];
                        var spAction = new views.layers.SpAction(nameStr);
                        spAction.name = nameStr + "spA";
                        SceneLayerManager.sceneLayer.addChild(spAction);
                    }
                }
            };
            return SpAction;
        }(BaseView));
        layers.SpAction = SpAction;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=SpAction.js.map