import AddingTodo from "./components/AddingTodo";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import SeeTodo from "./components/SeeTodo";

function App() {
  return (
    <BrowserRouter>
    <Header/>

    <Routes>

      <Route index element={<AddingTodo/>} />
      <Route path="/seeTodo"  element={<SeeTodo/>}/>
    </Routes>   
    </BrowserRouter>
  );
}

export default App;
