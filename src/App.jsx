import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Group from './Components/Group/Group';
import Navbar from './Components/Navbar/Navbar';
import { FaCheckCircle,FaExclamationTriangle,FaAdn } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { CiCircleAlert } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { PiCellSignalLowBold,PiCellSignalMediumBold,PiCellSignalFullBold } from "react-icons/pi";

function App() {
  const URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [usersData, setUsers] = useState([]);
  const [ticketsData, setTickets] = useState([]);
  const [group, setGroup] = useState('userId');
  const [order, setOrder] = useState('priority');
  const [groupData, setGroupData] = useState({});
  const icons = 
  {
    status:[FcTodoList, FaCheckCircle, TbProgressCheck, MdCancel, CiCircleAlert],
    userId:[FaAdn,FaAdn,FaAdn,FaAdn,FaAdn],
    priority:[BiDotsHorizontalRounded,PiCellSignalLowBold,PiCellSignalMediumBold,PiCellSignalFullBold,FaExclamationTriangle]
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get(URL)
        .then(response => {
          const { tickets, users } = response.data;
          setUsers(users);
          setTickets(tickets);
          const groupedData = groupAndOrderBy(ticketsData, group, order, usersData);
          setGroupData(groupedData);
          console.log(groupData);
        })
        
    };

    fetchData();
  }, [group, order]);


  function groupAndOrderBy(ticketsData, grouping, ordering, usersData) {
    if (!ticketsData || !usersData) {
      return {};
    }
    const groupedData = {};
    ticketsData.forEach((ticket) => {
      const groupByValue = ticket[grouping];
  
      if (!groupedData[groupByValue]) {
        groupedData[groupByValue] = [];
      }
  
      groupedData[groupByValue].push({
        ...ticket,
        userName: getUserName(ticket.userId, usersData),
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
    return user ? user.name : 'Unknown User';
  }
  
  return (
    <div className="App">
      <Navbar setGroup={setGroup} setOrder={setOrder}/>
      <div className="groups-container">
      {Object.entries(groupData).map(([heading, ticketsData]) => (
      <Group key={heading} heading={heading} tickets={ticketsData} icons={icons} group={group}/>
    ))}</div>
    </div>
  );
}


export default App;
