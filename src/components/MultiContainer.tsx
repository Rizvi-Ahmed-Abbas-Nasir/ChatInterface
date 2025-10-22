import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  FiPhoneCall,
  FiInstagram,
  FiBarChart2,
  FiMonitor,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollToPlugin);

interface UseCase {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode; // ✅ alternative to JSX.Element
    color: string;
}

const UseCaseCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const useCases: UseCase[] = [
    {
      id: 1,
      title: "Launch Cold-Calling Campaign",
      description:
        "Start a cold-calling campaign in minutes with automated lead handling and instant scripts.",
      icon: <FiPhoneCall className="w-10 h-10" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 2,
      title: "Social Media Content",
      description:
        "Create 30 days of high-converting social media posts tailored to your brand voice.",
      icon: <FiInstagram className="w-10 h-10" />,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 3,
      title: "Pitch Deck Design",
      description:
        "Design an investor-ready pitch deck overnight with automated visuals and layouts.",
      icon: <FiMonitor className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 4,
      title: "Competitor Analysis",
      description:
        "Analyze your competitors and get actionable insights and strategies instantly.",
      icon: <FiBarChart2 className="w-10 h-10" />,
      color: "from-green-400 to-teal-500",
    },
  ];

  // Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP animations triggered on scroll
  useEffect(() => {
    if (isVisible) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
          ".use-case-card",
          { opacity: 0, y: 80, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            stagger: 0.25,
            ease: "back.out(1.7)",
            delay: 0.4,
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [isVisible]);

  // Smooth auto-scroll using GSAP ScrollToPlugin
  useEffect(() => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    let index = 0;

    const scrollNext = () => {
      index = (index + 1) % useCases.length;
      const card = carousel.children[index] as HTMLElement;
      gsap.to(carousel, {
        scrollTo: { x: card.offsetLeft - carousel.offsetLeft },
        duration: 1.2,
        ease: "power2.inOut",
onComplete: () => {
  setTimeout(() => {
    scrollNext();
  }, 2000);
}
      });
      setCurrentIndex(index);
    };

    scrollNext();
  }, []);

  // Manual arrow scroll
  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scrollBy: { x: amount },
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  };

  const navigateTo = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[index] as HTMLElement;
      gsap.to(carouselRef.current, {
        scrollTo: { x: card.offsetLeft - carouselRef.current.offsetLeft },
        duration: 1,
        ease: "power2.inOut",
      });
      setCurrentIndex(index);
    }
  };
  const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

  return (
    <section ref={sectionRef} className="relative  mt-[-7rem] bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 relative z-10">
        <h2
          ref={titleRef}
          className="text-center text-4xl md:text-6xl font-extrabold text-gray-900 mb-20"
        >
          
        </h2>
  <div className="flex justify-center items-center mb-8">
          <SplitText
            text="What Can Do for You?"
            delay={200}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-6xl font-semibold italic text-black"
          />
        </div>

        {/* Arrows */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => scrollByAmount(-400)}
            className="p-3 bg-gray-100 rounded-full shadow hover:bg-indigo-100 transition"
          >
            <FiChevronLeft className="text-2xl text-gray-700" />
          </button>
          <button
            onClick={() => scrollByAmount(400)}
            className="p-3 bg-gray-100 rounded-full shadow hover:bg-indigo-100 transition"
          >
            <FiChevronRight className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Scrollable Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory gap-10 pb-6"
        >
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              onClick={() => navigateTo(index)}
              className="use-case-card min-w-[420px] h-[460px] bg-gray-50 border border-gray-200 rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-500 snap-start cursor-pointer flex flex-col justify-center items-center group"
            >
              <div
                className={`flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-br ${useCase.color} text-white shadow-lg`}
              >
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 opacity-90 group-hover:opacity-100 transition duration-500">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {useCases.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-indigo-600 scale-110"
                  : "bg-gray-300 hover:bg-indigo-300"
              }`}
              onClick={() => navigateTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Cloud Footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src="https://www.transparenttextures.com/patterns/cloudy.png"
          alt="Cloud texture"
          className="w-full opacity-40 select-none pointer-events-none"
        />
      </div>

      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[35rem] h-[35rem] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export default UseCaseCarousel;
