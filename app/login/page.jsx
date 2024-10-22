"use client";

import { FormEvent, useEffect, useState } from "react";
import "../../css/bootstrap.min.css"
import "../../css/login.css"
import Link from 'next/link';
import { ILogInPayload, ISignUpPayload, check_token } from "../../common";
import { authApi } from "../../api-client/auth-api";
import { useRouter } from "next/navigation";


export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let access_token = check_token();
    if(access_token) {
      router.push("/dashboard/home")
    }
  })

  async function logInSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setFailedLogin(false)

      if(email == "") {
        alert("Please fill email")
        return
      }
      
      if(password == "") {
        alert("Please fill password")
        return
      }

      const payload: ILogInPayload = {
        email: email,
        password: password
      };

      const response = await authApi.logIn(payload);

      console.log(response, response.data.token);

      // Set to session storage
      sessionStorage.setItem("u2mya_wallet_access_token", response.data.token);

      setEmail("")
      setPassword("")

      router.push("/dashboard");

      window.location.reload();
    } catch (error) {
      setFailedLogin(true)
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
                <form onSubmit={(e) => logInSubmit(e)}>
                    <h4>LogIn</h4>
                    <div className="form-group">
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control login-container-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control login-container-input" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <Link key="Forgot Password" href="/forgot-password" className="login-container-forgot-pass">Forgot password?</Link>
                    <button type="submit" className="btn btn-primary login-container-button-login">{loading ? "LogIning....." : "LogIn"}</button>
                </form>
                {failedLogin && <div className="create-account-success">Login failed, please try with another email and password</div>}
                <Link key="Sign up" href="/signup" className="login-container-create-new-account">Create an account</Link>
            </div>
        </div>

    </div>
  );
}