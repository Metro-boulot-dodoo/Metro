import l1 from '../assets/1.svg';
import l2 from '../assets/2.svg';
import l3 from '../assets/3.svg';
import l3b from '../assets/3b.svg';
import l4 from '../assets/4.svg';
import l5 from '../assets/5.svg';
import l6 from '../assets/6.svg';
import l7 from '../assets/7.svg';
import l7b from '../assets/7b.svg';
import l8 from '../assets/8.svg';
import l9 from '../assets/9.svg';
import l10 from '../assets/10.svg';
import l11 from '../assets/11.svg';
import l12 from '../assets/12.svg';
import l13 from '../assets/13.svg';
import l14 from '../assets/14.svg';

import L from 'leaflet';
import Ligne from "../Types/Ligne";

export const Lines: Record<string, Ligne> = {
    "1": {
        couleur: "#FECE00",
        icon: new L.Icon({
            iconUrl: l1,
            iconRetinaUrl: l1,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "2": {
        couleur: "#0065AE",
        icon: new L.Icon({
            iconUrl: l2,
            iconRetinaUrl: l2,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "3": {
        couleur: "#9F971A",
        icon: new L.Icon({
            iconUrl: l3,
            iconRetinaUrl: l3,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "3bis": {
        couleur: "#99D4DE",
        icon: new L.Icon({
            iconUrl: l3b,
            iconRetinaUrl: l3b,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "4": {
        couleur: "#BE418D",
        icon: new L.Icon({
            iconUrl: l4,
            iconRetinaUrl: l4,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "5": {
        couleur: "#F19043",
        icon: new L.Icon({
            iconUrl: l5,
            iconRetinaUrl: l5,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "6": {
        couleur: "#84C28E",
        icon: new L.Icon({
            iconUrl: l6,
            iconRetinaUrl: l6,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "7": {
        couleur: "#F2A4B7",
        icon: new L.Icon({
            iconUrl: l7,
            iconRetinaUrl: l7,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "7bis": {
        couleur: "#84C28E",
        icon: new L.Icon({
            iconUrl: l7b,
            iconRetinaUrl: l7b,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "8": {
        couleur: "#CDACCF",
        icon: new L.Icon({
            iconUrl: l8,
            iconRetinaUrl: l8,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "9": {
        couleur: "#D5C900",
        icon: new L.Icon({
            iconUrl: l9,
            iconRetinaUrl: l9,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "10": {
        couleur: "#E4B327",
        icon: new L.Icon({
            iconUrl: l10,
            iconRetinaUrl: l10,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "11": {
        couleur: "#8C5E24",
        icon: new L.Icon({
            iconUrl: l11,
            iconRetinaUrl: l11,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "12": {
        couleur: "#007E49",
        icon: new L.Icon({
            iconUrl: l12,
            iconRetinaUrl: l12,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "13": {
        couleur: "#99D4DE",
        icon: new L.Icon({
            iconUrl: l13,
            iconRetinaUrl: l13,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    },
    "14": {
        couleur: "#622280",
        icon: new L.Icon({
            iconUrl: l14,
            iconRetinaUrl: l14,
            popupAnchor: [-0, -0],
            iconSize: [16, 22],
        })
    }
}