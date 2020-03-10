import React from "react";
import Announcement from "react-announcement";
import "./announcement.css";
const AnnouncementMessage = props => {
  return (
    <div className="message">
      <Announcement
        title="Here is your component"
        subtitle="The best announcement component for React is finally here. Install it in all your projects."
        link="https://github.com/kristofferandreasen/react-announcement"
        imageSource={"./navbar/notification.png"}
        daysToLive={3}
        secondsBeforeBannerShows={2}
        closeIconSize={30}
      />
    </div>
  );
};
export default AnnouncementMessage;
