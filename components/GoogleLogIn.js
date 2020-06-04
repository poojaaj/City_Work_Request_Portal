import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { androidClientId } from '../superSecretKey'
import * as Google from 'expo-google-app-auth'
import Main from './Main'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:"",
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: androidClientId,
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                console.log(result.user.email)
                this.setState({
                    signedIn: true,
                    email: result.user.email,
                    photoUrl: result.user.photoUrl
                })
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <Main navigation={this.props.navigation} email={this.state.email} />
                ) : (
                        <LoginPage signIn={this.signIn} />
                    )}
            </View>
        )
    }
}

const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})