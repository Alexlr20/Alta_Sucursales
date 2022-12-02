/* eslint-disable react/prop-types */
import React from "react";

export default function DataTable({ data }) {
  const cleanedUpData = data.map((elem) => ({
    id: elem.id,
    tipo: elem.tipo,
    nombre: elem.nombre,
    cant: elem.cant,
    detalles: elem.detalles,
    fechas: `${elem.fecha_inicial} - ${elem.fecha_final}`,
    horas: `${elem.hora_inicial} - ${elem.hora_final}`,
    dias: elem.dias,
    visto: elem.visto,
    status: elem.status,
    detalle: elem.detalle,
  }));
  
  console.log(cleanedUpData);
  //   e.id,
  //   e.tipo,
  //   e.nombre,
  //   e.cant,
  //   e.detalles,
  //   e.dias,
  //   e.visto,
  //   e.status,
  //   e.detalle,
  // ]);

  // const combinedDates = data.map((e) => [e.fecha_inicial, e.fecha_final]);
  // const combinedHours = data.map((e) => [e.hora_inicial, e.hora_final]);
  // console.log(combinedDates);
  // console.log(combinedHours);

  // const filteredData = data.filter(e => e.fecha_final);
  // const filteredData = data.filter(e => Object.keys(e).toString().includes('fecha_inicial'))
  // console.log(filteredData);

  const columns = data[0] && Object.keys(cleanedUpData[0]);

  return (
    <table>
      <thead>
        <tr>{cleanedUpData[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
