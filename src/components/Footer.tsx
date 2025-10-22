import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import styled from "styled-components";
import { Link } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  height: 70vh;
  position: relative;
  background-color: #000;
  overflow: hidden;

  .text {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 12%;
    user-select: none;
    span {
      font-size: 13vw;
      .line {
        .word {
          .char {
            color: #fff;
          }
          &:nth-child(2) {
            font-style: italic;
          }
        }
      }
    }

    @media (max-width: 1280px) {
      bottom: 15%;
    }

    @media (max-width: 900px) {
      bottom: 18%;
    }

    @media (max-width: 500px) {
      bottom: 28%;
    }
  }

  .sticky {
    margin: 0;
    padding: 0 5rem;
    width: 100%;
    height: 17vh;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ffffff76;
    background-color: #000;

    .links {
      width: 20%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        width: fit-content;
        font-size: 1rem;
        color: #fff;
      }
    }

    .socials {
      display: flex;
      gap: 1.5rem;
    }

    .copyright {
      font-size: 1rem;
      color: #fff;
    }

    @media (max-width: 900px) {
      flex-wrap: wrap;

      .copyright {
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 500px) {
      align-items: center;
      padding: 1rem 2rem 0.5rem 2rem;

      .links {
        width: auto;
      }
    }

    @media (max-width: 368px) {
      .links {
        justify-content: center;
        flex-direction: row;
        width: 100%;
      }

      .socials {
        justify-content: center;
        width: 100%;
      }
    }
  }

  @media (max-width: 500px) {
    height: 55vh;
  }
`;

const Content = styled.div`
  padding: 5rem 5rem 0 5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .items {
    ul {
      li {
        padding: 0.6rem 0;
        list-style: none;
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

        a {
          font-size: 1.4rem;
          text-decoration: none;
          color: #fff;
        }
      }
      &:hover {
        li {
          &:is(:not(:hover)) {
            opacity: 0.5;
          }
        }
      }
    }
    &:nth-child(2) {
      text-align: right;
    }
  }

  @media (max-width: 500px) {
    padding: 2.5rem 2.5rem 0 2.5rem;

    .items {
      ul {
        li {
          a {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
//   const navigate = useHistory();

//   const handleClick = () => {
//     navigate("/#services");
//   };

  useEffect(() => {
  if (!textRef.current) return;

  // Instantiate SplitType
  const split = new SplitType(textRef.current, { types: "chars" });

  // Animate the characters
  gsap.fromTo(
    split.chars,
    {
      yPercent: 100,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "elastic.out(1, 0.6)", // smoother rubber effect
      duration: 2,               // slower
      stagger: 0.07,               // slightly slower stagger
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: 0.8,                 // smooth scroll-linked animation
      },
    }
  );

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <Container ref={containerRef}>
      <Content>
        <div className="items">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/aboutus">About</Link>
            </li>
            <li>
              <Link to="/team">Our team</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="items">
          <ul>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/Careers">Careers</Link>
            </li>
           
          </ul>
        </div>
      </Content>
      <div className="text">
        <span ref={textRef}>RIKO AI</span>
      </div>
      <div className="sticky" ref={stickyRef}>
        <div className="copyright">
          © 2024 Clever Studio. All rights reserved.
        </div>
        {/* Optional socials */}
        {/* <div className="socials">
          <a href="https://discord.gg/evV5MwtgZa" target="_blank" rel="noopener noreferrer">
            <FaDiscord size={22} color="#fff" />
          </a>
          <a href="https://www.instagram.com/cleverstudio.in/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={22} color="#fff" />
          </a>
          <a href="https://wa.me/+918928548702" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={22} color="#fff" />
          </a>
          <a href="https://www.linkedin.com/company/cleverstudioin" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={22} color="#fff" />
          </a>
        </div> */}
      </div>
    </Container>
  );
};

export default Footer;
