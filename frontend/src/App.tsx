import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import ListPage from "./pages/ListPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContainer = styled.div`
  display: flex;
  font-family: Lato, sans-serif;
`;

const Content = styled.div`
  margin-left: 300px;
  padding: 20px;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <CustomNavbar />
        <Content>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/announcements/new" element={<AnnouncementPage />} />
            <Route path="/announcements/edit/:id" element={<AnnouncementPage />} />
          </Routes>
        </Content>
      </AppContainer>
    </Router>
  );
};

export default App;