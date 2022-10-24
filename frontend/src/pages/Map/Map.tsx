import "./style/Map.css"
import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import 'leaflet/dist/leaflet.css';
import Sommet from "../../Types/Sommet";
import {getAllSommets} from "../../data/sommet";
import {l1Icon, l2Icon, l7Icon, l7bIcon, l11Icon, l10Icon, l12Icon, l13Icon, l14Icon, l3bIcon, l3Icon, l4Icon, l6Icon, l8Icon, l9Icon, l5Icon } from "../../components/LineIcon";

const zoom:number = 13.45;

const mapCenteringPos:LatLngTuple = [48.864211, 2.380104];
const ICONS = [l1Icon, l2Icon, l3Icon, l4Icon, l5Icon, l6Icon, l7Icon, l8Icon, l9Icon, l10Icon, l11Icon, l12Icon, l13Icon, l14Icon];

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
    const buildSommets = () => {
        return sommets.map((sommet) =>

            <Marker
                key={sommet.id}
                position={[sommet.position.y, sommet.position.x]}
                icon={ICONS.at(sommet.ligne-1)}
                eventHandlers={{
                    click: (e) => {
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

    const handleSommetClick = (sommet: Sommet) => {
        props.setSommet(sommet);
    };

    const buildPath = () => {
        console.log("heres")
        if (props.path === undefined)
            return;
        console.log("hre")
        const [pcc, poids] = props.path
        console.log(pcc)
        const paths: Array<JSX.Element> = [];
        for (let i = 1; i < pcc.length; i++) {
            const sommet = pcc[i];
            const previousSommet = pcc[i - 1];
            paths.push(
                <Polyline
                    key={i}
                    positions={[
                        [sommet.position.y, sommet.position.x],
                        [previousSommet.position.y, previousSommet.position.x]
                    ]}
                    className={"path-line"}
                    color={"red"}
                />
            );
        }
        console.log(paths);
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
                    {buildSommets()}
                    {props.path ? buildPath() : null}
                </MapContainer>
            </div>
        </>
    )
}