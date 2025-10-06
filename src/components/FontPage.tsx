import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function SlideShow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".slide");
    const images = gsap.utils.toArray<HTMLElement>(".image").reverse();
    const slideImages = gsap.utils.toArray<HTMLElement>(".slide__img");
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".slide__outer");
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".slide__inner");
    const count = document.querySelector(".count") as HTMLElement;
    const wrap = gsap.utils.wrap(0, sections.length);

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

    function gotoSection(index: number, direction: number) {
      animating.current = true;
      index = wrap(index);

      let tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          animating.current = false;
        },
      });

      let currentSection = sections[currentIndex.current];
      let heading = currentSection.querySelector(".slide__heading");
      let nextSection = sections[index];
      let nextHeading = nextSection.querySelector(".slide__heading");

      gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex.current], images[index]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index], images[currentIndex.current]], { zIndex: 2, autoAlpha: 1 });

tl.set(count, { text: (index + 1) as any }, 0.32)
        .fromTo(outerWrappers[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
        .fromTo(innerWrappers[index], { xPercent: -100 * direction }, { xPercent: 0 }, 0)
        .to(heading, { "--width": 800, xPercent: 30 * direction }, 0)
        .fromTo(nextHeading, { "--width": 800, xPercent: -30 * direction }, { "--width": 200, xPercent: 0 }, 0)
        .fromTo(images[index], { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 }, { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 }, 0)
        .fromTo(images[currentIndex.current], { xPercent: 0, scaleX: 1, scaleY: 1 }, { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 }, 0)
        .fromTo(slideImages[index], { scale: 2 }, { scale: 1 }, 0)
        .timeScale(1);

      currentIndex.current = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animating.current) return;
        gotoSection(currentIndex.current + 1, +1);
      },
      onDown: () => {
        if (animating.current) return;
        gotoSection(currentIndex.current - 1, -1);
      },
      tolerance: 10,
    });

    const handleKey = (e: KeyboardEvent) => {
      if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating.current) {
        gotoSection(currentIndex.current - 1, -1);
      }
      if (
        (e.code === "ArrowDown" || e.code === "ArrowRight" || e.code === "Space" || e.code === "Enter") &&
        !animating.current
      ) {
        gotoSection(currentIndex.current + 1, 1);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">RIKO AI</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=80"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">IMAGE</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=800&q=80"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">TEXT</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1537165924986-cc3568f5d454?auto=format&fit=crop&w=800&q=80"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">VOICE</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1589271243958-d61e12b61b97?auto=format&fit=crop&w=800&q=80"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">
            0<span className="count">1</span>
          </p>
          <figure className="overlay__img-cont">
            <img
              className="image"
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
              alt=""
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1594666757003-3ee20de41568?auto=format&fit=crop&w=800&q=80"
              alt=""
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1579830341096-05f2f31b8259?auto=format&fit=crop&w=800&q=80"
              alt=""
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1603771628302-c32c88e568e3?auto=format&fit=crop&w=800&q=80"
              alt=""
            />
          </figure>
        </div>
      </section>

 
    </div>
  );
}
