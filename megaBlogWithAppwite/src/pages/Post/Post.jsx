import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { articleService, featuredImageService } from '../../services/appwrite'
import { Button, Container } from '../../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    const [isAuthor, setIsAuthor] = useState(false)
    const [post, setPost] = useState(null);
    const {slug} = useParams(useState(null));
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);

    // const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug) {
            articleService.getPost(slug).then((post) => {
                if(post) {
                  setPost(post);
                  setIsAuthor(post.userId === userData.$id);
                }
                else navigate("/");
            })
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async() => {
        articleService.deletePost(slug.$id).then(async (status) => {
          if (status) {
            const file = await featuredImageService.deleteFeaturedImage(
              post.featuredImage
            );
            if(file) {
                navigate("/");
            }
          }
        });
    }
  
    return post ? (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={async () =>
                await featuredImageService.getFilePreview(post.featuredImage)
              }
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    ) : null;
}

export default Post