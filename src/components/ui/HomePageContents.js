import React from "react";
import addDate from "date-fns/add";
import subtractDate from "date-fns/sub";
import toDisplayDate from "date-fns/format";
import RightArrow from "../../style/icons/chevron-right.svg";
import LeftArrow from "../../style/icons/chevron-left.svg";
import axios from "axios";
import logo from "../../style/icons/logo.png";
import { connect } from "react-redux";
import actions from "../../store/actions";
import recordEntryIcon from "../../style/icons/recordEntry.png";
import totalIncomeIcon from "../../style/icons/totalIncomeIcon.png";
import totalExpenseIcon from "../../style/icons/totalExpenseIcon.png";
import { Link } from "react-router-dom";
import balanceIcon from "../../style/icons/balanceIcone.png";
import "../../style/style.css";

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
  Cutout,
  Tooltip,
} from "react95";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      allTransactions: [],
      // displayedTransactions: [],
      displayedTotalExpenses: 0,
      displayedTotalIncome: 0,
      // incomeCategories: [],
      // expenseCategories: [],
      isDisplayingStats: false,
      currentBalance: 0,

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
          //   displayedTransactions: res.data,
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

    const filteredTransactions = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    this.setState({
      displayedTransactions: filteredTransactions,
      isDisplayingStats: true,
    });
  }

  gettingTotalBalance() {
    //expenses
    const transactions = [...this.props.transactions];
    const totalExpensesTrans = transactions.filter((transaction) => {
      if (transaction.type === "expense") {
        return transaction;
      }
      return 0;
    });
    const totalExpArr = [];
    const filteringExpArr = totalExpensesTrans.filter((transaction) => {
      return totalExpArr.push(transaction.amount);
    });
    const totalExpBalance = totalExpArr.reduce((a, b) => a + b, 0);

    console.log("look here", totalExpBalance);

    //income
    const totalIncomeTrans = transactions.filter((transaction) => {
      if (transaction.type === "income") {
        return transaction;
      }
      return 0;
    });
    const totalIncArr = [];
    const filteringIncArr = totalIncomeTrans.filter((transaction) => {
      return totalIncArr.push(transaction.amount);
    });
    const totalIncBalance = totalIncArr.reduce((a, b) => a + b, 0);

    console.log("look here", totalIncBalance);

    // creating formula
    const totalBalance = totalIncBalance - totalExpBalance;

    console.log(totalBalance);

    this.setState({
      currentBalance: totalBalance,
    });
  }

  gettingTotalExpenses() {
    const transactions = [...this.props.transactions];
    const transFilterByTime = transactions.filter((transaction) => {
      const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      //want it to look like "202007"
      return selectedYearMonth === transactionYearMonth;
    });
    let transAmount = [];
    const totalExpenseTransArray = transFilterByTime.filter((transaction) => {
      if (transaction.type === "expense") {
        transAmount.push(transaction.amount);
        return transAmount;
      }
    });
    const totalMonthlyExpenses = transAmount.reduce((a, b) => a + b, 0);
    // const mappingExp = totalExpenseTransArray.map((transaction) => {
    //   categoryArr.push(transaction.category);
    // });

    const totalExpenseNum = transactions.filter((transaction) => {
      if (transaction.type === "expense") {
        transAmount.push(transaction.amount);
        return transAmount;
      }
    });

    const totalAmount = transAmount.reduce((a, b) => a + b, 0);

    const percentageThatIsSpent =
      ((totalMonthlyExpenses / totalAmount) * 100).toFixed(2) + "%";

    console.log("this", transAmount, percentageThatIsSpent);

    // const totalExpenses = transactions.filter((transaction) => {
    //   return transaction.amount.reduce((a, b) => a + b, 0);
    // });

    // const filteredIn

    this.setState({
      displayedTotalExpenses: totalMonthlyExpenses,
      percentageSpent: percentageThatIsSpent,
    });
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
      return transAmount;
    });
    const totalIncome = transAmount.reduce((a, b) => a + b, 0);
    const displayedCategories = totalIncomeArray.map((transaction) => {
      return transaction.category;
    });

    this.setState({
      displayedTotalIncome: totalIncome,
      incomeCategories: displayedCategories,
    });
  }

  render() {
    return (
      <div>
        {/* logo window  */}

        <Window
          className="windowColoring"
          style={{ width: "345px", position: "absolute", marginLeft: "75px" }}
        >
          <WindowHeader
            className="windowTopBar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            よくできました
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
                variant="menu"
                size="sm"
                onClick={() => {
                  this.logOutCurrentUser();
                }}
              >
                logout
              </Button>
            </Link>
          </Toolbar>
          <WindowContent>
            <Fieldset
              variant="flat"
              style={{
                width: 250,
                backgroundColor: "#FFFFFF",
                borderOutline: "#717171",
              }}
            >
              <img src={logo} style={{ imageRendering: "pixelated" }} alt="" />
            </Fieldset>
          </WindowContent>
        </Window>

        {/* BALANCE WINDOW */}
        <Window
          className="windowColoring"
          style={{
            marginTop: "450px",
            marginLeft: "50px",
            position: "relative",
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
            <div>
              <Link to="/record-entry">
                <figure>
                  <img src={recordEntryIcon} alt="" style={{ width: "45px" }} />
                  <figcaption>RECORD ENTRY</figcaption>
                </figure>
              </Link>
              <div>
                <label style={{ color: "black", fontSize: "25px" }}>
                  BALANCE:
                </label>
                <img
                  src={balanceIcon}
                  alt=""
                  onClick={() => {
                    this.gettingTotalBalance();
                  }}
                  style={{ width: "50px", marginLeft: "75px" }}
                />

                <Cutout style={{ borderWidth: "1px", borderColor: "white" }}>
                  <h2>
                    {"$" + this.state.currentBalance.toFixed(2)} <br />
                  </h2>
                </Cutout>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <span onClick={() => this.decrementMonth()}>
                  <Button>
                    <img src={LeftArrow} width="40px" alt="" />
                  </Button>
                </span>
                <Cutout
                  style={{
                    borderWidth: "1px",
                    borderColor: "white",
                    width: "175px",
                    alignItems: "center",
                  }}
                >
                  <h1>{toDisplayDate(this.state.date, "MMMM")}</h1>
                </Cutout>
                <span onClick={() => this.incrementMonth()}>
                  <Button>
                    <img src={RightArrow} width="40px" alt="" />
                  </Button>
                </span>
              </div>
            </div>
          </WindowContent>
        </Window>

        {/* BUTTONS TO DISPLAY DATA  */}

        <Window style={{ marginLeft: "50px" }} className="windowColoring">
          <WindowHeader
            className="windowTopBar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            (ﾉ^ヮ^)ﾉ*:・ﾟ✧ STATS:
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
            <Fieldset style={{ borderWidth: "1px", borderColor: "white" }}>
              <div>
                <img
                  src={totalIncomeIcon}
                  alt=""
                  onClick={() => {
                    this.gettingTotalIncome();
                  }}
                />
                <label style={{ color: "black", fontSize: "25px" }}>
                  total income
                </label>
                <Cutout style={{ borderWidth: "1px", borderColor: "white" }}>
                  <h2>{"$" + this.state.displayedTotalIncome.toFixed(2)}</h2>
                </Cutout>
              </div>
              <div>
                <img
                  src={totalExpenseIcon}
                  alt=""
                  onClick={() => {
                    this.gettingTotalExpenses();
                  }}
                />
                <label style={{ color: "black", fontSize: "25px" }}>
                  total expense
                </label>
                <Cutout style={{ borderWidth: "1px", borderColor: "white" }}>
                  <h2>
                    {"$" + this.state.displayedTotalExpenses.toFixed(2)} <br />
                    {this.state.percentageThatIsSpent}
                  </h2>
                </Cutout>
              </div>
            </Fieldset>
          </WindowContent>
        </Window>

        {/* displaying month name and toggle buttons */}

        {/* table displaying transactions  */}

        {this.state.isDisplayingStats && (
          <Window
            className="windowColoring"
            style={{ width: 600, position: "absolute", marginLeft: "35px" }}
          >
            <WindowHeader
              className="windowTopBar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              total transactions !
              <Button
                style={{ marginRight: "-6px", marginTop: "1px" }}
                size={"sm"}
                square
                onClick={() => this.setState({ isDisplayingStats: false })}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    transform: "translateY(-1px)",
                  }}
                >
                  x
                </span>
              </Button>
            </WindowHeader>
            <WindowContent>
              <Table style={{ backgroundColor: "#FFFFFF" }}>
                <TableHead>
                  <TableRow head>
                    <TableHeadCell>date</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>amount</TableHeadCell>
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
                            {transaction.amount.toFixed(2)}
                          </TableDataCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </WindowContent>
          </Window>
        )}

        {/* 
        <AppBar style={{}}>
          <Toolbar>
            <Bar />
            <Button variant="menu">Edit</Button>
            <Button variant="menu" disabled>
              Save
            </Button>
            <Bar />
          </Toolbar>
        </AppBar> */}
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
