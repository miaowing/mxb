import * as React from "react";
import { CreateForm } from "../decorators";
import { Input } from "../components/input.component";
import { Button } from "../components/button.component";
import { Query } from "../components/query.component";
import { GET_BANNER } from "../graphql/banner.gql";
import { UseEmailRule, UseRequiredRule } from "../helpers/input-rule.helper";
import { Icons } from '../constants/icons.constants';

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
        const { form, loading, meta } = this.props;
        console.log(Icons().contactEmail);
        return <div className="px-8 md:px-16 text-gray-500 leading-loose">
            <Query type="object" query={GET_BANNER} variables={{ key: 'contact-me' }} render={banner => (
                <div className="
                    text-center min-h-banner bg-no-repeat bg-cover bg-footer bg-center rounded-3xl
                    mb-14 text-white grid content-center relative p-8 overflow-hidden
                ">
                    <h1 className="text-center mx-auto mb-2 text-5xl max-w-screen-sm">{banner.title}</h1>
                    <div className="mx-auto text-center max-w-screen-sm text-100xl">{banner.content}</div>
                </div>
            )}/>
            <div
                className="
                    -mt-40 mx-auto shadow-contact container md:max-w-screen-sm
                    lg:max-w-screen-md xl:max-w-screen-lg relative z-20 block md:flex
                ">
                <form className="bg-white p-24 flex-2">
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
                <div className="flex-1 bg-contact p-24">
                    <h5 className="text-4xl font-medium text-white mb-16">Contact Details</h5>
                    <div className="mb-12">
                        <span className="inline-block align-top">{Icons().position}</span>
                        <p className="inline-block text-100xl text-white font-extralight pl-7 leading-8">
                            {meta?.address}
                        </p>
                    </div>
                    <div className="mb-12">
                        <span className="inline-block align-top">{Icons().contactEmail}</span>
                        <p className="inline-block text-100xl text-white font-extralight pl-7 leading-8">
                            <a href={`mailto:${meta?.admin_email}`}>{meta?.admin_email}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>;
    }
}
