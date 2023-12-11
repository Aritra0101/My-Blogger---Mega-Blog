import React from 'react'
import { useState, useEffect } from 'react'
import { articleService } from '../../services/appwrite';
import {Container, PostCard} from '../../components'
import { useSelector } from 'react-redux';


function HomePage() {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.auth.status)

    useEffect(() => {
        articleService.getPosts(posts).then((posts) => {
            if(posts) {
                setPosts(posts.documents);
            }
        })
    }, []);

    if (!user) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Please Login - HOMEPAGE
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
    
    if (posts.length === 0) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  NO POST FOUND - HOMEPAGE
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
                    {
                        posts.map((post) => (
                            <div key={post.$id} className="w-1/4 p-2">
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )


}

export default HomePage