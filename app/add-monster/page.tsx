"use client";

import { useEffect, useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore, storage} from '@/lib/firebase';
import { collection, addDoc, getDocs, writeBatch, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from "next/image";

interface Monster {
  id?: string;
  name: string;
  lv: string;
  answer: string[];
  type: string;
  image: string;
}

const auth = getAuth();
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.uid);
  } else {
    console.log('No user is signed in');
  }
});

const AddMonster = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [lv, setLv] = useState('');
  const [answer, setAnswer] = useState<string[]>([]);
  const [type, setType] = useState('monster');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
      fetchMonsters();
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          fetchMonsters();
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }
  }, [session]);
  

  const fetchMonsters = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'monsters'));
    const monstersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Monster[];
    setMonsters(monstersList);
  };

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cancelEdit();

    let imageUrl = image;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    if (editId) {
      await updateDoc(doc(firestore, 'monsters', editId), {
        name,
        lv,
        answer,
        type,
        image: imageUrl,
      });
      setEditId(null);
    } else {
      await addDoc(collection(firestore, 'monsters'), {
        name,
        lv,
        answer,
        type,
        image: imageUrl,
      });
    }

    setName('');
    setLv('');
    setAnswer([]);
    setType('monster');
    setImage('');
    setImageFile(null);
    fetchMonsters(); // Refresh the table data after adding or editing a monster

    // Close the modal
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          const batch = writeBatch(firestore);
          data.forEach((item: Monster) => {
            const docRef = doc(collection(firestore, 'monsters'));
            batch.set(docRef, item);
          });
          await batch.commit();
          fetchMonsters(); // Refresh the table data after adding multiple monsters
        } else {
          console.error('Uploaded JSON is not an array');
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleEdit = (monster: Monster) => {
    showModal();
    setEditId(monster.id || null);
    setName(monster.name);
    setLv(monster.lv);
    setAnswer(monster.answer);
    setType(monster.type);
    setImage(monster.image);
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setLv("");
    setAnswer([]);
    setType("monster");
    setImage("");
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(firestore, 'monsters', id));
    fetchMonsters(); // Refresh the table data after deleting a monster
  };

  const showModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      {user ? (
        <>
          <button onClick={showModal} className="btn btn-outline btn-info font-bold text-xl">Add Monster</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Monster' : 'Add New Monster'}</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={lv}
                    onChange={(e) => setLv(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Answers (comma-separated)</label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={answer.join(', ')}
                    onChange={(e) => setAnswer(e.target.value.split(',').map(a => a.trim()))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <button  type="submit" className="btn btn-outline btn-info font-bold text-xl">
                  {editId ? 'Update Monster' : 'Add Monster'}
                </button>
              </form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Upload JSON File</label>
                <input type="file" accept=".json" onChange={handleFileUpload} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={cancelEdit}>Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="divider divider-success text-2xl font-bold mb-4">Monster List</div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Level</th>
                  <th className="px-4 py-2">Answers</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {monsters.map(monster => (
                  <tr key={monster.id} className="bg-white border-b">
                    <td className="px-4 py-2">{monster.name}</td>
                    <td className="px-4 py-2">{monster.lv}</td>
                    <td className="px-4 py-2">{monster.answer.join(', ')}</td>
                    <td className="px-4 py-2">{monster.type}</td>
                    <td className="px-4 py-2">
                      <Image src={monster.image} alt={monster.name} width={80} height={80} />
                    </td>
                    <td className="px-4 py-2">
                      <button className="btn btn-info btn-sm mr-2 btn-outline " onClick={() => handleEdit(monster)}>Edit</button>
                      <button className="btn btn-error btn-sm btn-outline " onClick={() => handleDelete(monster.id!)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p>You need to be signed in to manage monsters.</p>
          <button onClick={() => signIn("google")} className="btn btn-primary font-bold text-xl">Sign In</button>
        </div>
      )}
    </div>
  );
};

export default AddMonster;
