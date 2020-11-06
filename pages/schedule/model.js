export const columnsModel = [
  {
    title: 'День тижня',
    width: '140px',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Урок',
    width: '110px',
    dataIndex: 'lessons',
    key: 'lessons',
    fixed: 'left'
  },
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => ({
    title: `${i} клас`,
    children: [
      {
        title: `${i}-А`,
        width: 220,
        dataIndex: `${i}а`,
        key: `${i}а`,
        ellipsis: {
          showTitle: false
        }
      },
      {
        title: `${i}-Б`,
        width: 220,
        dataIndex: `${i}б`,
        key: `${i}б`,
        ellipsis: {
          showTitle: false
        }
      },
      {
        title: `${i}-В`,
        width: 220,
        dataIndex: `${i}в`,
        key: `${i}в`,
        ellipsis: {
          showTitle: false
        }
      }
    ]
  }))
];

export default columnsModel;
