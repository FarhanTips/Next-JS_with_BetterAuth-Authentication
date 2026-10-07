
"use client";
import { changePassword } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const ChangePasswordPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log("data from form", data);

        const result = await changePassword({
            newPassword: data.newpassword,
            currentPassword: data.currentpassword,
            revokeOtherSessions: true,
        });
        console.log("After submitting form", result);
    };
    return (
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <TextField
                isRequired
                minLength={8}
                name="currentpassword"
                type="password"
            >
                <Label>Current Password</Label>
                <Input placeholder="Enter your Current password" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                minLength={8}
                name="newpassword"
                type="password"
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
                }}
            >
                <Label>New Password</Label>
                <Input placeholder="Enter your new password" />
                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                <FieldError />
            </TextField>
            <div className="flex gap-2">
                <Button type="submit">
                    <Check />
                    Submit
                </Button>
                <Button type="reset" variant="secondary">
                    Reset
                </Button>
            </div>
        </Form>
    );

};

export default ChangePasswordPage;