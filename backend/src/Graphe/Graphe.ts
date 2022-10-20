/**
 * @author LE GAL Florian
 * @date 17/10/2022
 * @project backend
 * @filename Graphe.ts
 */

import IGraphe from "../Types/IGraphe";
import Sommet from "../Types/Sommet";

export default class Graphe implements IGraphe {

    /**
     * Constructeur de la classe
     * @param arrets {Array<Sommet>} Liste des sommets du graphe
     */
    constructor(arrets: Sommet[]) {
        this.arrets = arrets;
    }

    readonly arrets: Sommet[];

    /**
     * Méthode permettant de retrouver le PCC d'un point vers l'autre
     * @param start {Sommet} Start point
     * @param end {Sommet} End point
     * @returns Une liste du plus court chemin de start vers end
     */
    findPcc(start: Sommet, end: Sommet): Array<Sommet> {
        if (!this.isConnexe())
            throw Error("Graphe n'est pas connexe");
        if (this.hasNegatifPoids())
            throw Error("Graphe a des poids négatifs")

        /**
         * Fonction permettant de trouver le sommet non visité avec le plus petit poids
         * @param sommets {Array<Sommet>} Liste de sommets non visités
         * @param distances {Map<Sommet, number>} HashMap des distances
         * @returns Le sommet optimal
         */
        const trouverMin = (sommets: Array<Sommet>, distances: Map<Sommet, number>) : Sommet | null => {
            let min = Infinity, s : Sommet | null = null;
            sommets.forEach(sommet =>{
                if ((distances.get(sommet) as number) < min){
                    min = distances.get(sommet) as number;
                    s = sommet;
                }
            });
            return s;
        }

        /**
         * Fonction permettant de récupérer le PCC de start à end
         * @param prev {Map<Sommet, Sommet | null>} HashMap des prédécesseurs
         * @param finishPoint {Sommet} Le sommet de fin
         * @param startPoint {Sommet} Le sommet de départ
         */
        const getSolution = (prev: Map<Sommet, Sommet | null>, finishPoint: Sommet, startPoint: Sommet): Array<Sommet> => {
            const S : Array<Sommet> = [];
            let u = finishPoint;
            if(prev.get(u) || u.id === startPoint.id)
                while(u){
                    S.push(u);
                    u = prev.get(u) as Sommet;
                }
            return S;
        }

        const distances : Map<Sommet, number> = new Map();
        const Q: Array<Sommet> = [];
        const predecesseurs: Map<Sommet, Sommet | null> = new Map();
        this.arrets.forEach(sommet => {
            distances.set(sommet, Infinity);
            predecesseurs.set(sommet, null);
            Q.push(sommet);
        });
        distances.set(start, 0);

        while(Q.length != 0){
            const u = trouverMin(Q, distances) as Sommet;
            const index = Q.indexOf(u);
            Q.splice(index, 1);
            u.sommetsAdjacents.forEach((poids, v) => {
                const alt = (distances.get(u) as number) + poids;
                if (alt<(distances.get(v) as number)) {
                    distances.set(v, alt);
                    predecesseurs.set(v, u);
                }
            });
        }
        return getSolution(predecesseurs, end, start);
    }

    /**
     * Méthode permettant de savoir si le graphe possède un poids négatif
     * @returns true si le graphe possède au moins un poids négatif, false si aucun
     */
    private hasNegatifPoids() : boolean {
        let result = false;
        this.arrets.forEach(sommets => {
            sommets.sommetsAdjacents.forEach((poids) => {
                if (poids < 0)
                    result = true;
            });
        });
        return result;
    }

    /**
     * Méthode permettant de déterminer si le graphe est connexe
     * @returns true si le graphe est connexe, false dans le cas contraire
     */
    private isConnexe() : boolean {
        const visited: Map<Sommet,boolean> = new Map();
        this.arrets.forEach(sommet => !visited.has(sommet) ? this.DFS(sommet, visited) : null);
        return visited.size === this.arrets.length;
    }

    /**
     * Parcours en profondeur du graphe (utilisé pour déterminer si le graphe est connexe)
     * @param sommet Le sommet sur lequel on fait le parcours en profondeur
     * @param visited Hashmap des sommets visités
     */
    private DFS(sommet: Sommet, visited: Map<Sommet, boolean>): void {
        visited.set(sommet, true);
        sommet.sommetsAdjacents.forEach((item, key) => !visited.has(key) ? this.DFS(key, visited) : null);
    }

}
