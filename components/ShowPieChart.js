import React from "react";
import { StyleSheet, View } from "react-native";

import { PieChart } from "react-native-svg-charts";
import Svg, { Text } from 'react-native-svg';


export default class ShowPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countStatusNew: "",
      countStatusInProgress: "",
      countStatusCompleted: "",
      countStatusYes:"",
      countStatusNo:""
    };

    {
      this.UserRegistrationFunction();
      this.UserStatus();
    }
  }
  UserRegistrationFunction = () => {
    const { UserEmail } = this.state;
    fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/Getdata.php", {
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
        console.log(JSON.stringify(responseJson));
        this.setState({ countStatusCompleted: responseJson[0].Count });
        this.setState({ countStatusInProgress: responseJson[1].Count });
        this.setState({ countStatusNew: responseJson[2].Count });

        console.log("response is: ", responseJson[2].Count);
        console.log(
          "countStatusNew ",
          JSON.stringify(this.state.countStatusNew)
        );
      })
      .catch(error => {
        console.error(error);
      });
  };



  UserStatus = () => {
    const { UserEmail } = this.state;
    fetch("http://poojajeergyal.uta.cloud/Whats_up_city/api/Getdata2.php", {
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
        console.log(JSON.stringify(responseJson));
        this.setState({ countStatusYes: responseJson[0].Count });
        this.setState({ countStatusNo: responseJson[1].Count });
        

        console.log("Anonimity Status check for YES: ", responseJson[0].Count);
        console.log("Anonimity Status check for NO: ", responseJson[1].Count);

      })
      .catch(error => {
        console.error(error);
      });
  };



  render() {
    const data = [
      {
        key: 1,
        value: "New",
        amount: this.state.countStatusNew,
        svg: { fill: "orange" }
      },
      {
        key: 2,
        value: "InProgress",
        amount: this.state.countStatusInProgress,
        svg: { fill: "green" }
      },
      {
        key: 3,
        value: "Completed",
        amount: this.state.countStatusCompleted,
        svg: { fill: "grey" }
      }
    ];
    const data1 = [
      {
        key: 1,
        value: "Yes",
        amount: this.state.countStatusYes,
        svg: { fill: "green" }
      },
      {
        key: 2,
        value: "No",
        amount: this.state.countStatusNo,
        svg: { fill: "red" }
      }
    ];

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={"black"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={14}
            stroke={"black"}
            strokeWidth={0.2}
          >
            {data.value + "(" + data.amount + ")"}
          </Text>
        );
      });
    };


    const Labels1 = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            Chart-2
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={"black"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={14}
            stroke={"black"}
            strokeWidth={0.2}
          >
            {data.value + "(" + data.amount + ")"}
          </Text>
        );
      });
    };

    return (
      <View>
        <Svg height="30" width="200">
          <Text
            style={{ marginTop:25}}
            fill="black"
            stroke="black"
            fontSize="20"
            fontWeight="light"
            x="100"
            y="20"
            textAnchor="middle"
          > 
            Status of complaints:
          </Text>
        </Svg>
      <PieChart 
          style={{ height: 230, marginTop:0 }}
          valueAccessor={({ item }) => item.amount}
          data={data}
          spacing={0}
          outerRadius={"100%"}
        >
          <Labels />
        </PieChart>
        <Svg height="70" width="200">
          <Text
            fill="black"
            stroke="black"
            fontSize="20"
            fontWeight="light"
            x="100"
            y="20"
            textAnchor="middle"
          >
           Anonymity of users: 
          </Text>
        </Svg>
        
        <PieChart 
        style={{ height: 230, marginTop:0 }}
        valueAccessor={({ item }) => { console.log(item);return item.amount}}
        
        data={data1}
        spacing={0}
        outerRadius={"100%"}
      >
        <Labels1 />
      </PieChart>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0
  },
  text: {
    marginTop: 15,
    color: "white",
    fontSize: 20
  },
  questionText: {
    marginTop: 15,
    color: "white",
    fontSize: 20
  }
});