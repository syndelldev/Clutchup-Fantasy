import React from "react";
import { Link } from "react-router-dom";

const UpdateEditLeague = () => {
  return (
    <div className="edit-league">
      <div className="edit-league h-100vh text-center">
        <div className="d-flex w-50 justify-content-center">
          <div className=" w-343 w-sm-12 vertical-center align-self-center radious">
            <div className="p-4">
              <h4>Are you Sure</h4>
              <p>Change will be blah to blah</p>
            </div>
            <div className="confirm-link">
              <div>
                <Link className="decoration-none black">cancel</Link>
              </div>
              <span className="border-right" />
              <div>
                <Link className="decoration-none pink">Yes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEditLeague;
