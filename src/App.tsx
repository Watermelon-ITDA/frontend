import DefaultLayout from "./components/layout/DefaultLayout";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen bg-[#e5e7eb] flex justify-center">
      <div className="min-h-screen w-[393px] overflow-hidden bg-white">
        <Header />
        <DefaultLayout />
        <Footer />
      </div>
    </div>
  );
}

export default App;
