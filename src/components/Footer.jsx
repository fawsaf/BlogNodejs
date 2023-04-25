import React from "react";
import moment from "moment";
const Footer = ()=>
{
    return (
        <footer>
            <div className="logo">MyBlog</div>
            <div className="rights">© {moment().format('YYYY')} MyBlog. All rights reserved.</div>
        </footer>
    )
}

export default Footer