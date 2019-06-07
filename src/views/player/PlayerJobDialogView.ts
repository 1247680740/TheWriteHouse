namespace views.player {

    import Sprite = Laya.Sprite;
    import HitArea = Laya.HitArea;
    import Event = Laya.Event;
    import AuthorJobIconItemUI = ui.player.AuthorJobIconItemUI;

    export class PlayerJobDialogView extends ui.player.AuthorJobDialogUI {

        private static instance: PlayerJobDialogView;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private playerSingleJobView: views.player.PlayerSingleJobView;
        private tipView: ui.common.ConfirmCancelTipUIUI;
        private conffimTipView: ui.common.ConfirmCancelTipUIUI;
        private curPayObj: Object;

        constructor(payOBj: Object) {
            super();
            this.name = "playerJobDialogView";
            this.curPayObj = payOBj;
            this.addMask();
            this.initView();
            console.log(GameConfig.displayPage);
            if (this.curPayObj == null) {
                this.nullBox.visible = true;
                this.hasBox.visible = false;
                let today: string = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                let Tomorrow: string = IdentityConfig.jobYear + "-1-15";
                let day: number = Hash.dateDifference(today, Tomorrow);
                this.dayNum.text = day + "天";
            } else {
                this.hasBox.visible = true;
                this.nullBox.visible = false;
                this.job1.on(Laya.Event.CLICK, this, this.callAuthor);
                this.job2.on(Laya.Event.CLICK, this, this.callAuthor);
                this.job3.on(Laya.Event.CLICK, this, this.callAuthor);
                this.job4.on(Laya.Event.CLICK, this, this.callAuthor);
            }
            this.madeAuthor.on(Laya.Event.CLICK, this, this.recoverPro);
            this.recyclePro.on(Laya.Event.CLICK, this, this.recycleData);
            this.closeBtn.on(Laya.Event.CLICK, this, this.removeView);
        }

        /** 添加遮罩区域 */
        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.width = Laya.stage.width;
            this.guideContainer.height = Laya.stage.height;
            this.guideContainer.name = "PlayerJobDialogViewMask";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.pos(0, 0);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.guideContainer.addChild(this);
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;
        }

        /**  召唤作者*/
        callAuthor(event: Event): void {
            Hash.playMusic(1);
            let name: string = event.target.name;
            if (IdentityConfig.curJobBtnArr.indexOf(name) != -1) {
                let quaArr: Array<number> = new Array<number>();
                quaArr.splice(0, quaArr.length);
                for (let i: number = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                    let auObj: Object = IdentityConfig.curCallAuthorArr[i];
                    quaArr.push(auObj["quality"]);
                }
                if (IdentityConfig.curCallAuthorArr.length >= 12) {
                    if (quaArr.indexOf(1) != -1) {
                        let index: number = quaArr.indexOf(1);
                        let curObj: Object = IdentityConfig.curCallAuthorArr[index];
                        IdentityConfig.curCallAuthorArr.splice(index, 1);
                        GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        this.recoverPoint(curObj);
                        this.callBackAuthor(name);
                    } else {
                        TipLayerManager.tipLayer.showDrawBgTip("当前简历过多，请回收后再进行招募");
                    }
                } else {
                    this.callBackAuthor(name);
                }
            } else {
                TipLayerManager.tipLayer.showDrawBgTip("未激活");
            }
        }

        /** 进行招募作者 */
        callBackAuthor(name: string): void {
            let checkArr: Array<Object> = new Array<Object>();
            checkArr.splice(0, checkArr.length);
            let rateArr: Array<number> = [0.3, 0.2, 0.1];
            let job2Arr: Array<Object> = [{ "quality": 1, "weight": 3 }, { "quality": 2, "weight": 7 }];
            let job3Arr: Array<Object> = [{ "quality": 2, "weight": 4 }, { "quality": 3, "weight": 6 }];;
            let job4Arr: Array<Object> = [{ "quality": 3, "weight": 5 }, { "quality": 4, "weight": 5 }];;
            switch (name) {
                case "job1":
                    if (this.curPayObj["selNum"] < 1) {
                        TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                        return;
                    } else {
                        checkArr = this.getJob1EnabelAuthor(1);
                        let authorObjOne: Object = Hash.weight_rand(checkArr);
                        if (authorObjOne != null) {
                            /** 进行赋值 */
                            IdentityConfig.curCallAuthorArr.push(authorObjOne);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        }
                        /** 进行解锁几率判断 */
                        let rate: number = Hash.countRate(rateArr[0]);
                        if (rate == 1) {
                            if (IdentityConfig.curJobBtnArr.indexOf("job2") == -1) {
                                IdentityConfig.curJobBtnArr.push("job2");
                            }
                        }
                        this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                    }
                    this.initView();
                    break;
                case "job2":
                    if (this.curPayObj["selNum"] < 1) {
                        TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                        return;
                    } else {
                        /** 首先通过权重获取品质 */
                        let job2Obj: Object = Hash.weight_rand(job2Arr);
                        /** 获取最终可选类表 */
                        checkArr = this.getJob1EnabelAuthor(job2Obj["quality"]);
                        let authorObjTwo: Object = Hash.weight_rand(checkArr);
                        if (authorObjTwo != null) {
                            /** 进行赋值 */
                            IdentityConfig.curCallAuthorArr.push(authorObjTwo);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        }
                        /** 进行解锁几率判断 */
                        let rateTwo: number = Hash.countRate(rateArr[1]);
                        if (rateTwo == 1) {
                            if (IdentityConfig.curJobBtnArr.indexOf("job3") == -1) {
                                IdentityConfig.curJobBtnArr.push("job3");
                            }
                        }
                        if (IdentityConfig.curJobBtnArr.indexOf("job2") != -1) {
                            let index: number = IdentityConfig.curJobBtnArr.indexOf("job2");
                            IdentityConfig.curJobBtnArr.splice(index, 1);
                        }
                        this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                    }
                    this.initView();
                    break;
                case "job3":
                    if (this.curPayObj["selNum"] < 1) {
                        TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                        return;
                    } else {
                        /** 首先通过权重获取品质 */
                        let job3Obj: Object = Hash.weight_rand(job3Arr);
                        checkArr = this.getJob1EnabelAuthor(job3Obj["quality"]);
                        let authorObjThree: Object = Hash.weight_rand(checkArr);
                        if (authorObjThree != null) {
                            /** 进行赋值 */
                            IdentityConfig.curCallAuthorArr.push(authorObjThree);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        }
                        /** 进行解锁几率判断 */
                        let rateThree: number = Hash.countRate(rateArr[2]);
                        if (rateThree == 1) {
                            if (IdentityConfig.curJobBtnArr.indexOf("job4") == -1) {
                                IdentityConfig.curJobBtnArr.push("job4");
                            }
                        }
                        if (IdentityConfig.curJobBtnArr.indexOf("job3") != -1) {
                            let index: number = IdentityConfig.curJobBtnArr.indexOf("job3");
                            IdentityConfig.curJobBtnArr.splice(index, 1);
                        }
                        this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                    }
                    this.initView();
                    break;
                case "job4":
                    if (this.curPayObj["selNum"] < 1) {
                        TipLayerManager.tipLayer.showDrawBgTip("当前招聘次数不足");
                        return;
                    } else {
                        /** 首先通过权重获取品质 */
                        let job4Obj: Object = Hash.weight_rand(job4Arr);
                        checkArr = this.getJob1EnabelAuthor(job4Obj["quality"]);
                        let authorObjFour: Object = Hash.weight_rand(checkArr);
                        if (authorObjFour != null) {
                            /** 进行赋值 */
                            IdentityConfig.curCallAuthorArr.push(authorObjFour);
                            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                        }
                        if (IdentityConfig.curJobBtnArr.indexOf("job4") != -1) {
                            let index: number = IdentityConfig.curJobBtnArr.indexOf("job4");
                            IdentityConfig.curJobBtnArr.splice(index, 1);
                        }
                        this.curPayObj["selNum"] = this.curPayObj["selNum"] - 1;
                    }
                    this.initView();
                    break;
            }
        }

        /** 初始状态值 */
        initView(): void {
            if (this.recyclePro.value >= 1) {
                this.madeAuthor.disabled = false;
            } else {
                this.madeAuthor.disabled = true;
            }
            this.AuthorListPanel.removeChildren(0, this.AuthorListPanel.numChildren)
            this.recyclePro.value = IdentityConfig.curjobPoint / 500;
            if (this.curPayObj != null) {
                let hasBox: Laya.Box = this.getChildByName("hasBox") as Laya.Box;
                for (let i: number = 1; i < 5; i++) {
                    let imgName: string = "job" + i;
                    let img: Laya.Image = hasBox.getChildByName(imgName) as Laya.Image;
                    if (IdentityConfig.curJobBtnArr.indexOf(imgName) != -1) {
                        img.disabled = false;
                    } else {
                        img.disabled = true;
                    }
                }
                this.lowNum.text = "剩余次数：" + this.curPayObj["selNum"];
            }
            /** 给简历列表赋值 */
            for (let j: number = 0; j < IdentityConfig.curCallAuthorArr.length; j++) {
                let callObj: Object = IdentityConfig.curCallAuthorArr[j];
                let gridItem: AuthorJobIconItemUI = new AuthorJobIconItemUI();
                gridItem.authorName.text = callObj["name"];
                gridItem.playerIcon.skin = callObj["icon"];
                gridItem.playerBg.skin = "gameUI/AuthorData/q_0" + callObj["quality"] + ".png";
                this.AuthorListPanel.addChild(gridItem);
                if (j >= 4) {
                    gridItem.x = parseInt((j - 4) % 4 + "") * (gridItem.width + 12);
                    gridItem.y = (parseInt((j - 4) / 4 + "") + 1) * (gridItem.height + 7);
                }
                else {
                    gridItem.x = j * (gridItem.width + 12);
                }
                gridItem.playerIcon.on(Event.CLICK, this, this.updateRightContent, [callObj, this.curPayObj]);
                gridItem.delAuthor.visible = false; //屏蔽叉号
                // gridItem.delAuthor.on(Event.CLICK, this, this.delAuthorData, [callObj]);
            }
        }

        /** 恢复回收值进度条 */
        recoverPro(): void {
            Laya.Tween.to(this.recyclePro, { value: 0 }, 3000, null, Handler.create(this, this.resetProValue));
            Hash.playMusic(2);
        }

        resetProValue(): void {
            this.recyclePro.value = 0;
            IdentityConfig.curjobPoint = 0;
            GameConfig.cachData["curjobPoint"] = IdentityConfig.curjobPoint;
            this.initView();
        }

        /** 显示简历详细信息 */
        updateRightContent(callObj: Object, curPayObj): void {
            Hash.playMusic(2);
            GameConfig.displayPage += 1;
            SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
            this.playerSingleJobView = new views.player.PlayerSingleJobView(callObj, curPayObj);
        }

        /** 回收单个作者简历 */
        delAuthorData(callObj: Object): void {
            console.log("你要删除" + callObj["name"]);
            if (callObj["quality"] == 3 || callObj["quality"] == 4) {
                this.tipView = new ui.common.ConfirmCancelTipUIUI();
                this.tipView.x = (Laya.stage.width - this.tipView.width) / 2;
                this.tipView.y = (Laya.stage.height - this.tipView.height) / 2;
                this.tipView.contentTxt.text = "你回收的简历中包含“高级简历”，是否确定回收？";
                this.tipView.visible = true;
                this.mouseEnabled = false;
                Laya.stage.addChild(this.tipView);
                this.tipView.confirmBtn.on(Event.CLICK, this, this.removeOneTipView, [callObj]);
                this.tipView.closeBtn.on(Event.CLICK, this, this.removeTipViewOne);
                this.tipView.cancelBtn.on(Event.CLICK, this, this.removeTipViewOne);
            } else {
                this.resetView(callObj);
            }
            Hash.playMusic(2);
        }

        removeOneTipView(callObj: Object): void {
            // this.removeChild(this.tipView);
            this.tipView.removeSelf();
            this.resetView(callObj)
            this.mouseEnabled = true;
        }

        removeTipViewOne(): void {
            // this.removeChild(this.tipView);
            this.tipView.removeSelf();
            this.mouseEnabled = true;
        }


        resetView(callObj: Object): void {
            for (let i: number = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                let curObj: Object = IdentityConfig.curCallAuthorArr[i];
                if (curObj["name"] == callObj["name"]) {
                    IdentityConfig.curCallAuthorArr.splice(i, 1);
                    GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                    this.recoverPoint(callObj);
                }
            }
            this.initView();
        }


        /** 获取招聘可选取的作者列表 */
        getJob1EnabelAuthor(quality: number): Array<Object> {
            let enableCheck: Array<Object> = new Array<Object>();
            enableCheck.splice(0, enableCheck.length);
            for (let i: number = 0; i < GameConfig.authorArr.length; i++) {
                let gudingObj: Object = GameConfig.authorArr[i];
                if (gudingObj["quality"] == quality) {
                    enableCheck.push(gudingObj);
                }
            }
            for (let j: number = 0; j < enableCheck.length; j++) {
                let enaObj: Object = enableCheck[j];
                for (let index: number = 0; index < GameConfig.authorInfoArr.length; index++) {
                    let auObj: Object = GameConfig.authorInfoArr[index];
                    if (enaObj["name"] == auObj["name"]) {
                        enableCheck.splice(j, 1);
                        j--;
                    }
                }
            }
            for (let m: number = 0; m < enableCheck.length; m++) {
                let enaObjTwo: Object = enableCheck[m];
                for (let n: number = 0; n < IdentityConfig.curCallAuthorArr.length; n++) {
                    let curObj: Object = IdentityConfig.curCallAuthorArr[n];
                    if (enaObjTwo["name"] == curObj["name"]) {
                        enableCheck.splice(m, 1);
                        m--;
                    }
                }
            }
            return enableCheck;
        }

        recycleData(): void {
            let auqArr: Array<number> = new Array<number>();
            auqArr.splice(0, auqArr.length);
            for (let i: number = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                let auObj: Object = IdentityConfig.curCallAuthorArr[i];
                auqArr.push(auObj["quality"]);
            }
            if (auqArr.indexOf(3) == -1 && auqArr.indexOf(4) == -1) {
                this.delCallObj();
            } else {
                this.tipView = new ui.common.ConfirmCancelTipUIUI();
                this.tipView.x = (Laya.stage.width - this.tipView.width) / 2;
                this.tipView.y = (Laya.stage.height - this.tipView.height) / 2;
                this.tipView.contentTxt.text = "你回收的简历中包含“高级简历”，是否确定回收？";
                this.tipView.visible = true;
                this.mouseEnabled = false;
                Laya.stage.addChild(this.tipView);
                this.tipView.confirmBtn.on(Event.CLICK, this, this.removeTwoTipView);
                this.tipView.closeBtn.on(Event.CLICK, this, this.removeTipViewTwo);
                this.tipView.cancelBtn.on(Event.CLICK, this, this.removeTipViewTwo);
            }
            Hash.playMusic(2);
        }

        removeTwoTipView(): void {
            this.tipView.removeSelf();
            this.mouseEnabled = true;
            this.delCallObj()
        }

        removeTipViewTwo(): void {
            this.tipView.removeSelf();
            this.mouseEnabled = true;
            this.delQuaLow();
        }

        /** 清空全部作者 */
        public delCallObj(): void {
            for (let i: number = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                let curObj: Object = IdentityConfig.curCallAuthorArr[i];
                this.recoverPoint(curObj);
            }
            IdentityConfig.curCallAuthorArr.splice(0, IdentityConfig.curCallAuthorArr.length);
            GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
            this.initView();
        }

        /** 清空品质为1,2的作者 */
        public delQuaLow(): void {
            for (let i: number = 0; i < IdentityConfig.curCallAuthorArr.length; i++) {
                let curObj: Object = IdentityConfig.curCallAuthorArr[i];
                if (curObj["quality"] == 1 || curObj["quality"] == 2) {
                    this.recoverPoint(curObj);
                    IdentityConfig.curCallAuthorArr.splice(i, 1);
                    GameConfig.cachData["freshAuthor"] = IdentityConfig.curCallAuthorArr;
                    i--;
                }
            }
            this.initView();
        }


        /** 回收添加点数 */
        recoverPoint(callObj: Object): void {
            switch (callObj["quality"]) {
                case 1:
                    IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 1;
                    break;
                case 2:
                    IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 10;
                    break;
                case 3:
                    IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 50;
                    break;
                case 4:
                    IdentityConfig.curjobPoint = IdentityConfig.curjobPoint + 100;
                    break;
            }
            GameConfig.cachData["curjobPoint"] = IdentityConfig.curjobPoint;
        }

        removeView(): void {
            Hash.playMusic(2);
            if (this.curPayObj == null) {
                this.outJob();
            } else {
                if (this.curPayObj["selNum"] > 0) {
                    this.conffimTipView = new ui.common.ConfirmCancelTipUIUI();
                    this.conffimTipView.x = (Laya.stage.width - this.conffimTipView.width) / 2;
                    this.conffimTipView.y = (Laya.stage.height - this.conffimTipView.height) / 2;
                    this.conffimTipView.contentTxt.text = "你还有剩余的招聘机会，是否确认放弃";
                    this.conffimTipView.visible = true;
                    this.mouseEnabled = false;
                    this.conffimTipView.zOrder = 3;
                    SceneLayerManager.sceneLayer.addChild(this.conffimTipView);
                    this.conffimTipView.confirmBtn.on(Event.CLICK, this, this.outJobTwo);
                    this.conffimTipView.closeBtn.on(Event.CLICK, this, this.reBackJob);
                    this.conffimTipView.cancelBtn.on(Event.CLICK, this, this.reBackJob);
                } else {
                    this.outJob();
                }
            }
        }

        reBackJob(): void {
            this.conffimTipView.removeSelf();
            this.mouseEnabled = true;
        }

        outJobTwo(): void {
            this.reBackJob();
            this.outJob();
        }

        outJob(): void {
            SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
            GameConfig.displayPage -= 1;
            console.log(GameConfig.displayPage);
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }

    }
}