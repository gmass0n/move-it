import { useChallenges } from '../hooks/challenges';
import styles from '../styles/components/Profile.module.css';

export function Profile(): JSX.Element {
  const { level } = useChallenges();

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/gmass0n.png" alt="Gabriel Masson" />

      <div>
        <strong>Gabriel Masson</strong>

        <p>
          <img src="icons/level.svg" alt="Level"/>  
          
          Level {level}
        </p>
      </div>
    </div>
  )
}