import './css/App.css'
import {MapPage} from "./pages/Map/MapPage";
import React from "react";
import Sommet from "./Types/Sommet";
import {getPcc} from "./data/sommet";
import {Lines} from "./components/Lines";
import {fmtMSS} from "./utils/utils";

function App() {

    const [depart, setDepart] = React.useState<Sommet>();
    const [destination, setDestination] = React.useState<Sommet>();
    const [pcc, setPcc] = React.useState<[Array<Sommet>, number]>();

    /**
     * Function used to set depart or destination. If depart is not set, depart will first be initialised.
     * Destination will then be initialised. If both are initialised, destination will be replaced.
     * @param sommet The vertex used to be init.
     */
    const setDepartOrDestination = (sommet: Sommet) => {
        if (depart === undefined)
            setDepart(sommet);
        else
            setDestination(sommet);
    }

    /**
     * Function used to clear depart and destination states
     */
    const clearDD = () => {
        setDepart(undefined);
        setDestination(undefined);
        setPcc(undefined);
    }

    /**
     * Function used to call pcc fetching service
     */
    const getPath = async () => {
        if (depart === undefined || destination === undefined)
            return;
        getPcc(depart, destination)
            .then((pcc) => setPcc(pcc))
            .catch((error) => console.log(error));
    }


    const buildPathExplications = (sommets: Array<Sommet>, poids: number) => {
        let ligne = sommets[0].ligne;
        let tour = 0;

        const jsx = sommets.map((sommet) => {
            let ligneChanged = false;
            if (sommet.ligne !== ligne){
                ligneChanged = true;
                ligne = sommet.ligne;
            }
            return(
                <div key={tour} className={"path-explication-sommet"}>
                    <p className={"path-explication-sommet-name"}>{sommet.name}</p>
                    {ligneChanged || tour++ === 0 ? <img src={Lines[sommet.ligne].img} className={"path-explication-sommet-ligne"} alt={sommet.ligne}/> : null}
                </div>
            )
        })
        return (
            <>
                <div className={"path-explication-container"}>
                    {jsx}
                </div>
                <p className={"path-explication-poids"}>Temps total : {fmtMSS(poids)} min</p>
            </>
        );
    }

    return (
        <>
            <div className="input-container">
                <input type="select" value={depart?.name ?? ""} onChange={() => {}}/>
                <input type="select" value={destination?.name ?? ""} onChange={() => {}}/>
                <button onClick={getPath}>Recherche</button>
                <button onClick={clearDD}>❌</button>
            </div>
            <div className="map-path-description-container">
                <MapPage setSommet={setDepartOrDestination} path={pcc}/>
                <div className="path-description-container">
                    {pcc ? buildPathExplications(pcc[0], pcc[1]) : null}
                </div>
            </div>

        </>
    )
}

export default App