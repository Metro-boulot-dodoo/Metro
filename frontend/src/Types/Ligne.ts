import L from "leaflet";

export default interface Ligne {
    couleur: string,
    mainIcon: L.Icon,
    secondaryIcon?: L.Icon,
}