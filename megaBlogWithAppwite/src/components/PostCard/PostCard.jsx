import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { featuredImageService } from '../../services/appwrite'

function PostCard({$id, title, featuredImage}) {
  const [featuredImageSrc, setFeaturedImageSrc] = useState();
  useEffect(() => {
    featuredImageService
      .getFilePreview(featuredImage)
      .then((filePreview) => setFeaturedImageSrc(filePreview));
  }, [])
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={featuredImageSrc}
            alt="featuredImage"
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard