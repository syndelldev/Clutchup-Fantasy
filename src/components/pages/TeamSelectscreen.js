import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "../../assets/css/TeamSelection.css";
import logoimages from "../../images/Screenshot_1.png";
import logoimages1 from "../../images/logo_1.png";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PopupSelectAtleast1 from "./PopupSelectAtleast1";
import NoEnoughBudget from "./NoEnoughBudget";
import MoreThen10 from "./MoreThen10";

export default function TeamSelectscreen() {
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  var unSelectedPlayer = [];
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Allloading, setAllLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(null);
  const [noBudget, setNoBudget] = useState(false);
  const [moreThen10, setMoreThen10] = useState(false);
  const [popup, setPopup] = useState(false);
  var serchedPlayer = [];
  var searchedPlayerOfSelectedTeam = [];

  const [selectedData, setSelectedData] = useState([]);
  let height = document.documentElement.scrollHeight;

  const [budget, setBudget] = useState(50);
  const history = useHistory();
  let location = useLocation();
  useEffect(() => {
    setAllLoading(true);
    setTimeout(() => {
      setAllLoading(false);
    }, 1000);
  }, []);

  const test = async () => {
    const { data } = await supabase.from("playerlist").select();
    setPlayerList(data);
  };
  const handleChange = async (id) => {
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
        selectedData.push(data[0]);
        setPlayerList(playerList.filter((player) => {
          return player.id !== id 
        }))
      }
    }
    setLoading(false);
  };

  const handleChangeOfSelectedData = async (id) => {
    console.log("minus cakkk");
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
    playerList.push(data[0])
    setSelectedData(
      selectedData.filter((player) => {
        return player.id !== id;
      })
    );
    setLoading(false);
  }
  console.log(selectedData);

 


  const handleSubmit = async () => {
    // --------------------------------------supabase selected team table query----------------------------------------

    let username = location.state.teamusername;
    let teamname = location.state.teamname;

    // const upsertData = selectedData.forEach(async (sa) =>

    //   await supabase.from("selectedteam").insert({
    //     playername: sa.playername,
    //     price: sa.price,
    //     pointsearend: sa.pointsearend,
    //     username: username,
    //     teamname: teamname,
    //     playerid: sa.id
    //   })
    //   );

    if (selectedPlayerCount < 1) {
      setPopup(true);
    } else {
      history.push({
        pathname: "/Registrationscreen/",
        state: {selectedData, username, teamname},
      });
    }
  };

  const handleSearch = (e) => {
    setIsSearch(e.target.value);
  };

  useEffect(() => {
    test();
  }, []);

  const getBoolianVar = (boolian) => {
    setPopup(boolian);
  };

  const getBudgetWarning = (boolian) => {
    setNoBudget(boolian);
  };

  const getWarningOfPlayerSelect = (boolian) => {
    setMoreThen10(boolian);
  };

  if (isSearch && playerList && selectedData) {
    playerList.filter((player) => {
      if (player.playername.toLowerCase().match(isSearch.toLowerCase())) {
        serchedPlayer.push(player)
      }
    })
    selectedData.filter((player) => {
      if (player.playername.toLowerCase().match(isSearch.toLowerCase())) {
        searchedPlayerOfSelectedTeam.push(player)
      }
    })
  }
  //-------------------------------------------filter other then selected player------------------------------


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

            <div  className="teamselectioncon">
              <div className=" back-arrow" style={{ marginLeft: 12 }}>
              
              </div>
              
            </div>
            <div className="row top-bar ">
      
              <div className="col-12 px-4 d-flex"></div>
              <div className="col-12 px-4 seach-web pt-0">
                <div className="col-12 px-4 d-flex align-items-baseline mb-2">
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
                  <div className="normal">Player Selected</div>
                  <div className="big">{selectedPlayerCount}/10</div>
                </div>
                <div className="col-6">
                  <div className="text-end normal">Budget Remaining</div>
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
              {isSearch ? (searchedPlayerOfSelectedTeam.map((player, index) => {
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
                          <span onClick={() => handleChangeOfSelectedData(id)}>
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
              })):(selectedData &&
                selectedData.map((player, index) => {
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
                          <span onClick={() => handleChangeOfSelectedData(id)}>
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
              {isSearch ? (serchedPlayer.map((role, index) => (
                <div
                  key={index}
                  id={"row-data-" + role.id}
                  className="col-12 table-body d-flex justify-content-between"
                >
                  <div className="playername">{role.playername}</div>
                  <div className="price">${role.price}</div>
                  <div className="points">
                    {!loading && <span>{role.pointsearend}</span>}
                    {!loading ? (
                      <span onClick={() => handleChange(role.id)}>
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
              ))) : (playerList.map((role, index) => (
                <div
                  key={index}
                  id={"row-data-" + role.id}
                  className="col-12 table-body d-flex justify-content-between"
                >
                  <div className="playername">{role.playername}</div>
                  <div className="price">${role.price}</div>
                  <div className="points">
                    {!loading && <span>{role.pointsearend}</span>}
                    {!loading ? (
                      <span onClick={() => handleChange(role.id)}>
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
              )))}
            </div>

            <div className="row btn-section btn-center">
              <div
                onClick={() => handleSubmit()}
                className="col-12 procced-btn"
              >
                Proceed to Create Account
              </div>
            </div>
          </div>
        )}
      </div>

      {popup && <PopupSelectAtleast1 height={height} onClick={getBoolianVar} />}
      {noBudget && <NoEnoughBudget height={height} onClick={getBudgetWarning} />}
      {moreThen10 && <MoreThen10 height={height} onClick={getWarningOfPlayerSelect} />}
    </>
  );
}
