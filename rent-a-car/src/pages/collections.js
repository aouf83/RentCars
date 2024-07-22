import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TbManualGearbox } from 'react-icons/tb';
import { LuFuel } from 'react-icons/lu';
import { MdEventSeat } from 'react-icons/md';

const CarCard = ({ car, rentalHours }) => {
  const navigate = useNavigate();
  const totalPrice = car ? rentalHours * parseFloat(car.price) : 0;

  const navigateToPayment = (id ,rate) => {
    navigate(`/Payment/${id}/${rate}`);
  };

  return (
    <div style={{ 
      border: '1px solid #e0e0e0',  
      borderRadius: '8px', 
      padding: '20px', 
      margin: '20px', 
      width: '300px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      cursor: 'pointer',
      overflow: 'hidden',
      fontFamily: 'Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transformOrigin: 'center',
      transition: 'transform 0.3s ease-in-out',
    }}>
      {car && (
        <>
          <div className='log'>
            <img src={car.logo} width={30} alt="" />
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '28px',
            marginTop: '-19px'
          }}>
            <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginRight: '20px', marginTop: '55px'}}>
              <img src={`http://localhost:5050/${car.image}`} alt={car.name} style={{ width: '100%' }} />
            </div>
            <div>
              <h2 style={{ marginTop: '-10px', textAlign: 'center', color: '#333', fontSize: '1.2em', fontWeight: 'bold', fontFamily: 'monospace' }}>{car.name}</h2>
              <div style={{ textAlign: 'center', marginTop: '37px', color: 'darkgrey', marginInline: '21px'}} >
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0', fontSize: '0.3em' }}>
                  <TbManualGearbox size={10} style={{ marginRight: '5px' }} />{car.transmission}
                  <span>{car.transmission}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0', fontSize: '0.3em' }}>
                  <LuFuel size={10} style={{ marginRight: '5px' }} />
                  <span>{car.fuelType}</span>{car.fuel}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0', fontSize: '0.3em' }}>
                  <MdEventSeat size={10} style={{ marginRight: '5px' }} />
                  <span>{car.seatingCapacity}</span>{car.seats}
                </div>
              </div>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%', 
            padding: '0 20px', 
            boxSizing: 'border-box',
            marginTop: 'auto'  
          }}>
            <p style={{ margin: '5px 0', fontSize: '1em', fontWeight: 'bold' }}>Price: ₹{totalPrice}</p>
            <button style={{ 
              backgroundColor: '#007bff', 
              padding: '10px 20px', 
              border: 'none', 
              color: '#fff', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '1em',
              transition: 'background-color 0.3s',
            }}
            onClick={() => navigateToPayment(car._id ,totalPrice)}
            >
              Select
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDate();
        const response = await axios.get('http://localhost:5050/getadmincart');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const fetchDate = async () => {
    try {
      const resp = await axios.get(`http://localhost:5050/date/${id}`);
      const data = resp.data.data;
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRentalHours = (startDate, startTime, endDate, endTime) => {
    const startDateTime = new Date(`${startDate.split('T')[0]}T${startTime}`);
    const endDateTime = new Date(`${endDate.split('T')[0]}T${endTime}`);
    const diffMs = endDateTime - startDateTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  const rentalHours = calculateRentalHours(startDate, startTime, endDate, endTime);

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Roboto, sans-serif',
    }}>
      {cars.map((car, index) => (
        <CarCard car={car} rentalHours={rentalHours} key={index} />
      ))}
    </div>
  );
};

export default App;
