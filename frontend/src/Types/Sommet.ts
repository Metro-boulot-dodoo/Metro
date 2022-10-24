import Position from "./Position";

export default interface Sommet {
    readonly id: number;
    readonly name: string;
    readonly ligne: number;
    readonly isEnd: boolean;
    readonly branchement: number;
    readonly sommetsAdjacents: Map<Sommet, number>;
    readonly position: Position;
}