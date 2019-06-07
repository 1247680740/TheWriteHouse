
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.action {
    export class HistoryViewUI extends View {
		public title:Laya.Label;
		public historyLabel:Laya.TextArea;
		public closeBtn:Laya.Button;
		public awardTitle:Laya.Label;
		public pageName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":450,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"width":450,"skin":"gameUI/event/historyBg.png","height":300}},{"type":"Image","props":{"y":55,"width":395,"skin":"gameUI/event/historyLabelBg.png","height":165,"centerX":0}},{"type":"Label","props":{"y":12,"var":"title","name":"title","fontSize":32,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"TextArea","props":{"y":83,"x":49,"wordWrap":true,"width":356,"var":"historyLabel","valign":"top","type":"text","name":"historyLabel","mouseThrough":false,"mouseEnabled":false,"height":134,"fontSize":23,"font":"SimSun","editable":false,"color":"#000000","bold":true,"align":"left"}},{"type":"Button","props":{"y":243,"width":143,"visible":true,"var":"closeBtn","stateNum":1,"skin":"gameUI/event/historyCloseBtn.png","sizeGrid":"5,5,5,5","name":"closeBtn","mouseThrough":false,"labelSize":25,"labelFont":"SimSun","labelColors":"#000000","labelBold":true,"labelAlign":"center","hitTestPrior":true,"height":50,"centerX":0}},{"type":"Label","props":{"y":76,"var":"awardTitle","name":"awardTitle","fontSize":23,"font":"SimSun","centerX":0,"bold":true}},{"type":"Label","props":{"y":141,"var":"pageName","name":"pageName","fontSize":30,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.HistoryViewUI.uiView);

        }

    }
}

module ui.action {
    export class IssueViewUI extends View {
		public pageName:Laya.TextInput;
		public platLabel:Laya.Label;
		public spaceLabel:Laya.Label;
		public issueBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":500},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":500,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":70,"width":500,"skin":"gameUI/AuthorData/baseD.png","height":410,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Box","props":{"y":30,"x":125},"child":[{"type":"Label","props":{"x":125,"text":"发布","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":105,"valign":"middle","text":"名称:","fontSize":30,"font":"SimHei","color":"#777571","bold":true,"align":"center"}},{"type":"Label","props":{"y":185,"text":"平台:","fontSize":30,"font":"SimHei","color":"#777571","bold":true,"align":"center"}},{"type":"Label","props":{"y":265,"valign":"middle","text":"篇幅:","fontSize":30,"font":"SimHei","color":"#777571","bold":true,"align":"center"}},{"type":"Label","props":{"y":135,"x":95,"width":200,"height":3,"bgColor":"#777571","alpha":0.5}},{"type":"Label","props":{"y":215,"x":95,"width":200,"height":3,"bgColor":"#777571","alpha":0.5}},{"type":"Label","props":{"y":295,"x":95,"width":200,"height":3,"bgColor":"#777571","alpha":0.5}}]},{"type":"TextInput","props":{"y":135,"x":220,"width":200,"var":"pageName","valign":"middle","overflow":"hidden","name":"pageName","maxChars":14,"height":25,"fontSize":25,"font":"SimHei","color":"#777571","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":217,"x":220,"width":200,"var":"platLabel","valign":"middle","text":"点击选择","overflow":"hidden","name":"platLabel","height":25,"fontSize":25,"font":"SimHei","color":"#777571","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":298,"x":220,"width":200,"var":"spaceLabel","valign":"middle","text":"点击选择","overflow":"hidden","name":"spaceLabel","height":25,"fontSize":25,"font":"SimHei","color":"#777571","bold":true,"alpha":0.7,"align":"center"}},{"type":"Button","props":{"y":384,"width":157,"var":"issueBtn","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"issueBtn","mouseThrough":false,"labelSize":25,"labelFont":"SimSun","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"labelAlign":"center","label":"发布","hitTestPrior":true,"height":48,"centerX":0,"alpha":0.8}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.IssueViewUI.uiView);

        }

    }
}

module ui.action {
    export class OperaSelectItemUI extends View {
		public backBtn:Laya.Button;
		public attributeBtn:Laya.Button;
		public addEleBtn:Laya.Button;
		public ReleaseBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":550},"child":[{"type":"Image","props":{"width":500,"skin":"gameUI/common/ditu_house.png","height":550}},{"type":"Button","props":{"y":394,"width":250,"var":"backBtn","stateNum":1,"skin":"gameUI/action/button.png","name":"backBtn","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","label":"取消","height":70,"centerX":0}},{"type":"Button","props":{"y":66,"width":427,"var":"attributeBtn","stateNum":1,"skin":"gameUI/common/operaItem.png","name":"attributeBtn","labelSize":40,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","label":"属性优化","height":86,"centerX":0}},{"type":"Button","props":{"y":170,"width":427,"var":"addEleBtn","stateNum":1,"skin":"gameUI/common/operaItem.png","name":"addEleBtn","labelSize":40,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","label":"增加元素","height":86,"centerX":0}},{"type":"Button","props":{"y":271,"width":427,"var":"ReleaseBtn","stateNum":1,"skin":"gameUI/common/operaItem.png","name":"ReleaseBtn","labelSize":40,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","label":"运营推广","height":86,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.OperaSelectItemUI.uiView);

        }

    }
}

module ui.action {
    export class OperaTingUI extends View {
		public writBox:Laya.Box;
		public authorIcon:Laya.Image;
		public articalName:Laya.TextInput;
		public authorName:Laya.Label;
		public articalTip:Laya.Label;
		public labelTip:Laya.Label;
		public ellipStr:Laya.Label;
		public ellipStrTwo:Laya.Label;
		public peoMax:Laya.ProgressBar;
		public peoMin:Laya.ProgressBar;
		public stoMax:Laya.ProgressBar;
		public stoMin:Laya.ProgressBar;
		public newMax:Laya.ProgressBar;
		public newMin:Laya.ProgressBar;
		public depMax:Laya.ProgressBar;
		public depMin:Laya.ProgressBar;
		public peoStr:Laya.Label;
		public stoStr:Laya.Label;
		public newStr:Laya.Label;
		public depStr:Laya.Label;
		public tipStr:Laya.Label;
		public Iam:Laya.Image;
		public startWritingBtn:Laya.Button;
		public backBtn:Laya.Label;
		public lineBox:Laya.Box;
		public bootomBg:Laya.Image;
		public collectStr:Laya.Label;
		public subStr:Laya.Label;
		public incomeStr:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":950},"child":[{"type":"Image","props":{"width":600,"skin":"gameUI/action/holeBg.png","height":950}},{"type":"Image","props":{"x":0,"width":550,"skin":"gameUI/action/shupi.png","height":820,"centerY":-47}},{"type":"Image","props":{"y":38,"x":0,"width":516,"skin":"gameUI/action/shuye.png","height":803}},{"type":"Box","props":{"y":73,"x":17,"width":473,"var":"writBox","name":"writBox","height":718},"child":[{"type":"Image","props":{"y":-4,"x":5,"width":167,"var":"authorIcon","name":"authorIcon","height":233}},{"type":"Image","props":{"y":253,"x":5,"width":460,"skin":"gameUI/action/ditu1.png","height":195}},{"type":"Image","props":{"y":460,"x":5,"width":460,"skin":"gameUI/action/ditu2.png","height":195,"sizeGrid":"30,30,30,30"}},{"type":"TextInput","props":{"y":30,"x":195,"wordWrap":false,"width":255,"var":"articalName","valign":"middle","overflow":"hidden","name":"articalName","maxChars":7,"height":35,"fontSize":35,"font":"SimHei","color":"#000000","bold":true,"align":"left"}},{"type":"Label","props":{"y":80,"x":195,"var":"authorName","name":"authorName","fontSize":25,"font":"SimHei","color":"#F8A057","bold":true}},{"type":"Label","props":{"y":125,"x":195,"width":255,"var":"articalTip","overflow":"hidden","name":"articalTip","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true,"alpha":0.6,"align":"left"}},{"type":"Label","props":{"y":170,"x":195,"width":255,"var":"labelTip","overflow":"hidden","name":"labelTip","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true,"alpha":0.6,"align":"left"}},{"type":"Label","props":{"y":125,"x":451,"width":40,"var":"ellipStr","text":"...","name":"ellipStr","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":169,"x":452,"var":"ellipStrTwo","text":"...","name":"ellipStrTwo","fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":270,"x":40,"text":"人设","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":315,"x":40,"text":"故事","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":360,"x":40,"text":"新意","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":405,"x":40,"text":"深度","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"ProgressBar","props":{"y":270,"x":120,"width":300,"var":"peoMax","skin":"gameUI/action/twoprogress.png","name":"peoMax","height":25}},{"type":"ProgressBar","props":{"y":270,"x":120,"width":300,"var":"peoMin","skin":"gameUI/action/oneprogress.png","name":"peoMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":315,"x":120,"width":300,"var":"stoMax","skin":"gameUI/action/twoprogress.png","name":"stoMax","height":25}},{"type":"ProgressBar","props":{"y":315,"x":120,"width":300,"var":"stoMin","skin":"gameUI/action/oneprogress.png","name":"stoMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":360,"x":120,"width":300,"var":"newMax","skin":"gameUI/action/twoprogress.png","name":"newMax","height":25}},{"type":"ProgressBar","props":{"y":360,"x":120,"width":300,"var":"newMin","skin":"gameUI/action/oneprogress.png","name":"newMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":405,"x":120,"width":300,"var":"depMax","skin":"gameUI/action/twoprogress.png","name":"depMax","height":25}},{"type":"ProgressBar","props":{"y":405,"x":120,"width":300,"var":"depMin","skin":"gameUI/action/oneprogress.png","name":"depMin","height":25,"alpha":0.5}},{"type":"Label","props":{"y":270,"x":215,"var":"peoStr","name":"peoStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":315,"x":215,"var":"stoStr","name":"stoStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":360,"x":215,"var":"newStr","name":"newStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":405,"x":215,"var":"depStr","name":"depStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":475,"var":"tipStr","overflow":"hidden","name":"tipStr","fontSize":20,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":510,"x":192,"width":90,"var":"Iam","name":"Iam","height":130}},{"type":"Button","props":{"y":670,"x":119,"width":250,"var":"startWritingBtn","stateNum":2,"skin":"gameUI/action/button.png","sizeGrid":"5,5,5,5","name":"startWritingBtn","labelSize":30,"labelFont":"SimSun","labelColors":"#FFFCD8,#FFFCD8,#FFFCD8,#FFFCD8","labelBold":true,"labelAlign":"center","height":65}},{"type":"Label","props":{"y":810,"x":490,"var":"backBtn","text":"返回","overflow":"hidden","name":"backBtn","fontSize":40,"font":"SimHei","color":"#000000","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":550,"x":17,"var":"lineBox","name":"lineBox"},"child":[{"type":"Image","props":{"x":5,"width":458,"skin":"gameUI/AuthorData/grid4.png","height":43}},{"type":"Image","props":{"y":53,"x":5,"width":458,"var":"bootomBg","skin":"gameUI/AuthorData/grid4.png","name":"bootomBg","height":108}},{"type":"Image","props":{"y":7,"x":5,"skin":"gameUI/common/orange.png"}},{"type":"Label","props":{"y":14,"x":35,"var":"collectStr","text":"收藏：999999","name":"collectStr","fontSize":18,"font":"SimHei","color":"#ffffff","bold":false}},{"type":"Image","props":{"y":7,"x":160,"skin":"gameUI/common/yellow.png"}},{"type":"Label","props":{"y":14,"x":190,"var":"subStr","text":"订阅：99999","name":"subStr","fontSize":18,"font":"SimHei","color":"#ffffff","bold":false,"align":"center"}},{"type":"Image","props":{"y":3,"x":300,"width":48,"skin":"gameUI/common/blue.png","height":40}},{"type":"Label","props":{"y":14,"x":340,"var":"incomeStr","text":"收入：999999","name":"incomeStr","fontSize":18,"font":"SimHei","color":"#ffffff","bold":false,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.OperaTingUI.uiView);

        }

    }
}

module ui.action {
    export class PlotSingleItemUI extends View {
		public plotSelectBg:Laya.Image;
		public eleStr:Laya.Label;
		public hotStr:Laya.Label;
		public adapterStr:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":435,"height":70},"child":[{"type":"Image","props":{"width":435,"var":"plotSelectBg","skin":"gameUI/action/ditu3.png","name":"plotSelectBg","height":70}},{"type":"Label","props":{"x":20,"var":"eleStr","name":"eleStr","fontSize":25,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"x":170,"var":"hotStr","name":"hotStr","fontSize":25,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"x":320,"var":"adapterStr","name":"adapterStr","fontSize":25,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"alpha":0.7,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.PlotSingleItemUI.uiView);

        }

    }
}

module ui.action {
    export class ReleaseUI extends View {
		public sexBtn:Laya.Button;
		public ageBtn:Laya.Button;
		public eduBtn:Laya.Button;
		public conductBtn:Laya.Button;
		public labelBox:Laya.Box;
		public moneyTip:Laya.Label;
		public releaseBtn:Laya.Button;
		public backBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":600},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":600,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":60,"width":500,"skin":"gameUI/AuthorData/baseD.png","height":527,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Button","props":{"y":128,"x":229,"width":135,"var":"sexBtn","stateNum":1,"sizeGrid":"5,5,5,5,","name":"sexBtn","labelSize":20,"labelFont":"SimSun","labelColors":"#5D5D5D,#5D5D5D,#5D5D5D,#5D5D5D","labelBold":true,"labelAlign":"center","label":"点击选择","height":36,"alpha":0.5}},{"type":"Button","props":{"y":203,"x":229,"width":135,"var":"ageBtn","stateNum":1,"name":"ageBtn","labelSize":20,"labelFont":"SimSun","labelColors":"#5D5D5D,#5D5D5D,#5D5D5D,#5D5D5D","labelBold":true,"labelAlign":"center","label":"点击选择","height":36,"alpha":0.5}},{"type":"Button","props":{"y":278,"x":229,"width":135,"var":"eduBtn","stateNum":1,"name":"eduBtn","labelSize":20,"labelFont":"SimSun","labelColors":"#5D5D5D,#5D5D5D,#5D5D5D,#5D5D5D","labelBold":true,"labelAlign":"center","label":"点击选择","height":36,"alpha":0.5}},{"type":"Button","props":{"y":353,"x":229,"width":135,"var":"conductBtn","stateNum":1,"sizeGrid":"5,5,5,5","name":"conductBtn","labelSize":20,"labelFont":"SimSun","labelColors":"#5D5D5D,#5D5D5D,#5D5D5D,#5D5D5D","labelBold":true,"labelAlign":"center","label":"点击选择","height":36,"alpha":0.5}},{"type":"Box","props":{"y":19,"x":57,"var":"labelBox","name":"labelBox"},"child":[{"type":"Label","props":{"x":172,"valign":"middle","text":"推广","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":116,"x":68,"valign":"middle","text":"性别:","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":191,"x":68,"valign":"middle","text":"年龄:","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":266,"x":68,"valign":"middle","text":"学历:","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":341,"x":68,"valign":"middle","text":"宣传:","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":146,"x":150,"width":190,"height":3,"bgColor":"#5D5D5D","alpha":0.2}},{"type":"Label","props":{"y":221,"x":150,"width":190,"height":3,"bgColor":"#5D5D5D","alpha":0.2}},{"type":"Label","props":{"y":296,"x":150,"width":190,"height":3,"bgColor":"#5D5D5D","alpha":0.2}},{"type":"Label","props":{"y":371,"x":150,"width":190,"height":3,"bgColor":"#5D5D5D","alpha":0.2}},{"type":"Label","props":{"y":418,"x":115,"var":"moneyTip","name":"moneyTip","fontSize":20,"font":"SimSun","color":"#c3ab5c","bold":true,"alpha":0.8,"align":"center"}}]},{"type":"Button","props":{"y":490,"width":157,"var":"releaseBtn","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"releaseBtn","mouseThrough":false,"labelSize":25,"labelFont":"SimSun","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"labelAlign":"center","label":"发布","hitTestPrior":true,"height":48,"centerX":0,"alpha":0.8}},{"type":"Button","props":{"y":549,"x":469,"width":80,"var":"backBtn","stateNum":1,"name":"backBtn","labelSize":35,"labelFont":"SimHei","labelColors":"#000000,#000000,#000000,#000000","labelBold":false,"labelAlign":"center","label":"返回","height":49}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.ReleaseUI.uiView);

        }

    }
}

