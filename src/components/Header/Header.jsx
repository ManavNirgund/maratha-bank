import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import marathaBank from "../../Assets/Images/maratha-bank.png";
import { CommunityDropdown, appName, news } from "../../Assets/data/enums";

// import { Link } from "react-scroll";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Service/utilities/auth";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ScrollToAbout from "../ScrollToAbout/ScrollToAbout";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemCom, setSelectedItemCom] = useState("");

  const nav = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <MDBNavbar expand="lg" dark style={{ backgroundColor: "rgb(135, 0, 64)" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <Link to={"/"} style={{ color: "white" }}>
            <img src={marathaBank} width="50rem" height="auto" />
            {appName.title}
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <DropdownMenu />
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link"
                  role="button"
                  style={{ color: "white" }}
                >
                  {selectedItemCom ? selectedItemCom.name : "Community"}
                </MDBDropdownToggle>
                <MDBDropdownMenu
                  style={{
                    borderRadius: "5px",
                  }}
                  className={showBasic ? "center-dropdown" : ""}
                >
                  {CommunityDropdown.map((item) => {
                    return (
                      <MDBDropdownItem
                        key={item.id}
                        style={{
                          marginTop: "5px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          borderBottom: "1px solid gray",
                        }}
                        onClick={() => setSelectedItemCom(item)}
                      >
                        <Link
                          to={item.to}
                          style={{ color: "black" }}
                          onClick={() => setShowBasic(false)}
                        >
                          {item.name}
                        </Link>
                      </MDBDropdownItem>
                    );
                  })}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link"
                  role="button"
                  style={{ color: "white" }}
                >
                  {selectedItem ? selectedItem.name : "News"}
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{ borderRadius: "5px" }}>
                  {news.map((item) => {
                    return (
                      <MDBDropdownItem
                        key={item.id}
                        style={{
                          marginTop: "5px",
                          marginLeft: "5px",
                          marginRight: "5px",
                          borderBottom: "1px solid gray",
                        }}
                        onClick={() => setSelectedItem(item)}
                      >
                        <Link to={item.to} style={{ color: "black" }}>
                          {item.name}
                        </Link>
                      </MDBDropdownItem>
                    );
                  })}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <ScrollToAbout />
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav className="mx-auto"></MDBNavbarNav>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarNav>
                <MDBNavbarItem>
                  {!auth.jwt && (
                    <MDBNavbarLink>
                      <Link to={"signin"} style={{ color: "white" }}>
                        Login
                      </Link>
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {!auth.jwt && (
                    <MDBNavbarLink>
                      <Link to={"register"} style={{ color: "white" }}>
                        Register
                      </Link>
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
              </MDBNavbarNav>
              <MDBNavbarItem>
                {auth.jwt && (
                  <MDBNavbarLink>
                    <Link onClick={handleLogout} style={{ color: "white" }}>
                      Logout
                    </Link>
                  </MDBNavbarLink>
                )}
              </MDBNavbarItem>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
