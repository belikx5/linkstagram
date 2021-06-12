import "./editForm.scss";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import history from "../../../services/history";
import Loading from "../../ui/Loading/Loading";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  fetchCurrentUser,
  editUser,
  logout,
} from "../../../store/actions/userActions";
import uppy, { createObjectsForApi } from "../../../services/uppy";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

type EditFormProps = {
  openModal?: Function;
};

const EditForm = ({ openModal }: EditFormProps) => {
  const [t] = useTranslation("common");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  const [isNickValid, setIsNickValid] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState<any>(null);
  const [previewFile, setPreviewFile] = useState("");
  const [surname, setSurname] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const onSaveClicked = async () => {
    setFileLoading(true);
    let images;
    if (file) {
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
        source: "cache",
      });
      const { successful }: any = await uppy.upload();
      uppy.cancelAll();
      images = createObjectsForApi(successful);
    }
    const editedAcc = {
      account: {
        username: currentUser?.username || "",
        first_name: name,
        description: description,
        last_name: surname,
        job_title: job,
      },
    };
    dispatch(
      editUser(
        images
          ? {
              ...editedAcc,
              account: { ...editedAcc.account, profile_photo: images[0].image },
            }
          : editedAcc
      )
    );
    setFileLoading(false);
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
  const onFileChange = (event: any) => {
    setFileLoading(true);
    const file = event.currentTarget.files[0];
    setFile(file);
    setPreviewFile(URL.createObjectURL(file));
    setFileLoading(false);
  };

  const isDisabled = () => {
    if (fileLoading) {
      return true;
    } else {
      return isNickValid === null ? false : !isNickValid;
    }
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      setDescription(currentUser.description || "");
      setJob(currentUser.job_title || "");
      setName(currentUser.first_name || "");
      setSurname(currentUser.last_name || "");
      //   setNick(user.nickname);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <div className={`edit-form  ${pathname === "/edit" ? "page" : ""}`}>
      <div className="edit-form-header">
        <h1>{t("editProfile.profileInfo")}</h1>
        <p onClick={() => dispatch(logout())}>{t("common.logout")}</p>
      </div>
      <div className="edit-form-item horizontal">
        <div className="edit-form-item image">
          <label htmlFor="#" className="edit-form-label">
            {t("editProfile.avatar")}:
          </label>
          <div className="edit-form-item image-load">
            {previewFile ? (
              <img
                src={previewFile}
                className="edit-form-default-image"
                alt="preview"
              />
            ) : (
              <img
                className="edit-form-default-image"
                src={
                  currentUser?.profile_photo_url
                    ? currentUser?.profile_photo_url
                    : "../../assets/default-image.svg"
                }
                alt="preview"
              />
            )}
            <input
              id="file"
              className="edit-form-file-loader uppyForm"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <label htmlFor="file" className="edit-form-label">
              {t("editProfile.choosePhoto")}
            </label>
          </div>
        </div>
        <div className="edit-form-item data">
          <div className="edit-form-item">
            <label htmlFor="name" className="edit-form-label">
              {t("editProfile.fName")}
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
              {t("editProfile.sName")}
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
          {t("editProfile.job")}
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
          {t("editProfile.description")}
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
          {t("common.save")}
        </button>
        <button onClick={onCancelClicked} className="edit-form-action-button">
          {t("common.cancel")}
        </button>
      </div>
    </div>
  );
};

export default EditForm;
