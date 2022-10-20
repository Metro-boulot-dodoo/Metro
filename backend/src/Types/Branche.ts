/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename Branche.ts
 */
import Sommet from "./Sommet";

export default interface Branche {
    readonly id: number;
    readonly connexions: [Sommet, Sommet];
    readonly time: number;
}