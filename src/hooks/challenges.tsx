import { createContext, useCallback, useContext, useState } from "react";

import challengesList from '../assets/jsons/challenges.json';

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  activeChallenge: IChallenge;
  levelUp(): void;
  startNewChallenge(): void;
}

const ChallengesContext = createContext<IChallengesContextData>({} as IChallengesContextData);

interface IChallengeProviderProps {
  children: React.ReactNode;
}

function ChallengesProvider({
  children,
}: IChallengeProviderProps): JSX.Element {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState<IChallenge | null>(null);

  const levelUp = useCallback(() => {
    setLevel((prevState) => prevState + 1);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challengesList.length);
    const challenge = challengesList[randomChallengeIndex] as IChallenge;
    
    setActiveChallenge(challenge);
  }, []);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        completedChallenges,
        activeChallenge,
        levelUp,
        startNewChallenge,
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
