import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox(): JSX.Element {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" />

            <strong>Novo desafio</strong>

            <p>Levante e faça uma caminhada de 3 minutos</p>
          </main>

          <footer>
            <button className={styles.challengeFailureButton} type="button">
              Falhei
            </button>

            <button className={styles.challengeSuccessButton} type="button">
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avançe de level completando os desafios
          </p>
        </div>
      )}
    </div>
  );
}
