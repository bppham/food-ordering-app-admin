import React from "react";
import "./DetailShipperPopup.css";

const DetailShipper = ({ showDetailPopup, shipper, setShowDetailPopup }) => {
  if (!shipper) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Shipper Details</h2>
        <div className="content-container">
          <div className="avatar">
            <img src={shipper.avatar.url} alt="" />
          </div>
          <div className="info">
            <div className="row">
              <div className="item">
                <label>Id: </label>
                <p>{shipper._id}</p>
              </div>
              <div className="item">
                <label>Name: </label>
                <p>{shipper.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <label>Email: </label>
                <p>{shipper.email}</p>
              </div>
              <div className="item">
                <label>Gender: </label>
                <p>{shipper.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <label>Phone number: </label>
                <p>{shipper.phonenumber}</p>
              </div>
              <div className="item">
                <label>Status: </label>
                <p>{shipper.status}</p>
              </div>
            </div>
            <div className="row">
              <div className="item">
                <label>Vehicle name: </label>
                <p>{shipper.vehicle.name}</p>
              </div>
              <div className="item">
                <label>Vehicle number: </label>
                <p>{shipper.vehicle.number}</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setShowDetailPopup(false)}>Close</button>
      </div>
    </div>
  );
};

export default DetailShipper;
