import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "../../assets/css/TeamSelection.css";
import logoimages from "../../images/Screenshot_1.png";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logoimages1 from "../../images/logo_1.png";
import Editconfombox from "./Editconfombox";
import PopupSelectAtleast1 from "./PopupSelectAtleast1";
import NoEnoughBudget from "./NoEnoughBudget";
import MoreThen10 from "./MoreThen10";

export default function UpdatePlayerScreen() {
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  var unSelectedPlayer = [];
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Allloading, setAllLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(null);
  const [Editbox, setEditbox] = useState(false);
  const [budget, setBudget] = useState(50);

  const [noBudget, setNoBudget] = useState(false);
  const [moreThen10, setMoreThen10] = useState(false);
  const [popup, setPopup] = useState(false);
  var serchedPlayerSelectedTeam = [];
  var serchedPlayerUnSelectedTeam = [];

  const history = useHistory();
  let location = useLocation();
  var myTeam = location.state;
  let selectedteamCount;
  let selectedTeamBudget = 0;
  var userInfo;
  var height = document.documentElement.scrollHeight;

  useEffect(() => {
    test();
  }, []);

  if (myTeam) {
    userInfo = {
      email: myTeam[0].email,
      teamName: myTeam[0].teamname,
      userName: myTeam[0].username,
    };
  }
  console.log(myTeam[0].email);
  useEffect(() => {
    setAllLoading(true);
    setTimeout(() => {
      setAllLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setSelectedPlayer(myTeam);
  }, []);

  const test = async () => {
   
      const { data } = await supabase.from("playerlist").select();
      setPlayerList(data);

      if (playerList && myTeam) {
        selectedteamCount = myTeam.length;
        myTeam.forEach((myPlayer) => {
          selectedTeamBudget += Number(myPlayer.price);
        });
        setBudget(budget - selectedTeamBudget);
      }
      setSelectedPlayerCount(selectedteamCount);
    
  };

  // -----------------------------------unselected player handling------------------------------------------
  const handleChangeUnSelectedPlayer = async (id) => {
    console.log("clicked on pluse id", id);
    console.log(id);
    setLoading(true);
    const { data } = await supabase
      .from("playerlist")
      .select()
      .match({ id: id });
    const currentPrice = data[0].price;
    if (budget < currentPrice) {
      setNoBudget(true);
    } else {
      console.log(selectedPlayerCount);
      if (selectedPlayerCount >= 10) {
        setMoreThen10(true);
      } else {
        const latestPrice = Math.round(budget - parseInt(currentPrice));
        const newSelectedPlayerCount = selectedPlayerCount + 1;
        setSelectedPlayerCount(newSelectedPlayerCount);
        setBudget(latestPrice);
        selectedPlayer.push(data[0]);
      }
    }
    setLoading(false);
  };
 

  // -----------------------------------selected player handling------------------------------------------
  const handleChangeSelectedPlayer = async (id) => {
    console.log(id);
    setLoading(true);

    const { data } = await supabase
      .from("playerlist")
      .select()
      .match({ id: id });

    console.log(data);

    const currentPrice = data[0].price;
    console.log(data);

    const latestPrice = Math.round(budget + parseInt(currentPrice));
    const newSelectedPlayerCount = selectedPlayerCount - 1;
    setSelectedPlayerCount(newSelectedPlayerCount);
    setBudget(latestPrice);
    setSelectedPlayer(
      selectedPlayer.filter((player) => {
        if (player.playerid === undefined) {
          return player.id !== id;
        } else {
          return player.playerid !== id;
        }
      })
    );

    setLoading(false);
  };

  // -------------------------------------filter other then selected player------------------------------------------
  if (playerList && selectedPlayer) {
    unSelectedPlayer = playerList.filter((player) => {
      let isCommonObject = true;

      selectedPlayer.forEach((myPlayer) => {
        if (player.playername === myPlayer.playername) {
          isCommonObject = false;
        }
      });
      return isCommonObject;
    });
  }
  console.log("unSelectedPlayer", unSelectedPlayer);
  console.log("selectedPlayer", selectedPlayer);
  const handleSubmit = async () => {
    // --------------------------------------supabase selected team table query----------------------------------------
    if (selectedPlayerCount < 1) {
      setPopup(true);
    } else {
      setEditbox(true);
    }
  };
  const checkboxInput = {
    email: myTeam[0].email,
  };
  const handleHome = async () => {
      history.push({
        pathname: "/landing-screen/",
        state: checkboxInput,
      });
  };

  const handleSearch = (e) => {
    setIsSearch(e.target.value);
  };

  const getBoolian = (boolian) => {
    setEditbox(boolian)
  };

  const getBoolianVar = (boolian) => {
    setPopup(boolian);
  };

  const getBudgetWarning = (boolian) => {
    setNoBudget(boolian);
  };

  const getWarningOfPlayerSelect = (boolian) => {
    setMoreThen10(boolian);
  };

  if(isSearch && selectedPlayer && unSelectedPlayer){
    selectedPlayer.filter((player) => {
      if(player.playername.toLowerCase().match(isSearch.toLowerCase())){
        serchedPlayerSelectedTeam.push(player)
      }
    })
    unSelectedPlayer.filter((player) => {
      if(player.playername.toLowerCase().match(isSearch.toLowerCase())){
        serchedPlayerUnSelectedTeam.push(player)
      }
    })
    console.log(serchedPlayerSelectedTeam);
    console.log(serchedPlayerUnSelectedTeam);
  }

  return (
    <>
      <div className="section playerlist-section">
        {Allloading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <img src={logoimages1} style={{ width: 100, height: 100 }} />
          </div>
        ) : (
          <div className="contenor">
            <div className="hadding">
              <img src={logoimages} style={{ width: 250 }} alt="back-image" />
            </div>
            <div >
              <div className=" back-arrow" style={{ marginLeft: 12 }}>
             
              </div>
              
            </div>
            <div className="row top-bar">
              <div className="col-12 px-4 d-flex"></div>
              <div className="col-12 px-4 mt-4 seach-web pt-0">
              <div className="col-12 px-4 d-flex align-items-baseline">
                <i
                  onClick={() => history.goBack()}
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                ></i>
              <h1 className=" title text-center teamhadding">Pick Team</h1>
                </div>
                <div className="search-section">
                  <span className="search-icon-section">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="border-0 ml-4"
                    onChange={handleSearch}
                    placeholder="Search Players"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 mid-section">
              <div className="col-12 d-flex px-4 py-3">
                <div className="col-6">
                  <div className="normal">Player</div>
                  <div className="normal">selected</div>
                  <div className="big">{selectedPlayerCount}/10</div>
                </div>
                <div className="col-6">
                  <div className="text-end normal">Budget</div>
                  <div className="text-end normal">Remaining</div>
                  <div className="text-end big">${budget}</div>
                </div>
              </div>
            </div>

            <div className="row table-data w-100 m-0">
              <div className="col-12 table-head d-flex justify-content-between">
                <div className="">PLAYERS</div>
                <div className="">PRICE</div>
                <div className="">POINTS EAREND</div>
              </div>

              {isSearch ? (serchedPlayerSelectedTeam.map((player, index) => {
                  var id;
                  if (player.playerid !== undefined) {
                    id = player.playerid;
                  }
                  if (!player.playerid) {
                    id = player.id;
                  }

                  // console.log(id);
                  return (
                    <div
                      key={index}
                      id={"row-data-" + player.playerid}
                      className="col-12 table-body d-flex justify-content-between selected-row"
                    >
                      <div className="playername">{player.playername}</div>
                      <div className="price">${player.price}</div>
                      <div className="points">
                        {!loading && <span>{player.pointsearend}</span>}
                        {!loading ? (
                          <span onClick={() => handleChangeSelectedPlayer(id)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        ) : (
                          <div
                            style={{ width: "22px", height: "22px" }}
                            className="spinner-border"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
              })):(selectedPlayer &&
                selectedPlayer.map((player, index) => {
                  // console.log(player);
                  var id;
                  if (player.playerid !== undefined) {
                    id = player.playerid;
                  }
                  if (!player.playerid) {
                    id = player.id;
                  }

                  // console.log(id);
                  return (
                    <div
                      key={index}
                      id={"row-data-" + player.playerid}
                      className="col-12 table-body d-flex justify-content-between selected-row"
                    >
                      <div className="playername">{player.playername}</div>
                      <div className="price">${player.price}</div>
                      <div className="points">
                        {!loading && <span>{player.pointsearend}</span>}
                        {!loading ? (
                          <span onClick={() => handleChangeSelectedPlayer(id)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        ) : (
                          <div
                            style={{ width: "22px", height: "22px" }}
                            className="spinner-border"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }))}
              {isSearch ? (serchedPlayerUnSelectedTeam.map((player, index) => {
                 return (
                  <div
                    key={index}
                    id={"row-data-" + player.id}
                    className="col-12 table-body d-flex justify-content-between"
                  >
                    <div className="playername">{player.playername}</div>
                    <div className="price">${player.price}</div>
                    <div className="points">
                      {!loading && <span>{player.pointsearend}</span>}
                      {!loading ? (
                        <span
                          onClick={() =>
                            handleChangeUnSelectedPlayer(player.id)
                          }
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      ) : (
                        <div
                          style={{ width: "22px", height: "22px" }}
                          className="spinner-border"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })) : (unSelectedPlayer &&
                unSelectedPlayer.map((player, index) => {
                  return (
                    <div
                      key={index}
                      id={"row-data-" + player.id}
                      className="col-12 table-body d-flex justify-content-between"
                    >
                      <div className="playername">{player.playername}</div>
                      <div className="price">${player.price}</div>
                      <div className="points">
                        {!loading && <span>{player.pointsearend}</span>}
                        {!loading ? (
                          <span
                            onClick={() =>
                              handleChangeUnSelectedPlayer(player.id)
                            }
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        ) : (
                          <div
                            style={{ width: "22px", height: "22px" }}
                            className="spinner-border"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }))}
            </div>

            <div className="row btn-section">
              <div onClick={handleSubmit} className="procced-btn">
                Update Team
              </div>
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
      {Editbox && (
        <Editconfombox
          selectedPlayer={selectedPlayer}
          userInfo={userInfo}
          height={height}
          onClick={getBoolian}
          myTeam={myTeam}
        />
      )}
      {popup && <PopupSelectAtleast1 height={height} onClick={getBoolianVar} />}
      {noBudget && (
        <NoEnoughBudget height={height} onClick={getBudgetWarning} />
      )}
      {moreThen10 && (
        <MoreThen10 height={height} onClick={getWarningOfPlayerSelect} />
      )}
    </>
  );
}
