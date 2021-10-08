module.exports = {
  headers: [
    {
      label: '제품명',
      key: 'product_name',
      path: 'OpenQuery SE'
    },
    {
      label: '점검일자',
      format: 'yyyy.mm.dd',
      key: 'date',
      path: ''
    },
    {
      label: '라이센스',
      key: 'license',
      path: ''
    },
    {
      label: 'IP',
      key: 'host_ip',
      path: 'ip'
    },
    {
      label: 'OS',
      key: 'os_name',
      path: 'os.name'
    },
    {
      label: '설치위치',
      key: 'home_path',
      path: 'settings.path.home'
    },
    {
      label: '로그위치',
      key: 'logs_path',
      path: 'settings.path.logs'
    }
  ],
  infomations: [
    {
      label: 'Node name',
      key: 'node_name',
      value: 'name'
    },
    {
      label: 'OS Name',
      key: ''
    },
    {
      label: 'CPU LoadAverage',
      key: ''
    },
    {
      label: 'System Memory Used %',
      key: ''
    },
    {
      label: 'Memory Total',
      key: ''
    },
    {
      label: 'Memory Free',
      key: ''
    },
    {
      label: 'Total Space',
      key: ''
    },
    {
      label: 'Free Space',
      key: ''
    },
    {
      label: 'Available Space',
      key: ''
    },
    {
      label: 'ElasticSearch Version',
      key: ''
    },
    {
      label: 'Plugins',
      key: ''
    },
    {
      label: 'JVM Name',
      key: ''
    },
    {
      label: 'JVM Version',
      key: ''
    },
    {
      label: 'GC Collectors',
      key: ''
    },
  ],
  memories: [
    {
      label: 'Heap Size',
      key: 'heap_committed_in_bytes',
      formula: 'jvm.mem.heap_committed_in_bytes / 1024/ 1024/ 1024',
      upperLimits: [30, 32]
    },
    {
      label: 'Heap % of RAM',
      key: '',
      upperLimits: [0.6, 0.75]
    }
  ],
  fileSystems: [
    {
      label: 'Available space',
      key: '',
      upperLimits: [70, 90]
    }
  ],
  networks: [
    {
      label: 'HTTP Connection Rate',
      key: '',
      upperLimits: [5, 30]
    }
  ],
  actions: [
    {
      label: 'Indexing - Index',
      key: '',
      comment: 'High values indicate complex documents or slow I/O or CPU.',
      unit: 'ms',
      format: '0,0.00',
      formula: 'indices.indexing.index_time_in_millis / indices.indexing.index_total',
      formula_keys: 'indices.indexing.index_time_in_millis@@indices.indexing.index_total',
      upperLimits: [10, 50]
    },
    {
      label: 'Search - Query',
      key: '',
      comment: 'High values indicate complex or inefficient queries, insufficient use of filters, insufficient RAM for caching, slow I/O or CPU.',
      unit: 'ms',
      format: '0,0.00',
      formula: 'indices.search.query_time_in_millis / indices.search.query_total',
      formula_keys: 'indices.search.query_time_in_millis@@indices.search.query_total',
      upperLimits: [50, 500]
    }, {
      label: 'Get - Total',
      key: '',
      comment: 'High values indicate slow I/O.',
      unit: 'ms',
      format: '0,0.00',
      formula: 'indices.get.time_in_millis / indices.get.total',
      formula_keys: 'indices.get.time_in_millis@@indices.get.total',
      upperLimits: [5, 10]
    }, {
      label: 'Refresh',
      key: '',
      comment: 'High values indicate slow I/O.',
      unit: 'ms',
      format: '0,0.00',
      formula: 'indices.refresh.total_time_in_millis / indices.refresh.total',
      formula_keys: 'indices.refresh.total_time_in_millis@@indices.refresh.total',
      upperLimits: [10, 20]
    }, {
      label: 'Flush',
      key: '',
      comment: 'High values indicate slow I/O.',
      unit: 'ms',
      format: '0,0.00',
      formula: 'indices.flush.total_time_in_millis / indices.flush.total',
      formula_keys: 'indices.flush.total_time_in_millis@@indices.flush.total',
      upperLimits: [750, 1500]
    }
  ]
}
