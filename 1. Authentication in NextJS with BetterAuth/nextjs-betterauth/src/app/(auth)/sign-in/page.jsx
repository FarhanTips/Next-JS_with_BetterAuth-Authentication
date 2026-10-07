

"use client";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";


const SignInPage = () => {

    const [isVisibleIn, setIsVisibleIn] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log("form's data", data);

        const { data: resdata, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: '/'
        })
        console.log("after submit", resdata, error);
    };

    const handleGoogleSignIn = async () => {
        const resData = await signIn.social({
            provider: "google"
        });
    }

    const handleGithubSignIn = async () => {
        const resData = await signIn.social({
            provider: "github"
        });
    }
    return (
        <div>
            <h2>Please Sign In</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Your Email" />
                    <FieldError />
                </TextField>
                <TextField
                    name="password"
                    isRequired
                    minLength={8}
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}>

                    <Label>Password</Label>

                    <InputGroup>
                        <InputGroup.Input
                            placeholder="Enter your password"
                            className="w-full max-w-70"
                            type={isVisibleIn ? "text" : "password"}
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisibleIn ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisibleIn(!isVisibleIn)}
                            >
                                {isVisibleIn ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        {/* <Check /> */}
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
            <small className="text-blue-600 underline"><Link href="/forgot-password">Forgot Password?</Link></small>
            <br></br>
            <br></br>
            
            <p>OR</p>
            <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
            <p>OR</p>
            <Button onClick={handleGithubSignIn}>Sign In with Github</Button>
        </div>
    );
};

export default SignInPage;