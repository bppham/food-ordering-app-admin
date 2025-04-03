import React from "react";
import "./DetailShipper.css";

const DetailShipper = ({ shipper, onClose }) => {
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
          </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailShipper;
