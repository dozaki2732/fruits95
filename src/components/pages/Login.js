import React from "react";
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  Toolbar,
  TextArea,
  TextField,
} from "react95";
import { withRouter } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import hash from "object-hash";
import classnames from "classnames";
import SignUp from "../ui/SignUp";

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

  checkHasLocalPart(passwordInput, emailInput) {
    const localPart = emailInput.split("@")[0];
    console.log(localPart);
    if (localPart === "") return false;
    else if (localPart.length < 4) return false;
    else return passwordInput.includes(localPart);
    //.includes will return a true or false
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
    const uniqChars = [...new Set(passwordInput)];
    if (passwordInput === "") {
      this.setState({
        passwordError: "Please create a password.",
        hasPasswordError: true,
      });
    } else if (passwordInput.length < 9) {
      this.setState({
        passwordError: "Your password must be at least 9 characters.",
        hasPasswordError: true,
      });
    } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
      this.setState({
        passwordError:
          "FOR YOUR SAFETY, Your password cannot contain your email address.",
        hasPasswordError: true,
      });
    } else if (uniqChars.length < 3) {
      this.setState({
        passwordError: "password must containe at least 3 unique characters",
        hasPasswordError: true,
      });
    } else {
      this.setState({ passwordError: "", hasPasswordError: false });
    }
  }

  async validateAndCreateUser() {
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
      console.log(user);
      this.props.history.push("/home-page");
    }
  }

  render() {
    return (
      <div>
        <Window style={{ width: 400 }}>
          <WindowHeader
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
          <Toolbar>
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
              <p>if you already have an account, please login </p>
              <div className="row">
                <div className="col-4">
                  <label className="" htmlFor="email">
                    Email address
                  </label>

                  <TextField
                    type="email"
                    id="email-input"
                    className={classnames({
                      "form-control": true,
                      "is-invalid": this.state.hasEmailError,
                    })}
                  />
                  {this.state.hasEmailError !== "" && (
                    <p className="text-danger">{this.state.emailError}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <label className="input-text text-muted" htmlFor="password">
                  Password
                </label>
                <TextField
                  type="password"
                  id="password-input"
                  className={classnames({
                    "form-control": true,
                    "mb-2": true,
                    "is-invalid": this.state.hasPasswordError,
                  })}
                />
                {this.state.hasPasswordError && (
                  <p className="text-danger">{this.state.passwordError}</p>
                )}
              </div>
              <Button
                onClick={() => {
                  this.validateAndCreateUser();
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

export default withRouter(Login);
