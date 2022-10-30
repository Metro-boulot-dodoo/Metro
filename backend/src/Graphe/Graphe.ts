/**
 * @author LE GAL Florian
 * @date 17/10/2022
 * @project backend
 * @filename Graphe.ts
 */
 import { assert } from "console";
 import IGraphe from "../Types/IGraphe";
 import Sommet from "../Types/Sommet";
 
 export default class Graphe implements IGraphe {
 
     /**
      * Constructeur de la classe
      * @param arrets {Array<Sommet>} Liste des sommets du graphe
      */
     constructor(arrets: Sommet[]) {
         this.arrets = arrets;;
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
         this.DFS(this.arrets[0], visited); 
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
      * Méthode permettant de retrouver l'arbre couvrant de poids minimum du graphe
      * @returns Le poids de l'ACPM et une liste des sommets de l'ACPM avec les listes de sommets adjacents respectifs modifié.
      */
      getACPM(): [Array<Sommet>, number] {
         if (!this.isConnexe()){
             throw Error("Graphe n'est pas connexe");
         }
         const SEPARATOR_ARETE_ID:string = ":"
 
         /**
          * Fonction permettant d'obtenir la map des arêtes d'un graphe
          * @param graphe {Graphe} Graphe d'où extraire la map d'arêtes
          * @returns la map contenant les arêtes avec leurs poids associés
          */
          const getAretesMap = (graphe: Graphe): Map<string, number> => {
 
             const aretesMap: Map<string, number> = new Map<string, number>();
             graphe.arrets.forEach(sommet => {
                 sommet.sommetsAdjacents.forEach((weight, sommetAdjacent) => {
                     // Met en forme l'identifiant d'arête sous la forme "idSommet1:idSommet2"
                     const areteId:string = sommet.id.toString() + SEPARATOR_ARETE_ID + sommetAdjacent.id.toString();
                     // Ajoute l'arête si elle n'est pas présente
                     if(!isInMap(areteId, aretesMap))
                         aretesMap.set(areteId, weight);
                 })
             })
            return aretesMap;
         }
 
         /**
          * Fonction vérifiant si une arête est dans une map quelque soit l'ordre de ses sommets dans l'identifiant 
          * ("idSommet1:idSommet2" et "idSommet2:idSommet1" sont identiques) 
          * @param areteId {string} identifiant de l'arête à chercher
          * @param aretesMap {Map<string, number>} map où a lieu la verification
          * @returns true si l'identifiant de l'arête est dans la map, false sinon
          */
         const isInMap = (areteId: string, aretesMap: Map<string, number>): boolean => {
             return aretesMap.has(areteId) || aretesMap.has(areteId.split(SEPARATOR_ARETE_ID).reverse().join(SEPARATOR_ARETE_ID));
         }
 
         /**
          * Fonction permettant d'executer l'algorithme de Kruskal et obtenir l'ACPM ainsi que son poids.
          * @param aretesMap {Map<string, number>} map d'arêtes trié sur laquelle se déroule l'algorithme
          * @returns l'ACPM (arbre couvrant de poids minimum) et son poids
          */
         const kruskal = (aretesMap: Map<string, number>): [Array<Sommet>, number] => {
 
             /**
              * Fonction récursive vérifiant si le graphe a un cycle
              * @param sommet {Sommet} Sommet courant à vérifier
              * @param visited {Map<Sommet, boolean>} Map des sommets visités
              * @param parent {number} Sommet parent du sommet courant
              * @returns true si le graphe a un cycle, false sinon
              */
              const cycleChecker = (sommet: Sommet, visited: Map<Sommet,boolean>, parent: number): boolean => {
                 // Marquer le sommet courant comme visité
                 visited.set(sommet, true);
                 let result = false; 
                for (const [voisin, poids] of sommet.sommetsAdjacents) {
                    // Si le sommet n'a pas été visité, on le visite
                    if(!visited.get(voisin)){
                        if(cycleChecker(voisin, visited, sommet.id))
                            return true;
                    }
                    // Si l'un des voisin a été visité et qu'il n'est pas le parent du sommet courant, un cycle est présent
                    else if(parent != voisin.id){
                        result = true;
                    }
                }
                return result;
             }
 
             /**
              * Fonction d'initialisation de la fonction récursive vérifiant si le graphe a un cycle
              * @param graphe {Graphe} Graphe a vérifier
              * @returns true si le graphe est cyclique, false sinon
              */
             const hasCycle = (graphe: Graphe): boolean => {
                 const visited: Map<Sommet,boolean> = new Map();
                 graphe.arrets.forEach( sommet => visited.set(sommet, false));
                for (const sommet of graphe.arrets)
                    if(!visited.get(sommet))
                        if(cycleChecker(sommet, visited, -1))
                            return true;
                return false;
             }

             /**
              * Fonction retournant une liste de sommet dans l'ordre d'un parcours en profondeur
              * @param graphe {Graphe} Arbre couvrant de poids minimum
              * @returns liste de sommets ordonnées du chemin formant l'ACPM
              */
              const getOrderedMST = (graphe: Graphe): Array<Sommet> => {
                const ordoredMST: Array<Sommet> = [];
                AddingThroughDFS(graphe.arrets[0], ordoredMST);
                return ordoredMST;
            }

            /**
             * Fonction ajoutant à une liste les sommets dans l'ordre d'un parcours en profondeur
             * @param sommet {Sommet} sommet à ajouter
             * @param ordoredMST {Array<Sommet>} liste à modifier
             */
            const AddingThroughDFS = (sommet: Sommet, ordoredMST: Array<Sommet>) => {
                ordoredMST.push(sommet);
                sommet.sommetsAdjacents.forEach((weight, voisin) => {
                    if(!ordoredMST.includes(voisin)){
                        AddingThroughDFS(voisin, ordoredMST)
                        ordoredMST.push(sommet);
                    }
                })
            } 

             // Récupération des sommets du graphe principal
             const ACPM = new Graphe(
                 JSON.parse(JSON.stringify(this.arrets)).map((sommet: Sommet) => {
                     return {...sommet, 
                         sommetsAdjacents: new Map<Sommet, number>()
                     } as Sommet
             }));
            let poids: number = 0;

            for (let [areteId, weight] of aretesMap) {  
                 // Si le nombre d'arêtes dans notre ACPM est égal au nombre de sommet -1 du graphe et si l'ACPM est connexe
                if(getAretesMap(ACPM).size === (ACPM.arrets.length - 1)){
                    break;
                }
                 // Récupération des sommets à partir de l'identifiant de l'arête
                 const sommetA: Sommet = ACPM.arrets.find(sommet => sommet.id === parseInt(areteId.split(SEPARATOR_ARETE_ID)[0])) as Sommet;
                 const sommetB: Sommet = ACPM.arrets.find(sommet => sommet.id === parseInt(areteId.split(SEPARATOR_ARETE_ID)[1])) as Sommet;
 
                 // Ajout des nouvelles adjacences
                 sommetA.sommetsAdjacents.set(sommetB, weight);
                 sommetB.sommetsAdjacents.set(sommetA, weight);
                 // Si le graphe est cyclique avec les nouvelles adjacences on les retire
                 if(hasCycle(ACPM)){
                     sommetA.sommetsAdjacents.delete(sommetB);
                     sommetB.sommetsAdjacents.delete(sommetA);
                     aretesMap.delete(areteId);
                 }else{ 
                    poids += weight;
                 }
             }
             return [getOrderedMST(ACPM), poids]; 
         } 
         const aretesMapSorted = new Map([...getAretesMap(this)].sort((a, b) => a[1] - b[1]));
         return kruskal(aretesMapSorted);
     } 
  }