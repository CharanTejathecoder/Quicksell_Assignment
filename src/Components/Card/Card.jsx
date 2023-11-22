import React from "react";
import "./Card.css";

function Card({ ticket, group }) {
  return (
    <div className="card">
      <div className="details">
        <div>
          <span>{ticket.id}</span>
        </div>
        <div className="col-2">
          {group !== "status" && (
            <span>
              {ticket.statusIcon &&
                React.createElement(ticket.statusIcon, {
                  className: "icons-class",
                })}
            </span>
          )}
          <span>{ticket.title}</span>
        </div>
        <div className="col-3">
          {group !== "priority" && (
            <span>
              {ticket.priorityIcon &&
                React.createElement(ticket.priorityIcon, {
                  className: "icons-class",
                })}
            </span>
          )}
          <span>{ticket.tag}</span>
        </div>
      </div>
      <div className="userImage">
        {group !== "userId" && (
          <span>
            {ticket.userIcon &&
              React.createElement(ticket.userIcon, {
                className: "icons-class",
              })}
          </span>
        )}
      </div>
    </div>
  );
}

export default Card;
