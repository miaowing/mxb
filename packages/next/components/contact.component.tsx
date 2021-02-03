import * as React from "react";
import { CreateForm } from "../decorators";
import { Input } from "./input.component";
import { Button } from "./button.component";
import { Query } from "./query.component";
import { GET_BANNER } from "../graphql/banner.gql";
import { UseEmailRule, UseRequiredRule } from "../helpers/input-rule.helper";

@CreateForm()
export class Contact extends React.Component<any, any> {
    submit() {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        const { form, loading } = this.props;

        return <div className="px-8 md:px-16 text-gray-500 leading-loose">
            <Query type="object" query={GET_BANNER} variables={{ key: 'contact-me' }} render={banner => (
                <div className="
                    text-center min-h-banner bg-no-repeat bg-cover bg-footer bg-center rounded-3xl
                    mb-14 text-white grid content-center relative p-8 overflow-hidden
                ">
                    <h1 className="text-center mx-auto mb-2 text-5xl max-w-title">{banner.title}</h1>
                    <div className="mx-auto text-center max-w-title text-100xl">{banner.content}</div>
                </div>
            )}/>
            <form className="relative z-20 bg-white -mt-40 mx-auto p-16 max-w-contact shadow-contact">
                <h5 className="text-4xl font-medium">Send me a Message</h5>
                <Input form={form} name="name" placeholder="Your Name *" rules={[UseRequiredRule('')]}/>
                <Input form={form} name="email" placeholder="Email Address *" rules={[UseEmailRule('')]}/>
                <Input
                    id="test" multiline={true}
                    form={form} name="message"
                    placeholder="Message *"
                    rules={[UseRequiredRule('')]}/>
                <div style={{ textAlign: 'right' }}>
                    <Button loading={loading} onClick={() => this.submit()}>
                        {loading ? 'Sending...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>;
    }
}
