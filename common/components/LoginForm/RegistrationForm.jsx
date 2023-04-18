import React,{useState} from "react";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

export const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8),
  cPassword: yup.string().oneOf([yup.ref('password'),null],'Password must match')
})

function RegistrationForm() {
  const [message,setErrorMessage] = useState("")
  const [errorState,setErrorState] = useState(false)
  const router = useRouter()

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) =>{
    
    const {email,password} = data

    try{
      const res = await fetch("http://localhost:3000/api/register",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
      })
      if(res.status == 201){
        router.push("/")
      }
      setErrorMessage(await res.json().message)
    }catch(e){
      setErrorMessage(e)
    }

  }

  return (
    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body">
        <div className="form-control">
          {message ? <h1 className="text-red-700">{message}</h1>: ""}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email")}
            placeholder="Email"
            className="input input-bordered"
          />
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm passowrd</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
            />
            
          </div>
          {errors.cPassword && <p>{errors.cPassword.message}</p>}
        </div>
        <div className="form-control mt-6">
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
