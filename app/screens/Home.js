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
    this.state = {
      isModalVisible: false,
      name: '',
      location: '',
      time: '',
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

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

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
    console.log(this.itemsRef);
    this.itemsRef.push({
      coordinate: e.nativeEvent.coordinate,
      key: id++,
      title: "Edit by pressing!",
      description: "Edit by pressing!",
    });
}

updateMarker(marker) {
  this._hideModal;
  console.log(marker);
  this.itemsRef.child(marker._key).update({
    description: `${this.state.name} will be at ${this.state.location} at ${this.state.time}`,
  });
}

deleteMarker(marker) {
  this._hideModal;
  console.log(marker);
  this.setState({isModalVisible: false});
  console.log(this.state.isModalVisible);
  this.itemsRef.child(marker._key).remove();
}


  render() {
    return (
      <View style = {styles.outside}>
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
      onLongPress={ (e) => this.createMarker(e)}
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
          >
            <MapView.Callout
              style={styles.plainView}
              onPress={this._showModal}
            >
            <View>
             <Text> {marker.description} </Text>
             <Modal
             isVisible={this.state.isModalVisible}
             backdropColor={'black'}
             backdropOpacity={0.25}
             animationIn={'zoomInDown'}
             animationOut={'zoomOutUp'}
             animationInTiming={1000}
             animationOutTiming={1000}
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
