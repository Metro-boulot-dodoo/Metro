/**
 * @author LE GAL Florian
 * @date 28/10/2022
 * @project Metro
 * @filename utils.ts
 */

/**
 * Fonction permettant de transformer des secondes en minutes
 * @param s Nombre de secondes
 */
export const fmtMSS = (s: number) => (s-(s%=60))/60+(9<s?':':':0')+s;
