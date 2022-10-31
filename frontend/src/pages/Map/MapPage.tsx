import "./style/Map.css"
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import 'leaflet/dist/leaflet.css';
import Sommet from "../../Types/Sommet";
import { Lines } from "../../components/Lines";

const zoom: number = 13.45;

const mapCenteringPos: LatLngTuple = [48.864211, 2.380104];

interface MapProps {
    setSommet: (sommet: Sommet) => void,
    path: [Array<Sommet>, number] | undefined,
    sommets: Array<Sommet>,
    adjacents: Sommet[][],
    acpm: [Array<Sommet>, number] | undefined
}

export const MapPage: React.FC<MapProps> = (props): JSX.Element => {
    const sommets = props.sommets;
    const adjacents = props.adjacents;

    /**
     * Functin used to build all the vertexes on the map
     */
    const buildSommets = () => {
        return sommets.map((sommet) =>

            <Marker
                key={sommet.id}
                position={[sommet.position.lng, sommet.position.lat]}
                icon={sommet.isEnd ? Lines[sommet.ligne].mainIcon : Lines[sommet.ligne].secondaryIcon}
                eventHandlers={{
                    click: () => {
                        handleSommetClick(sommet);
                    },
                    mouseover: (e) => {
                        e.target.openPopup();
                    },
                    mouseout: (e) => {
                        e.target.closePopup();
                    }
                }}
            >
                <Popup>{sommet.name}</Popup>
            </Marker>
        );
    }

    /**
     * Function used to handle click on a vertex
     * @param sommet Vertex on which user has clicked
     */
    const handleSommetClick = (sommet: Sommet) => {
        props.setSommet(sommet);
    };

    /**
     * Function used to build path between from an array of vertexes.
     * @param pcc Array of vertexes
     * @param color Color of the path
     */
    const buildPath = (pcc: Sommet[], color: string) => {
        const paths: Array<JSX.Element> = [];
        if (pcc === undefined)
            return paths;
        for (let i = 1; i < pcc.length; i++) {
            const sommet = pcc[i];
            const previousSommet = pcc[i - 1];
            paths.push(
                <Polyline
                    key={`${i}-path`}
                    positions={[
                        [sommet.position.lng, sommet.position.lat],
                        [previousSommet.position.lng, previousSommet.position.lat]
                    ]}
                    className={"path-line"}
                    color={color}
                />
            );
        }
        return paths;
    }

    /**
     * Function used to build from a map of vertexes and their adjacents vertexes.
     * @param map Map of vertexes id and their adjacents vertexes id.
     * @param stations List of all the vertexes.
     * @param color Color of the path.
     */
    const buildPathFromMap = (map: Map<number, number[]>, stations: Array<Sommet>, color: string) => {
        const paths: Array<JSX.Element> = [];
        if (map === undefined)
            return paths;
        map.forEach((value, key) => {
            const sommet = stations[key];
            value.forEach((successeur) => {
                const successeurSommet = stations[successeur];
                paths.push(
                    <Polyline
                        key={`${key}-${successeur}`}
                        positions={[
                            [sommet.position.lng, sommet.position.lat],
                            [successeurSommet.position.lng, successeurSommet.position.lat]
                        ]}
                        className={"path-line"}
                        color={color}
                    />
                );
            });
        });
        return paths;
    }

    /**
     * Parcours en profondeur de chaque ligne afin de dessiner les lignes de métro
     * @param sommetAdj Liste des adjacences de chaque sommet
     * @param stations Liste des sommets du graphe
     */
    const drawLines = (sommetAdj: Sommet[][], stations: Sommet[]) => {
        let terminus: Map<string, Sommet> = new Map();
        const paths: JSX.Element[][] = [];
        stations.forEach(station => station.isEnd && !terminus.has(station.ligne) ? terminus.set(station.ligne, station) : null);

        const dfs = (sommet: Sommet, visited: Map<number, boolean>, ligne: string, pre: Map<number, number[]>): void => {
            visited.set(sommet.id, true);
            const currentAdjs = sommetAdj[sommet.id];
            currentAdjs.forEach((item) => {
                if (!visited.has(item.id) && item.ligne === ligne) {
                    pre.set(sommet.id, pre.get(sommet.id) ? pre.get(sommet.id)!.concat([item.id]) : [item.id]);
                    dfs(item, visited, ligne, pre);
                }
            });
        }

        terminus.forEach((station, ligne) => {
            const adj = sommetAdj[station.id];
            const previousVisited = new Map<number, number[]>();
            adj.forEach((item) => {
                const visited: Map<number, boolean> = new Map();
                visited.set(station.id, true);
                if (!visited.has(item.id) && item.ligne === ligne && !item.isEnd) {
                    previousVisited.set(station.id, previousVisited.get(station.id) ? previousVisited.get(station.id)!.concat([item.id]) : [item.id]);
                    dfs(item, visited, ligne, previousVisited);
                }
                paths.push(buildPathFromMap(previousVisited, stations, Lines[ligne].couleur));
            });
        });
        return paths;


    }


    return (
        <>
            <div className="mapContainer">
                <MapContainer
                    id="mapId"
                    center={mapCenteringPos}
                    zoom={zoom}
                    // style={{ height: '100vh', width: '100wh' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                    {sommets ? buildSommets() : null}
                    {adjacents && sommets ? drawLines(adjacents, sommets) : null}
                    {props.path ? buildPath(props.path[0], "#990000") : null}
                    {props.acpm ? buildPath(props.acpm[0], "#000099") : null}
                </MapContainer>
            </div>
        </>
    )
}