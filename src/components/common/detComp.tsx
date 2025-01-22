import React from "react";
import Det from "./det";

const DetComp = () => {
  return (
    <div className="flex bg-white rounded-xl">
      <div className="">
        <Det
          title="Empowering the Next Generation of Architects"
          content="At MyNaksha, we help college students gain practical skills and real-world experience through hands-on projects, preparing them for successful careers in the industry."
        />
        <div className="">
          <Det
            title="Streamlined Project Planning from the Comfort of Your Home"
            content="Easily provide your land's dimensions and specs from home. Just share your details online, and our experts will handle the rest!"
          />
        </div>
      </div>
      <div className="">
        <Det
          title="Expert Construction Professionals with Proven Real-World Experience"
          content="Our team of highly qualified construction professionals has advanced degrees and extensive real-world experience, ensuring excellence in every aspect of your project."
        />
        <div className="">
          <Det
            title="Easier Client Engagement, Anytime, Anywhere"
            content="Online clients enable efficient project management. Just share your location and details, and our experts will handle the rest—no site visits needed!"
          />
        </div>
      </div>
    </div>
  );
};
export default DetComp;
