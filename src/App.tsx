import "./App.css";
import Header from "./components/inculdes/Header";
import Home from "./components/screen/Home";
import { Provider } from "react-redux";
import store from "./sotre/configure";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Home />
      </div>
    </Provider>
  );
}

export default App;
