import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default class LoginRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmail: '',
            UserPassword: ''
        }
    }

    UserLoginFunction = () => {
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;

        fetch('http://poojajeergyal.uta.cloud/Whats_up_city/api/checkLogin.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: UserEmail,
                password: UserPassword
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'Data Matched') {
                    // this.props.navigation.navigate('Main')
                    this.props.navigation.navigate('MainProject');
                }
                else {
                    Alert.alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            });
    }   

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.TextComponentStyle}>User Login Form</Text>
                <TextInput
                    placeholder="Enter User Email"
                    onChangeText={UserEmail => this.setState({ UserEmail })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />

                <TextInput
                    placeholder="Enter User Password"
                    onChangeText={UserPassword => this.setState({ UserPassword })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />

                <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5,
    },

    TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
        marginBottom: 15
    }
});