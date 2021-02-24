import { FiImage, FiPower } from 'react-icons/fi'

import { useAuth } from "../hooks/auth";
import { useChallenges } from "../hooks/challenges";

import styles from "../styles/components/Profile.module.css";

export function Profile(): JSX.Element {
  const { level } = useChallenges();
  const { isLogged, user, signOut } = useAuth();

  return (
    <div className={styles.profileContainer}>
      <figure>
        {isLogged && user && user.avatar_url ? <img src={user.avatar_url} alt={user.name} /> : <FiImage />}
      </figure>

      <div>
        <strong>
          {isLogged && user ? (
            <>
              {user.name}

              <button type="button" onClick={signOut}>
                <FiPower />
              </button>
            </>
          ) : (
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`}
            >
              Entrar com GitHub
            </a>
          )}
        </strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
