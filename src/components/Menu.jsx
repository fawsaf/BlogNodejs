import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/?cat=${cat}`);
      setPosts(res.data);

    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
    console.log(posts);
  }, [cat])

  return (

    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(
        post => (
          <div className="post" key={post.id}>
            {post.img && post.img.startsWith('http') ? (
              <img src={post.img} alt="" />
            ) : (
              <img src={`../upload/${post.img}`} alt="" />
            )}
            <Link className="link" to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            
          </div>
        )
      )

      }
    </div>

  )
}

export default Menu