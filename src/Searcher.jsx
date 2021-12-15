import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const Searcher = () => {
  const [entryName, setEntryName] = useState("");
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(0);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("datas"));
    if (datas) setDatas(datas);
  }, []);
  const clearData = () => {
    setDatas([]);
  };
  const getUserFiltered = (users) => {
    try {
      fetch(`https://api.github.com/search/users?q=${users}`)
        .then((r) => r.json())
        .then(
          (data) =>
            setDatas(data) &
            setLoading(0) &
            localStorage.setItem("datas", JSON.stringify(data))
        );
    } catch (ex) {
      console.log(ex & setLoading(0));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!entryName || entryName === " ") {
      setWarning(true);
      return;
    }
    getUserFiltered(entryName);
    setLoading(1);
    setEntryName("");
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(195, 195, 195, 0.9)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 6,
          }}
        ></div>
      ) : (
        ""
      )}
      <div>
        <br />
        {warning ? (
          <>
            <Alert message="You must enter name" type="warning" />
            <br />
          </>
        ) : (
          ""
        )}

        <form id="my-search" onSubmit={(e) => handleSearchSubmit(e)}>
          <Input
            value={entryName}
            size="large"
            placeholder="User name"
            prefix={<UserOutlined />}
            onChange={(e) => setEntryName(e.target.value) & setWarning(false)}
          />
          <br />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              border: "2px solid green",
              color: "green",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Submit
          </button>
          <br />
          <br />
          {datas?.items ? (
            <button
              type="submit"
              style={{
                width: "100%",
                border: "2px solid red",
                color: "Red",
                cursor: "pointer",
                fontSize: "18px",
              }}
              onClick={clearData}
            >
              Clear
            </button>
          ) : (
            ""
          )}
        </form>
        <br />
        <Row gutter={[32, 32]} style={{ textAlign: "center" }}>
          {datas?.items?.map((d) => (
            <Col key={d.id} xs={24} md={6}>
              <Card
                style={{ width: 200, borderRadius: "40px" }}
                cover={<img alt="example" src={d.avatar_url} />}
              >
                <Meta title={d.login} />
                <br />
                <Link to={`/${d.login}`}>
                  <Button
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      color: "Red",
                    }}
                  >
                    More
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Searcher;
