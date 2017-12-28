import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, Text, Button, AlertIOS } from 'react-native';
import { FormLabel, FormInput, Card } from 'react-native-elements'
import { MapView } from 'expo';
import Modal from 'react-native-modal';
import firebase from '../firebase';

let id = 0;

export default class Home extends Component {

  constructor() {
    super();
    this.itemsRef = firebase.database().ref();
    this.setState = this.setState.bind(this);
    this.state = {
      regionSet: false,
      isModalVisible: false,
      name: '',
      location: '',
      time: '',
      currentMarker: '',
      markers: [
      ],
      region: {
        latitude: 43.703549,
        longitude: -72.286758,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      },
    };
  }

  onRegionChange = (region) => {
  if (!this.state.regionSet) return;
  this.setState({
    region
  });
}

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    const region = {
      latitude: 43.703549,
      longitude: -72.286758,
      latitudeDelta: 0.004757,
      longitudeDelta: 0.006866,
      }
      this.setState({ region, regionSet: true })
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
          name: child.val().name,
          location: child.val().location,
          time: child.val().time,
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
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      }
    };
  }

  _showModal(name, location, time) {
    this.setState({
      isModalVisible: true,
      name: name,
      location: location,
      time: time
    });
  }

  _hideModal = () => this.setState({ isModalVisible: false, name: '', location: '', time: '' })

  createMarker(e) {
    console.log(this.itemsRef);
    this.itemsRef.push({
      coordinate: e.nativeEvent.coordinate,
      key: id++,
      title: "Edit by pressing!",
      description: "Edit by pressing!",
      name: '',
      location: '',
      time: '',
    });
}

updateMarker(marker) {
  this.setState({isModalVisible: false, name: '', location: '', time: ''});
  this.itemsRef.child(marker._key).update({
    name: this.state.name,
    location: this.state.location,
    time: this.state.time,
    description: `${this.state.name} will be at ${this.state.location} at ${this.state.time}`,
  });
}

deleteMarker(marker) {
  this.setState({isModalVisible: false, name: '', location: '', time: ''});
  setTimeout(() => {this.itemsRef.child(marker._key).remove()}, 500);
  console.log(this.state.isModalVisible);
}


  render() {
    return (
      <View style = {styles.outside}>
      <MapView
      style={ styles.container }
      initialRegion={{
        latitude: 43.703549,
        longitude: -72.286758,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
      }}
      onRegionChange={ region => this.setState({region}) }
      onRegionChangeComplete={ region => this.setState({region}) }
      onLongPress={ (e) => this.createMarker(e)}
      onMapReady={() => {
            this.setState({ regionSet: true });
      }}
      showsBuildings ={ true }
      region={ this.state.region }
      >
      {this.state.markers.map((marker, index) => {
        return (
          <MapView.Marker
          key={index}
          coordinate={marker.coordinate}
          >
            <MapView.Callout
              style={styles.plainView}
              onPress={() => this._showModal(marker.name, marker.location, marker.time)}
            >
            <View>
             <Text> {marker.description} </Text>
             <Modal
             isVisible={this.state.isModalVisible}
             backdropColor={'black'}
             backdropOpacity={0.25}
             backdropTransitionInTiming={1000}
             backdropTransitionOutTiming={1000}>
             <View style={styles.modalContent}>
               <Text style={{ paddingLeft: 30 }}>Set your projected location and time below.</Text>
               <FormLabel>Name</FormLabel>
               <FormInput
                 style={[styles.textinput]}
                 onChangeText={(text) => this.setState({name: text})}
                 value={this.state.name}
                 placeholder={"Write your name here"}
               />
               <FormLabel>Location</FormLabel>
               <FormInput
                 style={[styles.textinput]}
                 onChangeText={(text) => this.setState({location: text})}
                 value={this.state.location}
                 placeholder={"Write location here (ex: Collis 303)"}
               />
               <FormLabel>Time</FormLabel>
               <FormInput
                 style={[styles.textinput]}
                 onChangeText={(text) => this.setState({time: text})}
                 value={this.state.time}
                 placeholder={"Write time here (ex: 6 PM)"}
               />
               <Button onPress={() => this.updateMarker(marker)} title='Press to update marker'/>
               <Button onPress={() => this.deleteMarker(marker)} title='Press to delete marker'/>
               <Button onPress={this._hideModal} title='Finished' />
             </View>
             </Modal>
           </View>
           </MapView.Callout>
          </MapView.Marker>
        );
      })}
      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  outside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  }
});

AppRegistry.registerComponent('Home', () => Home);
