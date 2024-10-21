// EditProfileDetails.js
import React, { useRef, useState , useEffect } from "react";
import EditProfileDetailsStyleWrapper from "./EditProfileDetails.style";
import CountrySelector from "components/CountrySelector/CounterSelector.jsx";
import thumb from "assets/images/team/teamBig.png";
import Button from "components/button";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import CropImage from "components/cropImage/CropImage.jsx";
import { uploadImage } from "utils/UploadImage";
import { updateUserProfile , getUserProfile } from "apiService"; 
import Swal from "sweetalert2";

const EditProfileDetails = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    discord: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    image: "",
    score:123456
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

  const handleCroppedImage = async (img) => {
    setImage(img);
    const url = await uploadImage(img);
    setFormInput((prevInput) => ({
      ...prevInput,
      image: url,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  /**
   * this for update profile 
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormInput = {
      firstname: formInput.firstname,
      lastname: formInput.lastname,
      email: formInput.email,
      country: formInput.country,
      discord: formInput.discord,
      facebook: formInput.facebook,
      twitter: formInput.twitter,
      linkedin: formInput.linkedin,
      image: formInput.image,
      score: formInput.score
    };
    try {
      const updatedUser = await updateUserProfile(filteredFormInput);
      if (updatedUser) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update the Profile.",
      });
    }
  };

/**
 * this To bring all the lessons from the back end
*/
useEffect(() => {
  const getUser = async () => {
    try {
      const response = await getUserProfile();
      setFormInput(response.data); 
    } catch (error) {
      console.error("Error fetching get user:", error);
    }
  };

  getUser();
}, []);  // المصفوفة الفارغة لمنع استدعاء متكرر


  return (
    <>
      <CropImage
        fileInputRef={fileInputRef}
        onCropComplete={handleCroppedImage}
      />
      <EditProfileDetailsStyleWrapper>
        <div className="container">
          <div className="edit-profile-content">
            <div className="left-content">
              <div className="left_content_thumb">
                <img
                  src={formInput.image ? formInput.image : thumb}
                  style={{
                    padding: image === null ? "50px" : "0",
                    width: image === null ? "" : "100%",
                    height: image === null ? "" : "100%",
                    objectFit: "cover",
                  }}
                  alt="team thumb"
                  className="img-fuild"
                />
              </div>
              <div className="left-content-butt">
                <Button
                  variant="white"
                  cust
                  className="banner-btn"
                  onClick={handleButtonClick}
                >
                  Upload Photo
                </Button>
                <h5 className="mt-2 mb-2">OR</h5>
                <Button
                  href="/edit-profile"
                  variant="white"
                  cust
                  className="banner-btn"
                >
                  Select Avatar
                </Button>
              </div>
            </div>
            <div className="right-content">
              <div className="right-content-section1">
                <h4 className="mb-3">Account Info</h4>
                <div>
                  <h6>First Name</h6>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="Enter your first name"
                    value={formInput.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>Last Name</h6>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Enter your last name"
                    value={formInput.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>Email</h6>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formInput.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>Country</h6>
                  <div id="selector">
                    <CountrySelector
                      value={formInput.country}
                      onChange={handleCountryChange}
                      style={{
                        singleValue: (base) => ({
                          ...base,
                          color: "#84858d",
                        }),
                        control: (base) => ({
                          ...base,
                          backgroundColor: "transparent",
                          width: "90%",
                          border: "2px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "10px",
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="right-content-section2">
                <h4 className="mb-3">Social Media Info</h4>
                <div>
                  <h6>
                    <img src={discordIcon} alt="icon" /> Discord
                  </h6>
                  <input
                    type="text"
                    id="discord"
                    placeholder="Discord user name or link"
                    value={formInput.discord}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>
                    <img src={fbIcon} alt="icon" /> Facebook
                  </h6>
                  <input
                    type="text"
                    id="facebook"
                    placeholder="Facebook profile link"
                    value={formInput.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>
                    <img src={twitterIcon} alt="icon" /> Twitter
                  </h6>
                  <input
                    type="text"
                    id="twitter"
                    placeholder="Twitter profile link"
                    value={formInput.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <h6>
                    <img src={linkedIcon} alt="icon" /> Linkedin
                  </h6>
                  <input
                    type="text"
                    id="linkedin"
                    placeholder="Linkedin profile link"
                    value={formInput.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 btu">
            <Button
              variant="mint"
              cust
              onClick={handleSubmit} 
            >
              Save Change
            </Button>
          </div>
        </div>
      </EditProfileDetailsStyleWrapper>
    </>
  );
};

export default EditProfileDetails;
