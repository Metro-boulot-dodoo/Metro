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

    getArrets(): Sommet[] {
        return this.arrets;
    }

    getSommet(id: number): Sommet | undefined {
        if(id<0 || id>=this.arrets.length)
            return undefined;
        return this.arrets[id];
    }

    private getLastId(): number {
        return this.arrets[this.arrets.length-1]?.id ?? -1;
    }

    /**
     * Méthode permettant de retrouver le PCC d'un point vers l'autre
     * @param start {Sommet} Start point
     * @param end {Sommet} End point
     * @returns Une liste du plus court chemin de start vers end et son poids
     */
    findPcc(start: Sommet, end: Sommet): [Array<Sommet>, number] {
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
         * @param ds  {Map<Sommet, number>} HashMap des distances
         * @returns Le PCC et la distance
         */
        const getSolution = (prev: Map<Sommet, Sommet | null>, finishPoint: Sommet, startPoint: Sommet, ds : Map<Sommet, number>): [Array<Sommet>, number]=> {
            const S : Array<Sommet> = [];
            let u = finishPoint;
            const poids = ds.get(u) as number;
            if(prev.get(u) || u.id === startPoint.id)
                while(u){
                    S.push(u);
                    u = prev.get(u) as Sommet;
                }
            return [S.reverse(), poids];
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
        return getSolution(predecesseurs, end, start, distances);
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

    /**
     * Méthode permettant de retrouver l'arbre couvran de poids minimum du graphe
     * @returns Une liste du plus court chemin de start vers end et son poids
     */
     getACPM(): [Array<Sommet>, number] {
        if (!this.isConnexe()){
            throw Error("Graphe n'est pas connexe");
        }

        const SEPARATOR_ARETE_ID:string = ":"

        /**
         * Fonction permettant d'obtenir la map des arêtes 
         * @param sommets {Array<Sommet>} Liste des sommets d'où extraire la map
         * @returns la map contenant les arêtes
         */
         const getAretesMap = (sommets: Array<Sommet>): Map<string, number> => {

            const aretesMap: Map<string, number> = new Map();
            let areteId:string;
            sommets.forEach(sommet => {
                sommet.sommetsAdjacents.forEach((weight, sommetAdjacent) => {
                    areteId = sommet.id.toString() + SEPARATOR_ARETE_ID + sommetAdjacent.id.toString();
                    if(!inMap(areteId, aretesMap))
                        aretesMap.set(areteId, weight);
                })
            })
            
           return aretesMap;
        }

        /**
         * Fonction vérifiant si une arête est dans la map
         * @param areteId {string} identifiant de l'arête à chercher
         * @param aretesMap {Map<string, number>} map où a lieu la verification
         * @returns true si l'identifiant de l'arête est dans la map, false sinon
         */
        const inMap = (areteId: string, aretesMap: Map<string, number>): boolean => {
            return aretesMap.has(areteId) || aretesMap.has(areteId.split(SEPARATOR_ARETE_ID).reverse().join(SEPARATOR_ARETE_ID));
        }

        /**
         * Fonction permettant d'executer l'algorithme de Kruskal et obtenir l'ACPM ainsi que son poids.
         * @param aretesMap {Map<string, number>} map d'arêtes sur laquelle s'execute l'algorithme
         * @returns l'ACPM et son poids
         */
        const kruskal = (aretesMap: Map<string, number>): [Array<Sommet>, number] => {

            /**
             * Fonction récursive vérifiant si le graphe a un cycle
             * @param sommetId {Sommet} Sommet courant à vérifier
             * @param visited {Map<Sommet, boolean>} Map des sommets visités
             * @param parent {Sommet} Sommet parent du sommet courant
             * @returns true si le graphe a un cycle, false sinon
             */
             const cycleChecker = (sommet: Sommet, visited: Map<Sommet,boolean>, parent: number): boolean => {
                // Marquer le sommet courant comme visité
                visited.set(sommet, true);
                let result = false;
                sommet.sommetsAdjacents.forEach((weight, sommetAdjacent) => {
                    // Si le sommet adjacent n'a pas été visité, on le visite
                    if(!visited.has(sommetAdjacent)){
                        result = cycleChecker(sommetAdjacent, visited, sommet.id);
                    }
                    // Si le sommet adjacent a été visité et qu'il n'est pas le parent du sommet courant, alors le graphe est cyclique
                    else if(sommetAdjacent.id !== parent){
                        result = true;
                    }
                })
                return result;
            }

            /**
             * Fonction d'appel d'initialisation de la fonction récursive vérifiant si le graphe a un cycle
             * @param sommets {Array<Sommet>} Sommet courant à vérifier
             * @returns true si le graphe est cyclique, false sinon
             */
            const hasCycle = (sommets: Array<Sommet>): boolean => {
                const visited: Map<Sommet,boolean> = new Map();
                sommets.forEach(sommet => !visited.has(sommet) ? cycleChecker(sommet, visited, -1) : null);
                return visited.size != sommets.length;
            }

            const ACPM: Array<Sommet> = [];
            let poids: number = 0;

            for (let [areteId, weight] of aretesMap) {
                
                if(ACPM.length === this.arrets.length - 1){
                    break;
                }
                let sommetA: Sommet = this.arrets.find(sommet => sommet.id === parseInt(areteId.split(SEPARATOR_ARETE_ID)[0])) as Sommet;
                let sommetB: Sommet = this.arrets.find(sommet => sommet.id === parseInt(areteId.split(SEPARATOR_ARETE_ID)[1])) as Sommet;
                
                // Ne pas push si sommetA est deja dans ACPM
                if(!ACPM.includes(sommetA)){
                    sommetA.sommetsAdjacents.clear();
                    ACPM.push(sommetA);
                }
                // idem pour sommetB
                if(!ACPM.includes(sommetB)){
                    sommetB.sommetsAdjacents.clear();
                    ACPM.push(sommetB);
                }
                // Ajout des nouveaux sommets adjacents
                sommetA.sommetsAdjacents.set(sommetB, weight);
                sommetB.sommetsAdjacents.set(sommetA, weight);
                poids += weight;
                // Si le graphe est cyclique, on retire le sommet ajouté
                if(hasCycle(ACPM)){
                    sommetA.sommetsAdjacents.delete(sommetB);
                    sommetB.sommetsAdjacents.delete(sommetA);
                    ACPM.pop();
                    ACPM.pop();
                    poids -= weight;
                }
            }
            // log pertinent value
            // log size
            console.log("ACPM size: ", ACPM.length, "should be ", this.arrets.length);
            // log weight
            console.log("ACPM weight: ", poids);
            // log number of edges
            console.log("ACPM number of edges: ", getAretesMap(ACPM).size, "should be ", this.arrets.length - 1);
            // log has cycle
            console.log("ACPM has cycle: ", hasCycle(ACPM), "should be false");
            console.log("Poids: ", poids);

            return [ACPM, poids];
        } 
        const aretesMapSorted = new Map([...getAretesMap(this.arrets)].sort((a, b) => a[1] - b[1]));
        return kruskal(aretesMapSorted);
        // Erreurs :
        // 375 sommet au lieu de 376
        // 345 arêtes au lieu de 375
        // D'après Maxime sur discord, le poids devrait être d'un peu plus de 20300, il est de 15954
        // Causes probable : 
        // 1 : Condition d'arrêt incorrecte : ACPM.length === this.arrets.length - 1 -> devrait comparé le nombre d'arêtes de ACPM avec le nombre de sommet du graphe
        // 2 : Fonction hasCycle possiblement incorrecte.
        // 3 ; Possible erreur dans la création et le push des sommets, possible que
    } 
 }