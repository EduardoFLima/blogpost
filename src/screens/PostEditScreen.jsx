import React, { useContext } from 'react';
import PostForm from '../components/PostForm';
import { Context as BlogContext } from '../context/BlogContext';

export default ({ navigation }) => {
    const { posts, editPost } = useContext(BlogContext);

    const post = posts.find(it => it.id === navigation?.getParam('id'));

    // console.log('initialPost', initialPost);

    return (
        <PostForm
            initialPost={post}
            onSubmitText="Save"
            onSubmit={pressedSavePostButton(post.id, editPost, navigation)}
        />
    );
};

const pressedSavePostButton = (id, editPost, navigation) => (post) => {
    if (!post?.title || !post?.content)
        return;

    editPost({ id, title: post.title, content: post.content },
        () => navigation.pop());
}