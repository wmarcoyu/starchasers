/* eslint-disable import/prefer-default-export  */
import moment from "moment";

const simplifyMonth = (inputTime, inputFormat, outputFormat) => {
  const time = moment(inputTime, inputFormat);
  const formattedTime = time.format(outputFormat);
  return formattedTime;
};

export { simplifyMonth };
