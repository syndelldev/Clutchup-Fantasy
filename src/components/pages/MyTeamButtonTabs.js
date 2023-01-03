// import React, { useState, useEffect } from "react";
// import "./Style.css";
// import { supabase } from "../../supabaseClient";
// import { useHistory } from "react-router-dom";

// const MyTeamButtonTabs = (props) => {
//   const myTeam = props.userData;
//   const email = props.email;
//   const [userData, setUserData] = useState();
//   const [joinedTeamOnLeague, setJoinedTeamOnLeague] = useState([]);
//   const [userEmail, setUserEmail] = useState();

//   const [isAButtonActive, setIsAButtonActive] = useState(true);
//   const [isBButtonActive, setIsBButtonActive] = useState(false);
//   const [isCButtonActive, setIsCButtonActive] = useState(false);

//   const [global, setGlobal] = useState(true);
//   const [nersLeague, setNersLeague] = useState(false);
//   const [league5, setLeague5] = useState(false);

//   var filterData = [];
//   let points = [];
//   const asandindPoints5League = [];
//   let totalPointsOfAllTeam = [];

//   let teamName = [];
//   let totalPoints = [];

//   let teamNameWithTotalScore = [];

//   const history = useHistory();

//   // ----------------handle button click of leaderboard---------------------
//   const handleButtonClickA = () => {
//     setGlobal(true);
//     setNersLeague(false);
//     setLeague5(false);

//     setIsAButtonActive(true);
//     setIsBButtonActive(false);
//     setIsCButtonActive(false);
//   };
//   const handleButtonClickB = () => {
//     setNersLeague(true);
//     setGlobal(false);
//     setLeague5(false);

//     setIsBButtonActive(true);
//     setIsAButtonActive(false);
//     setIsCButtonActive(false);
//   };
//   const handleButtonClickC = () => {
//     setLeague5(true);
//     setGlobal(false);
//     setNersLeague(false);

//     setIsCButtonActive(true);
//     setIsAButtonActive(false);
//     setIsBButtonActive(false);
//   };

//   useEffect(() => {
//     loading2();
//     loading();
//     loadData();
//     loadDataOfNersLeague();
//   }, []);

//   const loadData = async () => {
//     const { data, error } = await supabase.from("user").select("email");
//     setUserEmail(data);
//   };

//   // ----------------------------5league--------------------------------------------
//   const loading2 = async () => {
//     const { data, error } = await supabase.from("user").select();
//     const leagueName = [];
//     data.map((user) => {
//       if (user.email && user.LeagueName !== null) {
//         leagueName.push(user.LeagueName);
//       }
//     });
    
//     if (leagueName[0] !== undefined || null) {
//       for (let i = 0; i < leagueName.length; i++) {
//         const { data, error } = await supabase
//           .from("league")
//           .select()
//           .eq("leaguename", leagueName[i]);
//         joinedTeamOnLeague.push({
//           leagueName: leagueName[i],
//           teamName: data.map((user) => user.teamname),
//           teams: [],
//         });
//       }
//       if (joinedTeamOnLeague.length !== 0) {
//         joinedTeamOnLeague.map((teams, i) => {
//           teams.teamName.forEach(async (team) => {
//             const { data, error } = await supabase
//               .from("selectedteam")
//               .select()
//               .eq("teamname", team);
//             joinedTeamOnLeague[i].teams = [
//               ...joinedTeamOnLeague[i].teams,
//               data.map((player) => player),
//             ];
//           });
//         });
//       }
//     }
//     console.log(joinedTeamOnLeague);
//   };
  
  
//   if (joinedTeamOnLeague) {
//     joinedTeamOnLeague.map((team, i) => {
//       totalPointsOfAllTeam[i] = team.teams.map((teams) =>
//         teams.map((player) => {
//           return player.pointsearend;
//         })
//       );
//     });
// console.log(joinedTeamOnLeague);
//     // -------------------------------total count---------------------------
//     let totalPointsLeague = [];
//     if (totalPointsOfAllTeam) {
//       for (let i = 0; i < totalPointsOfAllTeam.length; i++) {
//         totalPointsLeague[i] = 0;
//         for (let j = 0; j < totalPointsOfAllTeam[i].length; j++) {
//           for (let k = 0; k < totalPointsOfAllTeam[i][j].length; k++) {
//             totalPointsLeague[i] =
//               totalPointsLeague[i] + Number(totalPointsOfAllTeam[i][j][k]);
//           }
//         }
//       }
//     }

