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
    var layers;
    (function (layers) {
        var BaseView = views.base.BaseView;
        var GameConfig = configs.GameConfig;
        /** 大厅场景层 */
        var SceneLayer = /** @class */ (function (_super) {
            __extends(SceneLayer, _super);
            function SceneLayer() {
                var _this = _super.call(this) || this;
                _this.isFirstBool = true;
                _this.touchP = new Laya.Vector2(0, 0);
                _this._position = new Laya.Vector3(0, 3, 8);
                _this.initZ = 7.98;
                _this.everyZ = 0.17;
                _this.jilvArr = [1, 0.5, 0.2, 0.1];
                _this.width = Laya.stage.width;
                _this.height = Laya.stage.height;
                _this._outHitAllInfo = new Array();
                _this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
                _this.point = new Laya.Vector2();
                SceneLayer.instance = _this;
                Laya.loader.create(["res/house/LayaScene_scene/scene.lh",
                    "res/skybox/skyBox1/skyCube.ltc",
                    "res/house2/LayaScene_scene/scene.lh",
                    "res/top/LayaScene_scene/scene.lh",
                    "res/secondFloor/LayaScene_scene/scene.lh",
                    "res/girl/LayaScene_scene/scene.lh",
                    "res/role/LayaScene_scene/scene.lh",
                    "res/boy/LayaScene_scene/scene.lh",
                    "res/gift/LayaScene_scene/scene.lh"], Laya.Handler.create(_this, _this.addSkyBox));
                Laya.stage.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
                Laya.stage.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
                return _this;
            }
            SceneLayer.prototype.harvest = function () {
                if (GameConfig.insPArr.length > 0) {
                    for (var i = 0; i < GameConfig.insPArr.length; i++) {
                        var giftObj = GameConfig.insPArr[i];
                        var insStr = giftObj["giftName"];
                        var spriteIns = SceneLayer.scene.getChildByName(insStr);
                    }
                }
            };
            SceneLayer.prototype.addSkyBox = function () {
                SceneLayer.scene = this.addChild(new Laya.Scene());
                SceneLayer.scene.name = "scene";
                this.camera = (SceneLayer.scene.addChild(new Laya.Camera(0, 1, 1000)));
                this.camera.name = "camera";
                this.camera.transform.translate(new Laya.Vector3(0, 3, 8));
                this.camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
                this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
                //天空盒
                var skyBox = new Laya.SkyBox();
                this.camera.sky = skyBox;
                skyBox.textureCube = Laya.TextureCube.load("res/skybox/skyBox1/skyCube.ltc");
                //创建方向光 
                var directionLight = new Laya.DirectionLight();
                directionLight.transform.translate(new Laya.Vector3(-2, 10, -5));
                directionLight.direction = new Laya.Vector3(6, -6, -9);
                directionLight.shadow = false;
                SceneLayer.scene.addChild(directionLight);
                // 一楼
                var bigHouse = Laya.Sprite3D.load("res/house/LayaScene_scene/scene.lh");
                var bigHouseMesh = bigHouse.getChildAt(0)["_childs"][5]["_childs"][0];
                var bigHouseMaterial = bigHouseMesh.meshRender.sharedMaterial;
                bigHouseMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                var bigHouseVec3 = new Laya.Vector3(0, 0, 0);
                bigHouseMesh.meshRender.material = bigHouseMaterial;
                var houseName = "bigHouse";
                this.createCommonModel(SceneLayer.scene, bigHouse, bigHouseVec3, houseName);
                //二楼
                var sconedFloor = Laya.Sprite3D.load("res/secondFloor/LayaScene_scene/scene.lh");
                for (var i = 0; i < 11; i++) {
                    var newMeshMesh = (sconedFloor.getChildAt(0)["_childs"][i]["_childs"][0]);
                    var floorMaterial = newMeshMesh.meshRender.sharedMaterial;
                    floorMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                    floorMaterial.specularColor = new Laya.Vector4(0.04, 0.05, 0.15, 0.01);
                    floorMaterial.diffuseTexture = Laya.Texture2D.load("res/secondFloor/LayaScene_scene/Assets/house/tex.png");
                    newMeshMesh.meshRender.material = floorMaterial;
                }
                var sconedFloorMesh = (sconedFloor.getChildAt(0)["_childs"][7]["_childs"][0]);
                var sconedFloorclid = (sconedFloorMesh["_components"][0]);
                sconedFloorclid.setFromBoundBox(sconedFloorMesh.meshFilter.sharedMesh.boundingBox);
                sconedFloorMesh.name = "floor1";
                var sconedFloorVec3 = new Laya.Vector3(0, 1.9, 0);
                var sconedFloorName = "sconedFloor";
                this.createCommonModel(SceneLayer.scene, sconedFloor, sconedFloorVec3, sconedFloorName);
                //房顶
                var top = Laya.Sprite3D.load("res/top/LayaScene_scene/scene.lh");
                var topVec3 = new Laya.Vector3(bigHouse.transform.position.x, 3.8, bigHouse.transform.position.z);
                var topName = "top";
                var meshTop3D = top.getChildAt(0).getChildAt(0);
                var sharedMaterial = meshTop3D.meshRender.sharedMaterial;
                sharedMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                sharedMaterial.specularColor = new Laya.Vector4(0.04, 0.1, 0.2, 0.01);
                sharedMaterial.specularTexture = Laya.Texture2D.load("res/top/LayaScene_scene/Assets/house/tex.png");
                meshTop3D.meshRender.material = sharedMaterial;
                this.createCommonModel(SceneLayer.scene, top, topVec3, topName);
                // 女孩
                var girl = Laya.Sprite3D.load("res/girl/LayaScene_scene/scene.lh");
                var girlVec3 = new Laya.Vector3(0, 0, 0.5);
                var girlName = "女管家";
                this.createCommonModel(SceneLayer.scene, girl, girlVec3, girlName);
                /** 获取女孩mesh对象 */
                var girlMesh = (girl.getChildAt(0)["_childs"][0]);
                var girlclid = (girlMesh["_colliders"][0]);
                girlclid.setFromBoundBox(girlMesh.meshFilter.sharedMesh.boundingBox);
                girlMesh.name = "girl";
                // 添加工具栏
                UILayerManager.uiLayer = views.layers.UILayer.instance;
                UILayerManager.uiLayer.name = "uiLayer";
                UILayerManager.uiLayer.pos(0, 0);
                UILayerManager.uiLayer.zOrder = 1;
                this.addChild(UILayerManager.uiLayer);
                UILayerManager.uiLayer.visible = true;
                /** 开启射线检测，并给模型添加事件 */
                Laya.timer.frameLoop(1, this, this.checkHit);
                Laya.stage.on(Laya.Event.CLICK, this, this.douClick);
                /** 灵感礼物产生先关逻辑处理 */
                // Laya.timer.loop(5000, this, this.checkSp);
                // Laya.timer.loop(1000, this, this.giftGive);
                /**初始化时 判断是否包含缓存已签约作者，并将其从招聘配置数据中移除 */
                if (this.isFirstBool) {
                    // 第一次进入时间  坚持就是胜利
                    if (GameConfig.achiArr[3] == null || GameConfig.achiArr[3] == '') {
                        GameConfig.entergametime = Laya.Browser.now();
                    }
                    if (!GameConfig.playtime) {
                        GameConfig.playtime = Laya.Browser.now();
                    }
                    this.isFirstBool = false;
                    if (GameConfig.cachData["homeFloor"] > 1) {
                        var floorLength = GameConfig.cachData["homeFloor"] - 1;
                        for (var i = 0; i < floorLength; i++) {
                            this.buildHomeTwo(); //初始化建造房屋
                        }
                    }
                    if (GameConfig.cachData.hasOwnProperty("authorInfoArr")) {
                        if (GameConfig.cachData["authorInfoArr"].length > 0) {
                            GameConfig.authorInfoArr = GameConfig.cachData["authorInfoArr"];
                            GameConfig.signingNum = GameConfig.authorInfoArr.length;
                            for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                                var obj = GameConfig.authorInfoArr[i];
                                GameConfig.authorIdArr.push(obj["id"] + "");
                                for (var j = 0; j < GameConfig.guding.length; j++) {
                                    var auObj = GameConfig.guding[j];
                                    if (auObj["id"] == obj["id"]) {
                                        this.createBoyTwo(obj["name"], i + 1); //初始化创建作者
                                    }
                                }
                            }
                        }
                    }
                    if (GameConfig.displayPage <= 0) {
                        SceneLayerManager.sceneLayer.openEvent();
                    }
                }
            };
            SceneLayer.prototype.checkSp = function () {
                if (GameConfig.authorInfoArr.length > 0) {
                    for (var j = 0; j < GameConfig.authorInfoArr.length; j++) {
                        var auObj = GameConfig.authorInfoArr[j];
                        if (SceneLayer.scene.getChildByName(auObj["name"]) != null) {
                            this.productGift(auObj);
                        }
                    }
                }
            };
            SceneLayer.prototype.productGift = function (auObj) {
                var author3D = SceneLayer.scene.getChildByName(auObj["name"]);
                var x = author3D.transform.position.x;
                var y = author3D.transform.position.y;
                var initX = x + "";
                var initY = y + "";
                var suijiX = x;
                var suijiY = y + 0.5;
                var suijishu = Hash.getRandomNum(0, 100);
                var gailu1 = (auObj["curiousMax"] / 100 * this.jilvArr[1]) * 100;
                var giftModel = Laya.Sprite3D.load("res/gift/LayaScene_scene/scene.lh");
                if (suijishu >= 1 && suijishu <= gailu1) {
                    var giftVec = new Laya.Vector3(suijiX, suijiY, 1);
                    this.cloneGift = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(giftModel, null, false, giftVec));
                    this.cloneGift.name = auObj["name"] + suijishu + GameConfig.insPArr.length;
                    this.cloneGift.transform.localScale = new Laya.Vector3(0, 0, 0);
                    this.giftAction(this.cloneGift);
                    var giftObj = new Object();
                    giftObj["giftName"] = this.cloneGift.name;
                    giftObj["giftTime"] = 0;
                    GameConfig.insPArr.push(giftObj);
                    Laya.timer.once(500, this, this.downGift, [this.cloneGift]);
                }
            };
            SceneLayer.prototype.giftGive = function () {
                if (GameConfig.insPArr.length > 0) {
                    for (var i = 0; i < GameConfig.insPArr.length; i++) {
                        var giftObj = GameConfig.insPArr[i];
                        var giftName = giftObj["giftName"];
                        giftObj["giftTime"] = giftObj["giftTime"] + 1;
                        if (giftObj["giftTime"] == 60) {
                            if (SceneLayer.scene.getChildByName(giftName) != null) {
                                var spri3d = SceneLayer.scene.getChildByName(giftName);
                                Laya.Tween.to(spri3d.transform.localScale, { x: 0, y: 0, z: 0 }, 3000, null, Handler.create(this, this.removeSp3dTwo, [spri3d, i], true));
                            }
                        }
                    }
                }
            };
            SceneLayer.prototype.giftAction = function (cloneGift) {
                Laya.Tween.to(cloneGift.transform.localScale, { x: 0.08, y: 0.08, z: 0.08 }, 500);
            };
            SceneLayer.prototype.downGift = function (cloneGift) {
                Laya.Tween.to(cloneGift.transform.position, { x: cloneGift.transform.position.x, y: 0, z: cloneGift.transform.position.z }, 1000);
            };
            SceneLayer.prototype.douClick = function (event) {
                if (GameConfig.stopTimer || event.target.name != 'sceneLayer') {
                    return;
                }
                var eventName = event.target.name;
                if (GameConfig.displayPage > 0 || eventName == "WritingBtn" || eventName == "startBtn" || eventName == "releaseBtn" || eventName == "closeBtn") {
                    event.stopPropagation();
                    return;
                }
                else {
                    for (var i = 0; i < this._outHitAllInfo.length; i++) {
                        var spName = this._outHitAllInfo[i].sprite3D.name;
                        if (spName == "boy") {
                            var ZWname = this._outHitAllInfo[i].sprite3D["parent"]["parent"]["name"];
                            GameConfig.displayPage += 1;
                            this.stopEvent();
                            var singlePlayerInfoView = new views.player.SinglePlayerInfoView(ZWname);
                            SceneLayerManager.sceneLayer.addChild(singlePlayerInfoView);
                        }
                    }
                }
            };
            SceneLayer.prototype.checkHit = function () {
                /** 进行写作进度条位置每帧渲染 */
                for (var k = 0; k < GameConfig.authorInfoArr.length; k++) {
                    var authObj = GameConfig.authorInfoArr[k];
                    /** 获取模型位置 */
                    var outVec = new Laya.Vector3();
                    var point = new Laya.Point();
                    var boySp3d = SceneLayer.scene.getChildByName(authObj["name"]);
                    /** 更新进度条位置 */
                    if (this.getChildByName(authObj["name"] + "cir") != null) {
                        var cirView = this.getChildByName(authObj["name"] + "cir");
                        this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                        point.x = outVec.x / Laya.stage.clientScaleX;
                        point.y = outVec.y / Laya.stage.clientScaleY;
                        if (boySp3d.transform.position.x > 1) {
                            cirView.pos(point.x - 60, point.y - 90);
                        }
                        else {
                            cirView.pos(point.x + 10, point.y - 110);
                        }
                    }
                    /** 更新表情位置 */
                    var outVecT = new Laya.Vector3();
                    var pointT = new Laya.Point();
                    if (this.getChildByName(authObj["name"] + "pre") != null) {
                        var preView = this.getChildByName(authObj["name"] + "pre");
                        this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVecT);
                        pointT.x = outVecT.x / Laya.stage.clientScaleX;
                        pointT.y = outVecT.y / Laya.stage.clientScaleY;
                        if (boySp3d.transform.position.x > 1) {
                            preView.pos(pointT.x - 60, pointT.y - 90);
                        }
                        else {
                            preView.pos(pointT.x + 10, pointT.y - 110);
                        }
                    }
                    /** 更新触发写作界面位置 */
                    if (this.getChildByName(authObj["name"] + "tri") != null) {
                        var triView = this.getChildByName(authObj["name"] + "tri");
                        this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                        point.x = outVec.x / Laya.stage.clientScaleX;
                        point.y = outVec.y / Laya.stage.clientScaleY;
                        if (boySp3d.transform.position.x > 1) {
                            triView.pos(point.x - 70, point.y - 160);
                        }
                        else {
                            triView.pos(point.x - 70, point.y - 190);
                        }
                    }
                    /** 更新左侧点击页面位置 */
                    if (this.getChildByName(authObj["name"] + "LeftTool") != null) {
                        var leftView = this.getChildByName(authObj["name"] + "LeftTool");
                        this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                        point.x = outVec.x / Laya.stage.clientScaleX;
                        point.y = outVec.y / Laya.stage.clientScaleY;
                        if (boySp3d.transform.position.y <= authObj["authorPosY"]) {
                            leftView.pos(0, point.y - 160);
                        }
                        else {
                            leftView.pos(0, point.y - 120);
                        }
                    }
                }
                /** 进行模型每帧渲染 */
                if (GameConfig.authorInfoArr.length > 0) {
                    for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                        var author = GameConfig.authorInfoArr[i];
                        var nameStr = author["name"];
                        if (SceneLayer.scene.getChildByName(nameStr) != null) {
                            var author3D = SceneLayer.scene.getChildByName(nameStr);
                            author3D.transform.position = author3D.transform.position;
                        }
                    }
                }
                if (GameConfig.insPArr.length > 0) {
                    for (var m = 0; m < GameConfig.insPArr.length; m++) {
                        var giftObj = GameConfig.insPArr[m];
                        var insp = giftObj["giftName"];
                        if (SceneLayer.scene.getChildByName(insp) != null) {
                            var insP3D = SceneLayer.scene.getChildByName(insp);
                            insP3D.transform.position = insP3D.transform.position;
                        }
                    }
                }
                //从屏幕空间生成射线
                this.point.elements[0] = Laya.MouseManager.instance.mouseX;
                this.point.elements[1] = Laya.MouseManager.instance.mouseY;
                this.camera.viewportPointToRay(this.point, this.ray);
                //射线检测获取所有检测碰撞到的物体
                Laya.Physics.rayCastAll(this.ray, this._outHitAllInfo, 30, 0);
            };
            SceneLayer.prototype.buildHome = function (state) {
                var exl = managers.ResourceManager.incomeArr;
                var _year = Math.min(GameConfig.year, exl[exl.length - 1]['year']);
                var shoufu;
                var quankuan;
                for (var i = 0; i < exl.length; i++) {
                    if (_year == exl[i]['year']) {
                        shoufu = Math.floor(exl[i]['spreaMoney'] * 0.2);
                        quankuan = exl[i]['spreaMoney'];
                        break;
                    }
                }
                if (state == 1) {
                    if (GameConfig.money >= shoufu) {
                        GameConfig.homeFloor += 1;
                        GameConfig.cachData["homeFloor"] = GameConfig.homeFloor;
                        var curNum = 1.9;
                        var topY = GameConfig.homeFloor + 1;
                        var floors = curNum * GameConfig.homeFloor;
                        var newFloor = curNum * topY;
                        // 获取楼层模型
                        var scene = this.getChildByName("scene");
                        var bigHouse2 = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");
                        this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);
                        // 获取房顶模型
                        var top_1 = scene.getChildByName("top");
                        top_1.transform.position = new Laya.Vector3(0, newFloor, 0);
                        // 花费的金币
                        var surMoney = GameConfig.money - shoufu;
                        GameConfig.money = surMoney;
                        views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                        GameConfig.loanarr.push(GameConfig.year);
                        GameConfig.cachData['loanarr'] = GameConfig.loanarr;
                        //更上一层楼
                        var avchidata = managers.ResourceManager.achiveGoldArr;
                        if (GameConfig.homeFloor == avchidata[1]['aim'] + 1) {
                            var achive = new views.events.AchiEvent(1);
                        }
                        laya.media.SoundManager.playSound("res/sounds/build.mp3", 1);
                    }
                    else {
                        TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                        return;
                    }
                }
                else {
                    if (GameConfig.money < quankuan) {
                        TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                        return;
                    }
                    else {
                        GameConfig.homeFloor += 1;
                        GameConfig.cachData["homeFloor"] = GameConfig.homeFloor;
                        var curNum = 1.9;
                        var topY = GameConfig.homeFloor + 1;
                        var floors = curNum * GameConfig.homeFloor;
                        var newFloor = curNum * topY;
                        // 获取楼层模型
                        var scene = this.getChildByName("scene");
                        var bigHouse2 = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");
                        this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);
                        // 获取房顶模型
                        var top_2 = scene.getChildByName("top");
                        top_2.transform.position = new Laya.Vector3(0, newFloor, 0);
                        // 花费的金币
                        var surMoney = GameConfig.money - quankuan;
                        GameConfig.money = surMoney;
                        views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                        //更上一层楼
                        var avchidata = managers.ResourceManager.achiveGoldArr;
                        if (GameConfig.homeFloor == avchidata[1]['aim'] + 1) {
                            var achive = new views.events.AchiEvent(1);
                        }
                        laya.media.SoundManager.playSound("res/sounds/build.mp3", 1);
                    }
                }
            };
            SceneLayer.prototype.buildHomeTwo = function () {
                GameConfig.homeFloor += 1;
                var curNum = 1.9;
                var topY = GameConfig.homeFloor + 1;
                var floors = curNum * GameConfig.homeFloor;
                var newFloor = curNum * topY;
                // 获取楼层模型
                var scene = this.getChildByName("scene");
                var bigHouse2 = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");
                this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);
                // 获取房顶模型
                var top = scene.getChildByName("top");
                top.transform.position = new Laya.Vector3(0, newFloor, 0);
            };
            /** 创建楼层 */
            SceneLayer.prototype.createFloor = function (scene, floors, num, bigHouse2) {
                this.cloneHouse = scene.addChild(Laya.Sprite3D.instantiate(bigHouse2, null, false, new Laya.Vector3(0, floors, 0)));
                var floorMesh = (this.cloneHouse.getChildAt(0)["_childs"][7]["_childs"][0]);
                var floorclid = (floorMesh["_components"][0]);
                floorclid.setFromBoundBox(floorMesh.meshFilter.sharedMesh.boundingBox);
                floorMesh.name = "floor" + num;
                bigHouse2.transform.translate(new Laya.Vector3(0, floors, 0));
                this.cloneHouse.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
                this.cloneHouse.name = num + "";
                for (var i = 0; i < 11; i++) {
                    var homeMesh = (this.cloneHouse.getChildAt(0)["_childs"][i]["_childs"][0]);
                    var homeMaterial = homeMesh.meshRender.sharedMaterial;
                    homeMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                    homeMaterial.specularColor = new Laya.Vector4(0.04, 0.05, 0.15, 0.01);
                    homeMaterial.diffuseTexture = Laya.Texture2D.load("res/secondFloor/LayaScene_scene/Assets/house/tex.png");
                    homeMesh.meshRender.material = homeMaterial;
                }
            };
            /** 创建作者 */
            SceneLayer.prototype.createBoy = function (nameStr) {
                var curNum = 1.9;
                var boyModel = Laya.Sprite3D.load("res/boy/LayaScene_scene/scene.lh");
                this.yy = GameConfig.signingNum * curNum;
                this.hh = this.yy + "";
                if (GameConfig.authorPos.length == 0) {
                    this.hh = this.yy + "";
                    GameConfig.authorPos.push(this.hh);
                    this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                }
                else {
                    if (GameConfig.authorPos.indexOf(this.hh) != -1) {
                        for (var i = GameConfig.signingNum; i > 0; i--) {
                            this.yy = i * curNum;
                            this.hh = this.yy + "";
                            if (GameConfig.authorPos.indexOf(this.hh) == -1) {
                                GameConfig.authorPos.push(this.hh);
                                this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                            }
                        }
                    }
                    else {
                        GameConfig.authorPos.push(this.hh);
                        this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                    }
                }
                for (var i_1 = 0; i_1 < GameConfig.authorInfoArr.length; i_1++) {
                    var authorObj = GameConfig.authorInfoArr[i_1];
                    if (authorObj["name"] == nameStr) {
                        authorObj["authorPosY"] = this.newVec3.y;
                    }
                }
                this.cloneBoy = Laya.Pool.getItemByClass(nameStr, Laya.Sprite3D);
                this.cloneBoy = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(boyModel, null, false, this.newVec3));
                var boyMesh = (this.cloneBoy.getChildAt(0)["_childs"][0]);
                var boyclid = (boyMesh["_colliders"][0]);
                boyclid.setFromBoundBox(boyMesh.meshFilter.sharedMesh.boundingBox);
                this.cloneBoy.name = nameStr;
                boyMesh.name = "boy";
                this.cloneBoy.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
            };
            SceneLayer.prototype.createBoyTwo = function (nameStr, i) {
                var curNum = 1.9;
                var boyModel = Laya.Sprite3D.load("res/boy/LayaScene_scene/scene.lh");
                this.yy = i * curNum;
                this.hh = this.yy + "";
                GameConfig.authorPos.push(this.hh);
                this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                this.cloneBoy = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(boyModel, null, false, this.newVec3));
                var boyMesh = (this.cloneBoy.getChildAt(0)["_childs"][0]);
                var boyclid = (boyMesh["_colliders"][0]);
                boyclid.setFromBoundBox(boyMesh.meshFilter.sharedMesh.boundingBox);
                this.cloneBoy.name = nameStr;
                boyMesh.name = "boy";
                this.cloneBoy.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
            };
            /** 删除作者 */
            SceneLayer.prototype.deleteAuthor = function (nameStr) {
                var obj = SceneLayer.scene.getChildByName(nameStr);
                Laya.Tween.clearAll(obj.transform.position);
                this.hh = (obj.transform.position.y).toFixed(1);
                var index = GameConfig.authorPos.indexOf(this.hh);
                GameConfig.authorPos.splice(index, 1);
                SceneLayer.scene.removeChildByName(nameStr);
                Laya.Pool.recover(nameStr, obj);
                /** 删除作者动作 */
                SceneLayerManager.sceneLayer.removeChildByName(nameStr + "spA");
            };
            SceneLayer.prototype.createCommonModel = function (scene, sp3d, vec3, name) {
                sp3d.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
                sp3d.transform.translate(vec3);
                sp3d.name = name;
                SceneLayer.scene.addChild(sp3d);
            };
            /** 移动房屋事件 */
            SceneLayer.prototype.onMouseDown = function (e) {
                if (GameConfig.stopTimer) {
                    return;
                }
                if (GameConfig.displayPage <= 0) {
                    if (GameConfig.insPArr.length > 0) {
                        var vec1 = new Laya.Vector3(e.target.mouseX, e.target.mouseY, 0);
                        // let tauchVec: Laya.Vector3 = new Laya.Vector3();
                        // tauchVec = Hash.screenCoordTo3DCoord(vec1, tauchVec);
                        for (var i = 0; i < GameConfig.insPArr.length; i++) {
                            var giftObj = GameConfig.insPArr[i];
                            var objName = giftObj["giftName"];
                            if (SceneLayer.scene.getChildByName(objName) != null) {
                                var spri3d = SceneLayer.scene.getChildByName(objName);
                                var spVec = new Laya.Vector3();
                                this.camera.viewport.project(spri3d.transform.position, this.camera.projectionViewMatrix, spVec);
                                var point = new Laya.Point();
                                point.x = spVec.x / Laya.stage.clientScaleX;
                                point.y = spVec.y / Laya.stage.clientScaleY;
                                var poly = new Array();
                                var obj1 = new Object();
                                var obj2 = new Object();
                                var obj3 = new Object();
                                var obj4 = new Object();
                                var obj5 = new Object();
                                obj1 = { x: vec1.x - 100, y: vec1.y + 100 };
                                obj2 = { x: vec1.x + 100, y: vec1.y + 100 };
                                obj3 = { x: vec1.x + 100, y: vec1.y - 100 };
                                obj4 = { x: vec1.x - 100, y: vec1.y - 100 };
                                obj5 = { x: vec1.x - 100, y: vec1.y + 100 };
                                poly.push(obj1);
                                poly.push(obj2);
                                poly.push(obj3);
                                poly.push(obj4);
                                poly.push(obj5);
                                var isInPoly = Hash.pointInPoly(point, poly);
                                if (isInPoly == true) {
                                    /** 收集灵感动画 */
                                    Laya.Tween.to(spri3d.transform.localScale, { x: 0, y: 0, z: 0 }, 3000, null, Handler.create(this, this.removeSp3d, [spri3d, i], true));
                                }
                            }
                        }
                    }
                    if (GameConfig.homeFloor <= 1) {
                        return;
                    }
                    else {
                        var top_3 = SceneLayer.scene.getChildByName("top");
                        this.topStringPos = (top_3.transform.position.y - 0.7).toFixed(2);
                        this.topPos = parseFloat(this.topStringPos);
                        this.topPosY = this.topPos - 0.71;
                        this.posStringZ = (this.initZ - GameConfig.homeFloor * this.everyZ).toFixed(2);
                        this.posZ = parseFloat(this.posStringZ);
                        this.touchP = new Laya.Vector2(e.target.mouseX, e.target.mouseY);
                        if (e.target.mouseY > 120 && e.target.mouseY < 890) {
                            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
                        }
                    }
                }
                else {
                    e.stopPropagation();
                    return;
                }
            };
            SceneLayer.prototype.removeSp3d = function (spri3d, i) {
                SceneLayer.scene.removeChild(spri3d);
                GameConfig.insPArr.splice(i, 1);
                var rateNum = this.judgeHole(10);
                GameConfig.brainHole = GameConfig.brainHole + (1 * rateNum);
                views.toolbar.TopToolBarView.getInstance().resetHole(GameConfig.brainHole);
            };
            /** 进行灵感值判断 */
            SceneLayer.prototype.judgeHole = function (rateNum) {
                var curNum = Hash.getRandomNum(1, 3);
                var levelArr = [];
                levelArr.splice(0, levelArr.length);
                for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                    var everyObj = GameConfig.everyLevelArr[i];
                    levelArr.push(everyObj["level"]);
                }
                if (levelArr.indexOf(rateNum) != -1) {
                    for (var i = 0; i < GameConfig.everyLevelArr.length; i++) {
                        var everyObj = GameConfig.everyLevelArr[i];
                        var curNum_1 = everyObj["point"];
                        if (everyObj["level"] == rateNum) {
                            if (curNum_1 == 1) {
                                if (curNum_1 >= 2) {
                                    return 2;
                                }
                                else {
                                    return 1;
                                }
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
            SceneLayer.prototype.removeSp3dTwo = function (spri3d, i) {
                SceneLayer.scene.removeChild(spri3d);
                GameConfig.insPArr.splice(i, 1);
            };
            SceneLayer.prototype.onmousemove = function (e) {
                if (GameConfig.displayPage > 0) {
                    e.stopPropagation();
                    return;
                }
                else {
                    if (GameConfig.homeFloor <= 1) {
                        return;
                    }
                    else {
                        if (e.target.mouseY > 120 && e.target.mouseY < 890) {
                            this.camera.transform.translate(new Laya.Vector3(0, -(this.touchP.y - e.target.mouseY) / 150, 0));
                            this.touchP = new Laya.Vector2(e.target.mouseX, e.target.mouseY);
                            if (this.camera.transform.position.y < 3.2) {
                                this.camera.transform.position = new Laya.Vector3(0, 3.21, this.initZ);
                            }
                            else if (this.camera.transform.position.y > this.topPosY) {
                                this.camera.transform.position = new Laya.Vector3(0, this.topPosY, this.posZ);
                            }
                        }
                        else {
                            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
                        }
                    }
                }
            };
            SceneLayer.prototype.onMouseUp = function (e) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
            };
            SceneLayer.prototype.selectObj = function (obj) {
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var infoObj = GameConfig.authorInfoArr[i];
                    if (infoObj["name"] == obj["name"]) {
                        return infoObj;
                    }
                }
            };
            SceneLayer.prototype.closeSceneEnable = function () {
                Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
            };
            SceneLayer.prototype.openSceneEnable = function () {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
            };
            /** 结束相关事件及计时器的触发 */
            SceneLayer.prototype.stopEvent = function () {
                if (!GameConfig.stopTimer) {
                    GameConfig.stopTimer = true;
                }
                // Laya.timer.clear(this, this.giftGive);
                // Laya.timer.clear(this, this.checkSp);
                views.layers.SpAction.prototype.pauseAction();
                views.common.TimeBackView.instance.stopTimer();
                SceneLayerManager.sceneLayer.closeSceneEnable();
            };
            /** 开启相关事件及计时器的触发 */
            SceneLayer.prototype.openEvent = function () {
                if (GameConfig.stopTimer) {
                    GameConfig.stopTimer = false;
                }
                // Laya.timer.loop(1000, this, this.giftGive);
                // Laya.timer.loop(5000, this, this.checkSp);
                if (GameConfig.authorInfoArr.length > 0) {
                    views.layers.SpAction.prototype.startAction();
                }
                views.common.TimeBackView.instance.startTimer();
                SceneLayerManager.sceneLayer.openSceneEnable();
            };
            return SceneLayer;
        }(BaseView));
        layers.SceneLayer = SceneLayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=SceneLayer.js.map