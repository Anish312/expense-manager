import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./views/auth/signUp/SignUp";
import SignIn from "./views/auth/signIn/SignIn";
import authService from "./service/authService";
import Home from "./views/home/Home";
import { storage, auth } from "./db/firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, setUser } from "./redux/authSlice";
import Header from "./component/header/Header";
import GetStarted from "./views/getStarted/GetStarted";
import Dashboard from "./views/dashboard/Dashboard";
import AddSalary from "./views/addSalary/AddSalary";
import AddExpense from "./views/addExpense/AddExpense";
import AddCategory from "./views/addCategory/AddCategory";
import Footer from "./component/footer/Footer";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
       
        dispatch(
          setUser({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
  }, []);


 
//  console.log(user); 
  return (
    <Router>
      <div className="app"> 
        <Header />
       
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addSalary" element={<AddSalary  />} />
          <Route path="/addExpense" element={<AddExpense  />} />
          <Route path="/addCategory" element={<AddCategory  />} />

        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
