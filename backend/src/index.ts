import {File} from './File/File';
import Arret from "./Types/Arret";
import Branche from "./Types/Branche";
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
    const {arrets, branches} = await parseFile(fileContent);
    const graphe = new Graphe(arrets, branches);
    console.log(graphe);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



/**
 * Méthode permettant de parser un fichier respectant le format donné par le sujet
 * @param {string} content Contenu du fichier à parser
 * @returns {Promise<Array<Arret>>, Promise<Array<Branche>>} Sommets (arrêts) et branches (connexions) du graphe
 */
const parseFile = async (content: string) => {

    const arrets: Array<Arret> = [];
    const branches: Array<Branche> = [];
    content.split('\n').forEach((line) => {
        if (line.startsWith("V")){
            const strTab = line.split(/[;\s]/g).filter((s) => s !== '').map((s) => s.trim());
            arrets.push({
                id: parseInt(strTab[1]),
                name: strTab.slice(2, strTab.length - 3).join(" "),
                ligne: parseInt(strTab[strTab.length - 3]),
                isEnd: (strTab[strTab.length - 2]).toLowerCase() === "true",
                branchement: parseInt(strTab[strTab.length - 1])
            });
        }
        else{
            const strTab = line.split(" ");
            if (strTab.length < 4)
                return;
            branches.push({
                id: parseInt(strTab[1]),
                connexions: [arrets[parseInt(strTab[1])], arrets[parseInt(strTab[2])]],
                time: parseInt(strTab[3])
            });
        }
    });
    return {arrets, branches};
};

