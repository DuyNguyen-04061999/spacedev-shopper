import { Button } from "@/components/Button";
import { ErrorText } from "@/components/Field/ErrorText";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useQuery } from "@/hooks/useQuery";
import { organizationService } from "@/services/organization";
import { cn } from "@/utils";
import { regexp, required } from "@/utils/rule";
import { message } from "antd";
import { useRef } from "react";


const rules = {
    name: [required()],
    phone: [required(), regexp('phone')],
    content: [required()]
}

export default function Contact() {
    const form = useRef()
    const { loading, refetch: contactService } = useQuery({
        queryFn: ({ params }) => organizationService.contact(...params),
        enabled: false
    })

    const onSubmit = async (values) => {
        try {
            await contactService(values)
            message.success('Gửi thông tin liên hệ thành công, chúng tôi sẽ giải quyết trong thời gian sớm nhất')
            form.current.reset()
        }catch(err) {

        }
    }


    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Contact Us</h3>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-12 col-md-4 col-xl-3">
                        <aside className="mb-9 mb-md-0">
                            {/* Heading */}
                            <h6 className="mb-6">
                                <i className="fe fe-phone text-primary mr-4" /> Call to Us:
                            </h6>
                            {/* Text */}
                            <p className="text-gray-500">
                                We're available from 10 am - 10 pm EST,
                                7 days a week.
                            </p>
                            <p>
                                <strong>Customer Service:</strong><br />
                                <a className="text-gray-500" href="tel:60146-389-574">6-146-389-574</a>
                            </p>
                            <p className="mb-0">
                                <strong>Careers:</strong><br />
                                <a className="text-gray-500" href="tel:60146-389-574">6-146-389-574</a>
                            </p>
                            {/* Divider */}
                            <hr />
                            {/* Heading */}
                            <h6 className="mb-6">
                                <i className="fe fe-mail text-primary mr-4" /> Write to Us:
                            </h6>
                            {/* Text */}
                            <p className="text-gray-500">
                                Fill out our form and we will contact you
                                within 24 hours.
                            </p>
                            <p>
                                <strong>Customer Service:</strong><br />
                                <a className="text-gray-500" href="mailto:customer@example.com">customer@example.com</a>
                            </p>
                            <p className="mb-0">
                                <strong>Careers:</strong><br />
                                <a className="text-gray-500" href="mailto:careers@example.com">careers@example.com</a>
                            </p>
                            {/* Divider */}
                            <hr />
                            {/* Heading */}
                            <h6 className="mb-6">
                                <i className="fe fe-mail text-primary mr-4" /> Find Us:
                            </h6>
                            {/* Text */}
                            <p className="mb-0 text-gray-500">
                                Want to visit our Offline Stores?
                            </p>
                            {/* Button */}
                            <p className="mb-0">
                                <a className="btn btn-link px-0 text-body" href="store-locator.html">
                                    Go to Store Locator <i className="fe fe-arrow-right ml-2" />
                                </a>
                            </p>
                        </aside>
                    </div>
                    <div className="col-12 col-md-8">
                        {/* Form */}
                        <Form onSubmit={onSubmit} ref={form} form={{ rules }} className="flex gap-7 flex-col">
                            <Form.Item name="name">
                                <Input placeholder="Your Name *" />
                            </Form.Item>
                            <Form.Item name="email">
                                <Input placeholder="Your Email" />
                            </Form.Item>
                            <Form.Item name="phone">
                                <Input placeholder="Your Phone *" />
                            </Form.Item>
                            <Form.Item name="title">
                                <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item name="content">
                                {(props) => <div className="relative">
                                    <textarea value={props.value} onChange={(ev) => props.onChange(ev.target.value)} class={cn("form-control form-control-sm", { 'border !border-[red]': props.error })} rows="5" placeholder="Message *"
                                    ></textarea>
                                    {props.error && <ErrorText>{props.error}</ErrorText>}
                                </div>}
                            </Form.Item>

                            {/* Button */}
                            <div>
                                <Button loading={loading}>
                                    Send Message
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

    )
}
