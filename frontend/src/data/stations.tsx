import Arret from '../../../backend/src/Types/arret';
import axios from "axios";
import { API_BASE_URL } from '../config/api';
import StationPosition from '../Types/StationPosition';

const getPcc = async (a1: Arret, a2: Arret) => {

      var Stations: Arret[] = Array();
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './pcc/?start=' + a1 + '&end=' + a2,
      });
      res.data.map((val: any) => {
            let obj: Arret = val
            Stations.push(obj)
      });
      return Stations;
}

const getStations = async () => {

      var Stations: Arret[] = Array();
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './stations',
      });
      res.data.map((val: any) => {
            let obj: Arret = val
            Stations.push(obj)
      });
      return Stations;
}

const getStationPosition = async (name: String) => {
      
      var Stations: StationPosition[] = Array();
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './stations/name=' + name,
      });
      res.data.map((val: any) => {
            let obj: StationPosition = val
            Stations.push(obj)
      });
      return Stations;
}

const getStationPositionWithId = async (id: Number) => {

      var Station: StationPosition;
      const res = await axios({
            method: 'GET',
            url: API_BASE_URL + './stations/id=' + id,
      });
      Station = res.data;
      return Station;
}


export { getPcc, getStations, getStationPosition, getStationPositionWithId };