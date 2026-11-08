import { Footer } from "@/common/components/Footer/Footer";
import { useTheme } from "@/common/hooks/useTheme";
import { Header } from "../common/components";
import s from './App.module.css';
import { Routing } from "@/common/routing";

function App() {
  useTheme()

  return (
    <div className={s.layout}>
      <Header/>
      <Routing/>
      <Footer/>
    </div>
  )
}

export default App
