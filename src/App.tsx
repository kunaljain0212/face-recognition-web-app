import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import "./App.css";
import { ApiDataArray, ImageBoxArray, User } from "./interfaces/interfaces";
import { options } from "./utils/particles";

interface IProps {}

interface IState {
  input: string;
  imageURL: string;
  box: ImageBoxArray;
  route: string;
  isSignedIn: boolean;
  user: User;
}

const particlesParameters = options;

const initialState: IState = {
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
  },
};

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data: User) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
      },
    });
  };

  boxCordinates = (data: ApiDataArray) => {
    const boxCordi = data.map((value) => {
      return value.region_info.bounding_box;
    });
    // console.log(cordi);
    const image = document.getElementById("userImage") as HTMLImageElement;
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

  displayFaceBox = (box: ImageBoxArray) => {
    this.setState({ box: box });
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({
      imageURL: this.state.input,
    });
    const inputBar = document.getElementById("inputBar") as HTMLInputElement;
    inputBar.value = "";
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
            .then((data: number) => {
              this.setState({
                ...this.state,
                user: {
                  id: this.state.user.id,
                  email: this.state.user.email,
                  name: this.state.user.name,
                  entries: data,
                },
              });
            })
            .catch(console.log);
          // .catch(console.log);
        }
        this.displayFaceBox(
          this.boxCordinates(response.outputs[0].data.regions)
        );
      })
      .catch((err) => console.log(err));
  };

  changeRoute = (route: string) => {
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
