const React = require('react');

module.exports = class extends React.Component {
    render() {
        return <html>
        <body>
        <div>
            <h1>Notification</h1>
            <p>You have unread reply on mxb.cc</p>
            <br/>
            <div>{this.props.content}</div>
            <br/>
            <div><a href={this.props.url}>Visit →</a></div>
        </div>
        </body>
        </html>;
    }
};
