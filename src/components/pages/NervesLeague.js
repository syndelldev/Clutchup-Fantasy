import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import logoimages from "../../images/logo_1.png";
import "../../assets/css/TeamSelection.css";
import { useHistory, useLocation } from "react-router-dom";
import { format } from 'date-fns';
export default function NervesLeague() {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userActualTeamCode, setUserActualTeamCode] = useState("");
  const [userActualLeagueName, setUserActualLeagueName] = useState("");
  const [userStartleagdata, setUserStartleagdata] = useState("");
  const [userEndleagdata, setUserEndleagdata] = useState("");
  const [Startleagdata, setStartleagdata] = useState("");
  const [Endleagdata, setEndleagdata] = useState("");
  const [StartleagTime, setStartleagTime] = useState("");
  const [EndleagTime, setEndleagTime] = useState("");
  const [existLeaguedate, setExistLeagueDate] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    fachdata();
  }, []);
  var userData = location.state;
  var email = userData[0].email;
  console.log(email);
  
  
  const fachdata = async () => {
    console.log("email",email);
    const { data, error } = await supabase
      .from("createnewleague")
      .select()
      .eq("email", email);
    console.log(data[0]);
    if(data.length !== 0){
      setUserActualTeamCode(data[0].leaguecode);
      setUserActualLeagueName(data[0].leaguename);
      setUserStartleagdata(data[0].leaguestartdate);
      setUserEndleagdata(data[0].leagueenaddate);
      // var dataval = format(data[0].leagestartdatetime, 'dd-MM-yyyy h:mm aa');
      // console.log(dataval);
      var startdatevalu = data[0].leaguestartdate;
      console.log(data[0].leaguestartdate);
      var dataval = startdatevalu.split(' ');
      var startdate = dataval[0];
      var starttime = dataval[1] +" " + dataval[2];
      console.log(dataval[1] +" " + dataval[2]);
      setStartleagdata(startdate);
      setStartleagTime(starttime);
      var enddatevalu = data[0].leagueenaddate;
      console.log(data[0].leagenddatetime);
      var dataval2 = enddatevalu.split(' ');
      var enddate = dataval2[0];
      var endtime = dataval2[1] +" " + dataval2[2];
      console.log(dataval2[1] +" " + dataval2[2]);
      setEndleagdata(enddate);
      setEndleagTime(endtime);
      setExistLeagueDate(true);
    }else{
      const { data, error } = await supabase
      .from("user")
      .select()
      .eq("email", email);
      console.log(data[0].teamname);
      setUserActualLeagueName(data[0].teamname);
      setExistLeagueDate(false);
    }
    
  };
  console.log(location);

 
 

  userData.sort(function (a, b) {
    return b.pointsearend - a.pointsearend;
  });
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var totalPoints = 0;
  // var updatedPlayerTotalPoints = [0];
  const [isItNot5PM, setIsItNot5PM] = useState(false);

  const date = new Date();

  // -----------------------------------totaling  total points--------------------------------
  if (userData) {
    userData.map((player) => {
      totalPoints = totalPoints + Number(player.pointsearend);
    });
  }
  // useEffect(() => {
  //   getCurrentDate();
  // }, []);
  // // ======================= date & time =========================
  // const getCurrentDate = () => {
   
  // };

  // --------------------------time validation-----------------------------
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  // useEffect(() => {
    
  //   //window.location.reload(true);
  //   console.log(format(new Date(), 'dd/MM/yyyy h:mm aa'));
  //   var currentdatevalu = format(new Date(), 'dd/MM/yyyy h:mm aa');
  //   console.log("etcgjs",Startleagdata);
  //   console.log("edvc",currentdatevalu >= userStartleagdata && Endleagdata <= userEndleagdata);
  //   if(currentdatevalu >= userStartleagdata && Endleagdata <= userEndleagdata){
  //     console.log("data",currentdatevalu >= userStartleagdata && Endleagdata <= userEndleagdata);
  //     setIsItNot5PM(false);
  //   // if(formatAMPM(new Date()) >= StartleagTime && formatAMPM(new Date()) <= EndleagTime){
  //   //   console.log(formatAMPM(new Date()));
  //   //   setIsItNot5PM(false);
  //   // }else{
  //   //   //console.log("data",currentdatevalu === Startleagdata);
  //   //   console.log(formatAMPM(new Date()));
  //   //   setIsItNot5PM(true);
  //   // }
  //   }else{
  //     //console.log("data",currentdatevalu === Startleagdata);
  //     console.log("data","false");
  //     setIsItNot5PM(true);
  //   }
  //   // if (formatAMPM(new Date()) !== "5:00 am") {
  //   //   setIsItNot5PM(true);
  //   // }
  //   // if (formatAMPM(new Date()) <= "5:00 pm") {
  //   //   setIsItNot5PM(false);
  //   // }
  // }, [formatAMPM(new Date())]);

  const handleSubmit = async () => {
    console.log(format(new Date(), 'MM/dd/yyyy h:mm aa'));
    var currentdatevalu = format(new Date(), 'MM/dd/yyyy h:mm aa');
    console.log("etcgjs",userStartleagdata);
    console.log("edvc",currentdatevalu >= userStartleagdata && Endleagdata <= userEndleagdata);
    const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email);
    if(data[0].Teamcode !== null){
    if(currentdatevalu >= userEndleagdata && Endleagdata <= userEndleagdata){
      console.log("data",currentdatevalu >= userStartleagdata && Endleagdata <= userEndleagdata);
      setIsItNot5PM(false);
    // if(formatAMPM(new Date()) >= StartleagTime && formatAMPM(new Date()) <= EndleagTime){
    //   console.log(formatAMPM(new Date()));
    //   setIsItNot5PM(false);
    // }else{
    //   //console.log("data",currentdatevalu === Startleagdata);
    //   console.log(formatAMPM(new Date()));
    //   setIsItNot5PM(true);
    // }
    }else{
      //console.log("data",currentdatevalu === Startleagdata);
      console.log("data","false");
      history.push({
        pathname: "/update-player-screen/",
        state: userData,
      })
      //setIsItNot5PM(true);
    }
  }else{
    history.push({
      pathname: "/update-player-screen/",
      state: userData,
    })
  }
    console.log(isItNot5PM);
    // console.log(format(new Date(), 'dd/MM/yyyy'));
    // var currentdatevalu = format(new Date(), 'dd/MM/yyyy');
    // if(currentdatevalu <= Startleagdata){
    //   console.log("data",currentdatevalu <= Startleagdata);
    //   if(formatAMPM(new Date()) <= StartleagTime){
    //     console.log(formatAMPM(new Date()));
    //     //setIsItNot5PM(false);
    //   }else{
    //     console.log(formatAMPM(new Date()));
    //     history.push({
    //       pathname: "/update-player-screen/",
    //       state: userData,
    //     });
    //   }
    // }else{
    //   history.push({
    //     pathname: "/update-player-screen/",
    //     state: userData,
    //   });
    // }

    // if (isItNot5PM === true) {
    //   console.log(isItNot5PM);
    //   history.push({
    //     pathname: "/update-player-screen/",
    //     state: userData,
    //   })
    // }
  };
  const checkboxInput = {
    email : userData[0].email,
  };
  const handleHome = async () => {
      history.push({
        pathname: "/landing-screen/",
        state: checkboxInput,
      });
  };
  

  return (
    <div className="section playerlist-section">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <img src={logoimages} style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <div className="contenor">
          <div className="neareleaguecon">
            <div className=" back-arrow" style={{ marginLeft: 12 }}>
              <i
                onClick={() => history.goBack()}
                className="fa fa-arrow-left mt-4"
                aria-hidden="true"
              ></i>
            </div>
            <div className=" title text-center teamhadding  h-40 mt-3 mb-2">
              {" "}
              {userActualLeagueName}
            </div>
          </div>
          {/* <div className="col-12 text-center nervesNae mt-1 mb-2"> NAE FNCS</div> */}
          {/* <hr /> */}

          <div className="row top-bar">
            <div className="col-12 px-4 d-flex"></div>
          </div>

          <div className="row table-data w-100 m-0">
          {existLeaguedate && (
              <div className="neralartrow">
              <i className='fa fa-exclamation-triangle'><span className="time-part">&nbsp;Rosters lock at {EndleagTime} EST on {Endleagdata}</span></i>
              </div>
            )}
            
            <div className="Mgmthadding">
              <div className="mgmtteam">PLAYER</div>
              <div
                style={{ width: "100%", textAlign: "right", color: "#757575" }}
              >
                POINTS
              </div>
            </div>
            {userData &&
              userData.map((player, index) => (
                <div
                  key={index}
                  id={"row-data-" + index}
                  className="col-12 table-body px-3 d-flex justify-content-between"
                >
                  <div className="selectteamname">{player.playername}</div>
                  <div className="points pe-3">{player.pointsearend}</div>
                </div>
              ))}
            <div className="nervesrow">
              <div className="nervesTotal">Total</div>
              <div className="nervesnum">{totalPoints}</div>
            </div>
          </div>

          <div className="row btn-section">
            <button
              onClick={() => handleSubmit()}
              className="col-12 procced-btn mb-1"
            >
              Edit Roster
            </button>
            <button
              onClick={() => handleHome()}
              className="col-12 procced-btn homebuton"
              style={{backgroundColor: 'transparent',color: '#e5007d',border: '1px solid '}}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
