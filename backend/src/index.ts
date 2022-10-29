import { File } from './File/File';
import Sommet from "./Types/Sommet";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Graphe from "./Graphe/Graphe";
import { HTTPResponse } from "./Utils";
import Position from "./Types/Position";
import cors from "cors"
import IGraphe from './Types/IGraphe';
import { cp } from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
let graphe: Graphe;

app.use(cors({
    origin: "*",
    methods: ["GET"],
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    const fileContent = await File.read("./public/data/metro.txt");
    const filePosition = await File.read("./public/data/pospoints.txt");
    const filePos = await File.read("./public/data/posGeo.json");
    const pos = await getPositionsNewFile(filePos);
    const arrets = await parseFile(fileContent, pos);
    graphe = new Graphe(arrets);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get("/stations", (req: Request, res: Response) => {
    
    const sortedStationsByLine: Array<[Array<Sommet>, number]> = [];
    let copy: Array<Sommet> = graphe.arrets.map((sommet: Sommet) => {
        return {
            ...sommet,
            sommetsAdjacents: convertMapToArray(sommet.sommetsAdjacents)
        } as unknown as Sommet
    });
    const stationsByLine: Array<Array<Sommet>> = filterByLine(copy);
    // console.log(stationsByLine);

    res.send(HTTPResponse(200, "Data successfuly found", graphe.getArrets()));
});

app.get("/station/:id", (req: Request, res: Response) => {
    const sommetId: number = parseInt(req.params.id as string) ?? -1;
    const sommet = graphe.getSommet(sommetId);
    if (!sommet)
        res.status(400)
            .send(HTTPResponse(200, "URL parameter id not found in graph", null));
    res.status(200).send(HTTPResponse(200, "Done", sommet));
});

app.get("/pcc", (req: Request, res: Response) => {
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

// fonction filterByLine qui filtre les sommets par ligne
function filterByLine(arrets: Array<Sommet>): Array<Array<Sommet>> {
    const stationsByLine: Array<Array<Sommet>> = [];
    for (let i = 1; i <= 14; i++) {
        const ligne = arrets.filter(s => s.ligne === i.toString());
        stationsByLine.push(ligne);
    }
    return stationsByLine;
}

// fonction qui converti toutes les données des sommetsAdjacents de type Map en Array
function convertMapToArray(map: Map<Sommet, number>): Array<Sommet> {
    const array: Array<Sommet> = [];
    map.forEach((value, key) => {
        array.push(key);
    });
    return array;
}

// faire une fonction qui prend en paramètre un array de sommets et un sommet et verifie par l'id que ce sommet est dans l'array
// si oui, on renvoie true, sinon false
function isInArray(array: Array<Sommet>, sommet: Sommet): boolean {
    let isInArray: boolean = false;
    array.forEach((station) => {
        if (station.id === sommet.id) {
            isInArray = true;
        }
    });
    return isInArray;
}

/**
 * Méthode permettant de parser un fichier respectant le format donné par le sujet
 * @param content Contenu du fichier à parser
 * @param positions Hash map des positions des sommets
 * @returns Sommets (arrêts) du futur graphe
 */
const parseFile: (content: string, positions: Map<string, Position>) => Promise<Array<Sommet>> =
    async (content: string, positions: Map<string, Position>) => {

        const arrets: Array<Sommet> = [];
        content.split('\n').forEach((line) => {
            if (line.startsWith("V")) {
                const strTab = line.split(/[;\s]/g).filter((s) => s !== '').map((s) => s.trim());
                const sommetName = strTab.slice(2, strTab.length - 3).join(" ");
                arrets.push({
                    id: parseInt(strTab[1]),
                    name: sommetName,
                    ligne: strTab[strTab.length - 3],
                    isEnd: (strTab[strTab.length - 2]).toLowerCase() === "true",
                    branchement: parseInt(strTab[strTab.length - 1]),
                    sommetsAdjacents: new Map<Sommet, number>(),
                    position: positions.get(sommetName.toLowerCase()) as Position
                });
            }
            else {
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
const getPositionsNewFile: (content: string) => Promise<Map<string, Position>> = async (content: string) => {
    const fileJson = JSON.parse(content);
    const positions: Map<string, Position> = new Map();

    fileJson.features.forEach((v: any) => {
        positions.set((v.properties.STATION as string).toLowerCase(), { lat: v.geometry.coordinates[0], lng: v.geometry.coordinates[1] });
    });

    return positions;
};