//贷款系统
/** 实现方案
    1 数据库需要存储是哪一年申请的贷款
*/
import res = managers.ResourceManager;
import ConfirmCancelTipView = views.common.ConfirmCancelTipView;
import _Sprite = Laya.Sprite;
import HitArea = Laya.HitArea;
namespace views.events {

    export class Loan extends ui.event.LoanUI {
        public yesOrNoTip: ConfirmCancelTipView;
        private changeState:number = 1;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        constructor() {
            super();
            let _logn: views.events.Loan = Laya.stage.getChildByName("lognView") as views.events.Loan;
            if ( _logn ){ //防止重复添加
                return;
            }
            Laya.stage.removeChildByName("maskView");
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            this.addMask();
            this.name = 'lognView'
            this.visible = true;
            this.loanbtn.skin = 'gameUI/AuthorData/loan.png';
            this.fullbtn.skin = '';
            // Laya.stage.addChild(this);
            this.zOrder = 2;
            SceneLayerManager.sceneLayer.addChild(this);
            this.Determine.skin = "gameUI/common/buttonA.png";
            this.giveup.skin = "gameUI/common/buttonB.png";                
            this.tittle.text = '加盖楼层'
            this.loanlabel.text = '贷款'
            this.shoufu.text = '首付'
            this.ninahuan.text = '年还'
            this.qixina.text = '期限'
            this.zongji.text = '总计'                
            this.full.text = '全款' 
            var exl = res.incomeArr;
            for (var i: number = 0; i < exl.length; i++) {
                if ( GameConfig.year == exl[i]['year'] ){
                    this.loanlabel1.text  = '' + exl[i]['spreaMoney'] * 0.2;      // 首付
                    this.loanlabel2.text = '' + exl[i]['spreaMoney'] * 0.12;    // 年还
                    this.loanlabel3.text = '10年';    // 期限
                    this.loanlabel4.text = '' + exl[i]['spreaMoney'] * 1.4 ;    // 总计
                    this.full1.text = exl[i]['spreaMoney'] // 全款  
                    this.full2.text = '0'                // 年还
                    this.full3.text = '0年'            // 期限
                    this.full4.text = '' + exl[i]['spreaMoney'] ;         // 总计           
                }
            }
            this.loanbtn.on(Laya.Event.CLICK, this, this.selectloan);   //确定   
            this.fullbtn.on(Laya.Event.CLICK, this, this.selectfull);    //放弃 
            this.Determine.on(Laya.Event.CLICK, this, this.sure);   //确定   
            this.giveup.on(Laya.Event.CLICK, this, this.giveUpfunc);    //放弃
            this.x = ( Laya.stage.width - this.width ) / 2;
            this.y = (Laya.stage.height - this.height ) / 2;
            this.Determine.label = '施工'
            this.giveup.label = '放弃'
            SceneLayerManager.sceneLayer.stopEvent();
        }  
        addMask(): void {
            // 引导所在容器
            this.guideContainer = new _Sprite();
            this.guideContainer.name = "maskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2; 
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = false;
            }
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);
            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;

        }        
        selectloan():void{ // 选择贷款
            this.changeState = 1;
            this.loanbtn.skin = "gameUI/AuthorData/loan.png";
            this.fullbtn.skin = '';  
            Hash.playMusic(2);
        }    
        selectfull():void{ // 选择全款
            this.changeState = 2;
            this.loanbtn.skin = '';
            this.fullbtn.skin = "gameUI/AuthorData/loan.png";
            Hash.playMusic(2);
        }                 
        sure():void{ // 确定
            SceneLayerManager.sceneLayer.buildHome(this.changeState)
            this.closeView();
            Hash.playMusic(2);
        }     
        giveUpfunc():void{ //放弃
            this.closeView();
            Hash.playMusic(2);
        }
        closeView(){
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            // Laya.stage.removeChild(this);
            SceneLayerManager.sceneLayer.removeChild(this);
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