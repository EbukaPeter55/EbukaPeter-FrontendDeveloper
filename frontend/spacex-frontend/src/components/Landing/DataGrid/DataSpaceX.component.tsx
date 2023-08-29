import React from "react";
import "../../../components/component.styles.scss";
import { CAPSULES } from "./data";

const DataSpaceX = () => {
  const capsules: any[] = CAPSULES[0];
  console.log("capsules", capsules);

  return (
    <section className="spacex-container">
      <div className="spacexdata-wrapper">
        {capsules.map((capsule: any, index: number) => (
          <div className="spacexdata-wrapper__card">
            <div key={index} className="spacexdata-content">
              <h3>{capsule.type}</h3>
              <p>{capsule.details}</p>
              <div>
                <p>{capsule.status}</p>
                <p>2018-04-10</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataSpaceX;