//     if (totalPointsLeague.length !== 0) {
//       totalPointsLeague.map((tPoints) => asandindPoints5League.push(tPoints));
//       // -------------------------------sorting------------------------------
//       let a;
//       if (asandindPoints5League.length !== 0) {
//         for (let i = 0; i < asandindPoints5League.length; ++i) {
//           for (let j = i + 1; j < asandindPoints5League.length; ++j) {
//             if (asandindPoints5League[i] < asandindPoints5League[j]) {
//               a = asandindPoints5League[i];
//               asandindPoints5League[i] = asandindPoints5League[j];
//               asandindPoints5League[j] = a;
//             }
//           }
//         }
//       }
//     }

//     if (totalPointsLeague[0] !== 0) {
//       for (let i = 0; i < totalPointsLeague.length; i++) {
//         joinedTeamOnLeague[i].totalPoints = totalPointsLeague[i];
//       }
//     }
//   }

//   // ---------------------------sorting league of 5 league----------------------
//   joinedTeamOnLeague.sort(function (a, b) {
//     return b.totalPoints - a.totalPoints;
//   });

//   // -----------------------------------global---------------------------------
//   const loading = async () => {
//     const { data, error } = await supabase.from("selectedteam").select();
//     data.map((user) => {
//       if (user.email !== null || undefined || "") {
//         setUserData(data);
//       }
//     });
//   };

//   if (userData && userEmail) {
//     let allSameTeamName = [];

//     userEmail.forEach((element, index) => {
//       if (element.email) {
//         filterData.push(
//           userData.filter((user) => user.email === element.email)
//         );
//       }
//     });

//     filterData.map(
//       (team, index) =>
//         (allSameTeamName[index] = team.map(
//           (sameTeamMember) => sameTeamMember.teamname
//         ))
//     );

//     filterData.map(
//       (team, index) =>
//         (points[index] = team.map((sameTeamMember) =>
//           Number(sameTeamMember.pointsearend)
//         ))
//     );

//     for (let i = 0; i < allSameTeamName.length; i++) {
//       for (let j = 0; j < allSameTeamName[i].length; j++) {
//         teamName[i] = allSameTeamName[i][j];
//       }
//     }
//     // ------------------total count---------------------
//     for (let i = 0; i < points.length; i++) {
//       totalPoints[i] = 0;
//       for (let j = 0; j < points[i].length; j++) {
//         totalPoints[i] = totalPoints[i] + points[i][j];
//       }
//     }
//     let teamObject;

//     for (let i = 0; i < teamName.length; i++) {
//       teamObject = {
//         teamName: teamName[i],
//         totalPoints: totalPoints[i],
//       };
//       teamNameWithTotalScore.push(teamObject);
//     }
//     // --------------------sorting------------------
//     teamNameWithTotalScore.sort(function (a, b) {
//       return b.totalPoints - a.totalPoints;
//     });
//   }

//   const globalTeamObj = {
//     teamNameWithTotalScore: teamNameWithTotalScore,
//     email: email,
//   };

//   const LeagueObj = {
//     joinedTeamOnLeague: joinedTeamOnLeague,
//     email: email,
//   };

//   // -----------------------------------nersleague---------------------------------------
//   const loadDataOfNersLeague = async () => {
//     // let newData;
//     // const { data, error } = await supabase
//     //   .from("league")
//     //   .select()
//     //   .eq("email", email);
//     // // console.log(data);
//     // data.forEach((joinedLeagueDetails) => {
//     //   console.log(joinedLeagueDetails.leaguename);
//     //   joinedTeamOnLeague.map((league) => console.log(league))
//     // });
//   };
  
//   // ------------------------------leader board button click-------------------------------
//   const viewAllGlobal = () => {
//     history.push({
//       pathname: "/league-mgmt-screen/",
//       state: globalTeamObj,
//     });
//   };

//   const viewAllNersLeague = () => {
//     history.push({
//       pathname: "/league-mgmt-screen-ners-league/",
//       state: teamNameWithTotalScore,
//     });
//   };

//   const viewAllLeague5 = () => {
//     history.push({
//       pathname: "/league-mgmt-screen-5league/",
//       state: LeagueObj,
//     });
//   };

