import fs from 'fs';
import _ from 'lodash';

const logPath = `${__dirname}/../log`;
const insertLogData = (data, logLevel) => {
  const parsedData = _.isObject(data) ? JSON.stringify(data) : data;
  const logData = `[${new Date()}] ${parsedData}\n`;
  fs.appendFile(`${logPath}/${logLevel}.log`, logData, (err) => {
    if (err) {
      fs.writeFileSync(`${logPath}/${logLevel}.log`, logData);
    }
  });
};

export default {
  error: data => insertLogData(data, 'error'),
  info: data => insertLogData(data, 'info'),
  warn: data => insertLogData(data, 'warn'),
};