module ui.action {
    export class ScoreUI extends View {
		public Title:Laya.Label;
		public rankStr:Laya.Label;
		public collectStr:Laya.Label;
		public reWardStr:Laya.Label;
		public incomeStr:Laya.Label;
		public tipStr:Laya.Label;
		public gradeTxt:Laya.Label;
		public rankTxt:Laya.Label;
		public collectTxt:Laya.Label;
		public reWardTxt:Laya.Label;
		public incomeTxt:Laya.Label;
		public releaseBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":600},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":600,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":60,"width":500,"skin":"gameUI/AuthorData/baseD.png","height":527,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Box","props":{"y":32,"x":110},"child":[{"type":"Label","props":{"y":-13,"x":84,"var":"Title","text":"首月成绩","name":"Title","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":88,"x":60,"text":"签约:","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":153,"x":60,"var":"rankStr","text":"排名:","name":"rankStr","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":213,"x":60,"var":"collectStr","text":"收藏:","name":"collectStr","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":273,"x":60,"var":"reWardStr","text":"收入:","name":"reWardStr","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":333,"var":"incomeStr","text":"公寓收入:","name":"incomeStr","fontSize":30,"font":"SimHei","color":"#5D5D5D","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":418,"var":"tipStr","text":"首月成绩还不错，再接再厉吧！","name":"tipStr","fontSize":18,"font":"SimSun","color":"#ACDF92","centerX":39,"bold":true}}]},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Label","props":{"y":123,"x":288,"var":"gradeTxt","valign":"middle","text":"B级","name":"gradeTxt","fontSize":23,"color":"#ACDF92","align":"left"}},{"type":"Label","props":{"y":190,"x":288,"var":"rankTxt","valign":"middle","name":"rankTxt","fontSize":23,"color":"#ACDF92","align":"left"}},{"type":"Label","props":{"y":250,"x":288,"var":"collectTxt","valign":"middle","name":"collectTxt","fontSize":23,"color":"#ACDF92","align":"left"}},{"type":"Label","props":{"y":310,"x":288,"var":"reWardTxt","valign":"middle","name":"reWardTxt","fontSize":23,"color":"#ACDF92","align":"left"}},{"type":"Label","props":{"y":370,"x":288,"var":"incomeTxt","valign":"middle","name":"incomeTxt","fontSize":23,"color":"#ACDF92","align":"left"}}]},{"type":"Button","props":{"y":494,"x":197,"width":157,"var":"releaseBtn","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"releaseBtn","mouseThrough":false,"labelSize":25,"labelFont":"SimSun","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"labelAlign":"center","label":"确定","hitTestPrior":true,"height":48,"alpha":0.8}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.ScoreUI.uiView);

        }

    }
}

module ui.action {
    export class SingleAuthorItemUI extends View {
		public selectBg:Laya.Image;
		public authorName:Laya.Label;
		public typeStr:Laya.Label;
		public typeVue:Laya.Label;
		public lastStr:Laya.Label;
		public lastVue:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":470,"height":70},"child":[{"type":"Image","props":{"width":470,"var":"selectBg","skin":"gameUI/action/ditu3.png","name":"selectBg","height":70}},{"type":"Label","props":{"x":15,"var":"authorName","name":"authorName","fontSize":23,"font":"SimHei","centerY":0,"bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"x":140,"var":"typeStr","name":"typeStr","fontSize":23,"font":"SimHei","centerY":0,"bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"x":225,"var":"typeVue","name":"typeVue","fontSize":23,"font":"SimSun","color":"#A3C880","centerY":0,"bold":true,"align":"center"}},{"type":"Label","props":{"x":310,"var":"lastStr","name":"lastStr","fontSize":23,"font":"SimHei","centerY":0,"bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"x":395,"var":"lastVue","name":"lastVue","fontSize":23,"font":"SimHei","centerY":0,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.SingleAuthorItemUI.uiView);

        }

    }
}

module ui.action {
    export class SingleHoleUI extends View {
		public selectBg:Laya.Image;
		public nameStr:Laya.Label;
		public tipStr:Laya.Label;
		public icon:Laya.Image;
		public selectIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":295},"child":[{"type":"Image","props":{"y":20,"x":20,"width":180,"var":"selectBg","skin":"gameUI/action/item1.png","name":"selectBg","height":275}},{"type":"Label","props":{"y":170,"var":"nameStr","name":"nameStr","fontSize":20,"font":"SimHei","color":"#000000","centerX":10,"bold":true}},{"type":"Label","props":{"y":226,"wordWrap":true,"width":140,"var":"tipStr","overflow":"hidden","name":"tipStr","height":30,"fontSize":15,"font":"SimSun","color":"#000000","centerX":11,"bold":true,"align":"left"}},{"type":"Image","props":{"y":26,"width":100,"var":"icon","name":"icon","height":135,"centerX":10}},{"type":"Image","props":{"width":114,"var":"selectIcon","skin":"gameUI/action/select_mark.png","name":"selectIcon","height":113}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.SingleHoleUI.uiView);

        }

    }
}

module ui.action {
    export class StartWritingUI extends Dialog {
		public authorName:Laya.Label;
		public authorIcon:Laya.Image;
		public pasInit:Laya.ProgressBar;
		public preInit:Laya.ProgressBar;
		public curInit:Laya.ProgressBar;
		public disInit:Laya.ProgressBar;
		public pasReset:Laya.ProgressBar;
		public preReset:Laya.ProgressBar;
		public curReset:Laya.ProgressBar;
		public disReset:Laya.ProgressBar;
		public pasStr:Laya.Label;
		public preStr:Laya.Label;
		public curStr:Laya.Label;
		public disStr:Laya.Label;
		public articalName:Laya.Label;
		public peoPro:Laya.ProgressBar;
		public stoPro:Laya.ProgressBar;
		public innPro:Laya.ProgressBar;
		public depPro:Laya.ProgressBar;
		public peoStr:Laya.Label;
		public stoStr:Laya.Label;
		public innStr:Laya.Label;
		public depStr:Laya.Label;
		public tipStr:Laya.Label;
		public startBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":550,"height":550},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":550,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":49,"x":16,"width":520,"skin":"gameUI/AuthorData/baseD.png","height":495,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":80,"width":435,"skin":"gameUI/common/writeBg.png","height":180,"centerX":0}},{"type":"Image","props":{"y":283,"width":435,"skin":"gameUI/common/writeBg.png","height":180,"centerX":0}},{"type":"Label","props":{"y":15,"x":226,"width":92,"text":"写作","overflow":"hidden","height":34,"fontSize":32,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":218,"x":94,"var":"authorName","name":"authorName","fontSize":20,"font":"SimHei","color":"#5D5D5D","bold":true}},{"type":"Label","props":{"y":95,"x":185,"width":3,"height":150,"color":"#5D5D5D","bgColor":"#5D5D5D","alpha":0.3}},{"type":"Image","props":{"y":101,"x":87,"width":75,"var":"authorIcon","name":"authorIcon","height":110}},{"type":"Label","props":{"y":105,"x":205,"text":"文笔","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true}},{"type":"Label","props":{"y":140,"x":205,"text":"构思","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":175,"x":205,"text":"脑洞","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":210,"x":205,"text":"阅历","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true}},{"type":"ProgressBar","props":{"y":105,"x":280,"width":200,"var":"pasInit","skin":"gameUI/event/progress.png","name":"pasInit","height":20}},{"type":"ProgressBar","props":{"y":140,"x":280,"width":200,"var":"preInit","skin":"gameUI/event/progress.png","name":"preInit","height":20}},{"type":"ProgressBar","props":{"y":175,"x":280,"width":200,"var":"curInit","skin":"gameUI/event/progress.png","name":"curInit","height":20}},{"type":"ProgressBar","props":{"y":210,"x":280,"width":200,"var":"disInit","skin":"gameUI/event/progress.png","name":"disInit","height":20}},{"type":"ProgressBar","props":{"y":105,"x":280,"width":200,"var":"pasReset","skin":"gameUI/AuthorData/progress.png","name":"pasReset","height":20,"alpha":0.6}},{"type":"ProgressBar","props":{"y":140,"x":280,"width":200,"var":"preReset","skin":"gameUI/AuthorData/progress.png","name":"preReset","height":20,"alpha":0.6}},{"type":"ProgressBar","props":{"y":175,"x":280,"width":200,"var":"curReset","skin":"gameUI/AuthorData/progress.png","name":"curReset","height":20,"alpha":0.6}},{"type":"ProgressBar","props":{"y":210,"x":280,"width":200,"var":"disReset","skin":"gameUI/AuthorData/progress.png","name":"disReset","height":20,"alpha":0.6}},{"type":"Label","props":{"y":105,"x":345,"var":"pasStr","name":"pasStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5}},{"type":"Label","props":{"y":140,"x":345,"var":"preStr","name":"preStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5}},{"type":"Label","props":{"y":175,"x":345,"var":"curStr","name":"curStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5}},{"type":"Label","props":{"y":210,"x":345,"var":"disStr","name":"disStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5,"align":"center"}},{"type":"Image","props":{"y":310,"x":77,"width":95,"skin":"gameUI/toolbar/Writing.png","height":71}},{"type":"Label","props":{"y":405,"x":70,"var":"articalName","name":"articalName","fontSize":20,"font":"SimHei","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":300,"x":185,"width":3,"height":150,"bgColor":"#5D5D5D","alpha":0.3}},{"type":"Label","props":{"y":310,"x":205,"text":"人设","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true}},{"type":"Label","props":{"y":345,"x":205,"text":"故事","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":380,"x":205,"text":"创新","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"Label","props":{"y":415,"x":205,"text":"深度","fontSize":20,"font":"SimSun","color":"#5D5D5D","bold":true,"align":"center"}},{"type":"ProgressBar","props":{"y":310,"x":280,"width":200,"var":"peoPro","skin":"gameUI/AuthorData/progress.png","name":"peoPro","height":20}},{"type":"ProgressBar","props":{"y":345,"x":280,"width":200,"var":"stoPro","skin":"gameUI/AuthorData/progress.png","name":"stoPro","height":20}},{"type":"ProgressBar","props":{"y":380,"x":280,"width":200,"var":"innPro","skin":"gameUI/AuthorData/progress.png","name":"innPro","height":20}},{"type":"ProgressBar","props":{"y":415,"x":280,"width":200,"var":"depPro","skin":"gameUI/AuthorData/progress.png","name":"depPro","height":20}},{"type":"Label","props":{"y":310,"x":345,"var":"peoStr","name":"peoStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":345,"x":345,"var":"stoStr","name":"stoStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":380,"x":345,"var":"innStr","name":"innStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":415,"x":345,"var":"depStr","name":"depStr","fontSize":20,"font":"SimHei","bold":true,"alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":481,"var":"tipStr","text":"正在编辑","name":"tipStr","fontSize":25,"font":"SimHei","color":"#8AD281","centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":468,"width":134,"var":"startBtn","skin":"gameUI/AuthorData/buttonA.png","name":"startBtn","mouseThrough":false,"labelSize":20,"labelFont":"SimSun","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"开始更新","hitTestPrior":true,"height":44,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.StartWritingUI.uiView);

        }

    }
}

