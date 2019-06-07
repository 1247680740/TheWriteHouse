namespace models.player {
    /** 玩家数据 */
    export class PlayerInfoVO {
        /** 用户ID编号 */
        userId: number;

        /** 用户昵称 */
        userName: string = "";

        /** 用户头像 */
        ico: string;

        /** 等级 */
        level: number;

        /** 是否已签到 */
        isSign: boolean;

        constructor() {

        }
    }
}