import React from 'react';
import Announcement from 'react-announcement';
import './announcement.css';


function AnnouncementMessage(props) {
  const { user } = props
  const { date, url, name } = user;
  date=date.toLocaleTimeString()
  return (
    <>{
      user ?
        <div className="message">
          <Announcement
            title={`${name}`}
            subtitle={`${date}`}
            link="http://localhost:3000/allChats"
            imageSource={`${url}`}
            daysToLive={1}
            secondsBeforeBannerShows={1}
            closeIconSize={30}
          />
        </div> :
        null
    }
    </>
  )

};
export default AnnouncementMessage;
