import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select } from "@/components/ui";
import { TextField } from "@/components/ui/TextField";
import { statusData } from "@/data/selects-data.ts";
import { useGetFeedbackByIdQuery, useUpdateFeedbackMutation } from "@/store/feedback/feedbackApiSlice.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type FormFields, schema } from "./editFeedback.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";

type FormStatus = "pending" | "resolved" | "closed";

export const EditFeedback = () => {
    const { feedbackId } = useParams();
    const [updateFeedback] = useUpdateFeedbackMutation();
    const { data, isLoading, isSuccess } = useGetFeedbackByIdQuery(feedbackId);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            content: "",
            status: "pending"
        }
    });

    useEffect(() => {
        if (isSuccess && data) {
            reset({
                content: data.content || "",
                status: data.status ? data.status as FormStatus : "pending"
            });
        }
    }, [data, isSuccess, reset]);

    const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
        try {
            const response = await updateFeedback({
                feedback: formData,
                _id: feedbackId
            })

            if(response.data){
                navigate('/dashboard')
            }
        } catch (e) {
            console.error('Error updating feedback', e);
        }
    }

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="form__row">
                <h1>Edit Feedback:</h1>
            </div>

            <div className="form__row">
               <label htmlFor="name">Name</label>
               <div className="field field--muted">
                   {data?.name}
               </div>
            </div>

            <div className="form__row">
                <label htmlFor="email">Email</label>
                <div className="field field--muted">
                    {data?.email}
                </div>
            </div>

            <div className="form__row">
                <label htmlFor="content">Content</label>
                <TextField
                    id='content'
                    {...register('content')}
                    placeholder='Feature Content'
                    defaultValue={data?.content}
                />
                {errors.content && (
                    <span className="error">{errors.content.message}</span>
                )}
            </div>

            <div className="form__row">
                <label htmlFor="category">Category</label>
                <div className="field field--muted">
                    {data?.category}
                </div>
            </div>

            <div className="form__row">
                <label htmlFor="status">Status</label>
                <Select
                    id='status'
                    {...register('status')}
                    options={statusData}
                    defaultValue={data?.status}
                />
                {errors.status && (
                    <span className="error">{errors.status.message}</span>
                )}
            </div>

            <Button
                type='submit'
                disabled={isSubmitting || !isDirty}
            >
                {isSubmitting ? 'Loading...' : 'Edit'}
            </Button>
        </form>
    )
}