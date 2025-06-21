import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {AppDispatch} from "@/store/store.ts";
import {defaultValues, type FormFields, schema} from "@/components/layouts/Login/login.schema.ts";
import {useLoginMutation} from "@/store/user/userApiSlice.ts";
import {setUser} from "@/store/auth/authSlice.ts";
import {Button, Field} from "@/components/ui";
import {zodResolver} from "@hookform/resolvers/zod";

export const Login = () => {
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
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const response = await login({...data})

            console.log(response)

            if(response.data?.user) {
                console.log(response.data?.user)

                dispatch(
                    setUser({
                        _id: response.data.user._id,
                        role: response.data?.user.role,
                    })
                )

                navigate('/dashboard')
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

            <Button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Submit'}</Button>
        </form>
    )
}