module ui.action {
    export class WritingUI extends View {
		public holeBtn:Laya.Box;
		public holeStr:Laya.Label;
		public plotBtn:Laya.Box;
		public plotStr:Laya.Label;
		public writBtn:Laya.Box;
		public writStr:Laya.Label;
		public holeGrid:Laya.Panel;
		public plotGrid:Laya.Panel;
		public plotBox:Laya.Box;
		public plotConffimBtn:Laya.Button;
		public themeStr:Laya.Label;
		public backBtn:Laya.Label;
		public writBox:Laya.Box;
		public authorIcon:Laya.Image;
		public articalName:Laya.TextInput;
		public authorName:Laya.Label;
		public articalTip:Laya.Label;
		public labelTip:Laya.Label;
		public ellipStr:Laya.Label;
		public ellipStrTwo:Laya.Label;
		public peoMax:Laya.ProgressBar;
		public peoMin:Laya.ProgressBar;
		public stoMax:Laya.ProgressBar;
		public stoMin:Laya.ProgressBar;
		public newMax:Laya.ProgressBar;
		public newMin:Laya.ProgressBar;
		public depMax:Laya.ProgressBar;
		public depMin:Laya.ProgressBar;
		public peoStr:Laya.Label;
		public stoStr:Laya.Label;
		public newStr:Laya.Label;
		public depStr:Laya.Label;
		public Iam:Laya.Image;
		public assiPeo:Laya.Image;
		public IamStr:Laya.Label;
		public assiStr:Laya.Label;
		public startWritingBtn:Laya.Button;
		public friendBox:Laya.Box;
		public backWritBtn:Laya.Label;
		public siginGrid:Laya.Panel;
		public contriGrid:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":950},"child":[{"type":"Image","props":{"width":600,"skin":"gameUI/action/holeBg.png","height":950}},{"type":"Image","props":{"y":15,"x":0,"width":550,"skin":"gameUI/action/shupi.png","height":820}},{"type":"Box","props":{"y":109,"x":495,"var":"holeBtn","name":"holeBtn"},"child":[{"type":"Image","props":{"y":9,"x":0,"width":70,"skin":"gameUI/action/yeqian1.png","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"holeStr","valign":"middle","text":"灵感","padding":"0,0,0,0","overflow":"scroll","name":"holeStr","leading":10,"height":100,"fontSize":35,"font":"SimSun","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":285,"x":495,"var":"plotBtn","name":"plotBtn"},"child":[{"type":"Image","props":{"width":70,"skin":"gameUI/action/yeqian2.png","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"plotStr","valign":"middle","text":"剧情","padding":"0,0,0,0","overflow":"scroll","name":"plotStr","leading":10,"height":100,"fontSize":35,"font":"SimSun","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":452,"x":495,"var":"writBtn","name":"writBtn"},"child":[{"type":"Image","props":{"width":70,"skin":"gameUI/action/yeqian3.png","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"writStr","valign":"middle","text":"写作","padding":"0,0,0,0","overflow":"scroll","name":"writStr","leading":10,"height":100,"fontSize":35,"font":"SimSun","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":38,"x":0,"width":516,"skin":"gameUI/action/shuye.png","height":803}},{"type":"Panel","props":{"y":160,"x":25,"width":460,"var":"holeGrid","name":"holeGrid","height":615}},{"type":"Panel","props":{"y":191,"x":35,"width":435,"var":"plotGrid","name":"plotGrid","height":525}},{"type":"Box","props":{"y":150,"x":35,"width":415,"var":"plotBox","name":"plotBox","height":30},"child":[{"type":"Label","props":{"x":20,"text":"元素","fontSize":30,"font":"SimHei","color":"#decfa3","bold":true}},{"type":"Label","props":{"x":170,"text":"热度","fontSize":30,"font":"SimHei","color":"#decfa3","bold":true}},{"type":"Label","props":{"x":320,"text":"适配度","fontSize":30,"font":"SimHei","color":"#decfa3","bold":true}}]},{"type":"Button","props":{"y":735,"x":135,"width":250,"var":"plotConffimBtn","stateNum":1,"skin":"gameUI/action/button.png","sizeGrid":"5,5,5,5","name":"plotConffimBtn","labelSize":23,"labelFont":"SimSun","labelColors":"#FEFBD8,#FEFBD8,#FEFBD8,#FEFBD8","labelBold":true,"labelAlign":"center","label":"确认选择","height":65}},{"type":"Label","props":{"y":80,"x":64,"var":"themeStr","text":"选择合适的剧情元素","name":"themeStr","fontSize":40,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":871,"x":491,"var":"backBtn","text":"返回","name":"backBtn","fontSize":40,"font":"SimHei","color":"#000000","bold":true}},{"type":"Box","props":{"y":73,"x":17,"width":473,"var":"writBox","name":"writBox","height":718},"child":[{"type":"Image","props":{"y":-4,"x":5,"width":167,"var":"authorIcon","name":"authorIcon","height":233}},{"type":"Image","props":{"y":253,"x":5,"width":460,"skin":"gameUI/action/ditu1.png","height":195}},{"type":"Image","props":{"y":460,"x":5,"width":460,"skin":"gameUI/action/ditu2.png","height":195,"sizeGrid":"30,30,30,30"}},{"type":"TextInput","props":{"y":30,"x":195,"wordWrap":false,"width":255,"var":"articalName","valign":"middle","overflow":"hidden","name":"articalName","maxChars":7,"height":35,"fontSize":35,"font":"SimHei","color":"#000000","bold":true,"align":"left"}},{"type":"Label","props":{"y":80,"x":195,"var":"authorName","name":"authorName","fontSize":25,"font":"SimHei","color":"#F8A057","bold":true}},{"type":"Label","props":{"y":125,"x":195,"width":255,"var":"articalTip","overflow":"hidden","name":"articalTip","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true,"alpha":0.6,"align":"left"}},{"type":"Label","props":{"y":170,"x":195,"width":255,"var":"labelTip","overflow":"hidden","name":"labelTip","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true,"alpha":0.6,"align":"left"}},{"type":"Label","props":{"y":125,"x":451,"width":40,"var":"ellipStr","text":"...","name":"ellipStr","height":25,"fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":169,"x":452,"var":"ellipStrTwo","text":"...","name":"ellipStrTwo","fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":270,"x":40,"text":"人设","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":315,"x":40,"text":"故事","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":360,"x":40,"text":"新意","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"Label","props":{"y":405,"x":40,"text":"深度","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":true,"alpha":0.7,"align":"center"}},{"type":"ProgressBar","props":{"y":270,"x":120,"width":300,"var":"peoMax","skin":"gameUI/action/twoprogress.png","name":"peoMax","height":25}},{"type":"ProgressBar","props":{"y":270,"x":120,"width":300,"var":"peoMin","skin":"gameUI/action/oneprogress.png","name":"peoMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":315,"x":120,"width":300,"var":"stoMax","skin":"gameUI/action/twoprogress.png","name":"stoMax","height":25}},{"type":"ProgressBar","props":{"y":315,"x":120,"width":300,"var":"stoMin","skin":"gameUI/action/oneprogress.png","name":"stoMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":360,"x":120,"width":300,"var":"newMax","skin":"gameUI/action/twoprogress.png","name":"newMax","height":25}},{"type":"ProgressBar","props":{"y":360,"x":120,"width":300,"var":"newMin","skin":"gameUI/action/oneprogress.png","name":"newMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":405,"x":120,"width":300,"var":"depMax","skin":"gameUI/action/twoprogress.png","name":"depMax","height":25}},{"type":"ProgressBar","props":{"y":405,"x":120,"width":300,"var":"depMin","skin":"gameUI/action/oneprogress.png","name":"depMin","height":25,"alpha":0.5}},{"type":"Label","props":{"y":270,"x":215,"var":"peoStr","name":"peoStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":315,"x":215,"var":"stoStr","name":"stoStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":360,"x":215,"var":"newStr","name":"newStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Label","props":{"y":405,"x":215,"var":"depStr","name":"depStr","fontSize":20,"font":"SimHei","color":"#3e3939","bold":true}},{"type":"Image","props":{"y":510,"x":80,"width":90,"var":"Iam","name":"Iam","height":130}},{"type":"Image","props":{"y":512,"x":275,"width":90,"var":"assiPeo","name":"assiPeo","height":130}},{"type":"Label","props":{"y":480,"x":5,"width":265,"var":"IamStr","overflow":"hidden","name":"IamStr","height":22,"fontSize":20,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":480,"x":202,"width":265,"var":"assiStr","overflow":"hidden","name":"assiStr","height":20,"fontSize":20,"font":"SimHei","color":"#80E081","bold":true,"align":"center"}},{"type":"Button","props":{"y":670,"x":119,"width":250,"var":"startWritingBtn","stateNum":2,"skin":"gameUI/action/button.png","sizeGrid":"5,5,5,5","name":"startWritingBtn","labelSize":30,"labelFont":"SimSun","labelColors":"#FFFCD8,#FFFCD8,#FFFCD8,#FFFCD8","labelBold":true,"labelAlign":"center","label":"开始写作","height":65}}]},{"type":"Box","props":{"y":63,"x":0,"width":495,"var":"friendBox","name":"friendBox","height":725},"child":[{"type":"Label","props":{"y":7,"x":27,"text":"你可以选择一位作者协助创作","fontSize":35,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":80,"x":20,"text":"签约作者","fontSize":35,"font":"SimSun","color":"#ffffff","bold":false}},{"type":"Label","props":{"y":400,"x":20,"text":"特约作者","fontSize":35,"font":"SimSun","color":"#ffffff","bold":false}},{"type":"Label","props":{"y":810,"x":491,"var":"backWritBtn","text":"返回","name":"backWritBtn","fontSize":40,"font":"SimHei","color":"#000000","bold":true}},{"type":"Image","props":{"y":140,"x":20,"width":470,"skin":"gameUI/common/writeBg.png","height":240}},{"type":"Image","props":{"y":460,"x":20,"width":470,"skin":"gameUI/common/writeBg.png","height":240}},{"type":"Panel","props":{"y":140,"x":20,"width":470,"var":"siginGrid","name":"siginGrid","height":240}},{"type":"Panel","props":{"y":460,"x":20,"width":470,"var":"contriGrid","name":"contriGrid","height":240}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.action.WritingUI.uiView);

        }

    }
}

module ui.common {
    export class ApartInfoTbUI extends View {
		public homenumber:Laya.Label;
		public regmoney:Laya.Label;
		public regtime:Laya.Label;
		public startgame:Laya.Button;
		public inputname:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":500},"child":[{"type":"Image","props":{"width":400,"skin":"gameUI/common/ditu5.png","height":500}},{"type":"Label","props":{"y":33,"x":125,"text":"公寓信息表","fontSize":30,"font":"SimHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":205,"x":60,"text":"公寓编号：","fontSize":25,"font":"SimHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":273,"x":60,"text":"注册资金：","fontSize":25,"font":"SimHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":329,"x":60,"text":"注册时间：","fontSize":25,"font":"SimHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":206,"x":195,"width":148,"var":"homenumber","text":"10000","name":"homenumber","height":25,"fontSize":25,"font":"SimHei","color":"#238432","bold":true,"align":"left"}},{"type":"Label","props":{"y":273,"x":195,"var":"regmoney","text":"10000000","name":"regmoney","fontSize":25,"font":"SimHei","color":"#238432","bold":true,"align":"left"}},{"type":"Label","props":{"y":328,"x":195,"var":"regtime","text":"2018/06/12","name":"regtime","fontSize":25,"font":"SimHei","color":"#238432","bold":true,"align":"left"}},{"type":"Button","props":{"y":393,"x":85,"width":236,"var":"startgame","skin":"gameUI/action/ditu2.png","name":"startgame","labelSize":30,"labelFont":"SimHei","labelColors":"#efe9e9","label":"开始游戏","height":56,"sizeGrid":"30,30,30,30"}},{"type":"TextInput","props":{"y":91,"x":97,"width":211,"var":"inputname","text":"输入公寓名称","skin":"comp/textinput.png","promptColor":"#191818","name":"inputname","height":34,"fontSize":25,"font":"SimSun","color":"#322b2b","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ApartInfoTbUI.uiView);

        }

    }
}

module ui.common {
    export class CircleProViewUI extends View {
		public cirImg:Laya.Image;
		public outCir:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":54,"height":54},"child":[{"type":"Image","props":{"width":54,"var":"cirImg","skin":"gameUI/action/quan2.png","name":"cirImg","height":54}},{"type":"Image","props":{"y":6.5,"x":6.5,"width":41,"skin":"gameUI/action/di.png","height":41}},{"type":"Box","props":{"width":54,"var":"outCir","renderType":"mask","name":"outCir","height":54},"child":[{"type":"Circle","props":{"y":27,"x":27,"radius":27,"lineWidth":1,"fillColor":"#ff0000"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.CircleProViewUI.uiView);

        }

    }
}

module ui.common {
    export class ConfirmCancelTipUIUI extends Dialog {
		public tipInfoBox:Laya.Box;
		public contentTxt:Laya.TextArea;
		public confirmBtn:Laya.Button;
		public cancelBtn:Laya.Button;
		public closeBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":425,"height":155},"child":[{"type":"Image","props":{"width":425,"skin":"gameUI/common/tipBg.png","height":155}},{"type":"Box","props":{"y":31,"x":27,"width":344,"var":"tipInfoBox","name":"tipInfoBox","height":59,"cacheAsBitmap":true},"child":[{"type":"TextArea","props":{"wordWrap":true,"width":344,"var":"contentTxt","valign":"middle","name":"contentTxt","height":59,"fontSize":20,"editable":false,"color":"#582f2e","cacheAs":"bitmap","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":120,"x":95,"width":93,"var":"confirmBtn","stateNum":1,"skin":"gameUI/common/btn_affirm.png","name":"confirmBtn","height":26}},{"type":"Button","props":{"y":120,"x":232,"width":93,"var":"cancelBtn","stateNum":1,"skin":"gameUI/common/btn_cancel.png","name":"cancelBtn","height":26}},{"type":"Button","props":{"y":20,"x":371,"width":34,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/closeBtnBg.png","name":"closeBtn","height":32}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ConfirmCancelTipUIUI.uiView);

        }

    }
}

module ui.common {
    export class detailUI extends View {
		public outBg:Laya.Image;
		public aportBtn:Laya.Box;
		public bgimage1:Laya.Image;
		public bgname1:Laya.Label;
		public worksBtn:Laya.Box;
		public bgimage2:Laya.Image;
		public bgname2:Laya.Label;
		public eventBtn:Laya.Box;
		public bgimage3:Laya.Image;
		public bgname3:Laya.Label;
		public bgimage:Laya.Image;
		public closeBtn:Laya.Label;
		public worksPanel:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":950},"child":[{"type":"Image","props":{"width":600,"var":"outBg","skin":"gameUI/action/holeBg.png","name":"outBg","height":950}},{"type":"Image","props":{"y":15,"x":0,"width":550,"skin":"gameUI/action/shupi.png","height":820}},{"type":"Box","props":{"y":109,"x":495,"var":"aportBtn","name":"aportBtn"},"child":[{"type":"Image","props":{"y":9,"x":0,"width":70,"var":"bgimage1","skin":"gameUI/action/yeqian1.png","name":"bgimage1","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"bgname1","valign":"middle","text":"公寓","padding":"0,0,0,0","overflow":"scroll","name":"bgname1","leading":10,"height":100,"fontSize":35,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":285,"x":495,"var":"worksBtn","name":"worksBtn"},"child":[{"type":"Image","props":{"width":70,"var":"bgimage2","skin":"gameUI/action/yeqian2.png","name":"bgimage2","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"bgname2","valign":"middle","text":"作品","padding":"0,0,0,0","overflow":"scroll","name":"bgname2","leading":10,"height":100,"fontSize":35,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":452,"x":495,"var":"eventBtn","name":"eventBtn"},"child":[{"type":"Image","props":{"width":70,"var":"bgimage3","skin":"gameUI/action/yeqian3.png","name":"bgimage3","height":160}},{"type":"Label","props":{"x":15,"wordWrap":true,"width":45,"var":"bgname3","valign":"middle","text":"事件","padding":"0,0,0,0","overflow":"scroll","name":"bgname3","leading":10,"height":100,"fontSize":35,"font":"SimHei","color":"#000000","centerY":0,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":38,"x":0,"width":516,"var":"bgimage","skin":"gameUI/action/shuye.png","name":"bgimage","height":803}},{"type":"Label","props":{"y":871,"x":491,"var":"closeBtn","text":"返回","name":"closeBtn","fontSize":40,"font":"SimHei","color":"#000000","bold":true}},{"type":"Panel","props":{"y":165,"x":46,"width":400,"var":"worksPanel","name":"worksPanel","height":611}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.detailUI.uiView);

        }

    }
}

