import {File} from './File/File';
import Sommet from "./Types/Sommet";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Graphe from "./Graphe/Graphe";
import {HTTPResponse} from "./Utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
let graphe: Graphe;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    const fileContent = await File.read("./public/data/metro.txt");
    const arrets = await parseFile(fileContent);
    graphe = new Graphe(arrets);
    // console.log(graphe.findPcc(arrets.at(0) as Sommet, arrets.at(8) as Sommet));
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get("/stations", (req:Request, res: Response) => {
    res.send(JSON.stringify(graphe.getArrets()));
});

app.get("/station/:id", (req:Request, res: Response) => {
    const sommetId: number = parseInt(req.params.id as string) ?? -1;
    const sommet = graphe.getSommet(sommetId);
    if (!sommet)
        res.status(400)
            .send(HTTPResponse(200, "URL parameter id not found in graph", null));
    res.status(200).send(HTTPResponse(200, "Done", sommet));
});

app.get("/pcc", (req:Request, res: Response) => {
    const start: number = parseInt(req.query.start as string) ?? -1, end: number = parseInt(req.query.end as string) ?? -1;
    const startPoint = graphe.getSommet(start), endPoint = graphe.getSommet(end);
    if (!startPoint || !endPoint)
        res.status(400)
            .send(HTTPResponse(200, "Query string parameters start and/or end were not found in graph", null));
    res.status(200)
        .send(
            HTTPResponse(200,
            "Done",
            graphe.findPcc(startPoint as Sommet, endPoint as Sommet))
        );
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

