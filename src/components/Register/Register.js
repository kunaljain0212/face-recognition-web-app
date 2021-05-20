import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Name: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ Email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ Password: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ Name: event.target.value });
  };

  onRegister = () => {
    // console.log(this.state);
    // this.props.changeRoute("home")
    fetch(`${process.env.REACT_API_URL}/auth/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        name: this.state.Name,
      }),
    })
      .then((response) => response.json())
      .then(user =>{
        // console.log(user);
        if (user.id) {
          this.props.loadUser(user)
          this.props.changeRoute('home')
        }
      });
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <div>
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw4 ph0 mh0 black">Register</legend>
                <div className="mt3">
                  <label className="db fw4 lh-copy f4 black" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={this.onNameChange}
                    className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
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
                  value="Register"
                  onClick={this.onRegister}
                />
              </div>
            </div>
          </main>
        </div>
      </article>
    );
  }
}

export default Register;