module ui.common {
    export class detailInfoUI extends View {
		public apartnum:Laya.Label;
		public homenum:Laya.Label;
		public athor:Laya.Label;
		public worknum:Laya.Label;
		public awardnum:Laya.Label;
		public currmoney:Laya.Label;
		public awradtotal:Laya.Label;
		public fansnum:Laya.Label;
		public beintime:Laya.Label;
		public aportname:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":800},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"height":800}},{"type":"Image","props":{"y":327,"x":69,"width":379,"skin":"gameUI/common/ditu_house.png","height":382}},{"type":"Image","props":{"y":99,"x":159,"width":161,"skin":"gameUI/common/ditu_icon.png","height":201}},{"type":"Image","props":{"y":152,"x":205,"width":73,"skin":"gameUI/common/icon.png","height":84}},{"type":"Label","props":{"y":341,"x":94,"text":"公寓编号","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":341,"x":268,"var":"apartnum","name":"apartnum","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"left"}},{"type":"Label","props":{"y":378,"x":94,"text":"公寓层高","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":419,"x":94,"text":"签约作者","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":461,"x":94,"text":"作品数量","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":503,"x":94,"text":"获奖次数","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":545,"x":94,"text":"现有资金","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":585,"x":94,"text":"累计盈利","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":622,"x":94,"text":"粉丝数量","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":659,"x":94,"text":"运营时间","fontSize":25,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":378,"x":269,"var":"homenum","name":"homenum","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"left"}},{"type":"Label","props":{"y":419,"x":269,"var":"athor","name":"athor","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"left"}},{"type":"Label","props":{"y":461,"x":269,"var":"worknum","name":"worknum","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"left"}},{"type":"Label","props":{"y":503,"x":269,"var":"awardnum","name":"awardnum","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"right"}},{"type":"Label","props":{"y":545,"x":269,"var":"currmoney","name":"currmoney","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"right"}},{"type":"Label","props":{"y":585,"x":269,"var":"awradtotal","name":"awradtotal","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"right"}},{"type":"Label","props":{"y":622,"x":269,"var":"fansnum","name":"fansnum","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"right"}},{"type":"Label","props":{"y":659,"x":269,"var":"beintime","name":"beintime","fontSize":25,"font":"SimHei","color":"#517831","bold":true,"align":"right"}},{"type":"Label","props":{"y":258,"x":177,"var":"aportname","name":"aportname","fontSize":25,"font":"SimHei","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.detailInfoUI.uiView);

        }

    }
}

module ui.common {
    export class GuideStepUI extends View {
		public icon:Laya.Image;
		public guideName:Laya.Label;
		public guideStepLabel:Laya.TextArea;

        public static  uiView:any ={"type":"View","props":{"width":520,"mouseThrough":false,"mouseEnabled":false,"hitTestPrior":false,"height":240},"child":[{"type":"Image","props":{"y":32,"x":0,"width":522,"skin":"gameUI/common/talk.png","height":207}},{"type":"Image","props":{"y":-10,"x":0,"width":129,"var":"icon","skin":"gameUI/common/guidePeople.png","name":"icon","height":210}},{"type":"Label","props":{"y":28,"x":132,"var":"guideName","valign":"middle","name":"guideName","height":77,"fontSize":40,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"TextArea","props":{"y":99,"x":132,"width":380,"var":"guideStepLabel","overflow":"hidden","name":"guideStepLabel","hitTestPrior":false,"height":130,"fontSize":24,"font":"SimHei","editable":false,"disabled":true,"bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.GuideStepUI.uiView);

        }

    }
}

module ui.common {
    export class ListItemViewUI extends View {
		public listItemLabel:Laya.Label;
		public cost:Laya.Label;
		public singleItem:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":240,"height":45},"child":[{"type":"Label","props":{"y":0,"x":0,"width":120,"var":"listItemLabel","valign":"bottom","overflow":"visible","name":"listItemLabel","height":38,"fontSize":20,"font":"SimHei","color":"#5D5D5D","bold":true,"bgColor":"#ffffff","alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":0,"x":120,"width":120,"var":"cost","valign":"bottom","overflow":"visible","name":"cost","height":38,"fontSize":20,"font":"SimHei","color":"#7CDB94","bold":true,"bgColor":"#ffffff","alpha":0.5,"align":"center"}},{"type":"Label","props":{"width":240,"var":"singleItem","valign":"middle","name":"singleItem","height":38,"fontSize":30,"font":"SimHei","color":"#7CDB94","bold":true,"bgColor":"#ffffff","alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":42,"width":240,"height":2,"bgColor":"#5D5D5D","alpha":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.ListItemViewUI.uiView);

        }

    }
}

module ui.common {
    export class LoadingUI extends View {
		public progressBar:Laya.ProgressBar;
		public progressTxt:Laya.Label;
		public bar:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":950},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"gameUI/common/house.png","height":950}},{"type":"ProgressBar","props":{"y":834,"width":265,"var":"progressBar","value":1,"skin":"comp/progress.png","name":"progressBar","height":14,"centerX":0}},{"type":"Label","props":{"y":870,"var":"progressTxt","overflow":"visible","name":"progressTxt","fontSize":18,"font":"Helvetica","color":"#367390","centerX":0,"bold":false,"align":"center"}},{"type":"Image","props":{"y":834,"x":168,"width":20,"var":"bar","skin":"gameUI/AuthorData/green.png","sizeGrid":"0,189,0,29","name":"bar","height":14}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.LoadingUI.uiView);

        }

    }
}

module ui.common {
    export class LoginViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":1200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"gameUI/common/bg.png","height":1200}},{"type":"Image","props":{"y":55,"x":3,"width":595,"skin":"gameUI/common/pic.png","height":550}},{"type":"Image","props":{"y":540,"width":341,"skin":"gameUI/common/name.png","height":75,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.LoginViewUI.uiView);

        }

    }
}

module ui.common {
    export class MainViewUI extends View {
		public btn6:Laya.Button;
		public btn5:Laya.Button;
		public btn4:Laya.Button;
		public btn3:Laya.Button;
		public btn2:Laya.Button;
		public btn1:Laya.Button;
		public testBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":60,"height":420},"child":[{"type":"Button","props":{"width":60,"var":"btn6","stateNum":1,"skin":"gameUI/toolbar/book.png","name":"btn6","height":60}},{"type":"Button","props":{"y":60,"x":0,"width":60,"var":"btn5","stateNum":1,"skin":"gameUI/common/icon1.png","name":"btn5","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":120,"x":0,"width":60,"var":"btn4","stateNum":1,"skin":"gameUI/common/icon2.png","name":"btn4","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":180,"x":0,"width":60,"var":"btn3","stateNum":1,"skin":"gameUI/common/icon3.png","name":"btn3","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":240,"x":0,"width":60,"var":"btn2","stateNum":1,"skin":"gameUI/common/icon4.png","name":"btn2","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":300,"x":0,"width":60,"var":"btn1","stateNum":1,"skin":"gameUI/common/icon5.png","name":"btn1","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":360,"width":60,"var":"testBtn","skin":"comp/button.png","name":"testBtn","label":"测试专用","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.MainViewUI.uiView);

        }

    }
}

module ui.common {
    export class OpenJobSelUI extends View {
		public backBtn:Laya.Button;
		public onePeo:Laya.Box;
		public oneNum:Laya.Label;
		public oneMoney:Laya.Label;
		public twoPeo:Laya.Box;
		public twoNum:Laya.Label;
		public twoMoney:Laya.Label;
		public threePeo:Laya.Box;
		public threeNum:Laya.Label;
		public threeMoney:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":290},"child":[{"type":"Image","props":{"width":500,"skin":"gameUI/common/openJobBg.png","height":290}},{"type":"Image","props":{"y":45,"width":451,"skin":"gameUI/common/writeBg.png","height":231,"centerX":0}},{"type":"Label","props":{"y":9,"text":"夏季招聘会","fontSize":28,"font":"SimHei","color":"#8DB2A1","centerX":0,"bold":false,"align":"center"}},{"type":"Button","props":{"y":215,"width":183,"var":"backBtn","stateNum":1,"skin":"gameUI/action/ditu2.png","sizeGrid":"5,5,5,5","name":"backBtn","labelSize":30,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","label":"放弃招聘","height":50,"centerX":0}},{"type":"Box","props":{"y":65,"x":45,"var":"onePeo","name":"onePeo"},"child":[{"type":"Image","props":{"width":120,"skin":"gameUI/common/openJobSmallbg.png","height":100}},{"type":"Image","props":{"y":6,"x":22,"width":80,"skin":"gameUI/common/jianliICON.png","height":80}},{"type":"Label","props":{"y":67,"x":72,"var":"oneNum","name":"oneNum","fontSize":20,"font":"SimHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":112,"var":"oneMoney","text":"dadad","name":"oneMoney","fontSize":23,"font":"SimHei","centerX":0,"bold":false,"align":"center"}}]},{"type":"Box","props":{"y":65,"x":188,"var":"twoPeo","name":"twoPeo"},"child":[{"type":"Image","props":{"width":120,"skin":"gameUI/common/openJobSmallbg.png","height":100}},{"type":"Image","props":{"y":6,"x":22,"width":80,"skin":"gameUI/common/jianliICON.png","height":80}},{"type":"Label","props":{"y":67,"x":72,"var":"twoNum","name":"twoNum","fontSize":20,"font":"SimHei","color":"#000000","bold":false,"align":"center"}},{"type":"Label","props":{"y":112,"var":"twoMoney","name":"twoMoney","fontSize":23,"font":"SimHei","centerX":0,"bold":false,"align":"center"}}]},{"type":"Box","props":{"y":65,"x":330,"var":"threePeo","name":"threePeo"},"child":[{"type":"Image","props":{"width":120,"skin":"gameUI/common/openJobSmallbg.png","height":100}},{"type":"Image","props":{"y":6,"x":22,"width":80,"skin":"gameUI/common/jianliICON.png","height":80}},{"type":"Label","props":{"y":67,"x":72,"var":"threeNum","name":"threeNum","fontSize":20,"font":"SimHei","color":"#000000","bold":false,"align":"center"}},{"type":"Label","props":{"y":112,"var":"threeMoney","name":"threeMoney","fontSize":23,"font":"SimHei","centerX":0,"bold":false,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.OpenJobSelUI.uiView);

        }

    }
}

module ui.common {
    export class paymentUI extends View {
		public confirmBtn:Laya.Button;
		public tittle:Laya.Label;
		public nianxin:Laya.Label;
		public tipInfoBox2:Laya.Label;
		public tipInfoBox:Laya.Label;
		public daikuan:Laya.Label;
		public wenbentittle:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":550,"skin":"gameUI/AuthorData/base.png","height":400,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":55,"x":36,"width":480,"skin":"gameUI/AuthorData/baseD.png","height":280,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":63,"x":48,"width":455,"skin":"gameUI/common/writeBg.png","renderType":"render","name":"loanbtn","height":256}},{"type":"Button","props":{"y":341,"x":197,"width":140,"var":"confirmBtn","stateNum":1,"skin":"gameUI/common/buttonA.png","sizeGrid":"5,5,5,5","name":"confirmBtn","labelSize":30,"labelFont":"SimSun","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"确认","height":40}},{"type":"Label","props":{"y":16,"x":224,"var":"tittle","text":"支出","renderType":"render","name":"tittle","fontSize":35,"font":"SimHei","color":"#fbf6f6","align":"center"}},{"type":"Label","props":{"y":183,"x":175,"var":"nianxin","text":"年薪：","renderType":"render","name":"nianxin","fontSize":25,"font":"SimHei","bold":true,"align":"left"}},{"type":"Label","props":{"y":236,"x":300,"var":"tipInfoBox2","renderType":"render","name":"tipInfoBox2","fontSize":25,"color":"#42824a","align":"left"}},{"type":"Label","props":{"y":183,"x":300,"var":"tipInfoBox","renderType":"render","name":"tipInfoBox","fontSize":25,"color":"#517c34","align":"left"}},{"type":"Label","props":{"y":236,"x":175,"var":"daikuan","text":"贷款：","renderType":"render","name":"daikuan","fontSize":25,"font":"SimHei","bold":true,"align":"left"}},{"type":"Label","props":{"y":126,"x":131,"var":"wenbentittle","text":"您今天一共需要支付：","renderType":"render","name":"wenbentittle","fontSize":28,"font":"SimHei","color":"#0e0f0e","bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.paymentUI.uiView);

        }

    }
}

module ui.common {
    export class PreIconViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":54,"height":45},"child":[{"type":"Image","props":{"width":54,"skin":"gameUI/action/qipao.png","height":45}},{"type":"Image","props":{"y":8,"width":25,"skin":"gameUI/action/face.png","height":25,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.PreIconViewUI.uiView);

        }

    }
}

module ui.common {
    export class TimeBackUI extends View {
		public year:Laya.TextInput;
		public month:Laya.TextInput;
		public day:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":55},"child":[{"type":"TextInput","props":{"y":0,"x":0,"width":119,"var":"year","valign":"middle","text":"2001","skin":"comp/textinput.png","name":"year","height":55,"fontSize":48,"editable":false,"align":"center"}},{"type":"Label","props":{"y":24,"x":118,"text":"——--"}},{"type":"TextInput","props":{"y":0,"x":144,"width":63,"var":"month","valign":"middle","text":"01","skin":"comp/textinput.png","name":"month","height":55,"fontSize":46,"editable":false,"align":"left"}},{"type":"Label","props":{"y":24,"x":208,"text":"——--"}},{"type":"TextInput","props":{"x":238,"width":60,"var":"day","text":"01","skin":"comp/textinput.png","name":"day","height":55,"fontSize":46,"editable":false}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.TimeBackUI.uiView);

        }

    }
}

module ui.common {
    export class WritingTriggerUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":150,"height":140},"child":[{"type":"Image","props":{"x":0,"width":150,"skin":"gameUI/common/dengpao.png","height":140}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.WritingTriggerUI.uiView);

        }

    }
}

module ui.dialog {
    export class ChangeDataUI extends View {
		public moneyStr:Laya.TextInput;
		public holeStr:Laya.TextInput;
		public fansStr:Laya.TextInput;
		public conBtn:Laya.Button;
		public cancleBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":300},"child":[{"type":"Image","props":{"width":500,"skin":"gameUI/AuthorData/baseD.png","height":300,"sizeGrid":"14,8,14,8"}},{"type":"Label","props":{"y":32,"text":"修改游戏数据","fontSize":25,"font":"SimSun","color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Label","props":{"y":78,"x":135,"text":"金钱","fontSize":25,"font":"SimSun","bold":true,"align":"center"}},{"type":"Label","props":{"y":126,"x":135,"text":"脑洞","fontSize":25,"font":"SimSun","bold":true,"align":"center"}},{"type":"Label","props":{"y":174,"x":135,"text":"粉丝","fontSize":25,"font":"SimSun","bold":true,"align":"center"}},{"type":"TextInput","props":{"y":78,"x":300,"var":"moneyStr","skin":"comp/textinput.png","name":"moneyStr","fontSize":25,"font":"SimSun","bold":true}},{"type":"TextInput","props":{"y":126,"x":300,"var":"holeStr","skin":"comp/textinput.png","name":"holeStr","fontSize":25,"font":"SimSun","bold":true}},{"type":"TextInput","props":{"y":174,"x":300,"var":"fansStr","skin":"comp/textinput.png","name":"fansStr","fontSize":25,"font":"SimSun","bold":true}},{"type":"Button","props":{"y":235,"x":135,"width":105,"var":"conBtn","skin":"comp/button.png","name":"conBtn","label":"确认","height":35}},{"type":"Button","props":{"y":235,"x":300,"width":105,"var":"cancleBtn","skin":"comp/button.png","name":"cancleBtn","label":"取消","height":35}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ChangeDataUI.uiView);

        }

    }
}

