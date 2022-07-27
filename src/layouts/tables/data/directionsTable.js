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
  const Author = ({ image, name, calle }) => (
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

  return {
    columns: [{ Header: "", accessor: "dirección", align: "left" }],

    rows: [
      {
        dirección: (
          <Author
            name="Plaza Cumbres"
            calle="Av. Hacienda Peñuelos 6771 Local 2174, Residencial Cumbres Las Palmas, 64349 Monterrey, NL"
          />
        ),
        // map: <Map />,
      },
      {
        dirección: (
          <Author
            name="Plaza Real"
            calle="Plaza Real Monterrey, Dr. José Eleuterio González (Gonzalitos) 315, Jardines del Cerro, 64050 Monterrey, N.L"
          />
        ),
      },
      {
        dirección: (
          <Author
            name="Filosofos"
            calle="Filósofos 207 local 2, Tecnológico, 64700 Monterrey, N.L."
          />
        ),
      },
      {
        dirección: (
          <Author
            name="San Agustin"
            calle="Av. Real San Agustín 222 local 8A, Zona San Agustín, 66278 San Pedro Garza García, N.L"
          />
        ),
      },
      {
        dirección: (
          <Author
            name="Plaza Cumbres"
            calle="Av. Hacienda Peñuelos 6771 Local 2174, Residencial Cumbres Las Palmas, 64349 Monterrey, NL"
          />
        ),
      },
      {
        dirección: (
          <Author
            name="Plaza Cumbres"
            calle="Av. Hacienda Peñuelos 6771 Local 2174, Residencial Cumbres Las Palmas, 64349 Monterrey, NL"
          />
        ),
      },
    ],
  };
}
