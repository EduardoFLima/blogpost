import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const PostForm = ({ initialPost, onSubmitText, onSubmit }) => {
    
    // console.log('initialPost inside', initialPost);

    const [title, setTitle] = useState(initialPost?.title);
    const [content, setContent] = useState(initialPost?.content);

    return (
        <>
            <Text style={styles.label}>Title</Text>
            <TextInput
                autoCorrect={false}
                style={styles.input}
                value={title}
                onChangeText={(t) => setTitle(t)}
            />
            <Text style={styles.label}>Content</Text>
            <TextInput
                autoCorrect={false}
                style={styles.input}
                multiline={true}
                numberOfLines={5}
                value={content}
                onChangeText={(t) => setContent(t)}
            />
            <Button
                onPress={() => onSubmit({ title, content })}
                title={onSubmitText}
            />
        </>
    );
};

PostForm.defaultProps = { 
    initialPost: {
        title: '',
        content: ''
    }
}



const styles = StyleSheet.create({
    label: {
        marginLeft: 10,
        fontSize: 24
    },
    input: {
        margin: 10,
        padding: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black'
    }
});

export default PostForm;