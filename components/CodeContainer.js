import React from "react";
import classNames from "classnames";
import { Highlight } from "react-fast-highlight";
import CodeContext, { VISIBILITY } from "./CodeContext";
import generateShortId from "shortid";
import PostInspector from "./PostInspector";
import _ from "lodash";

class CodeContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.shortId = generateShortId();
  }

  setRef = ref => (this.ref = ref);

  handleMouseOver = evt => {
    if (
      evt.altKey &&
      this.shortId !== this.props.selectedId &&
      this.props.visibility !== VISIBILITY.show
    ) {
      this.props.setPreview({
        selectedId: this.shortId,
        element: this.ref,
        code: this.props.code
      });
    }
  };

  handleHide = evt => {
    if (!evt.altKey && this.props.visibility === VISIBILITY.preview) {
      // this.props.hide();
    }
  };

  handleClick = evt => {
    if (
      !evt.altKey ||
      this.props.visibility !== VISIBILITY.preview ||
      this.shortId !== this.props.selectedId
    ) {
      return;
    }

    evt.preventDefault();
    evt.nativeEvent.stopImmediatePropagation();
    evt.nativeEvent.stopPropagation();

    this.showCode();
  };

  showCode = () => {
    this.props.setShow({
      element: this.ref,
      code: this.props.code,
      selectedId: this.shortId
    });
  };

  render() {
    const { children, tagName, className, visibility, selectedId } = this.props;

    const isPreview =
      visibility === VISIBILITY.preview && selectedId === this.shortId;
    const isSelected =
      visibility === VISIBILITY.show && selectedId === this.shortId;

    let element;

    if (tagName) {
      element = React.createElement(
        tagName,
        {
          ref: this.setRef,
          onMouseOver: this.handleMouseOver,
          className: classNames("CodeInspectable", className, {
            "CodeInspectable--preview": isPreview,
            "CodeInspectable--selected": isSelected
          }),
          onClick: this.handleClick,
          showCode: this.showCode,
          onMouseOut: this.handleMouseOut
        },
        [children, <PostInspector isSelected={isSelected} />]
      );
    } else {
      element = React.Children.map(children, child => {
        return React.cloneElement(
          child,
          {
            ...child.props,
            ref: this.setRef,
            onMouseOver: this.handleMouseOver,
            showCode: this.showCode,
            className: classNames(
              "CodeInspectable",
              className,
              child.props.className,
              {
                "CodeInspectable--preview": isPreview,
                "CodeInspectable--selected": isSelected
              }
            ),
            onClick: this.handleClick,
            onMouseOut: this.handleMouseOut
          },
          [child.props.children, <PostInspector isSelected={isSelected} />]
        );
      });
    }

    return element;
  }
}

const CodeContainerWrapper = props => (
  <CodeContext.Consumer>
    {({
      setPreview,
      selectedElement,
      setShow,
      visibility,
      hide,
      selectedId
    }) => (
      <CodeContainer
        {...props}
        setPreview={setPreview}
        selectedElement={selectedElement}
        selectedId={selectedId}
        visibility={visibility}
        setShow={setShow}
        hide={hide}
      />
    )}
  </CodeContext.Consumer>
);

export const ParagraphTag = props => (
  <CodeContainerWrapper {...props} tagName="p" />
);

export default CodeContainerWrapper;
