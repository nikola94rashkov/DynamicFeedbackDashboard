import {useLoginMutation} from "@/store/user/userApiSlice.ts";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/auth/authSlice.ts";

export const Login = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation();


    const handleSubmit = async () => {

        const response = await login({
            email: "nikorashkov@abv.bg",
            password: "nikorashkov1234@"
        })

        console.log(response)

        if(response.data?.user) {
            console.log(response.data?.user)

            dispatch(
                setUser({
                    _id: response.data.user._id,
                    role: response.data?.user.role,
                })
            )
        }
    }

    return (
        <>
            <h1>Login</h1>

            <button onClick={() => handleSubmit()}>login</button>
        </>
    )
}