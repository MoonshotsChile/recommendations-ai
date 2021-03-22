import * as React from "react";
import NotificationCard from "../components/notification/NotificationCard";
import EnCursoCard from "../components/mision/EnCurso";

import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import "../components/notification/Notification.scss";
import { bell, bellSelected } from "../assets";
import { NotificationsUseCase } from "../domain/NotificationsUseCase";
import { Notification, notificationMock } from "../domain/entity/Notification";
import { useState, useEffect } from "react";

const NotificationPage: React.FC = () => {
  const useCase = new NotificationsUseCase();
  const [notifications, setNotifications] = useState([notificationMock]);

  const [tabDisponibleClassName, setTabDisponibleClassName] = useState(
    "is-active"
  );
  const [tabEnCursoClassName, setTabEnCursoClassName] = useState("");
  const [displayDisponibleClassName, setDisplayDisponibleClassName] = useState(
    ""
  );
  const [displayEnCursoClassName, setDisplayEnCursoClassName] = useState(
    "is-hidden"
  );

  useEffect(() => {
    useCase
      .list()
      .then((response: Response) => response.json())
      .then((data: Notification[]) => {
        console.log("data", data);
        setNotifications(data);
      });
  }, []);

  const disponible = () => {
    setTabDisponibleClassName("is-active");
    setTabEnCursoClassName("");
    setDisplayEnCursoClassName("is-hidden");
    setDisplayDisponibleClassName("");
  };
  const enCurso = () => {
    setTabDisponibleClassName("");
    setTabEnCursoClassName("is-active");
    setDisplayEnCursoClassName("");
    setDisplayDisponibleClassName("is-hidden");
  };

  return (
    <div className="container">
      <Navbar selected={NAVBAR_ACTIONS.notifications} />
      <div className="section">
        <div className="columns is-mobile">
          <div className="column">
            <span className="icon-text">
              <span className="icon">
                <img src={bellSelected} />
              </span>
              <span>Mis Notificaciones</span>
            </span>
          </div>
        </div>
      </div>
      <div className={displayDisponibleClassName}>
        {notifications.map((notification: Notification, i: number) => (
          <div className="columns is-mobile" key={`notification-${i}`}>
            <div className="column is-12">
              <NotificationCard notification={notification} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
