const { stats } = require('../esclient');
// const { t } = require('typy');
const objectPath = require("object-path");

// const { getNodeStats } = require('./stats');

const getNodeStats = async () => {
  return await stats.nodes.stats({});
}

const getNodeInfos = async () => {
  return await stats.nodes.info({});
}

// console.log(nodeStats);
// const nodeIds = Object.keys(nodeStats.nodes);
// nodes info api 에 설치 위치 확인가능
const nodeInfo = getNodeInfos();

const getNodeResult = async () => {
  // 노드별 결과 담는 최종 배열
  const nodeResults = [];

  // 각 노드 데이터
  const nodeResult = {
    header: {},
    info: {},
    memory: {},
    action: {},
    network: {}
  };

  // 1. stats, info , rule 가져오기
  const nodeStats = await stats.nodes.stats({});
  const nodeInfos = await stats.nodes.info({});
  const { headers, infomations, memories, networks, actions } = require('./rules');

  const nodeIds = Object.keys(nodeStats.nodes);

  // 2. 각 점검항목마다 값을 가져와서 nodeResult에 set
  nodeIds.forEach(nodeId => {
    console.log(nodeId);
    // headers.forEach(header => {

    // });

    // infomations.forEach(infomation => {

    // });

    memories.forEach(memory => {
      let node = {
        'label': memory.label,
        'key': objectPath.get(nodeStats.nodes[nodeId], memory.key)
      };

      // nodeResult.memory

      nodeResult.memory.label = memory.label;
      // console.log(objectPath.get(nodeStats.nodes[nodeId], memory.key));
      nodeResult.memory.key = objectPath.get(nodeStats.nodes[nodeId], memory.key);

      // console.log(node);
    });

    // networks.forEach(network => {

    // });

    // actions.forEach(action => {

    // });
    nodeResults.push(nodeResult);
  });


  // let headerResult = {
  //   제품명: nodeResult.header.product_name,
  //   라이센스: '??????',
  //   IP: nodeResult.header.host_ip,
  //   시스템OS: nodeResult.info.os_name,
  //   설치위치: nodeResult.header.home_path,
  //   로그위치: nodeResult.header.logs_path
  // };



  // 3. return nodeResults
  console.log(nodeResults);
  return nodeResults
}

// console.log(nodeResults);

// const getRules()



// const nodeResultSample =
// {
//   header: {
//     product_name: 'OpenQuery SE',
//     node_name: 'xxxx',
//     home_path: '/usr/share/elasticsearch',
//     log_path: '/usr/share/elasticsearch/logs',
//     host_ip: '127.0.0.1'
//   },
//   info: {
//     os_pretty_name: 'linux',
//     plugins: [
//       {
//         name: 'kobrick'
//       },
//       {
//         name: 'autocomplete'
//       }
//     ]
//   },
//   memory: {
//     heap_used_percent: {
//       label: 'Heap Size',
//       status: 'DANGER',
//       formula: 'xxx / xxx / 1024 / 1024 / 1024'
//       value: 90
//   },
//   action: {
//     indexing: '149'
//   },
//   network: {
//     http: '0.0'
//   }
// }

// class StatsService {
//   // nodeResult = {
//   //   header: {},
//   //   info: {},
//   //   memory: {},
//   //   action: {},
//   //   network: {}
//   // };

//   /**
//    * 
//    * @param {*} rules object
//    * @param {*} stats object
//    */
//   constructor(rules, stats) {
//     this.rules = rules;
//     this.stats = stats;
//   }

//   // async getStatsForElasticsearch() {
//   //   const nodeStats = await stats.nodes.stats();
//   //   return nodeStats;
//   // }

//   // async getInfoForElasticsearch() {
//   //   const nodeInfos = await stats.nodes.info();
//   //   return nodeInfos;
//   // }

//   /**
//    * threadhold 처리
//    */
//   getRuleStatus(value) {

//   }

//   getRules() {
//     console.log(this.rules);
//   }

//   /**
//    * 결과를 오브젝트로 리턴
//    */
//   getNodeResult() {

//   }
// }

module.exports = {
  // StatsService: StatsService
  getNodeResult: getNodeResult
}

