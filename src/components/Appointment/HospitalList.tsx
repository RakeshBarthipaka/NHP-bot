import React, { useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    Link,
    Card,
    CardContent,
    Paper,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CallIcon from '@mui/icons-material/Call';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleAppointment from './AppointmentBooking';
import { useSelector } from "react-redux";


interface Hospital {
    branchname: string;
    hospitalid: string;
    facilities: string;
    contactinfo: string;
    hospitaladdress: string;
    doctorlist: any[]; // Assuming you have a property to store the doctor list
}

interface Props {
    hospitallist: Hospital[];
    onExampleClicked: (value: string) => void;
}

const HospitalList: React.FC<Props> = ({ hospitallist, onExampleClicked }) => {
    const { colorCode } = useSelector((state: any) => state.theme.color);

    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
        null
    );

    const handleLinkClick = (hospital: Hospital) => {
        setSelectedHospital((prevSelected) =>
            prevSelected === hospital ? null : hospital
        );
    };

    const handleShowDoctorsClick = (hospital: Hospital) => {
        // Handle the click on "Show doctors" button
        setSelectedHospital(hospital);
    };

    return (
        <Grid container direction="column" spacing={2} marginBottom={3}>
            {hospitallist.map((hospital: Hospital, i: number) => (
                <Grid key={i} item alignItems="flex-start">
                    <Link
                        style={{ color: 'blue', fontSize: '16px', cursor: 'pointer' }}
                        onClick={() => handleLinkClick(hospital)}
                    >
                        {hospital.branchname}
                    </Link>
                    {selectedHospital === hospital && (
                        <Grid item key={i} xs={12} sx={{ gap: '1rem', marginTop: "1rem" }}>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    gap: '1.2rem',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    padding: '1rem',
                                }}
                            >
                                <Typography fontWeight="bold" variant="h6">
                                    {hospital.branchname}
                                </Typography>

                                <Typography display="flex" gap={1}>
                                    <MedicalInformationIcon />
                                    Facilities: {hospital.facilities}
                                </Typography>
                                <Typography display="flex" gap={1}>
                                    <CallIcon />
                                    Contact: {hospital.contactinfo}
                                </Typography>

                                <Typography display="flex" gap={1}>
                                    <LocationOnIcon />
                                    Address: {hospital.hospitaladdress}
                                </Typography>{ }

                                <Typography
                                    color={colorCode}
                                >
                                    Doctors List:
                                </Typography>
                                {
                                    hospital.doctorlist && hospital.doctorlist.length > 0 ? (
                                        <ScheduleAppointment
                                            onExampleClicked={onExampleClicked}
                                            events={hospital.doctorlist}
                                        />
                                    ):<Typography color="error">No Doctors available</Typography>
                                }

                            </Paper>
                        </Grid>
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default HospitalList;
