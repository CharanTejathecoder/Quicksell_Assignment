import React from "react";
import Card from "../Card/Card";
import { GoPlus } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import "./Group.css";

function Group({ heading, tickets, group }) {
  const cards = tickets.map((ticket, index) => {
    return <Card key={index} ticket={ticket} group={group} />;
  });

  const prior = ["No priority", "Low", "Medium", "High", "Urgent"];
  let groupTitle;
  if (group === "userId") {
    groupTitle = tickets.length > 0 ? tickets[0].userName : "Unknown User";
  }
  let groupIcon;
  switch (group) {
    case "status": {
      groupTitle = heading;
      groupIcon = tickets[0].statusIcon;
      break;
    }
    case "userId": {
      groupTitle = tickets[0].userName;
      groupIcon = tickets[0].userIcon;
      break;
    }
    case "priority": {
      groupTitle = prior[heading];
      groupIcon = tickets[0].priorityIcon;
      break;
    }
    default: {
      groupTitle = heading;
      groupIcon = tickets[0].priorityIcon;
      break;
    }
  }

  return (
    <div className="group">
      <div className="title-of-group">
        <div className="icons-of-group">
          <span>
            {groupIcon &&
              React.createElement(groupIcon, { className: "icons-class" })}
          </span>
          <span className="title-elements">{groupTitle}</span>
          <span className="title-elements light-font">{tickets.length}</span>
        </div>
        <div className="icons-of-group">
          <span>
            <GoPlus />
          </span>
          <span>
            <RxDotsHorizontal />
          </span>
        </div>
      </div>
      <div className="cards">{cards}</div>
    </div>
  );
}

export default Group;
