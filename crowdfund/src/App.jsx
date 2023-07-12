import { Routes, Route } from "react-router-dom";
import "./App.css";
import Web3ContextProvider from "./context/web3Context";
import Home from "./pages/Home";
import Header from "./components/header";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import { Campaigns } from "./pages/Campaigns";
import ViewCampaign from "./pages/ViewCampaign";

function App() {
  return (
    <>
      <Header />
      <Web3ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/campaigns" element={<Campaigns />}></Route>
          <Route path="/campaigns/:id" element={<ViewCampaign />}></Route>
        </Routes>
      </Web3ContextProvider>
      <Footer />
    </>
  );
}

export default App;
