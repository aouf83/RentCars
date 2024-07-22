import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Payment() {
  const { id ,rate} = useParams();
  const [backdata, setbackdata] = useState({});
  const [toform, settoform] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [gstAmount, setGstAmount] = useState(0);
  const [paymentType, setPaymentType] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/payments/${id}`);
        setbackdata(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchdata();
  }, [id]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    settoform(true);
    const totalAmount = parseInt(rate) + parseInt(plan.securityDeposit) + parseInt(plan.fastagDeposit);
    setGstAmount(totalAmount * 0.05);
  };

  const handleCloseModal = () => {
    settoform(false);
    setSelectedPlan(null);
  };

  const handlePaymentTypeSelect = (type) => {
    setPaymentType(type);
  };

  const handleBookButton = () => {
    // Add your booking logic here

  };

  const totalAmount = parseInt(rate) + (selectedPlan ? parseInt(selectedPlan.securityDeposit) : 0) + (selectedPlan ? parseInt(selectedPlan.fastagDeposit) : 0) + gstAmount;

  return (
    <div className="payment-container">
      {toform && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Payment Form</h2>
            <p>Car Price: {rate}</p>
            {selectedPlan && (
              <div>
                <p>Security Deposit: {selectedPlan.securityDeposit}</p>
                <p>Fastag Deposit: {selectedPlan.fastagDeposit}</p>
              </div>
            )}
            <p>GST (5%): {gstAmount}</p>
            <p>Total Amount: {totalAmount}</p>

            

            <button onClick={handleBookButton}>payment</button>
            {/* Your payment form elements can go here */}
          </div>
        </div>
      )}

      <div className="payment-content">
        <h3>{backdata.name}</h3>
        <div className="car-image">
          <img src={`http://localhost:5050/${backdata.image}`} alt="Hyundai i20 Sportz Petrol AT 1.2" />
          <h3 className="car-price">Your total is: {rate}</h3>
        </div>

        {/* Payment Plans */}
        <div className="plans-container">
          {/* Basic Plan */}
          <div className="package basic">
            <h2>Basic</h2>
            <ul>
              <li>Security Deposit: ₹3000</li>
              <li>Fastag Deposit: ₹1000</li>
              <li>130 kms</li>
              <li>Cancellation as per policy</li>
              <li>Damage policy inline with T&amp;C</li>
              <li>Additional KM Charge: ₹9/km</li>
            </ul>
            <button className="plan-button" onClick={() => handlePlanSelect({ securityDeposit: 3000, fastagDeposit: 1000 })}>
              Select
            </button>
          </div>

          {/* Plus Plan */}
          <div className="package plus">
            <h2>Plus</h2>
            <ul>
              <li>Security Deposit: ₹2000</li>
              <li>Fastag Deposit: ₹1000</li>
              <li>195 kms</li>
              <li>Cancellation as per policy</li>
              <li>Damage policy inline with T&amp;C</li>
              <li>Additional KM Charge: ₹9/km</li>
            </ul>
            <button className="plan-button" onClick={() => handlePlanSelect({ securityDeposit: 2000, fastagDeposit: 1000 })}>
              Select
            </button>
          </div>

          {/* Premium Plan */}
          <div className="package premium">
            <h2>Premium</h2>
            <ul>
              <li>No Security Deposit</li>
              <li>Fastag Deposit: ₹1000</li>
              <li>Unlimited KMs</li>
              <li>Cancellation as per policy</li>
              <li>Damage policy inline with T&amp;C</li>
              <li>Additional Driver incorporated</li>
            </ul>
            <button  className="plan-button" onClick={() => handlePlanSelect({ securityDeposit: 0, fastagDeposit: 1000 })}>
              Select
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Payment;