module ui.dialog {
    export class CheckEleItemUI extends View {
		public titleText:Laya.Label;
		public typeText:Laya.Label;
		public typeIcon:Laya.Image;
		public gridContainer:Laya.Panel;
		public payCost:Laya.Label;
		public bootomIcon:Laya.Image;
		public confirmBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":381,"height":533},"child":[{"type":"Image","props":{"y":4,"x":0,"width":381,"skin":"gameUI/AuthorData/base.png","height":533,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":73,"x":0,"width":328,"skin":"gameUI/AuthorData/baseD.png","height":444,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Label","props":{"y":31,"x":0,"var":"titleText","overflow":"hidden","name":"titleText","fontSize":30,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Box","props":{"y":96,"centerX":0},"child":[{"type":"Label","props":{"y":5,"x":53,"var":"typeText","name":"typeText","fontSize":23,"font":"SimHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":34,"width":240,"height":3,"color":"#5D5D5D","bgColor":"#5D5D5D","alpha":0.8}},{"type":"Image","props":{"y":3,"x":167,"width":15,"var":"typeIcon","name":"typeIcon","height":25}}]},{"type":"Panel","props":{"y":148,"width":240,"var":"gridContainer","name":"gridContainer","height":248,"centerX":0}},{"type":"Label","props":{"y":405,"x":95,"var":"payCost","name":"payCost","fontSize":15,"font":"SimHei","color":"#5D5D5D","bold":true}},{"type":"Image","props":{"y":401,"x":251,"width":13,"var":"bootomIcon","name":"bootomIcon","height":22}},{"type":"Button","props":{"y":445,"x":131,"width":128,"var":"confirmBtn","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"confirmBtn","labelSize":18,"labelPadding":"5,5,5,5","labelFont":"SimSun","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"确认选择","height":37}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.CheckEleItemUI.uiView);

        }

    }
}

module ui.dialog {
    export class CheckItemUI extends View {
		public titleText:Laya.Label;
		public gridContainer:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":381,"height":533},"child":[{"type":"Image","props":{"y":4,"x":0,"width":381,"skin":"gameUI/AuthorData/base.png","height":533,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":73,"x":0,"width":328,"skin":"gameUI/AuthorData/baseD.png","height":444,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Label","props":{"y":31,"x":0,"var":"titleText","overflow":"hidden","name":"titleText","fontSize":30,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"Panel","props":{"y":88,"width":240,"var":"gridContainer","name":"gridContainer","height":406,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.CheckItemUI.uiView);

        }

    }
}

module ui.dialog {
    export class ComTableDialogUI extends View {
		public BtnBox:Laya.Box;
		public buildHomeBtn:Laya.Button;
		public recruBtn:Laya.Button;
		public storageBtn:Laya.Button;
		public sessionBtn:Laya.Button;
		public authorTrainBtn:Laya.Button;
		public recruBtn2:Laya.Button;
		public storageBtn2:Laya.Button;
		public sessionBtn2:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":230},"child":[{"type":"Image","props":{"width":500,"skin":"gameUI/event/historyBg.png","height":230}},{"type":"Label","props":{"y":5,"x":179,"text":"公共事务","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":50,"width":435,"skin":"gameUI/event/historyLabelBg.png","height":160,"centerX":0}},{"type":"Box","props":{"y":50,"width":435,"var":"BtnBox","name":"BtnBox","height":160,"centerX":0},"child":[{"type":"Button","props":{"y":10,"x":16,"width":80,"var":"buildHomeBtn","stateNum":1,"skin":"gameUI/toolbar/house.png","name":"buildHomeBtn","height":66}},{"type":"Button","props":{"y":10,"x":124,"width":80,"var":"recruBtn","stateNum":1,"skin":"gameUI/toolbar/writerIcon.png","name":"recruBtn","height":66}},{"type":"Button","props":{"y":10,"x":232,"width":80,"var":"storageBtn","stateNum":1,"skin":"gameUI/toolbar/book.png","name":"storageBtn","height":66}},{"type":"Button","props":{"y":10,"x":340,"width":80,"var":"sessionBtn","stateNum":1,"skin":"gameUI/toolbar/messageIcon.png","name":"sessionBtn","height":66}},{"type":"Button","props":{"y":85,"x":16,"width":80,"var":"authorTrainBtn","stateNum":1,"skin":"gameUI/toolbar/house.png","name":"authorTrainBtn","height":66}},{"type":"Button","props":{"y":85,"x":124,"width":80,"var":"recruBtn2","stateNum":1,"skin":"gameUI/toolbar/writerIcon.png","name":"recruBtn2","height":66}},{"type":"Button","props":{"y":85,"x":232,"width":80,"var":"storageBtn2","stateNum":1,"skin":"gameUI/toolbar/book.png","name":"storageBtn2","height":66}},{"type":"Button","props":{"y":85,"x":340,"width":80,"var":"sessionBtn2","stateNum":1,"skin":"gameUI/toolbar/messageIcon.png","name":"sessionBtn2","height":66}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.ComTableDialogUI.uiView);

        }

    }
}

module ui.dialog {
    export class PerfectDialogViewUI extends View {
		public perfectStr:Laya.TextArea;

        public static  uiView:any ={"type":"View","props":{"width":450,"height":300},"child":[{"type":"Image","props":{"width":450,"skin":"gameUI/common/tips.png","height":300}},{"type":"TextArea","props":{"y":55,"x":68,"wordWrap":true,"width":371,"var":"perfectStr","rotation":3,"name":"perfectStr","mouseEnabled":false,"leading":7,"hitTestPrior":false,"height":211,"fontSize":20,"font":"SimHei","editable":false,"color":"#000000","bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.PerfectDialogViewUI.uiView);

        }

    }
}

module ui.dialog {
    export class SelectItemUI extends View {
		public listItemLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":240,"height":45},"child":[{"type":"Label","props":{"y":0,"x":0,"width":240,"var":"listItemLabel","valign":"bottom","overflow":"visible","name":"listItemLabel","height":38,"fontSize":20,"font":"SimHei","color":"#5D5D5D","bold":true,"bgColor":"#ffffff","alpha":0.5,"align":"center"}},{"type":"Label","props":{"y":42,"width":240,"height":2,"bgColor":"#5D5D5D","alpha":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialog.SelectItemUI.uiView);

        }

    }
}

module ui.event {
    export class AchiListUI extends View {
		public bgimage:Laya.Image;
		public m_quest:Laya.Label;
		public m_name:Laya.Label;
		public m_comtime:Laya.Label;
		public m_icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":430,"height":120},"child":[{"type":"Image","props":{"width":430,"var":"bgimage","skin":"gameUI/event/cj_none.png","renderType":"render","name":"bgimage","height":120}},{"type":"Label","props":{"y":88,"x":160,"width":250,"var":"m_quest","text":"wewddwdw","renderType":"render","name":"m_quest","height":22,"fontSize":16,"color":"#141111"}},{"type":"Label","props":{"y":30,"x":160,"width":122,"var":"m_name","text":"wewddwdw","renderType":"render","name":"m_name","height":22,"fontSize":16}},{"type":"Label","props":{"y":30,"x":272,"width":148,"var":"m_comtime","text":"wewddwdw","renderType":"render","name":"m_comtime","height":22}},{"type":"Image","props":{"y":28,"x":15,"width":88,"var":"m_icon","skin":"gameUI/event/historyBg.png","renderType":"render","name":"m_icon","height":77}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.AchiListUI.uiView);

        }

    }
}

module ui.event {
    export class AchiPopUI extends View {
		public bgimage:Laya.Image;
		public m_quest:Laya.Label;
		public m_name:Laya.Label;
		public m_comtime:Laya.Label;
		public m_icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":430,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":430,"var":"bgimage","skin":"gameUI/event/cj_none.png","renderType":"render","name":"bgimage","height":120}},{"type":"Label","props":{"y":98,"x":170,"width":250,"var":"m_quest","text":"wewddwdw","renderType":"render","name":"m_quest","height":22,"fontSize":16,"color":"#141111"}},{"type":"Label","props":{"y":40,"x":170,"width":122,"var":"m_name","text":"wewddwdw","renderType":"render","name":"m_name","height":22,"fontSize":16}},{"type":"Label","props":{"y":40,"x":282,"width":148,"var":"m_comtime","text":"wewddwdw","renderType":"render","name":"m_comtime","height":22}},{"type":"Image","props":{"y":38,"x":25,"width":88,"var":"m_icon","skin":"gameUI/event/historyBg.png","renderType":"render","name":"m_icon","height":77}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.AchiPopUI.uiView);

        }

    }
}

module ui.event {
    export class AchiveViewUI extends View {
		public closeBtn:Laya.Button;
		public achiimage:Laya.Image;
		public pointTip:Laya.Label;
		public talentBtn:Laya.Button;
		public avchiBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":800},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":800,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":23,"width":523,"skin":"gameUI/AuthorData/writer_yellow.png","height":62}},{"type":"Button","props":{"y":21,"x":469,"width":66,"var":"closeBtn","stateNum":1,"skin":"gameUI/AuthorData/closeButton.png","name":"closeBtn","height":66}},{"type":"Image","props":{"y":165,"width":508,"var":"achiimage","skin":"gameUI/AuthorData/baseD.png","name":"achiimage","height":613,"centerX":-1,"sizeGrid":"14,8,14,8"}},{"type":"Label","props":{"y":31,"x":35,"width":158,"valign":"middle","text":"成就系统","height":41,"fontSize":38,"font":"SimSun","color":"#695757","bold":true,"align":"center"}},{"type":"Label","props":{"y":138,"x":358,"var":"pointTip","name":"pointTip","fontSize":20,"font":"SimSun","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":118,"x":27,"width":140,"var":"talentBtn","stateNum":1,"sizeGrid":"5,5,5,5","name":"talentBtn","labelSize":30,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"天赋","height":50}},{"type":"Button","props":{"y":118,"x":167,"width":140,"var":"avchiBtn","stateNum":1,"sizeGrid":"5,5,5,5","name":"avchiBtn","labelSize":30,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"成就","height":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.AchiveViewUI.uiView);

        }

    }
}

module ui.event {
    export class LoanUI extends View {
		public Determine:Laya.Button;
		public giveup:Laya.Button;
		public tittle:Laya.Label;
		public loanlabel:Laya.Label;
		public full:Laya.Label;
		public loanbtn:Laya.Image;
		public fullbtn:Laya.Image;
		public shoufu:Laya.Label;
		public ninahuan:Laya.Label;
		public qixina:Laya.Label;
		public zongji:Laya.Label;
		public loanlabel4:Laya.Label;
		public loanlabel3:Laya.Label;
		public loanlabel2:Laya.Label;
		public loanlabel1:Laya.Label;
		public full4:Laya.Label;
		public full3:Laya.Label;
		public full2:Laya.Label;
		public full1:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":550},"child":[{"type":"Image","props":{"y":0,"x":0,"width":550,"skin":"gameUI/AuthorData/base.png","height":550,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":71,"x":33,"width":489,"skin":"gameUI/AuthorData/baseE.png","height":406}},{"type":"Image","props":{"y":81,"x":44,"width":466,"skin":"gameUI/common/writeBg.png","renderType":"render","name":"loanbtn","height":379}},{"type":"Button","props":{"y":484,"x":91,"width":140,"var":"Determine","stateNum":1,"skin":"gameUI/common/buttonA.png","sizeGrid":"5,5,5,5","rotation":0,"name":"Determine","labelSize":22,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"施工","height":40}},{"type":"Button","props":{"y":484,"x":298,"width":140,"var":"giveup","stateNum":1,"skin":"gameUI/common/buttonB.png","sizeGrid":"5,5,5,5","name":"giveup","labelSize":22,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"放弃","height":40}},{"type":"Label","props":{"y":21,"x":186,"var":"tittle","text":"加盖楼层","rotation":0,"renderType":"render","name":"tittle","fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":98,"x":80,"var":"loanlabel","text":"贷款","renderType":"render","name":"loanlabel","fontSize":35,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Label","props":{"y":98,"x":348,"var":"full","text":"全款","renderType":"render","name":"full","fontSize":35,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Image","props":{"y":149,"x":56,"width":160,"var":"loanbtn","skin":"gameUI/AuthorData/loan.png","renderType":"render","name":"loanbtn","height":300}},{"type":"Image","props":{"y":149,"x":339,"width":160,"var":"fullbtn","skin":"gameUI/AuthorData/loan.png","renderType":"render","name":"fullbtn","height":300}},{"type":"Label","props":{"y":160,"x":246,"var":"shoufu","text":"首付","renderType":"render","name":"shoufu","fontSize":30,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Label","props":{"y":220,"x":246,"var":"ninahuan","text":"年还","renderType":"render","name":"ninahuan","fontSize":30,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Label","props":{"y":280,"x":246,"var":"qixina","text":"期限","renderType":"render","name":"qixina","fontSize":30,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Label","props":{"y":340,"x":246,"var":"zongji","text":"总计","renderType":"render","name":"zongji","fontSize":30,"font":"SimHei","color":"#5B5B5B","bold":true,"align":"center"}},{"type":"Label","props":{"y":340,"x":80,"var":"loanlabel4","text":"1000000","renderType":"render","name":"loanlabel4","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":280,"x":80,"var":"loanlabel3","text":"10 年","renderType":"render","name":"loanlabel3","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":220,"x":80,"var":"loanlabel2","text":"1000000","renderType":"render","name":"loanlabel2","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":160,"x":80,"var":"loanlabel1","text":"1000000","renderType":"render","name":"loanlabel1","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":340,"x":351,"var":"full4","text":"1000000","renderType":"render","name":"full4","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":280,"x":348,"var":"full3","text":"0 年","renderType":"render","name":"full3","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":220,"x":348,"var":"full2","text":"1000000","renderType":"render","name":"full2","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":160,"x":348,"var":"full1","text":"1000000","renderType":"render","name":"full1","fontSize":25,"font":"SimHei","color":"#afe5af","bold":true,"align":"left"}},{"type":"Label","props":{"y":149,"x":229,"width":5,"height":300,"color":"#554d4d","bgColor":"#554d4d","alpha":0.3}},{"type":"Label","props":{"y":149,"x":320,"width":5,"height":300,"color":"#554d4d","bgColor":"#554d4d","alpha":0.3}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.LoanUI.uiView);

        }

    }
}

module ui.event {
    export class TalentChildViewUI extends View {
		public coffinBtn:Laya.Button;
		public resetBtn:Laya.Button;
		public coBox1:Laya.Box;
		public img1:Laya.Image;
		public lb1:Laya.Label;
		public coBox2:Laya.Box;
		public img2:Laya.Image;
		public lb2:Laya.Label;
		public coBox3:Laya.Box;
		public img3:Laya.Image;
		public lb3:Laya.Label;
		public coBox4:Laya.Box;
		public img4:Laya.Image;
		public lb4:Laya.Label;
		public coBox5:Laya.Box;
		public img5:Laya.Image;
		public lb5:Laya.Label;
		public coBox6:Laya.Box;
		public img6:Laya.Image;
		public lb6:Laya.Label;
		public coBox7:Laya.Box;
		public img7:Laya.Image;
		public lb7:Laya.Label;
		public coBox8:Laya.Box;
		public img8:Laya.Image;
		public lb8:Laya.Label;
		public coBox9:Laya.Box;
		public img9:Laya.Image;
		public lb9:Laya.Label;
		public coBox10:Laya.Box;
		public img10:Laya.Image;
		public lb10:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":410,"height":535},"child":[{"type":"Image","props":{"y":17,"x":0,"width":410,"skin":"gameUI/event/tianfu.png","height":425}},{"type":"Button","props":{"y":467,"x":60,"width":130,"var":"coffinBtn","stateNum":2,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"coffinBtn","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"确认","height":55}},{"type":"Button","props":{"y":467,"x":220,"width":132,"var":"resetBtn","stateNum":1,"skin":"gameUI/AuthorData/buttonB.png","sizeGrid":"5,5,5,5","name":"resetBtn","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"重置","height":55}},{"type":"Box","props":{"y":24,"x":165,"width":75,"var":"coBox1","name":"coBox1","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img1","name":"img1","height":75}},{"type":"Label","props":{"y":60,"x":46,"var":"lb1","text":"0/3","name":"lb1","fontSize":15,"font":"SimSun","bold":true}}]},{"type":"Box","props":{"y":134,"x":62,"width":75,"var":"coBox2","name":"coBox2","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img2","name":"img2","height":75}},{"type":"Label","props":{"y":60,"x":48,"var":"lb2","text":"0/3","name":"lb2","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":134,"x":273,"width":75,"var":"coBox3","name":"coBox3","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img3","name":"img3","height":75}},{"type":"Label","props":{"y":60,"x":48,"var":"lb3","text":"0/3","name":"lb3","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":243,"x":6,"width":75,"var":"coBox4","name":"coBox4","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img4","name":"img4","height":75}},{"type":"Label","props":{"y":57,"x":48,"var":"lb4","text":"0/3","name":"lb4","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":243,"x":113,"width":75,"var":"coBox5","name":"coBox5","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img5","name":"img5","height":75}},{"type":"Label","props":{"y":57,"x":49,"var":"lb5","text":"0/3","name":"lb5","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":243,"x":221,"width":75,"var":"coBox6","name":"coBox6","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img6","name":"img6","height":75}},{"type":"Label","props":{"y":57,"x":48,"var":"lb6","text":"0/3","name":"lb6","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":243,"x":328,"width":75,"var":"coBox7","name":"coBox7","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img7","name":"img7","height":75}},{"type":"Label","props":{"y":57,"x":49,"var":"lb7","text":"0/3","name":"lb7","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":360,"x":62,"width":75,"var":"coBox8","name":"coBox8","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img8","name":"img8","height":75}},{"type":"Label","props":{"y":60,"x":48,"var":"lb8","text":"0/1","name":"lb8","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":360,"x":166,"width":75,"var":"coBox9","name":"coBox9","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img9","name":"img9","height":75}},{"type":"Label","props":{"y":60,"x":49,"var":"lb9","text":"0/1","name":"lb9","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":360,"x":272,"width":75,"var":"coBox10","name":"coBox10","height":75},"child":[{"type":"Image","props":{"width":75,"var":"img10","name":"img10","height":75}},{"type":"Label","props":{"y":60,"x":48,"var":"lb10","text":"0/1","name":"lb10","fontSize":15,"font":"SimSun","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.TalentChildViewUI.uiView);

        }

    }
}

