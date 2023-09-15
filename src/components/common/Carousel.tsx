import { useEffect } from "preact/hooks";

export default function Carousel() {
  useEffect(() => {
    let index = 0,
      amount = 0,
      translationComplete = true,
      moveOffset = 0;

    const carousel = document.getElementById("carousel") as HTMLElement;
    const carouselContainer = document.getElementById(
      "carousel-container"
    ) as HTMLElement;
    const slides = [...carousel.children] as HTMLElement[];

    const transitionCompleted = function () {
      translationComplete = true;
    };

    const btnPrev = document.getElementById("prev") as HTMLButtonElement;
    const btnNext = document.getElementById("next") as HTMLButtonElement;

    window.addEventListener("resize", function () {
      moveOffset = carouselContainer.offsetWidth;
      index = 0;
      slides.forEach((child) => {
        const slide = child as HTMLElement;
        slide.style.transform = `translateX(-${moveOffset}px)`;
      });
    });

    document.addEventListener("DOMContentLoaded", function () {
      amount = slides.length;
      moveOffset = carouselContainer.offsetWidth;

      // prevent multiple click when transition
      for (var i = 0; i < amount; i++) {
        const slide = slides[i] as HTMLElement;
        slide.style.transform = `translateX(-${moveOffset}px)`;

        const currSlide = slides[i];

        currSlide.addEventListener("transitionend", transitionCompleted, true);
        currSlide.addEventListener(
          "webkitTransitionEnd",
          transitionCompleted,
          true
        );
        currSlide.addEventListener("oTransitionEnd", transitionCompleted, true);
        currSlide.addEventListener(
          "MSTransitionEnd",
          transitionCompleted,
          true
        );
      }

      slides.forEach((child) => {
        const slide = child as HTMLElement;
        slide.style.margin = "0";
        slide.style.transform = `translateX(-${moveOffset}px)`;
        setTimeout(() => slide.classList.add("animate"), 0);
      });

      // add click events to control arrows
      btnPrev.addEventListener("click", prev, true);
      btnNext.addEventListener("click", next, true);
    });

    function prev() {
      if (!translationComplete) return;

      translationComplete = false;
      index--;

      if (index == -1) {
        index = amount - 1;
      }

      const outerIndex = index % amount;
      for (let i = 0; i < amount; i++) {
        const slide = slides[i] as HTMLElement;

        const currTransl = Number(
          slide.style.transform.split("(")[1].split("px")[0]
        );

        slide.style.opacity = "1";
        slide.style.transform =
          "translateX(" + (currTransl + moveOffset) + "px)";
      }

      const outerSlide = slides[outerIndex] as HTMLElement;
      const currTransl = Number(
        outerSlide.style.transform.split("(")[1].split("px")[0]
      );

      outerSlide.style.transform =
        "translateX(" + (currTransl - moveOffset * amount) + "px)";
      outerSlide.style.opacity = "0";
    }

    function next() {
      if (!translationComplete) return;

      translationComplete = false;

      const outerIndex = index % amount;
      index++;

      for (var i = 0; i < amount; i++) {
        const slide = slides[i] as HTMLElement;

        const currTransl = Number(
          slide.style.transform.split("(")[1].split("px")[0]
        );

        slide.style.opacity = "1";
        slide.style.transform =
          "translateX(" + (currTransl - moveOffset) + "px)";
      }

      const outerSlide = slides[outerIndex] as HTMLElement;

      const currTransl = Number(
        outerSlide.style.transform.split("(")[1].split("px")[0]
      );

      outerSlide.style.transform =
        "translateX(" + (currTransl + moveOffset * amount) + "px)";
      outerSlide.style.opacity = "0";
    }
  }, []);

  return (
    <section
      id="slider-lrs"
      class="relative h-auto container-sm rounded-2xl shadow-[0px_0px_40px_10px_#0000006e]"
    >
      <div
        id="carousel-container"
        class={`
      w-full h-auto relative overflow-hidden rounded-2xl 
      [&>img]:transition-transform 
      [&>img]:duration-500 
      group
      after:content-[''] 
      after:absolute
      after:top-0 
      after:left-0 
      after:w-full 
      after:h-full
      after:opacity-0
      hover:after:opacity-100
      after:duration-200
    `}
      >
        <ul id="carousel" class="flex overflow-hidden p-0 m-0 animate">
          <img data-slide="1" src="LRS/LRS_4.png" />
          <img data-slide="2" src="LRS/LRS_2.png" />
          <img data-slide="3" src="LRS/LRS_3.png" />
        </ul>
        <button
          id="prev"
          class="left-0 opacity-0 h-full absolute z-20 top-1/2 -translate-y-1/2 w-[80px] flex-center group-hover:flex hover:scale-125 duration-150 bg-gradient-to-r from-gray-900/50 group-hover:opacity-100"
        >
          <svg
            stroke="#FFF"
            fill="#FFF"
            class="rotate-180 transform group-hover:scale-125 transition-transform duration-100"
            viewBox="0 0 1024 1024"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
          </svg>
        </button>
        <button
          id="next"
          class="right-0 opacity-0 h-full absolute z-20 top-1/2 -translate-y-1/2 w-[80px] flex-center group-hover:flex hover:scale-125 duration-150 bg-gradient-to-l from-gray-900/50 group-hover:opacity-100"
        >
          <svg
            stroke="#FFF"
            fill="#FFF"
            class="transform group-hover:scale-125 transition-transform duration-100"
            viewBox="0 0 1024 1024"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
