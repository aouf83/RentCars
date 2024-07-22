import React, { useState } from 'react';
import { Button, TextField, Grid, Box, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 import axios from 'axios';

const RentCar = () => {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('12:00');
  const [sameReturn, setSameReturn] = useState(true);

  const handleSearch = async () => {
    await axios.post("http://localhost:5050/Bookcar",{startLocation,endLocation,startDate,startTime,endDate,endTime}).then((user)=>{
        navigate(`/collections/${user.data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = () => {
    setSameReturn(!sameReturn);
    if (!sameReturn) setEndLocation('');
  };
console.log(startTime);
console.log();
  return (
    <Box boxShadow={3} borderRadius={4} p={2} maxWidth={400} mx="auto" marginTop={6}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Start Location"
            variant="outlined"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          >
            <MenuItem value="Kasaragod Railway Station">Kasaragod Railway Station</MenuItem>
            <MenuItem value="New Bus Stand">New Bus Stand</MenuItem>
            <MenuItem value="Our Showroom">Our Showroom</MenuItem>
            <MenuItem value="Naimarmoola">Naimarmoola</MenuItem>
          </TextField>
        </Grid>
        {!sameReturn && (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="End Location"
              variant="outlined"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            >
              <MenuItem value="Kasaragod Railway Station">Kasaragod Railway Station</MenuItem>
              <MenuItem value="New Bus Stand">New Bus Stand</MenuItem>
              <MenuItem value="Our Showroom">Our Showroom</MenuItem>
              <MenuItem value="Naimarmoola">Naimarmoola</MenuItem>
            </TextField>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sameReturn}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Return to the same location"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Date"
            variant="outlined"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Time"
            variant="outlined"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="End Date"
            variant="outlined"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="End Time"
            variant="outlined"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RentCar;
