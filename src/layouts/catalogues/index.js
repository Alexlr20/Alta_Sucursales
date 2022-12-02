/* eslint-disable */
import React, { useState } from 'react'
import { Box, Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { City } from './Cities';
import Locality from './Locality';
import State from './States';
import RoadTypes from './RoadTypes';

const activeLink = {
    cursor: "pointer",
    backgroundColor: "#5373aa",
    padding: '0 1.5rem',
    borderRadius: "1rem",
    color: "#FFF"
}

const link = {
    cursor: "pointer",
    padding: '0 1.5rem',
    borderRadius: "1rem",
}

function NavMenu({ activeComponents, setActiveComponents }) {
    const handleActive = ({ target }) => {
        setActiveComponents([]);
        switch (target.innerHTML) {
            case 'Estado':
                setActiveComponents(['state']);
                break;
            case 'Ciudad':
                setActiveComponents(['city']);
                break;
            case 'Colonia':
                setActiveComponents(['locality']);
                break;
            case 'Tipo vialidad':
                setActiveComponents(['roadType']);
                break;
        }
    };

    return (
        <nav style={{ backgroundColor: "#b9d3ff", padding: '0.5rem', borderRadius: '8px', marginBottom: "1rem" }}>
            <ul style={{ display: "flex", justifyContent: "space-evenly", listStyle: "none" }}>
                <li style={activeComponents.includes('state') && activeLink || link} onClick={handleActive}>Estado</li>
                <li style={activeComponents.includes('city') && activeLink || link} onClick={handleActive}>Ciudad</li>
                <li style={activeComponents.includes('locality') && activeLink || link} onClick={handleActive}>Colonia</li>
                <li style={activeComponents.includes('roadType') && activeLink || link} onClick={handleActive}>Tipo vialidad</li>
            </ul>
        </nav>
    )
}

export function Catalogues() {

    const [activeComponents, setActiveComponents] = useState(['state']);

    return (
        <DashboardLayout>
            <MDBox
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mb={4}
            >
                <MDTypography variant="h6" color="white">
                    Catalogos
                </MDTypography>
            </MDBox>
            <MDBox mt={4}>
                <Card sx={{ padding: '1rem', height: "77vh" }}>
                    <NavMenu activeComponents={activeComponents} setActiveComponents={setActiveComponents} />

                    <Box>
                        {activeComponents.includes('state') && <State />}
                        {activeComponents.includes('city') && <City />}
                        {activeComponents.includes('locality') && <Locality />}
                        {activeComponents.includes('roadType') && <RoadTypes />}
                    </Box>
                </Card>
            </MDBox>
            <Footer />
        </DashboardLayout >
    )
}

export default Catalogues;

