import React from "react";
import Head from "./head";
import SyntaxHighlighStyles from "./SyntaxHighlightStyles";
import { format } from "date-fns";
import Link from "next/link";
import classNames from "classnames";
import { MDXProvider } from "@mdx-js/tag";
import CodeContainer, { ParagraphTag } from "./CodeContainer";
import CodeProvider from "./CodeProvider";
import PostInspector from "./PostInspector";

export const PostStyles = () => (
  <React.Fragment>
    <style jsx global>{`
      html,
      body,
      #__next {
        margin: 0;
        padding: 0;
        font-size: 16px;

        font-family: "Merriweather", system-ui, -apple-system,
          BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
          "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      }

      .SystemFont {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
      }

      :root {
        --page-background: #fff;
        --text-color: #000;
        --link-color: #1f3e71;
      }

      a,
      body {
        transition: background-color 0.3s linear;
        transition-property: background-color, color;
      }

      body {
        color: var(--text-color);
        background-color: var(--page-background);
      }

      a,
      a:visited {
        color: var(--link-color);
      }

      * {
        box-sizing: border-box;
        vertical-align: baseline;
      }

      main img {
        max-width: 100%;
      }

      main p {
        line-height: 1.8;
        hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
      }

      main svg {
        display: inline;
      }

      main p + svg {
        display: inline;
      }

      main {
        padding-bottom: 200px;
      }
    `}</style>
    <SyntaxHighlighStyles />
  </React.Fragment>
);

export const PageContext = React.createContext({
  title: null,
  publishedAt: null,
  description: null,
  path: "#",
  theme: "light",
  configure: () => {}
});

class RawPageConfiguration extends React.Component {
  constructor(props) {
    super(props);

    const { configure, ...page } = props;
    configure(page);
  }

  render() {
    const { title, publishedAt, children, path, theme } = this.props;
    return (
      <>
        <PostStyles theme={theme} />
        <Link>
          <a className="PageTitleLink" href={path}>
            <h1 className="PageTitle">{title}</h1>
          </a>
        </Link>
        <div className="PublishedAt">
          {format(publishedAt, "MMMM Qo, YYYY")} by{" "}
          <a href="/@jarred">Jarred</a>
        </div>

        <MDXProvider components={{ p: ParagraphTag }}>{children}</MDXProvider>

        <style jsx>{`
          .PageTitle {
            padding: 0;
            padding-top: 1.8;
            padding-bottom: 1;
            margin: 0;
            font-size: 2em;
          }

          .PageTitleLink {
            color: #222;
          }

          .Theme--darkmode .PageTitleLink {
            color: #eee;
          }

          a .PublishedAt {
            opacity: 0.75;
          }

          .PublishedAt {
            margin-top: 0.25em;
          }
        `}</style>
      </>
    );
  }
}

export const PageConfiguration = props => (
  <PageContext.Consumer>
    {({ configure, theme }) => (
      <RawPageConfiguration {...props} theme={theme} configure={configure} />
    )}
  </PageContext.Consumer>
);

export default PageConfiguration;

export class PageProvider extends React.Component {
  state = {
    title: null,
    publishedAt: null,
    path: "#",
    description: null,
    theme: "light"
  };

  handleConfigure = ({ title, publishedAt, description, path, theme }) => {
    this.setState({ title, publishedAt, description, path, theme });
  };

  render() {
    const { title, publishedAt, description, path, theme } = this.state;

    return (
      <PageContext.Provider
        value={{ ...this.state, configure: this.handleConfigure }}
      >
        <CodeProvider>
          <div className="Page">
            <div className="HeaderContainer">
              <header>
                <div className="NavTitle">
                  <img
                    src="/static/me.jpg"
                    height={40}
                    width={40}
                    srcSet="/static/me.jpg 1x, /static/me@2x.jpg 2x, /static/me@3x.jpg 3x"
                    className="NavTitle-icon"
                  />
                  <div className="NavTitle-text">Jarred</div>
                </div>
                <nav>
                  <Link>
                    <a href="/">What I'm doing</a>
                  </Link>
                  <Link>
                    <a href="/posts">Posts</a>
                  </Link>
                </nav>
              </header>
            </div>
            <article>
              <Head
                title={title}
                date={publishedAt}
                description={description}
              />

              <main
                className={classNames("Post", {
                  "Theme--darkmode": theme === "dark",
                  "Theme--lightmode": theme === "light"
                })}
              >
                {this.props.children}
              </main>
              <div className="SidebarGap" />
              <div className="Sidebar">
                <h3 className="Sidebar-title">About</h3>
                <p className="About">
                  My name is Jarred. I'm a product engineer at Stripe.
                </p>
                <p className="About">
                  - Lots of side projects.
                  <br /> - Optimistic about the future
                </p>

                <div className="SocialLinks">
                  <div className="SocialLink">
                    Follow me on{" "}
                    <a href="https://twitter.com/jarredsumner">Twitter</a>.
                  </div>
                </div>
              </div>
            </article>

            <style jsx>{`
              .Sidebar {
                font-size: 14px;
              }

              .Sidebar-title {
                margin: 0;
                padding: 0;
              }

              .NavTitle {
                display: grid;
                grid-auto-flow: column;
                grid-column-gap: 12px;
                align-items: center;
                padding: 12px;
                margin: -12px;
                border-radius: 6px;
                cursor: pointer;
              }

              .NavTitle:hover {
                background: #f9f9f9;
              }

              .NavTitle-text {
                font-size: 16px;
                font-weight: 700;
              }

              .NavTitle-icon {
                border-radius: 50%;
              }

              nav {
                display: grid;
                grid-auto-flow: column;
                grid-column-gap: 12px;
              }

              .About {
                line-height: 1.6;
              }

              .HeaderContainer {
                margin: 0 auto;
                width: calc(550px + 96px + 360px);
              }

              header {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: auto auto;
                justify-content: space-between;
                align-items: center;
                margin-top: 24px;
                margin-bottom: 24px;
              }

              article {
                display: grid;
                grid-template-columns: 550px 96px 360px;
                grid-template-rows: auto;
                justify-content: center;
                padding-top: 24px;
                padding-left: 0;

                padding-bottom: 48px;
              }

              @media (max-width: 1150px) {
                .HeaderContainer {
                  width: calc(550px + 48px + 160px);
                }
                article {
                  grid-template-columns: 550px 48px 160px;
                }

                .Sidebar {
                  font-size: 12px;
                }
              }

              @media (max-width: 850px) {
                .HeaderContainer {
                  width: 100%;
                }

                article {
                  padding-top: 0;
                  grid-template-columns: 100%;
                  grid-template-rows: auto 60px auto;
                  grid-auto-flow: row;
                }

                .HeaderContainer,
                article {
                  padding-left: 16px;
                  padding-right: 16px;
                }

                .SidebarGap {
                  border-top: 1px solid #ccc;
                  margin-top: 28px;
                  margin-bottom: 28px;
                }

                .Sidebar {
                  font-size: 16px;
                }
              }
            `}</style>
          </div>
        </CodeProvider>
      </PageContext.Provider>
    );
  }
}
