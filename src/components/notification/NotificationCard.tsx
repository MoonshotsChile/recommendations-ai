import React, { FC } from "react";
import { Notification } from "../../domain/entity/Notification";
import "./Notification.scss";
import "swiper/swiper.scss";
interface PropsCard {
  notification: Notification;
}
const NotificationCard = (props: PropsCard): JSX.Element => {
  const notification = props.notification;
  return (
    <div className="notification card is-horizontal">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={notification.img} alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-6">{notification.title}</p>
            <p className="subtitle is-6">{notification.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
