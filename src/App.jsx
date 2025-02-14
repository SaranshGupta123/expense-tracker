import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { MdWorkHistory } from "react-icons/md";
import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modaltype, setModalType] = useState("");
  const [expenses, setexpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || [] 
  );
  const [receives, setreceives] = useState(
    JSON.parse(localStorage.getItem("receives")) || [] 
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("receives", JSON.stringify(receives)); 
  }, [receives]);
  const onExpenseClick = ()=>{
    setModalOpen(true);
    setModalType("expense");
  };
  const onReceiveClick = ()=>{
    setModalOpen(true);
    setModalType("receive");
  };

  const Expensehandler = (discription, amount) => {
    const newExpense = {
      id: uniqid(),
      type: "expense",
      amount: amount,
      discription: discription,
    };

    setexpenses((prevExpenses) => [...prevExpenses, newExpense]); 
  };

  const receivehandler = (discription, amount) => {
    const newReceive = {
      id: uniqid(),
      type: "receive",
      amount: amount,
      discription: discription,
    };

    setreceives((prevReceives) => [...prevReceives, newReceive]); 
  };

  const RemoveTransection = (type, id) => {
    if (type === "expense") {
      setexpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id)); 
    } else if (type === "receive") {
      setreceives((prevReceives) => prevReceives.filter((receive) => receive.id !== id)); 
    }
  };

  const transactions = [...expenses, ...receives];
  console.log("Transactions", transactions);
  return (
    <>
      <div className="App">
        <Header />
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modaltype={modaltype}
          Expensehandler={Expensehandler}
          receivehandler={receivehandler}
        />
        <div className="content">
          <div className="boxes">
            <div className="box-expense" onClick={onExpenseClick}>
              <GiPayMoney size={100} color="red" /> Expense{" "}
            </div>
            <div className="box-receive" onClick={onReceiveClick}>
              
              <GiReceiveMoney size={100} color="green" /> Receive{" "}
            </div>
          </div>
          <div className="transactions-body">
            
            {transactions.length > 0 ? (
              <h1>All Transactions</h1>
            ) : (
              <div className="no-transactions">
                <MdWorkHistory size={100} color="yellow" /> No Transactions{" "}
              </div>
            )}
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                style={{
                  width: "60%",
                  minHeight: "50px",
                  padding: "10px",
                  background: transaction.type === "expense" ? "red" : "green",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  borderRadius: "10px",
                  justifyContent: "space-between",
                  fontSize: "24px",
                }}
                onClick={() =>
                  RemoveTransection(transaction.type, transaction.id)
                }
              >
                <div>{transaction.discription}</div>
                <div>{transaction.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
