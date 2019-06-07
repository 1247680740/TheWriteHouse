namespace views.layers {
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import BaseView = views.base.BaseView;
    import Rectangle = laya.maths.Rectangle;
    import GameConfig = configs.GameConfig;
    import SinglePlayerInfoView = views.player.SinglePlayerInfoView;
    import WritingView = views.action.WritingView;
    import Layer = laya.d3.core.Layer;
    import LoginView = views.common.LoginView;
    import LoginToolBarView = views.toolbar.LoginToolBarView;
    import CircleProView = views.common.CircleProView;
    import WriteTriggerView = views.common.WriteTriggerView;
    import LeftToolBarView = views.toolbar.LeftToolBarView;
    import RenderState = laya.d3.core.render.RenderState;
    import HitArea = Laya.HitArea;
    import PreIconViewUI = ui.common.PreIconViewUI;

    /** 大厅场景层 */
    export class SceneLayer extends BaseView {

        private static instance: SceneLayer;
        public static scene: Laya.Scene;
        private camera: Laya.Camera;
        private ray: Laya.Ray;
        private point: Laya.Vector2;
        private _outHitAllInfo: Array<Laya.RaycastHit>;
        private cloneHouse: Laya.Sprite3D;
        private cloneBoy: Laya.Sprite3D;
        private cloneGift: Laya.Sprite3D;
        private yy: number;
        private hh: string;
        private newVec3: Laya.Vector3;
        private isFirstBool: Boolean = true;
        private touchP: Laya.Vector2 = new Laya.Vector2(0, 0);
        private _position: Laya.Vector3 = new Laya.Vector3(0, 3, 8);
        static cameraY: number;
        static oldMouPos: number;
        static writingTime: number;
        // static startWritingTime: number;

        private topPos: number;
        private topPosY: number;
        private topStringPos: string;

        private initZ: number = 7.98;
        private everyZ: number = 0.17;
        private posStringZ: string;
        private posZ: number;
        private jilvArr: Array<number> = [1, 0.5, 0.2, 0.1];

        constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this._outHitAllInfo = new Array<Laya.RaycastHit>();
            this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
            this.point = new Laya.Vector2();
            SceneLayer.instance = this;
            Laya.loader.create(["res/house/LayaScene_scene/scene.lh",
                "res/skybox/skyBox1/skyCube.ltc",
                "res/house2/LayaScene_scene/scene.lh",
                "res/top/LayaScene_scene/scene.lh",
                "res/secondFloor/LayaScene_scene/scene.lh",
                "res/girl/LayaScene_scene/scene.lh",
                "res/role/LayaScene_scene/scene.lh",
                "res/boy/LayaScene_scene/scene.lh",
                "res/gift/LayaScene_scene/scene.lh"], Laya.Handler.create(this, this.addSkyBox));
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        }

        harvest(): void {
            if (GameConfig.insPArr.length > 0) {
                for (let i: number = 0; i < GameConfig.insPArr.length; i++) {
                    let giftObj: Object = GameConfig.insPArr[i];
                    let insStr: string = giftObj["giftName"];
                    let spriteIns: Laya.Sprite3D = SceneLayer.scene.getChildByName(insStr) as Laya.Sprite3D;
                }
            }
        }

        addSkyBox(): void {
            SceneLayer.scene = this.addChild(new Laya.Scene()) as Laya.Scene;
            SceneLayer.scene.name = "scene";
            this.camera = (SceneLayer.scene.addChild(new Laya.Camera(0, 1, 1000))) as Laya.Camera;
            this.camera.name = "camera";
            this.camera.transform.translate(new Laya.Vector3(0, 3, 8));
            this.camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
            this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;

            //天空盒
            var skyBox = new Laya.SkyBox();
            this.camera.sky = skyBox;
            skyBox.textureCube = Laya.TextureCube.load("res/skybox/skyBox1/skyCube.ltc");

            //创建方向光 
            var directionLight: Laya.DirectionLight = new Laya.DirectionLight();
            directionLight.transform.translate(new Laya.Vector3(-2, 10, -5));
            directionLight.direction = new Laya.Vector3(6, -6, -9);
            directionLight.shadow = false;
            SceneLayer.scene.addChild(directionLight);

            // 一楼
            var bigHouse: Laya.Sprite3D = Laya.Sprite3D.load("res/house/LayaScene_scene/scene.lh");
            let bigHouseMesh: Laya.MeshSprite3D = bigHouse.getChildAt(0)["_childs"][5]["_childs"][0] as Laya.MeshSprite3D;
            let bigHouseMaterial: Laya.StandardMaterial = bigHouseMesh.meshRender.sharedMaterial as Laya.StandardMaterial;
            bigHouseMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
            let bigHouseVec3: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
            bigHouseMesh.meshRender.material = bigHouseMaterial;
            let houseName: string = "bigHouse";
            this.createCommonModel(SceneLayer.scene, bigHouse, bigHouseVec3, houseName);

            //二楼
            var sconedFloor: Laya.Sprite3D = Laya.Sprite3D.load("res/secondFloor/LayaScene_scene/scene.lh");
            for (let i: number = 0; i < 11; i++) {
                let newMeshMesh: Laya.MeshSprite3D = (sconedFloor.getChildAt(0)["_childs"][i]["_childs"][0]) as Laya.MeshSprite3D;
                let floorMaterial: Laya.StandardMaterial = newMeshMesh.meshRender.sharedMaterial as Laya.StandardMaterial;
                floorMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                floorMaterial.specularColor = new Laya.Vector4(0.04, 0.05, 0.15, 0.01);
                floorMaterial.diffuseTexture = Laya.Texture2D.load("res/secondFloor/LayaScene_scene/Assets/house/tex.png");
                newMeshMesh.meshRender.material = floorMaterial;
            }
            let sconedFloorMesh: Laya.MeshSprite3D = (sconedFloor.getChildAt(0)["_childs"][7]["_childs"][0]) as Laya.MeshSprite3D;
            let sconedFloorclid: Laya.BoxCollider = (sconedFloorMesh["_components"][0]) as Laya.BoxCollider;
            sconedFloorclid.setFromBoundBox(sconedFloorMesh.meshFilter.sharedMesh.boundingBox);
            sconedFloorMesh.name = "floor1";
            let sconedFloorVec3: Laya.Vector3 = new Laya.Vector3(0, 1.9, 0);
            let sconedFloorName: string = "sconedFloor";
            this.createCommonModel(SceneLayer.scene, sconedFloor, sconedFloorVec3, sconedFloorName);

            //房顶
            var top: Laya.Sprite3D = Laya.Sprite3D.load("res/top/LayaScene_scene/scene.lh");
            let topVec3: Laya.Vector3 = new Laya.Vector3(bigHouse.transform.position.x, 3.8, bigHouse.transform.position.z);
            let topName: string = "top";
            let meshTop3D: Laya.MeshSprite3D = top.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
            let sharedMaterial: Laya.StandardMaterial = meshTop3D.meshRender.sharedMaterial as Laya.StandardMaterial;
            sharedMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
            sharedMaterial.specularColor = new Laya.Vector4(0.04, 0.1, 0.2, 0.01);
            sharedMaterial.specularTexture = Laya.Texture2D.load("res/top/LayaScene_scene/Assets/house/tex.png");
            meshTop3D.meshRender.material = sharedMaterial;
            this.createCommonModel(SceneLayer.scene, top, topVec3, topName);

            // 女孩
            var girl: Laya.Sprite3D = Laya.Sprite3D.load("res/girl/LayaScene_scene/scene.lh");
            let girlVec3: Laya.Vector3 = new Laya.Vector3(0, 0, 0.5);
            let girlName: string = "女管家";
            this.createCommonModel(SceneLayer.scene, girl, girlVec3, girlName);

            /** 获取女孩mesh对象 */
            let girlMesh: Laya.MeshSprite3D = (girl.getChildAt(0)["_childs"][0]) as Laya.MeshSprite3D;
            let girlclid: Laya.BoxCollider = (girlMesh["_colliders"][0]) as Laya.BoxCollider;
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
                    let floorLength: number = GameConfig.cachData["homeFloor"] - 1;
                    for (let i = 0; i < floorLength; i++) {
                        this.buildHomeTwo();  //初始化建造房屋
                    }
                }
                if (GameConfig.cachData.hasOwnProperty("authorInfoArr")) {
                    if (GameConfig.cachData["authorInfoArr"].length > 0) {
                        GameConfig.authorInfoArr = GameConfig.cachData["authorInfoArr"];
                        GameConfig.signingNum = GameConfig.authorInfoArr.length;
                        for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                            let obj: Object = GameConfig.authorInfoArr[i];
                            GameConfig.authorIdArr.push(obj["id"] + "");
                            for (let j: number = 0; j < GameConfig.guding.length; j++) {
                                let auObj: Object = GameConfig.guding[j];
                                if (auObj["id"] == obj["id"]) {
                                    this.createBoyTwo(obj["name"], i + 1);  //初始化创建作者
                                }
                            }
                        }
                    }
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            }
        }

        checkSp(): void {
            if (GameConfig.authorInfoArr.length > 0) {
                for (let j: number = 0; j < GameConfig.authorInfoArr.length; j++) {
                    let auObj: Object = GameConfig.authorInfoArr[j];
                    if (SceneLayer.scene.getChildByName(auObj["name"]) != null) {
                        this.productGift(auObj);
                    }
                }
            }
        }

        productGift(auObj: Object): void {
            let author3D: Laya.Sprite3D = SceneLayer.scene.getChildByName(auObj["name"]) as Laya.Sprite3D;
            let x: number = author3D.transform.position.x;
            let y: number = author3D.transform.position.y;
            let initX: string = x + "";
            let initY: string = y + "";
            let suijiX: number = x;
            let suijiY: number = y + 0.5;
            let suijishu: number = Hash.getRandomNum(0, 100);
            let gailu1: number = (auObj["curiousMax"] / 100 * this.jilvArr[1]) * 100;
            let giftModel: Laya.Sprite3D = Laya.Sprite3D.load("res/gift/LayaScene_scene/scene.lh");
            if (suijishu >= 1 && suijishu <= gailu1) {
                let giftVec: Laya.Vector3 = new Laya.Vector3(suijiX, suijiY, 1);
                this.cloneGift = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(giftModel, null, false, giftVec)) as Laya.Sprite3D
                this.cloneGift.name = auObj["name"] + suijishu + GameConfig.insPArr.length;
                this.cloneGift.transform.localScale = new Laya.Vector3(0, 0, 0);
                this.giftAction(this.cloneGift);
                let giftObj: Object = new Object();
                giftObj["giftName"] = this.cloneGift.name;
                giftObj["giftTime"] = 0;
                GameConfig.insPArr.push(giftObj);
                Laya.timer.once(500, this, this.downGift, [this.cloneGift]);
            }
        }

        giftGive(): void {
            if (GameConfig.insPArr.length > 0) {
                for (let i: number = 0; i < GameConfig.insPArr.length; i++) {
                    let giftObj: Object = GameConfig.insPArr[i];
                    let giftName: string = giftObj["giftName"]
                    giftObj["giftTime"] = giftObj["giftTime"] + 1;
                    if (giftObj["giftTime"] == 60) {
                        if (SceneLayer.scene.getChildByName(giftName) != null) {
                            let spri3d: Laya.Sprite3D = SceneLayer.scene.getChildByName(giftName) as Laya.Sprite3D;
                            Laya.Tween.to(spri3d.transform.localScale, { x: 0, y: 0, z: 0 }, 3000, null, Handler.create(this, this.removeSp3dTwo, [spri3d, i], true));

                        }
                    }
                }
            }
        }

        giftAction(cloneGift: Laya.Sprite3D): void {
            Laya.Tween.to(cloneGift.transform.localScale, { x: 0.08, y: 0.08, z: 0.08 }, 500);
        }

        downGift(cloneGift: Laya.Sprite3D): void {
            Laya.Tween.to(cloneGift.transform.position, { x: cloneGift.transform.position.x, y: 0, z: cloneGift.transform.position.z }, 1000);
        }

        douClick(event: Laya.Event): void {
            if (GameConfig.stopTimer || event.target.name != 'sceneLayer') {
                return
            }
            let eventName: string = event.target.name;
            if (GameConfig.displayPage > 0 || eventName == "WritingBtn" || eventName == "startBtn" || eventName == "releaseBtn" || eventName == "closeBtn") {
                event.stopPropagation();
                return;
            } else {
                for (var i: number = 0; i < this._outHitAllInfo.length; i++) {
                    let spName: string = this._outHitAllInfo[i].sprite3D.name;
                    if (spName == "boy") {  //spName.indexOf("boy") != -1
                        let ZWname: string = this._outHitAllInfo[i].sprite3D["parent"]["parent"]["name"];
                        GameConfig.displayPage += 1;
                        this.stopEvent();
                        let singlePlayerInfoView: views.player.SinglePlayerInfoView = new views.player.SinglePlayerInfoView(ZWname);
                        SceneLayerManager.sceneLayer.addChild(singlePlayerInfoView);
                    }
                }
            }
        }

        checkHit(): void {
            /** 进行写作进度条位置每帧渲染 */
            for (let k: number = 0; k < GameConfig.authorInfoArr.length; k++) {
                let authObj: Object = GameConfig.authorInfoArr[k];
                /** 获取模型位置 */
                let outVec: Laya.Vector3 = new Laya.Vector3();
                let point: Laya.Point = new Laya.Point();
                let boySp3d: Laya.Sprite3D = SceneLayer.scene.getChildByName(authObj["name"]) as Laya.Sprite3D;
                /** 更新进度条位置 */
                if (this.getChildByName(authObj["name"] + "cir") != null) {
                    let cirView: CircleProView = this.getChildByName(authObj["name"] + "cir") as CircleProView;
                    this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                    point.x = outVec.x / Laya.stage.clientScaleX;
                    point.y = outVec.y / Laya.stage.clientScaleY;
                    if (boySp3d.transform.position.x > 1) {
                        cirView.pos(point.x - 60, point.y - 90);
                    } else {
                        cirView.pos(point.x + 10, point.y - 110);
                    }
                }
                /** 更新表情位置 */
                let outVecT: Laya.Vector3 = new Laya.Vector3();
                let pointT: Laya.Point = new Laya.Point();
                if (this.getChildByName(authObj["name"] + "pre") != null) {
                    let preView: PreIconViewUI = this.getChildByName(authObj["name"] + "pre") as PreIconViewUI;
                    this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVecT);
                    pointT.x = outVecT.x / Laya.stage.clientScaleX;
                    pointT.y = outVecT.y / Laya.stage.clientScaleY;
                    if (boySp3d.transform.position.x > 1) {
                        preView.pos(pointT.x - 60, pointT.y - 90);
                    } else {
                        preView.pos(pointT.x + 10, pointT.y - 110);
                    }
                }

                /** 更新触发写作界面位置 */
                if (this.getChildByName(authObj["name"] + "tri") != null) {
                    let triView: WriteTriggerView = this.getChildByName(authObj["name"] + "tri") as WriteTriggerView;
                    this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                    point.x = outVec.x / Laya.stage.clientScaleX;
                    point.y = outVec.y / Laya.stage.clientScaleY;
                    if (boySp3d.transform.position.x > 1) {
                        triView.pos(point.x - 70, point.y - 160);
                    } else {
                        triView.pos(point.x - 70, point.y - 190);
                    }
                }

                /** 更新左侧点击页面位置 */
                if (this.getChildByName(authObj["name"] + "LeftTool") != null) {
                    let leftView: LeftToolBarView = this.getChildByName(authObj["name"] + "LeftTool") as LeftToolBarView;
                    this.camera.viewport.project(boySp3d.transform.position, this.camera.projectionViewMatrix, outVec);
                    point.x = outVec.x / Laya.stage.clientScaleX;
                    point.y = outVec.y / Laya.stage.clientScaleY;
                    if (boySp3d.transform.position.y <= authObj["authorPosY"]) {
                        leftView.pos(0, point.y - 160);
                    }else{
                        leftView.pos(0, point.y - 120);
                    }
                }
            }
            /** 进行模型每帧渲染 */
            if (GameConfig.authorInfoArr.length > 0) {
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let author: Object = GameConfig.authorInfoArr[i];
                    let nameStr: string = author["name"];
                    if (SceneLayer.scene.getChildByName(nameStr) != null) {
                        let author3D: Laya.Sprite3D = SceneLayer.scene.getChildByName(nameStr) as Laya.Sprite3D;
                        author3D.transform.position = author3D.transform.position;
                    }
                }
            }
            if (GameConfig.insPArr.length > 0) {
                for (let m: number = 0; m < GameConfig.insPArr.length; m++) {
                    let giftObj: Object = GameConfig.insPArr[m]
                    let insp: string = giftObj["giftName"];
                    if (SceneLayer.scene.getChildByName(insp) != null) {
                        let insP3D: Laya.Sprite3D = SceneLayer.scene.getChildByName(insp) as Laya.Sprite3D;
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
        }

        buildHome(state: number): void {
            var exl = managers.ResourceManager.incomeArr;
            var _year = Math.min(GameConfig.year, exl[exl.length - 1]['year'])
            var shoufu;
            var quankuan;

            for (var i: number = 0; i < exl.length; i++) {

                if (_year == exl[i]['year']) {
                    shoufu = Math.floor(exl[i]['spreaMoney'] * 0.2);
                    quankuan = exl[i]['spreaMoney'];
                    break
                }
            }
            if (state == 1) { //贷款
                if (GameConfig.money >= shoufu) { //可以贷款
                    GameConfig.homeFloor += 1;
                    GameConfig.cachData["homeFloor"] = GameConfig.homeFloor;
                    let curNum: number = 1.9;
                    let topY: number = GameConfig.homeFloor + 1;
                    let floors: number = curNum * GameConfig.homeFloor;
                    let newFloor: number = curNum * topY;

                    // 获取楼层模型
                    let scene: Laya.Scene = this.getChildByName("scene") as Laya.Scene;
                    var bigHouse2: Laya.Sprite3D = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");

                    this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);

                    // 获取房顶模型
                    let top: Laya.Sprite3D = scene.getChildByName("top") as Laya.Sprite3D;
                    top.transform.position = new Laya.Vector3(0, newFloor, 0);

                    // 花费的金币
                    let surMoney: number = GameConfig.money - shoufu;
                    GameConfig.money = surMoney;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    GameConfig.loanarr.push(GameConfig.year)
                    GameConfig.cachData['loanarr'] = GameConfig.loanarr
                    //更上一层楼
                    let avchidata: Array<Object> = managers.ResourceManager.achiveGoldArr;
                    if (GameConfig.homeFloor == avchidata[1]['aim'] + 1) {
                        var achive: views.events.AchiEvent = new views.events.AchiEvent(1)
                    }
                    laya.media.SoundManager.playSound("res/sounds/build.mp3", 1)
                } else {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                    return
                }
            } else { // 全款
                if (GameConfig.money < quankuan) {
                    TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
                    return
                } else {
                    GameConfig.homeFloor += 1;
                    GameConfig.cachData["homeFloor"] = GameConfig.homeFloor;
                    let curNum: number = 1.9;
                    let topY: number = GameConfig.homeFloor + 1;
                    let floors: number = curNum * GameConfig.homeFloor;
                    let newFloor: number = curNum * topY;

                    // 获取楼层模型
                    let scene: Laya.Scene = this.getChildByName("scene") as Laya.Scene;
                    var bigHouse2: Laya.Sprite3D = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");

                    this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);

                    // 获取房顶模型
                    let top: Laya.Sprite3D = scene.getChildByName("top") as Laya.Sprite3D;
                    top.transform.position = new Laya.Vector3(0, newFloor, 0);

                    // 花费的金币
                    let surMoney: number = GameConfig.money - quankuan;
                    GameConfig.money = surMoney;
                    views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
                    //更上一层楼
                    let avchidata: Array<Object> = managers.ResourceManager.achiveGoldArr;
                    if (GameConfig.homeFloor == avchidata[1]['aim'] + 1) {
                        var achive: views.events.AchiEvent = new views.events.AchiEvent(1)
                    }
                    laya.media.SoundManager.playSound("res/sounds/build.mp3", 1)
                }
            }
        }

        buildHomeTwo(): void {
            GameConfig.homeFloor += 1;
            let curNum: number = 1.9;
            let topY: number = GameConfig.homeFloor + 1;
            let floors: number = curNum * GameConfig.homeFloor;
            let newFloor: number = curNum * topY;

            // 获取楼层模型
            let scene: Laya.Scene = this.getChildByName("scene") as Laya.Scene;
            var bigHouse2: Laya.Sprite3D = Laya.Sprite3D.load("res/house2/LayaScene_scene/scene.lh");

            this.createFloor(scene, floors, GameConfig.homeFloor, bigHouse2);

            // 获取房顶模型
            let top: Laya.Sprite3D = scene.getChildByName("top") as Laya.Sprite3D;
            top.transform.position = new Laya.Vector3(0, newFloor, 0);
        }

        /** 创建楼层 */
        createFloor(scene: Laya.Scene, floors: number, num: number, bigHouse2: Laya.Sprite3D): void {
            this.cloneHouse = scene.addChild(Laya.Sprite3D.instantiate(bigHouse2, null, false, new Laya.Vector3(0, floors, 0))) as Laya.Sprite3D;
            let floorMesh: Laya.MeshSprite3D = (this.cloneHouse.getChildAt(0)["_childs"][7]["_childs"][0]) as Laya.MeshSprite3D;
            let floorclid: Laya.BoxCollider = (floorMesh["_components"][0]) as Laya.BoxCollider;
            floorclid.setFromBoundBox(floorMesh.meshFilter.sharedMesh.boundingBox);
            floorMesh.name = "floor" + num;
            bigHouse2.transform.translate(new Laya.Vector3(0, floors, 0))
            this.cloneHouse.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
            this.cloneHouse.name = num + "";
            for (let i: number = 0; i < 11; i++) {
                let homeMesh: Laya.MeshSprite3D = (this.cloneHouse.getChildAt(0)["_childs"][i]["_childs"][0]) as Laya.MeshSprite3D;
                let homeMaterial: Laya.StandardMaterial = homeMesh.meshRender.sharedMaterial as Laya.StandardMaterial;
                homeMaterial.ambientColor = new Laya.Vector3(1, 1, 1);
                homeMaterial.specularColor = new Laya.Vector4(0.04, 0.05, 0.15, 0.01);
                homeMaterial.diffuseTexture = Laya.Texture2D.load("res/secondFloor/LayaScene_scene/Assets/house/tex.png");
                homeMesh.meshRender.material = homeMaterial;
            }
        }

        /** 创建作者 */
        createBoy(nameStr: string): void {
            let curNum: number = 1.9;
            let boyModel: Laya.Sprite3D = Laya.Sprite3D.load("res/boy/LayaScene_scene/scene.lh");
            this.yy = GameConfig.signingNum * curNum;
            this.hh = this.yy + "";
            if (GameConfig.authorPos.length == 0) {
                this.hh = this.yy + "";
                GameConfig.authorPos.push(this.hh);
                this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
            } else {
                if (GameConfig.authorPos.indexOf(this.hh) != -1) {
                    for (var i = GameConfig.signingNum; i > 0; i--) {
                        this.yy = i * curNum;
                        this.hh = this.yy + "";
                        if (GameConfig.authorPos.indexOf(this.hh) == -1) {
                            GameConfig.authorPos.push(this.hh);
                            this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                        }
                    }
                } else {
                    GameConfig.authorPos.push(this.hh);
                    this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
                }
            }
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let authorObj: Object = GameConfig.authorInfoArr[i];
                if (authorObj["name"] == nameStr) {
                    authorObj["authorPosY"] = this.newVec3.y;
                }
            }
            this.cloneBoy = Laya.Pool.getItemByClass(nameStr, Laya.Sprite3D);
            this.cloneBoy = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(boyModel, null, false, this.newVec3)) as Laya.Sprite3D;
            let boyMesh: Laya.MeshSprite3D = (this.cloneBoy.getChildAt(0)["_childs"][0]) as Laya.MeshSprite3D;
            let boyclid: Laya.BoxCollider = (boyMesh["_colliders"][0]) as Laya.BoxCollider;
            boyclid.setFromBoundBox(boyMesh.meshFilter.sharedMesh.boundingBox);
            this.cloneBoy.name = nameStr;
            boyMesh.name = "boy";
            this.cloneBoy.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
        }

        createBoyTwo(nameStr: string, i: number): void {
            let curNum: number = 1.9;
            let boyModel: Laya.Sprite3D = Laya.Sprite3D.load("res/boy/LayaScene_scene/scene.lh");
            this.yy = i * curNum;
            this.hh = this.yy + "";
            GameConfig.authorPos.push(this.hh);
            this.newVec3 = new Laya.Vector3(0, this.yy, 0.2);
            this.cloneBoy = SceneLayer.scene.addChild(Laya.Sprite3D.instantiate(boyModel, null, false, this.newVec3)) as Laya.Sprite3D;
            let boyMesh: Laya.MeshSprite3D = (this.cloneBoy.getChildAt(0)["_childs"][0]) as Laya.MeshSprite3D;
            let boyclid: Laya.BoxCollider = (boyMesh["_colliders"][0]) as Laya.BoxCollider;
            boyclid.setFromBoundBox(boyMesh.meshFilter.sharedMesh.boundingBox);
            this.cloneBoy.name = nameStr;
            boyMesh.name = "boy";
            this.cloneBoy.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
        }

        /** 删除作者 */
        deleteAuthor(nameStr: string): void {
            let obj: Laya.Sprite3D = SceneLayer.scene.getChildByName(nameStr) as Laya.Sprite3D;
            Laya.Tween.clearAll(obj.transform.position);
            this.hh = (obj.transform.position.y).toFixed(1);
            let index: number = GameConfig.authorPos.indexOf(this.hh);
            GameConfig.authorPos.splice(index, 1);
            SceneLayer.scene.removeChildByName(nameStr);
            Laya.Pool.recover(nameStr, obj);

            /** 删除作者动作 */
            SceneLayerManager.sceneLayer.removeChildByName(nameStr + "spA");
        }

        createCommonModel(scene: Laya.Scene, sp3d: Laya.Sprite3D, vec3: Laya.Vector3, name: string): void {
            sp3d.transform.localScale = new Laya.Vector3(0.04, 0.04, 0.04);
            sp3d.transform.translate(vec3);
            sp3d.name = name;
            SceneLayer.scene.addChild(sp3d);
        }

        /** 移动房屋事件 */
        onMouseDown(e: Laya.Event): void {
            if (GameConfig.stopTimer) {
                return;
            }
            if (GameConfig.displayPage <= 0) {
                if (GameConfig.insPArr.length > 0) {
                    let vec1: Laya.Vector3 = new Laya.Vector3(e.target.mouseX, e.target.mouseY, 0);
                    // let tauchVec: Laya.Vector3 = new Laya.Vector3();
                    // tauchVec = Hash.screenCoordTo3DCoord(vec1, tauchVec);
                    for (let i: number = 0; i < GameConfig.insPArr.length; i++) {
                        let giftObj: Object = GameConfig.insPArr[i];
                        let objName: string = giftObj["giftName"];
                        if (SceneLayer.scene.getChildByName(objName) != null) {
                            let spri3d: Laya.Sprite3D = SceneLayer.scene.getChildByName(objName) as Laya.Sprite3D;
                            let spVec: Laya.Vector3 = new Laya.Vector3();
                            this.camera.viewport.project(spri3d.transform.position, this.camera.projectionViewMatrix, spVec);
                            let point: Laya.Point = new Laya.Point();
                            point.x = spVec.x / Laya.stage.clientScaleX;
                            point.y = spVec.y / Laya.stage.clientScaleY;
                            let poly: Array<Object> = new Array<Object>();
                            let obj1: Object = new Object();
                            let obj2: Object = new Object();
                            let obj3: Object = new Object();
                            let obj4: Object = new Object();
                            let obj5: Object = new Object();
                            obj1 = { x: vec1.x - 100, y: vec1.y + 100 };
                            obj2 = { x: vec1.x + 100, y: vec1.y + 100 };
                            obj3 = { x: vec1.x + 100, y: vec1.y - 100 };
                            obj4 = { x: vec1.x - 100, y: vec1.y - 100 };
                            obj5 = { x: vec1.x - 100, y: vec1.y + 100 };
                            poly.push(obj1); poly.push(obj2); poly.push(obj3); poly.push(obj4); poly.push(obj5);
                            let isInPoly: boolean = Hash.pointInPoly(point, poly);
                            if (isInPoly == true) {
                                /** 收集灵感动画 */
                                Laya.Tween.to(spri3d.transform.localScale, { x: 0, y: 0, z: 0 }, 3000, null, Handler.create(this, this.removeSp3d, [spri3d, i], true));
                            }
                        }
                    }
                }
                if (GameConfig.homeFloor <= 1) {
                    return;
                } else {
                    let top: Laya.Sprite3D = SceneLayer.scene.getChildByName("top") as Laya.Sprite3D;
                    this.topStringPos = (top.transform.position.y - 0.7).toFixed(2);
                    this.topPos = parseFloat(this.topStringPos);
                    this.topPosY = this.topPos - 0.71;
                    this.posStringZ = (this.initZ - GameConfig.homeFloor * this.everyZ).toFixed(2);
                    this.posZ = parseFloat(this.posStringZ);
                    this.touchP = new Laya.Vector2(e.target.mouseX, e.target.mouseY);
                    if (e.target.mouseY > 120 && e.target.mouseY < 890) {
                        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
                    }
                }
            } else {
                e.stopPropagation();
                return;
            }
        }

        removeSp3d(spri3d: Laya.Sprite3D, i: number): void {
            SceneLayer.scene.removeChild(spri3d);
            GameConfig.insPArr.splice(i, 1);
            let rateNum: number = this.judgeHole(10);
            GameConfig.brainHole = GameConfig.brainHole + (1 * rateNum);
            views.toolbar.TopToolBarView.getInstance().resetHole(GameConfig.brainHole);
        }

        /** 进行灵感值判断 */
        judgeHole(rateNum: number): number {
            let curNum: number = Hash.getRandomNum(1, 3);
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
                            if (curNum >= 2) {
                                return 2;
                            } else {
                                return 1;
                            }
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        removeSp3dTwo(spri3d: Laya.Sprite3D, i: number): void {
            SceneLayer.scene.removeChild(spri3d);
            GameConfig.insPArr.splice(i, 1);
        }

        onmousemove(e: Laya.Event): void {
            if (GameConfig.displayPage > 0) {
                e.stopPropagation();
                return;
            } else {
                if (GameConfig.homeFloor <= 1) {
                    return;
                } else {
                    if (e.target.mouseY > 120 && e.target.mouseY < 890) {
                        this.camera.transform.translate(new Laya.Vector3(0, -(this.touchP.y - e.target.mouseY) / 150, 0));
                        this.touchP = new Laya.Vector2(e.target.mouseX, e.target.mouseY);
                        if (this.camera.transform.position.y < 3.2) {
                            this.camera.transform.position = new Laya.Vector3(0, 3.21, this.initZ);
                        } else if (this.camera.transform.position.y > this.topPosY) {
                            this.camera.transform.position = new Laya.Vector3(0, this.topPosY, this.posZ);
                        }
                    } else {
                        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
                    }
                }
            }
        }

        onMouseUp(e: Laya.Event): void {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
        }

        selectObj(obj: Object): Object {
            for (let i = 0; i < GameConfig.authorInfoArr.length; i++) {
                let infoObj: Object = GameConfig.authorInfoArr[i];
                if (infoObj["name"] == obj["name"]) {
                    return infoObj;
                }
            }
        }

        closeSceneEnable(): void {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
        }

        openSceneEnable(): void {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onmousemove);
        }

        /** 结束相关事件及计时器的触发 */
        stopEvent(): void {
            if (!GameConfig.stopTimer) {
                GameConfig.stopTimer = true;
            }
            // Laya.timer.clear(this, this.giftGive);
            // Laya.timer.clear(this, this.checkSp);
            views.layers.SpAction.prototype.pauseAction();
            views.common.TimeBackView.instance.stopTimer();
            SceneLayerManager.sceneLayer.closeSceneEnable();
        }

        /** 开启相关事件及计时器的触发 */
        openEvent(): void {
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
        }
    }
}
