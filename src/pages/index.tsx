import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { IUser, useAuth } from "../hooks/auth";

import styles from "../styles/pages/Home.module.css";

interface IProps {
  user: IUser | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;

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

  return {
    props: {
      user: user.id ? user : null
    },
  };
};

export default function Home({ user }: IProps) {
  const { signIn } = useAuth();

  useEffect(() => {
    if(user) {
      signIn(user);
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it </title>
      </Head>

      <ExperienceBar />

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
    </div>
  );
}
