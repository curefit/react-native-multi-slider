import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import { valueToPosition } from './converters';

const ViewPropTypes = require('react-native').ViewPropTypes || ViewPropTypes;

export default class DefaultScale extends React.Component {
  static propTypes = {
    scaleTextStyle: ViewPropTypes.style,
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
    unSelectedScaleStyle: {},
    scaleTextStyle: {}
  };

  render() {
    const {
      scaleTextStyle,
      selectedScaleStyle,
      unSelectedScaleStyle,
      scaleValues,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      sliderLength
    } = this.props;

    const _scaleTextStyle = { ...styles.scaleTextStyle, ...scaleTextStyle }
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

          return (
            <View
              key={index + ""}
              style={{ width: _unSelectedScaleStyle.width + margin, alignItems: "flex-end" }}>
              <View
                style={[_unSelectedScaleStyle, isWithinSelection ? _selectedScaleStyle : {},]} />
              <View style={{
                position: "absolute",
                left: 0,
                right: 0,
                alignItems: "flex-end",
                top: 20
              }}>
                <Text numberOfLines={1}
                  style={_scaleTextStyle}>{value}</Text>
              </View>
            </View>)

          // return <View
          //   key={index + ""}
          //   style={[_unSelectedScaleStyle, isWithinSelection ? _selectedScaleStyle : {}, { marginLeft: margin }]} />

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
  scaleTextStyle: {
    fontSize: 10,
    opacity: 0.8
  },
  unSelectedScaleStyle: {
    ...Platform.select({
      ios: {
        height: 8,
        width: 8,
        borderRadius: 5,
        backgroundColor: '#A7A7A7',
      },
      android: {
        height: 8,
        width: 8,
        borderRadius: 5,
        backgroundColor: '#CECECE',
      },
      web: {
        height: 8,
        width: 8,
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
