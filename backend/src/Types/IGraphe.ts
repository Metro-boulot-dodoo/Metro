/**
 * @author LE GAL Florian
 * @date 17/10/2022
 * @project backend
 * @filename IGraphe.ts
 */

import Arret from "./Arret";
import Branche from "./Branche";

export default interface IGraphe {
    readonly arrets: Arret[];
    readonly branches: Branche[];
    readonly graphe: Map<Arret, Map<Arret, number>>;

    findPcc(start: Arret, end: Arret): Arret[];
}