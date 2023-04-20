import { Layout } from "antd";
import React from "react";

function Footer() {
    return (
        <Layout>
            <div id="footer" className="bg-dark text-white lg-light text-center text-lg-start">
                <div className="container p-4">
                    <div className="row">
                        <div id="cus-sp-infor" className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Thông tin hỗ trợ khách hàng</h5>
                            <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây:</p>
                            <ul className="list-unstyled mb-0">
                                <li>Email: support@example.com</li>
                                <li>Điện thoại: +84 123 456 789</li>
                            </ul>
                        </div>
    
                        <div id="ovewview" className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Giới thiệu về website</h5>
                            <p>Chúng tôi cung cấp các sản phẩm và dịch vụ tốt nhất cho khách hàng của mình.</p>
                        </div>
    
                        <div id="infor" className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Thông tin liên hệ</h5>
                            <ul className="list-unstyled mb-0">
                                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP HCM</li>
                                <li>Email: contact@example.com</li>
                                <li>Điện thoại: +84 987 654 321</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="license" className="text-center p-3">© 2023 Example.com</div>
        </Layout>
    );
}

export default Footer;