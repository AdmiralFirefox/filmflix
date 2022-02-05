import React, { FC, useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import WebLogo from "../assets/logo/WebLogo.png";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import dynamic from "next/dynamic";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountUserInput from "../components/Inputs/Accounts/AccountUserInput";
const SignUpFooter = dynamic(
  () => import("../components/LandingPage/SignUpFooter")
);
import accountStyles from "../styles/Pages/CreateAccount.module.scss";

const CreateAccount: FC = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Alert Message when an account created successfully
  const handleOpenAlertMessage = () => {
    setOpenAlertMessage(true);
  };

  const handleCloseAlertMessage = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertMessage(false);
  };

  //ALlow users to make an account
  const createAccount = async () => {
    setAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      handleOpenAlertMessage();
      setAuthLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setAuthLoading(false);
    }
  };

  //Profile Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = !user
      ? accountStyles["account-section-bg"]
      : accountStyles["account-section-bg-log-in"];
  }, [user]);

  //Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openAlertMessage}
        autoHideDuration={5000}
        onClose={handleCloseAlertMessage}
        message="Account Created Successfully!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseAlertMessage}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <Link href="/" passHref>
        <div className={accountStyles["account-section-web-logo"]}>
          <Image
            src={WebLogo}
            alt="Web Logo"
            width={150}
            height={50}
            objectFit="cover"
          />
        </div>
      </Link>
      <div className={accountStyles["account-section-wrapper"]}>
        <div className={accountStyles["account-section-content"]}>
          <div className={accountStyles["account-section-title"]}>
            <h1>Create Account</h1>
          </div>

          <AccountUserInput
            emailRef={emailRef}
            passwordRef={passwordRef}
            createAccount={createAccount}
            authLoading={authLoading}
          />

          <div className={accountStyles["account-section-existing-account"]}>
            <h1>Already Have an Account?</h1>
          </div>
          <div className={accountStyles["account-section-link-to-login"]}>
            <Link href="/signin" passHref>
              <p>Click here to log-in</p>
            </Link>
          </div>
          <div className={accountStyles["account-section-recaptcha"]}>
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

export default CreateAccount;
