import * as React from "react";
import { CreateForm } from "../decorators";
import { Input } from "./input.component";
import { Button } from "./button.component";
import styles from './contact.component.module.less';
import postStyles from './post.component.module.less';
import { Query } from "./query.component";
import { GET_BANNER } from "../graphql/banner.gql";

@CreateForm()
export class Contact extends React.Component<any, any> {
    submit() {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    render() {
        const { form } = this.props;

        return <div className={`${postStyles.post} ${styles.contact}`}>
            <Query type="object" query={GET_BANNER} variables={{ key: 'contact-me' }} render={banner => (
                <div className={postStyles.thumbnail}>
                    <h1 className={`${postStyles.title} ${styles.limit}`}>{banner.title}</h1>
                    <div className={`${postStyles.meta} ${styles.limit}`}>{banner.content}</div>
                </div>
            )}/>
            <form>
                <h5>Send me a Message</h5>
                <Input form={form} name="name" placeholder="Your Name *"/>
                <Input form={form} name="email" placeholder="Email Address *"/>
                <Input id="test" multiline={true} form={form} name="message" placeholder="Message *"/>
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => this.submit()}>submit</Button>
                </div>
            </form>
        </div>;
    }
}
