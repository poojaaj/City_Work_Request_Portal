import React, { Component } from "react";
import { Text, View, ActivityIndicator, Button, TextInput } from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";

console.disableYellowBox = true;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.API_KEY = "your_api_key";
    this.state = {
      loading: true,
      email: props.route.params.email,
      language: props.route.params.language,
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
      regionChangeProgress: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        };
        this.setState({
          region: region,
          loading: false,
          error: null
        });
      },
      error => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false
        });
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 }
    );
  }

  onMapReady = () => {
    this.setState({ isMapReady: true, marginTop: 0 });
  };

  fetchAddress = () => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.state.region.latitude +
        "," +
        this.state.region.longitude +
        "&key=" +
        this.API_KEY
    )
      .then(response => response.json())
      .then(responseJson => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false
        });
      });
  };

  onRegionChange = region => {
    this.setState(
      {
        region,
        regionChangeProgress: true
      },
      () => this.fetchAddress()
    );
  };

  onLocationSelect = () => {
    let geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      this.state.userLocation
    )}&key=${this.API_KEY}`;
    fetch(geocode_url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != null) {
          this.props.navigation.navigate("NewIssue", {
            email: this.state.email,
            issue: this.state.issue,
            language: this.state.language,
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          });
          console.log(
            this.state.region.latitude + "," + this.state.region.longitude
          );
          this.setState({
            region: {
              latitude: responseJson.results[0].geometry.location.lat,
              longitude: responseJson.results[0].geometry.location.lng
            },
            regionChangeProgress: false
          });
        }
      });
  };

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
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
              Enter full address
            </Text>
            <TextInput
              numberOfLines={2}
              style={{
                fontSize: 14,
                padding: 10,
                borderBottomColor: "silver",
                borderBottomWidth: 0.5
              }}
            >
              {!this.state.regionChangeProgress
                ? this.state.userLocation
                : "Identifying Location..."}
            </TextInput>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: 10
              }}
            >
              <Button
                title="SELECT LOCATION"
                onPress={this.onLocationSelect}
                // onPress={this.props.navigation.navigate("NewIssue",{
                //   email: this.state.email,
                //   issue: this.state.issueData
                // })}
              ></Button>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            {!!this.state.region.latitude && !!this.state.region.longitude && (
              <MapView
                style={{ ...styles.map, marginTop: this.state.marginTop }}
                initialRegion={this.state.region}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}
                onLocationSelect={this.onLocationSelect}
              >
                <MapView.Marker
                  coordinate={this.state.region}
                  title={"Your Location."}
                  draggable
                />
              </MapView>
            )}
          </View>
        </View>
      );
    }
  }
}
