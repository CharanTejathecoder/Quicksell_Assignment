import React from 'react';
import './Card.css';

function Card({ ticket, icons, group }) {
  const getStatusIcon = (status) => {
    const statusIcons = icons['status'];
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
    const userIcons = icons['userId'];
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
    const priorityIcons = icons['priority'];
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
  
  

  const statusIcon = getStatusIcon(ticket.status);
  const userIcon = getUserIcon(ticket.userId);
  const priorityIcon = getPriorityIcon(ticket.priority);



  return (
    <div className='card'>
      <div className='details'>
      <div>
        <span>
          {ticket.id}
        </span>
      </div>
      <div className='col-2'>
        <span>{statusIcon && React.createElement(statusIcon,{ className: "icons-class" })}</span>
        <span>{ticket.title}</span>
      </div>
      <div className='col-3'>
      <span>{priorityIcon && React.createElement(priorityIcon,{ className: "icons-class" })}</span>
        <span>{ticket.tag}</span>
      </div>

      </div>
      <div className='userImage'>
      <span>{userIcon && React.createElement(userIcon,{ className: "icons-class" })}</span>

      </div>
    </div>
  );
}

export default Card;
