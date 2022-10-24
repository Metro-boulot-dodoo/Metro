import Sommet from '../Types/Sommet';
import axios from "axios";
import { API_BASE_URL } from '../config/api';
import Position from '../Types/Position';

type JSONResponse<T> = {
      statusCode: number,
      message: string,
      data?: T,
      time: Date
}

const getPcc: (a1: Sommet, a2: Sommet) => Promise<[Array<Sommet>, number]> = async (a1: Sommet, a2: Sommet) => {

      const res = await fetch(`${API_BASE_URL}/pcc?start=${a1.id}&end=${a2.id}`);
      const result:JSONResponse<[Array<Sommet>, number]> = await res.json();
      if (!res.ok)
            return Promise.reject(new Error("Could not fetch data"));

      if(result.statusCode !== 200)
            return Promise.reject(new Error("Error when fetching data"));
      return result.data ?? [new Array<Sommet>(), 0];
}

const getAllSommets: () => Promise<Sommet[]> = async () => {
      const res = await fetch(API_BASE_URL + '/stations');
      const result:JSONResponse<Array<Sommet>> = await res.json();
      if (!res.ok)
            return Promise.reject(new Error("Could not fetch data"));

      if(result.statusCode !== 200)
            return Promise.reject(new Error("Error when fetching data"));
      return result.data ?? new Array<Sommet>();
}

const getStationPosition = async (name: String) => {
      
      const Stations: Position[] = Array();
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './stations/name=' + name,
      });
      res.data.map((val: any) => {
            let obj: Position = val
            Stations.push(obj)
      });
      return Stations;
}

const getStationPositionWithId = async (id: Number) => {

      var Station: Position;
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './stations/id=' + id,
      });
      Station = res.data;
      return Station;
}


export { getPcc, getAllSommets, getStationPosition, getStationPositionWithId };