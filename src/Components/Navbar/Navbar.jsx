import React, { useState, useEffect } from 'react';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Navbar.css";

const Navbar = ({ setGroup, setOrder }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    
    const savedGroup = localStorage.getItem('savedGroup') || 'status';
    const savedOrder = localStorage.getItem('savedOrder') || 'priority';

    
    setGroup(savedGroup);
    setOrder(savedOrder);
  }, [setGroup, setOrder]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="navbar-container">
      <button className="display-button" onClick={toggleDropdown}>
        <span><HiOutlineAdjustmentsHorizontal /></span>
        <span>Display</span>
        <span><RiArrowDropDownLine /></span>
      </button>
      {isDropdownVisible && (
        <div className="dropdown">
          <form>
            <div className="form-row">
              <label htmlFor="dropdown1">Grouping</label>
              <select id="dropdown1" onChange={(e) => { setGroup(e.target.value); }}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="dropdown2">Ordering</label>
              <select id="dropdown2" onChange={(e) => { setOrder(e.target.value); }}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
