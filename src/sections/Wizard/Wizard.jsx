import React, { useEffect, useState } from "react";
import ProgressBar from "components/progressBar/v2";
import Button from "components/button";
import CountrySelector from "components/CountrySelector/CounterSelector.jsx";
import banner from "assets/images/banner-bg.jpg";
import land from "assets/images/Land.png";
import { updateUserProfile } from "apiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Wizard.css";

export default function Wizard() {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
  });

  useEffect(() => {
    localStorage.removeItem("firstLogin");
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

  const handleCheckboxChange = (e) => {
    setIsAccepted(e.target.checked);
  };

  const handleNext = () => {
    if (step === 1 && !isAccepted) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please accept the terms and conditions before proceeding.",
      });
      return;
    }
    if (step < 2) setStep(step + 1);
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
      await updateUserProfile(formInput);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error created .",
      });
    }
  };
  const handleComplateToProfile = (e) => {
    handleSubmit(e);
    navigate("/profile");
  };
  const handleBackToHome = (e) => {
    handleSubmit(e);
    navigate("/home");
  };
  return (
    <div className="Wizard">
      <div className="Wizard-Logo">
        <img src={banner} alt="" />
        <img src={land} alt="" />
      </div>
      <div className="Wizard-Content">
        <div className="Content">
          <ProgressBar progress={`${step * 50}%`} hight={"5px"} />
          <div className="Wizard-sub-text">{step}/2</div>
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
                  <input
                    type="checkbox"
                    name="accept"
                    value="accept"
                    checked={isAccepted}
                    onChange={handleCheckboxChange}
                  />
                  <label className="pl-2">
                    Please accept our{" "}
                    <span>
                      <a href="#d">Terms and condition</a>
                    </span>{" "}
                  </label>
                </div>
              </div>
            )}
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
              </div>
            )}
            <hr />

            <div className="button">
              {step === 1 && (
                <>
                  <Button sm variant="white" onClick={() => navigate("/")}>
                    Skip
                  </Button>
                  <Button sm variant="mint" onClick={handleNext}>
                    Next
                  </Button>
                </>
              )}
              {step > 1 && (
                <>
                  <Button md variant="white" onClick={handlePrev}>
                    Prev
                  </Button>
                  <Button lg variant="blue" onClick={handleComplateToProfile}>
                    Complate To Profile
                  </Button>
                  <Button lg variant="mint" onClick={handleBackToHome}>
                    Back To Home
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
