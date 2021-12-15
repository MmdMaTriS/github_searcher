import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Row, Col, Button, Card } from "antd";

const { Meta } = Card;

const UserDetails = () => {
  const [userDetails, setUserDetail] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((r) => r.json())
      .then((data) => setUserDetail([data]));
  }, []);
  useEffect(() => {
    fetch(`https://api.github.com/users/${id}/repos`)
      .then((r) => r.json())
      .then((data) => setUserRepos(data));
  }, []);
  return (
    <div>
      {userDetails?.map((u) => (
        <div key={u.id}>
          <Row>
            <Col span={14}>
              <Link to="/">
                <Button type="primary">Back to Home</Button>
              </Link>
            </Col>
            <Col span={6}>
              <Button type={u.hireable ? "primary" : "danger"}>
                Hireable:{u.hireable ? "Yes" : "No"}
              </Button>
            </Col>
          </Row>
          <br />
          <Row style={{ border: "1px dashed gray" }}>
            <Col xs={24} md={24} push={2} style={{ textAlign: "center" }}>
              <Card
                style={{ width: 200, borderRadius: "40px" }}
                cover={<img alt="example" src={u.avatar_url} />}
              >
                <Meta title={u.login} />
                <br />
              </Card>
            </Col>
          </Row>
          <br />
          <Row
            style={{
              border: "1px dashed black",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            justify="center"
          >
            <Col md={4}>
              <Button type="danger">Followers: {u.followers}</Button>
            </Col>
            <Col md={4}>
              <Button type="dashed">Following: {u.following}</Button>
            </Col>
            <Col md={4}>
              <Button type="primary">Public Repos: {u.public_repos}</Button>
            </Col>
            <Col md={4}>
              <Button type="ghost">Public Gists: {u.public_gists}</Button>
            </Col>
          </Row>
          <Row gutter={[32, 32]} style={{ marginTop: "20px" }}>
            {userRepos?.map((rep) => (
              <Col span={24} key={rep.name}>
                <div
                  style={{
                    border: "1px dashed gray",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  <a href={rep.clone_url}>{rep.name}</a>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
