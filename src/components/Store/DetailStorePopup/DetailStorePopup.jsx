import React, { useState } from "react";
import "./DetailStorePopup.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const page = ({ showDetailPopup, store, setShowDetailPopup }) => {
  const [loading, setLoading] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState(store.avatar.url);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    showDetailPopup && (
      <div className="detail-store-model-overplay">
        <div className="model">
          <h3>Detail a store</h3>
          <div className="info-container">
            <fieldset className="store-info">
              <legend>Store Information</legend>
              <div className="avatar">
                <img src={store.avatar.url} alt="" />
              </div>
              <div className="info">
                <div className="info-item id">
                  <p>{store._id}</p>
                </div>
                <div className="info-item">
                  <label>Name: </label>
                  <p>{store.name}</p>
                </div>
                <div className="info-item">
                  <label>Address: </label>
                  <p>{store.address.full_address}</p>
                </div>
                <div className="info-item">
                  <label>Address: </label>
                  <p>{store.address.full_address}</p>
                </div>
                <div className="info-item">
                  <label>Status: </label>
                  <p className={`status ${store.status.toLowerCase()}`}>
                    {store.status}
                  </p>
                </div>
              </div>
            </fieldset>
            <fieldset className="owner-info">
              <legend>Owner Information</legend>
              <div className="row">
                <div className="info-item">
                  <label>Id: </label>
                  <p>{store.owner._id}</p>
                </div>
                <div className="info-item">
                  <label>Name: </label>
                  <p>{store.owner.name}</p>
                </div>
              </div>

              <div className="row">
                <div className="info-item">
                  <label>Email: </label>
                  <p>{store.owner.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone number: </label>
                  <p>{store.owner.phonenumber}</p>
                </div>
              </div>
            </fieldset>
            <div className="paperwork-info"></div>
          </div>

          <div className="model-buttons">
            <button onClick={() => setShowDetailPopup(false)}>Close</button>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
