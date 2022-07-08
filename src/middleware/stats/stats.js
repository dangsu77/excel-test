// Requiring the module
const { stats } = require('../esclient');
const { headers, infomations, memories, networks, actions } = require('./rules');

const getNodeStats = async () => {
  const nodeStats = await stats.nodes.stats({
    metric: 'fs,jvm,os,process,indices,http'
  });

  const nodeIds = Object.keys(nodeStats.nodes);

  // nodes info api 에 설치 위치 확인가능
  const nodeInfo = await stats.nodes.info({});

  const nodeResults = [];

  if (nodeIds.length > 0) {
    nodeIds.forEach((nodeId, index) => {
      const nodeResult = {
        header: {
          product_name: '',
          node_name: '',
          home_path: '',

        },
        info: {},
        memory: {
          heap_used_percent: '',
          heap_committed_in_bytes: '',
        },
        action: {},
        network: {}
      };
      // // header
      nodeResult.header.product_name = 'OpenQuery SE';
      nodeResult.header.node_name = nodeInfo.nodes[nodeId].name;
      nodeResult.header.home_path = nodeInfo.nodes[nodeId].settings.path.home;
      nodeResult.header.logs_path = nodeInfo.nodes[nodeId].settings.path.logs;
      nodeResult.header.host_ip = nodeInfo.nodes[nodeId].ip;
      // info
      nodeResult.info.os_pretty_name = nodeInfo.nodes[nodeId].os.pretty_name;
      nodeResult.info.os_name = nodeInfo.nodes[nodeId].os.name;
      nodeResult.info.os_mem_total_in_bytes = nodeStats.nodes[nodeId].os.mem.total_in_bytes;
      nodeResult.info.os_mem_used_percent = nodeStats.nodes[nodeId].os.mem.used_percent;
      nodeResult.info.os_mem_free_in_bytes = nodeStats.nodes[nodeId].os.mem.free_in_bytes;
      nodeResult.info.os_mem_used_in_bytes = nodeStats.nodes[nodeId].os.mem.used_in_bytes;
      nodeResult.info.total_in_bytes = nodeStats.nodes[nodeId].fs.total.total_in_bytes;
      nodeResult.info.free_in_bytes = nodeStats.nodes[nodeId].fs.total.free_in_bytes;
      nodeResult.info.available_in_bytes = nodeStats.nodes[nodeId].fs.total.available_in_bytes;
      nodeResult.info.jvm_vm_name = nodeInfo.nodes[nodeId].jvm.vm_name
      nodeResult.info.jvm_vm_version = nodeInfo.nodes[nodeId].jvm.vm_version;
      nodeResult.info.gc_collector = nodeInfo.nodes[nodeId].jvm.gc_collectors;
      nodeResult.info.cpu_load_average = nodeStats.nodes[nodeId].os.cpu.load_average;
      nodeResult.info.es_version = nodeInfo.nodes[nodeId].version;
      nodeResult.info.plugins = nodeInfo.nodes[nodeId].plugins;
      // Memroy
      nodeResult.memory.heap_max_in_bytes = nodeStats.nodes[nodeId].jvm.mem.heap_max_in_bytes;
      nodeResult.memory.heap_used_percent.label = memories.label;
      nodeResult.memory.heap_used_percent.formula = memories.label;;
      nodeResult.memory.heap_used_percent.value = nodeStats.nodes[nodeId].jvm.mem.heap_used_percent;
      nodeResult.memory.heap_used_in_bytes = nodeStats.nodes[nodeId].jvm.mem.heap_used_in_bytes;
      nodeResult.memory.heap_committed_in_bytes.label = memories.label;
      nodeResult.memory.heap_committed_in_bytes.formula = memories.formula;
      nodeResult.memory.heap_committed_in_bytes.value = nodeStats.nodes[nodeId].jvm.mem.heap_committed_in_bytes / 1024 / 1024 / 1024;
      nodeResult.memory.heap_committed_in_bytes.status = calculateThreshold(nodeStats.nodes[nodeId].jvm.mem.heap_committed_in_bytes / 1024 / 1024 / 1024, memories.upperLimit);
      nodeResult.memory.gc_young_freq = nodeStats.nodes[nodeId].jvm.uptime_in_millis / nodeStats.nodes[nodeId].jvm.gc.collectors.young.collection_count / 1000;
      nodeResult.memory.gc_young_duration = nodeStats.nodes[nodeId].jvm.gc.collectors.young.collection_time_in_millis / nodeStats.nodes[nodeId].jvm.gc.collectors.young.collection_count;
      nodeResult.memory.gc_old_freq = nodeStats.nodes[nodeId].jvm.uptime_in_millis / nodeStats.nodes[nodeId].jvm.gc.collectors.old.collection_count / 1000;
      nodeResult.memory.gc_old_duration = nodeStats.nodes[nodeId].jvm.gc.collectors.old.collection_time_in_millis / nodeStats.nodes[nodeId].jvm.gc.collectors.old.collection_count;
      // // Action
      nodeResult.action.indexing = nodeStats.nodes[nodeId].indices.indexing.index_time_in_millis / nodeStats.nodes[nodeId].indices.indexing.index_total;
      nodeResult.action.query = nodeStats.nodes[nodeId].indices.search.query_time_in_millis / nodeStats.nodes[nodeId].indices.search.query_total;
      nodeResult.action.get_total = nodeStats.nodes[nodeId].indices.get.time_in_millis / nodeStats.nodes[nodeId].indices.get.total;
      nodeResult.action.refresh = nodeStats.nodes[nodeId].indices.refresh.total_time_in_millis / nodeStats.nodes[nodeId].indices.refresh.total
      nodeResult.action.flush = nodeStats.nodes[nodeId].indices.flush.total_time_in_millis / nodeStats.nodes[nodeId].indices.flush.total;
      // // Network
      nodeResult.network.http = nodeStats.nodes[nodeId].http.total_opened / nodeStats.nodes[nodeId].jvm.uptime_in_millis * 1000;
      nodeResults.push(nodeResult);

    })
  };
  return nodeResults;
}

const calculateThreshold = (value, upperLimit, lowerLimit) => {
  // console.log(value, upperLimit);
  if (upperLimit) {
    if (value <= upperLimit[0]) {
      return 'PASS';
    } else if (value <= upperLimit[1]) {
      return 'WARN';
    } else {
      return 'DANGER';
    }
  }

  if (lowerLimit) {
    if (lowerLimit.length === 3 && value === 0) {
      return 'PASS';
    } else if (value >= lowerLimit[0]) {
      return 'PASS';
    } else if (value >= lowerLimit[1]) {
      return 'WARN';
    } else {
      return 'DANGER';
    }
  }
}

module.exports = {
  getNodeStats: getNodeStats,
  calculateThreshold: calculateThreshold
};
