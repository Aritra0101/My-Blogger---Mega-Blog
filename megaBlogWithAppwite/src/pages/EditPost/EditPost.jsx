import React from 'react'
import { useState, useEffect } from 'react'
import { Container, PostForm } from '../../components'
import { articleService } from '../../services/appwrite'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setpost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) {
            articleService.getPost((post) => {
                if (post) {
                    setpost(post);
                }
            })
        } else {
            navigate("/");
        }
    }, []);

  return (
    post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
  )
}

export default EditPost