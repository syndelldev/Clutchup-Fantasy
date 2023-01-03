import React, { useState, useEffect } from "react";
import "./Style.css";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import { useHistory, useLocation } from "react-router-dom";
import Visibility from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOutlined";
import { supabase } from "../../supabaseClient";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function () {
  let lagname;
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  console.log(location);
  const [LeagueName, setLeagueName] = useState("");
  const [allradyLink, setallradyLink] = useState(false);
  const [blankinput, setBlankinput] = useState(false);
  const [teamCodelength, setTeamCodelength] = useState(false);
  const [alreadyexists, setAlreadyexists] = useState(false);
  const [Leagenames, setLeagenames] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [Startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [currentdate, setCurrentDate] = useState("");
  const email = location.state;
  
  console.log(email);
  const getLeagueName = async (e) => {
    const { value } = e.target.value;
    setLeagueName(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    getCurrentDate();
  }, []);
  const addWeeksToDate = (dateObj,numberOfWeeks) => {
    dateObj.setDate(dateObj.getDate()+ numberOfWeeks * 7);
    return dateObj;
  }
    // ======================= date & time =========================
    const getCurrentDate = () => {
      const numWeeks = 1;
console.log("newdate",addWeeksToDate(new Date(), numWeeks));

      var today = new Date();
      var enddatava =format(addWeeksToDate(new Date(), numWeeks), 'MM/dd/yyyy h:mm aa');
      console.log(format(today, 'MM/dd/yyyy h:mm aa'));
      console.log(today);
      console.log("enddate",enddatava);
      //var formatedataval = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today);
      //format(today, 'dd/mm/yyyy, --:-- --')
      //today.toISOString();
      console.log(today);
      setStartDate(format(today, 'MM/dd/yyyy h:mm aa'));
      setEndDate(enddatava);
      // var date = new Date().getDate();
      // var month = new Date().getMonth();
      // var yers = new Date().getFullYear();
  
      // return date + " " + MONTHS[month] + "," + yers;
    };
  
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

  const handleTeamcode = async (e) => {
    const { value } = e.target.value;
    setTeamCode(e.target.value);
  };
  const handlestartdate = async (date) => {
    const { value } = date;
    setStartDate(date);
  };
  const handleenddate = async (date) => {
    const { value } = date;
    setEndDate(date);
  };


  const CreateLeague = async () => {
    // -------------------------------------validation of league name-----------------------------------------
    if (LeagueName.trim().length === 0 && teamCode.trim().length === 0) {
      setBlankinput(true);
    } else {
      setBlankinput(false);
      if (teamCode.length <= 4) {
        setTeamCodelength(true);
      } else {
        setTeamCodelength(false);
      if (LeagueName && teamCode) {
        const { data, error } = await supabase
          .from("createnewleague")
          .select("leaguename")
          .filter("leaguename", "eq", LeagueName);
        console.log(data);
        //lagname = data[0].leaguename;
        //setLeagenames(lagname);
        if (data.length !== 0) {
          setAlreadyexists(true);
        } else {
          setAlreadyexists(false);
          const { data, error } = await supabase
            .from("user")
            .select()
            .eq("email",email);
          console.log(data);
          var teamName = data[0].teamname;
          var teamusername = data[0].teamusername;
          if (data.length !== 0) {
            console.log("startdate",Startdate);
            console.log("enddate",enddate);
            
            //setAlreadyexists(false);
            const { data, error } = await supabase
              .from("createnewleague")
              .insert({
                teamname: teamName,
                teamusername: teamusername,
                leaguename : LeagueName,
                leaguecode : teamCode.toLowerCase(),
                leaguestartdate : Startdate,
                leagueenaddate : enddate,
                email : email
              }).select();
            console.log(error);

            //var teamName = data[0].teamname;
          const { data1, erro1 } = await supabase.from("league").insert({
            leaguename: LeagueName,
            teamcode: teamCode.toLowerCase(),
            email: email,
            teamname: teamName,
            type:'Private',
          });
            console.log("dfds", teamName);
            const teamCodeAndName = {
              teamCode: teamCode.toLowerCase(),
              LeagueName: LeagueName,
              email : email,
            };

            // const { insertData, inserterror } = await supabase
            //   .from("league")
            //   .insert({
            //     leaguename: LeagueName,
            //     teamcode: teamCode.toLowerCase(),
            //     email: email,
            //     teamname: teamName,
            //   });
            // console.log(inserterror);
            // console.log(insertData);
            history.push({
              pathname: "/create-league-successful/",
              state: teamCodeAndName,
            });
            // alert("This league name already exists please try different League Names");
          }
        }
      }}
      }
  };

  return (
    <div className="section">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <div className="Row">
          <div className="col1 ">
            <img src={BackgroundImage} className="mainimg" alt="back-image" />
          </div>
          <div className="col">
            <div className="contener">
              <div className="d-box">
                <img src={logoimages} className="logo" />
                <h3 className="hading mt-0 h-50">Create League</h3>
                <div className="form-outline">
                  <div className="user-input-wrp">
                    <br />
                    <input
                      onChange={getLeagueName}
                      type="text"
                      className="inputText"
                      maxLength="20"
                      required
                      autoSave="off"
                      autoComplete="off"
                      aria-autocomplete="off"
                      autoFocus="off"
                      autocorrect="off"
                    />
                    <span className="floating-label">League Name</span>
                    {blankinput && (
                      <small className="d-block mb-2 red errors">
                        Please Enter League name.
                      </small>
                    )}
                  </div>
                  <div className="user-input-wrp">
                    <br />
                    <input
                      type={values.showPassword ? "text" : "password"}
                      onChange={handleTeamcode}
                      maxLength="30"
                      required
                      autoSave="off"
                      autoComplete="none"
                      aria-autocomplete="off"
                      autoFocus="off"
                      autocorrect="off"
                      className="inputText"
                      
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
                    <span className="floating-label">League code</span>
                    {blankinput && (
                      <small className="d-block mb-2 red errors">
                        Please Enter League code.
                      </small>
                    )}
                    {allradyLink && (
                      <small className="d-block mb-2 red errors">
                        You already created League name {Leagenames}
                      </small>
                    )}
                    {teamCodelength && (
                      <small className="d-block mb-2 red errors">
                        Minimum 5 characters required.
                      </small>
                    )}
                    {alreadyexists && (
                      <small className="d-block mb-2 red errors">
                        League name already exists please try different League
                        Names.
                      </small>
                    )}

                  </div>
                  {/* <div className="lableintext">
                   <label >Start date</label> 
                  <DatePicker className="dateinputs" selected={Startdate} minDate={new Date()} showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="dd/MM/yyyy h:mm aa"
               onSelect={handlestartdate} onChange={handlestartdate} />
                  </div> */}
                
                  {/* <div className="lableintext">
                   <label >End date</label> 
                  <DatePicker className="dateinputs" selected={enddate} minDate={Startdate} showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="time"
              dateFormat="dd/MM/yyyy h:mm aa"
               onSelect={handleenddate} onChange={handleenddate} />
                  </div> */}
                </div>
                <div className="btn2">
                  <button className="button" onClick={CreateLeague}>
                    Create
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
