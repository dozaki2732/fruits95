import React from "react";
import warning from "../../style/icons/warning.png";
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  TextField,
} from "react95";
import { withRouter } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import hash from "object-hash";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplaying: false,
      emailError: "",
      passwordError: "",
      hasEmailError: false,
    };
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
      axios
        .get(
          "https://github.com/dozaki2732/fruits95/blob/master/src/components/mock-data/user.json"
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
        <Window className="windowColoring" style={{ width: 500 }}>
          <WindowHeader
            className="windowTopBar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>o((*^▽^*))o</h2>
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

          {!this.state.isDisplayingSignUp && (
            <WindowContent>
              <p>please enter : </p>
              <div className="row">
                <div className="col-4">
                  <label className="" htmlFor="email">
                    Email address
                  </label>

                  <TextField
                    style={{ backgroundColor: "white", marginTop: 10 }}
                    type="email"
                    id="email-input"
                  />
                  {this.state.hasEmailError !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{this.state.emailError}</p>
                      <img
                        src={warning}
                        alt=""
                        style={{ width: 25, marginLeft: 10 }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <label className="input-text text-muted" htmlFor="password">
                  Password
                </label>
                <TextField
                  style={{ backgroundColor: "white", marginTop: 10 }}
                  type="password"
                  id="password-input"
                />
                {this.state.hasPasswordError && (
                  <div>
                    <p style={{ color: "red" }}>{this.state.passwordError}</p>
                    <img
                      src={warning}
                      alt=""
                      style={{ width: 25, marginLeft: 10 }}
                    />
                  </div>
                )}
              </div>
              <Button
                style={{ marginTop: 20, width: 455 }}
                onClick={() => {
                  this.validateAndCreateUser();
                }}
              >
                Create Account
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

export default withRouter(connect(mapStateToProps)(SignUp));
