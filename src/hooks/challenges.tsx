import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Cookies from "js-cookie";

import challengesList from "../assets/jsons/challenges.json";
import LevelUpModal, { ILevelUpModalHandles } from "../components/LevelUpModal";

interface IChallenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  activeChallenge: IChallenge;
  experienceToNextLevel: number;
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): void;
}

const ChallengesContext = createContext<IChallengesContextData>(
  {} as IChallengesContextData
);

interface IChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

function ChallengesProvider({
  children,
  ...rest
}: IChallengesProviderProps): JSX.Element {
  const levelUpModalRef = useRef<ILevelUpModalHandles>(null)

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);

  const [activeChallenge, setActiveChallenge] = useState<IChallenge | null>(
    null
  );

  const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * 4, 2), [
    level,
  ]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, currentExperience, completedChallenges]);

  const levelUp = useCallback(() => {
    setLevel((prevState) => prevState + 1);
    levelUpModalRef.current?.open()
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(
      Math.random() * challengesList.length
    );
    const challenge = challengesList[randomChallengeIndex] as IChallenge;

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `${
          challenge.type === "body" ? "Exercite-se" : "Mova os olhos"
        }! Complete esse desafio e ganhe ${challenge.amount} xp.`,
      });
    }
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(() => {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setCompletedChallenges((prevState) => prevState + 1);
  }, [activeChallenge, experienceToNextLevel, levelUp]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        completedChallenges,
        experienceToNextLevel,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}

      <LevelUpModal ref={levelUpModalRef} />
    </ChallengesContext.Provider>
  );
}

function useChallenges() {
  return useContext(ChallengesContext);
}

export { ChallengesProvider, useChallenges };
