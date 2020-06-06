import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostsScreen from './src/screens/PostsScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import PostCreationScreen from './src/screens/PostCreationScreen';
import PostEditScreen from './src/screens/PostEditScreen';
import { Provider as BlogProvider } from './src/context/BlogContext';

const stackNavigator = createStackNavigator({
  Posts: PostsScreen,
  PostDetail: PostDetailScreen,
  PostCreation: PostCreationScreen,
  PostEdit: PostEditScreen
}, {
  initialRouteName: 'Posts',
  defaultNavigationOptions: {
    title: 'List of posts'
  }
});

const NavigatorContainer = createAppContainer(stackNavigator)

export default () => {
  return (
    <BlogProvider>
      <NavigatorContainer />
    </BlogProvider>
  );
}