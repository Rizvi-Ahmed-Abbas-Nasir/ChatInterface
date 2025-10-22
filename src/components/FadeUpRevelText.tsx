import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import styled from "styled-components";
import CardSwap, { Card } from './SwipingCards'

const Container = styled.div`
  padding: 10rem 3rem 5rem;
  @media (max-width: 1080px) {
    padding: 5rem 2rem 3rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Title = styled.div`
  width: 70%;
  h2 {
    font-size: 3rem;
    font-weight: 500;
  }
  @media (max-width: 1080px) {
    width: 100%;
    h2 {
      font-size: 1.8rem;
    }
  }
`;



const About: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

 

  useLayoutEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    let titleSplit: SplitType | null = null;
    let cardSplits: SplitType[] = [];
    let tl: gsap.core.Timeline | null = null;
    let observer: IntersectionObserver | null = null;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Create SplitType instances for title
          titleSplit = new SplitType(titleRef.current!, { types: "words" });

          // Create SplitType instances for each card text
          cardTextRefs.current.forEach((cardTextEl) => {
            if (cardTextEl) {
              const cardSplit = new SplitType(cardTextEl, { types: "words" });
              cardSplits.push(cardSplit);
            }
          });

          // Set initial state for all animated elements
          gsap.set(titleSplit.words, {
            opacity: 0,
            y: 40,
            filter: "blur(6px)",
          });

          cardSplits.forEach((split) => {
            gsap.set(split.words, {
              opacity: 0,
              y: 20,
              filter: "blur(4px)",
            });
          });

          // Create timeline
          const timeline = gsap.timeline();
          tl = timeline; // Assign to outer variable for cleanup

          // Animate title
          timeline.to(titleSplit.words, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.03,
            ease: "power2.out",
          });

          // Animate card texts with a slight delay after title starts
          cardSplits.forEach((split) => {
            timeline.to(
              split.words,
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                stagger: 0.01,
                ease: "power2.out",
              },
              `-=0.3` // Start animating cards before title completely finishes
            );
          });

          // Stop observing (one-time)
          if (observer) observer.disconnect();
        }
      });
    };

    observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.35,
    });

    observer.observe(sectionRef.current);

    return () => {
      if (observer) observer.disconnect();
      if (tl) tl.kill(); // Now TypeScript knows tl can't be null here
      if (titleSplit) titleSplit.revert();
      cardSplits.forEach(split => split.revert());
    };
  }, []);

  return (
    <Container ref={sectionRef}>
      <Title>
        <h2 ref={titleRef}>
          "Imagine having a strategist, a writer, a social media manager, a creative designer, a connector, and an analyst… all sitting in your office.
          <br />
          Thats Riko. A single AI with six sides — each designed to help your business grow faster."
        </h2>
      </Title>

    <div className="relative w-full mt-50">
  {/* Other content above */}

  {/* Corner Cards */}
  <div className="absolute bottom-0 right-0 overflow-visible transform translate-x-1/4 translate-y-1/2 pointer-events-none">
    <div className="w-[100px] h-[200px] relative">
      <CardSwap
        cardDistance={30}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={true}
      >
        <Card
          customClass="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Strategist</h3>
          <p className="text-center text-sm">
            Riko analyzes your market and plans the most effective strategies to grow your business.
          </p>
        </Card>

        <Card
          customClass="bg-gradient-to-br from-green-400 to-teal-600 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Writer</h3>
          <p className="text-center text-sm">
            Riko crafts compelling content, posts, and ad copy that resonates with your audience.
          </p>
        </Card>

        <Card
          customClass="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Designer</h3>
          <p className="text-center text-sm">
            Riko designs stunning visuals, social posts, and graphics that match your brand identity.
          </p>
        </Card>

        <Card
          customClass="bg-gradient-to-br from-pink-400 to-red-500 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Connector</h3>
          <p className="text-center text-sm">
            Riko helps you build meaningful connections and network with potential clients.
          </p>
        </Card>

        <Card
          customClass="bg-gradient-to-br from-blue-400 to-indigo-700 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Analyst</h3>
          <p className="text-center text-sm">
            Riko tracks performance metrics and provides insights to optimize your campaigns.
          </p>
        </Card>

        <Card
          customClass="bg-gradient-to-br from-purple-400 to-pink-600 text-white p-6 w-64 h-80 flex flex-col justify-center items-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Social Media Manager</h3>
          <p className="text-center text-sm">
            Riko schedules, posts, and manages all social channels to maximize engagement.
          </p>
        </Card>
      </CardSwap>
    </div>
  </div>
</div>

    </Container>
  );
};

export default About;