module ui.event {
    export class TipAddUI extends View {
		public tipText:Laya.TextArea;
		public delTle:Laya.Button;
		public addTle:Laya.Button;
		public pointNum:Laya.Label;
		public frilyTip:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":350,"height":150},"child":[{"type":"Image","props":{"width":350,"skin":"gameUI/event/black.png","height":150,"alpha":0.8}},{"type":"Label","props":{"y":8,"text":"逻辑思维","fontSize":33,"font":"SimSun","color":"#ffffff","centerX":0,"bold":true,"align":"center"}},{"type":"TextArea","props":{"y":53,"width":305,"var":"tipText","type":"text","name":"tipText","multiline":true,"mouseThrough":false,"mouseEnabled":false,"hitTestPrior":false,"height":56,"fontSize":20,"font":"SimSun","editable":false,"color":"#ffffff","centerX":0,"cacheAs":"bitmap","bold":false,"align":"left"}},{"type":"Button","props":{"y":100,"x":65,"width":69,"var":"delTle","stateNum":1,"skin":"gameUI/event/button_minus.png","name":"delTle","height":43}},{"type":"Button","props":{"y":100,"x":210,"width":69,"var":"addTle","stateNum":1,"skin":"gameUI/event/button_plus.png","name":"addTle","height":43}},{"type":"Label","props":{"y":115,"x":0,"var":"pointNum","text":"1/3","name":"pointNum","fontSize":20,"font":"SimSun","color":"#ffffff","centerX":0,"bold":true}},{"type":"Label","props":{"y":110,"width":215,"var":"frilyTip","valign":"middle","text":"需要精通上层天赋才可升级","name":"frilyTip","height":30,"fontSize":15,"font":"SimSun","color":"#BF810D","centerX":0,"cacheAs":"bitmap","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.TipAddUI.uiView);

        }

    }
}

module ui.event {
    export class TriggerEventUI extends View {
		public triggerBg:Laya.Image;
		public newsLabel:Laya.TextArea;
		public paperLabel:Laya.TextArea;
		public getBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":-1,"x":-1,"width":450,"height":450},"child":[{"type":"Image","props":{"width":450,"var":"triggerBg","name":"triggerBg","height":395}},{"type":"TextArea","props":{"y":120,"x":68,"width":346,"var":"newsLabel","type":"text","rotation":18,"name":"newsLabel","mouseThrough":false,"mouseEnabled":false,"leading":5,"hitTestPrior":false,"height":160,"fontSize":20,"font":"Microsoft YaHei","editable":false,"color":"#000000","bold":true,"alpha":0.7}},{"type":"TextArea","props":{"y":108,"x":35,"width":366,"var":"paperLabel","overflow":"hidden","name":"paperLabel","mouseThrough":false,"mouseEnabled":false,"leading":5,"hitTestPrior":false,"height":248,"fontSize":18,"font":"Microsoft YaHei","editable":false,"color":"#000000","bold":true,"alpha":0.7,"align":"left"}},{"type":"Button","props":{"y":410,"x":153,"width":130,"var":"getBtn","skin":"gameUI/common/buttonA.png","sizeGrid":"5,5,5,5","name":"getBtn","labelSize":18,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":false,"labelAlign":"center","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.TriggerEventUI.uiView);

        }

    }
}

module ui.event {
    export class WorksClickUI extends View {
		public subname:Laya.Label;
		public elename:Laya.Label;
		public platname:Laya.Label;
		public totalsubname1:Laya.Label;
		public incomename1:Laya.Label;
		public collectname:Laya.Label;
		public totalsubname:Laya.Label;
		public incomename:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":350,"height":150},"child":[{"type":"Image","props":{"width":350,"skin":"gameUI/common/writeBg.png","height":150}},{"type":"Label","props":{"y":18,"x":23,"text":"题材：","name":"workname","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":61,"x":23,"text":"元素：","name":"workname","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":101,"x":23,"text":"平台：","name":"workname","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":18,"x":84,"var":"subname","text":"奇幻","name":"subname","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}},{"type":"Label","props":{"y":61,"x":84,"var":"elename","text":"盗墓","name":"elename","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}},{"type":"Label","props":{"y":101,"x":84,"var":"platname","text":"起点","name":"platname","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}},{"type":"Label","props":{"y":18,"x":179,"text":"收藏：","name":"workname","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":61,"x":179,"var":"totalsubname1","text":"订阅：","name":"totalsubname1","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":101,"x":179,"var":"incomename1","text":"收入：","name":"incomename1","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":18,"x":255,"var":"collectname","text":"99999","name":"collectname","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}},{"type":"Label","props":{"y":61,"x":255,"var":"totalsubname","text":"999999","name":"totalsubname","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}},{"type":"Label","props":{"y":101,"x":255,"var":"incomename","text":"999999","name":"incomename","fontSize":18,"font":"SimHei","color":"#9eefbb","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.WorksClickUI.uiView);

        }

    }
}

