import React from "react";
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  NumberField,
  DatePicker,
  Select,
} from "react95";
import transactions from "../mock-data/transactions";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayingDatePicker: false,
    };
  }
  render() {
    return (
      <>
        <Window style={{ width: 400 }}>
          <WindowHeader
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Record Entry (*＾▽＾)／ </h2>
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
          <WindowContent>
            <p>amount</p>
            <NumberField value={10} onChange={(value) => console.log(value)} />
            <Button>Date</Button>
            <DatePicker onAccept={(date) => console.log(date)} />
            <p> category</p>
            <Select
              items={transactions.filter((transaction) => transaction.category)}
              width={150}
            />
          </WindowContent>
        </Window>
      </>
    );
  }
}
