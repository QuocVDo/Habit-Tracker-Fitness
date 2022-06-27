import React from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar_generic">
        <li>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li>
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li>
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 Days</span>
        </li>
      </ul>
      <div className="sidebar-middle">
        <span>
          <FaChevronDown />
          <h2>Projects</h2>
        </span>
      </div>
      <ul className="sidebar-projects">Projects Will Be here</ul>
      Add Project Component here
    </div>
  );
}
