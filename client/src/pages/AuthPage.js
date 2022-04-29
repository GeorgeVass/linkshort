import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
   const [form, setForm] = useState({
    email: '', password: ''
  })

    useEffect( () => {
        console.log('Error', error)
        message(error)
        clearError()
    }, [error, message, clearError])

    console.log("Form:", form)

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log("data", data)
        } catch (error) {
            console.log("post error",error)
        }
    }


    return (
    <div className="row">
        <div className="col s6 offset-s3">
           <h1>Short your link</h1>
           <div className="card purple darken-1">
             <div className="card-content white-text">
               <span className="card-title">Authentification</span>
               <div>


               <div className="input-field">
                  <input 
                    placeholder="Enter email" 
                    id="email" 
                    type="text"
                    name="email"
                    onChange={changeHandler}
                  />
                  {/* <label htmlFor="first_name">Email</label> */}
                </div>

                <div className="input-field">
                  <input 
                    placeholder="Enter password" 
                    id="password" 
                    type="password"
                    name="password"
                    onChange={changeHandler}
                  />
                  {/* <label htmlFor="first_name">Password</label> */}
                </div>

               </div>
            </div>
            <div className="card-action">
          <button 
          className="btn blue darken-4" 
          style={{marginRight: 10}}
          disabled={loading}
          >Log in</button>
          <button 
          className="btn grey lighten-1 black-text"
          onClick={registerHandler}
          disabled={loading}
          >Registration</button>
        </div>
      </div>
        </div>
    </div>
    )
}