/**
 * @author LE GAL Florian
 * @date 16/10/2022
 * @project backend
 * @filename File.spec.ts
 */

import { File } from './File';
import {describe, expect, it} from "@jest/globals";

// Tests unitaires via le framework Jest
describe('File', () => {
    it('should read a file', async () => {
        const content = await File.read('package.json');
        expect(content).toContain('name');
    });
});