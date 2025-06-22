import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {AppDispatch} from "@/store/store.ts";
import {defaultValues, type FormFields, schema} from "@/components/layouts/Login/login.schema.ts";
import {useLoginMutation} from "@/store/user/userApiSlice.ts";
import {setUser} from "@/store/auth/authSlice.ts";
import {Button, Field} from "@/components/ui";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {toast} from "sonner";

export const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const [login] = useLoginMutation();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const response = await login({...data})

            console.log('response', response)

            if(response.data?.user) {
                dispatch(
                    setUser({
                        _id: response.data.user._id,
                        role: response.data?.user.role,
                        email: response.data?.user.email
                    })
                )

                toast.success(`Welcome!`)

                navigate('/dashboard')
            }

            if(response?.error) {
                setError(response?.error?.data?.message)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)} >
            <div className="form__row">
                <h1>Login</h1>
            </div>

            <div className="form__row">
                <Field id='email' {...register('email')} placeholder='Email'/>

                <span className={`hidden ${errors.email ? 'error' : ''}`}>{errors.email?.message}</span>
            </div>

            <div className="form__row">
                <Field id='password' {...register('password')} placeholder='Password' type='password'/>

                <span className={`hidden ${errors.password ? 'error' : ''}`}>{errors.password?.message}</span>
            </div>

            {
                error && <span className='error'>{error}</span>
            }


            <Button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Submit'}</Button>
        </form>
    )
}