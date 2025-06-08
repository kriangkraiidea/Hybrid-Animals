import React, { useState } from "react";
import Image from "next/image";

interface Animal {
  id: string;
  name: string;
  type: string;
  image: string;
}

interface AnswerProps {
  isImageRevealed: boolean;
  selectedAnimals: Animal[];
  choiceQty: number;
  resetSelectedAnimals: () => void;
  removeSelectedAnimal: (animal: Animal) => void;
}

const Answer: React.FC<AnswerProps> = ({ isImageRevealed, selectedAnimals, choiceQty, resetSelectedAnimals, removeSelectedAnimal }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/Default_Create_a_mysterious_animal_icon_shrouded_in_darkness_w_1_4265b02b-13a0-4ce2-bfe5-ebb6b459d053_0.png?alt=media&token=c84ee54f-346c-40a7-9d3a-904fc2bde2d5";

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-wrap items-center justify-center">
        {[...Array(choiceQty)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={` relative  ${
                selectedAnimals[index] ? "hover:scale-110 hover:bg-red-200 active:scale-100 active:bg-red-300 cursor-pointer hover:border-red-500" : ""
              } border border-primary flex flex-col xl:flex-row p-1 rounded-md`}
              onMouseEnter={() => selectedAnimals[index] && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => selectedAnimals[index] && removeSelectedAnimal(selectedAnimals[index])}
            >
              <div className="sm:w-16 md:w-20 w-12 xl:w-20 h-auto self-center relative">
                <Image className="p-1 rounded-lg" src={selectedAnimals[index]?.image || defaultImage} alt="Mysterious animal" width={500} height={500} />
                {hoveredIndex === index && selectedAnimals[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-red-500">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2H5m14 0H5"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="flex items-center w-20 sm:w-32">
                <span className="rounded-full bg-secondary text-lg font-bold px-2">{index + 1}</span> &nbsp; {selectedAnimals[index]?.name || "_ _ _ _"}
              </p>
            </div>
            {index < choiceQty - 1 && <span className="mx-2 text-xl font-bold">+</span>}
          </React.Fragment>
        ))}
        <div className="border-l-4 border-green-500 flex flex-col p-2 pl-6 ml-4">
          <div onClick={isImageRevealed ? resetSelectedAnimals : undefined} className={`cursor-pointer ${isImageRevealed ? "hover:scale-110 active:scale-90" : "opacity-50 cursor-not-allowed"}`}>
            <p className={`text-center text-xl font-bold ${isImageRevealed ? "text-green-800" : "text-gray-500"}`}>confirm</p>
            <span className="text-6xl leading-none overflow-visible">🫡</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
