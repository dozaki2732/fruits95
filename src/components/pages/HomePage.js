import React from "react";
import addDate from "date-fns/add";
import subtractDate from "date-fns/sub";
import toDisplayDate from "date-fns/format";
import RightArrow from "../../style/icons/chevron-right.svg";
import LeftArrow from "../../style/icons/chevron-left.svg";
import axios from "axios";
import logo from "../../style/icons/d02a9595-3a45-483c-8632-25d4c32d9530_200x200.png";
import { connect } from "react-redux";
import actions from "../../store/actions";
import "../../style/style.css";
import recordEntryIcon from "../../style/icons/recordEntry.png";
import totalIncomeIcon from "../../style/icons/totalIncomeIcon.png";
import totalExpenseIcon from "../../style/icons/totalExpenseIcon.png";
import SmallWindow from "../../components/ui/SmallWindow";
import { Link } from "react-router-dom";

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
  Toolbar,
} from "react95";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      allTransactions: [],
      displayedTransactions: [],
      isDisplayingTotalExpenseWindow: false,
      isDisplayingTotalIncomeWindow: false,
      displayedTotalExpenses: 0,
      displayedTotalIncome: 0,

      //user
    };
    axios
      .get(
        "https://raw.githubusercontent.com/dozaki2732/fruits95/master/src/components/mock-data/transactions.json"
      )
      .then((res) => {
        // handle success
        console.log(res.data);
        props.dispatch({
          type: actions.STORE_ALL_TRANSACTIONS,
          payload: res.data,
        });
        this.setState({
          allTransactions: res.data,
          displayedTransactions: res.data,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  //functions
  logOutCurrentUser() {
    this.props.dispatch({
      type: actions.UPDATE_CURRENT_USER,
      payload: {},
    });
  }

  displayTotalExpenseWindow() {
    this.setState({
      isDisplayingTotalExpenseWindow: true,
    });
  }
  displayTotalIncomeWindow() {
    this.setState({
      isDisplayingTotalIncomeWindow: true,
    });
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
    const transactions = [...this.props.transactions];
    console.log("these are the transaction youre looking for", transactions);

    const filteredTransactions = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    this.setState({ displayedTransactions: filteredTransactions });
  }

  gettingTotalExpenses() {
    const transactions = [...this.props.transactions];
    const filteredTransactions = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    const transAmount = [];
    const totalExpenseTransArray = filteredTransactions.filter(
      (transaction) => {
        if (transaction.type === "expense") {
          transAmount.push(transaction.amount);
          return transAmount;
        }
      }
    );
    const totalExpenses = transAmount.reduce((a, b) => a + b, 0);

    this.setState({ displayedTotalExpenses: totalExpenses });
  }

  gettingTotalIncome() {
    const transactions = [...this.props.transactions];
    const filteredTransactions = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    const transAmount = [];
    const totalIncomeArray = filteredTransactions.filter((transaction) => {
      if (transaction.type === "income") {
        transAmount.push(transaction.amount);
        return transAmount;
      }
    });
    const totalIncome = transAmount.reduce((a, b) => a + b, 0);

    console.log("total income", totalIncomeArray);

    this.setState({ displayedTotalExpenses: totalIncome });
  }

  render() {
    // const transactions = this.props.transactions[3];
    // console.log("found it", transactions);

    return (
      <div className="home-page-bg">
        <Window className="windowColoring" style={{ width: 700 }}>
          <WindowHeader
            className="windowTopBar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
          <Toolbar>
            <Link to="/">
              <Button
                style={{ backgroundColor: "#cdcece" }}
                variant="menu"
                size="sm"
                onClick={() => {
                  this.logOutCurrentUser();
                }}
              >
                logout
              </Button>
            </Link>
            <Button
              style={{ backgroundColor: "#cdcece" }}
              variant="menu"
              size="sm"
            >
              what is this?
            </Button>
          </Toolbar>

          {/* logo window  */}
          <Window
            style={{
              backgroundColor: "#cdcece",
              marginTop: 50,
              marginLeft: 20,
            }}
          >
            <WindowHeader
              className="windowTopBar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3> {toDisplayDate(Date.now(), "MMMM  dd,  yyyy")} </h3>
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

          {/* BUTTONS TO DISPLAY DATA  */}

          <WindowContent>
            <div style={{ display: "flex" }}>
              <Link to="/record-entry">
                <figure>
                  <img src={recordEntryIcon} alt="" />
                  <figcaption>RECORD ENTRY</figcaption>
                </figure>
              </Link>

              <figure>
                <img
                  src={totalIncomeIcon}
                  alt=""
                  onClick={() => {
                    this.gettingTotalIncome();
                  }}
                />
                <figcaption>TOTAL INCOME </figcaption>
              </figure>
              {this.state.isDisplayingTotalIncomeWindow && <div></div>}

              <h2>{this.state.displayedTotalIncome}</h2>
              <figure>
                <img
                  src={totalExpenseIcon}
                  alt=""
                  onClick={() => {
                    this.gettingTotalExpenses();
                  }}
                />
                <figcaption>TOTAL EXPENSE </figcaption>
              </figure>

              {this.state.isDisplayingTotalExpenseWindow && (
                <div>
                  <SmallWindow />
                </div>
              )}
            </div>
            <h2>{this.state.displayedTotalExpenses}</h2>

            {/* displaying month name and toggle buttons */}

            <div style={{ display: "flex", alignItems: "center" }}>
              <span onClick={() => this.decrementMonth()}>
                <img src={LeftArrow} width="30px" alt="" />
              </span>
              <h1 style={{ marginBottom: "20px" }}>
                {toDisplayDate(this.state.date, "MMMM")}
              </h1>
              <span onClick={() => this.incrementMonth()}>
                <img src={RightArrow} width="30px" alt="" />
              </span>
            </div>

            {/* table displaying transactions  */}

            <Table style={{ backgroundColor: "#FFFFFF" }}>
              <TableHead>
                <TableRow head>
                  <TableHeadCell>date</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell
                    onClick={(e) => this.setOrder(e)}
                    value='[["amount"], ["desc"]]'
                  >
                    amount
                  </TableHeadCell>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
  };
}

export default connect(mapStateToProps)(HomePage);
