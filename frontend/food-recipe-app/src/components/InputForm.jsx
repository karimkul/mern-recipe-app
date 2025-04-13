import axios from "axios";
import { useState } from "react";

function InputForm({ setIsOpen }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    console.log(`Email: ${email}     Password: ${password}`);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const endPoint = isSignUp ? "api/signUp" : "api/login";
        await axios
            .post(`http://localhost:5000/${endPoint}`, {
                email,
                password
            })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setIsOpen();
            })
            .catch((err) =>
                setError(err.response?.data?.message || "Login failed")
            );
    };

    return (
        <>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="input"
                        required
                    />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="input"
                        required
                    />
                </div>
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
                <br />
                {error != "" && <h6 className="error">{error}</h6>}
                <p onClick={() => setIsSignUp((pre) => !pre)}>
                    {isSignUp
                        ? "Already have an account"
                        : "Create new account"}
                </p>
            </form>
        </>
    );
}

export default InputForm;
