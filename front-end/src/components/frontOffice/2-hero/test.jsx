// CarouselBurger.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./test.css"; // your CSS file

const CarouselBurger = () => {
  // Create refs for each layer
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    // Animate bottom layers first
    tl.from([layer3Ref.current, layer4Ref.current], {
      y: 200,
      opacity: 0,
      stagger: -0.25,
      duration: 0.5,
    });
    // Animate top layers next
    tl.from([layer2Ref.current, layer1Ref.current], {
      y: -200,
      opacity: 0,
      stagger: 0.25,
      duration: 0.5,
    });
  }, []);

  return (
    <main className="test">
      <section>
        <div className="cover-img">
          <div className="layers">
            <div className="layer layer-4" ref={layer4Ref}>
              <img src="images/layer-4.png" alt="" />
            </div>

            <div className="layer layer-3" ref={layer3Ref}>
              <img src="images/layer-3.png" alt="" />
            </div>

            <div className="layer layer-2" ref={layer2Ref}>
              <img src="images/layer-2.png" alt="" />
            </div>

            <div className="layer layer-1" ref={layer1Ref}>
              <img src="images/layer-1.png" alt="" />
            </div>
          </div>
        </div>
        <div className="next-img">
          <img src="images/burger.png" alt="" />
        </div>
      </section>
    </main>
  );
};

export default CarouselBurger;
