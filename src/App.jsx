import Header from "./components/Header";
import Footer from "./components/Footer";
import { MdWorkHistory } from "react-icons/md";
import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap'; 

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modaltype, setModalType] = useState("");
  const [expenses, setexpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [receives, setreceives] = useState(
    JSON.parse(localStorage.getItem("receives")) || []
  );
  const [Discriptions, setDiscriptions] = useState("");
  const [Amount, setAmount] = useState("");


  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("receives", JSON.stringify(receives));
  }, [receives]);

  const onExpenseClick = () => {
    setModalOpen(true);
    setModalType("expense");
    setDiscriptions(""); 
    setAmount("");
  };

  const onReceiveClick = () => {
    setModalOpen(true);
    setModalType("receive");
    setDiscriptions(""); 
    setAmount("");
  };

  const Expensehandler = (discription, amount) => {
    if (typeof discription !== 'string' || isNaN(Number(amount))) {
      alert("Invalid input. Description must be text and amount must be a number.");
      return;
    }
    const newExpense = {
      id: uniqid(),
      type: "expense",
      amount: amount,
      discription: discription,
      date: new Date(),
    };

    setexpenses((prevExpenses) => [...prevExpenses, newExpense].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const receivehandler = (discription, amount) => {
    if (typeof discription !== 'string' || isNaN(Number(amount))) {
      alert("Invalid input. Description must be text and amount must be a number.");
      return;
    }
    const newReceive = {
      id: uniqid(),
      type: "receive",
      amount: amount,
      discription: discription,
      date: new Date(),
    };

    setreceives((prevReceives) => [...prevReceives, newReceive].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const RemoveTransection = (type, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");

    if (confirmDelete) {
      if (type === "expense") {
        setexpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      } else if (type === "receive") {
        setreceives((prevReceives) => prevReceives.filter((receive) => receive.id !== id));
      }
    }
  };

  const transactions = [...expenses, ...receives].sort((a, b) => new Date(b.date) - new Date(a.date));
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCloseModal = () => setModalOpen(false);
  const handleSave = () => {
    if (!Discriptions || !Amount) {
      return;
    }
    if (modaltype === "expense") {
      Expensehandler(Discriptions, Amount);
    }
    if (modaltype === "receive") {
      receivehandler(Discriptions, Amount);
    }
    setModalOpen(false);
    setDiscriptions("");
    setAmount("");
  };

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
              <><h1>All Transactions</h1><div className="transaction-header">
                <div className="transaction-header-item">Transaction Name</div>
                <div className="transaction-header-item">Amount</div>
                <div className="transaction-header-item">Date</div>
              </div></>
            ) : (
              <div className="no-transactions">
                <MdWorkHistory size={100} color="yellow" /> No Transactions{" "}
              </div>
            )}
            {transactions.map((transaction) => (
              <div
              key={transaction.id}
              className="transaction-item"
              style={{
                width: "80%",
                minHeight: "50px",
                padding: "10px",
                background: transaction.type === "expense" ? "red" : "green",
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                borderRadius: "10px",
                justifyContent: "space-between",
                fontSize: "24px",
                position: "relative",
              }}
            >
              <div>{transaction.discription}</div>
              <div className="transaction-amount">{transaction.amount}</div>
              <div className="transaction-date">{formatDate(transaction.date)}</div>
              <RiDeleteBinLine
                className="delete-icon" 
                size={24}
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  RemoveTransection(transaction.type, transaction.id);
                }}
              />
            </div>
          ))}
        </div>
        </div>
        <Modal show={modalOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modaltype === "expense" ? "Add Expense" : "Add Receive"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Description"
              value={Discriptions}
              onChange={(e) => setDiscriptions(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Amount"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button> {}
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button> {}
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    </>
  );
}

export default App;
