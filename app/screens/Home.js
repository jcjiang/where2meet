import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import { MapView } from 'expo';
import Modal from 'react-native-simple-modal';

let id = 0;

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      markers: [
        {
          coordinate: {
            latitude: 43.702087,
            longitude: -72.289022,
          },
          title: "Hanover Inn",
          description: "Alexandrea is here until 5:30 PM",
        },
        {
          coordinate: {
            latitude: 43.702668,
            longitude: -72.289845,
          },
          title: "Collis Center",
          description: "Hilda is here until 5:00 PM",
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

  createMarker(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          title: "EDIT",
          description: "EDIT",
        },
      ],
    });
}

render() {
  return (
    <MapView
    style={ styles.container }
    initialRegion={this.state.region}
    onRegionChange={ region => this.setState({region}) }
    onRegionChangeComplete={ region => this.setState({region}) }
    onLongPress={ (e) => this.createMarker(e) }
    showsBuildings ={ true }
    region={ this.state.region }
    >
    {this.state.markers.map((marker, index) => {
      return (
        <MapView.Marker
        ref={marker => (this.marker = marker)}
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
        />
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
