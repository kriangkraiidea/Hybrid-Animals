import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

interface Animal {
  id: string;
  name: string;
  type: string;
  image: string;
}

interface ChoiceProps {
  addSelectedAnimal: (animal: Animal) => void;
  selectedAnimals: Animal[];
  choiceQty: number; // เพิ่ม choiceQty ที่นี่
}

const Choice: React.FC<ChoiceProps> = ({ addSelectedAnimal, selectedAnimals, choiceQty }) => {
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const canAddMoreAnimals = selectedAnimals.length < choiceQty;
  const addAnimalAndCloseModal = (animal: Animal, type: string) => {
    addSelectedAnimal(animal);
    const modal = document.getElementById(`modal_${type}`) as HTMLDialogElement;
    if (modal) {
      modal.close(); // ปิด modal
    }
  };

  const fetchAnimals = async () => {
    const querySnapshot = await getDocs(collection(firestore, "animals"));
    const animalsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Animal[];
    setAnimals(animalsList);
    const types = Array.from(new Set(animalsList.map((animal) => animal.type))); // หาประเภทที่ไม่ซ้ำกัน
    setAnimalTypes(types);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const showModal = (type: string) => {
    const modal = document.getElementById(`modal_${type}`);
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/Leonardo_Phoenix_Create_a_vibrant_animestyle_icon_featuring_a_3.jpg?alt=media&token=faa9f8b7-8215-4ed1-989d-c0d3d2a27db3";

  return (
    <div className="flex flex-wrap gap-2">
      {animalTypes.map((type, index) => (
        <div key={index}>
          <button className="btn btn-outline" onClick={() => showModal(type)}>
            {type}
          </button>
          <dialog id={`modal_${type}`} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-4xl text-center text-green-800">{type}</h3>
              <div className="divider divider-success text-green-800">Choose an animal</div>
              <div className="py-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {animals
                  .filter((animal) => animal.type === type && !selectedAnimals.find((selected) => selected.id === animal.id))
                  .map((animal) => (
                    <button
                      key={animal.id}
                      className="text-center p-2 hover:scale-110 hover:bg-gray-200 active:scale-100 active:bg-green-200 cursor-pointer shadow-md shadow-slate-500"
                      onClick={() => canAddMoreAnimals && addAnimalAndCloseModal(animal, type)} // เรียกฟังก์ชันที่รวมการปิด modal
                      disabled={!canAddMoreAnimals}
                    >
                      <img src={animal.image || defaultImage} alt={animal.name} className="w-full h-32 object-cover mb-2 rounded" />
                      <p className="font-semibold">{animal.name}</p>
                    </button>
                  ))}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      ))}
    </div>
  );
};

export default Choice;
