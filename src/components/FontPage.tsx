import  { useRef, useEffect } from "react";
import gsap from "gsap";


interface Flavor {
  id: string;
  bg: string;
  title: string;
  subtitle: string;
  img: string;
}

export default function SlideShow() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const stateRef = useRef({ index: 0 });
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const flavors: Flavor[] = [
    {
      id: "yellow",
      bg: "#ffd400",
      title: "CHURRO RASPBERRY",
      subtitle: "A Magical Duo of Boba and Ice Cream",
      img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "red",
      bg: "#bf1f2b",
      title: "CHURRO RASPBERRY",
      subtitle: "Sweet, crunchy, and fruity",
      img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "brown",
      bg: "#8B5E3C",
      title: "BOBA ESPRESSO",
      subtitle: "Deep roasted flavor with popping boba",
      img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "pink",
      bg: "#ff7fbf",
      title: "STRAWBERRY MILK",
      subtitle: "Creamy strawberry sweetness",
      img: "https://images.unsplash.com/photo-1579830341096-05f2f31b8259?auto=format&fit=crop&w=800&q=80",
    },
  ];


  useEffect(() => {
  if (headlineRef.current) {
    gsap.fromTo(
      headlineRef.current,
      { autoAlpha: 0, y: 60, scaleY: 1.3 },
      { autoAlpha: 1, y: 0, scaleY: 1.25, duration: 1.2, ease: "power3.out" }
    );
  }
}, []);


  useEffect(() => {
    const i = stateRef.current.index;
    if (containerRef.current) {
      gsap.set(containerRef.current, { backgroundColor: flavors[i].bg });
    }
    gsap.set(headlineRef.current, { autoAlpha: 1, y: 0, scale: 1 });
    gsap.set(subtitleRef.current, { autoAlpha: 1, y: 0 });
    gsap.set(imageRef.current, { autoAlpha: 1, scale: 1, x: 0 });
  }, []);

  const gotoIndex = (nextIndex: number) => {
    const prevIndex = stateRef.current.index;
    if (nextIndex === prevIndex) return;

    const wrap = (n: number) => (n + flavors.length) % flavors.length;
    nextIndex = wrap(nextIndex);

    if (tlRef.current) tlRef.current.kill();

    const next = flavors[nextIndex];
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
onComplete: () => void (stateRef.current.index = nextIndex),
    });

    const container = containerRef.current;
    const btn = buttonsRef.current[nextIndex];
    if (!container || !btn) return;

    // get button position relative to viewport
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // create ripple circle
    const circle = document.createElement("div");
    circle.className = "ripple-circle";
    circle.style.background = next.bg;
    container.appendChild(circle);

    // set circle initial position at button
    gsap.set(circle, {
      position: "fixed",
      left: cx,
      top: cy,
      xPercent: -50,
      yPercent: -50,
      width: 0,
      height: 0,
      borderRadius: "50%",
      zIndex: 2,
    });

    // animate ripple grow
    const maxDiameter = Math.max(window.innerWidth, window.innerHeight) * 2;
    tl.to(circle, {
      width: maxDiameter,
      height: maxDiameter,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        const progress = tl.progress();
        if (progress > 0.4 && container) {
          gsap.set(container, { backgroundColor: next.bg });
        }
      },
    });

    // fade out circle after bg applied
    tl.to(circle, { autoAlpha: 0, duration: 0.7 }, "-=0.3");
    tl.call(() => circle.remove(), [], ">");

    // text and image transitions
    tl.to(headlineRef.current, { autoAlpha: 0, y: -40, scale: 0.95, duration: 0.4 }, 0);
    tl.to(subtitleRef.current, { autoAlpha: 0, y: -20, duration: 0.4 }, 0.05);
    tl.to(imageRef.current, { autoAlpha: 0, scale: 0.95, x: -40, duration: 0.45 }, 0);

    tl.call(() => {
      if (headlineRef.current) headlineRef.current.textContent = next.title;
      if (subtitleRef.current) subtitleRef.current.textContent = next.subtitle;
      if (imageRef.current) imageRef.current.src = next.img;

      buttonsRef.current.forEach((btn, idx) => {
        if (!btn) return;
        btn.classList.toggle("active", idx === nextIndex);
      });
    }, [], 0.7);

    tl.fromTo(
      headlineRef.current,
      { autoAlpha: 0, y: 40, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
      0.8
    );
    tl.fromTo(
      subtitleRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.55 },
      0.85
    );
    tl.fromTo(
      imageRef.current,
      { autoAlpha: 0, scale: 1.15, x: 40 },
      { autoAlpha: 1, scale: 1, x: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" },
      0.9
    );

    tlRef.current = tl;
  };

  return (
    <div className="slideshow-root">
      <div className="slideshow-inner" ref={containerRef}>
        <div className="content-grid">
          <h1 ref={headlineRef} className="big-heading slide__heading">
            {flavors[0].title}
          </h1>
          {/* <p ref={subtitleRef} className="subtitle">
            {flavors[0].subtitle}
          </p>
          <div className="center-image">
            <figure className="overlay__img-cont">
              <img ref={imageRef} className="main-image" src={flavors[0].img} alt={flavors[0].title} />
            </figure>
          </div> */}
        </div>

        <div className="circle-buttons" role="tablist" aria-label="Flavors">
          {flavors.map((f, idx) => (
            <button
              key={f.id}
              ref={(el) => {
                if (el) buttonsRef.current[idx] = el;
              }}
              className={`circle-btn ${idx === 0 ? "active" : ""}`}
              title={f.title}
              style={{ background: f.bg }}
              onClick={() => gotoIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
