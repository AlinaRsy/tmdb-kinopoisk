import { Footer } from "@/common/components/Footer/Footer";
import { useTheme } from "@/common/hooks/useTheme";
import { Routing } from "@/common/routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Header, LinearProgress } from "../common/components";
import s from "./App.module.css";
import { useGlobalLoading } from "@/common/hooks";
function App() {
  useTheme();
  const isGlobalLoading = useGlobalLoading();
  return (
    <>
      <div className={s.layout}>
        <Header />
        {isGlobalLoading && <LinearProgress/>}
        <Routing />
        <Footer />
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
