export const data = [
  ["Cupcake", 305, 3.7],
  ["Donut", 452, 25.0],
  ["Eclair", 262, 16.0],
  ["Frozen yoghurt", 159, 6.0],
  ["Gingerbread", 356, 16.0],
  ["Honeycomb", 408, 3.2],
  ["Ice cream sandwich", 237, 9.0],
  ["Jelly Bean", 375, 0.0],
  ["KitKat", 518, 26.0],
  ["Lollipop", 392, 0.2],
  ["Marshmallow", 318, 0],
  ["Nougat", 360, 19.0],
  ["Oreo", 437, 18.0]
];

const mockdata = (page, rowsPerPage) => {
  return Promise.resolve(
    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  );
};

export default mockdata;
