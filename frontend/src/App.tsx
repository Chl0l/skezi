import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ParkingList from "./components/ParkingList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ParkingList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
