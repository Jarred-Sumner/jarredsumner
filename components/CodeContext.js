import React from "react";

export const VISIBILITY = {
  hidden: "hidden",
  preview: "preview",
  show: "show"
};

export const CodeContext = React.createContext({
  element: null,
  visibility: VISIBILITY.hidden,
  selectedId: null,
  code: "",
  setElement: () => {},
  setPreview: () => {},
  setShow: () => {},
  hide: () => {}
});

export default CodeContext;
