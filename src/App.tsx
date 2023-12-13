import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "./App.css";
import Nav from "./components/Nav";
import Status from "./components/Status";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <Status />
        <TaskCard />
      </div>
    </Provider>
  );
}

export default App;
