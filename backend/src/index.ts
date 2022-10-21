import {File} from './File/File';
import Sommet from "./Types/Sommet";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Graphe from "./Graphe/Graphe";
import Position from "./Types/Position";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    const fileContent = await File.read("./public/data/metro.txt");
    const filePosition = await File.read("./public/data/pospoints.txt");
    const positions = await getPositions(filePosition);
    const arrets = await parseFile(fileContent, positions);
    const graphe = new Graphe(arrets);
    // positions.forEach((s: Position) => {console.log(s.x, s.y, s.name)})
    // console.log(graphe.findPcc(arrets.at(0) as Sommet, arrets.at(8) as Sommet));
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



/**
 * Méthode permettant de parser un fichier respectant le format donné par le sujet
 * @param content Contenu du fichier à parser
 * @param positions Hash map des positions des sommets
 * @returns Sommets (arrêts) du futur graphe
 */
const parseFile: (content: string, positions: Map<string, Position>) => Promise<Array<Sommet>> = async (content: string, positions: Map<string, Position>) => {

    const arrets: Array<Sommet> = [];
    content.split('\n').forEach((line) => {
        if (line.startsWith("V")){
            const strTab = line.split(/[;\s]/g).filter((s) => s !== '').map((s) => s.trim());
            const sommetName = strTab.slice(2, strTab.length - 3).join(" ");
            arrets.push({
                id: parseInt(strTab[1]),
                name: sommetName,
                ligne: parseInt(strTab[strTab.length - 3]),
                isEnd: (strTab[strTab.length - 2]).toLowerCase() === "true",
                branchement: parseInt(strTab[strTab.length - 1]),
                sommetsAdjacents: new Map<Sommet, number>(),
                position: positions.get(sommetName) as Position
            });
        }
        else{
            const strTab = line.split(" ");
            if (strTab.length < 4)
                return;
            const depart = arrets[parseInt(strTab[1])], destination = arrets[parseInt(strTab[2])];
            const poids = parseInt(strTab[3]);
            arrets[depart.id].sommetsAdjacents.set(destination, poids);
            arrets[destination.id].sommetsAdjacents.set(depart, poids);
        }
    });
    return arrets;
};

/**
 * Méthode permettant de récupérer les coordonnées (x,y) des sommets listés dans le fichier pospoints.txt 
 * @param {string} content Contenu du fichier à parser
 * @returns Liste de coordonnées des sommets
 */
 const getPositions: (content: string) => Promise<Map<string, Position>> = async (content: string) => {

    const positions: Map<string, Position> = new Map();
    content.split('\n').forEach((line) => {
        const strTab = line.split(';').filter((s) => s !== '').map((s) => s.trim());
        const pos: Position =  {x: parseInt(strTab[0]), y:parseInt(strTab[1])};
        const name = strTab[2]?.split("@").join(" ");
        positions.set(name, pos);
    });
    return positions;
};