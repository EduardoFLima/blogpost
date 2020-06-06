import React, { useContext, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const PostsScreen = ({ navigation }) => {
    const { posts, listPosts, deletePost } = useContext(BlogContext);

    useEffect(() => {
        listPosts();
        
        console.log(navigation);
        const listener = navigation.addListener('didFocus', () => {
            listPosts();
        });

        return () => {
            listener.remove();
        }
    }, []);


    // console.log('context obj', posts);

    return <>
        {!posts || posts.length == 0 ? null :
            <View style={styles.listContainer}>
                <FlatList
                    style={styles.postList}
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item.id })}>
                            <View style={styles.postItem}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => deletePost(item.id)} style={styles.trashBinTouchable} >
                                    <FontAwesome5 name="trash-alt" style={styles.trashBin} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    }}
                />
            </View>
        }
    </>;
}

PostsScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () =>
            <TouchableOpacity onPress={() => navigation.navigate('PostCreation')}  >
                <Entypo name="plus" size={30} color="black" />
            </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    listContainer: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        margin: 20,
    },
    postItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 50,
        borderColor: 'lightgray',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    itemTitle: {
        fontSize: 18,
    },
    trashBin: {
        fontSize: 24,
        color: 'black',
    },
});

export default PostsScreen;