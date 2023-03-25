import Link from "next/link";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      <ul
        className={`main-nav      ${
          !session && status === "loading" ? "loading" : "loaded"
        } `}
      >
        <li>
          <Link legacyBehavior href="/">
            <a>Home</a>
          </Link>
        </li>

        {status === "unauthenticated" && (
          <li>
            <Link legacyBehavior href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
        )}

        <li>
          <Link legacyBehavior href="/blog">
            <a>Blog</a>
          </Link>
        </li>

        {!session && status !== "authenticated" && (
          <li>
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn("github");
              }}
            >
              Sign In
            </a>
          </li>
        )}

        {session && (
          <li>
            <a
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
