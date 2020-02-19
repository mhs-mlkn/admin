import React from "react";
import Elastic from "./Elastic";
import File from "./File";
import OData from "./OData";
import Sql from "./Sql";

const Edit = props => {
  const { params } = props.match;

  const redirect = () => {
    props.history.push(`/resources`);
  };

  if (params.type === "elastic") {
    return <Elastic onSubmit={redirect} />;
  } else if (params.type === "file") {
    return <File onSubmit={redirect} />;
  } else if (params.type === "odata") {
    return <OData onSubmit={redirect} />;
  } else if (params.type === "sql") {
    return <Sql onSubmit={redirect} />;
  }

  return null;
};

export default Edit;
