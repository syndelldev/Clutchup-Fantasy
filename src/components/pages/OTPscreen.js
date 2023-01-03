import React from 'react';
import './Style.css';
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Link } from 'react-router-dom';
class Otpinput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", disable: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(value1, event) {

    this.setState({ [value1]: event.target.value });
  }

  handleSubmit(event) {

    const data = new FormData(event.target);
    console.log(this.state);
    event.preventDefault();
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");
     
        const next = elmnt.target.tabIndex;
        if (next < 5) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

  render() {
    return (
        <div className="section">  
        <div className="Row">
        <div className="col1">
          <img src={BackgroundImage} className="mainimg" alt="back-image" />
        </div>
        <div className="col">
        <div className="contener">
        <div className="d-box">
        <img src={logoimages} className='logo' />
            <h3 className="hading">Enter OTP</h3>
      <form onSubmit={this.handleSubmit} style={{ width:'100%' }}>
        <div className="otpContainer">

          <input
            name="otp1"
            type="number"
            autocomplete="off"
            className="otpInput"
            maxLength="1"
            value={this.state.otp1}
            onKeyPress={this.keyPressed}
            onChange={e => this.handleChange("otp1", e)}
            tabIndex="1"  onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp2"
            type="number"
            autocomplete="off"
            maxLength="1" 
            className="otpInput"
            value={this.state.otp2}
            onChange={e => this.handleChange("otp2", e)}
            tabIndex="2" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp3"
            type="number"
            autocomplete="off"
            className="otpInput"
            maxLength="1"
            value={this.state.otp3}
            onChange={e => this.handleChange("otp3", e)}
            tabIndex="3"  onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp4"
            type="number"
            autocomplete="off"
            maxLength="1" 
            className="otpInput"
            value={this.state.otp4}
            onChange={e => this.handleChange("otp4", e)}
            tabIndex="4" onKeyUp={e => this.inputfocus(e)}
          />
        </div>
        <div>
            <p style={{ textAlign: 'right', padding:'8px'  }}>(1:02) - Didn’t get the code?<span>Resend</span></p>
        </div>
      </form>
      <div className='btn2'>
                                <Link className='button' to="/login">
                                Confirm
                                </Link>

                                </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}


export default Otpinput;