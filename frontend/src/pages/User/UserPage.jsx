// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { getPosts } from "../../services/posts";
// import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import WeatherForeCast from "../../components/WeatherForecast";

export function UserPage() {
  // const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const loggedIn = token !== null;
  //   if (loggedIn) {
  //     getPosts(token)
  //       .then((data) => {
  //         setPosts(data.posts);
  //         localStorage.setItem("token", data.token);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         navigate("/login");
  //       });
  //   }
  // }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      {/* <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div> */}
      <WeatherForeCast/>
      <LogoutButton />
    </>
  );
}
