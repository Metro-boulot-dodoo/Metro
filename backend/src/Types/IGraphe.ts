/**
 * @author LE GAL Florian
 * @date 17/10/2022
 * @project backend
 * @filename IGraphe.ts
 */

import Sommet from "./Sommet";

export default interface IGraphe {
    readonly arrets: Sommet[];

    findPcc(start: Sommet, end: Sommet): [Array<Sommet>, number];
    getACPM(): [Array<Sommet>, number];
}