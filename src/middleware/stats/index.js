// Requiring the module
const { stats } = require('../esclient');
const { headers, infomations, memories, networks, actions } = require('./rules');

const getNodeStats = async () => {
  const nodeStats = await stats.nodes.stats({});

  // nodes info api 에 설치 위치 확인가능
  const nodeInfo = await stats.nodes.info({});

  const nodeIds = Object.keys(nodeStats.nodes);
  const nodeResults = [];
  // console.log(nodeStats.nodes['gq4ppVfQQ9SgT-2PID_ZdA']);

  if (nodeIds.length > 0) {
    nodeIds.forEach((nodeId) => {
      const nodeResult = {
        header: {
          product_name: '',
          node_name: '',
          home_path: ''
        },
        info: {},
        memory: {
          heap_committed_in_bytes: {}
        },
        action: {},
        network: {}
      };

      let { settings, os: os_info, jvm: jvm_info, version, plugins } = nodeInfo.nodes[nodeId];
      let { name, ip, fs, jvm, os, indices, http } = nodeStats.nodes[nodeId];

      // header
      nodeResult.header.product_name = 'OpenQuery SE';
      nodeResult.header.node_name = name;
      nodeResult.header.home_path = nodeInfo.nodes[nodeId].settings.path.home;
      nodeResult.header.logs_path = settings.path.logs;
      nodeResult.header.host_ip = ip;
      // info
      nodeResult.info.os_pretty_name = os_info.pretty_name;
      nodeResult.info.os_name = os_info.name;
      nodeResult.info.os_mem_total_in_bytes = os.mem.total_in_bytes;
      nodeResult.info.os_mem_used_percent = os.mem.used_percent;
      nodeResult.info.os_mem_free_in_bytes = os.mem.free_in_bytes;
      nodeResult.info.os_mem_used_in_bytes = os.mem.used_in_bytes;
      nodeResult.info.total_in_bytes = fs.total.total_in_bytes;
      nodeResult.info.free_in_bytes = fs.total.free_in_bytes;
      nodeResult.info.available_in_bytes = fs.total.available_in_bytes;
      nodeResult.info.jvm_vm_name = jvm_info.vm_name
      nodeResult.info.jvm_vm_version = jvm_info.vm_version;
      nodeResult.info.gc_collector = jvm_info.gc_collectors;
      nodeResult.info.cpu_load_average = os.cpu.load_average;
      nodeResult.info.es_version = version;
      nodeResult.info.plugins = plugins;
      // // Memroy
      nodeResult.memory.heap_max_in_bytes = jvm.mem.heap_max_in_bytes;
      nodeResult.memory.heap_used_percent = jvm.mem.heap_used_percent;
      nodeResult.memory.heap_used_in_bytes = jvm.mem.heap_used_in_bytes;
      nodeResult.memory.heap_committed_in_bytes.label = getData(memories, 'heap_committed_in_bytes', 'label');
      // nodeResult.memory.heap_committed_in_bytes.formula = memories[label] === 'Heap Size' ? memories.formula : '';
      nodeResult.memory.heap_committed_in_bytes.value = jvm.mem.heap_committed_in_bytes / 1024 / 1024 / 1024;
      nodeResult.memory.heap_committed_in_bytes.status = calculateThreshold(nodeResult.memory.heap_committed_in_bytes.value, getData(memories, 'heap_committed_in_bytes', 'upperLimits'));
      nodeResult.memory.gc_young_freq = jvm.uptime_in_millis / jvm.gc.collectors.young.collection_count / 1000;
      nodeResult.memory.gc_young_duration = jvm.gc.collectors.young.collection_time_in_millis / jvm.gc.collectors.young.collection_count;
      nodeResult.memory.gc_old_freq = jvm.uptime_in_millis / jvm.gc.collectors.old.collection_count / 1000;
      nodeResult.memory.gc_old_duration = jvm.gc.collectors.old.collection_time_in_millis / jvm.gc.collectors.old.collection_count;
      // Action
      nodeResult.action.indexing = indices.indexing.index_time_in_millis / indices.indexing.index_total;
      nodeResult.action.query = indices.search.query_time_in_millis / indices.search.query_total;
      nodeResult.action.get_total = indices.get.time_in_millis / indices.get.total;
      nodeResult.action.refresh = indices.refresh.total_time_in_millis / indices.refresh.total
      nodeResult.action.flush = indices.flush.total_time_in_millis / indices.flush.total;
      // Network
      nodeResult.network.http = http.total_opened / jvm.uptime_in_millis * 1000;
      console.log('================', nodeResult);
      nodeResults.push(nodeResult);

    })
  };
  return nodeResults;
}

const getData = (rules, key, format) => {
  let element = rules.find(element => element.key === key);
  return element[format];
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