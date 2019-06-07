namespace views.events {
    import Event = Laya.Event;
    export class WorkClick extends ui.event.WorksClickUI {

        private _subStr : string; // 题材
        private _eleStr : string; //元素
        private _platStr : string; //平台
        private _totalCollect : number; //收藏
        private _totalSub : number; //订阅
        private _totalIncom : number; //收入
        constructor(_subStr:string,_eleStr : string,_platStr : string,_totalCollect : number,_totalSub : number,_totalIncom : number) {
            super();
            this.subname.text = _subStr;
            this.elename.text = _eleStr;
            this.platname.text = _platStr;
            this.totalsubname.text = _totalSub.toString();
            this.incomename.text = _totalIncom.toString();
            this.collectname.text = _totalCollect.toString();
        }
    }
}