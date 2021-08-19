import React, { useState, useContext } from "react";
import { BoldLink, BoxContainer, FieldContainer, FieldError, FormContainer, FormError, Input, MutedLink, SubmitButton, FormSuccess } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import authService from "../../services/authService";

const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailReg = /^([a-zA-Z0-9_\-.]+)@decodecure.com$/;

const validationSchema = yup.object({
    name: yup.string().min(3, "Please enter valid name").required("Full name is required"),
    email: yup.string().matches(emailReg, "Please enter a valid email address").required(),
    password: yup.string().matches(passwordReg, "Password is weak! There should be at least one uppercase, lowercase, and digit characters").required(),
    confirmPassword: yup.string().required("Please confirm your password").when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export function Signup(props) {
    const { switchToSignin } = useContext(AccountContext);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    let history = useHistory();

    const onSubmit = async (values) => {
        const { confirmPassword, ...data } = values;

        const response = await axios
        authService.register(values.name, values.email, values.password, values.confirmPassword)
            .catch((err) => {
                if (err && err.response) setError(err.response.data.message);
                setSuccess(null);
            });
        if (response && response.data) {
            setError(null);
            setSuccess(response.data.message);
            history.push("/sentEmail");
            window.location.reload();
        }
        history.push("/sentEmail");
    };

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "", confirmPassword: "" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });


    return (
        <BoxContainer>
            {!success && <FormError>{error ? error : null}</FormError>}
            {success && <FormSuccess>Conformation email has been sent to you. Please click the link</FormSuccess>}
            <FormContainer onSubmit={formik.handleSubmit}>
                <FieldContainer>
                    <Input name="name" type="text" placeholder="Full Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <FieldError>{formik.touched.name && formik.errors.name ? formik.errors.name : ""}</FieldError>
                </FieldContainer>
                <Marginer direction="vertical" margin={5} />
                <FieldContainer>
                    <Input name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</FieldError>
                </FieldContainer>
                <Marginer direction="vertical" margin={5} />
                <FieldContainer>
                    <Input name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</FieldError>
                </FieldContainer>
                <Marginer direction="vertical" margin={5} />
                <FieldContainer>
                    <Input name="confirmPassword" type="password" placeholder="Confirm password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <FieldError>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</FieldError>
                </FieldContainer>
                <Marginer direction="vertical" margin={10} />
                <SubmitButton type="submit" disabled={!formik.isValid}>Signup</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Already have an accaunt?
                <BoldLink onClick={switchToSignin}> Sign in</BoldLink>
            </MutedLink>

        </BoxContainer>
    );
}