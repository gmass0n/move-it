import { useMemo } from "react";
import { FiCheckCircle, FiPlayCircle, FiStopCircle } from "react-icons/fi";

import { useChallenges } from "../hooks/challenges";
import { useCountdown } from "../hooks/countdown";

import styles from "../styles/components/Countdown.module.css";

export function Countdown(): JSX.Element {
  const {
    time,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useCountdown();

  const [minuteLeft, minuteRight] = useMemo(() => {
    const minutes = Math.floor(time / 60);

    return String(minutes).padStart(2, "0").split("");
  }, [time]);

  const [secondLeft, secondRight] = useMemo(() => {
    const seconds = time % 60;

    return String(seconds).padStart(2, "0").split("");
  }, [time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <FiCheckCircle />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              onClick={resetCountdown}
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
              <FiStopCircle />
            </button>
          ) : (
            <button
              onClick={startCountdown}
              type="button"
              className={styles.countdownButton}
            >
              Inciar um ciclo
              <FiPlayCircle />
            </button>
          )}
        </>
      )}
    </div>
  );
}
