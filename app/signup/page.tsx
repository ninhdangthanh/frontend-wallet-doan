"use client";

import Link from "next/link";
import "../../css/bootstrap.min.css"
import "../../css/login.css"
import { FormEvent, useState } from "react";
import { ISignUpPayload } from "../../common";
import { authApi } from "../../api-client/auth-api";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);


  async function signUpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccessCreated(false)

      if(email == "") {
        alert("Please fill email")
        return
      }
      
      if(password != passwordConfirm) {
        alert("Please fill correct password and password confirm")
        return
      }

      const payload: ISignUpPayload = {
        email: email,
        password: password
      };

      const response = await authApi.signUp(payload);

      console.log(response);
      
      
      if(response.status != 201) {
        alert("Sign Up failed, please try again")
      }

      setPassword("")
      setPasswordConfirm("")

      setSuccessCreated(true)
      
    } catch (error) {
      alert("Sign Up failed, please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
        <h1 className="wallet-logo">
            U2MYA BLOCKCHAIN WALLET
        </h1>

        <div className="login-container">
            <h3 className="login-container-title">Welcome to U2MYA blockchain wallet, a wallet for ethereum ecosystem</h3>
            <div className="login-container-form">
                <h4>Sign Up</h4>
                <form onSubmit={(e) => signUpSubmit(e)}>
                    <div className="form-group">
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control login-container-input" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control login-container-input" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" className="form-control login-container-input" placeholder="Confirm Password" />
                    </div>
                    <button disabled={loading} type="submit" className="btn btn-primary login-container-button-login">{loading ? "Creatinggggggggg" : "Create"}</button>
                    {successCreated && <span className="create-account-success">Account created successfully! Please verify your email to activate your account, then log in to continue!!!</span>}
                </form>
                <Link key="Login" href="/login" className="login-container-create-new-account">Already had an account?</Link>
            </div>
        </div>

    </div>
  );
}
