import { getProviders, signIn } from "next-auth/react";
import Head from 'next/head';

export default function SignIn({ providers }) {
  return (
    <div className="container">
      <Head>
        <title>Sign In | THESCALEMETHOD</title>
      </Head>
      
      <div className="signin-container">
        <h1>Sign in to THESCALEMETHOD</h1>
        <div className="providers">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="provider">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="signin-button"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}