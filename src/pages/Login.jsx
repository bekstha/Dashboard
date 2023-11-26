import React from 'react'
import { Input } from '../components/Input';

const Login = () => {

    const loginFields=[
        {
            labelText:"Email address",
            labelFor:"email-address",
            id:"email-address",
            name:"email",
            type:"email",
            autoComplete:"email",
            isRequired:true,
            placeholder:"Email address"   
        },
        {
            labelText:"Password",
            labelFor:"password",
            id:"password",
            name:"password",
            type:"password",
            autoComplete:"current-password",
            isRequired:true,
            placeholder:"Password"   
        }
    ];

  return (
    <>
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                Don't have an account yet? {' '}
            </p>
        </div>
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
                {loginFields.map(field=>
                    <Input
                        key={field.id}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                )}
        </div>
      </form>
    </>
  )
}

export default Login