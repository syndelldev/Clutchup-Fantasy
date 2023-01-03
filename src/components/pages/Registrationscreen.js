import "./Style.css";
import React, { useState, useEffect } from "react";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Visibility from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOutlined";
import Conformpopup from "./Conformpopup.js";
import { el } from "date-fns/locale";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailblank, setemailblank] = useState(false);
  const [Passwordblank, setPasswordblank] = useState(false);
  const [Cpasswordblank, setCpasswordblank] = useState(false);
  const [Passwordlangh, setPasswordlangh] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [isEmailExits, setIsEmailExtis] = useState(false);
  const [isTeamscondition, setIsTeamsCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const {selectedData, username, teamname} = location.state;
  const [conformPopup, setConformpopup] = useState(false);

  const userInput = {
    isPasswordOk: false,
    isEmailOk: false,
    isConfirmPasswordOk: false,
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  // ------------------get user email input -----------------------
  const getEmail = (e) => {
    const { value } = e.target;
    if (value === " ") {
      setIsValidEmail(false);
      return;
    } else {
      setEmail(e.target.value);
      setemailblank(false);
    
    }
  };

  // --------------------get user password input ---------------------------
  const getPassword = (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {
      setPassword(e.target.value);
      setPasswordblank(false);
    }
  };

  // -----------------get conf pass from user input -----------------
  const getConfirmPassword = (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {
      setConfirmPassword(e.target.value);
      setCpasswordblank(false);
    }
  };

  const handleLogin = async () => {
    if(email.trim().length === 0 && password.trim().length === 0 && confirmPassword.trim().length === 0 && checked === false){
      setemailblank(true);
      setPasswordblank(true);
      setCpasswordblank(true);
      setIsTeamsCondition(true);
    }else{
      if(email.trim().length !== 0){
        setemailblank(false);
        if(password.trim().length !== 0){
          setPasswordblank(false);
          if(confirmPassword.trim().length !== 0){
            setCpasswordblank(false);
            if(checked === true){
              setPasswordblank(false);
              setemailblank(false);
              setCpasswordblank(false);
              setIsTeamsCondition(false);
              if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i.test(email)) {
                userInput.isEmailOk = true;
                setIsValidEmail(false);
                 // ------------password validation--------------
                  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/.test(password)) {
                    userInput.isPasswordOk = true;
                    setIsValidPassword(false);
                    if (password.length < 7) {
                      setPasswordlangh(true);
                    } else {
                      setPasswordlangh(false);
                      if (password === confirmPassword) {
                        userInput.isConfirmPasswordOk = true;
                        setIsValidConfirmPassword(false);
                        if (checked === true) {
                          setIsTeamsCondition(false);
                          if (
                            userInput.isEmailOk &&
                            userInput.isConfirmPasswordOk &&
                            userInput.isPasswordOk === true
                          ) {
                            const selectData = await supabase
                              .from("user")
                              .select()
                              .match({ email: email });
                            console.log(selectData);
                            if (selectData.data.length !== 0) {
                              setIsEmailExtis(true);
                            } else {
                              setIsEmailExtis(false);
                              const { data, error } = await supabase.auth.signUp({
                                email: email,
                                password: password,
                              });
                              if (!error) {
                                const upsertData = selectedData.forEach(async (sa) =>
                  
                                  await supabase.from("selectedteam").insert({
                                    playername: sa.playername,
                                    price: sa.price,
                                    pointsearend: sa.pointsearend,
                                    username: username,
                                    teamname: teamname,
                                    playerid: sa.id,
                                    email: email
                                  })
                                  );
                                // const { selectedteamdata, selectedteamerror } = await supabase
                                // .from("selectedteam")
                                // .update({
                                //   email: email,
                                // })
                                // .eq("username", username)
                                // .select();
                  
                              const { userData, userError } = await supabase
                                .from("user")
                                .update({
                                  email: email,
                                })
                                .eq("teamusername", username)
                                .select();
                              console.log(userData);
                              const userDetails = {
                                username: username,
                                teamname: teamname,
                                email:email
                              }
                              if(checked == true){
                                history.push({
                                  pathname: "/WelcomesScreen/",
                                  state: userDetails,
                                });
                              }else{
                                setIsTeamsCondition(true);
                              }
                                //setConformpopup(true);
                               
                              }
                            }
                          }
                        } else {
                          setIsTeamsCondition(true);
                        }
                      } else {
                        setIsValidConfirmPassword(true);
                      }
                    }
                  } else {
                    setIsValidPassword(true);
                  }
              } else {
                setIsValidEmail(true);
              }
            }else{
              setPasswordblank(false);
              setemailblank(false);
              setCpasswordblank(false);
              setIsTeamsCondition(true);
              console.log("check",true);
            }
          }else{
            setPasswordblank(false);
          setemailblank(false);
      setCpasswordblank(true);
      setIsTeamsCondition(true);
          }
        }else{
          if(confirmPassword.trim().length !== 0){
            setCpasswordblank(false);
            console.log("file",true);
            if(checked === true){
              setPasswordblank(false);
              setemailblank(false);
              setCpasswordblank(false);
              setIsTeamsCondition(false);
              if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i.test(email)) {
                userInput.isEmailOk = true;
                setIsValidEmail(false);
                 // ------------password validation--------------
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/.test(password)) {
                    userInput.isPasswordOk = true;
                    setIsValidPassword(false);
                    if (password.length < 7) {
                      setPasswordlangh(true);
                    } else {
                      setPasswordlangh(false);
                      if (password === confirmPassword) {
                        userInput.isConfirmPasswordOk = true;
                        setIsValidConfirmPassword(false);
                        if (checked === true) {
                          setIsTeamsCondition(false);
                          if (
                            userInput.isEmailOk &&
                            userInput.isConfirmPasswordOk &&
                            userInput.isPasswordOk === true
                          ) {
                            const selectData = await supabase
                              .from("user")
                              .select()
                              .match({ email: email });
                            console.log(selectData);
                            if (selectData.data.length !== 0) {
                              setIsEmailExtis(true);
                            } else {
                              setIsEmailExtis(false);
                              const { data, error } = await supabase.auth.signUp({
                                email: email,
                                password: password,
                              });
                              if (!error) {
                                const upsertData = selectedData.forEach(async (sa) =>
                  
                                  await supabase.from("selectedteam").insert({
                                    playername: sa.playername,
                                    price: sa.price,
                                    pointsearend: sa.pointsearend,
                                    username: username,
                                    teamname: teamname,
                                    playerid: sa.id,
                                    email: email
                                  })
                                  );
                                // const { selectedteamdata, selectedteamerror } = await supabase
                                // .from("selectedteam")
                                // .update({
                                //   email: email,
                                // })
                                // .eq("username", username)
                                // .select();
                  
                              const { userData, userError } = await supabase
                                .from("user")
                                .update({
                                  email: email,
                                })
                                .eq("teamusername", username)
                                .select();
                              console.log(userData);
                              const userDetails = {
                                username: username,
                                teamname: teamname,
                                email:email
                              }
                              if(checked == true){
                                history.push({
                                  pathname: "/WelcomesScreen/",
                                  state: userDetails,
                                });
                              }else{
                                setIsTeamsCondition(true);
                              }
                                //setConformpopup(true);
                               
                              }
                            }
                          }
                        } else {
                          setIsTeamsCondition(true);
                        }
                      } else {
                        setIsValidConfirmPassword(true);
                      }
                    }
                  } else {
                    setIsValidPassword(true);
                  }
              } else {
                setIsValidEmail(true);
              }
            }else{
              setPasswordblank(false);
              setemailblank(false);
              setCpasswordblank(false);
              setIsTeamsCondition(true);
              console.log("check",true);
            }
          }else{
            setPasswordblank(true);
          setemailblank(false);
      setCpasswordblank(true);
      setIsTeamsCondition(true);
          }
        }
      }else{
        setemailblank(true);
        setPasswordblank(false);
      setCpasswordblank(false);
      setIsTeamsCondition(false);
      setIsValidConfirmPassword(false);
      }
     
    }
  };

  // --------------------------------terms and conditions-----------------------------------
  const enableCreateTeam = (e) => {
    if (e.target.checked) {
      console.log("chefcj",e.target.checked);
      setChecked(true);
    }else{
      console.log("chefcj",e.target.checked);
      setChecked(false);
    }
  };

  // ------------------------------------- password show & hide ---------------------------
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const passwordhandleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const CpasswordhandleClickShowPassword = () => {
    setValues({ ...values, CshowPassword: !values.CshowPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
  // ========================================== ui part start==============================
    <>
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
                  <h3 className="rghading ">Create Account</h3>
                  <div className="form-outline">
                    <div className="user-input-wrp inputssize">
                      <br />

                      <input
                        onChange={getEmail}
                        value={email}
                        autocomplete="off"
                        autocorrect="off"
                        type="text"
                        className="inputText"
                        required
                      />
                      <span className="floating-label">EMAIL</span>
                      {isEmailExits && (
                        <small className="d-block mb-1 red">
                          Email is already registered.
                        </small>
                      )}
                      {isValidEmail && (
                        <small className="d-block mb-1 red">
                          Please enter valid email address.
                        </small>
                      )}
                      {emailblank && (
                        <small className="d-block mb-1 red">
                          Please enter email address.
                        </small>
                      )}
                    </div>
                    <div className="user-input-wrp inputssize">
                      <br />
                      <input
                        type={values.showPassword ? "text" : "password"}
                        onChange={getPassword}
                        autocomplete="off"
                        autocorrect="off"
                        className="inputText"
                        maxLength="20"
                        required
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="20"
                        color="#757575"
                        className="bi bi-eye"
                        onClick={passwordhandleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </svg>
                      <span className="floating-label">PASSWORD</span>
                      {isValidPassword && (
                        <small className="d-block mb-1 red">
                          One uppercase, one lowercase, one number & one special
                          character
                        </small>
                      )}
                      {Passwordblank && (
                        <small className="d-block mb-1 red">
                          Please enter password.
                        </small>
                      )}
                      {Passwordlangh && (
                        <small className="d-block mb-1 red">
                           Minimum 8 char required.
                        </small>
                      )}
                    </div>

                    <div className="user-input-wrp inputssize">
                      <br />
                      <input
                        type={values.CshowPassword ? "text" : "password"}
                        onChange={getConfirmPassword}
                        autocomplete="off"
                        autocorrect="off"
                        className="inputText"
                        maxLength="20"
                        required
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="20"
                        color="#757575"
                        className="bi bi-eye"
                        onClick={CpasswordhandleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                      >
                        {values.CshowPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </svg>
                      <span className="floating-label">CONFIRM PASSWORD</span>
                      {isValidConfirmPassword && (
                        <small className="d-block mb-1 red">
                          Password does not match.
                        </small>
                      )}{" "}
                      {Cpasswordblank && (
                        <small className="d-block mb-1 red">
                          Please enter confirm password.
                        </small>
                      )}
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    width={20}
                    height={20}
                    id="agree"
                    name="agree"
                    value="yes"
                    onClick={enableCreateTeam}
                  />
                  <label htmlFor="agree" className="TermsandConditions">
                    <div
                      style={{
                        textAlign: "left",
                        paddingLeft: 8,
                        cursor: "pointer",
                      }}
                    >
                      By creating an account, you agree to our<br></br>
                      <span
                        style={{
                          color: "#251F2B",
                          marginLeft: "auto",
                          cursor: "pointer",
                        }}
                      >
                        Terms
                      </span>{" "}
                      and
                      <span style={{ color: "#251F2B", cursor: "pointer" }}>
                        Conditions
                      </span>
                    </div>
                  </label>
                  {isTeamscondition && (
                    <small className="d-block mb-1 red">
                      Please accept terms and conditions to proceed.
                    </small>
                  )}
                  <div className="btnrg">
                    <button
                      className="button"
                      type="submit"
                      name="submit"
                      value="Submit"
                      onClick={handleLogin}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {conformPopup && <Conformpopup email={email}/>}
    </>
  );
}
