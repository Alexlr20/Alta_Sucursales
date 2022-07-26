/* eslint-disable react/prop-types */
export default class CatalogRepository {
  // eslint-disable-next-line class-methods-use-this
  getCountries() {
    return {
      columns: [
        { Header: "Number", accessor: "Number" },
        { Header: "Nombre", accessor: "Nombre" },
        { Header: "Codigo", accessor: "Codigo" },
        { Header: "Acciones", accessor: "Acciones", align: "center" },
      ],

      rows: [
        {
          Number: "5",
          Nombre: "Nombre",
          Codigo: "Code",
          // map: <Map />,
        },
      ],
    };
  }

  //   getStates() {
  //     return {
  //       columns: [
  //         { Header: "Number", accessor: "Number" },
  //         { Header: "Nombre", accessor: "Nombre" },
  //         { Header: "Codigo", accessor: "Codigo" },
  //         { Header: "Acciones", accessor: "Acciones", align: "center" },
  //       ],

  //       rows: [
  //         {
  //           Number: "5",
  //           Nombre: "Nombre",
  //           Codigo: "Code",
  //           // map: <Map />,
  //         },
  //       ],
  //     };
  //   }
}
