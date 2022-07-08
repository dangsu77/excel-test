// Requiring the module
// const { getExcelResult } = require('./middleware/xlsx');
const statsService = require('./middleware/stats/statsService');

const main = async () => {
  const nodeResult = await statsService.getNodeResult();
  console.log(nodeResult);
  // getExcelResult();
  // const localDate = convertUTCDateToLocalDate(new Date('2021-09-10T05:40:27.125Z'));  // ISO-8601 formatted date returned from server
  // console.log(localDate);
  // const statsService = new StatsService();
  // const esStats = await statsService.getInfoForElasticsearch();
  // let memory = memories.find(memory => memory.key === 'heap_committed_in_bytes');
  // console.log(memory.label);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