module ui.event {
    export class WorksListUI extends View {
		public bg1:Laya.Image;
		public workname:Laya.Label;
		public authorname:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":70},"child":[{"type":"Image","props":{"width":400,"var":"bg1","skin":"gameUI/action/ditu3.png","name":"bg1","height":70}},{"type":"Label","props":{"y":24,"x":21,"var":"workname","text":"作品名字七个字","name":"workname","fontSize":20,"font":"SimHei","bold":true}},{"type":"Label","props":{"y":24,"x":208,"var":"authorname","text":"笔名五个字","name":"authorname","fontSize":20,"font":"SimHei","color":"#c86562","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.event.WorksListUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorDialogUI extends Dialog {
		public closeBtn:Laya.Image;
		public authorIcon:Laya.Image;
		public passionMax:Laya.ProgressBar;
		public passionMin:Laya.ProgressBar;
		public precisenessMax:Laya.ProgressBar;
		public precisenessMin:Laya.ProgressBar;
		public disciplineMax:Laya.ProgressBar;
		public disciplineMin:Laya.ProgressBar;
		public curiousMax:Laya.ProgressBar;
		public curiousMin:Laya.ProgressBar;
		public theme:Laya.Label;
		public element:Laya.Label;
		public characteristic:Laya.Label;
		public salary:Laya.Label;
		public term:Laya.Label;
		public dividedInto:Laya.Label;
		public damages:Laya.Label;
		public nameStr:Laya.Label;
		public Btn1:Laya.Button;
		public Btn2:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":550,"height":800},"child":[{"type":"Image","props":{"y":0,"width":550,"skin":"gameUI/AuthorData/base.png","height":800,"centerX":0,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":25,"width":523,"skin":"gameUI/AuthorData/writer_yellow.png","height":62}},{"type":"Image","props":{"y":21,"x":469,"width":66,"var":"closeBtn","skin":"gameUI/AuthorData/closeButton.png","name":"closeBtn","height":66}},{"type":"Image","props":{"y":94,"width":489,"skin":"gameUI/AuthorData/baseB.png","height":488,"centerX":0}},{"type":"Image","props":{"y":597,"width":489,"skin":"gameUI/AuthorData/baseC.png","height":130,"centerX":0}},{"type":"Image","props":{"y":166,"x":48,"width":149,"var":"authorIcon","name":"authorIcon","height":223}},{"type":"Label","props":{"y":34,"x":23,"text":"畅销作者","fontSize":38,"color":"#695757","bold":true}},{"type":"Label","props":{"y":431,"x":75,"text":"擅长题材","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":476,"x":75,"text":"擅长元素","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":540,"x":76,"text":"作者特性","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":180,"x":230,"text":"文笔","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":230,"x":230,"text":"构思","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":285,"x":230,"text":"阅历","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":335,"x":230,"text":"脑洞","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":605,"text":"合同","fontSize":30,"font":"Arial","color":"#454545","centerX":-5,"bold":true}},{"type":"Label","props":{"y":636,"x":62,"width":16,"valign":"middle","text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true,"align":"center"}},{"type":"Label","props":{"y":651,"x":77,"width":56,"text":"年薪","height":23,"fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":676,"x":62,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":691,"x":77,"text":"期限","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":636,"x":286,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":651,"x":306,"text":"作者分成","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":676,"x":286,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":691,"x":306,"text":"违约金","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"ProgressBar","props":{"y":183,"x":290,"width":158,"visible":true,"var":"passionMax","skin":"comp/progress.png","name":"passionMax","height":25}},{"type":"ProgressBar","props":{"y":183,"x":290,"width":158,"var":"passionMin","skin":"gameUI/AuthorData/progress.png","name":"passionMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":230,"x":290,"width":158,"visible":true,"var":"precisenessMax","skin":"comp/progress.png","name":"precisenessMax","height":25}},{"type":"ProgressBar","props":{"y":230,"x":290,"width":158,"var":"precisenessMin","skin":"gameUI/AuthorData/progress.png","name":"precisenessMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":285,"x":290,"width":158,"visible":true,"var":"disciplineMax","skin":"comp/progress.png","name":"disciplineMax","height":25}},{"type":"ProgressBar","props":{"y":285,"x":290,"width":158,"var":"disciplineMin","skin":"gameUI/AuthorData/progress.png","name":"disciplineMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":335,"x":290,"width":158,"visible":true,"var":"curiousMax","skin":"comp/progress.png","name":"curiousMax","height":25}},{"type":"ProgressBar","props":{"y":335,"x":290,"width":158,"var":"curiousMin","skin":"gameUI/AuthorData/progress.png","name":"curiousMin","height":25,"alpha":0.5}},{"type":"Label","props":{"y":431,"x":208,"var":"theme","name":"theme","fontSize":25,"font":"SimSun","color":"#826f6f","bold":true}},{"type":"Label","props":{"y":476,"x":208,"var":"element","name":"element","fontSize":25,"font":"SimSun","color":"#826f6f","bold":true}},{"type":"Label","props":{"y":540,"x":212,"var":"characteristic","name":"characteristic","fontSize":25,"font":"SimSun","color":"#826f6f","bold":true}},{"type":"Label","props":{"y":651,"x":142,"var":"salary","name":"salary","fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":691,"x":142,"var":"term","name":"term","fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":651,"x":426,"width":73,"var":"dividedInto","name":"dividedInto","height":28,"fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":691,"x":426,"width":70,"var":"damages","overflow":"scroll","name":"damages","height":25,"fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":110,"visible":true,"var":"nameStr","valign":"middle","overflow":"scroll","name":"nameStr","fontSize":30,"font":"SimSun","color":"#4f4b4b","centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":735,"x":89,"width":125,"var":"Btn1","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"Btn1","mouseThrough":true,"mouseEnabled":true,"labelSize":25,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"立即签约","height":40}},{"type":"Button","props":{"y":735,"x":325,"width":125,"var":"Btn2","stateNum":1,"skin":"gameUI/AuthorData/buttonB.png","sizeGrid":"5,5,5,5","name":"Btn2","mouseThrough":true,"mouseEnabled":true,"labelSize":25,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"下一个","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorDialogUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorIconItemUI extends View {
		public iconBg:Laya.Image;
		public selectBg:Laya.Image;
		public icon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":104,"height":104},"child":[{"type":"Image","props":{"y":10,"width":104,"var":"iconBg","skin":"gameUI/AuthorData/q_01.png","name":"iconBg","height":94}},{"type":"Image","props":{"y":10,"width":104,"var":"selectBg","name":"selectBg","height":94}},{"type":"Image","props":{"y":0,"width":78,"var":"icon","skin":"gameUI/AuthorData/icon.png","name":"icon","height":105,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorIconItemUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorJobDialogUI extends View {
		public closeBtn:Laya.Button;
		public recyclePro:Laya.ProgressBar;
		public madeAuthor:Laya.Button;
		public AuthorListPanel:Laya.Panel;
		public hasBox:Laya.Box;
		public job1:Laya.Image;
		public job2:Laya.Image;
		public job3:Laya.Image;
		public job4:Laya.Image;
		public lineOne:Laya.Image;
		public lineTwo:Laya.Image;
		public lineThree:Laya.Image;
		public lowNum:Laya.Label;
		public nullBox:Laya.Box;
		public dayNum:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":800},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":800,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":25,"x":0,"width":523,"skin":"gameUI/AuthorData/writer_yellow.png","height":62}},{"type":"Button","props":{"y":21,"x":469,"width":66,"var":"closeBtn","stateNum":1,"skin":"gameUI/AuthorData/closeButton.png","name":"closeBtn","height":66}},{"type":"Label","props":{"y":35,"x":25,"text":"招聘","fontSize":38,"color":"#695757","bold":true}},{"type":"Image","props":{"y":98,"width":493,"skin":"gameUI/AuthorData/baseD.png","height":677,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"ProgressBar","props":{"y":140,"x":60,"width":282,"var":"recyclePro","skin":"gameUI/AuthorData/progress.png","name":"recyclePro","height":35,"alpha":0.3}},{"type":"Button","props":{"y":140,"x":363,"width":127,"var":"madeAuthor","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5,","name":"madeAuthor","labelSize":20,"labelFont":"SimSun","labelColors":"#3b3535,#3b3535,#3b3535,#3b3535","labelBold":true,"labelAlign":"center","label":"定制作者","height":35}},{"type":"Image","props":{"y":200,"width":431,"skin":"gameUI/common/writeBg.png","height":408,"centerX":0}},{"type":"Panel","props":{"y":200,"width":431,"var":"AuthorListPanel","name":"AuthorListPanel","height":408,"centerX":0}},{"type":"Box","props":{"y":622,"x":88,"var":"hasBox","name":"hasBox"},"child":[{"type":"Image","props":{"y":15,"width":61,"var":"job1","skin":"gameUI/AuthorData/job1_brit.png","name":"job1","height":62}},{"type":"Image","props":{"y":15,"x":105,"width":61,"var":"job2","skin":"gameUI/AuthorData/job2_brit.png","name":"job2","height":62}},{"type":"Image","props":{"y":15,"x":207,"width":61,"var":"job3","skin":"gameUI/AuthorData/job3_brit.png","name":"job3","height":62}},{"type":"Image","props":{"y":15,"x":309,"width":61,"var":"job4","skin":"gameUI/AuthorData/job4_brit.png","name":"job4","height":62}},{"type":"Image","props":{"y":69,"x":58,"width":55,"var":"lineOne","skin":"gameUI/AuthorData/arrow_blue.png","name":"lineOne","height":23}},{"type":"Image","props":{"x":157,"width":55,"var":"lineTwo","skin":"gameUI/AuthorData/arrow_purple.png","name":"lineTwo","height":23}},{"type":"Image","props":{"y":69,"x":261,"width":55,"var":"lineThree","skin":"gameUI/AuthorData/arrow_orange.png","name":"lineThree","height":23}},{"type":"Label","props":{"y":98,"x":-88,"var":"lowNum","name":"lowNum","fontSize":30,"font":"SimHei","color":"#3b3535","centerX":0,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":637,"x":56,"var":"nullBox","name":"nullBox"},"child":[{"type":"Label","props":{"x":55,"text":"距下次招聘会还有","fontSize":40,"font":"SimSun","color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":57,"x":166,"var":"dayNum","text":"365天","name":"dayNum","fontSize":40,"font":"Helvetica","color":"#000000","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":147,"x":140,"text":"点击一键回收","fontSize":20,"font":"SimSun","color":"#626b61","bold":true,"alpha":0.6}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorJobDialogUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorJobIconItemUI extends View {
		public playerBg:Laya.Image;
		public playerIcon:Laya.Image;
		public authorName:Laya.Label;
		public delAuthor:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":100,"height":126},"child":[{"type":"Image","props":{"y":20,"width":85,"var":"playerBg","name":"playerBg","height":85,"centerX":-3}},{"type":"Image","props":{"y":0,"width":77,"var":"playerIcon","name":"playerIcon","height":112,"centerX":-5}},{"type":"Label","props":{"y":107,"var":"authorName","name":"authorName","fontSize":20,"font":"SimSun","color":"#000000","centerX":0,"bold":true}},{"type":"Button","props":{"y":13,"x":73,"width":14,"var":"delAuthor","stateNum":1,"skin":"gameUI/AuthorData/authorDel.png","name":"delAuthor","height":13}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorJobIconItemUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorJobSingleViewUI extends Dialog {
		public closeBtn:Laya.Image;
		public authorIcon:Laya.Image;
		public characteristic:Laya.Label;
		public passionMin:Laya.ProgressBar;
		public precisenessMin:Laya.ProgressBar;
		public disciplineMin:Laya.ProgressBar;
		public curiousMin:Laya.ProgressBar;
		public passStr:Laya.Label;
		public preStr:Laya.Label;
		public disStr:Laya.Label;
		public curStr:Laya.Label;
		public salary:Laya.Label;
		public term:Laya.Label;
		public dividedInto:Laya.Label;
		public damages:Laya.Label;
		public nameStr:Laya.Label;
		public Btn1:Laya.Button;
		public Btn2:Laya.Button;
		public gridContainer:Laya.Panel;

        public static  uiView:any ={"type":"Dialog","props":{"width":550,"height":800},"child":[{"type":"Image","props":{"y":0,"width":550,"skin":"gameUI/AuthorData/base.png","height":800,"centerX":0,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":25,"width":523,"skin":"gameUI/AuthorData/writer_yellow.png","height":62}},{"type":"Image","props":{"y":21,"x":469,"width":66,"var":"closeBtn","skin":"gameUI/AuthorData/closeButton.png","name":"closeBtn","height":66}},{"type":"Image","props":{"y":91,"width":498,"skin":"gameUI/AuthorData/baseD.png","height":382,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":479,"width":498,"skin":"gameUI/AuthorData/baseD.png","height":189,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":666,"width":498,"skin":"gameUI/AuthorData/baseD.png","height":121,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":166,"x":57,"width":158,"var":"authorIcon","name":"authorIcon","height":234}},{"type":"Label","props":{"y":150,"width":440,"height":3,"centerX":0,"bgColor":"#000000","alpha":0.2}},{"type":"Label","props":{"y":34,"x":23,"text":"作者简历","fontSize":38,"color":"#695757","bold":true}},{"type":"Label","props":{"y":180,"x":252,"text":"文笔","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":247,"x":250,"text":"构思","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":311,"x":248,"text":"阅历","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":366,"x":248,"text":"脑洞","fontSize":25,"font":"SimSun","color":"#706868","bold":true}},{"type":"Label","props":{"y":407,"width":440,"height":3,"centerX":0,"bgColor":"#000000","alpha":0.2}},{"type":"Label","props":{"y":422,"x":60,"text":"特性：","fontSize":25,"font":"SimSun","color":"#706868","bold":true,"align":"center"}},{"type":"Label","props":{"y":422,"x":144,"var":"characteristic","name":"characteristic","fontSize":25,"font":"SimSun","color":"#826f6f","bold":true,"align":"center"}},{"type":"Label","props":{"y":491,"text":"合同","fontSize":30,"font":"Arial","color":"#454545","centerX":2,"bold":true}},{"type":"ProgressBar","props":{"y":183,"x":312,"width":158,"var":"passionMin","skin":"gameUI/AuthorData/progress.png","name":"passionMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":247,"x":310,"width":158,"var":"precisenessMin","skin":"gameUI/AuthorData/progress.png","name":"precisenessMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":307,"x":308,"width":158,"var":"disciplineMin","skin":"gameUI/AuthorData/progress.png","name":"disciplineMin","height":25,"alpha":0.5}},{"type":"ProgressBar","props":{"y":361,"x":308,"width":158,"var":"curiousMin","skin":"gameUI/AuthorData/progress.png","name":"curiousMin","height":25,"alpha":0.5}},{"type":"Label","props":{"y":188,"x":358,"var":"passStr","name":"passStr","fontSize":18,"font":"SimHei","color":"#000000","bold":true,"alpha":0.8}},{"type":"Label","props":{"y":252,"x":356,"var":"preStr","name":"preStr","fontSize":18,"font":"SimHei","color":"#000000","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":311,"x":354,"var":"disStr","name":"disStr","fontSize":18,"font":"SimHei","color":"#000000","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":366,"x":354,"var":"curStr","name":"curStr","fontSize":18,"font":"SimHei","color":"#000000","bold":true,"alpha":0.8,"align":"center"}},{"type":"Label","props":{"y":530,"x":146,"var":"salary","name":"salary","fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":565,"x":146,"var":"term","name":"term","fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":531,"x":430,"width":73,"var":"dividedInto","name":"dividedInto","height":28,"fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":567,"x":430,"width":70,"var":"damages","overflow":"scroll","name":"damages","height":25,"fontSize":25,"font":"SimSun","color":"#605858","bold":true}},{"type":"Label","props":{"y":110,"width":0,"visible":true,"var":"nameStr","valign":"middle","overflow":"scroll","name":"nameStr","height":0,"fontSize":30,"font":"SimSun","centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":608,"x":100,"width":125,"var":"Btn1","stateNum":1,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"Btn1","mouseThrough":true,"mouseEnabled":true,"labelSize":25,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"立即签约","height":40}},{"type":"Button","props":{"y":608,"x":335,"width":125,"var":"Btn2","stateNum":1,"skin":"gameUI/AuthorData/buttonB.png","sizeGrid":"5,5,5,5","name":"Btn2","mouseThrough":true,"mouseEnabled":true,"labelSize":25,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","label":"回收简历","height":40}},{"type":"Box","props":{"y":518,"width":444,"centerX":0},"child":[{"type":"Label","props":{"width":16,"valign":"middle","text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true,"align":"center"}},{"type":"Label","props":{"y":13,"x":25,"width":56,"text":"年薪","height":23,"fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":35,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":48,"x":25,"text":"期限","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":0,"x":239,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":13,"x":261,"text":"作者分成","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":35,"x":239,"width":16,"text":".","height":32,"fontSize":35,"font":"SimHei","color":"#605858","bold":true}},{"type":"Label","props":{"y":48,"x":261,"text":"违约金","fontSize":25,"font":"SimSun","color":"#4f4b4b","bold":true}},{"type":"Label","props":{"y":7,"width":3,"height":70,"centerX":2,"bgColor":"#000000","alpha":0.2}}]},{"type":"Panel","props":{"y":666,"width":444,"var":"gridContainer","name":"gridContainer","height":108,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorJobSingleViewUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorStateInfoUI extends View {
		public TopBg:Laya.Image;
		public iconBg:Laya.Image;
		public bgBig:Laya.Image;
		public bgTop:Laya.Image;
		public bgBottom:Laya.Image;
		public iconSkin:Laya.Image;
		public nameStr:Laya.Label;
		public statusName:Laya.Label;
		public progressValue:Laya.ProgressBar;
		public pageName:Laya.Label;
		public orangePoint:Laya.Image;
		public collecLabel:Laya.Label;
		public yellowPoint:Laya.Image;
		public subsLabel:Laya.Label;
		public bluePoint:Laya.Image;
		public fansLabel:Laya.Label;
		public smallBg1:Laya.Image;
		public smallBg2:Laya.Image;
		public smallName:Laya.Label;
		public smallStatus:Laya.Label;
		public smallPage:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":220},"child":[{"type":"Image","props":{"y":15,"x":0,"width":600,"var":"TopBg","skin":"gameUI/common/writeBg.png","name":"TopBg","height":205}},{"type":"Image","props":{"y":26,"x":9,"var":"iconBg","skin":"gameUI/AuthorData/grid2.png","name":"iconBg"}},{"type":"Image","props":{"y":26,"x":179,"width":411,"var":"bgBig","skin":"gameUI/AuthorData/grid.png","name":"bgBig","height":189}},{"type":"Image","props":{"y":26,"x":179,"width":411,"var":"bgTop","skin":"gameUI/AuthorData/grid3.png","name":"bgTop"}},{"type":"Image","props":{"y":88,"x":179,"width":411,"var":"bgBottom","skin":"gameUI/AuthorData/grid4.png","name":"bgBottom","height":127}},{"type":"Image","props":{"y":15,"x":21,"width":126,"var":"iconSkin","name":"iconSkin","mouseThrough":true,"mouseEnabled":true,"hitTestPrior":true,"height":174}},{"type":"Label","props":{"y":174,"x":10,"width":156,"var":"nameStr","valign":"middle","name":"nameStr","height":28,"fontSize":25,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":75,"x":323,"width":112,"var":"statusName","valign":"middle","name":"statusName","height":32,"fontSize":30,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"ProgressBar","props":{"y":154,"x":197,"width":376,"var":"progressValue","skin":"gameUI/common/progress.png","name":"progressValue","height":25}},{"type":"Label","props":{"y":43,"x":179,"var":"pageName","valign":"middle","name":"pageName","fontSize":20,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":41,"x":376,"width":26,"var":"orangePoint","skin":"gameUI/common/orange.png","name":"orangePoint","height":26}},{"type":"Label","props":{"y":46,"x":396,"var":"collecLabel","text":"收藏","name":"collecLabel","fontSize":15,"font":"SimSun","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":43,"x":439,"width":20,"var":"yellowPoint","skin":"gameUI/common/yellow.png","name":"yellowPoint","height":20}},{"type":"Label","props":{"y":46,"x":455,"var":"subsLabel","valign":"middle","text":"订阅","name":"subsLabel","fontSize":15,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":37,"x":495,"var":"bluePoint","skin":"gameUI/common/blue.png","name":"bluePoint"}},{"type":"Label","props":{"y":46,"x":520,"var":"fansLabel","valign":"middle","text":"收入","name":"fansLabel","fontSize":15,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":180,"width":600,"var":"smallBg1","skin":"gameUI/event/historyCloseBtn.png","name":"smallBg1","height":40}},{"type":"Image","props":{"y":184,"width":580,"var":"smallBg2","skin":"gameUI/AuthorData/grid3.png","name":"smallBg2","height":33,"centerX":0}},{"type":"Label","props":{"y":184,"x":40,"var":"smallName","valign":"middle","text":"今何在","name":"smallName","height":33,"fontSize":25,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":184,"x":170,"var":"smallStatus","valign":"middle","text":"更新中","name":"smallStatus","height":33,"fontSize":25,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":184,"x":290,"var":"smallPage","valign":"middle","text":"作品：《美人如玉月如虹》","name":"smallPage","height":33,"fontSize":25,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorStateInfoUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorTrainUI extends View {
		public closeBtn:Laya.Button;
		public AuthorName:Laya.Label;
		public icon:Laya.Image;
		public passion:Laya.ProgressBar;
		public preciseness:Laya.ProgressBar;
		public discipline:Laya.ProgressBar;
		public curious:Laya.ProgressBar;
		public passAddAtr:Laya.Label;
		public preAddStr:Laya.Label;
		public disAddStr:Laya.Label;
		public curAddStr:Laya.Label;
		public day7:Laya.Image;
		public day6:Laya.Image;
		public day5:Laya.Image;
		public day4:Laya.Image;
		public day3:Laya.Image;
		public day2:Laya.Image;
		public day1:Laya.Image;
		public trainPanel:Laya.Panel;
		public authorPanel:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":800},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":800,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":25,"x":0,"width":523,"skin":"gameUI/AuthorData/writer_yellow.png","height":62}},{"type":"Button","props":{"y":21,"x":469,"width":66,"var":"closeBtn","stateNum":1,"skin":"gameUI/AuthorData/closeButton.png","name":"closeBtn","height":66}},{"type":"Image","props":{"y":91,"width":499,"skin":"gameUI/AuthorData/baseD.png","height":381,"centerX":1,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":470,"width":499,"skin":"gameUI/AuthorData/baseD.png","height":193,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Label","props":{"y":35,"x":25,"text":"培养","fontSize":38,"color":"#695757","bold":true}},{"type":"Label","props":{"y":117,"visible":true,"var":"AuthorName","valign":"middle","overflow":"scroll","name":"AuthorName","fontSize":30,"font":"SimSun","color":"#756d6d","centerX":-24,"cacheAs":"bitmap","bold":true,"align":"center"}},{"type":"Label","props":{"y":156,"width":450,"height":5,"color":"#000000","centerX":1,"bgColor":"#000000","alpha":0.2}},{"type":"Label","props":{"y":397,"width":450,"height":3,"color":"#000000","centerX":5,"bgColor":"#000000","alpha":0.2}},{"type":"Image","props":{"y":660,"width":499,"skin":"gameUI/AuthorData/baseD.png","height":121,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":176,"x":67,"width":140,"skin":"gameUI/AuthorData/select.png","height":207}},{"type":"Image","props":{"y":186,"x":74,"width":125,"var":"icon","name":"icon","height":186}},{"type":"Label","props":{"y":193,"x":248,"text":"文笔","fontSize":25,"font":"SimSun","color":"#3b3535","bold":true}},{"type":"Label","props":{"y":243,"x":248,"text":"构思","fontSize":25,"font":"SimSun","color":"#3b3535","bold":true,"align":"center"}},{"type":"Label","props":{"y":292,"x":248,"text":"阅历","fontSize":25,"font":"SimSun","color":"#3b3535","bold":true,"align":"center"}},{"type":"Label","props":{"y":343,"x":248,"text":"脑洞","fontSize":25,"font":"SimSun","color":"#3b3535","bold":true,"align":"center"}},{"type":"ProgressBar","props":{"y":193,"x":307,"width":135,"var":"passion","skin":"gameUI/AuthorData/progress.png","name":"passion","height":25}},{"type":"ProgressBar","props":{"y":243,"x":307,"width":135,"var":"preciseness","skin":"gameUI/AuthorData/progress.png","name":"preciseness","height":25}},{"type":"ProgressBar","props":{"y":292,"x":307,"width":135,"var":"discipline","skin":"gameUI/AuthorData/progress.png","name":"discipline","height":25}},{"type":"ProgressBar","props":{"y":343,"x":307,"width":135,"var":"curious","skin":"gameUI/AuthorData/progress.png","name":"curious","height":25}},{"type":"Label","props":{"y":193,"x":448,"var":"passAddAtr","name":"passAddAtr","fontSize":20,"font":"SimHei","color":"#00B400","bold":true}},{"type":"Label","props":{"y":243,"x":448,"var":"preAddStr","name":"preAddStr","fontSize":20,"font":"SimHei","color":"#00B400","bold":true,"align":"center"}},{"type":"Label","props":{"y":292,"x":448,"var":"disAddStr","name":"disAddStr","fontSize":20,"font":"SimHei","color":"#00B400","bold":true,"align":"center"}},{"type":"Label","props":{"y":343,"x":448,"var":"curAddStr","name":"curAddStr","fontSize":20,"font":"SimHei","color":"#00B400","bold":true,"align":"center"}},{"type":"Label","props":{"y":411,"x":67,"text":"年假:","fontSize":30,"font":"SimSun","color":"#3b3535","bold":true,"align":"center"}},{"type":"Image","props":{"y":414,"x":150,"width":24,"var":"day7","name":"day7","height":24}},{"type":"Image","props":{"y":414,"x":190,"width":24,"var":"day6","name":"day6","height":24}},{"type":"Image","props":{"y":414,"x":230,"width":24,"var":"day5","name":"day5","height":24}},{"type":"Image","props":{"y":414,"x":270,"width":24,"var":"day4","name":"day4","height":24}},{"type":"Image","props":{"y":414,"x":310,"width":24,"var":"day3","name":"day3","height":24}},{"type":"Image","props":{"y":414,"x":350,"width":24,"var":"day2","name":"day2","height":24}},{"type":"Image","props":{"y":414,"x":390,"width":24,"var":"day1","name":"day1","height":24}},{"type":"Label","props":{"y":488,"x":71,"text":"项目","fontSize":25,"font":"SimHei","color":"#3b3535","bold":true}},{"type":"Label","props":{"y":488,"x":202,"text":"花费","fontSize":25,"font":"SimHei","color":"#3b3535","bold":true,"align":"center"}},{"type":"Label","props":{"y":488,"x":335,"text":"时间","fontSize":25,"font":"SimHei","color":"#3b3535","bold":true,"align":"center"}},{"type":"Panel","props":{"y":520,"width":450,"var":"trainPanel","name":"trainPanel","height":119,"centerX":1}},{"type":"Panel","props":{"y":661,"width":444,"var":"authorPanel","name":"authorPanel","height":108,"centerX":1}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorTrainUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorTrainItemUI extends View {
		public bigBg:Laya.Image;
		public proName:Laya.Label;
		public costNum:Laya.Label;
		public time1:Laya.Image;
		public time2:Laya.Image;
		public time3:Laya.Image;
		public time4:Laya.Image;
		public time5:Laya.Image;
		public ProAc:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":450,"height":40},"child":[{"type":"Image","props":{"width":450,"var":"bigBg","skin":"gameUI/common/writeBg.png","name":"bigBg","height":40}},{"type":"Label","props":{"y":9,"x":20,"var":"proName","valign":"middle","name":"proName","fontSize":25,"font":"SimHei","color":"#585656","bold":true}},{"type":"Label","props":{"y":9,"x":156,"var":"costNum","valign":"middle","name":"costNum","fontSize":25,"font":"SimHei","color":"#585656","bold":true}},{"type":"Image","props":{"x":283,"width":24,"var":"time1","name":"time1","height":24,"centerY":0}},{"type":"Image","props":{"x":316,"width":24,"var":"time2","name":"time2","height":24,"centerY":0}},{"type":"Image","props":{"x":352,"width":24,"var":"time3","name":"time3","height":24,"centerY":0}},{"type":"Image","props":{"x":386,"width":24,"var":"time4","name":"time4","height":24,"centerY":0}},{"type":"Image","props":{"x":418,"width":24,"var":"time5","name":"time5","height":24,"centerY":0}},{"type":"ProgressBar","props":{"width":450,"var":"ProAc","skin":"gameUI/AuthorData/progress.png","name":"ProAc","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorTrainItemUI.uiView);

        }

    }
}

module ui.player {
    export class AuthorWritingUI extends View {
		public closeBtn:Laya.Button;
		public gridContainer:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":550,"height":600},"child":[{"type":"Image","props":{"width":550,"skin":"gameUI/AuthorData/base.png","height":600,"sizeGrid":"5,2,5,2"}},{"type":"Image","props":{"y":80,"width":506,"skin":"gameUI/AuthorData/baseD.png","height":491,"centerX":0,"sizeGrid":"14,8,14,8"}},{"type":"Image","props":{"y":94,"width":464,"skin":"gameUI/common/writeBg.png","height":455,"centerX":0}},{"type":"Label","props":{"y":32,"x":206,"text":"选择作者","overflow":"hidden","fontSize":32,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":20,"x":480,"width":47,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/close.png","name":"closeBtn","mouseThrough":true,"mouseEnabled":true,"height":47}},{"type":"Panel","props":{"y":115,"width":420,"var":"gridContainer","name":"gridContainer","height":420,"centerX":-1}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.AuthorWritingUI.uiView);

        }

    }
}

module ui.player {
    export class BtnViewUI extends View {
		public Btn1:Laya.Button;
		public Btn2:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":240,"height":42},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Button","props":{"width":110,"var":"Btn1","stateNum":2,"skin":"gameUI/AuthorData/buttonA.png","sizeGrid":"5,5,5,5","name":"Btn1","labelSize":14,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":42}},{"type":"Button","props":{"y":0,"x":130,"width":110,"var":"Btn2","stateNum":2,"skin":"gameUI/AuthorData/buttonB.png","sizeGrid":"5,5,5,5","name":"Btn2","labelSize":14,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":42}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.player.BtnViewUI.uiView);

        }

    }
}

