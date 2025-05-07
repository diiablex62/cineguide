import React, { useState } from 'react'
import { CommentContext } from '../../context/CommentContext'

export default function CommentProvider({children}) {
    const [comments, setComments] = useState([
        {
          id: 1,
          author: "Cinéphile23",
          rating: 5,
          text: "Un chef-d'œuvre intemporel du cinéma. La performance de Marlon Brando est extraordinaire et la réalisation de Coppola est magistrale.",
          avatar: null
        }
      ]);
    
      const addComment = (newComment) => {
        setComments([...comments, {
          id: comments.length + 1,
          ...newComment
        }]);
      };
    

  return (
    <CommentContext.Provider value={{ comments,addComment}}>{children}</CommentContext.Provider>
  )
}
