import styled from 'styled-components';
import {React, useState} from 'react';
import { Login } from "./login";
import { motion } from "framer-motion";
import { Signup } from "./signup"
import { AccountContext } from "./accountContext";

const BoxContainer = styled.div`
    width: 320px;
    min-height: 573px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 70px;
`;

const BackDrop = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    width: 160%;
    top: -290px;
    left: -140px;
    transform: rotate(60deg);
    height: 550px;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 33%, rgba(18,79,143,1) 100%);
    z-index: 1;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const HeaderContainer = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HeaderText = styled.h2 `
    font-size: 30px;
    font-weight: 600;
    line-height: 1.25;
    color: #fff;
    z-index: 1;
    margin: 0;
`;

const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 1;
    margin: 0;
    margin-top: 10px;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    padding-top: 0;
`;

const backDropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        bordeRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.4,
    stiffiness: 30,
};

function Registration(props){
    const[isExpanded, setExpanded] = useState(false);
    const[active, setActive] = useState("signin");

    const playAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration*1000 - 1100);
    }

    const switchToSignup = () => {
        playAnimation();
        setTimeout(() => {
            setActive("signup")
        }, 400);
    }

    const switchToSignin = () => {
        playAnimation();
        setTimeout(() => {
            setActive("signin")
        }, 400);
    }

    const contextValue = { switchToSignup, switchToSignin};

    return(
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop initial={false} animate={isExpanded ? "expanded" : "collapsed"} variants={backDropVariants} transition={expandingTransition}/>
                    {active === "signin" && 
                    <HeaderContainer>
                        <HeaderText>Welcome</HeaderText>
                        <HeaderText>Back</HeaderText>
                        <SmallText>Please sign in to continue</SmallText>
                    </HeaderContainer>}
                    {active === "signup" &&
                    <HeaderContainer>
                        <HeaderText>Create</HeaderText>
                        <HeaderText>Account</HeaderText>
                        <SmallText>Please sign up to continue</SmallText>
                    </HeaderContainer>}
                </TopContainer>
                <InnerContainer>
                    {active === "signin" && <Login />}
                    {active === "signup" && <Signup />}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    );
}

export default Registration;