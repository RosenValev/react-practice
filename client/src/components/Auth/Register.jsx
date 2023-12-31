import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm.js'
import { validateRegisterData } from '../../utils/validationForm.js'

import * as userApi from '../../services/userApi.js'
import styles from './Auth.module.css'

let formInitialState = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
};

export default function Register() {
    const { formValues, setFormValues, onChangeHandler } = useForm(formInitialState)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const resetFormHandler = () => {
        setFormValues(formInitialState);
        setErrors({});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setErrors({});
            const validationErrors = validateRegisterData(formValues);

            if (Object.keys(validationErrors).length > 0) {
                return setErrors(state => ({ ...state, validationErrors }));
            }

            const response = await userApi.create(formValues);
            if (response.username == formValues.username) {
                resetFormHandler();
                navigate('/login');
            }
            if (!response.ok) {
                setErrors(state => ({ ...state, registerError: response.message }));
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    return (
        <div className={styles["login-register-div"]}>
            <div className={styles["login-register-box"]} >
                <h2>Register</h2>

                {errors.registerError && (
                    <p className={styles.errorMessage} >{errors.registerError}</p>
                )}

                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formValues.username}
                            onChange={onChangeHandler}
                            placeholder="Enter your username" />
                    </div>
                    {errors.validationErrors?.username && (
                        <p className={styles.errorMessage} >{errors.validationErrors.username}</p>
                    )}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formValues.email}
                            onChange={onChangeHandler}
                            placeholder="Enter your email" />
                    </div>
                    {errors.validationErrors?.email && (
                        <p className={styles.errorMessage} >{errors.validationErrors.email}</p>
                    )}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formValues.password}
                            onChange={onChangeHandler}
                            placeholder="Enter your password" />
                    </div>
                    {errors.validationErrors?.password && (
                        <p className={styles.errorMessage} >{errors.validationErrors.password}</p>
                    )}
                    <div>
                        <label htmlFor="repeatPassword">Repeat password:</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            value={formValues.repeatPassword}
                            onChange={onChangeHandler}
                            placeholder="Repeat password" />
                    </div>
                    {errors.validationErrors?.repeatPassword && (
                        <p className={styles.errorMessage} >{errors.validationErrors.repeatPassword}</p>
                    )}
                    <div>
                        <button className={styles["login-reg-button"]} type="submit" >Register</button>
                    </div>
                </form>
                <div>
                    <p> Have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </div>
        </div >
    );
}