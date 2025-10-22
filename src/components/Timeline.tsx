import React, { useState, useEffect, useRef } from "react";
import type { RefObject } from "react"; 
import { motion, AnimatePresence } from "motion/react";
import {
  FaBullseye,
  FaUpload,
  FaBolt,
  FaChartBar,
  FaPenFancy,
  FaUserFriends,
  FaChartLine,
  FaPalette,
  FaChess,
  FaShareAlt,
} from "react-icons/fa";
import SplitText from "./SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useInView = (
  ref: RefObject<HTMLElement | null>, 
  threshold = 0.2,
  rootMargin = "0px"
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as HTMLElement);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
};


gsap.registerPlugin(ScrollTrigger);

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

interface TimelineStep {
  id: string;
  step: string;
  title: string;
  description: string;
  examples?: string[];
  color: string;
  icon: React.ReactNode;
}

const RikoTimeline: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // ref array for the content boxes (the elements we actually animate)
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);

  const timelineSteps: TimelineStep[] = [
    {
      id: "step-1",
      step: "Step 1",
      title: "Choose Your Riko Side",
      description: "Select which specialized AI personality you need for your task",
      examples: [
        "Writer",
        "Connector",
        "Analyst",
        "Designer",
        "Strategist",
        "Social Media Manager",
      ],
      color: "purple",
      icon: <FaBullseye className="text-2xl" />,
    },
    {
      id: "step-2",
      step: "Step 2",
      title: "Upload Your Input",
      description:
        "Provide your data, text, brand information, or any required materials",
      examples: ["Numbers", "Text content", "Brand guidelines", "Data sets", "Images"],
      color: "blue",
      icon: <FaUpload className="text-2xl" />,
    },
    {
      id: "step-3",
      step: "Step 3",
      title: "Riko Executes Automatically",
      description:
        "Watch as Riko handles the task seamlessly without manual intervention",
      examples: [
        "Makes calls",
        "Sends emails",
        "Creates posts",
        "Generates content",
        "Analyzes data",
      ],
      color: "green",
      icon: <FaBolt className="text-2xl" />,
    },
    {
      id: "step-4",
      step: "Step 4",
      title: "Track & Download Results",
      description:
        "Monitor progress and access your completed work in the dashboard",
      examples: [
        "Real-time analytics",
        "Download files",
        "Performance reports",
        "Export data",
      ],
      color: "orange",
      icon: <FaChartBar className="text-2xl" />,
    },
  ];

  // GSAP + ScrollTrigger setup: one effect, scoped with gsap.context
 useEffect(() => {
  if (typeof window === "undefined") return; // ✅ Prevent SSR issues

  const ctx = gsap.context(() => {
    // ✅ Make sure refs exist
    const boxes = boxRefs.current.filter(Boolean);
    if (boxes.length === 0) return;

    boxes.forEach((box, idx) => {
      // Optional: Reset visibility before animation
      gsap.set(box, { opacity: 0, y: 100 });

      gsap.to(box, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: box,
          start: "top 85%", // when 85% of viewport reaches the element
          toggleActions: "play none none reverse",
          markers: false, // set to true to debug
          once: false, // change to true if you only want it once
        },
      });
    });

    ScrollTrigger.refresh();
  });

  // ✅ Cleanup
  return () => ctx.revert();
}, []);


  const getExampleIcon = (example: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Writer: <FaPenFancy className="text-sm" />,
      Connector: <FaUserFriends className="text-sm" />,
      Analyst: <FaChartLine className="text-sm" />,
      Designer: <FaPalette className="text-sm" />,
      Strategist: <FaChess className="text-sm" />,
      "Social Media Manager": <FaShareAlt className="text-sm" />,
      Numbers: <FaChartLine className="text-sm" />,
      "Text content": <FaPenFancy className="text-sm" />,
      "Brand guidelines": <FaPalette className="text-sm" />,
      "Data sets": <FaChartBar className="text-sm" />,
      Images: <FaPalette className="text-sm" />,
      "Makes calls": <FaUserFriends className="text-sm" />,
      "Sends emails": <FaUpload className="text-sm" />,
      "Creates posts": <FaShareAlt className="text-sm" />,
      "Generates content": <FaPenFancy className="text-sm" />,
      "Analyzes data": <FaChartLine className="text-sm" />,
      "Real-time analytics": <FaChartBar className="text-sm" />,
      "Download files": <FaUpload className="text-sm" />,
      "Performance reports": <FaChartLine className="text-sm" />,
      "Export data": <FaUpload className="text-sm" />,
    };
    return iconMap[example] || <FaBullseye className="text-sm" />;
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: "from-purple-500 to-pink-500 border-purple-200",
      blue: "from-blue-500 to-cyan-500 border-blue-200",
      green: "from-green-500 to-emerald-500 border-green-200",
      orange: "from-orange-500 to-red-500 border-orange-200",
    };
    return colorMap[color] || colorMap.purple;
  };

  const getGlowColor = (color: string) => {
    const glowMap: { [key: string]: string } = {
      purple: "rgba(168, 85, 247, 0.4)",
      blue: "rgba(59, 130, 246, 0.4)",
      green: "rgba(34, 197, 94, 0.4)",
      orange: "rgba(249, 115, 22, 0.4)",
    };
    return glowMap[color] || glowMap.purple;
  };

  return (
    <div className="min-h-screen py-12  px-4">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <SplitText
            text="How Riko Works?!"
            delay={200}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-6xl font-semibold italic text-black"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-blue-500 to-red-700 transform -translate-x-1/2" />

          <div className="space-y-12">
         {timelineSteps.map((step, index) => {
  const stepColor = step.color;
  const boxRef = useRef<HTMLDivElement>(null);

  // Custom hook to detect if the box is in viewport
  const inView = useInView(boxRef, 0.2, "0px"); // 20% visible triggers animation

  return (
    <div key={step.id} className="relative flex mb-8 items-start cursor-pointer">
      {/* Circle */}
      <div className="relative z-10 flex-shrink-0 mr-10">
        <div
          className={`
            w-20 h-20 rounded-full border-4 border-white shadow-xl
            bg-gradient-to-r ${getColorClasses(stepColor)}
            flex items-center justify-center text-white
            ring-4 ring-white ring-opacity-50
          `}
          style={{
            boxShadow: `0 0 30px ${getGlowColor(stepColor)}`,
          }}
        >
          {step.icon}
        </div>

        {index < timelineSteps.length - 1 && (
          <div className="absolute  left-1/2 w-1 h-12 bg-gradient-to-b from-gray-300 to-gray-200 transform -translate-x-1/2" />
        )}
      </div>

      {/* Content Box */}
      <div
        ref={boxRef}
        className={`
          flex-1 p-10 rounded-2xl border-2
          bg-white/80 backdrop-blur-sm
          shadow-2xl border-opacity-100 transform
          transition-all duration-700 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
        style={{
          borderColor: getGlowColor(stepColor).replace("0.4", "0.6"),
          boxShadow: `0 20px 40px ${getGlowColor(stepColor)}`,
        }}
        onClick={() => setSelectedIndex(selectedIndex === index ? -1 : index)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r ${getColorClasses(
                  stepColor
                )} text-white`}
              >
                {step.step}
              </span>
              <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Examples */}
        {step.examples && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Examples:
            </h4>
            <div className="flex flex-wrap gap-3">
              {step.examples.map((example, exampleIndex) => (
                <div
                  key={exampleIndex}
                  className={`
                    flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 shadow-sm
                    transition-all duration-500 ease-out
                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                  `}
                  style={{ transitionDelay: `${exampleIndex * 100}ms` }} // stagger effect
                >
                  <div className="text-gray-400">{getExampleIcon(example)}</div>
                  <span className="font-medium">{example}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
})}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RikoTimeline;
