import React from "react";
import "./EventBox.scss";
import PostImage from "../media/PostImage";
import CalendarIcon from "../vectors/CalendarIcon";
import PinIcon from "../vectors/PinIcon";
import { renderDateRange } from "../../utils";

const EventBox = ({
  title,
  organizerName,
  startDate,
  endDate,
  location,
  mediaID,
  link
}) => {
  const renderDate = renderDateRange(startDate, endDate);
  return (
    <div className="EventBox">
      <div className="image">
        {mediaID ? (
          <PostImage mediaId={mediaID} />
        ) : (
          <PostImage mediaId={932} />
          // <span>No post image found</span>
        )}
      </div>
      <div className="text">
        <div className="organizer">{organizerName}</div>

        <h3>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <div className="meta">
          {renderDate && (
            <div>
              <CalendarIcon /> <span>{renderDate}</span>
            </div>
          )}
          {location && (
            <div>
              <PinIcon /> <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventBox;
