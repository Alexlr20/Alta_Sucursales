/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box } from '@material-ui/core';
import CityTable from './components/CityTable';
import AddCity from './components/AddCity';
import { StateDropdown } from './components/StateDropdown';
import { StatusDropdown } from './components/StatusDropdown';



export function City() {
    const [allCities, setAllCities] = useState([]);
    // const [pendingCities, setAllPendingCities] = useState(true);
    // const [citiesError, setAllCitiesError] = useState(null);

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    const [statusValue, setStatusValue] = useState('nonSuspended');
    const [stateValue, setStateValue] = useState('all');

    useEffect(() => {
        const abortCont = new AbortController();

        if (stateValue === 'all' && statusValue === 'nonSuspended') {
            // console.log('DEFAULTTT');
            axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php')
                .then((response) => {
                    const { data } = response;
                    const { ciudad } = data;
                    console.log('DATA IN AXIOS GET',ciudad);
                    // setAllPendingCities(false);
                    setAllCities(ciudad);
                    // setAllCitiesError(null);
                }
                )
                .catch((error) => {
                    if (error === 'AbortError') {
                        console.log(error);
                    }
                });
            }
            
            // Id, byStateId, nonSuspended
            if(stateValue != 'all' && statusValue === 'nonSuspended'){
                console.log('VALORDESTATEVALUEEE',stateValue);
                axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?id=${stateValue}&suspended=1`)
                    .then((response) => {
                        const { data } = response;
                        const { ciudad } = data;
                        console.log('DATA IN AXIOS GET',data);
                        // setAllPendingCities(false);
                        setAllCities(ciudad);
                        // setAllCitiesError(null);
                    }
                    )
                    .catch((error) => {
                        if (error === 'AbortError') {
                            console.log(error);
                        }
                    });
            }

            if(stateValue === 'all' && statusValue === 'suspended'){
                axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?all=1&suspended=1')
                    .then((response) => {
                        const { data } = response;
                        const { ciudad } = data;
                        console.log('DATA IN AXIOS GET',data);
                        // setAllPendingCities(false);
                        setAllCities(ciudad);
                        // setAllCitiesError(null);
                    }
                    )
                    .catch((error) => {
                        if (error === 'AbortError') {
                            console.log(error);
                        }
                    });
            }
            

        return () => abortCont.abort();
    }, [refresh, statusValue, stateValue]);

    return (
        <div>
            <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%", columnGap: "1rem" }}>
                <AddCity handleRefresh={handleRefresh} refresh={refresh} />

                <Box sx={{ marginRight: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {/* {pendingCities && <div>Loading...</div>} */}
                    {/* {citiesError && <div>Error</div>} */}
                    <Box style={{ display: "flex", gap: "1rem", alignSelf: "flex-end", width: "50%" }}>
                        <StateDropdown stateValue={stateValue} setStateValue={setStateValue} />
                        <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
                    </Box>
                    {allCities && <CityTable allCities={allCities} handleRefresh={handleRefresh} style={{ overflowY: "scroll" }} />}
                </Box>
            </Box>
        </div>
    )
}

export default City;

