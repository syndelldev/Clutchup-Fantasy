import React from "react";
import "./Style.css";
import { supabase } from "../../supabaseClient";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Editconfombox(props) {
  const { email, teamName, userName } = props.userInfo;
  const selectedPlayer = props.selectedPlayer;
  const history = useHistory();
  console.log(selectedPlayer);
  const [deletePlayer, setDeletePlayer] = useState();
  const height = props.height;
  const myTeam = props.myTeam;

  console.log(height);

  //--------------------------------------------------click on yes it will route to another page-------------------------------------------------------
  const UpdateUserPlayer = async (e) => {
    console.log('click');
    e.preventDefault();
    props.onClick(false);
    console.log("dates",selectedPlayer);
    history.push({
      pathname: "/nerves-league/",
      state: selectedPlayer,
    });

    // ---------------------------------------------------delete existing user then update selected player------------------------------------------------------
    const { data, error } = await supabase
      .from("selectedteam")
      .select()
      .eq("teamname", teamName);
    data.map(async (player) => {
      const { data, error } = await supabase
        .from("selectedteam")
        .delete()
        .eq("id", player.id);
      console.log(data);
      console.log(error);
    });

    const upsertData = selectedPlayer.map(async (playerDetails) => {
      console.log(playerDetails);
      var id;
      if (playerDetails.playerid) {
        id = playerDetails.playerid;
      } else {
        id = playerDetails.id;
      }
      await supabase.from("selectedteam").insert({
        playername: playerDetails.playername,
        price: playerDetails.price,
        pointsearend: playerDetails.pointsearend,
        username: userName,
        teamname: teamName,
        playerid: id,
        email: email,
      });
    });
  };

  // --------------------------------------------------if click on no it will route to another page-------------------------------------------------------
  const routeToEdit = () => {
    props.onClick(false)
  };

  return (
    <>
      <div className="editcontent" style={{ height: `${height}px` }}>
        <div className="EditconfoBox">
          <div className="editcontenthad">
            <div className="edithade">
              Are you Sure to update Your Team player?
            </div>
          </div>
          <div className="editlinksbox">
            <button
              style={{ background: "none", border: "none",  width:'100%', height:'inherit' }}
              onClick={UpdateUserPlayer}
              className="editbutton"
            >
              YES
            </button>
            <button className="editbutton" onClick={routeToEdit} style={{ width:'100%', height:'inherit' }}>
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editconfombox;
