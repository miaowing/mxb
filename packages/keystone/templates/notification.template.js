const React = require('react');

module.exports = class extends React.Component {
    render() {
        const template = `
        <div style="background-color: gray; width: 100%;">
            <div style="background-color: white">
                <div style="padding: 40px 20px;">
                    <img src="https://mxbcc.oss-cn-beijing.aliyuncs.com/uploads/5f997a2969a95300180f0988-5f9461f9243bbe001975bc59-12780562.jpeg"
                         style="height: 60px; width: 60px; border-radius: 60px; margin: 0 auto; display: block;"
                         alt="猫小白"/>
                    <div style="margin-top: 20px;">
                        <p style="color: rgba(0,0,0,0.6)">Dear: ${this.props.name}，您有新的评论：</p>
                        <p style="margin-bottom: 20px;">${this.props.content}</p>
                        <a style="display: inline-block; text-decoration: none; background-color: #18142e; color: white; padding: 10px 16px; border-radius: 4px;" href=${this.props.url} target="_blank">
                            点击查看详情
                        </a>
                    </div>
                </div>

                <footer style="background-color: #18142e; color: rgba(255, 255, 255, 0.6); font-size: 12px; padding: 20px 0; text-align: center;">
                    © 猫小白 2020 - 2021
                </footer>
            </div>
        </div>
        `;
        return <div dangerouslySetInnerHTML={{__html: template}}/>;
    }
};
