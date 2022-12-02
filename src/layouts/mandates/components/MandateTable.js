/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DetailDialog from "layouts/personal/data/dialogs/DetailDialog";
import StatusDialog from "layouts/personal/data/dialogs/StatusDialog";
import React, { useLayoutEffect, useRef } from "react";

// import mandateData from "../SearchForm/mandateData";

// eslint-disable-next-line react/prop-types
export default function MandateTable({ setWidthOfTable, tasks }) {
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
  function DatesSelect({ dias }) {
    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography variant="caption" fontWeight="medium">
          {dias}
        </MDTypography>
      </MDBox>
    );
  }

  const columns = [
    { Header: "Tipo", accessor: "Tipo", align: "left" },
    { Header: "Nombre", accessor: "Nombre", align: "left" },
    { Header: "Cant", accessor: "Cant", align: "left" },
    { Header: "Detalles", accessor: "Detalles", align: "left" },
    { Header: "Fechas", accessor: "Fechas", align: "left" },
    { Header: "Horario", accessor: "Horario", align: "left" },
    { Header: "Dias", accessor: "Dias", align: "left" },
    { Header: "Visto", accessor: "Visto", align: "left" },
    { Header: "Status", accessor: "Status", align: "left" },
    { Header: "Detalle", accessor: "Detalle", align: "left" },
  ];

  const rows = tasks.map((elem) => ({
    Tipo: <TableFiller name={elem.tipo} />,
    Nombre: <TableFiller name={elem.nombre} />,
    Cant: <TableFiller name={elem.cant} />,
    Detalles: <TableFiller name={elem.detalles} />,
    Fechas: <TableFiller name={elem.fecha_inicial} calle={elem.fecha_final} />,
    Horario: <TableFiller name={elem.hora_inicial} calle={elem.hora_final} />,
    Dias: <DatesSelect dias={elem.dias} />,
    Visto: <TableFiller name={elem.visto} />,
    Status: <StatusDialog status="candado" id="status_id_0" textValue="" />,
    Detalle: (
      <DetailDialog
        detalle="detalle"
        id="elem.id"
        textValue=""
        fechaInicial="fechacreacion"
        fechaFinal="fechacreacion2"
        horaInicial="horacreacion"
        horaFinal="horacreacion2"

        // fechaCreacion="fechainicial - hora"
        // fechaModificacion="fechademod - horamod"
        // fechaTerminado="fechaterminada - horaterminada"
        // fechaAutorizacion="fechaautorizacion - horaautorizacion"
      />
    ),
  }));

  const widthRef = useRef(null);

  useLayoutEffect(() => {
    setWidthOfTable(widthRef.current.offsetWidth);
  });

  return (
    <Card ref={widthRef}>
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
