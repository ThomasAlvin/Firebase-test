import logo from "./logo.svg";
import "./App.css";
import routes from "./routes/routes";
import { Routes } from "react-router-dom";

function App() {
  return <Routes>{routes.map((val) => val)}</Routes>;
}

export default App;
