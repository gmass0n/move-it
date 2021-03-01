import { GetServerSideProps } from "next";
import Head from "next/head";

import { useEffect } from "react";

import Cookies from "js-cookie";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import { IUser, useAuth } from "../hooks/auth";
import { ChallengesProvider } from "../hooks/challenges";
import { CountdownProvider } from "../hooks/countdown";

import styles from "../styles/pages/Home.module.css";

interface IProps {
  user: IUser | null;
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;
  const { userLogin, ...cookies } = context.req.cookies;

  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());

  const user = await fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${response.access_token}` },
  }).then((res) => res.json());

  const newUserLogin = user.login || userLogin;

  const level = cookies[`level-${newUserLogin}`]
  const currentExperience = cookies[`currentExperience-${newUserLogin}`]
  const completedChallenges = cookies[`completedChallenges-${newUserLogin}`]

  return {
    props: {
      user: user.login ? user : null,
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
    },
  };
};

export default function Home({ user, completedChallenges, level, currentExperience }: IProps) {
  const { signIn } = useAuth();

  useEffect(() => {
    if (user) {
      signIn(user);
    }
  }, []);

  return (
    <ChallengesProvider
      completedChallenges={completedChallenges}
      level={level}
      currentExperience={currentExperience}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it </title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />

              <CompletedChallenges />

              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}
