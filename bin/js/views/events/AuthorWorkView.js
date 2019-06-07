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
    var events;
    (function (events) {
        var Event = Laya.Event;
        var AuthorWorkView = /** @class */ (function (_super) {
            __extends(AuthorWorkView, _super);
            function AuthorWorkView() {
                var _this = _super.call(this) || this;
                _this.defselect = 0;
                _this.firstOpen = true;
                var authorWorkView = Laya.stage.getChildByName("AuthorWorkView");
                if (authorWorkView) {
                    return _this;
                }
                _this.name = "authorWorkView";
                Laya.stage.addChild(_this);
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.bgimagedefW = _this.bgimage1.width;
                _this.bgnamedefX = _this.bgname1.x;
                _this.closeBtn.on(Laya.Event.CLICK, _this, _this.closeView);
                _this.aportBtn.on(Laya.Event.CLICK, _this, _this.aportClick);
                _this.worksBtn.on(Laya.Event.CLICK, _this, _this.worksClick);
                _this.eventBtn.on(Laya.Event.CLICK, _this, _this.eventClick);
                _this.aportClick();
                return _this;
            }
            AuthorWorkView.prototype.setSlectedStatus = function (status) {
                var btns = ['aportBtn', 'worksBtn', 'eventBtn'];
                for (var index = 0; index < btns.length; index++) {
                    var element = btns[index];
                    var j = index + 1;
                    if (status == element) {
                        this['bgimage' + j].width = this.bgimagedefW + 10;
                        this['bgname' + j].x = this.bgnamedefX + 10;
                    }
                    else {
                        this['bgimage' + j].width = this.bgimagedefW;
                        this['bgname' + j].x = this.bgnamedefX;
                    }
                }
            };
            AuthorWorkView.prototype.aportClick = function () {
                if (this.status == 0) {
                    return;
                }
                if (this.status == 1 && this._pageL) {
                    for (var i = 0; i < this._pageL; i++) {
                        this.worksPanel.removeChildByName('workclick' + i);
                        this.worksPanel.removeChildByName('workitem' + i);
                    }
                }
                this.status = 0;
                this.setSlectedStatus('aportBtn');
                this.authorworkInfo = new views.events.AuthorWorkInfo();
                this.addChild(this.authorworkInfo);
            };
            AuthorWorkView.prototype.updateRightContent = function (index, _data) {
                if (this.defselect == index && !this.firstOpen) {
                    for (var index = 0; index < _data.length; index++) {
                        var element = _data[index];
                        if (index == 0) {
                            var view1 = this.worksPanel.getChildByName('workitem' + 0);
                            view1.y = 0;
                        }
                        else {
                            var view1 = this.worksPanel.getChildByName('workitem' + (index - 1));
                            var view2 = this.worksPanel.getChildByName('workitem' + (index));
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
                        var view1 = this.worksPanel.getChildByName('workitem' + i);
                        view1.y = 0;
                        if (i == index) {
                            var _workclick = new views.events.WorkClick(_data[i]['subStr'], _data[i]['eleStr'], _data[i]['platStr'], _data[i]['totalCollect'], _data[i]['totalSub'], _data[i]['totalIncom']);
                            _workclick.name = 'workclick' + i;
                            _workclick.y = view1.y + view1.height;
                            this.worksPanel.addChildren(_workclick);
                        }
                    }
                    else {
                        if (i <= index) {
                            if (i == index) {
                                var _workclick = new views.events.WorkClick(_data[i]['subStr'], _data[i]['eleStr'], _data[i]['platStr'], _data[i]['totalCollect'], _data[i]['totalSub'], _data[i]['totalIncom']);
                                _workclick.name = 'workclick' + i;
                                var view2 = this.worksPanel.getChildByName('workitem' + (index - 1));
                                var view3 = this.worksPanel.getChildByName('workitem' + index);
                                view3.y = view2.y + view2.height;
                                _workclick.y = view3.y + view3.height;
                                this.worksPanel.addChildren(_workclick);
                            }
                            else {
                                var view1 = this.worksPanel.getChildByName('workitem' + i);
                                var view2 = this.worksPanel.getChildByName('workitem' + (i - 1));
                                view1.y = view2.y + view2.height;
                            }
                        }
                        else {
                            var view1 = this.worksPanel.getChildByName('workitem' + i);
                            var view2 = this.worksPanel.getChildByName('workitem' + (i - 1));
                            if (i == index + 1) {
                                var _workclick_1 = this.worksPanel.getChildByName('workclick' + index);
                                view1.y = _workclick_1.y + _workclick_1.height;
                            }
                            else {
                                view1.y = view2.y + view2.height;
                            }
                        }
                    }
                }
                this.defselect = index;
            };
            AuthorWorkView.prototype.compare = function (property) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    return value2 - value1; // 降序
                };
            };
            AuthorWorkView.prototype.worksClick = function () {
                if (this.status == 1) {
                    return;
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
                var data = [];
                for (var i = 0; i < GameConfig.HistoryCompArr.length; i++) {
                    var arr = GameConfig.HistoryCompArr[i];
                    if (arr['finishTime']) {
                        data.push({
                            'authorName': arr['authorName'], 'pageName': arr['pageName'], 'subStr': arr['subStr'], 'eleStr': arr['eleStr'], 'platStr': arr['platStr'],
                            'totalCollect': arr['totalCollect'], 'totalSub': arr['totalSub'], 'totalIncom': arr['totalIncom'], 'finishTime': Number(arr['finishTime'])
                        });
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
                    }
                    else {
                        var view1 = this.worksPanel.getChildByName('workitem' + (index - 1));
                        _workitem.y = view1.y + view1.height;
                    }
                    this.worksPanel.addChildren(_workitem);
                    _workitem.bg1.on(Event.CLICK, this, this.updateRightContent, [index, data1]);
                }
                this.updateRightContent(0, data1); //第一次打开默认选中第一个
                this.firstOpen = false;
            };
            AuthorWorkView.prototype.eventClick = function () {
                TipLayerManager.tipLayer.showDrawBgTip("暂未开放");
                return;
            };
            AuthorWorkView.prototype.closeView = function () {
                // this.authorworkInfo.closeView();
                Laya.stage.removeChild(this);
                Laya.stage.removeChildByName('workItem');
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return AuthorWorkView;
        }(ui.common.detailUI));
        events.AuthorWorkView = AuthorWorkView;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AuthorWorkView.js.map