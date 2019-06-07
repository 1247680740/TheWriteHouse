namespace configs {
    
    /** 新写作系统的相关数据*/    
    export class WritingConfig {

        /** 大纲阶段可以选择的灵感对象 */
        static enableHoleArr:Array<Object>;

        /** 可选剧情是否激活 */
        static actPlotArr:Array<string> = [];

        /** 激活剧情集合 */
        static actPlotObjArr:Array<Object> = [];

        /** 圆形进度条每次加数 */
        static proAddNum:number = 9;

        /** 圆形进度条几秒加度数 */
        static proAddTime:number = 50;

        /** 语言库 */
        static peoLangue:Array<string> = ["要着重衣服的描写","这里还需要修改一下","如果我是他就会这么做","一笔带过一笔带过"];
        static stoLangue:Array<string> = ["预设的伏笔差点又忘了","原来如此","我之前为什么要这么写？","不行不行，这里不行"];
        static newLangue:Array<string> = ["我有一个不错的想法","哈哈，没想到吧","这次应该不会撞梗了","是我想要的效果了"];
        static depLangue:Array<string> = ["是讽刺还是歌颂？","原来还可以这样写","小说只是我的一种表达方式","这样会不会有人看不懂"];

    }
}