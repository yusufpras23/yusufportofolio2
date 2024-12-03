"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login(){
    const router = useRouter();
    const [message, setMessage] =useState('')
    const [data, setData] = useState({
        email:'',
        password:'',
      });

    const onSubmitLogin= async ()=>{
        setMessage('')
        const res =  await fetch(`/api/auth/login`,{
            method:'POST',
            body: JSON.stringify(data),
        })
        
        if(res.status == 200){
            router.push('/admin')
        }else{
            let response = await res.json()
            setMessage(response.message)

            setTimeout(()=>{ setMessage("") },[5000])
        }
    }

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
      }

    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="" method="POST" className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={inputHandler}
                        autoComplete="email"
                        className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={inputHandler}
                        required
                        autoComplete="current-password"
                        className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={onSubmitLogin}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>

            <p className='mt-10 text-center text-sm text-red-500'>{ message }</p>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register now
                </a>
            </p>
            </div>
        </div>
        </>
    );
}