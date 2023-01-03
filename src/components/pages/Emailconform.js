import React,{useEffect,useState} from "react";
import BackgroundImage from "../../images/Left.png";
import logoimages from "../../images/logo_1.png";
import hedimages from "../../images/Screenshot_1.png";
import id_images from "../../images/Ellipse 54.png";


export default function Emailconform() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
  return (
    <div>
      <div className="section">
      {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
          <img src={logoimages} style={{ width:100,height:100, }} />
        </div>
      ) : (
        <div className="contener">
          <div className="Row">
            <div className="col1">
              <img src={BackgroundImage} className="mainimg" alt="back-image" />
            </div>
            <div className="col">
              <div className="mobile-hadding">
                <div className="hed-col">
                  <img
                    src={hedimages}
                    style={{ width: 154, height: 16 }}
                    alt="back-image"
                  />

                  <img src={id_images} alt="back-image" />
                </div>
                {/* <div className='hed-col'>

                                </div> */}
              </div>
              <div className="d-box3">
                <img src={logoimages} className="logo1" alt="" />

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

                <h3 className="hading" style={{ paddingTop: "15%" }}>
                  {" "}
                  Your Account Has been Activated Successfully.
                </h3>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
