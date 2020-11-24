import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

export default function Sidebar() {
  return (
    <div>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Home</MenuItem>
          <SubMenu title="Questions">
            <MenuItem>My Post</MenuItem>
            <MenuItem>All Post</MenuItem>
          </SubMenu>
          <MenuItem>Log out</MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}
