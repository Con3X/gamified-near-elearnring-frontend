/* global createUnityInstance */
import userDefault from "assets/images/no-User.png";
import React, { useState, useEffect, useRef } from "react";
import ProfileDetailsStyleWrapper from "./ProfileDetails.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import Button from "components/button";
import { claimsNgcs, getUserProfile } from "apiService";
import { getCurrentNgcs } from "apiService";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const ProfileDetails = ({ playerId }) => {
  const [data, setData] = useState([]);
  const unityInstanceRef = useRef(null); // Ref to store the Unity instance
  const unityLoaderScriptRef = useRef(null); // Ref to store the loader script

  /**
   * Expose getUserIdFromToken to the global scope as GetUserID
   */

  useEffect(() => {
    window.GetUserID = getUserIdFromToken;
    window.GetToken = getTokenFromLocalStorage;

    // Check if Unity instance already exists
    if (unityInstanceRef.current !== null) {
      console.log("Unity instance already exists.");
      return;
    }

    // Load Unity loader script dynamically
    const unityLoaderScript = document.createElement("script");
    unityLoaderScript.src = `${process.env.PUBLIC_URL}/citybuilder/Build/CityBuilder.loader.js`;

    unityLoaderScript.onload = () => {
      if (typeof createUnityInstance !== "undefined") {
        createUnityInstance(document.querySelector("#unity-canvas"), {
          dataUrl: `${process.env.PUBLIC_URL}/citybuilder/Build/CityBuilder.data.unityweb`,
          frameworkUrl: `${process.env.PUBLIC_URL}/citybuilder/Build/CityBuilder.framework.js.unityweb`,
          codeUrl: `${process.env.PUBLIC_URL}/citybuilder/Build/CityBuilder.wasm.unityweb`,
          streamingAssetsUrl: `${process.env.PUBLIC_URL}/citybuilder/StreamingAssets`,
          companyName: "Neargami",
          productName: "City",
          productVersion: "0.5.0",
          showBanner: unityShowBanner,
        })
          .then((unityInstance) => {
            console.log("Unity loaded");
            unityInstanceRef.current = unityInstance;
          })
          .catch((message) => {
            alert(message);
          });
      } else {
        console.error("createUnityInstance is not defined");
      }
    };

    unityLoaderScript.onerror = () => {
      console.error("Failed to load Unity loader script.");
    };

    document.body.appendChild(unityLoaderScript);
    unityLoaderScriptRef.current = unityLoaderScript;

    // Cleanup function to unload Unity instance and remove the script when the component unmounts
    return () => {
      if (unityInstanceRef.current !== null) {
        unityInstanceRef.current.Quit().then(() => {
          console.log("Unity instance unloaded");
          unityInstanceRef.current = null;
        });
      }
      if (unityLoaderScriptRef.current) {
        document.body.removeChild(unityLoaderScriptRef.current);
        unityLoaderScriptRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  /**
   * This function gets the user ID from the JWT token
   */
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Token is missing. User may not be logged in.");
      return null; // Return null if token is missing
    }

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // Extract id from the token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // Return null if there's an error decoding
    }
  };

  /**
   * This function gets the JWT token from localStorage
   */
  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Token is missing. User may not be logged in.");
      return null; // Return null if token is missing
    }

    return token;
  };

  /**
   * Fetch user profile data from the backend
   */
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserProfile(playerId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [playerId]);

  // handle claims
  const handleClaims = async () => {
    const ngcs = await getCurrentNgcs();
    if (ngcs.data !== 0) {
      try {
        await claimsNgcs(ngcs.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        html: `Your claim has been registered successfully.
               Your token will arrive to your near account within the next few days.
               Stay tuned and keep planning. 
                </br>
               In the mean time, you need to know that you automatically acknowledge and agree to our <a href="/privacy-policy">Privacy Policy</a>
               and our <a href="/legal-disclaimer">Legal Disclaimer</a>. </br>
               Otherwise, please do not use our service.</b>`,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        html: `You currently have no points available to claim. Enroll in a course to start earning points and enjoy rewards!
</br> </br>
               <b style="color:red;">In the mean time, you need to know that you automatically acknowledge and agree to our <a href="/privacy-policy">Privacy Policy</a>
               and our <a href="/legal-disclaimer">Legal Disclaimer</a>. </br>
               Otherwise, please do not use our service.</b>`,
      });
    }
  };

  // Function to show banners (warnings/errors)
  function unityShowBanner(msg, type) {
    alert(type + ": " + msg);
  }

  return (
    <ProfileDetailsStyleWrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-4 left-content">
            {/* Your left content */}
            <div className="left_content_thumb">
              <img
                src={data.image || userDefault}
                alt="player-image"
                width="100%"
                className="player-image"
                onError={(e) => {
                  if (e.target.src !== userDefault) {
                    e.target.src = userDefault;
                  }
                }}
              />
            </div>
            <h2>
              {data.firstname} {data.lastname}
            </h2>

            <ul className="member_details">
              <li>
                <strong>Neargami Coins:</strong> <span>{data.ngc}</span>
                {/* <br/>
                Your won points available to spend inside the website or to claim to your wallet. */}
              </li>
              <li>
                <strong>Player Country:</strong> <span>{data.country}</span>
              </li>
              <li>
                <strong>Email:</strong> <span>{data.email}</span>
              </li>
              <li>
                <strong>Top Points:</strong> <span>{data.top_points}</span>
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
            <div className="mt-3 mb-3">
              {playerId === undefined && (
                <>
                  <Button
                    href="/edit-profile"
                    variant="mint"
                    md
                    className="banner-btn"
                  >
                    Edit Profile
                  </Button>
                  <div className="mt-2">
                    <Button
                      variant="blue"
                      md
                      className="banner-btn"
                      onClick={handleClaims}
                    >
                      Claim Coins
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-8" style={{ marginTop: "-43px" }}>
            <div className="right_content">
              <h2 className="right_content_title">Near Land</h2>
              <div
                className="img-naer-land"
                style={{ width: "100%", maxWidth: "960px", overflow: "hidden" }}
              >
                {/* Unity WebGL game container */}
                <div
                  id="unity-container"
                  className="unity-desktop"
                  style={{ height: "auto" }}
                >
                  <canvas
                    id="unity-canvas"
                    width="960"
                    height="600"
                    style={{
                      width: "800px",
                      height: "5500px",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  ></canvas>
                  <div id="unity-loading-bar">
                    <div id="unity-logo"></div>
                    <div id="unity-progress-bar-empty">
                      <div id="unity-progress-bar-full"></div>
                    </div>
                  </div>
                  <div id="unity-warning"></div>
                  <div id="unity-footer">
                    <div id="unity-logo-title-footer"></div>
                    <div id="unity-fullscreen-button"></div>
                    <div id="unity-build-title">CityBuilder</div>
                  </div>
                </div>
                {/* Include Unity styles */}
                <link
                  rel="stylesheet"
                  href={`${process.env.PUBLIC_URL}/citybuilder/TemplateData/style.css`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileDetailsStyleWrapper>
  );
};

export default ProfileDetails;