module ui.toolBar {
    export class BottomToolBarUI extends View {
		public btn6:Laya.Button;
		public btn5:Laya.Button;
		public btn4:Laya.Button;
		public btn3:Laya.Button;
		public btn2:Laya.Button;
		public btn1:Laya.Button;
		public testBtn:Laya.Button;
		public apartBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":60,"height":480},"child":[{"type":"Button","props":{"width":60,"var":"btn6","stateNum":1,"skin":"gameUI/toolbar/book.png","name":"btn6","height":60}},{"type":"Button","props":{"y":60,"x":0,"width":60,"var":"btn5","stateNum":1,"skin":"gameUI/common/icon1.png","name":"btn5","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":120,"x":0,"width":60,"var":"btn4","stateNum":1,"skin":"gameUI/common/icon2.png","name":"btn4","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":180,"x":0,"width":60,"var":"btn3","stateNum":1,"skin":"gameUI/common/icon3.png","name":"btn3","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":240,"x":0,"width":60,"var":"btn2","stateNum":1,"skin":"gameUI/common/icon4.png","name":"btn2","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":300,"x":0,"width":60,"var":"btn1","stateNum":1,"skin":"gameUI/common/icon5.png","name":"btn1","labelSize":20,"labelFont":"SimSun","labelBold":true,"labelAlign":"center","height":60}},{"type":"Button","props":{"y":360,"width":60,"var":"testBtn","skin":"comp/button.png","name":"testBtn","label":"测试专用","height":60}},{"type":"Button","props":{"y":420,"x":0,"width":60,"var":"apartBtn","skin":"comp/button.png","name":"apartBtn","label":"作家公寓","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.toolBar.BottomToolBarUI.uiView);

        }

    }
}

module ui.toolBar {
    export class LeftToolBarUI extends View {
		public bookIcon:Laya.Image;
		public proVue:Laya.ProgressBar;
		public pageName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":120,"height":100},"child":[{"type":"Image","props":{"y":0,"width":61,"var":"bookIcon","skin":"gameUI/toolbar/leftBook.png","name":"bookIcon","height":76,"centerX":0}},{"type":"ProgressBar","props":{"y":75,"width":120,"var":"proVue","value":0,"skin":"gameUI/AuthorData/progress.png","name":"proVue","height":20,"centerX":0}},{"type":"Label","props":{"y":75,"width":120,"var":"pageName","valign":"middle","overflow":"hidden","name":"pageName","height":20,"fontSize":20,"font":"SimHei","color":"#000000","bold":true,"alpha":0.5,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.toolBar.LeftToolBarUI.uiView);

        }

    }
}

module ui.toolBar {
    export class LoginToolBarUI extends View {
		public phoneLogin:Laya.Button;
		public fastGame:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":254,"height":165},"child":[{"type":"Button","props":{"width":254,"var":"phoneLogin","stateNum":2,"skin":"gameUI/common/buttonA.png","name":"phoneLogin","labelSize":30,"labelFont":"SimSun","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"手机登录","height":75,"centerX":0}},{"type":"Button","props":{"y":90,"width":254,"var":"fastGame","stateNum":2,"skin":"gameUI/common/buttonA.png","name":"fastGame","labelSize":30,"labelFont":"SimSun","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"快速游戏","height":75,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.toolBar.LoginToolBarUI.uiView);

        }

    }
}

module ui.toolBar {
    export class PhoneLoginUI extends View {
		public phoneNum:Laya.TextInput;
		public code:Laya.TextInput;
		public sendCode:Laya.Button;
		public startGameBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":254,"height":140},"child":[{"type":"TextInput","props":{"width":254,"var":"phoneNum","skin":"gameUI/common/inputB.png","promptColor":"#ffffff","prompt":"请输入手机号","name":"phoneNum","height":40,"fontSize":18,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"TextInput","props":{"y":49,"width":122,"var":"code","skin":"gameUI/common/inputB.png","promptColor":"#ffffff","prompt":"验证码","name":"code","height":40,"fontSize":25,"font":"SimSun","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":49,"x":133,"width":122,"var":"sendCode","stateNum":2,"skin":"gameUI/common/buttonA.png","sizeGrid":"5,5,5,5","name":"sendCode","labelFont":"SimSun","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"获取验证码","height":40}},{"type":"Button","props":{"y":97,"width":254,"var":"startGameBtn","stateNum":2,"skin":"gameUI/common/buttonA.png","sizeGrid":"5,5,5,5,","name":"startGameBtn","labelSize":18,"labelFont":"SimSun","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"进入游戏","height":40,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.toolBar.PhoneLoginUI.uiView);

        }

    }
}

module ui.toolBar {
    export class TopToolBarUI extends View {
		public bg:Laya.Image;
		public money:Laya.Label;
		public brainHole:Laya.Label;
		public fans:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":46},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"var":"bg","skin":"gameUI/common/batten.png","name":"bg","height":46}},{"type":"Image","props":{"y":0,"x":0,"skin":"gameUI/toolbar/money.png"}},{"type":"Label","props":{"y":12,"x":69,"var":"money","valign":"middle","name":"money","fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Image","props":{"y":0,"x":220,"skin":"gameUI/toolbar/idea.png"}},{"type":"Label","props":{"y":12,"x":260,"var":"brainHole","name":"brainHole","fontSize":25,"font":"SimHei","color":"#000000","bold":true}},{"type":"Image","props":{"y":4,"x":417,"skin":"gameUI/toolbar/fans.png"}},{"type":"Label","props":{"y":12,"x":480,"var":"fans","name":"fans","fontSize":25,"font":"SimHei","color":"#000000","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.toolBar.TopToolBarUI.uiView);

        }

    }
}
