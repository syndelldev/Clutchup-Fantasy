import React,{useEffect,useState} from "react";
import hedimages from "../../images/Screenshot_1.png";
import id_images from "../../images/Ellipse 54.png";
import logoimages from "../../images/logo_1.png";
import { useLocation ,useHistory} from "react-router-dom";
import { supabase } from "../../supabaseClient";
export default function CreateLeagueSuccessful() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [avtarUrls, setAvtarUrls] = useState(null);
  const [profileText, setProfileText] = useState('');
  const history = useHistory();
  console.log(location);
  const email = location.state.email;
  console.log(email);
  let avtarurls ;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    loadimage();
  }, []);
  const checkboxInput = {
    
    email:email,
  }
  const loadimage =async () =>{
    const { data, error } = await supabase
      .from('user')
      .select()
      .eq("email", email)
      // avtarurls = data[0].avatarurl;
      setAvtarUrls(data[0].avatarurl);
      setProfileText(data[0].teamusername.charAt(0).toUpperCase());
      console.log(data[0].teamusername.charAt(0).toUpperCase());
    }
    
    console.log(avtarUrls);


  const handleHome = async () => {
    history.push({
      pathname: "/landing-screen/",
      state: checkboxInput,
    });
};
  return (
    <div>
      <div className="section">
      {loading ? (
        <div className="loader-container">
      	  <div className="spinner"> </div>
          <img  src={logoimages} style={{ width:100,height:100, }} />
         
        </div>
      ) : (
        <div className="contener">
          <div className="Row">
            <div className="col">
              <div className="imagesrow">

              <img src={hedimages} className ='tegimages' alt="hed-image" />
              {/* <img src={avtarUrls} className="" alt="hed-image" /> */}
              <div className="profilepictext" style={{color:"white"}}>{profileText}</div>
             
              </div>
              <div className="d-box4">
                

                <svg
                  class="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                >
                  <circle
                    class="checkmark__circle"
                    cx="20"
                    cy="20"
                    r="20"
                    fill="none"
                  />
                  <path
                    class="checkmark__check"
                    fill="none"
                    d="M10.1 20.2l7.1 7.2 13.7-16.8"
                  />
                </svg>

                <h3 className="hading mt-4 mb-4 h-50" >
                  {" "}
                  {location.state.LeagueName} Successfully Created
                </h3>
                <div className="Suctage mt-2 mb-2 h-50" >Your League Code</div>
                <div className="Sucptage">{location.state.teamCode}</div>
                  <div className="w-50 mt-5">
              <button
              onClick={() => handleHome()}
              className="col-12 procced-btn homebuton"
              style={{backgroundColor: 'transparent',color: '#e5007d',border: '1px solid '}}
            >
              Home
            </button>

                  </div>
              </div>
             
              
            
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}