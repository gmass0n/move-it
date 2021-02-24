import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import challengesList from "../assets/jsons/challenges.json";

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
}

const ChallengesContext = createContext<IChallengesContextData>(
  {} as IChallengesContextData
);

interface IChallengesProviderProps {
  children: React.ReactNode;
}

function ChallengesProvider({
  children,
}: IChallengesProviderProps): JSX.Element {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState<IChallenge | null>(
    null
  );

  const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * 4, 2), [level]);

  const levelUp = useCallback(() => { 
    setLevel((prevState) => prevState + 1);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(
      Math.random() * challengesList.length
    );
    const challenge = challengesList[randomChallengeIndex] as IChallenge;

    setActiveChallenge(challenge);
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

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
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}

function useChallenges() {
  return useContext(ChallengesContext);
}

export { ChallengesProvider, useChallenges };
