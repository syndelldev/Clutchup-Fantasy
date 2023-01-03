import React from "react";
import BackgroundImage from "../../images/Left.png";
import { useHistory,  } from "react-router-dom";
import logoimages from "../../images/logo_1.png";
import { Link } from "react-router-dom";

export default function SplashScreen() {
  const history = useHistory();
  const nextpage =()=>{

    history.push({
      pathname: "/Teamlogin/",
    });
  }
  return (
    // ============================================== ui part start =======================================
    <div>
      <div className="section">
        <div className="contener">
          <div className="Row">
            <div className="col1">
              <img src={BackgroundImage} className="mainimg" alt="back-image" />
            </div>
            <div className="col">
              <div className="d-box">
                <img src={logoimages} className="logo" alt="" />
                <div className="hading my-3">Welcome to ClutchUp Fantasy Esports</div>
                <p>
                  Free Fortnite Fantasy game, where you pick your own team of
                  players and compete against your friends and much more. What
                  are you waiting for, create your team now.
                </p>
                <div className="btn2">
                  <button className="button"  onClick={nextpage}>
                    Create Team
                  </button>
                </div>
                <div className="footer">
                  <div className="player">
                    Already a player?
                    <Link style={{ textDecoration: "none" }} to="/Mainlogin/">
                      <span>Login</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
