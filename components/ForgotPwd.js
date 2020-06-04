import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'


export default class ForgotPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""            
        };
    }

    UserForgotPasswordFunction = () => {        
        const { email } = this.state;        
        
        // console.log(email)        

        fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/forgotPassword.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,                
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson === "Updated the password") {
                    Alert.alert("Updated the password! Please check your email for new password.");
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
            <View style={styles.viewStyles}>
                <Text style={styles.logoText}>Forgot Password</Text>

                {/* <Text style={styles.headingStyle}>Registered Email</Text> */}
                <View style={styles.loginAndPasswordView}>
                    <TextInput
                        type="outlined"
                        placeholder="Your Email"
                        placeholderTextColor="#ffff"
                        onChangeText={email => this.setState({ email })}
                        style={styles.inputStyle} />
                </View>                

                <TouchableOpacity 
                    style={styles.userButton}
                    onPress={this.UserForgotPasswordFunction}
                    >
                    <Text style={styles.buttonText} >
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    headingStyle: {
        // color: 'black',
        // fontSize: 18,
        //
        color: "white",
        fontSize: 20
    },
    inputStyle: {
        height: 50,
        color: "white",
        fontSize: 19,
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
    loginAndPasswordView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    }
});
