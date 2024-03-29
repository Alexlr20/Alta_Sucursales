import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box } from '@material-ui/core';
import AddLocality from './components/AddLocalities';
import LocalityTable from './components/LocalityTable';
import { StateDropdown } from '../Cities/components/StateDropdown';
import { StatusDropdown } from './components/StatusDropdown';
import { CityDropdown } from './components/CityDropdown';


export function Locality() {
    const [statusValue, setStatusValue] = useState('nonSuspended');
    const [stateValue, setStateValue] = useState('all');
    const [cityValue, setCityValue] = useState('all');
    const [allLocalities, setAllLocalities] = useState([]);
    
    const [refresh, setRefresh] = useState(false);
    const handleRefresh = () => setRefresh(prev => !prev);

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/read.php')
            .then((response) => {
                const { data } = response;
                const { colonia } = data;
                setAllLocalities(colonia);
            })
            .catch((error) => {
                if (error === 'AbortError') console.log(error);
            });
        return () => abortCont.abort();
    }, [refresh]);

    return (
        <div>
            <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%", columnGap: "1rem" }}>
                <AddLocality handleRefresh={handleRefresh} refresh={refresh} />
                <Box sx={{ marginRight: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Box style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", width: "75%", alignSelf: "flex-end"}}>
                        <StateDropdown stateValue={stateValue} setStateValue={setStateValue} />
                        <CityDropdown cityValue={cityValue} setCityValue={setCityValue} />
                        <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
                    </Box>
                    {allLocalities && <LocalityTable allLocalities={allLocalities} handleRefresh={handleRefresh} style={{ overflowY: "scroll" }} />}
                </Box>
            </Box>
        </div>
    )
}

export default Locality;

