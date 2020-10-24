import * as React from "react";
import { CreateForm } from "../decorators";
import { Input } from "./input.component";
import { Button } from "./button.component";
import styles from './contact.component.module.less';
import postStyles from './post.component.module.less';
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

        return <div className={`${postStyles.post} ${styles.contact}`}>
            <Query type="object" query={GET_BANNER} variables={{ key: 'contact-me' }} render={banner => (
                <div className={postStyles.thumbnail}>
                    <h1 className={`${postStyles.title} ${styles.limit}`}>{banner.title}</h1>
                    <div className={`${postStyles.meta} ${styles.limit}`}>{banner.content}</div>
                </div>
            )}/>
            <form>
                <h5>Send me a Message</h5>
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
