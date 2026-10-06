"use client";

import { updateUser } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

export default function Basic() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log("In the form", data);
        
        const res = await updateUser({
            name: data.name
        })
        console.log("After changing name", res);
    };

    return (
        <Form className="w-full max-w-96" onSubmit={onSubmit}>
            <Fieldset>
                <Fieldset.Legend>Profile Settings</Fieldset.Legend>
                <Description>Update your profile information.</Description>
                <FieldGroup>
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
                        <Input placeholder="New Name" />
                        <FieldError />
                    </TextField>
                </FieldGroup>
                <Fieldset.Actions>
                    <Button type="submit">
                        <FloppyDisk />
                        Save changes
                    </Button>
                    <Button type="reset" variant="secondary">
                        Cancel
                    </Button>
                </Fieldset.Actions>
            </Fieldset>
        </Form>
    );
}