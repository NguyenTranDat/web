import React, { useEffect, useState } from "react";
import { Layout } from "antd";

import Footer from "./Footer";
import Content from "../Container/Content";
import Navbar from "./Navbar";
import Header from "./Header";

function Home(props) {
    const [searchTerm, setSearchTerm] = useState(" ");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            window.location.href = "/login"
        }
    }, [searchTerm]);

    return (
        <Layout>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Navbar setSearchTerm={setSearchTerm} isAdmin={isAdmin} />
            <Content searchTerm={searchTerm} />
            <Footer />
        </Layout>
    )
}

export default Home;