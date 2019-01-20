import React from "react";
import CodeContext, { VISIBILITY } from "./CodeContext";
import classNames from "classnames";
import { Highlight } from "react-fast-highlight";

const Title = ({ children }) => (
  <span className="Title SystemFont">
    {children}

    <style jsx>{`
      .Title {
        font-size: 1.5em;
        line-height: 1.5;
        font-weight: 500;
      }
    `}</style>
  </span>
);

const Button = ({ children, onClick }) => {
  return (
    <span className="Button SystemFont" onClick={onClick}>
      {children}

      <style jsx>{`
        .Button {
          font-weight: 600;
          color: var(--page-background);
          font-size: 14px;
          cursor: pointer;
        }

        .Button:hover {
          font-weight: 700;
        }
      `}</style>
    </span>
  );
};

class PostInspector extends React.Component {
  state = { showCode: true };
  handleToggleCode = () => this.setState({ showCode: !this.state.showCode });

  render() {
    const { isSelected, hide, code, visibility } = this.props;
    const { showCode } = this.state;

    if (!isSelected) {
      return null;
    }

    return (
      <span
        className={classNames("PostInspector ", {
          "PostInspector--show": visibility === VISIBILITY.show,
          "PostInspector--preview": visibility === VISIBILITY.preview
        })}
      >
        <span className="Toolbar-container">
          <span className="Toolbar">
            <Button onClick={this.handleToggleCode}>
              {showCode ? "Hide source" : "View source"}
            </Button>
          </span>
          <Button onClick={close}>Close</Button>
        </span>
        {showCode && (
          <span className="Code">
            <Highlight className="CodeBox" languages={["js", "md"]}>
              {code}
            </Highlight>
          </span>
        )}

        <style jsx>{`
          .PostInspector {
            box-sizing: border-box;
            width: calc(100% + 16px);
            position: relative;
            bottom: -8px;
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
            z-index: 10;
            left: -8px;
            display: block;
          }

          .Code {
            display: block;
          }

          .Toolbar-container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: var(--link-color);
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 4px;
            padding-bottom: 4px;
          }

          .Toolbar {
            display: grid;
            grid-template-columns: repeat(3, auto);
            grid-template-rows: 1fr;
            grid-auto-flow: column;
            width: 100%;
            grid-column-gap: 8px;
          }

          .Code {
            width: 100%;
            padding: 8px;
          }

          .Code > :global(.CodeBox) {
            white-space: pre-wrap;
          }
        `}</style>
      </span>
    );
  }
}

export default props => (
  <CodeContext.Consumer>
    {({ element, code, visibility, hide }) => (
      <PostInspector
        {...props}
        element={element}
        code={code}
        visibility={visibility}
        hide={hide}
      />
    )}
  </CodeContext.Consumer>
);
