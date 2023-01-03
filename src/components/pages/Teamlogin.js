import React, { useState } from "react";
import "./Style.css";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";

export default function () {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userNameblank, setUserNameblank] = useState(false);
  const [teamNameblank, setteamNameblank] = useState(false);
  const [userNameLength, setUserNameLength] = useState(false);
  const [teamNameLength, setTeamNameLength] = useState(false);
  const [teamNameMaxLength, setTeamNameMaxLength] = useState(false);
  const [userNameMaxLength, setuserNameMaxLength] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamNamevalidation, setTeamNamevalidation] = useState(false);
  var testUserName = false;
  var testTeamName = false;
  var supabaseUserData = [];
  // ================================= page loading start ========================================
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  // ======================================= validation part ===========================================
  const handleUserName = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {
      setUserName(e.target.value);
      setUserNameblank(false);

      if (userName.length === 19) {
        setuserNameMaxLength(true);
      } else {
        setuserNameMaxLength(false);
      }
    }
  };
  const handleTeamName = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      setteamNameblank(true);
      return;
    } else {
      setTeamName(e.target.value);
      setteamNameblank(false);

      if (teamName.length === 19) {
        setTeamNameMaxLength(true);
      } else {
        setTeamNameMaxLength(false);
      }
    }
  };
  
  const handleLogin = async () => {
    if (userName.trim().length === 0 && teamName.trim().length === 0) {
      setUserNameblank(true);
        setteamNameblank(true);
        setTeamNameLength(false);
        setUserNameLength(false);
      
      //console.log("sdsadf", userNameblank);
    } else {
      if(userName.trim().length === 0){
        setUserNameblank(true);
        setteamNameblank(false)
        setTeamNameLength(false);
        setUserNameLength(false);
        if(teamName.length !== 0){
          if(teamName.length <= 3){
            setTeamNameLength(true);
            setUserNameLength(false);
          }else{
            setTeamNameLength(false);
            setUserNameLength(false);
          }
        }else{
          setTeamNameLength(false);
        setUserNameLength(false);
        }
        
      }else if(teamName.trim().length === 0){
        setUserNameblank(false);
        setteamNameblank(true);
        setTeamNameLength(false);
        setUserNameLength(false);
        if(userName.length !== 0){
          if(userName.length <= 3){
            setTeamNameLength(false);
            setUserNameLength(true);
          }else{
            setTeamNameLength(false);
            setUserNameLength(false);
          }
        }else{
          setTeamNameLength(false);
          setUserNameLength(false);
        }
       
      }else{
        setUserNameblank(false);
        setteamNameblank(false);
        if (userName.length > 3 && teamName.length > 3) {
          testUserName = true;
          testTeamName = true;
          if (testUserName && testTeamName === true) {
            setTeamNameLength(false);
            setUserNameLength(false);
            const { data, error } = await supabase
              .from("user")
              .select("teamusername, teamname")
              .filter("teamusername, teamname", "eq", userName, teamName);
            supabaseUserData = data;
            console.log(data);
            console.log(error);
            if (data.length !== 0) {
              if(data[0].teamusername == userName){
                setTeamNamevalidation(true);
              }else if(data[0].teamusername == teamName){
                setTeamNamevalidation(true);
              }else{
                setTeamNamevalidation(false);
              }
              
            } else {
              setTeamNamevalidation(false);
              // =========================================== supabse part ========================================
              const { data, error } = await supabase
                .from("user")
                .insert({ teamusername: userName, teamname: teamName });
              console.log("sdsfd", data);
              history.push({
                pathname: "/TeamSelectscreen/",
                state: {
                  teamusername: userName,
                  teamname: teamName,
                },
              });
            }
          }
        } else {
          if(userName.length <= 3 && teamName.length <= 3){
          setTeamNameLength(true);
          setUserNameLength(true);
          }else{
            if(userName.length <= 3){
              setTeamNameLength(false);
              setUserNameLength(true);
            }else{
              setTeamNameLength(true);
              setUserNameLength(false);
            }
  
          }
  
         
        }
      }
      
      
    }
  };
  return (
    // ========================================== UI part start==========================================
    <div className="section">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <img src={logoimages} style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <div className="Row">
          <div className="col1">
            <img src={BackgroundImage} className="mainimg" alt="back-image" />
          </div>
          <div className="col">
            <div className="contener">
              <div className="d-box">
                <img src={logoimages} className="logo" />
                <h3 className="hading mt-3 h-50 mb-3">Create Your Team</h3>
                <div className="form-outline">
                  <div className="user-input-wrp">
                    <br />
                    <input
                      onChange={handleUserName}
                      value={userName}
                      type="text"
                      minLength="0"
                      autocomplete="off"
                      autocorrect="off"
                      className="inputText"
                      maxLength="20"
                      required
                    />
                    <span className="floating-label">USER NAME</span>
                    {userNameblank && (
                      <small className="d-block mb-1 red">
                        Please Enter Username.
                      </small>
                    )}
                    {userNameLength && (
                      <small className="d-block mb-1 red">
                        Minimum 4 characters required.
                      </small>
                    )}
                    {userNameMaxLength && (
                      <small className="d-block mb-1 red">
                        Maximum 20 characters limit reached.
                      </small>
                    )}
                  </div>
                  <div className="user-input-wrp">
                    <br />
                    <input
                      type="text"
                      onChange={handleTeamName}
                      value={teamName}
                      autocomplete="off"
                      autocorrect="off"
                      minLength="0"
                      maxLength="20"
                      className="inputText"
                      required
                    />
                    <span className="floating-label">TEAM NAME</span>
                    {teamNameblank && (
                      <small className="d-block mb-1 red">
                        Please Enter TeamName.
                      </small>
                    )}
                    {teamNameLength && (
                      <small className="d-block mb-1 red">
                        Minimum 4 characters required.
                      </small>
                    )}{" "}
                    {teamNameMaxLength && (
                      <small className="d-block mb-1 red">
                        Maximum 20 characters limit reached.
                      </small>
                    )}
                  </div>
                  {teamNamevalidation && (
                    <small className="d-block mb-1 red">
                      Same User Name/Team Name already exists, please try different User Name/ Team Name.
                    </small>
                  )}
                </div>

                <div className="btn2">
                  <button className="button" onClick={handleLogin}>
                    Create Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
