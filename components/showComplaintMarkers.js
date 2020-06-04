import React, { Component } from 'react';
import { Alert, View, ActivityIndicator, TouchableHighlightBase } from 'react-native';
import MapView from "react-native-maps";
import styles from "./styles";

console.disableYellowBox = true;

export default class showComplaintMarkers extends Component {
  constructor(props) {
    super(props);
    this.API_KEY = "your_api_key";
    this.state = {
      loading: true,
      email: props.route.params.email,
      issue: props.route.params.issueData,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: "",
      regionChangeProgress: false,
      serverPullMarkers: false,
      markers: [{
        title: 'Report',
        coordinates: {
          latitude: 34.733440,
          longitude: -97.103230
        },
      },
      {
        title: 'Report',
        coordinates: {
          latitude: 30.7334400,
          longitude: -97.103230
        },
      }]
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        };
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false
        })
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }

  onMapReady = () => {
    console.log("Map ready!")
    this.setState({ isMapReady: true, marginTop: 0 });
  }

  fetchAddress = () => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + this.API_KEY)
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false
        });
      });
  }



  onRegionChange = region => {
    console.log("region change")
    fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/GetComplaintRecords.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {

          myArray = responseJson.split(',');
          if (this.state.serverPullMarkers == false) {
            for (let i = 0; i < myArray.length; i++) {
              //check for nul case
              if (myArray[i] != "" && myArray[i + 1] != "" && myArray[i + 2] != "") {
                var coordinates = {};
                // coordinates.title = "Report " + i+1;
                coordinates.title = myArray[i].toString();
                coordinates.coordinates = ({
                  latitude: parseFloat(myArray[i + 1]),
                  longitude: parseFloat(myArray[i + 2]),
                })
                i += 2
                this.state.markers.push(coordinates)
              }
            }
            this.setState({
              serverPullMarkers: true
            })
          }
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _renderloactions() {
    console.log("Here");
    const contents = this.state.markers.map((item) => {
      return (
        <MapView.Marker
          key={item.key}
          coordinate={{ "latitude": item.latitude, "longitude": item.longitude }}
          title={item.key}
        />
      );
    });
    this.setState({ contents })
  }

  onLocationSelect = () => {
    let geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.state.userLocation)}&key=${this.API_KEY}`
    fetch(geocode_url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson != null) {
          this.props.navigation.navigate("NewIssue", {
            email: this.state.email,
            issue: this.state.issue,
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          })
          // console.log(this.state.region.latitude + ',' + this.state.region.longitude)
          this.setState({
            region: {
              latitude: responseJson.results[0].geometry.location.lat,
              longitude: responseJson.results[0].geometry.location.lng
            },
            regionChangeProgress: false
          });

          const newRegion = {
            latitude: responseJson.results[0],
            longitude: responseJson.results[1],
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }
          // animate camera to that region over 500 ms
          this.map.animateToRegion(newRegion, 500)
        }
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <View style={{ flex: 1 }}>
            {!!this.state.region.latitude && !!this.state.region.longitude &&
              <MapView
                style={{ ...styles.map, marginTop: this.state.marginTop }}
                initialRegion={this.state.region}
                showsUserLocation={true}
                region={this.state.region}
                followsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}
              // onLocationSelect={this.onLocationSelect}
              >
                {this.state.markers.map(marker => (
                  <MapView.Marker
                    // coordinate={marker.coordinates}
                    coordinate={marker.coordinates}
                    title={marker.title}
                  // pinColor={"green"}
                  />
                ))}
              </MapView>
            }
          </View>
        </View>
      );
    }
  }
}
