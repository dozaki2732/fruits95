import React from "react";
import transactions from "../mock-data/transactions";
import addDate from "date-fns/add";
import subtractDate from "date-fns/sub";
import toDisplayDate from "date-fns/format";
import RightArrow from "../../style/icons/chevron-right.svg";
import LeftArrow from "../../style/icons/chevron-left.svg";
import axios from "axios";
import logo from "../../style/icons/d02a9595-3a45-483c-8632-25d4c32d9530_200x200.png";
import { connect } from "react-redux";
import actions from "../../store/actions";

import {
  Window,
  WindowHeader,
  TableDataCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  Button,
  WindowContent,
  Fieldset,
} from "react95";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    axios
      .get(
        "https://raw.githubusercontent.com/dozaki2732/fruits95/master/src/components/mock-data/transactions.json?token=APJWHCEAFYGNLLPS3GZNKOS7BTYT6"
      )
      .then(function (res) {
        // handle success
        console.log(res);
        props.dispatch({
          type: actions.DISPLAY_TRANSACTIONS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.state = {
      date: Date.now(),
      allTransactions: transactions,
      displayedTransactions: [],
      //user
    };
  }
  incrementMonth() {
    const newDate = addDate(this.state.date, { months: 1 });
    this.setState({ date: newDate }, () => {
      this.setDisplayedTransactions();
    });
  }

  decrementMonth() {
    const newDate = subtractDate(this.state.date, { months: 1 });
    this.setState({ date: newDate }, () => {
      this.setDisplayedTransactions();
    });
  }
  setDisplayedTransactions() {
    const transactions = [...this.state.allTransactions];
    const filteredTransactions = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    this.setState({ displayedTransactions: filteredTransactions });
  }

  render() {
    return (
      <>
        <div></div>
        <Window style={{ width: 700, backgroundColor: "#cdcece" }}>
          <WindowHeader
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#004498",
            }}
          >
            {toDisplayDate(this.state.date, "yyyy")}
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
          <Window style={{ backgroundColor: "#cdcece", marginTop: "25px" }}>
            <WindowHeader
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#003788",
              }}
            >
              <h3>you can do it!! </h3>
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
              <Fieldset style={{ width: 250, backgroundColor: "#FFFFFF" }}>
                <img src={logo} alt="" />
              </Fieldset>
            </WindowContent>
          </Window>

          <WindowContent>
            <Button> RECORD ENTRY </Button>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span onClick={() => this.decrementMonth()}>
                <img src={LeftArrow} width="30px" alt="" />
              </span>
              <h2 style={{ marginBottom: "20px" }}>
                {toDisplayDate(this.state.date, "MMMM")}
              </h2>
              <span onClick={() => this.incrementMonth()}>
                <img src={RightArrow} width="30px" alt="" />
              </span>
            </div>

            <Table style={{ backgroundColor: "#FFFFFF" }}>
              <TableHead>
                <TableRow head>
                  <TableHeadCell>date</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>amount </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.displayedTransactions.map((transaction) => {
                  return (
                    <>
                      <TableRow>
                        <TableDataCell style={{ textAlign: "center" }}>
                          {toDisplayDate(transaction.date, "MMM  dd,  yyyy")}
                        </TableDataCell>
                        <TableDataCell style={{ textAlign: "center" }}>
                          {transaction.category}
                        </TableDataCell>
                        <TableDataCell style={{ textAlign: "center" }}>
                          {transaction.amount}
                        </TableDataCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </WindowContent>
        </Window>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    displayedTransactions: state.displayedTransactions,
  };
}

export default connect(mapStateToProps)(HomePage);
