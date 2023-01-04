import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { useForm } from "@/hooks/useForm"
import { userService } from "@/services/user"
import { useQuery } from '@/hooks/useQuery'
import { confirm, minMax, password, regexp, required, requiredLetter } from "@/utils/rule"
import { handleError } from "@/utils/handleError"
import { message } from "antd"
import { useAsync } from "@/hooks/useAsync"


const registerRule = {
    name: [required(), requiredLetter(2)],
    username: [required(), regexp('email')],
    password: [required(), minMax(6, 32), password(1)],
    confirmPassword: [confirm('password')]
}


export default function Account() {
    const registerForm = useForm(registerRule, {
        dependencies: {
            password: ['confirmPassword']
        }
    })

    const { refetch: registerService, loading: registerLoading } = useQuery({
        queryFn: ({ params }) => userService.register(...params),
        enabled: false,
        limitDuration: 1000
    })

    const onSubmitRegister = async (ev) => {
        const startTime = Date.now()

        try {
            ev.preventDefault()
            if (registerForm.validate()) {
                const res = await registerService(registerForm.values)
                if (res.message) {
                    message.success(res.message)
                }
            }
        } catch (err) {
            handleError(err)
        }
        const endTime = Date.now()
        console.log(endTime - startTime)

    }
    return (
        <section className="py-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg mb-10 mb-md-0">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">Returning Customer</h6>
                                {/* Form */}
                                <form>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="loginEmail">
                                                    Email Address *
                                                </label>
                                                <input className="form-control form-control-sm" id="loginEmail" type="email" placeholder="Email Address *" required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Password */}
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="loginPassword">
                                                    Password *
                                                </label>
                                                <input className="form-control form-control-sm" id="loginPassword" type="password" placeholder="Password *" required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md">
                                            {/* Remember */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input" id="loginRemember" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="loginRemember">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group">
                                                <a className="font-size-sm text-reset" data-toggle="modal" href="#modalPasswordReset">Forgot
                                                    Password?</a>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <a href="./account-personal-info.html" className="btn btn-sm btn-dark" type="submit">
                                                Sign In
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">New Customer</h6>
                                {/* Form */}
                                <form onSubmit={onSubmitRegister}>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <Field {...registerForm.register('name')} placeholder="Full name *" />
                                        </div>
                                        <div className="col-12">
                                            {/* Email */}
                                            {/* <div className="form-group">
                                                <label className="sr-only" htmlFor="registerEmail">
                                                    Email Address *
                                                </label>
                                                <input className="form-control form-control-sm" id="registerEmail" type="email" placeholder="Email Address *" required />
                                            </div> */}
                                            <Field {...registerForm.register('username')} placeholder="Email Address *" />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            {/* <div className="form-group">
                                                <label className="sr-only" htmlFor="registerPassword">
                                                    Password *
                                                </label>
                                                <input className="form-control form-control-sm" id="registerPassword" type="password" placeholder="Password *" required />
                                            </div> */}
                                            <Field {...registerForm.register('password')} placeholder="Password *" type="password" />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            {/* <div className="form-group">
                                                <label className="sr-only" htmlFor="registerPasswordConfirm">
                                                    Confirm Password *
                                                </label>
                                                <input className="form-control form-control-sm" id="registerPasswordConfirm" type="password" placeholder="Confrm Password *" required />
                                            </div> */}
                                            <Field {...registerForm.register('confirmPassword')} placeholder="Confirm Password *" type="password" />

                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group font-size-sm text-muted">
                                                By registering your details, you agree with our Terms &amp; Conditions,
                                                and Privacy and Cookie Policy.
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <Button loading={registerLoading}>
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



