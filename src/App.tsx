import DefaultLayout from './components/layout/DefaultLayout';

const App = () => {
  return (
    <div className="min-h-screen bg-[#e5e7eb] flex justify-center">
      <div className="min-h-screen w-[393px] overflow-hidden bg-white">
        <DefaultLayout />
      </div>
    </div>
  );
};

export default App;