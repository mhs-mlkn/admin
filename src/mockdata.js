export const Table = {
  cols: [
    { type: "VARCHAR", key: "نام" },
    { type: "BIGINT", key: "کالری" },
    { type: "DECIMAL", key: "چربی" }
  ],
  rows: [
    { cols: ["کاپ کیک", 305, 3.7] },
    { cols: ["دونات", 452, 25.0] },
    { cols: ["تیتاپ", 262, 16.0] },
    { cols: ["کیک قاشقی", 159, 6.0] },
    { cols: ["پیراشکی", 356, 16.0] },
    { cols: ["کیک خانگی", 408, 3.2] },
    { cols: ["ژله", 237, 9.0] },
    { cols: ["پنیر پیتزا", 375, 0.0] },
    { cols: ["پفک", 518, 26.0] },
    { cols: ["تخم مرغ", 392, 0.2] },
    { cols: ["خامه", 318, 250] },
    { cols: ["چیپس سیب زمینی", 360, 19.0] },
    { cols: ["سمبوسه", 437, 18.0] },
    { cols: ["سوسیس", 400, 100] },
    { cols: ["شیر", 100, 12.0] }
  ]
};

export const Scalar = {
  cols: [{ type: "VARCHAR", key: "تعداد کاربران" }],
  rows: [{ cols: [1849] }]
};

export const Charts = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2200,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 4800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
