import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      language: "English",
      UserPassword: "",
      role: "User"
    };
  }

  UserLoginFunction = () => {
    const { email } = this.state;
    const { UserPassword } = this.state;

    fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/checkLogin.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: UserPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (
          responseJson.language === "English" ||
          responseJson.language === "Spanish"
        ) {
          this.props.navigation.navigate("Main", {
            email: this.state.email,
            language: responseJson.language,
            role: responseJson.role
          });
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <ImageBackground
          source={require("../Images/WhatsappLogin.jpeg")}
          style={styles.imageStyle}
        >
          <Text style={styles.logoText}>City Work Request</Text>
        </ImageBackground>
        <View style={styles.loginAndPasswordView}>
          <TextInput
            type="outlined"
            style={styles.inputUserName}
            placeholder="Email/Correo Electrónico"
            placeholderTextColor="#ffff"
            onChangeText={email => this.setState({ email })}
            // underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.loginAndPasswordView}>
          <TextInput
            style={styles.inputUserName}
            placeholder="Password/Contraseña"
            placeholderTextColor="#ffff"
            onChangeText={UserPassword => this.setState({ UserPassword })}
            // underlineColorAndroid="transparent"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ForgotPwd")}
        >
          <Text
            style={{
              // alignItems: "flex-start",
              // marginBottom: 20
              // fontFamily: 'Savoye LET'
              color: "white",
              fontSize: 20
            }}
          >
            Forgot Password / Olvidó Contraseña?
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.UserLoginFunction}
            style={styles.userButton}
          >
            <Text style={styles.buttonText}>Login/ Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("GoogleLogIn")}
            style={styles.userButtonGoogle}
          >
            <Text style={styles.buttonText}>
              Login with /Inicia sesión con- Google
            </Text>
          </TouchableOpacity>

          {/* <Text style={styles.orText}>---- OR ----</Text> */}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            // style={styles.signUpStyle}
          >
            <Text style={styles.signUpStyle}>SignUp/Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 0
  },
  loginAndPasswordView: {
    // alignItems: "center",
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputUserName: {
    height: 50,
    color: "white",
    fontSize: 19
  },
  inputPassword: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  imageStyle: {
    marginTop: 0,
    width: "100%",
    resizeMode: "contain",
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  userButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  userButtonGoogle: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 17
  },
  orText: {
    textAlign: "center",
    padding: 20
  },
  signUpStyle: {
    color: "white",
    marginTop: 10,
    fontSize: 20
  }
});
