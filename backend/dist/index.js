"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("./File/File");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = yield File_1.File.read("public/data/metro.txt");
    const { arrets, branches } = yield parseFile(fileContent);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
}));
/**
 * Méthode permettant de parser un fichier respectant le format donné par le sujet
 * @param {string} content Contenu du fichier à parser
 * @returns {Promise<Array<Arret>>, Promise<Array<Branche>>} Sommets (arrêts) et branches (connexions) du graphe
 */
const parseFile = (content) => __awaiter(void 0, void 0, void 0, function* () {
    const arrets = [];
    const branches = [];
    content.split('\n').forEach((line) => {
        if (line.startsWith("V")) {
            const strTab = line.split(/[;\s]/g).filter((s) => s !== '').map((s) => s.trim());
            arrets.push({
                id: parseInt(strTab[1]),
                name: strTab.slice(2, strTab.length - 3).join(" "),
                ligne: parseInt(strTab[strTab.length - 3]),
                isEnd: (strTab[strTab.length - 2]).toLowerCase() === "true",
                branchement: parseInt(strTab[strTab.length - 1])
            });
        }
        else {
            const strTab = line.split(" ");
            branches.push({
                id: parseInt(strTab[0]),
                connexions: [arrets[parseInt(strTab[1])], arrets[parseInt(strTab[2])]],
                time: parseInt(strTab[3])
            });
        }
    });
    return { arrets, branches };
});
