import React from "react";
import Card from "../Card/Card";
import { GoPlus } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import './Group.css';

function Group({ heading, tickets, icons, group }) {
  const getStatusIcon = (status) => {
    const statusIcons = icons["status"];
    if (statusIcons && statusIcons.length > 0) {
      switch (status) {
        case "Todo":
          return statusIcons[0];
        case "Done":
          return statusIcons[1];
        case "In progress":
          return statusIcons[2];
        case "Canceled":
          return statusIcons[3];
        case "Backlog":
          return statusIcons[4];
        default:
          return null;
      }
    }
    return null;
  };

  const getUserIcon = (userId) => {
    const userIcons = icons["userId"];
    if (userIcons && userIcons.length > 0) {
      switch (userId) {
        case "usr-1":
          return userIcons[0];
        case "usr-2":
          return userIcons[1];
        case "usr-3":
          return userIcons[2];
        case "usr-4":
          return userIcons[3];
        case "usr-5":
          return userIcons[4];
        default:
          return null;
      }
    }
    return null;
  };
  const getPriorityIcon = (priority) => {
    const priorityIcons = icons["priority"];
    if (priorityIcons && priorityIcons.length > 0) {
      switch (priority) {
        case 0:
          return priorityIcons[0];
        case 1:
          return priorityIcons[1];
        case 2:
          return priorityIcons[2];
        case 3:
          return priorityIcons[3];
        case 4:
          return priorityIcons[4];
        default:
          return null;
      }
    }
    return null;
  };

  const statusIcon = getStatusIcon(tickets[0].status);
  const userIcon = getUserIcon(tickets[0].userId);
  const priorityIcon = getPriorityIcon(tickets[0].priority);

  const cards = tickets.map((ticket) => {
    return <Card ticket={ticket} icons={icons} group={group} />;
  });

  const prior = ["No priority", "Low", "Medium", "High", "Urgent"];
  let groupTitle = heading <= 4 && heading >= 0 ? prior[heading] : heading;
  if (group === "userId") {
    groupTitle = tickets[0].userName;
  }

  return (
    <div className="group">
      <div className="title-of-group">
        <div className="icons-of-group">
          <span>
            {statusIcon &&
              React.createElement(statusIcon, { className: "icons-class" })}
          </span>
          <span className="title-elements">{groupTitle}</span>
          <span className="title-elements">{tickets.length}</span>
        </div>
        <div className="icons-of-group">
          <span><GoPlus /></span>
          <span><RxDotsHorizontal /></span>
        </div>
      </div>
      <div className="cards">{cards}</div>
    </div>
  );
}

export default Group;
