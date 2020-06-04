import React, { Component } from "react";
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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { UserEmail: props.route.params.email };

    this.state = {
      UserEmail: this.state.UserEmail,
      UserPassword: "",
      UserFname: "",
      UserLname: "",
      UserLanguage: "English",
      UserCity: "",
      UserRelationship: "Lives",

      title: "User Information",
      EnterYourEmail: "  Email",
      EnterYourPassword: "  Password",
      EnterUserRole: " User Role",
      TextLanguage: "Language",
      EnterFirstName: " First Name",
      EnterLastName: " Last Name",
      EnterUserCity: " User City",
      TextUserRelation: "User Relation",
      TextLives: "Lives",
      TextWorks: "Works",
      TextInTransit: "In-Transit",
      TextSubmit: "Submit",
      TextEnglish: "English",
      TextSpanish: "Spanish"
    };

    {
      this.UserRegistrationFunction();
    }
  }

  //   changeLanguage = language => {
  //     if (language == "English") {
  //       this.state.title = "User Information";
  //       this.state.EnterYourEmail = "Email";
  //       this.state.EnterYourPassword = "Password";
  //       this.state.EnterUserRole = "Role";
  //       this.state.TextLanguage = "Language   ";
  //       this.state.EnterFirstName = "First Name";
  //       this.state.EnterLastName = "Last Name";
  //       this.state.EnterUserCity = "City";
  //       this.state.TextUserRelation = "User Relation";
  //       this.state.TextLives = "Lives";
  //       this.state.TextWorks = "Works";
  //       this.state.TextInTransit = "In-Transit";
  //       this.state.TextSubmit = "Submit";
  //       this.state.TextEnglish = "English   ";
  //       this.state.TextSpanish = "Spanish   ";
  //     } else {
  //       this.state.title = "Informacion del usuario";
  //       this.state.EnterYourPassword = "Contraseña";
  //       this.state.EnterUserRole = "Papel";
  //       this.state.EnterYourEmail = "Email";
  //       this.state.TextLanguage = "   Idioma   ";

  //       this.state.EnterFirstName = "Nombre de pila";
  //       this.state.EnterLastName = "Nombre de familia";
  //       this.state.EnterUserCity = "Ciudad";
  //       this.state.TextUserRelation = "la relación";
  //       this.state.TextLives = "Vive";
  //       this.state.TextWorks = "Trabajos";
  //       this.state.TextInTransit = "de viaje";
  //       this.state.TextSubmit = "Enviar";

  //       this.state.TextEnglish = "Inglés";
  //       this.state.TextSpanish = "Español";
  //     }
  //   };
  //   updateUserRelationship = UserRelationship => {
  //     this.setState({ UserRelationship: UserRelationship });
  //   };

  //   updateLanguage = language => {
  //     console.log("updateLanguage");
  //     this.setState({ language: language });
  //     this.changeLanguage(language);
  //   };

  UserRegistrationFunction = () => {
    const { UserEmail } = this.state;
    fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/GetUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: UserEmail
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ UserPassword: responseJson.password });
        this.setState({ UserEmail: responseJson.email });
        this.setState({ UserFname: responseJson.fname });
        this.setState({ UserLname: responseJson.lname });
        this.setState({ UserLanguage: responseJson.language });
        this.setState({ UserCity: responseJson.city });
        this.setState({ UserRelationship: responseJson.relationship });
        this.setState({ UserRole: responseJson.role });
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    console.log(this.state.UserFname);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewStyles}>
            <Text style={styles.registrationStyle}>{this.state.title}</Text>
            <View>
              <Text style={styles.questionText}>
                {this.state.EnterYourEmail} : {this.state.UserEmail}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}>
                {this.state.EnterYourPassword} : {this.state.UserPassword}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}>
                {this.state.TextLanguage} : {this.state.UserLanguage}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}>
                {this.state.EnterFirstName} : {this.state.UserFname}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}>
                {this.state.EnterLastName} : {this.state.UserLname}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}>
                {this.state.EnterUserRole} : {this.state.UserRole}
              </Text>
            </View>

            <View>
              <Text style={styles.questionText}>
                {this.state.EnterUserCity} : {this.state.UserCity}
              </Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
            </View>
            <View>
              <Text style={styles.questionText}></Text>
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

  registrationStyle: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginTop: 20,
    marginBottom: 40
  },
  inputStyle: {
    height: 50,
    color: "white",
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
  questionText: {
    marginTop: 15,
    color: "white",
    fontSize: 25
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
