const xlsx = require('../utils/xlsx');

//================== 1. header ==================//
// header 스타일 및 컬럼 추가.
const headerStyled = async (worksheet, key, value, newRow, rowNum) => {
  switch (key) {
    case '제품명':
      xlsx.setHeight(newRow, 26);
      xlsx.setValue(worksheet, `A${rowNum}`, key);
      xlsx.setFill(worksheet, `A${rowNum}`, 'FFD3D3D3');
      xlsx.mergeCells(worksheet, `B${rowNum}`, `C${rowNum}`);
      xlsx.setValue(worksheet, `B${rowNum}`, value);

      xlsx.setValue(worksheet, `D${rowNum}`, '점검일자');
      xlsx.setFill(worksheet, `D${rowNum}`, 'FFD3D3D3');
      xlsx.mergeCells(worksheet, `E${rowNum}`, `F${rowNum}`);
      xlsx.setValue(worksheet, `E${rowNum}`, new Date());
      xlsx.setBorderLine(worksheet, newRow);
      xlsx.setRowAlign(worksheet, newRow, 'center');

      break;
    default:
      xlsx.setHeight(newRow, 26);

      xlsx.setValue(worksheet, `A${rowNum}`, key);
      xlsx.setFill(worksheet, `A${rowNum}`, 'FFD3D3D3');
      xlsx.mergeCells(worksheet, `B${rowNum}`, `F${rowNum}`);
      xlsx.setValue(worksheet, `B${rowNum}`, value);

      xlsx.setBorderLine(worksheet, newRow);
      xlsx.setRowAlign(worksheet, newRow, 'left');

      break;
  }
};

module.exports = async (worksheet, nodeResult) => {
  try {
    // '점검확인서' 타이틀 추가.
    xlsx.mergeCells(worksheet, 'A1', 'F1');

    xlsx.setValue(worksheet, 'A1', '점 검 확 인 서');
    xlsx.setHeight(worksheet.getRow(1), 50);
    xlsx.setCellFont(worksheet, 'A1', 'Malgun Gothic', 48, 'black', true); //폰트설정
    xlsx.setRowAlign(worksheet, worksheet.getRow(1), 'center'); //정렬.

    let headerResult = {
      제품명: nodeResult.header.product_name,
      라이센스: '??????',
      IP: nodeResult.header.host_ip,
      시스템OS: nodeResult.info.os_name,
      설치위치: nodeResult.header.home_path,
      로그위치: nodeResult.header.logs_path
    };

    // header 정보를 엑셀 행에 추가.
    for (key of Object.keys(headerResult)) {
      let newRow = await worksheet.addRow({});
      await headerStyled(worksheet, key, headerResult[key], newRow, newRow.number);
    }
  } catch (error) {
    console.error(error);
  }
};