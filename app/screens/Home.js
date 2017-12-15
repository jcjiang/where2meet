import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import { MapView } from 'expo';
import Modal from 'react-native-simple-modal';
import firebase from '../firebase';

let id = 0;

export default class Home extends Component {

  constructor() {
    super();
    this.itemsRef = firebase.database().ref();
    this.state = {
      markers: [
      ],
      region: {
        latitude: 43.703549,
        longitude: -72.286758,
        latitudeDelta: 0.004864195044303443,
        longitudeDelta: 0.0040142817690068,
      },
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          coordinate: child.val().coordinate,
          description: child.val().description,
          _key: child.key
        });
      });

      this.setState({
        markers: items,
      });

    });
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
    this.itemsRef.push({
      coordinate: e.nativeEvent.coordinate,
      key: id++,
      title: "EDIT",
      description: "EDIT",
    });
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
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
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
