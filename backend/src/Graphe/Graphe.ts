/**
 * @author LE GAL Florian
 * @date 17/10/2022
 * @project backend
 * @filename Graphe.ts
 */

import IGraphe from "../Types/IGraphe";
import Arret from "../Types/Arret";
import Branche from "../Types/Branche";

export default class Graphe implements IGraphe {
    readonly arrets: Array<Arret>;
    readonly branches: Array<Branche>;
    readonly graphe: Map<Arret, Map<Arret, number>>;

    public constructor(arrets: Arret[], branches: Branche[]) {
        this.arrets = arrets;
        this.branches = branches;
        this.graphe = new Map<Arret, Map<Arret, number>>();
        this.branches.forEach((branche) => {
            if (!this.graphe.has(branche.connexions[0]))
                this.graphe.set(branche.connexions[0], new Map<Arret, number>());
            this.graphe.get(branche.connexions[0])?.set(branche.connexions[1], branche.time);
        });
        console.log(this.graphe);
    }

    findPcc (start: Arret, end: Arret): Arret[] {
        // TODO : implement Dijkstra algorithm to find shortest path in a graph
        return [];

    }
}