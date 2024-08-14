import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCity } from "react-icons/fa";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background-color: #fafafa;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #000;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #fff7d1;
  }
`;

const Icon = styled.div`
  margin-right: 20px;
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`;

const MainLogoIcon = styled(FaCity)`
  font-size: 24px;
  margin-right: 15px;
  margin-bottom: 5px;
  color: #000;
  margin-left: 10px;
`;

const CityName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/announcements/new");
  };

  return (
    <NavbarContainer>
      <LogoContainer>
        <MainLogoIcon />
        <CityName>Bratislava</CityName>
      </LogoContainer>
      <div>
        <NavLink href="/">
          <Icon>
            <TfiAnnouncement />
          </Icon>
          Announcements
        </NavLink>
      </div>
      <div>
        <NavLink onClick={handleAddNew}>
          <Icon>
            <IoIosAddCircleOutline />
          </Icon>
          Create New
        </NavLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
