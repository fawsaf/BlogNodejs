import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Edit from '../img/edit.png';
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
import moment from "moment";
import { stripHtml } from "./Home";
const Single = () => {
    const [post, setPost] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);

                setPost(res.data);

            }
            catch (err) {

                console.log(err)
            }
        };
        fetchData();

    }, [postId])
    const handleDelete = async () => {
        console.log(postId);
        try {
            await axios.delete(`/posts/${postId}`);
            //console.log(postId);
            navigate('/');
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="single">
            <div className="content">
                {post.img && post.img.startsWith('http') ? (
                    <img src={post.img} alt="" />
                ) : (
                    <img src={`../upload/${post.img}`} alt="" />
                )}

                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}

                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {
                        currentUser?.username === post.username &&
                        (
                            <div className="edit">
                                <Link to={`/write?edit=${postId}`} state={post}>
                                    <img src={Edit} alt="" />
                                </Link>
                                <img onClick={handleDelete} src={Delete} alt="" />
                            </div>
                        )
                    }
                </div>
                <h1>{post.title}</h1>

                <p>{stripHtml(post.desc)}</p>
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single