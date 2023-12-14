import moment from "moment-timezone";

export function convertDateToMoment(dateAry: Array<number>) {
  const date = new Date(dateAry[0], dateAry[1]-1, dateAry[2]);
  return moment(date).tz('America/Chicago').format('MM/DD/YYYY');
}
