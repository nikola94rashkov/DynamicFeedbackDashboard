import {type SubmitHandler, useForm} from "react-hook-form";
import {useCreateFeedbackMutation} from "@/store/feedback/feedbackApiSlice.ts";
import {Button, Field, Select} from "@/components/ui";
import type {FormFields} from "@/components/layouts/CreateFeedback/createFeedback.schema.ts";
import {TextField} from "@/components/ui/TextField";
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultValues, schema} from "./createFeedback.schema.ts";
import {categoryData, statusData} from "@/data/selects-data.ts";
import {useNavigate} from "react-router-dom";
import { toast } from 'sonner'

export const CreateFeedback = () => {
    const [createFeedback] = useCreateFeedbackMutation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const response = await createFeedback({...data})

            if(response?.data?.feedback) {
                reset();
                navigate('/dashboard');
                toast.success("Feedback successfully created");
            }
        } catch (e) {
            toast.error("Error creating feedback");
            console.error('Error creating feedback', e);
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)} >
            <div className="form__row">
                <h1>Create Feedback</h1>
            </div>

            <div className="form__row">
                <label htmlFor="name">Name</label>
                <Field id='name' {...register('name')} placeholder='Name' />

                <span className={`hidden ${errors.name ? 'error' : ''}`}>{errors.name?.message}</span>
            </div>

            <div className="form__row">
                <label htmlFor="email">Email</label>
                <Field id='email' {...register('email')} placeholder='Email'/>

                <span className={`hidden ${errors.email ? 'error' : ''}`}>{errors.email?.message}</span>
            </div>

            <div className="form__row">
                <label htmlFor="content">Content</label>
                <TextField id='content' {...register('content')} placeholder='Feature Content' />

                <span className={`hidden ${errors.content ? 'error' : ''}`}>{errors.content?.message}</span>
            </div>

            <div className="form__row">
                <label htmlFor="category">Category</label>
                <Select  id='category' {...register('category')} options={categoryData}/>

                <span className={`hidden ${errors.category ? 'error' : ''}`}>{errors.category?.message}</span>
            </div>

            <div className="form__row">
                <label htmlFor="status">Status</label>
                <Select  id='status' {...register('status')} options={statusData}/>

                <span className={`hidden ${errors.status ? 'error' : ''}`}>{errors.status?.message}</span>
            </div>

            <Button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Create'}</Button>
        </form>
    )
}