/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";

import StateTable from "./components/StateTable";
import AddState from "./components/AddState";
import { StatusDropdown } from "./components/StatusDropdown";

export function State() {
  const [allStates, setAllStates] = useState([]);
  const [statusValue, setStatusValue] = useState('nonSuspended');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const abortCont = new AbortController();

    if (statusValue === 'nonSuspended') {
      axios
        .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php")
        .then((response) => {
          const { data } = response;
          const { estado } = data;
          setAllStates(estado);
        })
        .catch((error) => {
          if (error === "AbortError") {
            console.log(error);
          }
        });
    }

    if (statusValue === 'suspended') {
      axios
        .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php?suspended=1")
        .then((response) => {
          const { data } = response;
          const { estado } = data;
          setAllStates(estado);
        })
        .catch((error) => {
          if (error === "AbortError") {
            console.log(error);
          }
        });
    }

    if (statusValue === 'all') {
      axios
        .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php?all=1")
        .then((response) => {
          const { data } = response;
          const { estado } = data;
          setAllStates(estado);
        })
        .catch((error) => {
          if (error === "AbortError") {
            console.log(error);
          }
        });
    }
    return () => abortCont.abort();
  }, [refresh, statusValue]);


  return (
    <div>
      <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%", columnGap: "1rem" }}>
        <AddState handleRefresh={handleRefresh} />
        <Box sx={{ marginRight: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box style={{ width: "25%", alignSelf: "flex-end" }}>
            <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
          </Box>
          {allStates && (
            <StateTable
              allStates={allStates}
              handleRefresh={handleRefresh}
              style={{ overflowY: "scroll" }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default State;
