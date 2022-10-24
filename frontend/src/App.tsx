import './css/App.css'
import {Map} from "./pages/Map/Map";
import React from "react";
import Sommet from "./Types/Sommet";
import {getPcc} from "./data/sommet";

function App() {

    const [depart, setDepart] = React.useState<Sommet>();
    const [destination, setDestination] = React.useState<Sommet>();
    const [pcc, setPcc] = React.useState<[Array<Sommet>, number]>();
    const setDepartOrDestination = (sommet: Sommet) => {
        if (depart === undefined)
            setDepart(sommet);
        else
            setDestination(sommet);
    }

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
    const getPath = async () => {
        if (depart === undefined || destination === undefined)
            return;
        getPcc(depart, destination)
            .then((pcc) => setPcc(pcc))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <div className="input-container">
                <input type="select" value={depart?.name ?? ""} onChange={() => {}}/>
                <input type="select" value={destination?.name ?? ""} onChange={() => {}}/>
                <button onClick={getPath}>Recherche</button>
                <button onClick={clearDD}>❌</button>
            </div>
            <Map setSommet={setDepartOrDestination} path={pcc}/>
        </>
    )
}

export default App