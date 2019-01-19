import React from "react";
import App, { Container } from "next/app";
import LayoutPage from "../components/LayoutPage";
import { PageProvider } from "../components/Page";

export default class Blog extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    if (Component instanceof LayoutPage) {
      return (
        <Container>
          <Component {...pageProps} />
        </Container>
      );
    } else {
      return (
        <Container>
          <PageProvider>
            <Component {...pageProps} />
          </PageProvider>
        </Container>
      );
    }
  }
}
