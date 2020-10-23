const React = require('react');

module.exports = class extends React.Component {
    render() {
        return <html>
        <body>
        <div>
            <p>请点击下面的地址验证你的帐号：</p>
            <p>{this.props.externalUrl}/auth-app/activate/{this.props.code}</p>
            <p>如果你有任何疑问，可以回复这封邮件向我们提问。</p>
            <p>焱融科技</p>
        </div>
        </body>
        </html>;
    }
};
