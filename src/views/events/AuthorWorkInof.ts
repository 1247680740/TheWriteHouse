namespace views.events {

    import Event = Laya.Event;
    import Sprite = Laya.Sprite;
    import HitArea = Laya.HitArea;
    import WorkItem = views.events.WorkItem;
    export class AuthorWorkInfo extends ui.common.detailInfoUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private BtndefW : number;
        private bgimagedefW : number;
        private bgnamedefW : number;
        private bgnamedefX : number;
        private static instance: AuthorWorkInfo;

        public static getInstance(): AuthorWorkInfo {
            if (AuthorWorkInfo.instance == null) {
                AuthorWorkInfo.instance = new AuthorWorkInfo();
            }
            return AuthorWorkInfo.instance;
        }       
        constructor() {
            super();
            this.pos( ((Laya.stage.width - this.width) / 2 )  - 50, (Laya.stage.height - this.height) / 2);
            this.name = "authorInfo";
            this.flushAuthorInfoUI();
        }
        flushAuthorInfoUI():void{ //刷新界面各种信息
            this.aportname.text = GameConfig.ApartmentName;
            this.apartnum.text = GameConfig.QueueNumber.toString();
            this.homenum.text =  ( GameConfig.homeFloor).toString() ;
            this.athor.text = GameConfig.authorInfoArr.length.toString();
            this.worknum.text = GameConfig.articalNameArr.length.toString() ;
            this.awardnum.text = GameConfig.winAwardNum.toString();
            this.currmoney.text = GameConfig.money.toString();
            this.awradtotal.text = GameConfig.gainmoney.toString() ;
            this.fansnum.text = GameConfig.fans.toString() ;
            var onlinetime = Laya.Browser.now() - GameConfig.playtime;
            var curDate: Date = new Date();
            var sec = Math.floor(onlinetime / 1000) % 60;
            var min = Math.floor(onlinetime  / ( 1000 * 60 ) )% 60;
            var hour = Math.floor(onlinetime / ( 1000 * 3600 )) % 3600;

            var _sec = sec >= 0 && sec < 10 ? '0' + sec : sec
            var _min = min >= 0 && min < 10 ? '0' + min : min
            var _hour = hour >= 0 && hour < 10 ? '0' + hour : hour
            this.beintime.text = '' + _hour + ': ' + _min + ': ' + _sec
        }

        closeView(): void {
            // Laya.stage.removeChild(this);
            this.removeSelf();
        }
    }
}