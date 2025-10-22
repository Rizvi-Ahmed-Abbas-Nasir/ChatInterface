import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiCheckCircle, FiZap, FiStar } from "react-icons/fi";

interface Plan {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  agents: string;
  features: string[];
  highlight?: boolean;
  gradient: string;
}

const RikoPricingPreview: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
 const headline = "Start with the Riko you need.";
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (!containerRef.current) return;

          // Split text into spans for animation
          const letters = headline.split("").map((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            return span;
          });

          containerRef.current.innerHTML = "";
          letters.forEach((span) => containerRef.current?.appendChild(span));

          // Animate letters with rubber effect
          gsap.to(letters, {
            opacity: 1,
            scale: 1.2,
            y: -10,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            stagger: 0.05,
            onComplete: () => {
              gsap.to(letters, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
            },
          });

          observer.disconnect(); // disconnect once animated
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);



  const plans: Plan[] = [
    {
      id: 1,
      title: "Starter",
      subtitle: "Perfect for individuals just starting out",
      price: "$19/mo",
      agents: "1 Agent Access",
      features: [
        "Basic Riko features",
        "Standard dashboard access",
        "Email & chat support",
        "Community resources",
      ],
      gradient: "from-slate-300 to-gray-200",
    },
     {
      id: 3,
      title: "Pro",
      subtitle: "For agencies & power users who need it all",
      price: "$99/mo",
      agents: "All 6 Agents + Advanced Dashboard",
      features: [
        "All Riko personalities unlocked",
        "Advanced analytics suite",
        "Custom automations",
        "Dedicated success manager",
        "Early access to new AI tools",
      ],
      highlight: true,
      gradient: "from-yellow-400 via-amber-400 to-yellow-500",
    },
    {
      id: 2,
      title: "Growth",
      subtitle: "Ideal for growing teams & small startups",
      price: "$49/mo",
      agents: "3 Agents Access",
      features: [
        "Everything in Starter",
        "Team collaboration tools",
        "Smart analytics preview",
        "Priority support",
      ],
      gradient: "from-gray-300 to-gray-100",
    },
   
  ];

const animationTriggered = useRef(false); // track one-time animation
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true; // mark as animated

          // GSAP animation
          gsap.set(cardsRef.current, { opacity: 0, y: 60 });
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
          });

          obs.disconnect(); // stop observing
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center">
        <h2
      ref={containerRef}
      className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
    />
<p
  ref={subtitleRef}
  className="text-gray-600 text-lg mb-16"
>
  Choose a plan that fits your journey — whether you’re exploring, growing, or scaling.
</p>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              ref={addCardRef}
              className={`relative group rounded-3xl shadow-lg border backdrop-blur-md transition-all duration-500 p-10 overflow-hidden ${
                plan.highlight
                  ? "scale-105 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100"
                  : "hover:-translate-y-2 hover:shadow-2xl bg-white border-gray-200"
              }`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${plan.gradient} ${
                  plan.highlight ? "animate-pulse" : ""
                }`}
              ></div>

              <div className="mb-6">
                {plan.highlight ? (
                  <FiStar className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                ) : (
                  <FiZap className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                )}
                <h3
                  className={`text-3xl font-bold ${
                    plan.highlight ? "text-yellow-600" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p className="text-gray-600 mt-2">{plan.subtitle}</p>
              </div>

              <div className="my-8">
                <h4
                  className={`text-4xl font-extrabold mb-1 ${
                    plan.highlight ? "text-yellow-600" : "text-indigo-600"
                  }`}
                >
                  {plan.price}
                </h4>
                <p className="text-gray-700 font-medium">{plan.agents}</p>
              </div>

              <ul className="text-left mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <FiCheckCircle
                      className={`mr-3 ${
                        plan.highlight ? "text-yellow-500" : "text-indigo-500"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <button
                  className={`px-8 py-3 rounded-full font-semibold text-white w-full transition-all shadow-lg ${
                    plan.highlight
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:brightness-110"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {plan.highlight ? "Get Pro Plan 🚀" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* background textures */}
      <div className="absolute top-10 left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] bg-indigo-100/40 rounded-full blur-3xl" />
    </section>
  );
};

export default RikoPricingPreview;
