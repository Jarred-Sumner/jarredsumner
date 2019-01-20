import React from "react";
import _ from "lodash";
import classNames from "classnames";

const TimelineNode = ({ offset, summary, month, children }) => {
  return (
    <div
      className={classNames("TimelineNode", {
        "TimelineNode--right": offset,
        "TimelineNode--left": !offset
      })}
    >
      <div className="Month">{month}</div>
      <div className="Summary">{summary}</div>

      <style jsx>{`
        .TimelineNode {
          list-style-type: none;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          align-self: flex-start;
          flex: 0;
        }

        .Month {
          font-size: 1em;
          font-weight: 500;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }

        .Summary {
          font-size: 0.75em;
          line-height: 1.5;
        }

        .Month:after,
        .Month:before {
          display: inline-block;
          content: "";
          width: 8px;
          height: 8px;

          border-radius: 50%;
          background-color: var(--link-color);
        }

        .Month:after {
          margin-right: -5px;
          margin-left: 24px;
        }

        .TimelineNode--left .Summary {
          margin-right: 24px;
        }

        .Month:before {
          margin-left: -5px;
          margin-right: 24px;
        }

        .TimelineNode--right .Summary {
          margin-left: 24px;
        }

        .TimelineNode--left .Month:before {
          display: none;
        }

        .TimelineNode--left {
          text-align: right;
          align-items: flex-end;
        }

        .TimelineNode--right .Month:after {
          display: none;
        }
      `}</style>
    </div>
  );
};

export class Timeline extends React.Component {
  static defaultProps = {
    className: "Timeline"
  };

  render() {
    const { events, title, className, children, ...otherProps } = this.props;
    const nodes = events.map(({ month, summary }, index) => {
      return (
        <TimelineNode
          month={month}
          summary={summary}
          offset={index % 2 === 1}
        />
      );
    });

    const leftNodes = nodes.filter((node, index) => index % 2 === 0);
    const rightNodes = nodes.filter((node, index) => index % 2 === 1);
    return (
      <div className={className} {...otherProps}>
        <div className="TimelineTitle">{title}</div>

        <div className="TimelineContentContainer">
          <div className="TimelineContent TimelineContent--left">
            {leftNodes}
          </div>
          <div className="TimelineDivider" />
          <div className="TimelineContent TimelineContent--right">
            {rightNodes}
          </div>
        </div>

        {children}

        <style jsx>{`
          .TimelineContent {
            display: grid;
            grid-template-columns: 1fr;
            grid-auto-flow: row;
            grid-row-gap: 80px;
            justify-content: center;
          }

          .TimelineContent--left {
            margin-left: 20px;
          }

          .TimelineContent--right {
            padding-top: 80px;
          }

          .TimelineContentContainer {
            display: flex;
            padding-top: 40px;
            padding-bottom: 40px;
            justify-content: space-around;
          }

          .TimelineDivider {
            background: var(--link-color);
            min-height: 100%;
            width: 3px;
            opacity: 0.25;
          }

          .TimelineTitle {
            font-size: 1.5em;
          }
        `}</style>
      </div>
    );
  }
}

export default Timeline;
