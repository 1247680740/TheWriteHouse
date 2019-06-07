namespace views.events {

    import Event = Laya.Event;
    import Sprite = Laya.Sprite;
    import HitArea = Laya.HitArea;
    import WorkItem = views.events.WorkItem;
    export class AuthorWorkView extends ui.common.detailUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private BtndefW: number;
        private bgimagedefW: number;
        private bgnamedefW: number;
        private bgnamedefX: number;
        private authorworkInfo: views.events.AuthorWorkInfo;
        private workitem: views.events.WorkItem;
        private status: number;
        private _pageL: number;
        private defselect: number = 0;
        private firstOpen: boolean = true;
        constructor() {
            super();
            let authorWorkView: views.events.AuthorWorkView = Laya.stage.getChildByName("AuthorWorkView") as views.events.AuthorWorkView;
            if (authorWorkView) { //防止重复添加
                return;
            }
            this.name = "authorWorkView";
            Laya.stage.addChild(this);
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2); 
            this.bgimagedefW = this.bgimage1.width;
            this.bgnamedefX = this.bgname1.x;
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.aportBtn.on(Laya.Event.CLICK, this, this.aportClick);
            this.worksBtn.on(Laya.Event.CLICK, this, this.worksClick);
            this.eventBtn.on(Laya.Event.CLICK, this, this.eventClick);
            this.aportClick();
        }

        setSlectedStatus(status: string): void { // 设置UI选中状态
            var btns = ['aportBtn', 'worksBtn', 'eventBtn'];
            for (var index = 0; index < btns.length; index++) {
                var element = btns[index];
                var j = index + 1
                if (status == element) {
                    this['bgimage' + j].width = this.bgimagedefW + 10;
                    this['bgname' + j].x = this.bgnamedefX + 10;
                } else {
                    this['bgimage' + j].width = this.bgimagedefW;
                    this['bgname' + j].x = this.bgnamedefX;
                }
            }
        }

        aportClick(): void {//公寓按钮
            if (this.status == 0) {
                return;
            }
            if (this.status == 1 && this._pageL) {
                for (let i: number = 0; i < this._pageL; i++) {
                    this.worksPanel.removeChildByName('workclick' + i);
                    this.worksPanel.removeChildByName('workitem' + i);
                }
            }

            this.status = 0;
            this.setSlectedStatus('aportBtn');

            this.authorworkInfo = new views.events.AuthorWorkInfo();
            this.addChild(this.authorworkInfo);
        }
        
        updateRightContent(index: number, _data: Array<Object>): void {
            if (this.defselect == index && !this.firstOpen) { // 如果已经展示详细信息了，再点击的话。。
                for (var index = 0; index < _data.length; index++) {
                    var element = _data[index];
                    if (index == 0) {
                        let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + 0) as views.events.WorkItem;
                        view1.y = 0;
                    } else {
                        let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (index - 1)) as views.events.WorkItem;
                        let view2: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (index)) as views.events.WorkItem;
                        view2.y = view1.y + view1.height;
                    }
                }
            }
            for (var i = 0; i < _data.length; i++) {
                if (this.worksPanel.getChildByName('workclick' + i)) {
                    this.worksPanel.removeChildByName('workclick' + i);
                }
            }
            for (var i = 0; i < _data.length; i++) {
                if (i == 0) {
                    let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + i) as views.events.WorkItem;
                    view1.y = 0;
                    if (i == index) {
                        var _workclick = new views.events.WorkClick(_data[i]['subStr'], _data[i]['eleStr'], _data[i]['platStr'], _data[i]['totalCollect'], _data[i]['totalSub'], _data[i]['totalIncom']);
                        _workclick.name = 'workclick' + i;
                        _workclick.y = view1.y + view1.height;
                        this.worksPanel.addChildren(_workclick)
                    }
                } else {
                    if (i <= index) {
                        if (i == index) {
                            var _workclick = new views.events.WorkClick(_data[i]['subStr'], _data[i]['eleStr'], _data[i]['platStr'], _data[i]['totalCollect'], _data[i]['totalSub'], _data[i]['totalIncom']);
                            _workclick.name = 'workclick' + i;
                            let view2: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (index - 1)) as views.events.WorkItem;
                            let view3: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + index) as views.events.WorkItem;
                            view3.y = view2.y + view2.height;
                            _workclick.y = view3.y + view3.height;
                            this.worksPanel.addChildren(_workclick)
                        } else {
                            let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + i) as views.events.WorkItem;
                            let view2: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (i - 1)) as views.events.WorkItem;
                            view1.y = view2.y + view2.height;
                        }

                    } else {
                        let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + i) as views.events.WorkItem;
                        let view2: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (i - 1)) as views.events.WorkItem;
                        if (i == index + 1) {
                            let _workclick: views.events.WorkClick = this.worksPanel.getChildByName('workclick' + index) as views.events.WorkClick;
                            view1.y = _workclick.y + _workclick.height;
                        } else {
                            view1.y = view2.y + view2.height;
                        }
                    }
                }
            }

            this.defselect = index;
        }

        compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value2 - value1;     // 降序
            }
        }


        worksClick(): void {//作品按钮
            if (this.status == 1) {
                return
            }
            this.firstOpen = true;
            this.defselect = 0;

            if (this.status == 0) {
                Laya.stage.removeChildByName('authorInfo');
            }
            this.status = 1;
            //测试
            this.worksPanel.visible = true;
            this.worksPanel.vScrollBarSkin = '';
            this.setSlectedStatus('worksBtn');
            var data: Array<Object> = [];
            for (let i: number = 0; i < GameConfig.HistoryCompArr.length; i++) {
                var arr = GameConfig.HistoryCompArr[i]
                if (arr['finishTime']) { //已完结
                    data.push({
                        'authorName': arr['authorName'], 'pageName': arr['pageName'], 'subStr': arr['subStr'], 'eleStr': arr['eleStr'], 'platStr': arr['platStr'],
                        'totalCollect': arr['totalCollect'], 'totalSub': arr['totalSub'], 'totalIncom': arr['totalIncom'], 'finishTime': Number(arr['finishTime'])
                    })
                }
            }
            var data1 = data.sort(this.compare('finishTime'));
            // var data2 = [{ 'authorName':'黎明1','pageName':'张1','subStr':'sub1','eleStr':'陈1','platStr':'赵1',
            //         'totalCollect':5,'totalSub':6,'totalIncom':6,'finishTime':2016},

            //         { 'authorName':'黎明2','pageName':'张2','subStr':'sub1','eleStr':'陈2','platStr':'赵2',
            //         'totalCollect':5,'totalSub':6,'totalIncom':7,'finishTime':2017},
            //         ];
            // var data1 = data2.sort(this.compare( 'finishTime' ));
            this._pageL = data1.length;
            for (var index = 0; index < data1.length; index++) {
                var element = data1[index];
                var _workitem = new views.events.WorkItem(element['pageName'], element['authorName']);
                _workitem.name = 'workitem' + index;
                if (index == 0) {
                    _workitem.y = 0;
                } else {
                    let view1: views.events.WorkItem = this.worksPanel.getChildByName('workitem' + (index - 1)) as views.events.WorkItem;
                    _workitem.y = view1.y + view1.height;
                }
                this.worksPanel.addChildren(_workitem)
                _workitem.bg1.on(Event.CLICK, this, this.updateRightContent, [index, data1]);
            }

            this.updateRightContent(0, data1); //第一次打开默认选中第一个
            this.firstOpen = false;
        }

        eventClick(): void {//事件按钮
            TipLayerManager.tipLayer.showDrawBgTip("暂未开放");
            return;
        }

        closeView(): void {
            // this.authorworkInfo.closeView();
            Laya.stage.removeChild(this);
            Laya.stage.removeChildByName('workItem');
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
            Hash.playMusic(2);
        }
    }
}