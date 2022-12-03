/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
// import StatusDialog from "layouts/personal/data/dialogs/StatusDialog";
import React from "react";

// import mandateData from "../SearchForm/mandateData";

// eslint-disable-next-line react/prop-types
export const ActionButtons = ({ id, handleShowEdit, setIdToUpdate, setEmployeeIsUser, isUser }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", alignSelf: "center", justifyContent: "center" }}>
      <FontAwesomeIcon icon={faPenToSquare} size="sm" style={{ cursor: "pointer" }}
        onClick={() => {
          console.log('IDDD ->>> ', id);
          console.log('ISUSER? ->>', isUser);
          setEmployeeIsUser(isUser);
          setIdToUpdate(id);

          handleShowEdit()
        }}
      />
      <FontAwesomeIcon icon={faTrash} size="sm" style={{ cursor: "pointer" }}
      // onClick={handleShowDelete} 
      />
    </div>
  )
}

export default function PersonalTable({ personal, handleShowEdit, setIdToUpdate, setEmployeeIsUser}) {
  // const { columns, rows } = mandateData();

  // eslint-disable-next-line react/no-unstable-nested-components
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

  // eslint-disable-next-line react/no-unstable-nested-components
  // function DatesSelect({ dias }) {
  //   return (
  //     <MDBox lineHeight={1} textAlign="left">
  //       <MDTypography variant="caption" fontWeight="medium">
  //         {dias}
  //       </MDTypography>
  //     </MDBox>
  //   );
  // }

  const columns = [
    { Header: "ID", accessor: "ID", align: "left" },
    { Header: "Nombre completo", accessor: "NombreCompleto", align: "left" },
    { Header: "Telefono", accessor: "Telefono", align: "left" },
    { Header: "Area", accessor: "Area", align: "left" },
    { Header: "Usuario", accessor: "Usuario", align: "left" },
    { Header: "Acciones", accessor: "Acciones", align: "left" },
  ];

  const rows = personal.map((elem) => ({
    // Tipo: <TableFiller name={elem.tipo} />,
    ID: <TableFiller name={elem.id} />,
    NombreCompleto: <TableFiller name={`${elem.nombre} ${elem.ap_paterno} ${elem.ap_materno}`} />,
    Telefono: <TableFiller name={elem.telefono} />,
    Area: <TableFiller name={elem.area} />,
    Usuario: <TableFiller name={elem.id_usuario !== null ? "Si" : "No"} />,
    Acciones: <ActionButtons id={elem.id} handleShowEdit={handleShowEdit} setIdToUpdate={setIdToUpdate} setEmployeeIsUser={setEmployeeIsUser} isUser={elem.id_usuario !== null}/>

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
