import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import AddRoadType from "./components/AddRoadType";
import RoadTypeTable from "./components/RoadTypeTable";
import { StatusDropdown } from "./components/StatusDropdown";

export function RoadType() {
  const [allRoadTypes, setAllRoadTypes] = useState([]);
  const [statusValue, setStatusValue] = useState('nonSuspended');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    const abortCont = new AbortController();

    if (statusValue === 'nonSuspended') {
      axios.get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php")
        .then((response) => {
          const { data } = response;
          const { tipo_vialidad } = data;
          setAllRoadTypes(tipo_vialidad);
        })
        .catch((error) => {
          if (error === "AbortError") console.log(error);
        });
    }

    if (statusValue === 'suspended') {
      axios.get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php?suspended=1")
        .then((response) => {
          const { data } = response;
          const { tipo_vialidad } = data;
          setAllRoadTypes(tipo_vialidad);
        })
        .catch((error) => {
          if (error === "AbortError") console.log(error);
        });
    }

    if (statusValue === 'all') {
      axios.get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php?all=1")
        .then((response) => {
          const { data } = response;
          const { tipo_vialidad } = data;
          setAllRoadTypes(tipo_vialidad);
        })
        .catch((error) => {
          if (error === "AbortError") console.log(error);
        });
    }

    return () => abortCont.abort();
  }, [refresh, statusValue]);

  return (
    <div>
      <Box sx={{ display: "grid", gridTemplateColumns: "30% 70%", columnGap: "1rem" }}>
        <AddRoadType handleRefresh={handleRefresh} />
        <Box sx={{ marginRight: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box style={{ width: "25%", alignSelf: "flex-end" }}>
            <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
          </Box>
          {allRoadTypes && (
            <RoadTypeTable
              allRoadTypes={allRoadTypes}
              handleRefresh={handleRefresh}
              style={{ overflowY: "scroll" }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default RoadType;
