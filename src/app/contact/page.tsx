import React from "react";

const ContactPage = () => {
  return (
    <div className="m-2">
      <div className="text-3xl border-b-2 font-bold text-center">
        Contact Us
      </div>
      <div className="m-2">
        <div className="flex">
          Users can contact us for any query on
          <div className="font-bold ml-2"> maprapindia@gmail.com</div>
        </div>
        <div className="flex">
          Phone Number :<div className="font-bold ml-2">8899781150</div>
        </div>
        <div>
          <div className="font-bold">Address :</div>
          <div>Building No./Flat No.: H.NO.95/1, TRIKUTA NAGAR</div>
          <div>Road/Street: H.NO.95/1, TRIKUTA NAGAR</div>
          <div>Nearby Landmark: Kay Tea Designer Studio</div>
          <div>City/Town/Village: Jammu</div>
          <div>District: Jammu</div>
          <div>State: Jammu and Kashmir</div>
          <div>PIN Code : 180020</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
