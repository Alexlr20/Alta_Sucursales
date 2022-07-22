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
// import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";

export default function data() {
  const InsertData = ({ image, name, calle }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={-1} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{calle}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Number", accessor: "Number" },
      { Header: "Nombre", accessor: "Nombre" },
      { Header: "Codigo", accessor: "Codigo" },
      { Header: "Acciones", accessor: "Acciones" },
    ],

    rows: [
      {
        Number: <InsertData name="1" />,
        Nombre: <InsertData name="Nombre" />,
        Codigo: <InsertData name="Codigo" />,
        Acciones: <InsertData name="Acciones" />,
        // map: <Map />,
      },
    ],
  };
}
