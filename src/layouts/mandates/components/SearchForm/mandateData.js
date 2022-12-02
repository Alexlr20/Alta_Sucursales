/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import StatusDialog from "./dialogs/StatusDialog";
import DetailDialog from "./dialogs/DetailDialog";

export default function mandateData() {
  const [tasks, setTasks] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("http://localhost:8000/mandates", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((t) => {
        setTasks(t);
        // setIsPending(false);
        // setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // eslint-disable-next-line no-console
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          // setIsPending(false);
          // setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, []);

  // console.log(tasks);

  const TableFiller = ({ name, calle }) => (
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

  const DatesSelect = ({ dias }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption" fontWeight="medium">
        {dias}
      </MDTypography>
    </MDBox>
  );

  const newRows = tasks.map((elem) => ({
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

  // console.log(newRows);
  return {
    columns: [
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
    ],
    rows: newRows,
  };
}
