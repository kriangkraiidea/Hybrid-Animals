"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import Answer from "@/app/components/Answer";
import Choice from "@/app/components/Choice";
import Navbargame from "@/app/components/Navbargame";

interface Monster {
  id?: string;
  name: string;
  lv: string;
  answer: string[];
  type: string;
  image: string;
}

interface Animal {
  id: string;
  name: string;
  type: string;
  image: string;
}

const Onplay = () => {
  const router = useRouter();

  const [timelimit, setTimelimit] = useState(40);
  const [ThisLvScore, setThisLvScore] = useState(800);
  const [monsterLV, setmonsterLV] = useState("1");
  const [scoreSpeedAnswer, setScoreSpeedAnswer] = useState(10);

  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/Leonardo_Phoenix_Create_a_vibrant_animestyle_icon_featuring_a_1.jpg?alt=media&token=cbadea9b-695a-4d2a-a7fe-95a48ed159cc";

  const [selectedCreature, setSelectedCreature] = useState<Monster | null>(null);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(timelimit);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [answeredTimeLeft, setAnsweredTimeLeft] = useState<number>(timelimit);
  const [playround, setPlayround] = useState<number>(1);
  const [levelgame, setLevelgame] = useState<number>(1);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isImageRevealed, setIsImageRevealed] = useState<boolean>(false);
  const [choiceQty, setChoiceQty] = useState<number>(2);

  useEffect(() => {
    const storedData = localStorage.getItem("playstatus");
    if (storedData !== "onplay") {
      console.log("ต้องเข้าผ่านหน้า home");
      router.push("/");
    } else {
      console.log("welcome");
    }
  }, [router]);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const q = query(collection(firestore, "monsters"), where("lv", "==", monsterLV));
        const querySnapshot = await getDocs(q);
        let allMonsters = querySnapshot.docs.map((doc) => doc.data() as Monster);

        // Shuffle the monsters array without limiting the number of elements
        allMonsters = allMonsters.sort(() => 0.5 - Math.random());
        setMonsters(allMonsters);

        if (allMonsters.length > 0) {
          setSelectedCreature(allMonsters[0]);
          setAnswer(allMonsters[0].answer);
          setChoiceQty(allMonsters[0].answer.length);
        }
      } catch (error) {
        console.error("Error fetching monsters: ", error);
      }
    };

    fetchMonsters();
  }, [router, monsterLV]);

  useEffect(() => {
    if (isImageRevealed && !isCounting && !hasAnswered) {
      setIsCounting(true);
      setTimeLeft(timelimit);
    }
  }, [isImageRevealed, isCounting, hasAnswered,timelimit]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsCounting(false);
    setHasAnswered(true);
    setAnsweredTimeLeft(timeLeft);
    setIsAnswerCorrect(false);
    setIsPopupVisible(true);
    }

    if (isCounting && !hasAnswered) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 0.1, 0));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [timeLeft, isCounting, hasAnswered, router]);

  const addSelectedAnimal = (animal: Animal) => {
    setSelectedAnimals((prev) => [...prev, animal]);
  };

  const resetSelectedAnimals = () => {
    setSelectedAnimals([]);
    setnextmonster();
  };

  const removeSelectedAnimal = (animal: Animal) => {
    setSelectedAnimals((prev) => prev.filter((a) => a.id !== animal.id));
  };

  const checkAnswer = () => {
    setIsCounting(false);
    setHasAnswered(true);
    setAnsweredTimeLeft(timeLeft);
    const selectedAnimalNames = selectedAnimals.map((animal) => animal.name);
    const isCorrect = answer.every((ans) => selectedAnimalNames.includes(ans)) && selectedAnimalNames.length === answer.length;

    setIsAnswerCorrect(isCorrect);
    setIsPopupVisible(true);
  };

  const setnextmonster = () => {
    // Set the next creature
    if (monsters.length > 0) {
      setIsImageRevealed(false);
      const nextIndex = (monsters.indexOf(selectedCreature!) + 1) % monsters.length;
      setSelectedCreature(monsters[nextIndex]);
      setAnswer(monsters[nextIndex].answer);
      setChoiceQty(monsters[nextIndex].answer.length);
    }

    if (levelgame === 3 && playround === 3) {
      setmonsterLV("2");
    }
  };

  const closeModalandsetscore = () => {
    if (isAnswerCorrect) {
      const calculatedScore = ThisLvScore + Math.floor(answeredTimeLeft * scoreSpeedAnswer);
      setScore(score + calculatedScore);

      setIsPopupVisible(false);
      setHasAnswered(false);

      setPlayround(playround + 1);
      setSelectedAnimals([]);
      setIsCounting(false);
      setThisLvScore(ThisLvScore + 15);
      setTimeLeft(timelimit);
      setAnsweredTimeLeft(timelimit);
      setTimelimit(timelimit - 1);
    

      if (playround === 3) {
        setPlayround(1);
        setLevelgame(levelgame + 1);
        setTimelimit(timelimit - 1);
        setScoreSpeedAnswer(scoreSpeedAnswer + 1);
      }

      if (timelimit <= 5) {
        setTimelimit(5);
      }
    } else {
      // Save data to localStorage
      localStorage.setItem(
        "gameData",
        JSON.stringify({
          score,
          levelgame,
          playround,
        })
      );
      localStorage.setItem("playstatus", "gameover");
      // Navigate to the game over page
      router.push("/games/gameover");
    }
  };

  const getProgressColor = () => {
    if (timeLeft > timelimit * 0.6) {
      return "progress-success";
    } else if (timeLeft > timelimit * 0.3) {
      return "progress-warning";
    } else {
      return "progress-error";
    }
  };

  const revealImage = () => {
    setIsImageRevealed(true);
  };

  return (
    <div>
      <Navbargame levelgame={levelgame} score={score} />
      <div className="container mx-auto px-3 flex flex-col items-center p-8">
        <div className="w-full flex flex-col-reverse sm:flex-row justify-center align-middle">
          {!selectedCreature ? (
            <div className="skeleton diff aspect-[16/9] rounded-xl lg:w-7/12 flex align-middle justify-center">
              <span className="loading loading-ball loading-lg text-green-500"></span>
              <span className="loading loading-ball loading-lg text-green-500"></span>
              <span className="loading loading-ball loading-lg text-green-500"></span>
            </div>
          ) : (
            <div className="diff aspect-[16/9] rounded-xl lg:w-7/12 relative">
              <Image src={isImageRevealed ? selectedCreature.image : placeholderImage} alt="strange creature" layout="fill" objectFit="cover" />
              {!isImageRevealed && (
                <button onClick={revealImage} className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
                  <div className="text-5xl">👆</div>
                  <div>
                    <span className="text-3xl">⏱</span>
                    {timelimit} วินาที
                  </div>
                </button>
              )}
            </div>
          )}
          <ul className="steps steps-horizontal sm:steps-vertical mb-4 sm:mx-4 min-w-32">
            <li className="step step-primary">รอบที่ 1</li>
            <li className={`step ${playround > 1 ? "step-primary" : ""}`}>รอบที่ 2</li>
            <li className={`step ${playround > 2 ? "step-primary" : ""}`}>รอบที่ 3</li>
          </ul>
        </div>
        <progress className={`progress my-2 ${getProgressColor()}`} value={timeLeft} max={timelimit}></progress>
        <Answer
          selectedAnimals={selectedAnimals}
          choiceQty={choiceQty}
          isImageRevealed={isImageRevealed}
          resetSelectedAnimals={() => {
            resetSelectedAnimals();
            checkAnswer();
          }}
          removeSelectedAnimal={removeSelectedAnimal}
        />
        <div className="divider divider-success">choose your answer below</div>
        <Choice addSelectedAnimal={addSelectedAnimal} selectedAnimals={selectedAnimals} choiceQty={choiceQty} />
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              {isAnswerCorrect ? (
                <div className="text-lg mb-4">You scored: {ThisLvScore + Math.floor(answeredTimeLeft * scoreSpeedAnswer)} points!</div>
              ) : (
                <div className="text-lg mb-4">You scored: 0 points!</div>
              )}
              <div className="text-6xl mb-4">{isAnswerCorrect ? "😊" : "😭"}</div>
              <h2 className="text-2xl font-bold mb-4">{isAnswerCorrect ? "Correct Answer!" : "Wrong Answer!"}</h2>
              <button className="btn btn-primary" onClick={closeModalandsetscore}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onplay;
