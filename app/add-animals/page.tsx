"use client";

import { useState, useEffect } from "react";
import { firestore, storage } from "@/lib/firebase";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Animal {
  id?: string;
  name: string;
  type: string;
  image: string;
}

const AddAnimal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimals = async () => {
    const querySnapshot = await getDocs(collection(firestore, "animals"));
    const animalsList = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        image: data.image || "", // ป้องกันค่า image เป็น undefined
      };
    }) as Animal[];
    setAnimals(animalsList);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = image;

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl) {
        throw new Error("Image URL is required.");
      }

      if (editId) {
        await updateDoc(doc(firestore, "animals", editId), {
          name,
          type,
          image: imageUrl,
        });
        setEditId(null);
      } else {
        await addDoc(collection(firestore, "animals"), {
          name,
          type,
          image: imageUrl,
        });
      }

      setName("");
      setType("");
      setImage("");
      setImageFile(null);
      fetchAnimals();
      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleEdit = (animal: Animal) => {
    setEditId(animal.id || null);
    setName(animal.name);
    setType(animal.type);
    setImage(animal.image);
    setImageFile(null);
    openModal();
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, "animals", id));
      fetchAnimals();
    } catch (error) {
      console.error("Error deleting animal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    const modal = document.getElementById("animal-modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("animal-modal") as HTMLDialogElement;
    if (modal) modal.close();
    setEditId(null);
    setName("");
    setType("");
    setImage("");
    setImageFile(null);
  };

  return (
    <div className="container mx-auto p-4 text-center">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      <button
        onClick={openModal}
        className="btn btn-outline btn-info font-bold text-xl"
      >
        Add Animals
      </button>

      <dialog id="animal-modal" className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editId ? "Edit Animal" : "Add New Animal"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Type
              </label>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image URL
              </label>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn btn-outline btn-info font-bold text-xl">
              {editId ? "Update Animal" : "Add Animal"}
            </button>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      <div className="divider divider-success text-2xl font-bold mb-4">
        Animal List
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id} className="bg-white border-b">
                <td className="px-4 py-2">{animal.name}</td>
                <td className="px-4 py-2">{animal.type}</td>
                <td className="px-4 py-2">
                  {animal.image ? (
                    <Image src={animal.image} alt={animal.name} width={80} height={80} />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn btn-info btn-sm mr-2 btn-outline"
                    onClick={() => handleEdit(animal)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm btn-outline"
                    onClick={() => handleDelete(animal.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAnimal;
