import {File} from './File/File';
import Sommet from "./Types/Sommet";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Graphe from "./Graphe/Graphe";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    const fileContent = await File.read("./public/data/metro.txt");
    const arrets = await parseFile(fileContent);
    const graphe = new Graphe(arrets);
    // console.log(graphe.findPcc(arrets.at(0) as Sommet, arrets.at(8) as Sommet));
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



/**
 * Méthode permettant de parser un fichier respectant le format donné par le sujet
 * @param {string} content Contenu du fichier à parser
 * @returns Sommets (arrêts) du futur graphe
 */
const parseFile: (content: string) => Promise<Array<Sommet>> = async (content: string) => {

    const arrets: Array<Sommet> = [];
    content.split('\n').forEach((line) => {
        if (line.startsWith("V")){
            const strTab = line.split(/[;\s]/g).filter((s) => s !== '').map((s) => s.trim());
            arrets.push({
                id: parseInt(strTab[1]),
                name: strTab.slice(2, strTab.length - 3).join(" "),
                ligne: parseInt(strTab[strTab.length - 3]),
                isEnd: (strTab[strTab.length - 2]).toLowerCase() === "true",
                branchement: parseInt(strTab[strTab.length - 1]),
                sommetsAdjacents: new Map<Sommet, number>()
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

