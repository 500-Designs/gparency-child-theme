import React from "react";
import "./EventBox.scss";
import PostImage from "../media/PostImage";
import PlaceHolderImage from "../media/PlaceHolderImage";
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
  link,
  placeholderMedia
}) => {
  const renderDate = renderDateRange(startDate, endDate);
  console.log("title: ",title);
  console.log("link: ",link);
  
  const content = (
    <>
      <div className="image">
        {mediaID ?
          <PostImage mediaId={mediaID} />
          :
          <PlaceHolderImage data={placeholderMedia} />
        }
      </div>
      <div className="text">
        <div className="organizer">{organizerName}</div>
        <h3>{title}</h3>
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
    </>
  );

  return (
    <div className="EventBox">
      {link && link !== "#" ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

export default EventBox;
