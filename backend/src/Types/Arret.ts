/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename Arret.ts
 */

export default interface Arret {
    readonly id: number;
    readonly name: string;
    readonly ligne: number;
    readonly isEnd: boolean;
    readonly branchement: number;
}