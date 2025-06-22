import {Button, Field} from "@/components/ui";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCreateUserMutation} from "@/store/user/userApiSlice.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {defaultValues, type FormFields, schema} from "@/components/layouts/Register/register.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {setUser} from "@/store/auth/authSlice.ts";

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [createUser] = useCreateUserMutation()

    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const response = await createUser({
                ...data,
                role: 0,
                date: new Date(),
            })

            console.log('response from reg', response)

            if (response.data?.user) {
                dispatch(
                    setUser({
                        _id: response.data.user?._id,
                        role: response.data.user?.role,
                        email: response.data.user?.email,
                    }),
                )
            }

            navigate('/dashboard')
        } catch (error) {
            const err = error as { data?: { message?: string }; status?: number }

            if (err.status === 409) {
                setError('email', {
                    type: 'manual',
                    message: 'This email is already registered',
                })
            }
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)} >
            <div className="form__row">
                <h1>Register</h1>
            </div>

            <div className="form__row">
                <Field id='firstName' {...register('firstName')} placeholder='First name' />

                <span className={`hidden ${errors.firstName ? 'error' : ''}`}>{errors.firstName?.message}</span>
            </div>

            <div className="form__row">
                <Field id='lastName' {...register('lastName')} placeholder='Last name' />

                <span className={`hidden ${errors.lastName ? 'error' : ''}`}>{errors.lastName?.message}</span>
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