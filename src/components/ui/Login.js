import React from "react";
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  Toolbar,
  TextField,
  Fieldset,
} from "react95";
import { withRouter } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import hash from "object-hash";
import SignUp from "./SignUp";
import warning from "../../style/icons/warning.png";
import "../../style/style.css";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";
import loginIcon from "../../style/icons/Login1.png";
import logo from "../../style/icons/logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayingSignUp: false,
      emailError: "",
      passwordError: "",
      hasEmailError: false,
    };
  }

  showSignUp() {
    this.setState({
      isDisplayingSignUp: true,
    });
  }

  async setEmailState(emailInput) {
    const loweredCasedEmailInput = emailInput.toLowerCase();
    //eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput === "") {
      this.setState({
        emailError: "Please enter your email address",
        hasEmailError: true,
      });
    } //changing the state from empty string to string of error message
    else if (emailRegex.test(loweredCasedEmailInput) === false) {
      this.setState({
        emailError: "Please enter a valid email address",
        hasEmailError: true,
      });
    } else {
      this.setState({ emailError: "", hasEmailError: false }); //if it passes both tests, set state back to empty string and indiciate no email error (false)
    }
  }

  async setPasswordState(passwordInput, emailInput) {
    if (passwordInput === "") {
      this.setState({
        passwordError: "Please create a password.",
        hasPasswordError: true,
      });
    } else {
      this.setState({ passwordError: "", hasPasswordError: false });
    }
  }

  async validateAndLogUser() {
    const emailInput = document.getElementById("email-input").value;
    const passwordInput = document.getElementById("password-input").value;
    await this.setEmailState(emailInput);
    await this.setPasswordState(passwordInput, emailInput);
    if (
      this.state.hasEmailError === false &&
      this.state.hasPasswordError === false
    ) {
      const user = {
        id: getUuid(),
        email: emailInput,
        password: hash(passwordInput),
        createdAt: Date.now(),
      };
      console.log("created user object for POST", user);
      //mimic api response
      axios
        .get(
          "https://raw.githubusercontent.com/dozaki2732/fruits95/master/src/components/mock-data/user.json"
        )
        .then((res) => {
          const currentUser = res.data;
          console.log(currentUser);
          this.props.dispatch({
            type: actions.UPDATE_CURRENT_USER,
            payload: res.data,
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
      this.props.history.push("/home-page");
    }
  }

  render() {
    return (
      <div>
        <Window
          className="windowColoring"
          style={{ width: 800, marginLeft: "250px" }}
        >
          <WindowHeader
            className="windowTopBar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>ようこそ !</h2>
            <Button
              style={{ marginRight: "-6px", marginTop: "1px" }}
              size={"sm"}
              square
            >
              <span
                style={{ fontWeight: "bold", transform: "translateY(-1px)" }}
              >
                x
              </span>
            </Button>
          </WindowHeader>
          <Toolbar className="">
            {!this.state.isDisplayingSignUp && (
              <Button
                variant="menu"
                size="sm"
                onClick={() => {
                  this.showSignUp();
                }}
              >
                sign up for free
              </Button>
            )}
          </Toolbar>
          {this.state.isDisplayingSignUp && <SignUp />}

          {!this.state.isDisplayingSignUp && (
            <WindowContent>
              <div className="row">
                <div className="col-4">
                  <img
                    src={loginIcon}
                    alt=""
                    style={{ width: "70px", marginLeft: "50px" }}
                  />

                  {/* <img
                    src={logo}
                    style={{ imageRendering: "pixelated" }}
                    alt=""
                  /> */}
                </div>
                <p>if you already have an account, please login </p>
                <div className="col-4">
                  <label className="" htmlFor="email">
                    Email address
                  </label>

                  <TextField
                    className="white"
                    type="email"
                    id="email-input"
                    style={{ marginBottom: "20px", marginTop: 5 }}
                  />
                  {this.state.hasEmailError && (
                    <div>
                      <p style={{ color: "red" }}>
                        {this.state.emailError}
                        <img
                          src={warning}
                          alt=""
                          style={{ width: 25, marginLeft: 10 }}
                        />
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <label className="input-text text-muted" htmlFor="password">
                  Password
                </label>
                <TextField
                  className="white"
                  type="password"
                  id="password-input"
                  style={{ marginBottom: "20px", marginTop: 5 }}
                />
                {this.state.hasPasswordError && (
                  <div style={{}}>
                    <p style={{ color: "red" }}>
                      {this.state.passwordError}
                      <img
                        src={warning}
                        alt=""
                        style={{ width: 25, marginLeft: 10 }}
                      />
                    </p>
                  </div>
                )}
              </div>
              <Button
                style={{ width: 100 }}
                onClick={() => {
                  this.validateAndLogUser();
                }}
              >
                Log in
              </Button>
            </WindowContent>
          )}
        </Window>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(Login));
