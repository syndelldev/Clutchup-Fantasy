import React, { useEffect, useState } from "react";
import "./Style.css";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Visibility from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOutlined";

export default function () {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");

  const userInput = {
    isPasswordOk: false,
    isConfirmPasswordOk: false,
  };

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

  const handlePassword = (e) => {
    const { value } = e.target;
    if (value === " ") {
      setIsValidPassword(true);
      return;
    } else {
      setIsValidPassword(false);
      setPassword(e.target.value);
    }
  };

  const handleConformPassword = (e) => {
    const { value } = e.target;
    if (value === " ") {
      setIsValidPassword(true);
      return;
    } else {
      setIsValidPassword(false);
      setconformPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    // ------------password validation--------------
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/.test(
        password
      )
    ) {
      userInput.isPasswordOk = true;
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
      
    }
    if (password !== conformPassword) {
      setIsValidConfirmPassword(true);
    }else{
      userInput.isConfirmPasswordOk = true;
      setIsValidConfirmPassword(false);
    }

    if (userInput.isPasswordOk && userInput.isConfirmPasswordOk === true) {
     
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (!error){
        history.push('/Teamlogin/')
        console.log(data);
      }
      if (error){
        alert("There was an error updating your password.");
        console.log(error);
      } 
    }
  };

  const viewPassword = () => {
    var passwordInput = document.getElementById("password-field");
    var passStatus = document.getElementById("pass-status");
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
    <div className="section">
      {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
          <img src={logoimages} style={{ width:100,height:100, }} />
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
              <h3 className="hading">Reset Password</h3>
              <div className="form-outline">
                <div className="user-input-wrp">
                  <br />
                  <input
                     type={values.showPassword ? "text" : "password"}
                    onChange={handlePassword}
                    value={password}
                    className="inputText"
                    maxLength="20"
                    required
                  />
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20"  color="#757575" className="bi bi-eye" onClick={passwordhandleClickShowPassword} onMouseDown={handleMouseDownPassword} aria-hidden="true" viewBox="0 0 16 16">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </svg>
                  <span className="floating-label">NEW PASSWORD</span>
                  {isValidPassword && (
                    <small className="d-block mb-2 red">
                      Password must contain minimum eight characters, at least
                      one uppercase letter, one lowercase letter, one number and
                      one special character.
                    </small>
                  )}
                </div>

                <div className="user-input-wrp">
                  <br />
                  <input
                   type={values.CshowPassword ? "text" : "password"}
                    onChange={handleConformPassword}
                    value={conformPassword}
                    className="inputText"
                    maxLength="20"
                    required
                  />
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20"  color="#757575" className="bi bi-eye" onClick={CpasswordhandleClickShowPassword} onMouseDown={handleMouseDownPassword} aria-hidden="true" viewBox="0 0 16 16">
                        {values.CshowPassword ? <Visibility /> : <VisibilityOff />}
                        </svg>
                  <span className="floating-label">CONFIRM NEW PASSWORD</span>
                  {isValidConfirmPassword && (
                    <small className="d-block mb-2 red">
                      Confirm Password Not Match.
                    </small>
                  )}
                </div>
              </div>

              <div className="btn2">
                <button className="button" onClick={handleLogin}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}
