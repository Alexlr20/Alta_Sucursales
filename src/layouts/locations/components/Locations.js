import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import React from "react";

function LocationRow({ name, calle, handleShowAdd }) {
  return (
    <MDBox style={{display: "grid", gridTemplateColumns: "9fr 1fr"}}>
      <div>
        <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
        <MDTypography variant="caption">{calle}</MDTypography>
      </div>

      <div style={{display: "flex", gap: "1rem", alignSelf: "center"}}>
        <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer" }} onClick={handleShowAdd} />
        <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }}
        // onClick={handleShowDelete} 
        />
      </div>
    </MDBox>
  );
}
export default function Locations({ locations, searchInput, handleShowAdd }) {
  const columns = [{ Header: "", accessor: "dirección", align: "left" }];

  const filteredRows = locations.filter(
    (e) =>
      e.nombre_sucursal.toLowerCase().indexOf(searchInput.toLowerCase()) > -1 ||
      e.direccion.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
  );

  const rows = filteredRows.map((elem) => ({
    dirección: <LocationRow handleShowAdd={handleShowAdd} name={elem.nombre_sucursal} calle={elem.direccion} />,
  }));

  return (
    <MDBox pt={2}>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </MDBox>
  );
}
