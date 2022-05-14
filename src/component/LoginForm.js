import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({ existingUser }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //await FirebaseAuthService.registerUser(user, password);
            await FirebaseAuthService.loginUser(user, password);
            setUser("");
            setPassword("");
        }
        catch (error) {
            alert(error.message)
        }
    }

    const handleLogout = () => {
        FirebaseAuthService.logoutUser();
    }

    const handleSendResetPasswordEmail = async () => {
        if (!user) {
            alert("Missing User");
            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(user);
            alert("sent the password");
        }
        catch (err) {
            alert(err.message);
        }
    }

    const handleLoginWithGoogle = async () => {
        try {
            await FirebaseAuthService.loginWithGoogle();
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="login-form-container">
            {
                existingUser ? (<div className="row">
                    <h3>Welcome, {existingUser.email}</h3>
                    <button type="button" className="primary-button" onClick={handleLogout}>Logout</button>
                </div>) :
                    (<form onSubmit={handleSubmit} className="login-form">
                        <label className="input-label login-label">
                            Username (email):
                            <input type="email" required value={user} onChange={(e) => setUser(e.target.value)} />
                        </label>
                        <label className="input-label login-label">
                            Password:
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <div className="button-box">
                            <button className="primary-button">Submit</button>
                            <button className="primary-button" type="button" onClick={handleSendResetPasswordEmail}>Reset Password</button>
                            <button className="primary-button" type="button" onClick={handleLoginWithGoogle}>Login With Google</button>
                        </div>
                    </form>
                    )
            }
        </div>
    )
}

export default LoginForm;   