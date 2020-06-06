import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const PostDetail = ({ navigation }) => {
    const { posts } = useContext(BlogContext);

    const id = navigation?.getParam('id');

    const post = posts.find(post => post.id === id);

    // console.log('detail', posts, id, post);

    return (
        <>
            {!post ? <Text> NOT FOUND </Text> :
                <>
                    <Text>{post.title}</Text>
                    <Text>{post.content}</Text>
                </>
            }
        </>
    );
};

PostDetail.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => {
            const id = navigation?.getParam('id');
            return (
                <TouchableOpacity onPress={() => navigation.navigate('PostEdit', { id })} >
                    <Feather name="edit-2" size={30} color="black" />
                </TouchableOpacity>
            );
        }
    }
}

export default PostDetail;