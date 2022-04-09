import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContexts } from "../../contexts/postContexts";
function AddPostModals(props) {
  const { showAddModal, closeMolels, createAPost, showToats, setShowToats } =
    useContext(PostContexts);
  const [newPost, setNewPost] = useState({
    title: null,
    description: null,
    url: null,
    status: "TO LEARN",
  });

  const onChangeGetValue = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const { title, description, url, status } = newPost;

  const onCreatePost = async (event) => {
    event.preventDefault();
    if (title && description && url) {
      const response = await createAPost(newPost);
      console.log(response);
      setShowToats({
        show: true,
        message: "happy learning",
        title: "Thành công",
      });
      resetForm();
    } else {
      setShowToats({
        show: true,
        message:
          "An error occurred or an error occurred during the creation process",
        title: "error",
      });
      resetForm();
    }
  };
  const resetForm = () => {
    setNewPost({
      title: null,
      description: null,
      url: null,
      status: "TO LEARN",
    });
    closeMolels();
  };
  const closeModelsForrm = () => {
    resetForm();
  };
  return (
    <>
      <Modal
        show={showAddModal}
        onHide={closeModelsForrm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>What do you want do learn ?</Modal.Title>
        </Modal.Header>{" "}
        <div className="margin-4">
          <Form onSubmit={onCreatePost}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              name="title"
              placeholder="title"
              value={title}
              onChange={onChangeGetValue}
            />{" "}
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              name="description"
              placeholder="description"
              value={description}
              onChange={onChangeGetValue}
            />{" "}
            <Form.Label htmlFor="url">Url youtobe</Form.Label>
            <Form.Control
              type="text"
              id="url"
              name="url"
              placeholder="url youtobe"
              value={url}
              onChange={onChangeGetValue}
            />{" "}
            <Form.Group>
              <Form.Label htmlFor="url">Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={onChangeGetValue}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModelsForrm}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                LearnIt!
              </Button>
            </Modal.Footer>
          </Form>{" "}
        </div>
      </Modal>
    </>
  );
}

export default AddPostModals;
