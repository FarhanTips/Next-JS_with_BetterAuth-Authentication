

import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

const ResetPassword = () => {
    return (
    <div>
        <Suspense fallback="loading...">
            <ResetPasswordForm></ResetPasswordForm>
        </Suspense>
    </div>
    )
};

export default ResetPassword;
