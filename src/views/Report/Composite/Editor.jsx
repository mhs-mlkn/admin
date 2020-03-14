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
  const { content, children, onChange } = props;

  const handleChange = content => {
    let params = content.match(/{\w+}/g) || [];
    const updatedChildren = params.reduce((res, p) => {
      const key = p.slice(1, -1);
      const reportId = get(children, key, 0);
      return { ...res, [key]: reportId };
    }, {});
    onChange(content, updatedChildren);
  };

  return (
    <div style={{ direction: "ltr" }}>
      <SunEditor
        setOptions={{ buttonList, imageFileInput: false }}
        setContents={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
