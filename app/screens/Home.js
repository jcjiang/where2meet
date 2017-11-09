import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import { MapView } from 'expo';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          description: "This is the best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: "Second Best Place",
          description: "This is the second best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: "Third Best Place",
          description: "This is the third best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Fourth Best Place",
          description: "This is the fourth best place in Portland",
        },
      ],
      region: {
        latitude: 43.703549,
        longitude: -72.286758,
        latitudeDelta: 0.004864195044303443,
        longitudeDelta: 0.0040142817690068,
      },
    };
  }

  getInitialState() {
    return {
      region: {
        latitude: 43.703549,
        longitude: -72.286758,
        latitudeDelta: 0.004864195044303443,
        longitudeDelta: 0.0040142817690068,
      }
    };
  }

  render() {
    return (
      <MapView
      style={ styles.container }
      ref={map => this.map = map}
      initialRegion={this.state.region}
      onRegionChange={ region => this.setState({region}) }
      onRegionChangeComplete={ region => this.setState({region}) }
      onPanDrag= { coordinate => this.setState({coordinate})}
      >
      {this.state.markers.map((marker, index) => {
        return (
          <MapView.Marker key={index} coordinate={marker.coordinate}/>
        );
      })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  }
});

AppRegistry.registerComponent('Home', () => Home);
