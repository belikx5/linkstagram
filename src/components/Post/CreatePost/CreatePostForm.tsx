import "./createPost.scss";
import React, { useState } from "react";
import history from "../../../services/history";
import Slider from "../../Slider";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  createPost,
  setPostActionError,
} from "../../../store/actions/postActions";
import { useLocation } from "react-router";
import uppy, { createObjectsForApi } from "../../../services/uppy";

type CreateFormProps = {
  setModalOpen?: Function;
};

const CreatePostForm = ({ setModalOpen }: CreateFormProps) => {
  const [t] = useTranslation("common");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [files, setFiles] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const onFileChange = (event: any) => {
    setFileLoading(true);
    const files: any[] = [];
    const previews: string[] = [];
    for (const file of event.currentTarget.files) {
      previews.push(URL.createObjectURL(file));
      files.push(file);
    }
    setFiles(files);
    setPreviewImages(previews);
    setFileLoading(false);
  };

  const onPostClick = () => {
    if (files.length) {
      setFileLoading(true);
      (async () => {
        files.forEach((file) => {
          const { name, type } = file;
          uppy.addFile({
            name,
            type,
            data: file,
            source: "cache",
          });
        });
        const { successful }: any = await uppy.upload();
        uppy.cancelAll();
        const images = createObjectsForApi(successful);
        dispatch(
          createPost({
            post: {
              description,
              photos_attributes: images,
            },
          })
        );
        setFileLoading(false);
      })();
    } else dispatch(setPostActionError("Add at least one photo to post"));
  };
  const onCancelClick = () => {
    if (setModalOpen) setModalOpen(false);
    else history.push("/profile");
  };

  return (
    <div
      className={`create-post-form  ${pathname === "/create" ? "page" : ""}`}>
      {!previewImages.length ? (
        <>
          <input
            id="file"
            className="create-post-file-loader"
            type="file"
            required
            multiple
            accept="image/*"
            onChange={onFileChange}
          />
          <label htmlFor="file" className="file-loader-label">
            <div
              className={`file-loader-label-inner ${
                previewImages.length ? "max-size" : ""
              }`}>
              <img src="../../assets/default-image.svg" alt="default" />
              {t("createPost.upload")}
            </div>
          </label>
        </>
      ) : (
        <Slider images={previewImages} />
      )}
      <div className="create-form-item">
        <label htmlFor="description" className="create-post-form-label">
          {t("createPost.description")}
        </label>
        <textarea
          id="description"
          className="create-post-form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="create-form-actions">
        <button onClick={onCancelClick} className="create-form-action-button">
          {t("common.cancel")}
        </button>
        <button
          disabled={fileLoading}
          onClick={onPostClick}
          className="create-form-action-button">
          {t("common.post")}
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
