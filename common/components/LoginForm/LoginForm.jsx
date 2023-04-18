import React, { useState } from "react";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { signIn } from "next-auth/react";
import {hash} from 'bcryptjs'
import { yupResolver } from "@hookform/resolvers/yup"
import { redirect } from "next/dist/server/api-utils";
import axios from 'axios'
import { useRouter } from "next/router";

export const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8)
})

function LoginForm() {
  const [badLogin, setBadLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) =>{

    const {email,password} = data

    try{
      const res = await fetch("http://localhost:3000/api/login",{
        method: "POST",
        headers: {"Content-type":"application/json"},
        body:JSON.stringify(data)
      })
      console.log(res.body)
      if(res.status == 200){
        router.push("/")
      }
      setBadLogin(true)
      setErrorMessage(await res.json())
    }catch(e){
      console.log(e)
    }

  }

  return (
    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body">
        <div className="form-control">
          {badLogin ? <h1 className="text-red-700">{errorMessage.message}</h1> : ""}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email")}
            placeholder="email"
            className="input input-bordered"
            name="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password")}
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="submit" className="btn btn-primary" value="Login" />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
