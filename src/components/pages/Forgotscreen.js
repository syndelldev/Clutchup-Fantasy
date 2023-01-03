import React, { useState, useEffect } from "react";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import "./Style.css";
import ConforPsmpopup from "./ConforPsmpopup.js";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Update } from "@material-ui/icons";

const Forgotscreen = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [conformpsPopup, setConformpsPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const userInput = {
    isEmailOk: false,
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const resetPassword = async () => {
    if (email.trim().length === 0) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email
        // {
        //   redirectTo: "https://clutchuappreactjs-phash-1.d1cr5nflmqclb3.amplifyapp.com/ResetPassword/",
        // }
      );
     console.log(data);
      if (!error) {
        setIsValidEmail(false);
        let { data, error } = await supabase
          .from('user')
          .select()
          .eq('email',email)
        console.log("file",data);
        if(data.length !== 0){
          if(data[0].email === email){
            setConformpsPopup(true);
          }else{
            setIsValidEmail(true);
          }
        }else{
          setIsValidEmail(true);
        }
        
        // history.push('/Mainlogin/')
      } else {
        // alert(error.message || error);
        setIsValidEmail(true);
      }
    }
    // console.log(data);
    // console.log(error);
  };

  return (
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
                  <h3 className="hading">Forgot Password</h3>
                  <div className="forgot-pass">
                    <div className="user-input-wrp">
                      <br />
                      <input
                        type="text"
                        className="inputText"
                        
                        onChange={getEmail}
                        required
                      />
                      <span className="floating-label">EMAIL</span>
                      {isValidEmail && (
                        <small
                          style={{
                            textAlign: "left",
                            marginTop: 5,
                            color: "red",
                            display: "grid",
                          }}
                        >
                          Please Enter Email Address.
                        </small>
                      )}
                    </div>
                    <div className="btn2 mt-3">
                      <button className="button" onClick={resetPassword}>
                        Submit
                      </button>
                    </div>
                  </div>
                <div className="Terms-conditions">
                  Privacy | Terms & Conditions
                </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {conformpsPopup && <ConforPsmpopup />}
    </>
  );
};

export default Forgotscreen;