//   return (
//     <div className="landing-box">
//       <h4 className="p-3 contenthadding">Leaderboards</h4>
//       <div className="btn-container w-100" style={{ margin: 10 }}>
//         <span className="gray-background all-btn">
//           <label className="button-label">
//             <button
//               onClick={handleButtonClickA}
//               className={
//                 isAButtonActive ? "activebutton" : "Leaderboards-button"
//               }
//             >
//               Global
//             </button>
//           </label>
//           <label className="button-label">
//             <button
//               onClick={handleButtonClickB}
//               className={
//                 isBButtonActive ? "activebutton" : "Leaderboards-button"
//               }
//             >
//               Ners League
//             </button>
//           </label>
//           <label>
//             <button
//               onClick={handleButtonClickC}
//               className={
//                 isCButtonActive ? "activebutton" : "Leaderboards-button"
//               }
//             >
//               5 Leagues
//             </button>
//           </label>
//         </span>
//       </div>

//       {global && (
//         <>
//           <table className="table">
//             <thead>
//               <tr className="border-btm">
//                 <th style={{ fontSize: 11, color: "#757575" }}>TEAM</th>
//                 <th
//                   style={{
//                     fontSize: 11,
//                     color: "#757575",
//                     textAlign: "right",
//                     paddingRight: "1%",
//                   }}
//                 >
//                   SCORED
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {teamNameWithTotalScore &&
//                 teamNameWithTotalScore.map((e, i) => {
//                   if (e !== undefined && i <= 2) {
//                     return (
//                       <tr key={i}>
//                         <td style={{ fontSize: 17 }}>
//                           {i + 1}. {e.teamName}
//                         </td>
//                         <td
//                           className="teamnameonbord"
//                           // style={{
//                           //   fontsize: 13,
//                           //   color: "#E5007D",
//                           //   textAlign: "right",
//                           //   paddingRight: "2%" ,
//                           // }}
//                         >
//                           {e.totalPoints}
//                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         </td>
//                       </tr>
//                     );
//                   }
//                 })}
//             </tbody>
//           </table>
//           <button className="landingbuttonlink" onClick={viewAllGlobal}>
//             View All
//           </button>
//         </>
//       )}
//       {nersLeague && (
//         <>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th style={{ fontSize: 11, color: "#757575" }}>TEAM</th>
//                 <th
//                   style={{
//                     fontSize: 11,
//                     color: "#757575",
//                     textAlign: "right",
//                     paddingRight: "1%",
//                   }}
//                 >
//                   SCORED
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {myTeam &&
//                 myTeam.map((player, i) => {
//                   if (i <= 2) {
//                     return (
//                       <tr key={i}>
//                         <td style={{ fontSize: 17 }}>
//                           {i + 1}. {player.playername}
//                         </td>
//                         <td
//                           style={{
//                             fontsize: 13,
//                             color: "#E5007D",
//                             textAlign: "right",
//                             paddingRight: "2%",
//                           }}
//                         >
//                           {player.pointsearend}
//                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         </td>
//                       </tr>
//                     );
//                   }
//                 })}
//             </tbody>
//           </table>
//           <button className="landingbuttonlink" onClick={viewAllNersLeague}>
//             View All
//           </button>
//         </>
//       )}
//       {league5 && (
//         <>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th style={{ fontSize: 11, color: "#757575" }}>LEAGUE</th>
//                 <th
//                   style={{
//                     fontSize: 11,
//                     color: "#757575",
//                     textAlign: "right",
//                     paddingRight: "1%",
//                   }}
//                 >
//                   SCORED
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {joinedTeamOnLeague &&
//                 joinedTeamOnLeague.map((league, i) => {
//                   if (i <= 4) {
//                     return (
//                       <tr key={i}>
//                         <td style={{ fontSize: 17 }}>
//                           {i + 1}. {league.leagueName}
//                         </td>
//                         <td
//                           style={{
//                             fontsize: 13,
//                             color: "#E5007D",
//                             textAlign: "right",
//                             paddingRight: "2%",
//                           }}
//                         >
//                           {league.totalPoints}
//                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         </td>
//                       </tr>
//                     );
//                   }
//                 })}
//             </tbody>
//           </table>
//           <button className="landingbuttonlink" onClick={viewAllLeague5}>
//             View All
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyTeamButtonTabs;
