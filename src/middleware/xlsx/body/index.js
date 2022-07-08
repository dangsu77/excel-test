const xlsx = require('../utils/xlsx');
const xlsxConfig = require('../config/config');
const { calculateThreshold } = require('../../stats/index');
const { memoryRules, networkRules, actionRules } = require('../../stats/rules');
//================== 2. body (inspection result) ==================//

module.exports = async (worksheet, nodeResult) => {
  // console.log('33333333333', nodeResult);
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // header 스타일 및 컬럼 추가.
  const setHeaderStyled = async (worksheet, name, newRow, align) => {

    xlsx.setHeight(newRow, 26);
    xlsx.setValue(worksheet, `A${newRow.number}`, name);
    xlsx.setRowAlign(worksheet, newRow, align); //정렬
    xlsx.setFill(worksheet, `A${newRow.number}`, 'FFA9A9A9'); //배경색상
    xlsx.setCellFont(worksheet, `A${newRow.number}`, 'Malgun Gothic', 13, 'FFFFFF', true); //폰트설정
    xlsx.mergeCells(worksheet, `A${newRow.number}`, `F${newRow.number}`);
    xlsx.setBorderLine(worksheet, newRow); // border 설정
  };

  // body의 카테고리 행 스타일 추가
  // const setBodyStyled = async (worksheet, key, value, newRow, rowNum, status) => {
  //   if (status === 'DANGER') {
  //     xlsx.setFill(worksheet, `B${rowNum}`, 'f2dede'); //배경색상
  //   } else if (status === 'PASS') {
  //     xlsx.setFill(worksheet, `B${rowNum}`, 'dff0d8'); //배경색상
  //   } else if (status === 'WARN') {
  //     xlsx.setFill(worksheet, `B${rowNum}`, 'fcf8e3'); //배경색상
  //   }

  //   switch (key) {
  //     case '제품명':
  //       xlsx.setHeight(newRow, 20);
  //       xlsx.setValue(worksheet, `A${rowNum}`, key);
  //       xlsx.setFill(worksheet, `A${rowNum}`, 'FFD3D3D3');
  //       xlsx.mergeCells(worksheet, `B${rowNum}`, `C${rowNum}`);
  //       xlsx.setValue(worksheet, `B${rowNum}`, value);

  //       xlsx.setValue(worksheet, `D${rowNum}`, '점검일자');
  //       xlsx.setFill(worksheet, `D${rowNum}`, 'FFD3D3D3');
  //       xlsx.mergeCells(worksheet, `E${rowNum}`, `F${rowNum}`);
  //       xlsx.setValue(worksheet, `E${rowNum}`, new Date());
  //       xlsx.setBorderLine(worksheet, newRow);
  //       xlsx.setRowAlign(worksheet, newRow, 'center');

  //       break;
  //     default:
  //       xlsx.setHeight(newRow, 20);

  //       xlsx.setValue(worksheet, `A${rowNum}`, key);
  //       xlsx.setFill(worksheet, `A${rowNum}`, 'FFD3D3D3');
  //       xlsx.mergeCells(worksheet, `B${rowNum}`, `F${rowNum}`);
  //       xlsx.setValue(worksheet, `B${rowNum}`, value);

  //       xlsx.setBorderLine(worksheet, newRow);
  //       xlsx.setRowAlign(worksheet, newRow, 'left');

  //       break;
  //   }
  // };

  const setBodyStyled = async (worksheet, key, value, align, status) => {
    const newRow = await worksheet.addRow({});
    xlsx.setHeight(newRow, 20);

    if (status === 'DANGER') {
      xlsx.setFill(worksheet, `B${newRow.number}`, 'f2dede'); //배경색상
    } else if (status === 'PASS') {
      xlsx.setFill(worksheet, `B${newRow.number}`, 'dff0d8'); //배경색상
    } else if (status === 'WARN') {
      xlsx.setFill(worksheet, `B${newRow.number}`, 'fcf8e3'); //배경색상
    }

    xlsx.setValue(worksheet, `A${newRow.number}`, key);
    xlsx.setValue(worksheet, `B${newRow.number}`, value);
    xlsx.setValue(worksheet, `D${newRow.number}`, '');
    xlsx.setValue(worksheet, `E${newRow.number}`, '');
    xlsx.setValue(worksheet, `F${newRow.number}`, '');
    xlsx.mergeCells(worksheet, `B${newRow.number}`, `F${newRow.number}`);
    xlsx.setRowAlign(worksheet, newRow, align); //정렬
    xlsx.setBorderLine(worksheet, newRow); // border 설정
  };

  xlsx.addRow(worksheet, {}); //시작 전 빈행 삽입

  let status = '';
  // 바디 설정
  for (let i = 0; i < xlsxConfig.bodyTitles.length; i++) {
    const element = xlsxConfig.bodyTitles[i];
    let newRow = await worksheet.addRow({});
    setHeaderStyled(worksheet, element, newRow, 'center');
    if (element === 'Info') {
      // let osData = { 제품명: nodeResult.os_pretty_name, 라이센스: '1', IP: nodeResult.host_ip, 시스템OS: nodeResult.os_pretty_name, 설치위치: nodeResult.home_path };
      setBodyStyled(worksheet, 'OS Name', nodeResult.info.os_pretty_name, 'left');
      setBodyStyled(worksheet, 'CPU LoadAverage', nodeResult.info.cpu_load_average, 'left');
      setBodyStyled(worksheet, 'System Memory Used %', nodeResult.info.os_mem_used_percent + '%', 'left');
      setBodyStyled(worksheet, 'Memory Total', formatBytes(nodeResult.info.os_mem_total_in_bytes), 'left');
      setBodyStyled(worksheet, 'Memory Free', formatBytes(nodeResult.info.os_mem_free_in_bytes), 'left');
      setBodyStyled(worksheet, 'Avaliable Space', formatBytes(nodeResult.info.available_in_bytes), 'left');
      setBodyStyled(worksheet, 'ElasticSearch Version', nodeResult.info.es_version, 'left');
      nodeResult.info.plugins.forEach(plugin => {
        setBodyStyled(worksheet, 'Plugins', plugin.name, 'left');
      });
      // xlsx.mergeCells(worksheet, `A15`, `A16`);
      setBodyStyled(worksheet, 'JVM Name', nodeResult.info.jvm_vm_name, 'left');
      setBodyStyled(worksheet, 'JVM Version', nodeResult.info.jvm_vm_version, 'left');
      setBodyStyled(worksheet, 'GC Collections', nodeResult.info.gc_collector, 'left');
    } else if (element === 'Memory') {
      // setBodyStyled(worksheet, 'GC Collections(Old/young)', `${nodeResult.memory.jvm_old_collection_count}/${nodeResult.memory.jvm_young_collection_count}`, 'left');
      setBodyStyled(worksheet, 'Heap Used %', nodeResult.memory.heap_used_percent + '%', 'left');
      if (memoryRules[0].label === 'Heap Size') {
        status = calculateThreshold(nodeResult.memory.heap_committed_in_bytes / 1024 / 1024 / 1024, memoryRules[0].upperLimits, '');
        setBodyStyled(worksheet, 'Heap Size', `${formatBytes(nodeResult.memory.heap_committed_in_bytes)}`, 'left', status);
      } else if (memoryRules[0].label === 'Heap % of RAM') {
        status = calculateThreshold((nodeResult.memory.heap_committed_in_bytes / (nodeResult.info.os_mem_used_in_bytes + nodeResult.info.os_mem_free_in_bytes), memoryRules[0].upperLimits[0], memoryRules[0].upperLimits[1]));
        setBodyStyled(worksheet, 'Heap % of RAM', ((nodeResult.memory.heap_committed_in_bytes / (nodeResult.info.os_mem_used_in_bytes + nodeResult.info.os_mem_free_in_bytes)) * 100).toFixed(2) + '%', 'left', status);
      }
      setBodyStyled(worksheet, 'GC Young Generation Freq', nodeResult.memory.gc_young_freq, 'left');
      setBodyStyled(worksheet, 'GC Young Generation Duration', nodeResult.memory.gc_young_duration, 'left');
      // setBodyStyled(worksheet, 'GC Old Generation Freq', nodeResult.memory.gc_old_freq, 'left', status);
      // setBodyStyled(worksheet, 'GC Old Generation Duration', nodeResult.memory.gc_old_duration, 'left', status);
    } else if (element === 'Action') {
      setBodyStyled(worksheet, 'Indexing - index', nodeResult.action.indexing, 'left', actionRules[0].label === 'Indexing - Index' ? calculateThreshold(nodeResult.action.indexing, actionRules[0].upperLimits) : '');
      setBodyStyled(worksheet, 'Search - Query', nodeResult.action.query, 'left', actionRules[0].label === 'Search - Query' ? calculateThreshold(nodeResult.action.query, actionRules[0].upperLimits) : '');
      setBodyStyled(worksheet, 'Get - Total', nodeResult.action.get_total, 'left', actionRules[0].label === 'Get - Total' ? calculateThreshold(nodeResult.action.get_total, actionRules[0].upperLimits) : '');
      setBodyStyled(worksheet, 'Refresh', nodeResult.action.refresh, 'left', actionRules[0].label === 'Refresh' ? calculateThreshold(nodeResult.action.refresh, actionRules[0].upperLimits) : '');
      setBodyStyled(worksheet, 'Flush', nodeResult.action.flush, 'left', actionRules[0].label === 'Flush' ? calculateThreshold(nodeResult.action.flush, actionRules[0].upperLimits) : '');
      // if (fileSystemRules[0].label === 'Available space') {
      //   status = calculateThreshold(parseInt(((nodeResult.total_in_bytes - nodeResult.free_in_bytes) / nodeResult.total_in_bytes * 100).toFixed(0)), fileSystemRules[0].upperLimits);
      // }
    } else if (element === 'Network') {
      if (networkRules[0].label === 'HTTP Connection Rate') {
        status = calculateThreshold(parseInt(nodeResult.network.http), networkRules[0].upperLimits, '');
      }
      setBodyStyled(worksheet, 'HTTP Connection Rate', nodeResult.network.http.toFixed(0), 'left', status);
    }
  }
}