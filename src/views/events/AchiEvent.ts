import resource = managers.ResourceManager;
namespace views.events{
    export class AchiEvent extends ui.event.AchiPopUI {    
        public id:number;
        constructor(id:number) {
            super();
            var curDate: Date = new Date();
            var year: number = curDate.getFullYear();
            var month: number = curDate.getMonth() + 1;
            var data: number = curDate.getDate();       
            GameConfig.achiArr[id] = GameConfig.year + '-' +  GameConfig.month + '-' + GameConfig.day;
            GameConfig.cachData["achiArr"] = GameConfig.achiArr;
            this.bgimage.skin = 'gameUI/event/cj_tips.png'
            let avchidata:Array<Object> = resource.achiveGoldArr;
            this.m_name.text = avchidata[id]['name'];
            this.m_icon.skin = 'gameUI/event/talent_on.png'
            this.m_quest.text = '你获得了一点成就'
            this.m_comtime.text = '' + GameConfig.year + '年' +  GameConfig.month + '月' + GameConfig.day + '日 达成'
            Laya.stage.addChild(this);
            this.AddAchiPoint();
            this.PopUI();
            this.x = (Laya.stage.width - this.width)/2;//70;
            this.y = (Laya.stage.height - this.height)/2;//500;
        }
        AddAchiPoint(){ // 增加成就点
            GameConfig.hasTalentPoint += 1 ;
            GameConfig.defHasTalentPoint += 1 ;
            GameConfig.cachData['hasTalentPoint'] = GameConfig.hasTalentPoint;
            GameConfig.cachData['defHasTalentPoint'] = GameConfig.defHasTalentPoint
        }    
        PopUI(){ //弹出UI
            this.alpha = 0;
            Laya.Tween.to(this, { alpha: 1 }, 500, Laya.Ease.sineOut, Handler.create(this,this.comeUI),1000);
        }
        comeUI(){ //显示UI完成
            Laya.Tween.to(this, { alpha: 0 }, 1000, Laya.Ease.sineOut, Handler.create(this,this.RemoveUI),1000);
        }
        RemoveUI(){
            Laya.stage.removeChild(this);
        }
    }
}