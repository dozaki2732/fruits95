import React from "react";
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  NumberField,
  TextField,
  Select,
  Tooltip,
  Toolbar,
} from "react95";
import { Link } from "react-router-dom";

export default class RecordEntryWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordingIncome: false,
      recordingExpense: true,
    };
  }

  displayDatePicker() {
    this.setState({
      isDisplayingDatePicker: true,
    });
  }

  entryVerification() {
    //use email login requirements
    //console log an object
  }

  render() {
    return (
      <>
        <div>
          <Window
            className="windowColoring"
            style={{ width: 400, marginLeft: "200px" }}
          >
            <WindowHeader
              className="windowTopBar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2>Record Entry (*＾▽＾) </h2>
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
              <Link to="/home-page">
                <Button
                  style={{ backgroundColor: "#cdcece" }}
                  variant="menu"
                  size="sm"
                >
                  back
                </Button>
              </Link>
            </Toolbar>
            <WindowContent>
              <div>
                <Tooltip
                  text="‍please enter either income or expense"
                  enterDelay={100}
                  leaveDelay={500}
                  style={{ backgroundColor: "white" }}
                >
                  <h3 style={{ marginBottom: "20px" }} disabled>
                    TYPE:
                  </h3>
                </Tooltip>
                <TextField
                  style={{ backgroundColor: "white", marginBottom: 50 }}
                  type="input"
                />
              </div>

              <div>
                <Tooltip
                  text="‍please enter the category of the transaction"
                  enterDelay={100}
                  leaveDelay={500}
                  style={{ backgroundColor: "white" }}
                >
                  <h3 style={{ marginBottom: "20px" }} disabled>
                    CATEGORY:
                  </h3>
                </Tooltip>
                <TextField
                  style={{ backgroundColor: "white", marginBottom: 50 }}
                  type="input"
                />
              </div>

              <div>
                <Tooltip
                  text="‍please select the date of the transaction"
                  enterDelay={100}
                  leaveDelay={500}
                  style={{ backgroundColor: "white" }}
                >
                  <h3 style={{ marginBottom: "20px" }} disabled>
                    DATE:
                  </h3>
                </Tooltip>
                <TextField
                  style={{ backgroundColor: "white", marginBottom: 50 }}
                  type="date"
                />
              </div>

              <div>
                <Tooltip
                  text="‍please select the date of the transaction"
                  enterDelay={100}
                  leaveDelay={500}
                  style={{ backgroundColor: "white" }}
                >
                  <h3 style={{ marginBottom: "20px" }} disabled>
                    AMOUNT:
                  </h3>
                </Tooltip>
                <TextField
                  style={{ backgroundColor: "white", marginBottom: 50 }}
                  type="number"
                />
              </div>

              {/* select buttons for categories  */}
            </WindowContent>
          </Window>
        </div>
      </>
    );
  }
}
