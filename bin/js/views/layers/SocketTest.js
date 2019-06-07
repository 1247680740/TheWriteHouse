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
var views;
(function (views) {
    var layers;
    (function (layers) {
        var SocketTest = /** @class */ (function (_super) {
            __extends(SocketTest, _super);
            function SocketTest(nameStr) {
                var _this = _super.call(this) || this;
                _this.scene = SceneLayerManager.sceneLayer.getChildByName("scene");
                _this.camera = _this.scene.getChildByName("camera");
                _this.action(nameStr);
                return _this;
            }
            SocketTest.prototype.action = function (nameStr) {
                var statusOne = [{ "id": 2, "name": "休息" }, { "id": 3, "name": "工作" }];
                var statusObjOne = new Object();
                var statusObjTwo = new Object();
                if (GameConfig.authorInfoArr.length > 0) {
                    // for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    // let author: Object = GameConfig.authorInfoArr[i];
                    var author = this.getAuthorObj(nameStr);
                    if (author["actWork"] == 0 && author["actRest"] == 0) {
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
                    // }
                }
            };
            SocketTest.prototype.judgeStatus = function (statusObj, nameStr, authorObj) {
                if (this.scene.getChildByName(nameStr) != null) {
                    var author3D = this.scene.getChildByName(nameStr);
                    author3D.transform.position = author3D.transform.position;
                    var x = author3D.transform.position.x;
                    var y = author3D.transform.position.y;
                    var initX = x + "";
                    var initY = y + "";
                    var suijiX = x;
                    var suijiY = y + 0.5;
                    var suijishu = Hash.getRandomNum(0, 100);
                    var giftModel = Laya.Sprite3D.load("res/gift/LayaScene_scene/scene.lh");
                    switch (statusObj["name"]) {
                        case "休息":
                            author3D.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);
                            Laya.Tween.to(author3D.transform.position, { x: 1, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upRest, [author3D, authorObj]));
                            authorObj["sportStatus"] = 1;
                            break;
                        case "工作":
                            switch (authorObj["sportStatus"]) {
                                case 0://静止
                                    author3D.transform.rotate(new Laya.Vector3(0, -90, 0), true, false);
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    authorObj["sportStatus"] = 2;
                                    break;
                                case 1://休息
                                    author3D.transform.rotate(new Laya.Vector3(0, -90, -90), true, false);
                                    author3D.transform.position.x = author3D.transform.position.x - 1;
                                    author3D.transform.position.y = authorObj["authorPosY"];
                                    Laya.Tween.to(author3D.transform.position, { x: -1.5, y: author3D.transform.position.y, z: author3D.transform.position.z }, 4000, Laya.Ease.quadOut, Handler.create(this, this.upWork, [author3D, authorObj]));
                                    authorObj["sportStatus"] = 2;
                                    break;
                            }
                            break;
                    }
                }
            };
            /** 工作 */
            SocketTest.prototype.upWork = function (author3D, authObj) {
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var curObj = GameConfig.authorInfoArr[n];
                    if (curObj["name"] == authObj["name"]) {
                        curObj["sportStatus"] = 2;
                        Laya.timer.loop(1000, this, this.countWorkTime, [author3D, curObj]);
                    }
                }
            };
            /** 上床休息 */
            SocketTest.prototype.upRest = function (author3D, authorObj) {
                author3D.transform.rotate(new Laya.Vector3(-90, -90, 0), true, false);
                author3D.transform.position.y = author3D.transform.position.y + 0.4;
                author3D.transform.position.x = author3D.transform.position.x + 1;
                for (var n = 0; n < GameConfig.authorInfoArr.length; n++) {
                    var curObj = GameConfig.authorInfoArr[n];
                    if (curObj["name"] == authorObj["name"]) {
                        curObj["sportStatus"] = 1;
                        Laya.timer.loop(1000, this, this.countRestTime, [curObj]);
                    }
                }
            };
            SocketTest.prototype.countRestTime = function (authObj) {
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
            SocketTest.prototype.countWorkTime = function (author3D, authObj) {
                var newObj = this.getAuthorObj(authObj["name"]);
                newObj["actWork"] = newObj["actWork"] + 1;
                console.log("工作者：" + newObj["name"] + "工作时间：" + newObj["actWork"]);
                if (newObj["curStatus"] == 0) {
                    if (newObj["actWork"] == 18) {
                        if (WritingConfig.proAddNum == 0) {
                            TipLayerManager.tipLayer.showDrawBgTip("未成功激活进度气泡");
                            WritingConfig.proAddNum = 18;
                            WritingConfig.proAddTime = 25;
                        }
                        else {
                            if (SceneLayerManager.sceneLayer.getChildByName(newObj["name"] + "cir") == null && GameConfig.stopTimer == false) {
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
                    if (newObj["actWork"] == 20) {
                        console.log("结束工作者：" + newObj["name"] + "结束时间：" + newObj["actWork"]);
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
                    if (newObj["actWork"] == 28) {
                        if (WritingConfig.proAddNum == 0) {
                            TipLayerManager.tipLayer.showDrawBgTip("未成功激活进度气泡");
                            WritingConfig.proAddNum = 18;
                            WritingConfig.proAddTime = 25;
                        }
                        else {
                            if (SceneLayerManager.sceneLayer.getChildByName(newObj["name"] + "cir") == null && GameConfig.stopTimer == false) {
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
            SocketTest.prototype.getAuthorObj = function (spName) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == spName) {
                        return authorObj;
                    }
                }
            };
            return SocketTest;
        }(BaseView));
        layers.SocketTest = SocketTest;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=SocketTest.js.map