import React from "react";
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
  const { onChange } = props;

  return (
    <div style={{ direction: "ltr" }}>
      <SunEditor
        setOptions={{ buttonList, imageFileInput: false }}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
