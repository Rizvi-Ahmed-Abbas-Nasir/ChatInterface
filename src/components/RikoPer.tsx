import React from "react";
import SpotlightCard from "./CustomCards";
import BlurText from "./StoryLine";

interface Personality {
  title: string;
  description: string;
  color: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const personalities: Personality[] = [
  {
    title: "Strategist",
    description:
      "Riko analyzes your market and plans the most effective strategies to grow your business.",
    color: "rgba(255, 99, 71, 0.25)" // Tomato
  },
  {
    title: "Writer",
    description:
      "Riko crafts compelling content, posts, and ad copy that resonates with your audience.",
    color: "rgba(60, 179, 113, 0.25)" // MediumSeaGreen
  },
  {
    title: "Designer",
    description:
      "Riko designs stunning visuals, social posts, and graphics that match your brand identity.",
    color: "rgba(255, 215, 0, 0.25)" // Gold
  },
  {
    title: "Connector",
    description:
      "Riko helps you build meaningful connections and network with potential clients.",
    color: "rgba(255, 105, 180, 0.25)" // HotPink
  },
  {
    title: "Analyst",
    description:
      "Riko tracks performance metrics and provides insights to optimize your campaigns.",
    color: "rgba(65, 105, 225, 0.25)" // RoyalBlue
  },
  {
    title: "Social Media Manager",
    description:
      "Riko schedules, posts, and manages all social channels to maximize engagement.",
    color: "rgba(148, 0, 211, 0.25)" // DarkViolet
  }
];

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function RikoPer() {
  return (
    <div className="min-h-screen  flex flex-col items-center py-16 gap-12">
     <div className="flex justify-center items-center">
  <BlurText
    text="Meet the 6 Personalities"
    delay={200}
    animateBy="words"
    direction="top"
    onAnimationComplete={handleAnimationComplete}
    className="text-6xl font-semibold italic text-black"
  />
</div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full max-w-7xl">
  {personalities.map((p, index) => (
    <SpotlightCard
      key={index}
      className="w-full rounded-3xl border border-white bg-neutral-900 p-8 shadow-xl hover:scale-105 transition-transform duration-500 min-h-[380px] flex flex-col justify-center"
      spotlightColor={p.color}
    >
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        {p.title}
      </h2>
      <p className="text-center text-gray-200 text-lg leading-relaxed">{p.description}</p>
    </SpotlightCard>
  ))}
</div>

    </div>
  );
}