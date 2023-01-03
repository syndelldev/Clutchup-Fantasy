import React, { useEffect, useState } from "react";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function SplashScreen() {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  let { email, username, teamname } = location.state;
  let userDetails = { email:email, username:username, teamname:teamname };
  console.log(teamname);
  console.log(username);
  console.log(email);
  

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const routToNextPage = () => {
    history.push({
      pathname: "/EnterCompetition/",
      state: userDetails,
    });
  };

  return (
    <div>
      <div className="section">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contener">
            <div className="Row">
              <div className="col1">
                <img
                  src={BackgroundImage}
                  className="mainimg"
                  alt="back-image"
                />
              </div>
              <div className="col">
                <div className="d-box">
                  <img src={logoimages} className="logo" alt="" />
                  <h3 className="welhading">
                    Welcome {username.charAt(0).toUpperCase() + username.slice(1)}
                  </h3>
                  <p style={{ marginBottom: "-4rem" }}>
                    Time for you to enter some competitions!
                  </p>
                  <div className="btn2">
                    <button className="button" onClick={routToNextPage}>
                      Select Competitions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
