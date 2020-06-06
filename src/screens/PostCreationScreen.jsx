import React, { useContext } from 'react';
import { Context as BlogContext } from '../context/BlogContext';
import PostForm from '../components/PostForm';

export default ({ navigation }) => {
    const { addPost } = useContext(BlogContext);

    return (
        <PostForm
            onSubmitText="Add Post"
            onSubmit={pressedAddPostButton(addPost, navigation)}
        />
    );

};

const pressedAddPostButton = (addPost, navigation) => (post) => {
    if (!post?.title || !post?.content)
        return;

    addPost(post, () => navigation.navigate('Posts'));
}