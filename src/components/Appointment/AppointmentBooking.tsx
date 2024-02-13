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
  Avatar,
  Box,
  Link,
  Card,
  CardContent
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { isSameDay, format } from 'date-fns';
import styles from "./Appointment.module.css";
import WorkIcon from '@mui/icons-material/Work';
import CallIcon from '@mui/icons-material/Call';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { CreateAPI, fecthApi } from '../../api';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import { useSelector } from "react-redux";



interface Doctor {
  doctorid: number;
  doctorName: string;
  speciality: string;
  doctorImage: string;
  availableBookingSlots: { [date: string]: string[] }[];
  branchName: string;
  hospitalid: string;
  contactinfo: string;
  experienceinYears: string;
  hospitalAddress: string;
  rating: string;
  fee: any;
}

interface Props {
  events: any;
  onExampleClicked: (value: string) => void;
}

const CustomRating = ({ rating }: any) => {
  return (
    <Rating
      value={rating}
      precision={.5}
      emptyIcon={<StarIcon style={{ color: '#c8b9b9' }} />}
      icon={<StarIcon />}
    />
  );
};

const ScheduleAppointment = ({ events, onExampleClicked }: Props) => {
  const { colorCode } = useSelector((state: any) => state.theme.color);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDoctorCard, setShowDoctorCard] = useState(false); // Added state for doctor card

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
  });

  let patientemail = localStorage.getItem("patientemail") || 0;
  let userID = localStorage.getItem("userID") || 0;

  const getPatientData = async () => {
    try {
      const response = await fecthApi(`patients/${patientemail}`);
      setPatientData(response);
      setFormData({
        name: response.patientname || '',
        email: response.patientemail || '',
        contact: response.patientphonenumber || '',
        location: response.patientlocation || '',
      });
    } catch (error) {
      setPatientData([]);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      getPatientData();
    }
  }, [isLoaded]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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

    const currentDate = new Date();
    if (date < currentDate) return false;

    const formattedDate = format(date, 'dd-MM-yyyy');
    return selectedDoctor.availableBookingSlots.some(
      (slots) => slots[formattedDate] && slots[formattedDate].length > 0
    );
  };

  const tileClassName = ({ date }: { date: Date }): string | null => {
    return isDateAvailable(date) ? 'available' : null;
  };

  const handleBookNow = async () => {
    if (!selectedTimeslot) {
      alert('Please select a timeslot.');
      return;
    }

    const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

    if (!isFormValid) {
      alert('Please fill in all the form fields.');
      return;
    }

    const dateObject = new Date();
    const dateString = dateObject.toISOString().slice(0, 10);

    let bookingData = {
      patientid: userID,
      doctorId: selectedDoctor?.doctorid,
      doctorName: selectedDoctor?.doctorName,
      branchName: selectedDoctor?.branchName,
      hospitalID: selectedDoctor?.hospitalid,
      date: selectedDate,
      timeslot: selectedTimeslot,
      patientName: formData.name,
      patientEmail: formData.email,
      patientPhoneNumber: formData.contact,
      patientAddress: "",
      patientHistory: "",
      patientLocation: formData.location,
      registrationDate: dateString,
      userData: formData
    };

    localStorage.setItem("appointmentData", JSON.stringify(bookingData));

    let appointmentRequestData = `
      New Appointment Request:\n
      ------------------------ \n
      DoctorID: ${bookingData.doctorId} \n
      Doctor: ${bookingData.doctorName} \n
      Branch Name: ${bookingData.branchName} \n
      Date: ${bookingData.date} \n
      Timeslot: ${bookingData.timeslot} \n

      User Information: \n
      ----------------- \n
      Name: ${bookingData.userData.name} \n
      Email: ${bookingData.userData.email} \n
      Contact: ${bookingData.userData.contact} \n
      Location: ${bookingData.userData.location}
    `;

    let patientInfo = {
      "patientid": `${userID}`,
      "patientname": formData.name,
      "patientemail": formData.email,
      "patientphonenumber": formData.contact,
      "patientaddress": "",
      "patientlocation": formData.location,
      "patienthistory": "",
      "registrationdate": dateString
    };

    try {
      const patientRecord = await CreateAPI(patientInfo, "patients/");
      localStorage.setItem("patientID", patientRecord.patientid);
    } catch (error) {
      console.error('Error creating patient record:', error);
    }

    onExampleClicked(appointmentRequestData);
    setFormData({
      name: '',
      email: '',
      contact: '',
      location: '',
    });

    handleCloseAvailableSlots();
  };

  const handleLinkClick = (doctor: Doctor) => {
    if (showDoctorCard && selectedDoctor && selectedDoctor.doctorid === doctor.doctorid) {
      // If the card is already open for the selected doctor, close it
      setShowDoctorCard(false);
    } else {
      // Otherwise, show the card for the selected doctor
      setSelectedDoctor(doctor);
      setShowAvailableSlots(false);
      setShowUserInfoForm(false);
      setShowDoctorCard(true);
    }
  };
  return (
    <Grid className={styles.AppointmentOwlCarousel}>
      {
        events && events.length > 2 && (
          <Grid gap={2} item alignItems="flex-start" display="flex" flexDirection="column">
            {events.map((doctor: Doctor, i: number) => (
              <div key={i}>
                <Link
                  style={{ color: "blue", fontSize: "16px", cursor: "pointer" }}
                  onClick={() => handleLinkClick(doctor)}
                >
                  {doctor.doctorName}
                </Link>

                {showDoctorCard && selectedDoctor && selectedDoctor.doctorid === doctor.doctorid && (
                  <Card style={{marginTop:"1rem"}}>
                    <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <Avatar alt={selectedDoctor.doctorName} src="https://example.com/avatar2.jpg" sx={{ width: 100, height: 100, marginBottom: 2, background: colorCode }} />
                      <Typography variant="h6">{selectedDoctor.doctorName}</Typography>
                      <Typography variant="subtitle1" color="textSecondary" marginBottom={2}>
                        {selectedDoctor.speciality}
                      </Typography>
                      <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                        <CustomRating rating={selectedDoctor.rating} />
                      </Box>
                      <Typography variant="body2" color="textSecondary" marginBottom={2}>
                        Fee: ${selectedDoctor.fee}
                      </Typography>
                     
                      <Button style={{ color: colorCode, border: `1px solid ${colorCode}` }} variant="outlined" size="small" onClick={() => handleShowAvailableSlots(selectedDoctor)}>
                        Book Appointment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </Grid>
        )
      }

      {events && events.length < 3 && (
        <Grid style={{ display: "flex", gap: "10px", justifyContent: "center" }} >
          {events.slice(0, 2).map((doctor: Doctor, i: number) => (
            <Card >
              <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                <Avatar alt={doctor.doctorName} src="https://example.com/avatar2.jpg" sx={{ width: 100, height: 100, marginBottom: 2, background: colorCode }} />
                <Typography variant="h6">{doctor.doctorName}</Typography>
                <Typography variant="subtitle1" color="textSecondary" marginBottom={2}>
                  {doctor.speciality}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                  <CustomRating rating={doctor.rating} />
                </Box>
                <Typography variant="body2" color="textSecondary" marginBottom={2}>
                  Fee: ${doctor.fee}
                </Typography>
                <Button style={{ color: colorCode, border: `1px solid ${colorCode}`}} variant="outlined" size="small" onClick={() => handleShowAvailableSlots(doctor)}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )
      }


      <Dialog open={showAvailableSlots} onClose={handleCloseAvailableSlots}>
        <DialogTitle>
          {selectedDoctor && `${selectedDoctor.doctorName}`}
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <Typography fontWeight="bold" marginTop={3}>
                    User Information:
                  </Typography>
                  <TextField label="Name" fullWidth margin="normal" name="name" value={formData.name} onChange={handleFormChange} />
                  <TextField type='email' label="Email" fullWidth margin="normal" name="email" value={formData.email} onChange={handleFormChange} />
                  <TextField label="Contact" fullWidth margin="normal" name="contact" value={formData.contact} onChange={handleFormChange} />
                  <TextField label="Location" fullWidth margin="normal" name="location" value={formData.location} onChange={handleFormChange} />
                  <Button size='small' variant="contained" style={{background:colorCode}} onClick={handleBookNow}>
                    Book Now
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Typography>No available slots for the selected date.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAvailableSlots} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ScheduleAppointment;
