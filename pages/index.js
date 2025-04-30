import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container">
      <Head>
        <title>THESCALEMETHOD</title>
        <meta name="description" content="THESCALEMETHOD Learning Platform" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to <span>THESCALEMETHOD</span>
        </h1>

        <div className="auth-section">
          {session ? (
            <>
              <p>Signed in as {session.user.email}</p>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <p>You are not signed in</p>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}