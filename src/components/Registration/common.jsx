import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const MutedLink = styled.a`
    font-size: 12px;
    color: #A9A9A9;
    font-weight: 500;
    text-decoration: none !important;
`;

export const BoldLink = styled.a`
    font-size: 12px;
    color: #1888ff;
    font-weight: 500;
    text-decoration: none !important;
`;

export const Input = styled.input`
    outline: none;
    height: 42px;
    width: 100%;
    border: 1px solid rgba(150, 150, 150, 0.28);
    padding: 0 10px
    border-bottom: 1.4px solid transparent;
    transition: all, 0.2s ease-in-out;

    &::placeholder {
        color: #A9A9A9;
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(150, 150, 150, 0.28);
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid #1888ff;
    }
`;

export const SubmitButton = styled.button`
    display: block !important;
    width: 100%;
    padding: 11px 40%;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 0.3s ease-out;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 33%, rgba(18,79,143,1) 100%);

    &:hover {
        filter: brightness(1.03);
    }
`;

export const FieldContainer = styled.div`
    width: 100%;
    dislay: flex;
    flex-direction: column;
`;

export const FieldError = styled.span`
    color: #b32e2e;
    font-size: 11px;
    min-height: 18px;
`;

export const FormError = styled.span`
    color: #b32e2e;
    font-size: 12px;
    min-height: 20px;
    font-weight: 600;
`;

export const FormSuccess = styled.span`
    color: rgb(0, 107, 32);;
    font-size: 12px;
    min-height: 20px;
    font-weight: 600;
`;