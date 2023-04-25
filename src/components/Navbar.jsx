import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = ()=>
{
    const {currentUser,logout} = useContext(AuthContext);
    console.log(currentUser)
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">MyBlog</Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=art">
                       <h6>ART</h6> 
                    </Link>
                    <Link className="link" to="/?cat=science">
                       <h6>SCIENCE</h6> 
                    </Link>
                    <Link className="link" to="/?cat=technology">
                       <h6>TECHNOLOGY</h6> 
                    </Link>
                    <Link className="link" to="/?cat=cinema">
                       <h6>CINEMA</h6> 
                    </Link>
                    <Link className="link" to="/?cat=design">
                       <h6>DESIGN</h6> 
                    </Link>
                    <Link className="link" to="/?cat=food">
                       <h6>FOOD</h6> 
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <button className="btn" onClick={() => logout()}>Logout</button>
                    ) : (
                        <Link className="btn" to="/login">
                        Login
                        </Link>
                    )}
                    <span className="write">
                        <Link className="link" to="/write">
                            Write
                        </Link>
                    </span>

                    <span className="write">
                        <Link className="link" to="/drafts">
                            Drafts
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar