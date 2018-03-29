import * as React from 'react';
import { Animated, View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const { width: windowWidth } = Dimensions.get('window');

const COLLAPSED_SIZE = 56;
const EXPANDED_WIDTH = windowWidth;
const EXPANDED_HEIGHT = 300;
const COLLAPSED_MARGIN = 20;
const EXPANDED_MARGIN = 0;
const COLLAPSED_RADIUS = COLLAPSED_SIZE / 2;
const EXPANDED_RADIUS = 0;
const DURATION = 200;

export default connect()(
  class extends React.PureComponent {
    state = {
      width: new Animated.Value(COLLAPSED_SIZE),
      height: new Animated.Value(COLLAPSED_SIZE),
      bottom: new Animated.Value(COLLAPSED_MARGIN),
      right: new Animated.Value(COLLAPSED_MARGIN),
      borderRadius: new Animated.Value(COLLAPSED_RADIUS),
      contentOpacity: new Animated.Value(0)
    };

    handlePress = () => {
      const { width, height, bottom, right, borderRadius, contentOpacity } = this.state;
      if (height['_value'] === COLLAPSED_SIZE) {
        Animated.parallel([
          Animated.timing(width, { toValue: EXPANDED_WIDTH, duration: DURATION }),
          Animated.timing(height, { toValue: EXPANDED_HEIGHT, duration: DURATION }),
          Animated.timing(bottom, { toValue: EXPANDED_MARGIN, duration: DURATION }),
          Animated.timing(right, { toValue: EXPANDED_MARGIN, duration: DURATION }),
          Animated.timing(borderRadius, { toValue: EXPANDED_RADIUS, duration: DURATION }),
          Animated.timing(contentOpacity, { toValue: 1, duration: DURATION })
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(width, { toValue: COLLAPSED_SIZE, duration: DURATION }),
          Animated.timing(height, { toValue: COLLAPSED_SIZE, duration: DURATION }),
          Animated.timing(bottom, { toValue: COLLAPSED_MARGIN, duration: DURATION }),
          Animated.timing(right, { toValue: COLLAPSED_MARGIN, duration: DURATION }),
          Animated.timing(borderRadius, { toValue: COLLAPSED_RADIUS, duration: DURATION }),
          Animated.timing(contentOpacity, { toValue: 0, duration: DURATION })
        ]).start();
      }
    };

    render() {
      const { width, height, bottom, right, borderRadius, contentOpacity } = this.state;
      return (
        <Animated.View
          style={{
            position: 'absolute',
            bottom,
            right,
            height,
            width,
            borderRadius,
            backgroundColor: '#EEE',
            elevation: 8
          }}
        >
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={{ flex: 1, padding: 15, opacity: contentOpacity }}>
              <Text>hellobello</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      );
    }
  }
);
