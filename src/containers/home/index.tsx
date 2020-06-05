import React, { Component, } from 'react';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/home.store';
import { Layout, Card, Avatar, Text, Divider } from '@ui-kitten/components';
import { ScrollView, View, Image } from 'react-native';

interface Props {
  homeStore: HomeStore,
  navigation: any;
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {
  async componentDidMount() {
    const { getPosts } = this.props.homeStore;
    await getPosts();
  }

  render() {
    const { posts } = this.props.homeStore;
    return (
      <Layout style={{ flex: 1, backgroundColor: 'black' }}>
        <ScrollView>
          {posts.map((post, index) => {
            <Card key={index} style={}>
              <View>
                <Avatar
                size={"small"}
                source={{ uri: post.author.avatar }} />
                <Text>{post.author.name}</Text>
              </View>
              <Image source= {{ uri: post.image }} />
              <Divider />
              <View>
                <Text>{post.description}</Text>
              </View>
            </Card>
          })}
        </ScrollView>
      </Layout>);
  }
}