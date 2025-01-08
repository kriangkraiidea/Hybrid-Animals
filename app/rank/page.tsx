"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Player {
  _id: string;
  name: string;
  email: string;
  highest_score: number;
}

const Rank: React.FC = () => {
  const { data: session } = useSession();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/api/get-players");
        const playersData = response.data;
        setPlayers(playersData);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Player Rankings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full table-zebra">
            <thead>
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={player._id}
                  className={`bg-white border-b hover  border-gray-300 ${
                    session?.user?.email === player.email ? "font-bold text-emerald-700 bg-blue-100" : ""
                  }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2"><span className={`font-bold ${index === 0 ? "text-orange-400 " : index === 1 ? "text-red-700" : index === 2 ? "text-purple-500" : " text-blue-600"}`}>{index===0?"ศาสตราจารย์ ":index===1?"ดอกเตอร์ ":index===2?"อาจารย์ ":"นักศึกษา "}</span>{player.name}</td>
                  <td className="px-4 py-2">
                    {player.highest_score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rank;
