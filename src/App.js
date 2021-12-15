import { Col, Layout, Row } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Content, Footer } = Layout;
function App({ children }) {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "white" }}>
        <Row>
          <Col span={12}>
            <div>
              <h1 style={{ fontSize: "14px", marginLeft: "-20px" }}>
                Github Searcher
              </h1>
            </div>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "Red" : "black",
                  fontSize: isActive ? "16px" : "14px",
                };
              }}
              to="/"
            >
              <div>Home</div>
            </NavLink>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "Red" : "black",
                  fontSize: isActive ? "16px" : "14px",
                };
              }}
              to="/about"
            >
              <div>About</div>
            </NavLink>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 50px" }}>{children}</Content>
      <Footer style={{ textAlign: "center", marginTop: "40px" }}>
        Alright Reversed ©2021 Created by Mmd
      </Footer>
    </Layout>
  );
}

export default App;
