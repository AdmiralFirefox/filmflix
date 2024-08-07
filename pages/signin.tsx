import { FC, useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import Link from "next/link";
import dynamic from "next/dynamic";
import ProfileUserInput from "../components/Inputs/Profiles/ProfileUserInput";
const SignUpFooter = dynamic(
  () => import("../components/LandingPage/SignUpFooter")
);
import profileStyles from "../styles/Pages/SignIn.module.scss";

const SignIn: FC = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Allow the users to Sign In with an already created account
  const signIn = async () => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setAuthLoading(false);
    }
  };

  //Allow the users to Sign In Anonymously
  const anonymousAccountSignIn = async () => {
    setAuthLoading(true);
    try {
      await signInAnonymously(auth);
      setAuthLoading(false);
    } catch (err) {
      console.log(err);
      alert(err);
      setAuthLoading(false);
    }
  };

  //Allow users to Sign In With their Google Account
  const signInWithgoogle = async () => {
    //Retrieve Google Provider Object
    const provider = new GoogleAuthProvider();
    //Set language to the default browser preference
    auth.useDeviceLanguage();
    //Start sign in process
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  //Profile Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = !user
      ? profileStyles["profile-section-bg"]
      : profileStyles["profile-section-bg-log-in"];
  }, [user]);

  // Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/watch");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Link href="/" passHref legacyBehavior>
        <div className={profileStyles["profile-styles-web-logo"]}>
          <Image
            src={WebLogo}
            alt="Web Logo"
            width={150}
            height={50}
            objectFit="cover"
          />
        </div>
      </Link>

      <div className={profileStyles["profile-styles-wrapper"]}>
        <div className={profileStyles["profile-styles-content"]}>
          <div className={profileStyles["profile-styles-title"]}>
            <h1>Sign In</h1>
          </div>

          <ProfileUserInput
            emailRef={emailRef}
            passwordRef={passwordRef}
            signIn={signIn}
            signInWithgoogle={signInWithgoogle}
            signInAnonymously={anonymousAccountSignIn}
            authLoading={authLoading}
          />

          <div className={profileStyles["profile-styles-new-title"]}>
            <h1>New to Filmflix?</h1>
          </div>
          <div className={profileStyles["profile-styles-new-account-link"]}>
            <Link href="/createaccount" passHref legacyBehavior>
              <p>Click here to create new account</p>
            </Link>
          </div>

          <div className={profileStyles["profile-styles-recaptcha"]}>
            <p>
              This page is protected by Google reCAPTCHA to ensure you&apos;re
              not a bot.{" "}
            </p>
          </div>
        </div>
        <SignUpFooter />
      </div>
    </>
  );
};

export default SignIn;
