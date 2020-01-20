import React, { useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import UpIcon from "@material-ui/icons/ExpandLess";
// import DownIcon from "@material-ui/icons/ExpandMore";
// import LeftIcon from "@material-ui/icons/ChevronLeft";
// import RightIcon from "@material-ui/icons/ChevronRight";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useEffect } from "react";

const ReactGridLayout = WidthProvider(GridLayout);

const styles = theme => ({
  root: {
    height: "100%",
    padding: 8
  },
  table: { width: "100%", height: "100%" },
  cell: {
    border: "0.5px dashed",
    textAlign: "center"
  }
});

const CELL = { colSpan: 1, rowSpan: 1 };

const ReportGrid = props => {
  const { classes } = props;
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [table, setTable] = useState([]);
  const [selected, setSelected] = useState({ cell: null, i: -1, j: -1 });

  useEffect(() => {
    console.log(table);
  }, [table]);

  useEffect(() => {
    const r = Array(cols).fill({ ...CELL });
    setTable([...Array(rows).fill([...r])]);
  }, [rows, cols]);

  const handleChangeRows = e => {
    const r = +e.target.value;
    setRows(r);
  };

  const handleChangeCols = e => {
    setCols(+e.target.value);
  };

  const handleClickCell = (cell, i, j) => e => {
    if (i === selected.i && j === selected.j) {
      return setSelected({ cell: null, i: -1, j: -1 });
    }
    setSelected({ cell, i, j });
  };

  const handleChangeColSpan = e => {
    const value = +e.target.value;
    const { cell, i, j } = selected;
    if (value > cell.colSpan) {
      const newRow = table[i].map((c, jj) =>
        j === jj ? { ...c, colSpan: value } : c
      );
      setSelected({ cell: { ...cell, colSpan: value }, i, j });
      newRow.splice(j + 1, value - cell.colSpan);

      setTable(
        table.map((r, rIndex) => {
          if (rIndex === i) {
            return newRow;
          }
          return r;
        })
      );
    }
  };

  const handleChangeRowSpan = e => {
    const value = +e.target.value;
    const { cell, i, j } = selected;
    if (value > cell.rowSpan) {
      const newRow = table[i].map((c, jj) =>
        j === jj ? { ...c, colSpan: value } : c
      );
      setSelected({ cell: { ...cell, colSpan: value }, i, j });
      newRow.splice(j + 1, value - cell.colSpan);

      setTable(
        table.map((r, rIndex) => {
          if (rIndex === i) {
            return newRow;
          }
          return r;
        })
      );
    }
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          type="number"
          label="افزودن ردیف"
          variant="outlined"
          value={rows}
          onChange={handleChangeRows}
          inputProps={{ min: 1 }}
        />
        <TextField
          type="number"
          label="افزودن ستون"
          variant="outlined"
          value={cols}
          onChange={handleChangeCols}
          inputProps={{ min: 1 }}
        />
        {!!selected.cell && (
          <>
            <TextField
              type="number"
              label="colSpan"
              variant="outlined"
              value={selected.cell.colSpan}
              onChange={handleChangeColSpan}
              inputProps={{ min: 1, max: cols - selected.j }}
            />
            <TextField
              type="number"
              label="rowSpan"
              variant="outlined"
              value={selected.cell.rowSpan}
              onChange={handleChangeRowSpan}
              inputProps={{ min: 1, max: rows - selected.i }}
            />
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ReactGridLayout
          cols={12}
          rowHeight={40}
          isDraggable={false}
          style={{ direction: "ltr" }}
        >
          <div key="a" data-grid={{ x: 0, y: 0, w: 4, h: 6 }}>
            <Paper elevation={1} className={classes.root}>
              <table className={classes.table} style={{ direction: "rtl" }}>
                <tbody>
                  {table.map((row, i) => {
                    return (
                      <tr key={i}>
                        {row.map((cell, j) => {
                          return (
                            <td
                              key={j}
                              className={classes.cell}
                              id={`${i}${j}`}
                              colSpan={cell.colSpan}
                              rowSpan={cell.rowSpan}
                              onClick={handleClickCell(cell, i, j)}
                            >
                              {`i= ${i}, j= ${j}`}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Paper>
          </div>
        </ReactGridLayout>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ReportGrid);
