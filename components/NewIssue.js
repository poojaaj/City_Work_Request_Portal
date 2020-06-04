import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  SafeAreaView,
  View,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class NewIssue extends Component {
  constructor(props) {
    super(props);
    if (props.route.params.language == "English") {
      this.state = {
        email: props.route.params.email,
        issue: props.route.params.issue,
        language: props.route.params.language,
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude,
        description: "",
        solution: "",
        userRelation: "Lives",
        isAnonymous: "No",
        isReported: "No",
        photo: null,

        Textdescription: "Description",
        Textproposedsolution: "Proposed solution(Optional)",
        TextUserrelation: "User-Relation?",
        TextAnonymous: "Anonyomous?",
        TextReportedBefore: "Reported Before?",
        TextYes: "Yes",
        TextNo: "No",
        TextLives: "Lives",
        TextWorks: "Works",
        TextInTransit: "In-Transit",
        TextSubmit: "Submit",
        TextReportedBeforeComment: "Report Comment"
      };
    } else {
      this.state = {
        email: props.route.params.email,
        issue: props.route.params.issue,
        language: props.route.params.language,
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude,
        description: "",
        solution: "",
        userRelation: "Lives",
        isAnonymous: "No",
        isReported: "No",
        photo: null,

        Textdescription: "Descripción",
        Textproposedsolution: "Solución propuesta",
        TextUserrelation: "la relación?",
        TextAnonymous: "anónimamente?",
        TextReportedBefore: "Reportado antes?",
        TextYes: "Si",
        TextNo: "No",
        TextLives: "Vive",
        TextWorks: "Trabajos",
        TextInTransit: "de viaje",
        TextSubmit: "Enviar",
        TextReportedBeforeComment: "Informar comentario"
      };
    }
  }
  updateUserRelation = userRelation => {
    this.setState({ userRelation: userRelation });
  };

  updateIsAnonymous = isAnonymous => {
    this.setState({ isAnonymous: isAnonymous });
  };

  updateIsReported = isReported => {
    this.setState({ isReported: isReported });
  };

  UserComplaintFunction = () => {
    const { photo } = this.state;

    let localUri = photo;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("photo", { uri: localUri, name: filename, type });
    formData.append("email", this.state.email);
    formData.append("issue", this.state.issue.key);
    formData.append("latitude", this.state.latitude);
    formData.append("longitude", this.state.longitude);
    formData.append("description", this.state.description);
    formData.append("solution", this.state.solution);
    formData.append("userRelation", this.state.userRelation);
    formData.append("isAnonymous", this.state.isAnonymous);
    formData.append("isReported", this.state.isReported);
    formData.append("reportedComment", this.state.reportedComment);

    fetch(
      "http://poojajeergyal.uta.cloud/Whats_up_city/api/CreateComplaint.php",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate("Main", { email: this.state.email });
  };
  render() {
    console.log(this.state);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch"
            }}
          >
            {this.state.language == "English" ? (
              <Text style={styles.selectedIssueStyle}>
                {this.state.issue.key}
              </Text>
            ) : (
              <Text style={styles.selectedIssueStyle}>
                {this.state.issue.keySpanish}
              </Text>
            )}
            <TextInput
              onChangeText={description =>
                this.setState({ description: description })
              }
              placeholder={this.state.Textdescription}
              type="outlined"
              placeholderTextColor="#ffff"
              style={styles.inputStyle}
            ></TextInput>

            <TextInput
              onChangeText={solution => this.setState({ solution: solution })}
              placeholder={this.state.Textproposedsolution}
              type="outlined"
              placeholderTextColor="#ffff"
              style={styles.inputStyle}
            ></TextInput>

            <View style="questionContainerStyle">
              <Text style={styles.questionText}>
                {this.state.TextUserrelation}
              </Text>
              <Picker
                style={styles.text}
                selectedValue={this.state.userRelation}
                onValueChange={this.updateUserRelation}
              >
                <Picker.Item label={this.state.TextLives} value="Lives" />
                <Picker.Item label={this.state.TextWorks} value="Works" />
                <Picker.Item
                  label={this.state.TextInTransit}
                  value="In-Transit"
                />
              </Picker>

              <Text style={styles.questionText}>
                {this.state.TextAnonymous}
              </Text>
              <Picker
                style={styles.text}
                selectedValue={this.state.isAnonymous}
                onValueChange={this.updateIsAnonymous}
              >
                <Picker.Item label={this.state.TextNo} value="No" />
                <Picker.Item label={this.state.TextYes} value="Yes" />
              </Picker>

              <Text style={styles.questionText}>
                {this.state.TextReportedBefore}
              </Text>
              <Picker
                style={styles.text}
                selectedValue={this.state.isReported}
                onValueChange={this.updateIsReported}
              >
                <Picker.Item label={this.state.TextNo} value="No" />
                <Picker.Item label={this.state.TextYes} value="Yes" />
              </Picker>
            </View>
            {this.state.isReported == "Yes" ? (
              <View style={styles.textFieldStyle}>
                <TextInput
                  type="outlined"
                  placeholderTextColor="#ffff"
                  style={styles.inputStyle}
                  onChangeText={reportedComment =>
                    this.setState({ reportedComment: reportedComment })
                  }
                  placeholder={this.state.TextReportedBeforeComment}
                ></TextInput>
              </View>
            ) : null}

            <View style={styles.submitButtonStyle}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.pickImage}
              >
                <Text style={styles.buttonText}>
                  Attach
                  {/* {this.state.photo && <Image source={{ uri: this.state.photo }} style={{ width: 100, height: 100 }} />} */}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.UserComplaintFunction}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

export default NewIssue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    // justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollView: {
    backgroundColor: "#003f5c",
    // marginHorizontal: 20,
    width: "80%",
    margin: 10
  },
  inputStyle: {
    // marginBottom: 30,
    // width: "100%",
    // padding: 5,
    // fontSize: 15,
    // backgroundColor: "#D7DDE9"
    height: 50,
    color: "white",
    fontSize: 19,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 19
  },
  text: {
    marginBottom: 0,
    width: "90%",
    padding: 0,
    fontSize: 6,
    backgroundColor: "#D7DDE9"
  },
  submitButtonStyle: {
    alignItems: "center"
  },
  submitButton: {
    // alignItems: "center",
    // backgroundColor: "#f7f7f7",
    // padding: 15,
    // width: "90%",
    // marginBottom: 15,
    // borderRadius: 25,
    // borderColor: "blue",
    // fontFamily: "Verdana",
    // marginTop: 20
    //
    width: "75%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  selectedIssueStyle: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#fb5b5a",
    marginBottom: 60
  },
  questionText: {
    marginTop: 15,
    color: "white",
    fontSize: 20
  },
  questionContainerStyle: {
    marginTop: 10
  }
});
