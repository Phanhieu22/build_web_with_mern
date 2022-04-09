import React from "react";
import { PostContexts } from "../contexts/postContexts";
import { useEffect, useContext } from "react";
import { Button, Card, Col, Row, Spinner, Toast } from "react-bootstrap";
import { AuthContext } from "../contexts/authContext";
import SinglePost from "../component/post/SinglePost";
import AddPostModals from "../component/post/AddPostModals";
import AddIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModals from "../component/post/UpdatePostModals";
function Dashboard(props) {
  // context
  const {
    postState: { posts, isLoadingPost, post },
    getAllPost,
    setShowAddModal,
    showToats,
    setShowToats,
  } = useContext(PostContexts);
  const {
    authState: { user },
  } = useContext(AuthContext);
  // use effect
  useEffect(() => {
    getAllPost();
  }, []);

  //content
  let body = null;
  if (isLoadingPost) {
    body = (
      <>
        <span className="spinner-container">
          <Spinner animation="border" variant="info" />
        </span>
      </>
    );
  } else {
    if (posts.length === +0) {
      body = (
        <>
          <Card>
            <Card.Body>
              <Card.Title>wellcome {user.userName}</Card.Title>
              <Card.Text>
                click button below to trask your firsrt skill learn
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  setShowAddModal(true);
                }}
              >
                learnIt
              </Button>
            </Card.Body>
          </Card>
          <div>
            <img
              src={AddIcon}
              alt="add icon"
              className="addIcon"
              onClick={() => {
                setShowAddModal(true);
              }}
            />
          </div>
        </>
      );
    } else {
      body = (
        <>
          <Row style={{ margin: "0px" }} className="mt-4 , ml-4 , mr-4,mb-4">
            {posts.map((post) => {
              return (
                <Col key={post._id} style={{ margin: "10px 0px" }} xs="4">
                  <SinglePost post={post} />
                </Col>
              );
            })}
          </Row>
          <div>
            <img
              src={AddIcon}
              alt="add icon"
              className="addIcon"
              onClick={() => {
                setShowAddModal(true);
              }}
            />
          </div>
        </>
      );
    }
  }
  return (
    <>
      {body}
      <AddPostModals />
      {post !== null && <UpdatePostModals post={post} />}
      <Toast
        show={showToats.show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        onClose={setShowToats.bind(this, {
          show: false,
          message: "",
          title: "",
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{showToats.message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Dashboard;
