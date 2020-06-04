import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Pie from 'react-native-pie';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pie
          radius={70}           //completly filled pie chart with radius 70
          series={[56, 11, 77]}    //values to show and color sequentially
          colors={['yellow', 'green', 'orange']}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});
