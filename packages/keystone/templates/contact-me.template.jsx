const React = require('react');

module.exports = class extends React.Component {
    render() {
        return <html>
        <body>
        <div>
            <p>{this.props.name}</p>
            <p>{this.props.email}</p>
            <p>{this.props.message}</p>
        </div>
        </body>
        </html>;
    }
};
