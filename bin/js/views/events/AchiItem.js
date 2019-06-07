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
        var List = Laya.List;
        var AchiItem = /** @class */ (function (_super) {
            __extends(AchiItem, _super);
            function AchiItem() {
                var _this = _super.call(this) || this;
                _this.bgimage.skin = '';
                _this.m_name.text = '';
                _this.m_icon.skin = '';
                _this.m_quest.text = '';
                _this.m_comtime.text = '';
                return _this;
            }
            AchiItem.getInstance = function () {
                if (AchiItem.instance == null) {
                    AchiItem.instance = new AchiItem();
                }
                return AchiItem.instance;
            };
            AchiItem.prototype.createList = function () {
                var achiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView");
                this.resourceData = this.updateResource();
                AchiItem.list = new List();
                AchiItem.list.name = "achi_list";
                AchiItem.list.itemRender = AchiItem;
                AchiItem.list.repeatX = 1;
                AchiItem.list.repeatY = 3;
                AchiItem.list.height = achiveView.achiimage.height - 70;
                AchiItem.list.x = (achiveView.width - AchiItem.list.width) / 2;
                // AchiItem.list.y = (t.height - AchiItem.list.height) / 2;
                AchiItem.list.y = 185;
                AchiItem.list.vScrollBarSkin = "";
                AchiItem.list.spaceY = 20;
                AchiItem.list.renderHandler = new Handler(this, this.upDateItem);
                achiveView.addChild(AchiItem.list);
                AchiItem.list.array = this.resourceData;
            };
            AchiItem.prototype.upDateItem = function (cell, index) {
                cell.setInfoData(cell.dataSource);
            };
            AchiItem.prototype.compare = function (property) {
                return function (obj1, obj2) {
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    return value1 - value2; // 升序
                };
            };
            /** list数据源获取 */
            AchiItem.prototype.updateResource = function () {
                var avchidata = ResourceManager.achiveGoldArr;
                var data1 = [];
                var data2 = [];
                var data3 = [];
                for (var i = 0; i < avchidata.length; i++) {
                    if (GameConfig.achiArr[i]) {
                        var aDate = new Array();
                        aDate = GameConfig.achiArr[i].split('-');
                        data1.push({
                            'bgimage': 'gameUI/event/cj_done.png', 'name': avchidata[i]['name'],
                            'm_icon': 'gameUI/event/talent_on.png', 'quest': avchidata[i]['string'],
                            'comtime': (((Number(aDate[0]) * 365 * 24 * 3600) + (Number(aDate[1]) * 30 * 24 * 3600) + (Number(aDate[2]) * 24 * 3600))) * 0.00001,
                            'comtimestr': GameConfig.achiArr[i]
                        });
                    }
                    else {
                        data2.push({
                            'bgimage': 'gameUI/event/cj_none.png', 'name': avchidata[i]['name'],
                            'm_icon': 'gameUI/event/talent_on.png', 'quest': avchidata[i]['string'], 'comtime': '', 'comtimestr': ''
                        });
                    }
                }
                //按照对象属性排序
                var data4 = data1.sort(this.compare('comtime'));
                for (var i = 0; i < data2.length; i++) {
                    data3.push(data2[i]);
                }
                for (var i = 0; i < data1.length; i++) {
                    data3.push(data4[i]);
                }
                return data3;
            };
            /** 显示消失*/
            AchiItem.prototype.changeStatus = function () {
                AchiItem.list.visible = false;
            };
            /**  */
            AchiItem.prototype.changeTrue = function () {
                AchiItem.list.visible = true;
            };
            AchiItem.prototype.setInfoData = function (obj) {
                this.m_name.text = obj['name'];
                this.m_icon.skin = obj['m_icon'];
                this.m_quest.text = obj['quest'];
                var aDate = new Array();
                if (obj['comtimestr']) {
                    aDate = obj['comtimestr'].split('-');
                    this.m_comtime.text = aDate[0] + '年' + aDate[1] + '月' + aDate[2] + '日 达成'; // 完成时间
                }
                else {
                    this.m_comtime.text = '';
                }
                this.bgimage.skin = obj['bgimage']; //背景图片
            };
            return AchiItem;
        }(ui.event.AchiListUI));
        events.AchiItem = AchiItem;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AchiItem.js.map