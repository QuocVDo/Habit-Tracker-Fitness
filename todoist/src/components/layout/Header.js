//Header file for our java script, this goes under
//components within the  layout folder because it is
//is something that doesn't change often.

import React, { Component } from 'react';
import logo from './todoist-logo.png';
import { FaPizzaSlice } from 'react-icons/fa';
/*
 * Two ways to import other files such as images
 * One way: Import varName from '/directory/the/file/is/located"
 * Then use src={} and put the variable in
 *
 * The other way is to use require{} which will do the same thing.
 */

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="logo">
          <img src={logo} alt="Todoist"></img>
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li>
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
