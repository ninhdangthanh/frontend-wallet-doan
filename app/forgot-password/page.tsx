"use client";

import Link from "next/link";
import "../../css/bootstrap.min.css"
import "../../css/login.css"
import { FormEvent, useState } from "react";
import { IForgotPasswordPayload } from "../../common";
import { authApi } from "../../api-client/auth-api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successSent, setSuccessSent] = useState(false);

  async function forgotPasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessSent(false)

    try {
      if(email == "") {
        alert("Please fill email")
        return
      }

      const payload: IForgotPasswordPayload = {
        email: email
      }

      const response = await authApi.forgotPassword(payload);

      console.log(response);

      if(response.status != 200) {
        alert("Sign Up failed, please try again")
      }
      
      setEmail("");
      setSuccessSent(true)

    } catch (error) {
      alert("Forgot password request failed, please try again")
    } finally {
      setLoading(false);
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
                <form onSubmit={(e) => forgotPasswordSubmit(e)}>
                    <h4>Forgot Password</h4>
                    <div className="form-group">
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control login-container-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <button type="submit" className="btn btn-primary login-container-button-login">Send temporary password</button>
                    {successSent && <div className="create-account-success">Send temporary password succes, that password valid for 30 minutes, please login and change password immediately</div>}
                </form>
                <Link key="Login" href="/login" className="login-container-create-new-account">Login</Link>
            </div>
        </div>

    </div>
  );
}
