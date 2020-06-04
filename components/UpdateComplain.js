import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Picker,
  Alert,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView
} from "react-native";

export default class UpdateComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EnterComplainId: "Enter Complain ID",
      ComplainId: 0
    };
  }

  UserComplaintFunction = (ComplainNumber, status) => {
    if (isNaN(ComplainNumber)) Alert.alert("Enter Number");
    else if (ComplainNumber != "") {
      fetch(
        "http://poojajeergyal.uta.cloud/Whats_up_city/api/updateComplain.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            complainID: Number(ComplainNumber),
            status: status
          })
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          Alert.alert("Status Updated");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert("Enter complain Id");
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewStyles}>
            <Text style={styles.registrationStyle}>
              Update Complaints Status
            </Text>

            <View style={styles.loginAndPasswordView}>
              <TextInput
                onChangeText={ComplainId =>
                  this.setState({ ComplainId: ComplainId })
                }
                placeholder={this.state.EnterComplainId}
                type="outlined"
                placeholderTextColor="#7e9ca3"
                style={styles.inputStyle}
              ></TextInput>
            </View>
            <View>
              <TouchableOpacity
                style={styles.userButton}
                onPress={() =>
                  this.UserComplaintFunction(
                    this.state.ComplainId,
                    "InProgress"
                  )
                }
              >
                <Text style={styles.buttonText}>InProgress</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.userButton}
                onPress={() =>
                  this.UserComplaintFunction(this.state.ComplainId, "Completed")
                }
              >
                <Text style={styles.buttonText}>Completed</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewStyles: {
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  loginAndPasswordView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  registrationStyle: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginTop: 20,
    marginBottom: 40
  },
  inputStyle: {
    height: 50,
    color: "#7e9ca3",
    fontSize: 19
  },
  userButton: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 17
  },
  scrollView: {
    backgroundColor: "#003f5c",
    // marginHorizontal: 20,
    width: "100%",
    margin: 0
  },
  questionText: {
    marginTop: 15,
    color: "white",
    fontSize: 25
  },
  userButton: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signUpTextStyle: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  pickerText: {
    color: "white",
    fontSize: 20
  }
});
