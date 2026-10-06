"use client";

import { signUp } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

const SignUpPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        // console.log(e);
        // console.log(e.target);
        // console.log(e.currentTarget);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log("data from the form", data);

        const { data: resdata, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password
        })
        console.log("After sign up",resdata, error);
    };
    return (
        <div>
            <h2>Please Sign Up</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="Your Name" />
                    <FieldError />
                </TextField>
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
                            type={isVisible ? "text" : "password"}
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
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

        </div>
    );

}

export default SignUpPage;