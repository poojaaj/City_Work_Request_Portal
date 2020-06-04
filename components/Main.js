import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props);
    if (props.email) {
      this.state = {
        email: props.email,
        language: "English",
        role: "User",
        TextNewrequest: "New Request",
        TextCheckComplaint: "Check Complaint",
        TextCheckPieChart: "Check PieChart(Admin)",
        TextUpdateComplain: "Update Complain",
        TextLogout: "Logout"
      };
    } else if (props.route && props.route.params && props.route.params.email) {
      if (props.route.params.language == "English") {
        this.state = {
          email: props.route.params.email,
          language: props.route.params.language,
          role: props.route.params.role,
          TextNewrequest: "New Request",
          TextProfile: "Profile",
          TextCheckComplaint: "Check Complaint",
          TextCheckPieChart: "Check PieChart",
          TextUpdateComplain: "Update Complain",
          TextLogout: "Logout"
        };
      } else {
        this.state = {
          email: props.route.params.email,
          language: props.route.params.language,
          role: props.route.params.role,
          TextNewrequest: "Nueva solicitud",
          TextProfile: "perfil",
          TextCheckComplaint: "Verificar queja",
          TextCheckPieChart: "Verificar PieChart",
          TextUpdateComplain: "Actualización de queja",
          TextLogout: "Cerrar sesión"
        };
      }
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <ImageBackground
          source={require("../Images/city1.jpeg")}
          style={styles.imageStyle}
        >
          <View style={styles.complaintsButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ProfileScreen", {
                  email: this.state.email,
                  language: this.state.language
                })
              }
              style={styles.newRequestStyle}
            >
              <Text style={styles.newRequestTextStyle}>
                {this.state.TextProfile}
              </Text>
            </TouchableOpacity>
            {this.state.role == "User" ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SelectIssue", {
                    email: this.state.email,
                    language: this.state.language
                  })
                }
                style={styles.newRequestStyle}
              >
                <Text style={styles.newRequestTextStyle}>
                  {this.state.TextNewrequest}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.newRequestStyle}
              onPress={() =>
                this.props.navigation.navigate("showComplaintMarkers", {
                  email: this.state.email
                })
              }
            >
              <Text style={styles.newRequestTextStyle}>
                {this.state.TextCheckComplaint}
              </Text>
            </TouchableOpacity>
            {this.state.role == "Admin" ? (
              <TouchableOpacity
                style={styles.newRequestStyle}
                onPress={() =>
                  this.props.navigation.navigate("ShowPieChart", {
                    email: this.state.email
                  })
                }
              >
                <Text style={styles.newRequestTextStyle}>
                  {this.state.TextCheckPieChart}
                </Text>
              </TouchableOpacity>
            ) : null}

            {this.state.role == "Admin" ? (
              <TouchableOpacity
                style={styles.newRequestStyle}
                onPress={() =>
                  this.props.navigation.navigate("ShowComplainUpdater", {
                    email: this.state.email
                  })
                }
              >
                <Text style={styles.newRequestTextStyle}>
                  {this.state.TextUpdateComplain}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.newRequestStyle}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.logoutTextStyle}>
                {this.state.TextLogout}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* <Image
          source={require("../Images/city1.jpeg")}
          style={styles.imageStyle}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  imageStyle: {
    resizeMode: "contain",
    flex: 1,
    justifyContent: "center"
  },
  viewStyle: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#003f5c"
  },
  complaintsButtonContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  logoutStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  logoutTextStyle: {
    color: "white",
    fontSize: 19
  },
  newRequestStyle: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  newRequestTextStyle: {
    color: "white",
    fontSize: 19
  },
  checkComplaintStyle: {
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
    width: "60%",
    // marginLeft: '15%',
    marginBottom: 10,
    borderRadius: 30,
    borderColor: "blue",
    fontFamily: "Verdana",
    marginTop: 10
  },
  checkComplaintTextStyle: {
    fontSize: 19,
    textAlign: "center"
  }
});
