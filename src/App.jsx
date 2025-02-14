import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import React, { useState } from "react";
import uniqid from 'uniqid'
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modaltype , setModalType] = useState("");
  const[expenses , setexpenses] = useState([]);
  const[receives , setreceives] = useState([]);
  const onExpenseClick = ()=>{
    setModalOpen(true);
    setModalType("expense");
  }
  const onReceiveClick = ()=>{
    setModalOpen(true);
    setModalType("receive");
  }
  const Expensehandler = (discription , amount ) => {
    const oldExpenses = [...expenses];
    const newExpense = {
      id : uniqid(),
      type: "expense",
      amount : amount,
      discription : discription,
    };

    const newExpenses = oldExpenses.concat(newExpense);
    setexpenses(newExpenses);
  };
  const receivehandler = (discription , amount ) => {
    const oldReceive = [...receives];
    const newReceive = {
      id : uniqid(),
      type: "receive",
      amount : amount,
      discription : discription,
    };

    const newReceives = oldReceive.concat(newReceive);
    setreceives(newReceives);
  };

  const RemoveTransection = (type , id) => {
    if(type === "expense"){
      const oldExpenses = [...expenses];
      const newExpenses = oldExpenses.filter((expense)=>expense.id!== id);
      setexpenses(newExpenses);
    }
    if(type === "receive"){
      const oldReceive = [...receives];
      const newReceives = oldReceive.filter((receive)=>receive.id!== id);
      setreceives(newReceives);
    }
  }
  const transactions = [...expenses , ...receives];
  console.log("Transactions" , transactions);
  return (
    <>
      <div className="App">
        <Header />
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modaltype={modaltype} Expensehandler={Expensehandler} receivehandler={receivehandler}/>
        <div className="content">
          <div className="boxes">
            <div className="box-expense" onClick={onExpenseClick}>
              <GiPayMoney size={100} color="red" />
              Expense
            </div>
            <div className="box-receive" onClick={onReceiveClick}>
              <GiReceiveMoney size={100} color="green" />
              Receive
            </div>
          </div>
          <div className="transactions-body">
            <h1>All Transections</h1>
            {transactions.map((transaction)=>(
              <div key={transaction.id} style={{width: "60%", minHeight: "50px" , padding: "10px"  , background: transaction.type === "expense" ? "red" : "green" , display: "flex" , alignItems: "center", marginTop: "20px" , borderRadius: "10px", justifyContent: "space-between" , fontSize:"24px"}} onClick={()=>RemoveTransection(transaction.type , transaction.id)}>
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
