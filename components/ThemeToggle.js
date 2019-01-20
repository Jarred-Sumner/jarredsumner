import React, { Component } from "react";
import Switch from "react-switch";
import { PageContext } from "./Page";
import Confetti from "react-dom-confetti";

const ThemeStyles = ({ theme, themes }) => {
  if (theme === "dark") {
    return (
      <style jsx global>{`
        :root {
          --page-background: #222;
          --text-color: #f0f0f0;
          --link-color: #4d89eb;
        }
      `}</style>
    );
  } else if (theme === "light") {
    return (
      <style jsx global>{`
        :root {
          --page-background: #fff;
          --text-color: #000;
          --link-color: #1f3e71;
        }
      `}</style>
    );
  } else {
    return null;
  }
};

class ThemeToggle extends React.Component {
  handleChange = evt => {
    this.props.configure({
      theme: this.props.theme === "dark" ? "light" : "dark"
    });
  };

  render() {
    const {
      children,
      theme,
      configure,
      themes,
      innerRef,
      ...otherProps
    } = this.props;

    return (
      <div ref={innerRef} {...otherProps}>
        <Confetti
          active={this.props.theme === "dark"}
          config={{
            angle: 86,
            spread: 11,
            startVelocity: 17,
            elementCount: 50,
            decay: 0.96
          }}
        />

        <label
          onClick={this.handleChange}
          className="SystemFont"
          htmlFor="theme-switch"
        >
          <Switch
            onChange={this.handleChange}
            checked={this.props.theme === "dark"}
            id="theme-switch"
          />
          <span>{this.props.label}</span>
        </label>
        <style jsx>{`
          div {
            display: block;
          }

          label {
            display: flex;
            align-items: center;
            font-weight: 500;
            cursor: pointer;
          }

          span {
            margin-left: 6px;
          }
        `}</style>
        <ThemeStyles theme={this.props.theme} themes={this.props.themes} />

        {this.props.children}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <PageContext.Consumer>
    {({ configure, theme }) => (
      <ThemeToggle
        {...props}
        innerRef={ref}
        theme={theme}
        configure={configure}
      />
    )}
  </PageContext.Consumer>
));

export const ThemeOnly = ({ children, theme }) => (
  <PageContext.Consumer>
    {({ theme: currentTheme }) => {
      if (currentTheme !== theme) {
        return null;
      } else {
        return children;
      }
    }}
  </PageContext.Consumer>
);

export const DarkmodeOnly = ({ children }) => (
  <ThemeOnly theme="dark">{children}</ThemeOnly>
);
export const LightmodeOnly = ({ children }) => (
  <ThemeOnly theme="light">{children}</ThemeOnly>
);
