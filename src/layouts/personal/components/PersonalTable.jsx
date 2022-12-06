import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React from "react";

export const ActionButtons = ({ id, handleShowEdit, setIdToUpdate, setEmployeeIsUser, isUser, handleShowDelete, setIdToDelete }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", alignSelf: "center", justifyContent: "center" }}>
      <FontAwesomeIcon icon={faPenToSquare} size="sm" style={{ cursor: "pointer" }}
        onClick={() => {
          setEmployeeIsUser(isUser);
          setIdToUpdate(id);
          handleShowEdit()
        }}
      />
      <FontAwesomeIcon icon={faTrash} size="sm" style={{ cursor: "pointer" }}
        onClick={() => {
          console.log('ID IN DELETEEE ->>>>>', id);
          setIdToDelete(id)
          handleShowDelete();
        }} 
      />
    </div>
  )
}

export default function PersonalTable({ personal, handleShowEdit, setIdToUpdate, setEmployeeIsUser, handleShowDelete, setIdToDelete}) {
  function TableFiller({ name, calle }) {
    return (
      <MDBox width={60} display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={0} lineHeight={1} sx={{ zIndex: 1 }}>
          <MDTypography display="block" variant="caption" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium">
            {calle}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }

  const columns = [
    { Header: "ID", accessor: "ID", align: "left" },
    { Header: "Nombre completo", accessor: "NombreCompleto", align: "left" },
    { Header: "Telefono", accessor: "Telefono", align: "left" },
    { Header: "Area", accessor: "Area", align: "left" },
    { Header: "Usuario", accessor: "Usuario", align: "left" },
    { Header: "Acciones", accessor: "Acciones", align: "left" },
  ];

  const rows = personal.map((elem) => ({
    ID: <TableFiller name={elem.id} />,
    NombreCompleto: <TableFiller name={`${elem.nombre} ${elem.ap_paterno} ${elem.ap_materno}`} />,
    Telefono: <TableFiller name={elem.telefono} />,
    Area: <TableFiller name={elem.area} />,
    Usuario: <TableFiller name={elem.id_usuario !== null ? "Si" : "No"} />,
    Acciones:
    <ActionButtons
      id={elem.id}
      handleShowEdit={handleShowEdit}
      setIdToUpdate={setIdToUpdate}
      setEmployeeIsUser={setEmployeeIsUser}
      isUser={elem.id_usuario !== null}
      handleShowDelete={handleShowDelete}
      setIdToDelete={setIdToDelete}
    />

  }));

  return (
    <Card>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </Card>
  );
}
