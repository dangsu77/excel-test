module.exports = {
  columnsSetting: [
    { header: "세부 항목", key: "name", width: 28 },
    { header: "명령어", key: "command", width: 20 },
    { header: "출력 내용", key: "response", width: 30 },
    { header: "CHECK POINT", key: "checkPoint", width: 20 },
    { header: "점검 결과", key: "result", width: 10 },
    { header: "점검 내용", key: "opinion", width: 10 },
  ],
  bodyTitles: [
    "Info",
    "Memory",
    "Action",
    "Network"
  ],
  footerConfig: [
    {
      title: "특이사항",
      bgColor: "FFD3D3D3",
      rowCount: "2",
      mergeCells: "A:F",
      height: 20
    },
    {
      title: "고객의견",
      bgColor: "FFD3D3D3",
      rowCount: "2",
      mergeCells: "A:F",
      height: 20
    },
    {
      title:
        "위와 같은 시스템 정밀점검을 실시하였음을 확인 합니다.  \n\n     년     월      일",
      bgColor: "FFFFFFFF",
      rowCount: "1",
      mergeCells: "A:F",
      height: 50
    },
    {
      title: "고객사 담당자:       (인)",
      bgColor: "FFFFFFFF",
      rowCount: "1",
      mergeCells: "A:D",
      height: 40,
      subColumn: {
        title: "점검자 :      (인)",
        bgColor: "FFFFFFFF",
        rowCount: "1",
        mergeCells: "E:F",
      },
    },
  ],
};
