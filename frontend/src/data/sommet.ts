import Sommet from '../Types/Sommet';
import { API_BASE_URL } from '../config/api';
import { JSONResponse } from "../Types/JSONReponse";

/**
 * Service used to fetch the lowest weight path between two vertexes.
 * @param a1 Departure vertex
 * @param a2 Destination vertex
 * @returns The lowest weight path if service was successful or a promise of an error if not.
 */
const getPcc: (a1: Sommet, a2: Sommet) => Promise<[Array<Sommet>, number]> = async (a1: Sommet, a2: Sommet) => {

      const res = await fetch(`${API_BASE_URL}/pcc?start=${a1.id}&end=${a2.id}`);
      const result: JSONResponse<[Array<Sommet>, number]> = await res.json();
      if (!res.ok)
            return Promise.reject(new Error("Could not fetch data"));

      if (result.statusCode !== 200)
            return Promise.reject(new Error("Error when fetching data"));
      return result.data ?? [new Array<Sommet>(), 0];
}

/**
 * Service used to fetch every vertex
 * @returns An object with a list of vertexes and a list of vertexes successors in a promise
 * or an error in a promise if service wasn't successful.
 */
const getAllSommets = async () => {
      const res = await fetch(API_BASE_URL + '/stations');
      const result: JSONResponse<{"sommets": Sommet[], "adjacents" : Sommet[][]}> = await res.json();

      if (!res.ok)
            return Promise.reject(new Error("Could not fetch data"));

      if (result.statusCode !== 200)
            return Promise.reject(new Error("Error when fetching data"));
      if (!result.data)
            return Promise.reject(new Error("Data is null"));

      return result.data;
}

export { getPcc, getAllSommets };