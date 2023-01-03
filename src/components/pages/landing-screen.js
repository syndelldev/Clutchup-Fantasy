import React,{ useState } from "react";
import "./Style.css";
import Logo1 from "../../images/Screenshot_1.png";
import { useHistory, useLocation } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";
import logoimages from "../../images/logo_1.png";
import Editimages from "./Editimages.js";
import JoinLeague from "./JoinLeague.js";
import id_images from "../../images/Ellipse 54.png";
import HelpScreen from "./HelpScreen.js";

const LandingScreen = (props) => {
  const [userData, setUserData] = useState();
  const [editimages, setEditimages] = useState(false);
  const [joinLeague, setJoinLeague] = useState(false);
  const [helpscreen, setHelpscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileText, setProfileText] = useState('');
  const [sataprint, setSataprint] = useState();
  const [avatarUrl, setAvatarUrl] = useState(null)
  const history = useHistory();
  const location = useLocation();
  let height = document.documentElement.scrollHeight;
  const email = location.state.email;
  console.log(email);
  let userName;
  let urlimage ;
  let count = 0;
  var teamName;
  // ========================================= loder screen===================================
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
//  ============================================ profile pic dwonlord===========================
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    downloadImage();
  }, []);
  const downloadImage = async () => {

    try {

      let { data, error } = await supabase
        .from('user')
        .select()
        .eq('email',email)
        console.log("userimage",data);
        setAvatarUrl(data[0].avatarurl);
        urlimage = data[0].avatarurl;
        console.log(urlimage);
      if (error) {

        throw error

      }

    

    } catch (error) {

      console.log('Error downloading image: ', error.message)

    }

  }
  // =========================== supabse players shoe data =====================================
  const loadData = async () => {
    const { data, error } = await supabase
      .from("selectedteam")
      .select()
      .eq("email", email);
    data.sort(function (a, b) {
      return b.pointsearend - a.pointsearend;
    });
    setUserData(data);
    userName = data[0].username;
    setSataprint(userName);
    setAvatarUrl(data[0].avatarurl);
    setProfileText(data[0].username.charAt(0).toUpperCase());
    
  };
  // const emailandurlimg = {
  //   email: email,
  //   urlimage:avatarUrl,
  // };
// ============================ createleageu screen push========================================
  const createLeague = () => {
    history.push({
      pathname: "/create-league/",
      state: email,
      
    });
  };
// =========================== popup screen onclick===============================
  const handleSubmit = () => {
    setJoinLeague(true);
  };

  const handleHelp =() =>{
    setHelpscreen(true);
  }
  const handleimage = () => {
    setEditimages(true);
  };

  const viewRoster = () => {
    history.push({
      pathname: "/nerves-league/",
      state: userData,
    });
  };
 
  const getBoolianVar = () => {
    setJoinLeague(false);
  };
 
  const getBoolian = () => {
    setEditimages(false);
  }; 
   const getBooliangmail = () => {
    setHelpscreen(false);
  };
  const nandleplayers = () =>{
    history.push({
      pathname: "/playerslist/",
      state: email,
    });
  }
 /*  const loginon =() =>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  } */
    const loginout =async () =>{
      const { error } = await supabase.auth.signOut()
      console.log(error);
      history.push({
        pathname: "/Mainlogin/",
      });
    }

  return (
    <>
      <div className="sectionlanding" style={{ background: "#F8F8F8" }}>
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contenorlanding">
            <div className="landingRow">
              <img className="photoimagelanding" src={Logo1} />
              <div className="nevbarbutton">
                <button className="nevbarlogbutton Px-2 w-auto" style={{overflowX: 'hidden',padding:'0% 5%'}} /* onClick={() => loginon()} */>
                  {" "}
                  {/* <i className="fa fa-home "> */}<span className="target">{sataprint}</span>{/* </i> */}
                </button>
                <button className="nevbarlogbutton" onClick={() => loginout()}>
                  Logout
                </button>
              </div>
              <div className="dropdown">
                <a
                  style={{color:"white"}}
                  className="dropdown-toggle d-flex align-items-center hidden-arrow text-decoration-none"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profilepictext">{profileText}</div>
                  {/* <img
                    src={!avatarUrl ? id_images : avatarUrl}
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                    className="rounded-circle"
                    height={40}
                    width={40}
                  /> */}
                </a>
                <ul
                className="dropdown-menu dropdown-menu-center  box-end"
                aria-labelledby="navbarDropdownMenuAvatar "
              >
                 <li>
                  <a className="dropdown-item"  onClick={() => handleimage()}>
                  <i className="fa fa-user" ></i> &nbsp;&nbsp;My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => handleHelp()}>
                  <i className="fa fa-phone" ></i> &nbsp;&nbsp;Help / Contact us
                  </a>
                </li>
                {/* <li>
                  <a className="dropdown-item" onClick={() => nandleplayers()}>
                  <i class="fa fa-users" aria-hidden="true"></i> &nbsp;&nbsp;League History
                  </a>
                </li> */}
               
              </ul>
              </div>
            </div>

            <div className="landing-box">
              <h4 className="p-3 contenthadding ">My team</h4>
              <table className="table">
                <tbody>
                  <tr className="border-btm">
                    <th style={{ fontSize: 11, color: "#757575",}}>&nbsp;&nbsp;PLAYERS</th>
                    <th
                      style={{
                        fontSize: 11,
                        textAlign: "center",
                        color: "#757575",
                      }}
                    >
                      PRICE
                    </th>
                    <th className="haddingspoint"
                    
                    >
                      POINTS SCORED
                    </th>
                  </tr>
                  {userData &&
                    userData.map((user, index) => {
                      teamName = user.teamname;
                      if (count <= 2) {
                        count += 1;
                        return (
                          <tr key={index}>
                            <td style={{ fontSize: 17 }}>&nbsp;{user.playername}</td>
                            <td style={{ fontsize: 13, textAlign: "center" }}>
                              ${user.price}&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td
                              style={{
                                fontsize: 13,
                                color: "#E5007D",
                                textAlign: "right",
                              }}
                            >
                              {user.pointsearend}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
              <button className="landingbuttonlink" onClick={viewRoster}>
                View Roster
              </button>
            </div>
            {userData && <Leaderboards myTeam={userData} email={email} />}
            <div className="landinghadding">
              <div className="ladingtag">Need more competition?</div>
              <div className="landing-footer">
                <div className="fthed">
                  Looking to compete against your friends or fans?
                </div>
                <div className="bottembuttonrow">
                  <button
                    className="landingBTN"
                    style={{ width: "50%" }}
                    onClick={() => handleSubmit()}
                  >
                    Join League
                  </button>
                  <button
                    className="landingBTN"
                    style={{ width: "50%" }}
                    onClick={createLeague}
                  >
                    Create a League
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ================================================ popup screen =================================== */}
      {helpscreen && (<HelpScreen  height={height} onClick={getBooliangmail}/>)}
      {editimages && (<Editimages email={email} height={height} onClick={getBoolian}/> )}
      {joinLeague && (
        <JoinLeague email={email} teamName={teamName} height={height}  onClick={getBoolianVar} />
      )}
    </>
  );
};

export default LandingScreen;
