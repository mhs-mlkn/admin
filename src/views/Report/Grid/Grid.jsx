import React, { useState, useRef, useEffect } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../../../assets/css/table-merger.css";
import table_merger from "../../../assets/js/table-merger";
import AutoSuggest from "./AutoSuggest";
import ReportContainer from "../../../containers/Report.container";

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
  },
  input: {
    margin: "auto 8px"
  }
});

const REPORT = {
  id: 0,
  name: "Report-Form-01",
  type: "FORM",
  indexName: "",
  dataSourceId: -1,
  drillDownId: -1,
  query: "query",
  metadata: "",
  params: [],
  filters: [],
  columns: [],
  description: "",
  config: "",
  tags: ""
};

const ReportGrid = props => {
  const { classes } = props;
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const table = useRef({ rows, cols });
  const [step, setStep] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [report, setReport] = useState(REPORT);

  useEffect(() => {
    ReportContainer.getAllSummary().then(suggestions =>
      setSuggestions(suggestions)
    );
  }, []);

  useEffect(() => {
    updateTable();
  }, [rows, cols]);

  const updateTable = () => {
    const tableEl = document.getElementById("report-table-view");
    const rowsEl = tableEl.childNodes[0].childNodes;
    table.current = { rows, cols };
    for (const row of rowsEl) {
      const cols = row.childNodes;
      for (const col of cols) {
        table.current[col.id] = {
          ...table.current[col.id],
          type: "text",
          value: "",
          hidden: col.className.includes("hidden"),
          colSpan: col.colSpan,
          rowSpan: col.rowSpan
        };
      }
    }
  };

  const handleChangeRows = e => {
    const r = +e.target.value;
    setRows(r);
  };

  const handleChangeCols = e => {
    setCols(+e.target.value);
  };

  const handleClickCell = e => {
    const td = document.getElementById(e.target.id);
    if (td.className.split(" ").indexOf("selected") > -1) {
      return (td.className = td.className.replace(/\bselected\b/g, ""));
    }
    return (td.className += " selected");
  };

  const handleClickMerge = () => {
    table_merger("#report-table-view");
    const elems = document.querySelectorAll(".selected");
    for (const el of elems) {
      el.classList.remove("selected");
    }
    updateTable();
  };

  const handleClickNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
    if (step === 2) {
      const r = { ...report, config: JSON.stringify(table.current) };
      setReport(r);
      ReportContainer.save(r).then(() => props.history.push("/reports"));
    }
  };

  const handleClickBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleTypeChange = cell => e => {
    cell.type = e.target.value;
    setRefresh(refresh + 1);
  };

  const handleTextChange = cell => e => {
    cell.value = e.target.value;
    setRefresh(refresh + 1);
  };

  const handleReportChange = cell => ({ id }) => {
    cell.value = id;
    setRefresh(refresh + 1);
  };

  const renderCell = (i, j) => {
    const id = `${i}${j}`;
    const cell = table.current[id];
    switch (step) {
      case 0:
        return id;

      case 1:
        return (
          <TextField
            select
            label="نوع"
            variant="outlined"
            value={cell.type}
            onChange={handleTypeChange(cell)}
            style={{ width: "60%" }}
          >
            <MenuItem value="text">text</MenuItem>
            <MenuItem value="report">report</MenuItem>
          </TextField>
        );

      case 2:
        return renderValue(cell);

      default:
        return id;
    }
  };

  const renderValue = cell => {
    return cell.type === "text" ? (
      <TextField
        label="متن"
        variant="outlined"
        value={cell.value}
        onChange={handleTextChange(cell)}
        style={{ width: "60%" }}
      />
    ) : (
      <AutoSuggest
        label="نام گزارش"
        placeholder="قسمتی از نام گزارش را تایپ کنید"
        suggestions={suggestions}
        onChange={handleReportChange(cell)}
        initialSelectedItem={null}
      />
    );
  };

  const handleChangeReport = prop => e => {
    setReport({ ...report, [prop]: e.target.value });
  };

  return (
    <Grid container style={{ marginTop: 16 }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
            <TextField
              fullWidth
              label="نام"
              variant="outlined"
              value={report.name}
              onChange={handleChangeReport("name")}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
            <TextField
              fullWidth
              label="تگ ها"
              placeholder="جدا سازی با فاصله"
              variant="outlined"
              value={report.tags}
              onChange={handleChangeReport("tags")}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              fullWidth
              multiline
              label="توضیحات"
              variant="outlined"
              value={report.description}
              onChange={handleChangeReport("description")}
              className={classes.input}
            />
            <hr />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ marginTop: 8 }}
      >
        <TextField
          type="number"
          label="افزودن ردیف"
          variant="outlined"
          value={rows}
          onChange={handleChangeRows}
          inputProps={{ min: 1 }}
          className={classes.input}
        />
        <TextField
          type="number"
          label="افزودن ستون"
          variant="outlined"
          value={cols}
          onChange={handleChangeCols}
          inputProps={{ min: 1 }}
          className={classes.input}
        />
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClickMerge}
          style={{ position: "absolute", left: 13 }}
        >
          Merge
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickBack}
          style={{ position: "absolute", left: 100 }}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickNext}
          style={{ position: "absolute", left: 180 }}
        >
          {step < 2 ? "Next" : "Save"}
        </Button>
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
              <table
                className={classes.table}
                style={{ direction: "rtl" }}
                id="report-table-view"
              >
                <tbody>
                  {Array(rows)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        {Array(cols)
                          .fill(0)
                          .map((_, j) => (
                            <td
                              key={j}
                              id={`${i}${j}`}
                              onClick={step === 0 ? handleClickCell : undefined}
                              className={classes.cell}
                            >
                              {renderCell(i, j)}
                            </td>
                          ))}
                      </tr>
                    ))}
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
