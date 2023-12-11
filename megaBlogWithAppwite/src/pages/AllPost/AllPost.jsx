import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../../components";
import { articleService } from "../../services/appwrite";

function AllPost() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        articleService.getPosts([])
        .then((posts) => {
            if(posts) {
                setPosts(posts.documents);
            }
        });
    }, [])

    if (posts.length === 0) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  NO POST FOUND - ALL POST PAGE
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) =>
            post.status? (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
