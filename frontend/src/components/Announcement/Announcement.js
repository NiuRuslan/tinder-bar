import React, { useState, useEffect } from "react";
import Announcement from "react-announcement";
import "./announcement.css";

function AnnouncementMessage(props) {
  const { user } = props;
  const { date, url, name } = user;
  return (
    <>
      {user ? (
        <div className="message">
          <Announcement
            title={`${name}`}
            subtitle={`${date}`}
            link="/allChats"
            imageSource={`${url}`}
            daysToLive={0.0000001}
            secondsBeforeBannerShows={1}
            closeIconSize={30}
          />
        </div>
      ) : null}
    </>
  );
}
export default AnnouncementMessage;
