namespace views.events {
    import Event = Laya.Event;
    import List = Laya.List;
    import resource = managers.ResourceManager;
    import AchiveView = views.events.AchiveView;
    export class AchiItem extends ui.event.AchiListUI {

        static list: List;
        private static instance: AchiItem;
        private resourceData: Array<Object>;

        constructor() {
            super();
            this.bgimage.skin = ''
            this.m_name.text = ''
            this.m_icon.skin = ''
            this.m_quest.text = ''
            this.m_comtime.text = ''
        }

        public static getInstance(): AchiItem {
            if (AchiItem.instance == null) {
                AchiItem.instance = new AchiItem();
            }
            return AchiItem.instance;
        }
        createList(): void {
            let achiveView: views.events.AchiveView = SceneLayerManager.sceneLayer.getChildByName("achiveView") as views.events.AchiveView;
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
            AchiItem.list.vScrollBarSkin = ""
            AchiItem.list.spaceY = 20;
            AchiItem.list.renderHandler = new Handler(this, this.upDateItem);
            achiveView.addChild(AchiItem.list);
            AchiItem.list.array = this.resourceData;
        }

        upDateItem(cell: AchiItem, index: number): void {
            cell.setInfoData(cell.dataSource)
        }

       compare(property){
            return function(obj1,obj2){
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
       }

        /** list数据源获取 */
        updateResource(): Array<Object> {
            var avchidata: Array<Object> = ResourceManager.achiveGoldArr;
            var data1: Array<Object> = [];
            var data2: Array<Object> = [];
            var data3: Array<Object> = [];
            for (var i: number = 0; i < avchidata.length; i++) {
                if (GameConfig.achiArr[i]) {//已完成
                    let aDate: Array<any> = new Array<any>();
                    aDate = GameConfig.achiArr[i].split('-');
                    data1.push({
                        'bgimage': 'gameUI/event/cj_done.png', 'name': avchidata[i]['name'],
                        'm_icon': 'gameUI/event/talent_on.png', 'quest': avchidata[i]['string'],
                        'comtime': ( ( ( Number(aDate[0]) * 365 * 24 * 3600 ) + ( Number(aDate[1]) * 30 * 24 * 3600 ) + ( Number(aDate[2]) * 24 * 3600 ) )) * 0.00001,
                        'comtimestr':  GameConfig.achiArr[i] 
                    })
                } else { //未完成
                    data2.push({
                        'bgimage': 'gameUI/event/cj_none.png', 'name': avchidata[i]['name'],
                        'm_icon': 'gameUI/event/talent_on.png', 'quest': avchidata[i]['string'], 'comtime': '','comtimestr':''
                    })
                }
            }
            //按照对象属性排序
            var data4 = data1.sort(this.compare( 'comtime' ));
            for (var i: number = 0; i < data2.length; i++) {
                data3.push(data2[i])
            }
            for (var i: number = 0; i < data1.length; i++) {
                data3.push(data4[i])
            }
            return data3;
        }

        /** 显示消失*/
        changeStatus(): void {
            AchiItem.list.visible = false;
        }

        /**  */
        changeTrue(): void {
            AchiItem.list.visible = true;
        }

        setInfoData(obj: Object) {
            this.m_name.text = obj['name']
            this.m_icon.skin = obj['m_icon']
            this.m_quest.text = obj['quest']
            let aDate: Array<any> = new Array<any>();
            if (obj['comtimestr']){
                aDate = obj['comtimestr'].split('-');
                this.m_comtime.text = aDate[0]+'年'+aDate[1]+'月'+aDate[2]+'日 达成'; // 完成时间
            }else
            {
                this.m_comtime.text = ''; 
            }

            this.bgimage.skin = obj['bgimage'] //背景图片
        }
    }
}