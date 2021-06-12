import { PhotoAttribute } from "../store/actionTypes/postActionTypes";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";

export type ResultType = {
  id: string;
  size: number;
  type: string;
  name: string;
};

export const createObjectsForApi = (objArr: any[]): PhotoAttribute[] => {
  return objArr.map((el) => {
    const { key, name, type } = el.meta;
    const id = key.split("/")[1];
    return {
      image: {
        id,
        storage: "cache",
        metadata: {
          size: el.size,
          mime_type: type,
          filename: name,
        },
      },
    };
  });
};

const uppy = Uppy({
  meta: { type: "avatar" },
  restrictions: {
    maxNumberOfFiles: 5,
    allowedFileTypes: ["image/*"],
  },
  autoProceed: true,
});
uppy.use(AwsS3, {
  companionUrl: "https://linkstagram-api.ga/",
  endpoint: "https://linkstagram-api.ga/",
  resume: true,
  retryDelays: [0, 1000, 3000, 5000],
});

export default uppy;
