// import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col bg-slate-900 items-center justify-start h-full">
      <h1 className="text-orangered text-4xl pb-10 font-bold pt-10">
        U2MYA BLOCKCHAIN WALLET
      </h1>

      <div className="text-orangered items-center justify-center flex-col flex">
        <h3 className="text-2xl py-10">
          Welcome to U2MYA blockchain wallet, a wallet for ethereum ecosystem
        </h3>

        <form>
          <div className=" flex flex-col items-center justify-center w-[400px]">
            <h1 className=" text-xl font-bold ">LogIn</h1>

            <input
              type="email"
              className="my-3 border-[1px] border-orangered p-2 rounded-lg w-full"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />

            <input
              type="password"
              className="my-3 border-[1px] border-orangered p-2 rounded-lg w-full"
              id="exampleInputPassword1"
              placeholder="Password"
            />

            <a href="" className="login-container-forgot-pass">
              Forgot password?
            </a>
            <button
              //   type="submit"
              onClick={() => {}}
              className="w-full mt-4 bg-orangered rounded-md py-3 text-black font-bold"
            >
              Login
            </button>
            <a href="" className="pt-5">
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
