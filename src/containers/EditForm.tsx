import "../styles/editForm.scss";
import React, { useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { savePhoto } from "../firebase/helpers";
import { CurrentUser, LinkstaDispatchTypes } from "../store/actionTypes";
import { fetchUser, editUser, logout } from "../store/actions/userActions";
import history from "../services/history";
import Loading from "../components/Loading";
import { RootStore } from "../store";

type EditFormProps = {
  user: CurrentUser | null;
  editUser: Function;
  logout: Function;
  openModal?: Function;
  fetchUser: Function;
};

const EditForm = ({ user, editUser, logout, openModal, fetchUser }: EditFormProps) => {
  const [isNickValid, setIsNickValid] = useState<boolean | null>(null);

  const [nick, setNick] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [surname, setSurname] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const onSaveClicked = () => {
    const curruser: CurrentUser = {
      nickname: user?.nickname || "",
      name,
      surname,
      avatar,
      email: user?.email || "",
      description,
      job,
    };
    editUser({
      ...curruser,
    });
    if (openModal) {
      openModal(false);
    } else {
      history.push("/profile");
    }
  };

  const onCancelClicked = () => {
    if (openModal) {
      openModal(false);
    } else {
      history.push("/profile");
    }
  };

  const validateNick = (nick: string) => {
    const pattern = /^[0-9a-zA-Z]+$/;
    if (nick.match(pattern)) setIsNickValid(true);
    else setIsNickValid(false);
  };

  const onFileChange = (e: any) => {
    setFileLoading(true);
    const file = e.target.files[0];
    savePhoto(file).then((url) => {
      setAvatar(url);
      setFileLoading(false);
    });
  };
  const isDisabled = () => {
    if (fileLoading) {
      return true;
    } else {
      return isNickValid === null ? false : !isNickValid;
    }
  };

  useEffect(() => {
    if (!user && fetchUser) {
      fetchUser();
    }
  }, []);
  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
      setDescription(user.description);
      setJob(user.job);
      setName(user.name);
      setNick(user.nickname);
      setSurname(user.surname);
    }
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="edit-form">
      <div className="edit-form-header">
        <h1>Profile information</h1>
        <p onClick={() => logout()}>Log out</p>
      </div>
      <div className="edit-form-item horizontal">
        <div className="edit-form-item image">
          <label htmlFor="#" className="edit-form-label">
            Avatar:
          </label>
          <div className="edit-form-item image-load">
            <img
              className="edit-form-default-image"
              src={avatar ? avatar : "../../assets/default-image.svg"}
            />
            <input
              id="file"
              className="edit-form-file-loader"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <label htmlFor="file" className="edit-form-label">
            Choose new photo
          </label>
          </div>
        </div>
        <div className="edit-form-item data">
          <div className="edit-form-item">
            <label htmlFor="name" className="edit-form-label">
              First Name
            </label>
            <input
              id="name"
              className="edit-form-text-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="edit-form-item">
            <label htmlFor="surname" className="edit-form-label">
              Second Name
            </label>
            <input
              id="surname"
              className="edit-form-text-input"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="edit-form-item job">
        <label htmlFor="job" className="edit-form-label">
          Job Title
        </label>
        <input
          id="job"
          className="edit-form-text-input"
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>
      <div className="edit-form-item description">
        <label htmlFor="description" className="edit-form-label">
          Description
        </label>
        <textarea
          id="description"
          className="edit-form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="edit-form-action-item">
        <button
          disabled={isDisabled()}
          onClick={onSaveClicked}
          className="edit-form-action-button">
          Save
        </button>
        <button onClick={onCancelClicked} className="edit-form-action-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStore) => ({
  user: state.userState.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<LinkstaDispatchTypes>) =>
  bindActionCreators(
    {
      fetchUser,
      editUser,
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
