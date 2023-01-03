import React, { useState } from "react";
import "./Style.css";
import { useEffect } from "react";
import EditLeagueconfomPage from "./EditLeagueConfomPage.js";
import { supabase } from "../../supabaseClient";

export default function (props) {
  const { email,leaguename } = props;
  let height = props.height;
  const [editLeague, setEditLeague] = useState(false);

  const [userEnteredTeamCode, setUserEnteredTeamCode] = useState("");
  const [updateLeagueCode, setUpdateLeagueCode] = useState("");

  const [isValidLeague, setIsValidLeague] = useState(false);
  const [errorPassword, seterrorPassword] = useState(false);
  const [isValidTeamPassword, setIsValidTeamPassword] = useState(false);
  const [isValidLeaguecode, setIsValidLeaguecode] = useState(false);
  const [userActualTeamCode, setUserActualTeamCode] = useState("");
  const [userActualLeagueName, setUserActualLeagueName] = useState("");

  useEffect(() => {
    fatchdata();
  }, []);

  const handleUserName = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    } else {
      setUserEnteredTeamCode(e.target.value);
    }
  };
  const handlePassword = (e) => {
    const { value } = e.target;
    if (value === " ") {
    } else {
      setUpdateLeagueCode(e.target.value);
      setIsValidTeamPassword(false);
    
    }
  };

  const fatchdata = async () => {
    const { data, error } = await supabase
      .from("createnewleague")
      .select()
      .match({email: email ,leaguename: leaguename });
    
    setUserActualTeamCode(data[0].leaguecode);
    setUserActualLeagueName(data[0].leaguename)
  };


  const handleedit = async () => {
    if(userEnteredTeamCode === "" && updateLeagueCode === ""){
      seterrorPassword(false);
      setIsValidLeague(true);
      setIsValidTeamPassword(true);
    }else{
    if (userEnteredTeamCode === "") {
      seterrorPassword(false);
      setIsValidLeague(true);
    }else{
      if (updateLeagueCode === "") {
        seterrorPassword(false);
        setIsValidTeamPassword(true);
      } else {
        if (updateLeagueCode.length <= 4) {
          seterrorPassword(true);
          setEditLeague(false);
        } else {
          if(userActualTeamCode === userEnteredTeamCode){
            setIsValidLeaguecode(false);
            seterrorPassword(false);
          setIsValidLeague(false);
          setEditLeague(true);
          }else{
            setIsValidLeaguecode(true);
            seterrorPassword(false);
          setIsValidLeague(false);
          setEditLeague(false);
          }
        
        }
      }       
    }
  }

    
  };
  const closebutton = () => {
    props.onClick(false);
  };

  const getBoolian = () => {
    setEditLeague(false);
  }

  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditBoxleague">
        <div className="crosebtn">
            <a className="closebutton" onClick={closebutton}>
              ×
            </a>
          </div>
          <div className="edithad">Edit League</div>
          <div style={{ width: "100%", height: 300 }}>
            <div className="user-input-wrp">
              <br />
              <input
                onChange={handleUserName}
                value={userEnteredTeamCode}
                autocorrect="off"
                autocomplete="off"
                id="League"
                type="text"
                className="inputText"
                required
              />
              <span className="floating-label">YOUR LEAGUE CODE</span>
              {isValidLeague && (
                <small className="d-block mb-1 red ">
                  Please Enter Old league code.
                </small>
              )}
               {isValidLeaguecode && (
                <small className="d-block mb-1 red ">
                  Your Old league code is wrong.
                </small>
              )}
            </div>

            <div className="editmoon">{userActualLeagueName}</div>
            <div className="editupdate">Update League Code</div>

            <div className="user-input-wrp">
              <br />
              <input
                type="password"
                onChange={handlePassword}
                className="inputText"
                value={updateLeagueCode}
                autocorrect="off"
                autocomplete="off"
                id="password"
                maxLength={30}
                required
              />
              <span className="floating-label">Your Password</span>
              {isValidTeamPassword && (
                <small className="d-block mb-1  red ">
                  Please Enter New league code.
                </small>
              )}
              {errorPassword && (
                <small className="d-block mb-1 red">
                  Codes Must Be At Least 5 Characters.
                </small>
              )}
            </div>
          </div>

          <div className="">
            <button
              className="button"
              type="submit"
              name="submit"
              value="Submit"
              onClick={handleedit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {editLeague && (
        <EditLeagueconfomPage
          email={email}
          leaguename = {userActualLeagueName}
          userEnteredTeamCode={userEnteredTeamCode}
          updateLeagueCode={updateLeagueCode}
          userActualTeamCode = {userActualTeamCode}
          onClick={getBoolian}
          height={height}
        />
      )}
    </>
  );
}
