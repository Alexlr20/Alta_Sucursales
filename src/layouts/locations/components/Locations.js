import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import React from "react";

function LocationRow({ name, calle, handleShowEdit, setLocationIdToUpdate, id, handleShowDelete, setLocationIdToDelete }) {
  return (
    <MDBox style={{display: "grid", gridTemplateColumns: "9fr 1fr"}}>
      <div>
        <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
        <MDTypography variant="caption">{calle}</MDTypography>
      </div>

      <div style={{display: "flex", gap: "1rem", alignSelf: "center"}}>
        <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer" }} onClick={() => {
          handleShowEdit();
          console.log('LOCATIONIDTOUPDATEINACTIONBUTTONS -> ',id);
          setLocationIdToUpdate(id);
        }} />
        <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }}
        onClick={() => {
          handleShowDelete();
          setLocationIdToDelete(id)
        }} 
        />
      </div>
    </MDBox>
  );
}
export default function Locations({ locations, searchInput, handleShowEdit, setLocationIdToUpdate, handleShowDelete, setLocationIdToDelete }) {
  const columns = [{ Header: "", accessor: "dirección", align: "left" }];

  const filteredRows = locations.filter(
    (e) =>
      e.nombre_sucursal.toLowerCase().indexOf(searchInput.toLowerCase()) > -1 ||
      e.direccion.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
  );

  const rows = filteredRows.map((elem) => ({
    dirección: <LocationRow handleShowEdit={handleShowEdit} name={elem.nombre_sucursal} calle={elem.direccion} setLocationIdToUpdate={setLocationIdToUpdate} id={elem.id} handleShowDelete={handleShowDelete} setLocationIdToDelete={setLocationIdToDelete}/>,
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
