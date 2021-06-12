import moment from "moment";

export const formateDate = (ms: number) => {
  return moment(ms).fromNow();
};
