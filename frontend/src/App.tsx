import './css/App.css'
import {Map} from "./pages/Map/Map";
import React from "react";
import Sommet from "./Types/Sommet";
import {getPcc, getACPM} from "./data/sommet";

function App() {

    const [depart, setDepart] = React.useState<Sommet>();
    const [destination, setDestination] = React.useState<Sommet>();
    const [pathToBuild, setPathToBuild] = React.useState<[Array<Sommet>, number]>();

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
    }
    
    const createRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const button = event.currentTarget;

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        return (<span
            style={{
                width: radius,
                height: radius,
                left: `${event.clientX - button.offsetLeft - radius}px`,
                top: `${event.clientY - button.offsetTop - radius}px`
            }}
            className={"ripple"}
        />)
    }

    /**
     * Function used to call fetching service/function
     */
    const getPathFromPCC = async () => {
        if (depart === undefined || destination === undefined)
            return;
        getPcc(depart, destination)
            .then((pcc) => setPathToBuild(pcc))
            .catch((error) => console.log(error));
    }

    /**
     * Function used to get MST weight and path by fetching service/function
     */
    const getPathFromACPM = async () => {
        getACPM()
            .then((acpm) => setPathToBuild(acpm))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <div className="input-container">
                <input type="select" value={depart?.name ?? ""} onChange={() => {}}/>
                <input type="select" value={destination?.name ?? ""} onChange={() => {}}/>
                <button onClick={getPathFromPCC}>Recherche</button>
                <button onClick={clearDD}>❌</button>
                <button onClick={getPathFromACPM}>ACPM</button>
            </div>
            <Map setSommet={setDepartOrDestination} path={pathToBuild}/>
        </>
    )
}

export default App