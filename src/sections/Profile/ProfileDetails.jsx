import React, { useState , useEffect } from "react";
import ProfileDetailsStyleWrapper from "./ProfileDetails.style";
import thumb from "assets/images/team/teamBig.png";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import nearLand from "assets/images/Near-Land.jpg";
import Button from "components/button";
import {getUserProfile} from "apiService";

const ProfileDetails = () => {
  const [data, setData] = useState([]);

/**
 * this To bring all the lessons from the back end
*/
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserProfile();
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching get user:", error);
      }
    };

    getUser();
  }, [] );

  return (
    <ProfileDetailsStyleWrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="left_content_thumb">
              <img
                src={data.image}
                width={100}
                alt="team thumb"
                className="img-fuild"
              />
            </div>
            <h2>{data.firstname} {data.lastname}</h2>

            <ul className="member_details">
              <li>
                <strong>Land Leavel:</strong>{" "}
                <span>{data.landLevel}</span>
              </li>
              <li>
                <strong>Player Country:</strong>{" "}
                <span>{data.country}</span>
              </li>
              <li>
                <strong>Email:</strong> <span>{data.email}</span>
              </li>
              <li>
                <strong>Top Point:</strong>{" "}
                <span>{data.score} NP</span>
              </li>
              <li className="social_items">
                <strong>Social:</strong>
                <a href={data.discord}>
                  <img src={discordIcon} alt="icon" />{" "}
                </a>
                <a href={data.twitter}>
                  <img src={twitterIcon} alt="icon" />{" "}
                </a>
                <a href={data.facebook}>
                  <img src={fbIcon} alt="icon" />{" "}
                </a>
                <a href={data.linkedin}>
                  <img src={linkedIcon} alt="icon" />{" "}
                </a>
              </li>
            </ul>
            <div className="mt-3">
              <Button
                href="/edit-profile"
                variant="mint"
                md
                className="banner-btn"
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="right_content">
              <h2 className="right_content_title">Near Land</h2>
              <div className="img-naer-land">
                <img src={nearLand} alt="Near Land" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileDetailsStyleWrapper>
  );
};

export default ProfileDetails;
