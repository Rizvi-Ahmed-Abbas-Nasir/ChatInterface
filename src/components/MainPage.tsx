import BlurText from "./StoryLine";


const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Demo() {
  return (
  <div className="flex justify-center items-center">
  <BlurText
    text="Who Is Riko?!"
    delay={200}
    animateBy="words"
    direction="top"
    onAnimationComplete={handleAnimationComplete}
    className="text-8xl font-semibold italic text-black"
  />
</div>

  );
}
