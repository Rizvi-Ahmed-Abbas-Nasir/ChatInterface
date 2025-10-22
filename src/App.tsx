import "./App.css";
import SlideShow from "./components/FontPage";
import MainPage from "./components/MainPage";
import FadeUp from "./components/FadeUpRevelText";
import RikoPer from "./components/RikoPer";
import RikoTimeline from './components/Timeline';
import StackReUsableCom from "./components/CarouselReUsableCom";
import MultiContainer from "./components/MultiContainer";
import PricingPreview from "./components/PricingCard";
import LoopResuable from "./components/LoopResuable";
import Footer from "./components/Footer";

function App() {



  return (
    <div className=" w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="snap-center h-screen flex items-center justify-center bg-blue-100">
        <SlideShow />
      </section>

      <section className="snap-start h-screen flex-col bg-white text-gray-800 flex justify-center items-start ">
        <div className=" flex justify-baseline pl-12 w-full  ">
          <MainPage />
        </div>
        <div className="w-full lg:w-auto">
          <FadeUp />
        </div>
      </section>
      
      <section className="snap-center h-screen w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
        <RikoPer />
      </section>
      <section className="snap-center h-screen w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className="min-h-screen  text-white">
      <RikoTimeline  />
    </div>
      </section>
       <section className="snap-center h-screen w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className=" w-full  text-white">
          
      <StackReUsableCom  />
    </div>
      </section>
       <section className="snap-center w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className=" w-full  text-white">
      <MultiContainer  />
   </div>
      </section>
       <section className="snap-center w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className=" w-full  text-white">
      <PricingPreview  />
   </div>
      </section>
      <section className="snap-center w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className=" w-[50%]  text-white">
      <LoopResuable  />
   </div>
      </section>
       <section className="snap-center w-full flex-col bg-white text-gray-800 flex justify-center items-center ">
         <div className=" w-[100%]  text-white">
      <Footer  />
   </div>
      </section>
      
    </div>
  );
}

export default App;
