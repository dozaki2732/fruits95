import React from "react";
import { Window, WindowHeader, Button, WindowContent } from "react95";

export default function SmallWindow(props) {
  return (
    <Window className="windowColoring" style={{ width: 500 }}>
      <WindowHeader
        className="windowTopBar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>{} </h3>
        <Button
          style={{ marginRight: "-6px", marginTop: "1px" }}
          size={"sm"}
          square
        >
          <span
            // onClick={!this.props.state}
            style={{ fontWeight: "bold", transform: "translateY(-1px)" }}
          >
            x
          </span>
        </Button>
      </WindowHeader>
      <WindowContent>
        <h2></h2>
      </WindowContent>
    </Window>
  );
}
