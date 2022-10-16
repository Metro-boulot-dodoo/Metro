/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename Branche.ts
 */
import Arret from "./Arret";

export default interface Branche {
    readonly id: number;
    readonly connexions: [Arret, Arret];
    readonly time: number;
}