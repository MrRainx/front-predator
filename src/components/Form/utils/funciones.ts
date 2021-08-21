import moment from "moment";
export const DATE_FORMAT = "yyyy-MM-DD";

export const objectToB64 = (data: any) => jsonToB64(JSON.stringify(data));

export const jsonToB64 = (json: any) => Buffer.from(json).toString("base64");

export const b64ToObject = (b64: any) =>
  JSON.parse(new Buffer(b64, "base64").toString("ascii"));

export const toMoment = (date: any) => {
  const newDate =
    moment(date).format("dddd DD [de] MMMM [de] yyyy, [a las ]") +
    moment(date).format("HH:mm:ss a");
  return newDate.toUpperCase();
};

export const getId = (object:object|any, param = "id") => {
  return object[param];
};

export const concatIfExist = (values: any[]) => {
  return values.filter((value) => value && value !== "").join(" ");
};

export const setValueId = (value: any) => (value ? getId(value) : value);

export const setValueTrim = (value: string) => value.trim() ?? "";

export const toBackendDate = (date:any) => moment(date).format(DATE_FORMAT);
export const toFrontDate = (date: string | Date | any) => moment(date).toDate();
