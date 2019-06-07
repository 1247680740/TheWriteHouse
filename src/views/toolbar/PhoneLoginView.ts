namespace views.toolbar {

    import SubCtrl = controllers.login.SubCtrl;
    export class PhoneLoginView extends ui.toolBar.PhoneLoginUI {

        private timeNum: number;
        private phoneNums: string;
        private flag = false;
        private message = "";
        private myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        constructor() {
            super();
            this.timeNum = 60;
            this.startGameBtn.mouseEnabled = false;
            this.sendCode.on(Laya.Event.CLICK, this, this.getCode);
            this.startGameBtn.on(Laya.Event.CLICK, this, this.startGame);
        }

        /** 获取验证码 */
        getCode(): void {
            this.phoneNums = this.phoneNum.text;
            if (this.phoneNums == "") {
                this.message = "手机号码不能为空！";
                this.alertMessage(this.message);
            } else if (this.phoneNums.length != 11) {
                this.message = "请输入11位手机号码！";
                this.alertMessage(this.message);
            } else if (!this.myreg.test(this.phoneNums)) {
                this.message = "请输入有效的手机号码！";
                this.alertMessage(this.message);
            } else {
                SubCtrl.getInstance().getCode(this.phoneNums);
                Laya.timer.loop(1000, this, this.timerBack);
            }
        }

        /** 填充验证码倒计时 */
        timerBack(): void {
            this.startGameBtn.mouseEnabled = true;
            this.sendCode.label = "";
            this.timeNum--;
            if (this.timeNum <= 0) {
                Laya.timer.clearAll(this);
                this.sendCode.mouseEnabled = true;
                this.sendCode.label = "获取验证码";
                this.timeNum = 60;
            } else {
                this.sendCode.mouseEnabled = false;
                this.sendCode.label = this.timeNum + "";
            }
        }

        /** 手机登录进入游戏判定 */
        startGame(): void {
            if (this.code.text == "" || parseInt(this.code.text) != GameConfig.CodeNum) {
                TipLayerManager.tipLayer.showDrawBgTip("验证码为空或不正确请重新输入", null);
            } else {
                if (GameConfig.fuwuStr == "" || GameConfig.fuwuStr == null) {
                    views.toolbar.LoginToolBarView.prototype.loadAllLayer();
                    views.common.LoginView.prototype.fastGameView(null);
                } else {
                    TipLayerManager.getInstance().initTip();
                    let str: string = GameConfig.fuwuStr.replace(/\'/g, "\"");
                    GameConfig.cachData = JSON.parse(str);
                    GameConfig.money = GameConfig.cachData["money"];
                    GameConfig.fans = GameConfig.cachData["fans"];
                    GameConfig.brainHole = GameConfig.cachData["brainHole"];
                    views.common.LoginView.getInstance().fastGameView(GameConfig.cachData);
                }
            }
        }

        /** 报错信息提示 */
        alertMessage(mesage: string): void {
            if (mesage != "") {
                TipLayerManager.tipLayer.showDrawBgTip(mesage);
            }
        }

    }

}