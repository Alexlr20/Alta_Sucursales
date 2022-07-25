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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
// import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";

// const Days = {
//   Lunes: 0,
//   Martes: 1,
//   Mierocles: 2,
//   Jueves: 3,
//   Viernes: 4,
//   Sabado: 5,
//   Domingo: 6,
// };

export default function data() {
  const TableFiller = ({ image, name, calle }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={-1} lineHeight={1}>
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

  // eslint-disable-next-line no-empty-pattern
  const StatusButton = ({}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton>
        <Icon fontSize="small" color="info">
          lock
        </Icon>
      </MDButton>
    </MDBox>
  );

  // eslint-disable-next-line no-empty-pattern
  const AttachedDocButton = ({}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton>
        <Icon fontSize="small" color="info">
          note_add
        </Icon>
      </MDButton>
    </MDBox>
  );

  // eslint-disable-next-line no-empty-pattern
  const NotesButton = ({}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton>
        <Icon fontSize="small" color="info">
          description
        </Icon>
      </MDButton>
    </MDBox>
  );

  // eslint-disable-next-line no-empty-pattern
  const DetailsButton = ({}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton>
        <Icon fontSize="small" color="info">
          add_circle{" "}
        </Icon>
      </MDButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Tipo", accessor: "Tipo", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "center" },
      { Header: "Cant", accessor: "Cant", align: "center" },
      { Header: "Detalles", accessor: "Detalles", align: "center" },
      { Header: "Fechas", accessor: "Fechas", align: "center" },
      { Header: "Horario", accessor: "Horario", align: "center" },
      { Header: "Dias", accessor: "Dias", align: "center" },
      { Header: "Visto", accessor: "Visto", align: "center" },
      { Header: "Status", accessor: "Status", align: "center" },
      { Header: "Adjuntos", accessor: "Adjuntos", align: "center" },
      { Header: "Notas", accessor: "Notas", align: "center" },
      { Header: "Aceptado", accessor: "Aceptado", align: "center" },
    ],

    rows: [
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-14" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusButton status="candado" />,
        Adjuntos: <AttachedDocButton adjuntos="doc" />,
        Notas: <NotesButton notas="notas" />,
        Aceptado: <DetailsButton aceptado="aceptado" />,
      },
    ],
  };
}
