import { Layout, Row, Col } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import './Footer.scss';

function Footer() {
    const { Footer: AntFooter } = Layout;

    return (
        <AntFooter style={{ background: '#fafafa' }}>
            <Row className="just">
                <Col xs={24} md={12} lg={12}>
                    <div className="copyright">
                        © 2021, made with
                        {<HeartFilled />} by
                        <a href="https://github.com/UIT19520989" className="font-weight-bold">
                            NVT
                        </a>
                        for a better web.
                    </div>
                </Col>
                <Col xs={24} md={12} lg={12}>
                    <div className="footer-menu">
                        <ul>
                            <li key="0" className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    Creative Tim
                                </a>
                            </li>
                            <li key="1" className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    About Us
                                </a>
                            </li>
                            <li key="2" className="nav-item">
                                <a href="#pablo" className="nav-link text-muted" target="_blank">
                                    Blog
                                </a>
                            </li>
                            <li key="3" className="nav-item">
                                <a href="#pablo" className="nav-link pe-0 text-muted" target="_blank">
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </AntFooter>
    );
}

export default Footer;
