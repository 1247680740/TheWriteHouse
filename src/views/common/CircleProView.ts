namespace views.common {

    export class CircleProView extends ui.common.CircleProViewUI {

        private endAngle: number = 0;

        constructor() {
            super();
            this.zOrder = 0;
            Laya.timer.loop(WritingConfig.proAddTime, this, this.addPro);
            this.on(Laya.Event.CLICK, this, this.changeView);
        }

        addPro(): void {
            this.endAngle += WritingConfig.proAddNum;

            if (this.endAngle > 360) {
                this.endAngle = 0;
                Laya.timer.clearAll(this);
                this.removeSelf();
                switch (WritingConfig.proAddNum) {
                    case 0:
                        WritingConfig.proAddNum = 18;
                        WritingConfig.proAddTime = 25
                        break;
                    case 9:
                        WritingConfig.proAddNum = 9;
                        WritingConfig.proAddTime = 50
                        break;
                    case 18:
                        WritingConfig.proAddNum = 9;
                        WritingConfig.proAddTime = 50
                        break;
                }
            }
            this.cirImg.graphics.drawPie(27, 27, 27, 0, this.endAngle, "#77C9B7");
        }

        changeView(): void {
            switch (WritingConfig.proAddNum) {
                case 0:
                    WritingConfig.proAddNum = 0;
                    WritingConfig.proAddTime = 0;
                    break;
                case 9:
                    WritingConfig.proAddNum = 18;
                    WritingConfig.proAddTime = 25
                    break;
                case 18:
                    WritingConfig.proAddNum = 0;
                    WritingConfig.proAddTime = 0
                    break;
            }
            /** 移除当前页面 */
            Laya.timer.clearAll(this);
            this.removeSelf();

            /** 增加工作时间 */
            let viewName: string = this.name;
            let spName: string = viewName.substring(0, viewName.length - 3);

            for (let n: number = 0; n < GameConfig.authorInfoArr.length; n++) {
                let curObj: Object = GameConfig.authorInfoArr[n];
                if (curObj["name"] == spName) {
                    if (curObj["actWork"] - 10 < 0) {
                        curObj["actWork"] = 0;
                    } else {
                        curObj["actWork"] = curObj["actWork"] - 10;
                    }
                    console.log("当前工作时间：" + curObj["actWork"]);
                }
            }
            views.layers.SpAction.prototype.changeIconView(spName);
        }
    }
}