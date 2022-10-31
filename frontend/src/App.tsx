import './css/App.css'
import {MapPage} from "./pages/Map/MapPage";
import React, {ChangeEvent} from "react";
import Sommet from "./Types/Sommet";
import {getAllSommets, getPcc, getACPM} from "./data/sommet";
import {Lines} from "./components/Lines";
import {fmtMSS} from "./utils/utils";

function App() {

    const [depart, setDepart] = React.useState<Sommet>();
    const [destination, setDestination] = React.useState<Sommet>();
    const [pcc, setPcc] = React.useState<[Array<Sommet>, number]>();
    const [sommets, setSommets] = React.useState<Array<Sommet>>([]);
    const [acpm, setAcpm] = React.useState<[Array<Sommet>, number]>();
    const [adjacents, setAdjacents] = React.useState<Sommet[][]>(new Array<Sommet[]>());

    React.useEffect(() => {
        getAllSommets()
            .then((result) => {
                setSommets(result.sommets);
                setAdjacents(result.adjacents);
            })
            .catch((error) => console.log(error));
    }, []);

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
    const clearPcc = () => {
        setDepart(undefined);
        setDestination(undefined);
        setPcc(undefined);
    }

    /**
     * Function used to clear pcc and acpm states
     */
    const clearAll = () => {
        clearPcc();
        setAcpm(undefined);
    }

    /**
     * Function used to call pcc fetching service
     */
    const getPath = async () => {
        if (depart === undefined || destination === undefined)
            return;
        if (acpm)
            return;
        getPcc(depart, destination)
            .then((pcc) => setPcc(pcc))
            .catch((error) => console.log(error));
    }

    /**
     * Function used to call apcm fetching service
     */
    const getPathFromACPM = async () => {
        clearPcc();
        getACPM()
            .then((acpm) => setAcpm(acpm))
            .catch((error) => console.log(error));
    }


    /**
     * Function used to build path explications
     * @param sommets A list of the vertexes to explain
     * @param poids The weight of the path
     * @returns The path explications in a JSX Element
     */
    const buildPathExplications = (sommets: Array<Sommet>, poids: number) => {
        let ligne = sommets[0].ligne;
        let tour = 0, i= 0;

        const jsx = sommets.map((sommet) => {
            let ligneChanged = false;
            if (sommet.ligne !== ligne){
                ligneChanged = true;
                ligne = sommet.ligne;
            }
            return(
                <div key={i++} className={"path-explication-sommet"}>
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

    /**
     * Function used to build the select options for the depart and destination select
     * @returns Options in list of JSX Elements
     */
    const buildSelectOptions = () => {
        const options = sommets.map(sommet=> <option key={sommet.id} value={sommet.id}>{`${sommet.name} - ${sommet.ligne}`}</option>);
        options.splice(0, 0, <option key={"default"} value={""}>Choisissez une station</option>);
        return options;
    }

    /**
     * Function used to handle depart and destination select change
     * @param e The event triggered by the select
     * @param setter The setter used to set the state. It corresponds to the select that triggered the event
     * @param otherChoice The other select choice. It is used to stop the event if the user chooses the same station
     */
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>, setter: (s: Sommet | undefined) => void, otherChoice: Sommet | undefined) => {
        if (e.target.value === "" ) {
            setter(undefined);
            return;
        }
        const foundSommet = sommets[parseInt(e.target.value)];
        if (foundSommet?.id === otherChoice?.id)
            return;
        setter(foundSommet);
    }

    return (
        <>
            <div className="input-container">
                <select value={`${depart?.id}` ?? ""} onChange={(e) => {handleSelectChange(e, setDepart, destination)}}>
                    {buildSelectOptions()}
                </select>
                <select value={`${destination?.id}` ?? ""} onChange={(e) => {handleSelectChange(e, setDestination, depart)}}>
                    {buildSelectOptions()}
                </select>
                <button onClick={getPath}>Recherche</button>
                <button onClick={clearAll}>❌</button>
                <button onClick={() => acpm ? setAcpm(undefined) : getPathFromACPM()}>ACPM</button>
            </div>
            <div className="map-path-description-container">
                <MapPage setSommet={setDepartOrDestination} path={pcc} sommets={sommets} adjacents={adjacents} acpm={acpm}/>
                <div className="path-description-container">
                    {pcc ? buildPathExplications(pcc[0], pcc[1]) : null}
                    {acpm ? buildPathExplications(acpm[0], acpm[1]) : null}
                </div>
            </div>

        </>
    )
}

export default App