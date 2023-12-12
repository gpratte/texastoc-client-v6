import {SeasonData} from "./model/SeasonData";
import moment from "moment-timezone";

export function numGuarenteedPayouts(season: SeasonData) {
  let payouts;

  // if (season.estimatedPayouts) {
  //   payouts = season.estimatedPayouts;
  // } else if (season.payouts) {
    payouts = season.payouts;
  // }

  if (!payouts) {
    return 0;
  }

  let numGuarenteed = 0;
  // payouts.forEach(payout => {
  //   if (payout.guarenteed) {
  //     ++numGuarenteed;
  //   }
  // });

  return numGuarenteed;
}

export function convertDateToMoment(dateAry: Array<number>) {
  const date = new Date(dateAry[0], dateAry[1]-1, dateAry[2]);
  return moment(date).tz('America/Chicago').format('MM/DD/YYYY');
}
