import { useChallenges } from '../hooks/challenges';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(): JSX.Element {
  const { completedChallenges } = useChallenges()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>

      <span>{completedChallenges}</span>
    </div>
  )
}