namespace views.events {
    import Event = Laya.Event;
    import List = Laya.List;
    import resource = managers.ResourceManager;
    import authorView = views.events.AuthorWorkView;
    export class WorkItem extends ui.event.WorksListUI {

        static list: List;
        private static instance: WorkItem;
        private resourceData: Array<Object>;

        private _subStr : string; // 题材
        private _eleStr : string; //元素
        private _platStr : string; //平台
        private _otalCollect : number; //收藏
        private _totalSub : number; //订阅
        private _totalIncom : number; //收入
        private _selected:number; // 选中的单元格
        constructor(pagename:string,author:string ) {
            super();
            this.authorname.text = author;
            this.workname.text = pagename;
        }
       compare(property){
            return function(obj1,obj2){
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
       }
        setInfoData(obj: Object) {
            this.workname.text = obj['pageName'] ;//作品名称
            this.authorname.text = obj['authorName'];//作则名称
        }
    }
}