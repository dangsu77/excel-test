const xlsx = require('./utils/xlsx');
const config = require('./config/config');
const approot = require('app-root-path').path;
const moment = require('moment');
const fs = require('fs');
const { getNodeStats } = require('../stats');

const getExcelResult = async () => {
  const nodeResults = await getNodeStats();
  if (nodeResults.constructor === Object && Object.keys(nodeResults).length === 0) {
    return;
  }

  //workbook, worksheet 생성
  let workbook = await xlsx.createWorkbook();

  nodeResults.forEach(nodeResult => {
    // console.log('======', nodeResult);
    // let worksheet = workbook.addWorksheet(node.header.node_name);
    let worksheet = workbook.addWorksheet(nodeResult.header.node_name);
    worksheet.columns = config.columnsSetting; // 컬럼 추가 (필수)

    Promise.resolve()
      .then(() => {
        return require('./header')(worksheet, nodeResult);
      })
      .then(() => {
        return require('./body')(worksheet, nodeResult);
      })
      .then(() => {
        return require('./footer')(worksheet);
      })
      .then(async () => {
        // File save
        const filename = getFileName();
        const directory = `${approot}/output`;

        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }

        await workbook.xlsx.writeFile(`${approot}/output/${filename}.xlsx`);
      })
      .catch((err) => {
        console.log('[ERROR] ', err);
      });
  });
}

const getFileName = () => {
  return `점검확인서-${moment().format("YYYYMMDDhhmmss")}`;
}

module.exports = {
  getExcelResult: getExcelResult
}
