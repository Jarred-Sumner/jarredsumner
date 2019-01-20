import React from "react";

export default ({ children }) => (
  <p className="ImageGroup">
    {children}
    <style jsx>{`
      .ImageGroup {
        display: flex;
        justify-content: center;
      }

      .ImageGroup :global(.CodeInspectable) {
        flex: 0.5;
      }

      .ImageGroup :global(.CodeInspectable img) {
        object-fit: contain;
        height: auto;
      }
    `}</style>
  </p>
);
