import * as React from 'react';
import { View } from 'react-native';
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

export default class extends React.PureComponent<{ phase: number; scale?: number }> {
  static defaultProps = {
    scale: 1
  };

  render() {
    const { phase, scale } = this.props;
    const width = 100 * scale;
    const height = 102 * scale;
    const paddingTop = height / 5;
    const viewBoxSize = 200 * scale;
    console.log(paddingTop);
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width, height, paddingTop }}>
        <Svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width={width} height={height}>
          <Path
            d="m100,0 a20,20 0 1,1 0,150 a20,20 0 1,1 0,-150"
            fill="rgba(0, 0, 0, 0.87)"
            stroke="rgba(0, 0, 0, 0.87)"
            strokeWidth="2"
            scale={scale}
          />
          <Path d={getD(phase)} fill="white" stroke="rgba(0, 0, 0, 0.87)" strokeWidth="2" scale={scale} />
        </Svg>
      </View>
    );
  }
}
