import { useState } from "react";
import verification from "../../services/verification";

const RequestPasswordReset = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMEssage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const emailObject = {
                emailAddress: email
            }
            const data = await verification.RequestPasswordReseting(emailObject);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Reset your password</p>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    );
};

export default RequestPasswordReset;
