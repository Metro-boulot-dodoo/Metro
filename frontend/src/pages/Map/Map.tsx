import "./style/Map.css"
import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import 'leaflet/dist/leaflet.css';
import Sommet from "../../Types/Sommet";
import {getAllSommets} from "../../data/sommet";
import {Lines} from "../../components/Lines";

const zoom:number = 13.45;

const mapCenteringPos:LatLngTuple = [48.864211, 2.380104];

interface MapProps {
    setSommet: (sommet: Sommet) => void,
    path: [Array<Sommet>, number] | undefined
}

export const Map: React.FC<MapProps> = (props): JSX.Element  => {
    const [sommets, setSommets] = React.useState<Array<Sommet>>([]);
    React.useEffect(() => {
        getAllSommets()
            .then((sommets) => setSommets(sommets))
            .catch((error) => console.log(error));
    }, []);

    // const buildSommets = () => sommets.map((sommet) => <Marker key={sommet.id} position={[sommet.position.y, sommet.position.x]} />);
    /**
     * Functin used to build all the vertexes on the map
     */
    const buildSommets = () => {
        return sommets.map((sommet) =>

            <Marker
                key={sommet.id}
                position={[sommet.position.lng, sommet.position.lat]}
                icon={sommet.isEnd ?  Lines[sommet.ligne].mainIcon : Lines[sommet.ligne].secondaryIcon}
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
     * Function used to build path between depart and destination vertexes.
     */
    const buildPath = () => {
        if (props.path === undefined)
            return;
        const [pcc, poids] = props.path
        const paths: Array<JSX.Element> = [];
        for (let i = 1; i < pcc.length; i++) {
            const sommet = pcc[i];
            const previousSommet = pcc[i - 1];
            paths.push(
                <Polyline
                    key={i}
                    positions={[
                        [sommet.position.lng, sommet.position.lat],
                        [previousSommet.position.lng, previousSommet.position.lat]
                    ]}
                    className={"path-line"}
                    color={"#990000"}
                />
            );
        }
        return paths;
    }
    const buildLinePath = () => {
        const paths: Array<JSX.Element> = [];
        if (sommets === undefined)
            return paths;
        return paths;
    }


    return (
        <>
            <div className="mapContainer">
                <MapContainer id="mapId"
                              center={mapCenteringPos}
                              zoom={zoom}
                              style={{ height: '100vh', width: '100wh' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                    {sommets ? buildSommets() : null}
                    {sommets ? buildLinePath() : null}
                    {props.path ? buildPath() : null}
                </MapContainer>
            </div>
        </>
    )
}