import React, { useEffect, useState } from "react";
import get from "lodash/get";
import ReactHtmlParser from "react-html-parser";
import Page from "../../../components/Page/Page";
import ReportContainer from "../../../containers/Report.container";

let content = "";

const REPORT = {
  id: 0,
  name: "",
  tags: "",
  description: "",
  type: "FORM",
  drillDownId: -1,
  config: "",
  children: {}
};

const Preview = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState({ ...REPORT });
  const [count, update] = useState(0);

  useEffect(() => {
    setLoading(true);
    const { id: reportId } = props.match.params;
    if (reportId) {
      ReportContainer.get(reportId)
        .then(report => {
          if (!report || report.type !== "FORM") {
            return props.history.replace("/reports");
          }
          setReport(report);
        })
        .catch(() => setError("خطای برقراری ارتباط با سرور"))
        .finally(() => setLoading(false));
    } else {
      props.history.replace("/reports");
    }
  }, []);

  useEffect(() => {
    content = report.config;
    for (const key in report.children) {
      if (report.children.hasOwnProperty(key)) {
        const reportId = report.children[key];
        execReport(key, reportId);
      }
    }
  }, [report]);

  const execReport = (key, reportId) => {
    ReportContainer.reportData(reportId).then(reportData => {
      const value = get(reportData, "rows[0].cols[0]", "");
      const reg = new RegExp(`\\{${key}\\}`, "g");
      content = content.replace(reg, value);
      update(count + 1);
    });
  };

  return (
    <Page error={error} loading={loading}>
      <div style={{ direction: "ltr" }}>{ReactHtmlParser(content)}</div>
    </Page>
  );
};

export default Preview;
