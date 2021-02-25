import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useChallenges } from "./challenges";

interface ICountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  time: number;
  startCountdown(): void;
  resetCountdown(): void;
}

const CountdownContext = createContext<ICountdownContextData>(
  {} as ICountdownContextData
);

interface CountdownProviderProps {
  children: React.ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

function CountdownProvider({ children }: CountdownProviderProps): JSX.Element {
  const { startNewChallenge } = useChallenges();

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time, startNewChallenge]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false)
  }, []);

  return (
    <CountdownContext.Provider
      value={{
        time,
        resetCountdown,
        startCountdown,
        hasFinished,
        isActive
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

function useCountdown() {
  return useContext(CountdownContext);
}

export { CountdownProvider, useCountdown };
