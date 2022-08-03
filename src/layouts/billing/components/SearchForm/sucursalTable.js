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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import StatusDialog from "./dialogs/StatusDialog";
import AttachedDialog from "./dialogs/AttachedDialog";
import NotesDialog from "./dialogs/NotesDialog";
import DetailDialog from "./dialogs/DetailDialog";

export default function data() {
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
      { Header: "Adjuntos", accessor: "Adjuntos", align: "left" },
      { Header: "Notas", accessor: "Notas", align: "left" },
      { Header: "Detalle", accessor: "Detalle", align: "left" },
    ],

    rows: [
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_0" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_0" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_0" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_0"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_1" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_1" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_1" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_1"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_2" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_2" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_2" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_2"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_3" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_3" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_3" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_3"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_4" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_4" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_4" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_4"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_5" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_5" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_5" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_5"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_6" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_6" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_6" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_6"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_7" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_7" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_7" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_7"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_8" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_8" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_8" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_8"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_9" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_9" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_9" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_9"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_10" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_10" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_10" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_10"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_11" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_11" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_11" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_11"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_12" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_12" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_12" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_12"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_13" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_13" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_13" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_13"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
      {
        Tipo: <TableFiller name="Acciones Operativas" />,
        Nombre: <TableFiller name="Vestimenta" />,
        Cant: <TableFiller name="0" />,
        Detalles: <TableFiller name="Chequeo de vestimenta" />,
        Fechas: <TableFiller name="2020-04-14" calle="2020-04-20" />,
        Horario: <TableFiller name="10:00:00" calle="13:00:00" />,
        Dias: <DatesSelect dias="dias" />,
        Visto: <TableFiller name="--" />,
        Status: <StatusDialog status="candado" id="status_id_14" textValue="" />,
        Adjuntos: <AttachedDialog adjuntos="doc" id="attached_id_14" textValue="" />,
        Notas: <NotesDialog notas="notas" id="notes_id_14" textValue="" />,
        Detalle: (
          <DetailDialog
            detalle="detalle"
            id="detail_id_14"
            textValue=""
            fechaInicial="2020-04-14"
            fechaFinal="2020-04-20"
            horaInicial="10:00:00"
            horaFinal="13:00:00"
          />
        ),
      },
    ],
  };
}
