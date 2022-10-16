/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename File.ts
 */

import * as fs from 'fs';

export class File {
    public static async read(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        });
    }
}

