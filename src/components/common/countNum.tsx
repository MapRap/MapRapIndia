import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
// import styles from "./YourComponent.module.css"; // Optional for styling

const AnimatedNumberSection = ({ upto }: { upto: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the section is visible
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="text-white pt-2">
        {isVisible && (
          <CountUp
            start={0}
            end={upto}
            duration={2.5} // Duration of the animation in seconds
            separator=","
          />
        )}
      </div>
    </section>
  );
};

export default AnimatedNumberSection;
