import React from "react";
import { Link } from "react-router-dom";
function HelpScreen(props) {
  let height = props.height;
  const closebutton = () => {
    props.onClick(false);
  };
  return (
    <div className="profilecon " style={{ height: `${height}px` }}>
      <div className="profilecontent">
        <div className="profileboxd">
        <div className="w-100 text-end" >
        <button type="button" class="btn-close" onClick={closebutton} aria-label="Close"></button>
            </div>
          <h3>Contact Us</h3>
          <div style={{ textAlign: "center" }}>
            Have any questions or suggestions email us at{" "}
            <Link style={{ textDecoration: "none", color: "#E5007D" }}>
              clutchupesports@gmail.com
            </Link>
          </div>
          <div style={{ textAlign: "center" }}></div>
        </div>
      </div>
    </div>
  );
}

export default HelpScreen;
