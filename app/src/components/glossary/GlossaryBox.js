import React from "react";
import "./GlossaryBox.scss";


const GlossaryBox = ({
  title,
  content
}) => {
  // const renderDate = renderDateRange(startDate, endDate);
  return (
    <div className="GlossaryBox">
      <div className="text">
        <h3>{title}</h3>
        <div className="content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default GlossaryBox;
