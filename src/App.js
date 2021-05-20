import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import "./App.css";

const particlesParameters = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
  size: {
    value: 3,
  },
};

const initialState = {
  input: "",
  imageURL: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    registeredOn: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        registeredOn: data.registeredOn,
      },
    });
  };

  boxCordinates = (data) => {
    const boxCordi = data.outputs[0].data.regions.map((value) => {
      return value.region_info.bounding_box;
    });
    // console.log(cordi);
    const image = document.getElementById("userImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const cordi = boxCordi.map((value) => {
      return {
        leftCol: value.left_col * width,
        topRow: value.top_row * height,
        rightCol: width - value.right_col * width,
        bottomRow: height - value.bottom_row * height,
      };
    });
    return cordi;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({
      imageURL: this.state.input,
    });
    const inputBar = document.getElementById("inputBar");
    inputBar.value = "";
    // console.log('image' + this.state.imageURL);
    fetch(`${process.env.REACT_APP_API_URL}/image/apiCall`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response) {
          fetch(`${process.env.REACT_APP_API_URL}/image/updateEntries`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState(Object.assign(this.state.user, { entries: data }));
            })
            .catch(console.log);
          // .catch(console.log);
        }

        this.displayFaceBox(this.boxCordinates(response));
      })
      .catch((err) => console.log(err));
  };

  changeRoute = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true,
      });
    }
    this.setState({
      route: route,
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesParameters} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          changeRoute={this.changeRoute}
        />
        {this.state.route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} changeRoute={this.changeRoute} />
        ) : (
          <Register loadUser={this.loadUser} changeRoute={this.changeRoute} />
        )}
      </div>
    );
  }
}
export default App;
