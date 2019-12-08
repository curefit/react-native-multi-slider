import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import { valueToPosition } from './converters';

const ViewPropTypes = require('react-native').ViewPropTypes || ViewPropTypes;

export default class DefaultScale extends React.Component {
  static propTypes = {
    selectedScaleStyle: ViewPropTypes.style,
    unSelectedScaleStyle: ViewPropTypes.style,
    scaleValues: PropTypes.array,
    oneMarkerLeftPosition: PropTypes.number,
    twoMarkerLeftPosition: PropTypes.number,
    sliderLength: PropTypes.number
  };

  static defaultProps = {
    scaleValues: [],
    selectedScaleStyle: {},
    unSelectedScaleStyle: {}
  };

  render() {
    const {
      selectedScaleStyle,
      unSelectedScaleStyle,
      scaleValues,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      sliderLength
    } = this.props;

    const _unSelectedScaleStyle = { ...styles.unSelectedScaleStyle, ...unSelectedScaleStyle }
    const _selectedScaleStyle = { ...styles.unSelectedScaleStyle, ...styles.selectedScaleStyle, ...selectedScaleStyle }

    return (
      <View style={styles.container}>
        {scaleValues.map((value, index) => {
          let margin = 0
          const isWithinSelection = valueToPosition(value, scaleValues, sliderLength) > oneMarkerLeftPosition
            && valueToPosition(value, scaleValues, sliderLength) < twoMarkerLeftPosition
          if (index === 0) {
            margin = valueToPosition(value, scaleValues, sliderLength) - (_unSelectedScaleStyle.width / 2)
          } else {
            margin = valueToPosition(value, scaleValues, sliderLength) - valueToPosition(scaleValues[index - 1], scaleValues, sliderLength) - (_unSelectedScaleStyle.width)
          }
          return <View
            key={index + ""}
            style={[_unSelectedScaleStyle, isWithinSelection ? _selectedScaleStyle : {}, { marginLeft: margin }]} />
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  unSelectedScaleStyle: {
    ...Platform.select({
      ios: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#A7A7A7',
      },
      android: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#CECECE',
      },
      web: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#A7A7A7',
      }
    }),
  },
  selectedScaleStyle: {
    ...Platform.select({
      ios: {
        backgroundColor: '#095FFF',
      },
      android: {
        backgroundColor: '#0D8675',
      },
      web: {
        backgroundColor: '#095FFF',
      }
    }),
  },
});
