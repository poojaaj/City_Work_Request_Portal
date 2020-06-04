import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
  View
} from "react-native";

export default class SelectIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route.params.email,
      language: props.route.params.language,
      issue: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Muncipal Taxes", keySpanish: "Impuestos Municipales" },
            { key: "Economic Activity", keySpanish: "Actividad Económica" },
            { key: "Formal Employment", keySpanish: "Empleo Formal" },
            { key: "Informal Employment", keySpanish: "Empleo Informal" },
            { key: "Education", keySpanish: "Educación" },
            { key: "Electric Service", keySpanish: "Servicio Eléctrico" },
            { key: "Environment", keySpanish: "Medio ambiente" },
            {
              key: "Emergency and fire response",
              keySpanish: "Respuesta a emergencias e incendios"
            },
            {
              key: "Goverment-citizen relationship",
              keySpanish: "Relación gobierno-ciudadano"
            },
            { key: "Health", keySpanish: "Salud" },
            {
              key: "Recreation and Entertainment",
              keySpanish: "Recreación y Entretenimiento"
            },
            { key: "Security", keySpanish: "Seguridad" },
            {
              key: "Public Order and Citizen Coexistence",
              keySpanish: "Orden Público y Convivencia Ciudadana"
            },
            { key: "Urban planning", keySpanish: "Ordenamiento urbano" },
            { key: "Solid waste", keySpanish: "Residuos sólidos" },
            {
              key: "Telecommunications and innovation services",
              keySpanish: "Servicios de Telecomunicaciones e innovación"
            },
            { key: "Roads", keySpanish: "Vialidad" },
            { key: "Transportation", keySpanish: "Transporte" },
            { key: "Wastewater", keySpanish: "Aguas servidas" },
            { key: "Drains", keySpanish: "Drenajes" },
            {
              key: "Drinking-Water Service",
              keySpanish: "Servicio de Agua Potable"
            },
            {
              key: "Domestic Gas Service",
              keySpanish: "Servicio de Gas Doméstico"
            },
            { key: "Infrastructure", keySpanish: "Infraestructura" },
            { key: "Housing", keySpanish: "Vivienda" },
            { key: "Sports", keySpanish: "Deporte" },
            {
              key: "Culture, Traditions, and Identity",
              keySpanish: "Cultura, Tradiciones e Identidad"
            }
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableHighlight
                style={styles.normalButton}
                onPress={() => {
                  this.setState({ issue: item.key });
                  this.props.navigation.navigate("Map", {
                    email: this.state.email,
                    language: this.state.language,
                    issueData: item
                  });
                }}
              >
                {this.state.language == "English" ? (
                  <Text style={styles.itemStyles}>{item.key}</Text>
                ) : (
                  <Text style={styles.itemStyles}>{item.keySpanish}</Text>
                )}
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    // marginTop: 10,
    padding: 13,
    fontSize: 25,
    // height: 14
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  // selectedButton: {
  //   backgroundColor: "white"
  // },
  normalButton: {
    // backgroundColor: "#D7DDE9",
  },
  scrollView: {
    marginTop: 30,
    backgroundColor: "white",
    marginHorizontal: 20
  },
  // text: {
  //   fontSize: 25,
  //   margin: 2,
  //   textAlign: "left",
  //   padding: 5
  // },
  itemStyles: {
    fontSize: 23,
    color: "white"
  }
});
