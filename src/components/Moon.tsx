import * as React from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const getD = (phase: number): string => {
  let sweep = [];
  let mag;
  if (phase <= 0.25) {
    sweep = [ 1, 0 ];
    mag = 20 - 20 * phase * 4;
  } else if (phase <= 0.5) {
    sweep = [ 0, 0 ];
    mag = 20 * (phase - 0.25) * 4;
  } else if (phase <= 0.75) {
    sweep = [ 1, 1 ];
    mag = 20 - 20 * (phase - 0.5) * 4;
  } else if (phase <= 1) {
    sweep = [ 0, 1 ];
    mag = 20 * (phase - 0.75) * 4;
  } else {
  }
  let d = 'm100,0 ';
  d = d + 'a' + mag + ',20 0 1,' + sweep[0] + ' 0,150 ';
  return (d = d + 'a20,20 0 1,' + sweep[1] + ' 0,-150');
};

const getHtml = d => `
<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    <style media="screen" type="text/css">
      body {
          margin: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          user-select: none;
          -webkit-user-select: none;
      }
    </style>
  </head>
  <body>
    <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden;">
      <svg id="moon" viewBox="0 0 200 200" width="50px" height="51px" style="margin-top: 6px;">
        <path class="moonback" d="m100,0 a20,20 0 1,1 0,150 a20,20 0 1,1 0,-150" fill="rgba(0, 0, 0, 0.87)" stroke="rgba(0, 0, 0, 0.87)" strokeWidth="2"></path>
        <path class="moonlight" d="${d}" fill="white" stroke="rgba(0, 0, 0, 0.87)" strokeWidth="2"></path>
      </svg>
    </div>
  </body>
</html>
`;

export default class extends React.PureComponent<{ phase: number }> {
  render() {
    const { phase } = this.props;
    const width = 50;
    const height = 51;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width, height }}>
        <WebView style={{ width, height }} source={{ html: getHtml(getD(phase)) }} scrollEnabled={false} />
      </View>
    );
  }
}
