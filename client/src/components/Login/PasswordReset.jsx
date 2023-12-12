import { useParams } from "react-router-dom";
import { useState } from "react";
import verification from "../../services/verification";
const PasswordReset = () => {
    const token = useParams().token;
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== passwordRepeat) {
            setErrorMessage("Passwords are not the same");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }

        try {
            const passwordObject = {
                password: password
            };
            const data = await verification.changePassword(passwordObject, token);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input placeholder="Repeat password" type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}/>
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default PasswordReset;
