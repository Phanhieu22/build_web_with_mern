import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContexts } from "../../contexts/postContexts";
function UpdatePostModals({
  post: {
    title: titleInit,
    description: destitleInitcriptionInit,
    url: urlInit,
    status: statusInit,
  },
}) {
  const {
    updatePost,
    setShowToats,
    showUpdateModal,
    setShowUpdateModal,
    postState,
  } = useContext(PostContexts);
  const [newPost, setNewPost] = useState({
    title: titleInit,
    description: destitleInitcriptionInit,
    url: urlInit,
    status: statusInit,
  });

  const onChangeGetValue = (event) => {
    event.preventDefault();
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const { title, description, url, status } = newPost;

  const onSaveUpdatePost = async (event) => {
    try {
      event.preventDefault();
      if (title && description && url) {
        console.log(newPost);
        const response = await updatePost({ ...postState.post, ...newPost });

        setShowToats({
          show: true,
          message: response.message,
          title: "Thành công",
        });
        resetForm();
      } else {
        setShowToats({
          show: true,
          message: "Error",
          title: "error",
        });
        resetForm();
      }
    } catch (error) {
      console.log(error.data);
    }
  };
  const resetForm = () => {
    setNewPost({
      title: titleInit,
      description: destitleInitcriptionInit,
      url: urlInit,
      status: statusInit,
    });
    setShowUpdateModal(false);
  };
  const closeModelsForrm = () => {
    resetForm();
  };
  return (
    <>
      <Modal
        show={showUpdateModal}
        onHide={closeModelsForrm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>What do you want do learn ?</Modal.Title>
        </Modal.Header>{" "}
        <div className="margin-4">
          <Form onSubmit={onSaveUpdatePost}>
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
                Save
              </Button>
            </Modal.Footer>
          </Form>{" "}
        </div>
      </Modal>
    </>
  );
}

export default UpdatePostModals;
