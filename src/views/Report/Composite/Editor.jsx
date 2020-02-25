import React from "react";
import get from "lodash/get";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const buttonList = [
  ["undo", "redo"],
  [/* "font", */ "fontSize", "formatBlock"],
  ["paragraphStyle"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["removeFormat"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link" /* , "image", "video" */],
  ["fullScreen", "showBlocks", "codeView"]
  // ["preview", "print"]
  // ['save', 'template'],
  // '/', Line break
];

const Editor = props => {
  const { children, onChange } = props;

  const handleChange = content => {
    let params = content.match(/{\d+}/g) || [];
    const updatedChildren = params.reduce((res, p) => {
      const id = p.slice(1, -1);
      const reportId = get(res, id, 0);
      return { ...res, [id]: reportId };
    }, children);
    onChange(content, updatedChildren);
  };

  return (
    <div style={{ direction: "ltr" }}>
      <SunEditor
        setOptions={{ buttonList, imageFileInput: false }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
