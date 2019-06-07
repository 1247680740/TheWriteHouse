var configs;
(function (configs) {
    /** 新写作系统的相关数据*/
    var WritingConfig = /** @class */ (function () {
        function WritingConfig() {
        }
        /** 可选剧情是否激活 */
        WritingConfig.actPlotArr = [];
        /** 激活剧情集合 */
        WritingConfig.actPlotObjArr = [];
        /** 圆形进度条每次加数 */
        WritingConfig.proAddNum = 9;
        /** 圆形进度条几秒加度数 */
        WritingConfig.proAddTime = 50;
        /** 语言库 */
        WritingConfig.peoLangue = ["要着重衣服的描写", "这里还需要修改一下", "如果我是他就会这么做", "一笔带过一笔带过"];
        WritingConfig.stoLangue = ["预设的伏笔差点又忘了", "原来如此", "我之前为什么要这么写？", "不行不行，这里不行"];
        WritingConfig.newLangue = ["我有一个不错的想法", "哈哈，没想到吧", "这次应该不会撞梗了", "是我想要的效果了"];
        WritingConfig.depLangue = ["是讽刺还是歌颂？", "原来还可以这样写", "小说只是我的一种表达方式", "这样会不会有人看不懂"];
        return WritingConfig;
    }());
    configs.WritingConfig = WritingConfig;
})(configs || (configs = {}));
//# sourceMappingURL=WritingConfig.js.map