import React from "react";
import { User } from "../../interfaces/interfaces";

interface IProps {
  loadUser: (data: User) => void;
  changeRoute: (route: string) => void;
}

interface IState {
  signinEmail: string;
  signinPassword: string;
}

class Signin extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      signinEmail: "",
      signinPassword: "",
    };
  }

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ signinEmail: event.target.value });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ signinPassword: event.target.value });
  };

  onSubmitSignin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword,
      }),
    })
      .then((response) => response.json())
      .then((data: User) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.changeRoute("home");
        }
      })
      .catch((error) => {
        alert("Server error occured try again.");
      });
  };

  render() {
    const { changeRoute } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <div>
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw4 ph0 mh0 black">Sign In</legend>
                <div className="mt3">
                  <label
                    className="db fw4 lh-copy f4 black"
                    htmlFor="email-address"
                  >
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw4 lh-copy f4 black" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer black fw4 f4 dib"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignin}
                />
              </div>
              <div className="lh-copy mt3 pointer">
                <p
                  onClick={() => changeRoute("Register")}
                  className="f4 link dim black db"
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </div>
      </article>
    );
  }
}

export default Signin;
