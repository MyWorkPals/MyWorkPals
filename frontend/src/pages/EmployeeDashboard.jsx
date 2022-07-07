import React from "react";
import TodoList from "./TodoList";
import Announcements from "../components/Announcements";

function EmployeeDashboard() {
  return (
    <>
      <h1>EmployeeDashboard</h1>
      <TodoList />
      <Announcements />
    </>
  );
}

export default EmployeeDashboard;
