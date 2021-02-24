import styles from '../styles/components/Profile.module.css';

export function Profile(): JSX.Element {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/gmass0n.png" alt="Gabriel Masson" />

      <div>
        <strong>Gabriel Masson</strong>

        <p>
          <img src="icons/level.svg" alt="Level"/>  
          
          Level 1
        </p>
      </div>
    </div>
  )
}