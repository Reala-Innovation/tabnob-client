import React from "react";
import "./statement.css";

const BitcoinMissionStatement = () => {
  return (
    <div className="mission-wrapper">
      <div className="bitcoin-mission-container">
        <div className="bitcoin-image-wrapper">
          <img
            src={"/logo.png"}
            alt="Bitcoin empowering lives"
            className="bitcoin-image"
          />
        </div>

        <div className="content">
          <h2 className="heading">Empowering Everyday Life with Bitcoin</h2>

          <p className="description">
            Billions live in places where access to stable payments is unreliable or expensive.{" "}
            <strong>Bitcoin</strong> can help — but it has to be easy. <strong>Tapnob</strong> turns Bitcoin into
            spendable value for everyday life, helping people stay connected, resilient, and in control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitcoinMissionStatement;
