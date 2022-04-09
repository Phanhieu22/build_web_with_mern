import React from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContexts } from "../../contexts/postContexts";

function ActionButton({ url, _id }) {
  const { deletePost, findPost, setShowUpdateModal } = useContext(PostContexts);

  const selectPost = (_id) => {
    findPost(_id);
    setShowUpdateModal(true);
  };

  return (
    <>
      <Button variant className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>

      <Button
        variant
        className="post-button"
        onClick={selectPost.bind(this, _id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>

      <Button
        variant
        className="post-button"
        onClick={deletePost.bind(this, _id)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
}

export default ActionButton;
