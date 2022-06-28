import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import todoist from './todoist.png';

export default function Header() {
  return (
    <div className="topBar">
      <ul>
        <li>
          <img
            src={todoist}
            alt="Todoist Icon"
            height="100px"
            width="100px"
          ></img>
        </li>
        <li>
          <span>
            <FaChevronDown />
          </span>
        </li>
      </ul>
    </div>
  );
}
