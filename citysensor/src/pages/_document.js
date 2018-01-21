import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../components/Layout/getPageContext';

// https://github.com/mui-org/material-ui/tree/v1-beta/examples/nextjs
class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>City Sensor</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <meta name="theme-color" content={pageContext.theme.palette.primary[500]} />
          <link rel="stylesheet" href="/static/css/fonts.css" />
          <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
          <link rel="stylesheet" type="text/css" href="/static/css/nprogress.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="notification" />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
      />
    ),
  };
};

export default MyDocument;