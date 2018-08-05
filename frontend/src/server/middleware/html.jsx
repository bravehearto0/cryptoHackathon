import PropTypes from 'prop-types';
import React from 'react';
import serialize from 'serialize-javascript';

import { cdnUrl } from '../../common/utils/config';
import styles from '../../client/styles/styles.scss';

const Html = ({ content, state, assetMap, css, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent(); // react-helmet html document tags
  const bodyAttrs = helmet.bodyAttributes.toComponent(); // react-helmet body document tags

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <meta name="msapplication-TileColor" content="#eed92a"/>
        <meta name="theme-color" content="#ffffff"/>

        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
        <meta name="msapplication-config" content={`${cdnUrl}${assetMap["browserconfig.xml"]}`}/>
        <meta name="theme-color" content="#ffffff"/>
        {!__DEV__ && <link rel="stylesheet" type="text/css" href={`${cdnUrl}${assetMap['bundle.css']}`}/>}
        {!!__DEV__ &&
        <style dangerouslySetInnerHTML={{
          __html: styles._getCss(),
        }}/>
        }
        {!!css && css}
      </head>
      <body {...bodyAttrs}>
        <div id="content" dangerouslySetInnerHTML={{ __html: content || "" }}/>
        <script
          dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${serialize(state, { isJSON: true })};` }}
          charSet="UTF-8"
        />
        {assetMap["vendor.js"] && <script src={`${cdnUrl}${assetMap["vendor.js"]}`} charSet="utf-8"/>}
        <script src={`${cdnUrl}${assetMap['bundle.js']}`} charSet="utf-8"/>
      </body>
    </html>
  );
};

Html.propTypes = {
  content: PropTypes.string,
  state: PropTypes.object.isRequired,
  assetMap: PropTypes.object.isRequired,
  css: PropTypes.array,
  helmet: PropTypes.object,
};

export default Html;
