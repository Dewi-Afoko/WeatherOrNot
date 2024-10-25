import  { useEffect, useRef, useState } from "react";
import "./title3.scss"; // Assuming you have your CSS animations here

const RotatingText = () => {
  const wordsRef = useRef(null);  // UseRef for the container of the words
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const words = wordsRef.current?.querySelectorAll(".word");
    if (!words) return;

    // Wrap each letter in a <span>
    words.forEach((word) => {
      const letters = word.textContent?.split("") || [];
      word.textContent = "";
      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
      });
    });

    const maxWordIndex = words.length - 1;
    words[currentWordIndex].classList.add("active");

    const rotateText = () => {
      const currentWord = words[currentWordIndex];
      const nextWord =
        currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

      // Fade out the current word
      currentWord.classList.remove("active");
      currentWord.classList.add("fade-out");

      // Fade in the next word
      nextWord.classList.remove("fade-out");
      nextWord.classList.add("active");

      // Update the current word index (loop back to 0 after last word)
      setCurrentWordIndex((prevIndex) =>
        prevIndex === maxWordIndex ? 0 : prevIndex + 1
      );
    };

    const intervalId = setInterval(rotateText, 4000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [currentWordIndex]);

  return (
    <div className="rotating-text">
      <p>
        {/* Static text that doesn't change */}
        <span className="static-text lead">Today I want to focus on my...</span>
        
        {/* Rotating words */}
        <span className="word-container" ref={wordsRef}>
          <span className="word alizarin">BICEPS</span>
          <span className="word wisteria">TRICEPS</span>
          <span className="word peter-river">CHEST</span>
          <span className="word emerald">LEGS</span>
          <span className="word sun-flower">BACK</span>
        </span>
      </p>
    </div>
  );
};

export default RotatingText;
