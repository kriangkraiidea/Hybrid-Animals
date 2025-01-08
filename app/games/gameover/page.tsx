"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CountUp from "react-countup";

const Gameover: React.FC = () => {
  const router = useRouter();
  const [score, setScore] = useState<number>(0);
  const [levelgame, setLevelgame] = useState<number>(1);
  const [playround, setPlayround] = useState<number>(1);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const stopplay = () => {
    localStorage.removeItem("gameData");
    localStorage.removeItem("playstatus");
  };

  const playagain = () => {
    localStorage.setItem("playstatus", "onplay");
    localStorage.removeItem("gameData");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("playstatus");
    if (storedData !== "gameover") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const storedData = localStorage.getItem("gameData");
    if (!session) {
      setShowModal(true)
    }

    if (storedData) {
      const { score, levelgame, playround } = JSON.parse(storedData);
      setScore(score);
      setLevelgame(levelgame);
      setPlayround(playround);

      if (session) {
        const fetchUserData = async () => {
          try {
            await axios.post("/api/update-user", { score });
            const response = await axios.get("/api/get-user-data");
            const userData = response.data;

            setHighestScore(userData.highest_score);

            if (score >= userData.highest_score) {
              setHighestScore(score);
              setIsNewHighScore(true);
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        };
        fetchUserData();
      }
    }
  }, [session, score]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Profile" width={64} height={64} />
              ) : (
                <Image
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Default Profile"
                  width={64}
                  height={64}
                />
              )}
            </div>
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-4">
          {session?.user?.name || "Player"}
        </h2>
        <div className="text-center text-lg mb-2">
          <span className="font-semibold">Level: </span>
          <CountUp start={0} end={levelgame} separator="," duration={1} /> {isNewHighScore && <span className="badge badge-success -translate-y-3">new</span>}
        </div>
        <div className="text-center text-lg mb-2">
          <span className="font-semibold">Rounds: </span>
          <CountUp start={0} end={playround} separator="," duration={1} /> {isNewHighScore && <span className="badge badge-success -translate-y-3">new</span>}
        </div>
        <div className="text-center text-lg mb-2">
          <span className="font-semibold">Score: </span>
          <CountUp start={0} end={score} separator="," duration={1} /> {isNewHighScore && <span className="badge badge-success -translate-y-3">new</span>}
        </div>
        <div className="text-center text-lg mb-2">
          <span className="font-semibold">Highest Score: </span>
          <CountUp start={0} end={highestScore} separator="," duration={1} />
        </div>
        <div className="flex justify-center mt-6">
          <a href="/" className="btn btn-primary mx-2" onClick={stopplay}>
            Home
          </a>
          <a href="/games/onplay" className="btn btn-secondary mx-2" onClick={playagain}>
            Play Again
          </a>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg"><span className="text-2xl">🥺</span>คุณยังไม่ได้ Login</h3>
            <p className="py-4">กรุณา login เพื่อบรรทึกคะแนนความเก่งกาจและประวัติการเล่นของคุณ ให้ลูกหลานรุ่นหลังของเราได้รู้ว่าคุณเก่งแค่ไหน</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>close</button>
              <a href="/login" className="btn btn-primary">
                Go to Login
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gameover;
