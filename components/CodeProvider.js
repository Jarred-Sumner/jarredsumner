import React from "react";
import CodeContext, { VISIBILITY } from "./CodeContext";

export default class CodeProvider extends React.Component {
  state = {
    visibility: VISIBILITY.hidden,
    code: "",
    selectedId: null
  };

  setPreview = ({ element, code, selectedId }) => {
    if (typeof element !== "undefined") {
      this.element = element;
    }
    this.setState({
      code,
      selectedId,
      visibility: VISIBILITY.preview
    });
  };

  setShow = ({ element, code, selectedId }) => {
    if (typeof element !== "undefined") {
      this.element = element;
    }

    this.setState({
      code,
      selectedId,
      visibility: VISIBILITY.show
    });
  };

  setElement = ({ element }) => {
    this.element = element;
  };

  hide = () => {
    this.setState({ visibility: VISIBILITY.hidden, selectedId: null });
  };

  render() {
    return (
      <React.Fragment>
        <CodeContext.Provider
          value={{
            code: this.state.code,
            visibility: this.state.visibility,
            setElement: this.setElement,
            setPreview: this.setPreview,
            selectedId: this.state.selectedId,

            setShow: this.setShow,
            hide: this.hide
          }}
        >
          {this.props.children}
        </CodeContext.Provider>

        <style jsx global>{`
          .CodeInspectable {
            position: relative;
          }

          .CodeInspectable--preview {
            cursor: pointer;
            user-select: none;
          }

          .CodeInspectable--selected:after,
          .CodeInspectable--preview:after {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
            content: "";
            display: block;
            margin: -8px;
            padding: 8px;
            border: 1px solid var(--link-color);
            border-radius: 2px;
          }

          .CodeInspectable--preview > * {
            pointer-events: none;
          }

          .CodeInspectable--preview:after {
            opacity: 0.5;
          }

          .CodeInspectable--selected:after {
            opacity: 1;
          }

          .CodeInspectable--preview:after {
            background-color: var(--link-color);
          }
        `}</style>
      </React.Fragment>
    );
  }
}
