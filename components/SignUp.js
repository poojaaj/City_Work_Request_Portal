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

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      UserPassword: "",
      UserRole: "User",
      UserFname: "",
      UserLname: "",
      UserLanguage: "English",
      UserCity: "",
      UserRelationship: "Lives",

      title: "Registration",
      EnterYourEmail: "Enter Your Email",
      EnterYourPassword: "Enter Your Password",
      EnterUserRole: "User Role",
      TextLanguage: "Language",
      EnterFirstName: "Enter First Name",
      EnterLastName: "Enter Last Name",
      EnterUserCity: "Enter User City",
      TextUserRelation: "What is your relationship with the city?",
      TextLives: "Lives",
      TextWorks: "Works",
      TextInTransit: "In-Transit",
      TextSubmit: "Submit",
      TextEnglish: "English",
      TextSpanish: "Spanish",
      TextUser: "User",
      TextAdmin: "Admin"
    };
  }

  changeLanguage = language => {
    if (language == "English") {
      this.state.title = "Registration";
      this.state.EnterYourEmail = "Enter Your Email";
      this.state.EnterYourPassword = "Enter Your Password";
      this.state.EnterUserRole = "User Role";
      this.state.TextLanguage = "Language   ";
      this.state.EnterFirstName = "Enter First Name";
      this.state.EnterLastName = "Enter Last Name";
      this.state.EnterUserCity = "Enter User City";
      this.state.TextUserRelation = "What is your relationship with the city?";
      this.state.TextLives = "Lives";
      this.state.TextWorks = "Works";
      this.state.TextInTransit = "In-Transit";
      this.state.TextSubmit = "Submit";
      this.state.TextEnglish = "English   ";
      this.state.TextSpanish = "Spanish   ";
      this.state.TextUser = "User   ";
      this.state.TextAdmin = "Admin   ";
    } else {
      this.state.title = "Registro";
      this.state.EnterYourPassword = "Escriba su contraseña";
      this.state.EnterUserRole = "su papel";
      this.state.EnterYourEmail = "Escriba su Email";
      this.state.TextLanguage = "   Idioma   ";

      this.state.EnterFirstName = "Escriba su nombre de pila";
      this.state.EnterLastName = "Escriba su nombre de familia";
      this.state.EnterUserCity = "Escriba su ciudad";
      this.state.TextUserRelation = "su relación con la ciudad?";
      this.state.TextLives = "Vive";
      this.state.TextWorks = "Trabajos";
      this.state.TextInTransit = "de viaje";
      this.state.TextSubmit = "Enviar";

      this.state.TextEnglish = "Inglés         ";
      this.state.TextSpanish = "Español         ";

      this.state.TextUser = "el usuario      ";
      this.state.TextAdmin = "Administrador   ";
    }
  };

  updateUserRelationship = UserRelationship => {
    this.setState({ UserRelationship: UserRelationship });
  };

  updateUserRole = UserRole => {
    this.setState({ UserRole: UserRole });
  };

  updateLanguage = language => {
    console.log("updateLanguage");
    this.setState({ language: language });
    this.changeLanguage(language);
  };

  UserRegistrationFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    const { UserRole } = this.state;
    const { UserFname } = this.state;
    const { UserLname } = this.state;
    const { UserLanguage } = this.state;
    const { UserCity } = this.state;
    const { UserRelationship } = this.state;

    fetch(
      "http://poojajeergyal.uta.cloud/Whats_up_city/api/user_registration.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword,
          role: UserRole,
          fname: UserFname,
          lname: UserLname,
          language: UserLanguage,
          city: UserCity,
          relationship: UserRelationship
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewStyles}>
            <Text style={styles.registrationStyle}>{this.state.title}</Text>
            <View style={{ width: 150, paddingLeft: 10 }}>
              <Text style={styles.questionText}>{this.state.TextLanguage}</Text>
              <Picker
                style={styles.pickerText}
                selectedValue={this.state.language}
                onValueChange={this.updateLanguage}
              >
                <Picker.Item label={this.state.TextEnglish} value="English" />
                <Picker.Item label={this.state.TextSpanish} value="Spanish" />
              </Picker>
            </View>
            <View style={styles.signUpTextStyle}>
              <TextInput
                placeholder={this.state.EnterYourEmail}
                onChangeText={UserEmail => this.setState({ UserEmail })}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.signUpTextStyle}>
              <TextInput
                placeholder={this.state.EnterYourPassword}
                onChangeText={UserPassword => this.setState({ UserPassword })}
                secureTextEntry={true}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.signUpTextStyle}>
              <TextInput
                placeholder={this.state.EnterFirstName}
                onChangeText={UserFname => this.setState({ UserFname })}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.signUpTextStyle}>
              <TextInput
                placeholder={this.state.EnterLastName}
                onChangeText={UserLname => this.setState({ UserLname })}
                style={styles.inputStyle}
              />
            </View>
            <View style={styles.signUpTextStyle}>
              <TextInput
                placeholder={this.state.EnterUserCity}
                onChangeText={UserCity => this.setState({ UserCity })}
                style={styles.inputStyle}
              />
            </View>
            <View style={{ width: 150, paddingLeft: 10 }}>
              <Text style={styles.questionText}>
                {this.state.EnterUserRole}
              </Text>
              <Picker
                style={styles.pickerText}
                selectedValue={this.state.UserRole}
                onValueChange={this.updateUserRole}
              >
                <Picker.Item label={this.state.TextUser} value="User" />
                <Picker.Item label={this.state.TextAdmin} value="Admin" />
              </Picker>
            </View>
            <View style={{ width: 400, paddingLeft: 30 }}>
              <Text style={styles.questionText}>
                {this.state.TextUserRelation}
              </Text>
              <Picker
                style={styles.pickerText}
                selectedValue={this.state.UserRelationship}
                onValueChange={this.updateUserRelationship}
              >
                <Picker.Item label={this.state.TextLives} value="Lives" />
                <Picker.Item label={this.state.TextWorks} value="Works" />
                <Picker.Item
                  label={this.state.TextInTransit}
                  value="In-Transit"
                />
              </Picker>
            </View>

            <TouchableOpacity
              onPress={this.UserRegistrationFunction}
              style={styles.userButton}
            >
              <Text style={styles.buttonText}>{this.state.TextSubmit}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#003f5c"
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
    justifyContent: "center",
    marginTop: 5,
    color: "white",
    fontSize: 20
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
