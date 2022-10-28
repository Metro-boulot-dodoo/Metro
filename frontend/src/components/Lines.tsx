import l1 from '../assets/1.svg';
import l1s from '../assets/1s.svg';
import l2 from '../assets/2.svg';
import l2s from '../assets/2s.svg';
import l3 from '../assets/3.svg';
import l3s from '../assets/3s.svg';
import l3b from '../assets/3b.svg';
import l3bs from '../assets/3bs.svg';
import l4 from '../assets/4.svg';
import l4s from '../assets/4s.svg';
import l5 from '../assets/5.svg';
import l5s from '../assets/5s.svg';
import l6 from '../assets/6.svg';
import l6s from '../assets/6s.svg';
import l7 from '../assets/7.svg';
import l7s from '../assets/7s.svg';
import l7b from '../assets/7b.svg';
import l7bs from '../assets/7bs.svg';
import l8 from '../assets/8.svg';
import l8s from '../assets/8s.svg';
import l9 from '../assets/9.svg';
import l9s from '../assets/9s.svg';
import l10 from '../assets/10.svg';
import l10s from '../assets/10s.svg';
import l11 from '../assets/11.svg';
import l11s from '../assets/11s.svg';
import l12 from '../assets/12.svg';
import l12s from '../assets/12s.svg';
import l13 from '../assets/13.svg';
import l13s from '../assets/13s.svg';
import l14 from '../assets/14.svg';
import l14s from '../assets/14s.svg';

import L from 'leaflet';
import Ligne from "../Types/Ligne";


export const Lines: Record<string, Ligne> = {
    "1": {
        couleur: "#FECE00",
        mainIcon: new L.Icon({
            iconUrl: l1,
            iconRetinaUrl: l1,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l1s,
            iconRetinaUrl: l1s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l1
    },
    "2": {
        couleur: "#0065AE",
        mainIcon: new L.Icon({
            iconUrl: l2,
            iconRetinaUrl: l2,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l2s,
            iconRetinaUrl: l2s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l2
    },
    "3": {
        couleur: "#9F971A",
        mainIcon: new L.Icon({
            iconUrl: l3,
            iconRetinaUrl: l3,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l3s,
            iconRetinaUrl: l3s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l3
    },
    "3bis": {
        couleur: "#99D4DE",
        mainIcon: new L.Icon({
            iconUrl: l3b,
            iconRetinaUrl: l3b,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l3bs,
            iconRetinaUrl: l3bs,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l3b
    },
    "4": {
        couleur: "#BE418D",
        mainIcon: new L.Icon({
            iconUrl: l4,
            iconRetinaUrl: l4,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l4s,
            iconRetinaUrl: l4s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l4
    },
    "5": {
        couleur: "#F19043",
        mainIcon: new L.Icon({
            iconUrl: l5,
            iconRetinaUrl: l5,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l5s,
            iconRetinaUrl: l5s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l5
    },
    "6": {
        couleur: "#84C28E",
        mainIcon: new L.Icon({
            iconUrl: l6,
            iconRetinaUrl: l6,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l6s,
            iconRetinaUrl: l6s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l6
    },
    "7": {
        couleur: "#F2A4B7",
        mainIcon: new L.Icon({
            iconUrl: l7,
            iconRetinaUrl: l7,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l7s,
            iconRetinaUrl: l7s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l7
    },
    "7bis": {
        couleur: "#84C28E",
        mainIcon: new L.Icon({
            iconUrl: l7b,
            iconRetinaUrl: l7b,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l7bs,
            iconRetinaUrl: l7bs,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l7b
    },
    "8": {
        couleur: "#CDACCF",
        mainIcon: new L.Icon({
            iconUrl: l8,
            iconRetinaUrl: l8,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l8s,
            iconRetinaUrl: l8s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l8
    },
    "9": {
        couleur: "#D5C900",
        mainIcon: new L.Icon({
            iconUrl: l9,
            iconRetinaUrl: l9,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l9s,
            iconRetinaUrl: l9s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l9
    },
    "10": {
        couleur: "#E4B327",
        mainIcon: new L.Icon({
            iconUrl: l10,
            iconRetinaUrl: l10,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l10s,
            iconRetinaUrl: l10s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l10
    },
    "11": {
        couleur: "#8C5E24",
        mainIcon: new L.Icon({
            iconUrl: l11,
            iconRetinaUrl: l11,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l11s,
            iconRetinaUrl: l11s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l11
    },
    "12": {
        couleur: "#007E49",
        mainIcon: new L.Icon({
            iconUrl: l12,
            iconRetinaUrl: l12,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l12s,
            iconRetinaUrl: l12s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l12
    },
    "13": {
        couleur: "#99D4DE",
        mainIcon: new L.Icon({
            iconUrl: l13,
            iconRetinaUrl: l13,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l13s,
            iconRetinaUrl: l13s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l13
    },
    "14": {
        couleur: "#622280",
        mainIcon: new L.Icon({
            iconUrl: l14,
            iconRetinaUrl: l14,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        }),
        secondaryIcon: new L.Icon({
            iconUrl: l14s,
            iconRetinaUrl: l14s,
            popupAnchor: [-0, -0],
            iconSize: [12, 16.5],
        }),
        img : l14
    }
}