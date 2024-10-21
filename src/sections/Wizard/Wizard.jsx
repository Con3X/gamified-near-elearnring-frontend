import React, { useState } from "react";
import ProgressBar from "components/progressBar/v2";
import Button from "components/button";
import CountrySelector from "components/CountrySelector/CounterSelector.jsx";
import banner from "assets/images/banner-bg.jpg";
import land from "assets/images/Land.png";
//import { handleSubmit } from "./Wizard.js";
import { updateUserProfile } from "apiService"; 

import "./Wizard.css";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    //username: "",
    //password: "",
    //confirmPassword: "",
    country: "",
  });

  const handleCountryChange = (selectedCountry) => {
    setFormInput((prevInput) => ({
      ...prevInput,
      country: selectedCountry.label,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  /**
   * this to update profile user
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formInput);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="Wizard">
      <div className="Wizard-Logo">
        <img src={banner} alt="" />
        <img src={land} alt="" />
      </div>
      <div className="Wizard-Content">
        <div className="Content">
          <ProgressBar progress={`${step * 33.3}%`} hight={"5px"} />
          <div className="Wizard-sub-text">{step}/3</div>
          <form>
            {step === 1 && (
              <div className="form-div">
                <div className="step-title">Please fill with your details</div>
                <div>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    className="form-control"
                    value={formInput.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    value={formInput.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="your Email"
                    className="form-control"
                    value={formInput.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div id="selector">
                  <CountrySelector
                    onChange={handleCountryChange}
                    value={formInput.country}
                  />
                </div>
                <div>
                  <input type="checkbox" name="accept" value="accept" />
                  <label className="pl-2">
                    Please accept our{" "}
                    <span>
                      <a href="#d">Terms and condition</a>
                    </span>{" "}
                  </label>
                </div>
              </div>
            )}
            {/*
             
            {step === 2 && (
              <div className="form-div">
                <div className="step-title">
                  Please provide your account details
                </div>
                <div>
                  <input
                    type="text"
                    id="username"
                    placeholder="UserName"
                    className="form-control"
                    value={formInput.username}
                    onChange={handleInputChange}
                  />
                </div>
              
              
                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    value={formInput.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                    value={formInput.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              
              </div>
            )}
              */}
            {step === 2 && (
              <div className="form-div">
                <div className="step-title">Summary</div>
                <div className="sub-title" data-number="1">
                  Personal Details
                </div>
                <span className="sub-title-content">First Name: </span>
                <span className="Wizard-sub-text">{formInput.firstname}</span>
                <br />
                <span className="sub-title-content">Last Name: </span>
                <span className="Wizard-sub-text">{formInput.lastname}</span>
                <br />
                <span className="sub-title-content">Email: </span>
                <span className="Wizard-sub-text">{formInput.email}</span>
                <br />
                <span className="sub-title-content">Country: </span>
                <span className="Wizard-sub-text">{formInput.country}</span>
                <br />
                <br />
                <div className="sub-title" data-number="2">
                  Account Details
                </div>
                <span className="sub-title-content">User Name: </span>
                <span className="Wizard-sub-text">{formInput.username}</span>
                <br />
                <span className="sub-title-content">Password: </span>
                <span className="Wizard-sub-text">{formInput.password}</span>
                <br />
              </div>
            )}
            <hr />

            <div className="button">
              {step > 1 && (
                <Button variant="white" onClick={handlePrev}>
                  Prev
                </Button>
              )}
              <Button
                variant="blue"
                onClick={
                  step === 3 ? handleSubmit : handleNext
                }
              >
                {step === 3 ? "Save" : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
