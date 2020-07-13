import React from "react";
import transactions from "../mock-data/transactions";
import addDate from "date-fns/add";
import subtractDate from "date-fns/sub";
import toDisplayDate from "date-fns/format";
import RightArrow from "../../style/icons/chevron-right.svg";
import LeftArrow from "../../style/icons/chevron-left.svg";

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
} from "react95";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      allTransactions: transactions,
      displayedTransactions: [],
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
        <Window style={{ width: 400 }}>
          <WindowHeader
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {toDisplayDate(this.state.date, "yyyy")}{" "}
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
            </Button>{" "}
          </WindowHeader>
          <WindowContent>
            <WindowContent>
              <span onClick={() => this.decrementMonth()}>
                <img src={LeftArrow} width="30px" alt="" />
              </span>
              <h2> {toDisplayDate(this.state.date, "MMMM")}</h2>{" "}
              <span onClick={() => this.incrementMonth()}>
                <img src={RightArrow} width="30px" alt="" />
              </span>
              <Table>
                <TableHead>
                  <TableRow head>
                    <TableHeadCell style={{ width: 100 }}>date</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>amount </TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {this.state.displayedTransactions.map((transaction) => {
                      return (
                        <>
                          {toDisplayDate(transaction.date, "MMM  dd,  yyyy")}

                          {transaction.category}

                          {transaction.amount}
                        </>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
              <Button> RECORD ENTRY </Button>
            </WindowContent>
          </WindowContent>
        </Window>
      </>
    );
  }
}
