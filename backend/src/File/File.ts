/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename File.ts
 */

import {readFile} from 'fs';

export class File {
    public static async read(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });
    }
}

