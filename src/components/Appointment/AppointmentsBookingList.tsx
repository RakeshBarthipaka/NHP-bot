import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { isSameDay, format } from 'date-fns';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { DeleteAppointemtApi, UpdateAppointemtApi } from '../../api';
import CategoryIcon from '@mui/icons-material/Category';
import styles from "./Appointment.module.css";
import { useSelector } from "react-redux";



interface Doctor {
  doctorid: number;
  doctorname: string;
  speciality: string;
  doctorImage: string;
  availableBookingSlots: { [date: string]: string[] }[];
  branchname: string;
  hospitalid: string;
  contactinfo: string;
  experienceinYears: string;
  hospitalAddress: string;
  patientName: string;
  appointmentDate: string;
  appointmentslot: string;
  appointmentid: any
}

interface Props {
  events: any;
  onExampleClicked: (value: string) => void;
}



const AppointmentsBookingList = ({ events, onExampleClicked }: Props) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const { colorCode } = useSelector((state: any) => state.theme.color);


  const handleDateChange = (date: any) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(`${formattedDate}`);

  };

  const handleShowAvailableSlots = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowAvailableSlots(true);
  };

  const handleCloseAvailableSlots = () => {
    setShowAvailableSlots(false);
    setShowUserInfoForm(false);
  };

  const handleTimeslotClick = (time: string) => {
    setSelectedTimeslot((prevSelectedTimeslot) => {
      const newSelectedTimeslot = prevSelectedTimeslot === time ? null : time;
      setShowUserInfoForm(newSelectedTimeslot !== null);
      return newSelectedTimeslot;
    });
  };

  const getAvailableSlotsForDate = (): string[] => {
    if (!selectedDoctor || !selectedDate) return [];

    const selectedDateObj = Array.isArray(selectedDate) ? selectedDate[0] : (selectedDate as Date);

    const formattedDate = format(selectedDateObj, 'dd-MM-yyyy');

    const slotObj = selectedDoctor.availableBookingSlots.find(
      (slots) => slots[formattedDate]
    );
    return slotObj ? slotObj[formattedDate] : [];
  };

  const isDateAvailable = (date: Date): boolean => {
    if (!selectedDoctor) return false;

    const currentDate = new Date(); // Get the current date
    if (date < currentDate) return false; // Skip past dates

    const formattedDate = format(date, 'dd-MM-yyyy');
    return selectedDoctor.availableBookingSlots.some(
      (slots) => slots[formattedDate] && slots[formattedDate].length > 0
    );
  };

  const tileClassName = ({ date }: { date: Date }): string | null => {
    return isDateAvailable(date) ? 'available' : null;
  };

  const handleBookNow = async () => {
    // Validate timeslot selection
    if (!selectedTimeslot) {
      alert('Please select a timeslot.');
      return;
    }

    const dateObject = new Date(selectedDate as Date);
    const dateString = dateObject.toISOString().slice(0, 10);

    let bookingData = {
      bookingdate: selectedDoctor?.appointmentDate,
      appointmentdate: dateString,
      appointmentslot: selectedTimeslot,
      status: "Scheduled"

    }
    let appointmentRequestData = `
        Update Appointment Request:\n
        ------------------------ \n
        Appointment ID : ${selectedDoctor?.appointmentid} \n
        New Appointment Date : ${dateString} \n
        New Appointment Time : ${selectedTimeslot} \n
    `;

    try {
      // Create a new patient record using CreateAPI
      const patientRecord = await UpdateAppointemtApi(bookingData, `appointments/${selectedDoctor?.appointmentid}`);

    } catch (error) {
      console.error('Error in updating patient record:', error);
      // Handle error (e.g., show a message to the user)
    }

    onExampleClicked(appointmentRequestData);
    handleCloseAvailableSlots();
  };

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{ appointmentID: any }>({ appointmentID: null });

  const cancelAppointment = (appointmentID: any) => {
    setConfirmationDialogOpen(true);
    setConfirmationData({ appointmentID });
  };

  const handleConfirmDialogClose = (confirmed: boolean) => {
    setConfirmationDialogOpen(false);

    if (confirmed) {
      // User confirmed, proceed with appointment cancellation
      try {
        // Call the API to cancel the appointment
        const resp = DeleteAppointemtApi(`appointments/${confirmationData.appointmentID}`);
        onExampleClicked(`Cancel Appointment for ${confirmationData.appointmentID}`);
      } catch (error) {
        // Handle error (e.g., show a message to the user)
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 1, marginBottom: '2rem' }}>
      {events.map((doctor: Doctor, i: number) => (
        <Grid item key={i} xs={12} sx={{ gap: '1rem' }}>
          <Paper
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'start',
              flexDirection: 'column',
              padding: '1rem',
            }}
          >
            <Typography fontWeight="bold" variant="h6">{doctor.patientName}</Typography>
            <Typography display="flex" gap={1}>
              <CategoryIcon />
              Branch Name: {doctor.branchname}
            </Typography>
            <Typography display="flex" gap={1}>
              <MedicalInformationIcon />
              Doctor Name: {doctor.doctorname}
            </Typography>
            <Typography display="flex" gap={1}>
              <MedicalInformationIcon />
              Appointment Date : {doctor.appointmentDate}
            </Typography>
            <Typography display="flex" gap={1}>
              <MedicalInformationIcon />
              Appointment slot : {doctor.appointmentslot}
            </Typography>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <Button
                style={{ background: colorCode }}
                variant="contained"
                color="primary"
                size='small'
                onClick={() => cancelAppointment(doctor.appointmentid)}
              >
                Cancel
              </Button>
              <Button
                style={{ background: colorCode }}
                variant="contained"
                color="primary"
                size='small'
                onClick={() => handleShowAvailableSlots(doctor)}
              >
                Update
              </Button>
            </div>
          </Paper>
        </Grid>
      ))}

      <Dialog open={showAvailableSlots} onClose={handleCloseAvailableSlots}>
        <DialogTitle>
          {selectedDoctor && `${selectedDoctor.doctorname}`}
        </DialogTitle>
        <DialogContent>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate as Date | any}
            showNeighboringMonth={false}
            tileClassName={tileClassName}
            minDate={new Date()}
          />

          <Typography fontWeight="bold" marginTop={2} marginBottom={2}>
            Available Slots:
          </Typography>

          {getAvailableSlotsForDate().length > 0 ? (
            <>
              <Grid gap={1} display="flex">
                {getAvailableSlotsForDate().map((time, index) => (
                  <Button
                    variant="contained"
                    size='small'
                    key={index}
                    onClick={() => handleTimeslotClick(time)}
                    className={selectedTimeslot === time ? styles.availableSlotsActiveButton : styles.availableSlotsButton}
                  >
                    {time}
                  </Button>
                ))}
              </Grid>

              {showUserInfoForm && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: "1.5rem" }}>
                  <Button size='small' variant="contained" style={{ background: colorCode }} onClick={handleBookNow}>
                    Update
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Typography>No available slots for selected date.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAvailableSlots} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)} style={{ background: colorCode, color:"white" }}>
            No
          </Button>
          <Button onClick={() => handleConfirmDialogClose(true)} style={{ background: colorCode, color:"white" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AppointmentsBookingList;
