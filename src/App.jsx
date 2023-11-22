import React, { useEffect, useState } from 'react';
import Group from './Components/Group/Group';
import Navbar from './Components/Navbar/Navbar';
import {  FaExclamationTriangle, FaAdn } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FcTodoList,FcApproval, FcLowPriority,FcMediumPriority,FcHighPriority,FcCancel,FcPieChart ,FcExpired,FcBusinessman,FcManager,FcServiceMark,FcLinux} from "react-icons/fc";
import './App.css';

function App() {
  const URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const icons = {
    status: [FcTodoList, FcApproval, FcPieChart, FcCancel, FcExpired],
    userId: [FaAdn,FcBusinessman,FcServiceMark, FcManager, FcLinux],
    priority: [BiDotsHorizontalRounded, FcLowPriority,FcMediumPriority, FaExclamationTriangle,FcHighPriority]
  };

  
  const [group, setGroup] = useState('priority');
  const [order, setOrder] = useState('priority');
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    const savedGroup = localStorage.getItem('savedGroup');
    const savedOrder = localStorage.getItem('savedOrder');
    setGroup(savedGroup || 'priority');
    setOrder(savedOrder || 'priority');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { tickets, users } = data;
        const groupedData = groupAndOrderBy(tickets, group, order, users);
        setGroupData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [group, order]);

  useEffect(() => {
    localStorage.setItem('savedGroup', group);
    localStorage.setItem('savedOrder', order);
  }, [group, order]);

  function groupAndOrderBy(ticketsData, grouping, ordering, usersData) {
    if (!ticketsData || !usersData) {
      return {};
    }

    const getStatusIcon = (status) => {
      const statusIcons = icons['status'];
      if (statusIcons && statusIcons.length > 0) {
        switch (status) {
          case 'Todo':
            return statusIcons[0];
          case 'Done':
            return statusIcons[1];
          case 'In progress':
            return statusIcons[2];
          case 'Canceled':
            return statusIcons[3];
          case 'Backlog':
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
          case 'usr-1':
            return userIcons[0];
          case 'usr-2':
            return userIcons[1];
          case 'usr-3':
            return userIcons[2];
          case 'usr-4':
            return userIcons[3];
          case 'usr-5':
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

    const groupedData = {};
    ticketsData.forEach((ticket) => {
      const groupByValue = ticket[grouping];

      if (!groupedData[groupByValue]) {
        groupedData[groupByValue] = [];
      }

      groupedData[groupByValue].push({
        ...ticket,
        userName: getUserName(ticket.userId, usersData),
        statusIcon: getStatusIcon(ticket.status),
        userIcon: getUserIcon(ticket.userId),
        priorityIcon: getPriorityIcon(ticket.priority),
      });
    });

    for (const group in groupedData) {
      if (groupedData.hasOwnProperty(group)) {
        groupedData[group] = groupedData[group].sort((a, b) => {
          if (ordering === 'priority') {
            return b.priority - a.priority;
          } else if (ordering === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }
    }

    return groupedData;
  }

  function getUserName(userId, usersData) {
    const user = usersData.find((user) => user.id === userId);
    return user ? user.name : 'Unknown-User';
  }

  return (
    <div className="App">
      <div><Navbar setGroup={setGroup} setOrder={setOrder} /></div>
      <div className="groups-container">
        {groupData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.entries(groupData).map(([heading, ticketsData]) => (
            <Group key={heading} heading={heading} tickets={ticketsData} group={group} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
