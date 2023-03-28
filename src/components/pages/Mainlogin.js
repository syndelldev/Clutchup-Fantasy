import React, { useState, navigate } from "react";
import "./Style.css";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOutlined";
import { useEffect } from "react";

export default function () {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidTeamPassword, setIsValidTeamPassword] = useState(false);

  const [isValidEmails, setIsValidEmails] = useState(false);
  const [isValidEmailsvalue,setIsValidEmailsvalue] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleUserName = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {
      setEmail(e.target.value);
    }
  };
  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  useEffect(() => {
    if (localStorage.checkbox && localStorage.email !== "") {
      document.getElementById("checkbox").checked = true;
      setEmail(localStorage.username);
      setPassword(localStorage.password);
    }
  }, []);
  const checkboxInput = {
    email,
  };
  const handleLogin = async () => {
    if (isChecked && email !== "") {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.checkbox = true;
      if(email !== "" && password !== ""){
      if (email === "") {
        setIsValidEmail(true);
      }else{
        setIsValidEmail(false);
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          setIsValidEmails(false);
          if (password === "") {
            setIsValidTeamPassword(true);
            setCredentials(false);
          }else{
            setIsValidTeamPassword(false);
            const { data, error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
            });
            //console.log("asd",error.message);
            // console.log("wrkel",error.message);
            // if (error) alert("Please enter correct email id and password");
            if (!error) {
              history.push({
                pathname: "/landing-screen/",
                state: checkboxInput,
              });
            } else {
              if(error.message === "Email not confirmed"){
                setCredentials(false);
                let { data, error } = await supabase
                .from('user')
                .select()
                .eq('email',email)
                if(!error){
                  history.push({
                    pathname: "/landing-screen/",
                    state: checkboxInput,
                  });
                  console.log("djmv",error);
                  console.log("snvmx",data);
                }else{
                  setCredentials(true);
                }
              }else{
                console.log("vnbmk",error);
                if(error.message === "Invalid login credentials"){
                  let { data, error } = await supabase
                .from('user')
                .select()
                .eq('email',email) 
                if(data.length !== 0){
                  if(data[0].email !== email){
                      setIsValidEmails(true);
                  }else{
                    setIsValidEmails(false);
                    setCredentials(true);
                  }
                 }else{
                  setIsValidEmailsvalue(true);
                  setCredentials(false);
                 }
                }
                //setCredentials(true);
              }
              
            }
          }
        } else {
          setIsValidEmails(true);
        }
      } 
    }else{
      setIsValidEmail(true);
      setIsValidTeamPassword(true);
      setCredentials(false);
    }

    }else{
      if(email !== "" && password !== ""){
      if (email === "") {
        setIsValidEmail(true);
      }else{
        setIsValidEmail(false);
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i.test(email)) {
          setIsValidEmails(false);
          if (password === "") {
            setIsValidTeamPassword(true);
            setCredentials(false);
          }else{
            setIsValidTeamPassword(false);
            const { data, error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
            });
            //console.log("asd",error.message);
            // console.log("wrkel",error.message);
            // if (error) alert("Please enter correct email id and password");
            if (!error) {
              history.push({
                pathname: "/landing-screen/",
                state: checkboxInput,
              });
            } else {
              if(error.message === "Email not confirmed"){
                setCredentials(false);
                let { data, error } = await supabase
                .from('user')
                .select()
                .eq('email',email)
                if(!error){
                  history.push({
                    pathname: "/landing-screen/",
                    state: checkboxInput,
                  });
                  console.log("djmv",error);
                  console.log("snvmx",data);
                }else{
                  setCredentials(true);
                }
              }else{
                console.log("vnbmk",error);
                if(error.message === "Invalid login credentials"){
                  let { data, error } = await supabase
                .from('user')
                .select()
                .eq('email',email) 
                console.log("dama",data);
                 if(data.length !== 0){
                  if(data[0].email !== email){
                      setIsValidEmails(true);
                  }else{
                    setIsValidEmails(false);
                    setCredentials(true);
                  }
                 }else{
                  setIsValidEmailsvalue(true);
                  setCredentials(false);
                 }
                }
                //setCredentials(true);
              }
              
            }
          }
        } else {
          setIsValidEmails(true);
        }
      }
    }else{
      if (email === "") {
        setIsValidEmail(true);
      setIsValidTeamPassword(false);
      setCredentials(false);
      if (password === ""){
        console.log("aJS");
       // setIsValidEmail(false);
        setIsValidTeamPassword(true);
        setCredentials(false);
      }else{
        setIsValidEmail(false);
        setIsValidTeamPassword(false);
        setCredentials(false);
        }
      }else if (password === ""){
        console.log("aJS");
        setIsValidEmail(false);
        setIsValidTeamPassword(true);
        setCredentials(false);
        if(email === ""){
          setIsValidEmail(true);
          //setIsValidTeamPassword(false);
          setCredentials(false);
        }else{
          setIsValidEmail(false);
          //setIsValidTeamPassword(false);
          setCredentials(false);
        }
      }else if(email === "" && password === ""){
        console.log("aJS");
        setIsValidEmail(true);
        setIsValidTeamPassword(true);
        setCredentials(false);
      }
      
    }
    }
   
  };
  // const textFromStorage = localStorage.getItem('password');
  // console.log(textFromStorage);
  // ------------------------------------- password show & hide ---------------------------
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const passwordhandleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ------------------------------remember me------------------------
  const rememerMe = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    }
  };

  return (
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
                <h3 className="hading mt-0">Welcome Back to Clutchup</h3>
                <div className="form-outline">
                  <div className="user-input-wrp">
                    <br />
                    <input
                      onChange={handleUserName}
                      value={email}
                      id="email"
                      type="text"
                      className="inputText"
                      required
                    />
                    <span className="floating-label">EMAIL</span>
                    {isValidEmail && (
                      <small className="d-block mb-2 red errors">
                        Please Enter Email Address.
                      </small>
                    )}
                    {isValidEmails && (
                      <small className="d-block mb-2 red errors">
                        Please Enter Valid Email Address.
                      </small>
                    )}
                    {isValidEmailsvalue && (
                      <small className="d-block mb-2 red errors">
                        Your Email Id is not Registered.
                      </small>
                    )}
                  </div>
                  <div className="user-input-wrp">
                    <br />
                    <input
                      type={values.showPassword ? "text" : "password"}
                      onChange={handlePassword}
                      className="inputText"
                      value={password}
                      id="password"
                      maxLength={30}
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </svg>
                    <span className="floating-label">PASSWORD</span>
                    {isValidTeamPassword && (
                      <small className="d-block mb-2  red errors">
                        Please Enter Password.
                      </small>
                    )}
                    {passwordLength && (
                      <small className="d-block mb-2 red errors">
                        Minimum 8 characters required.
                      </small>
                    )}
                    {credentials && (
                      <small className="d-block mb-2 red errors">
                        Invalid login Password.
                      </small>
                    )}
                  </div>
                </div>
                <div className="footer-links">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="fruit-1"
                    value="Apple"
                    onClick={rememerMe}
                  />
                  <label htmlFor="checkbox"> &nbsp;Remember Me </label>
                  <Link className="password" to="/Forgotscreen/">
                    Forgot Password?
                  </Link>
                </div>

                <div className="btn2">
                  <button
                    className="button"
                    type="submit"
                    name="submit"
                    value="Submit"
                    onClick={handleLogin}
                  >
                    Log in
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
