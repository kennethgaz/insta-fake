import { Avatar, Button, Card, Divider, Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet, View, Alert, Vibration, RefreshControl } from 'react-native';
import React, { Component, } from 'react';
import { inject, observer } from 'mobx-react';

import { CameraApp } from '../../components/camera.component';
import HomeStore from '../../stores/home.store';

interface Props {
  homeStore: HomeStore,
  navigation: any;
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {
  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const { getPosts } = this.props.homeStore;
    try {
      await getPosts();
    } catch (error) {
      Vibration.vibrate(1000);
      Alert.alert(
        "Não foi possível listar as postagens",
        error.message
      );
      console.log(error);
    }
  }

  render() {
    const { posts, photoReady, toogleStatus, loading, getPosts } = this.props.homeStore;

    const uploadPhoto = (uri?: string) => {
      const { addPost } = this.props.homeStore;

      if (uri) {
        Alert.alert(
          "Confirmação",
          "Deseja realmente postar?",
          [{
            text: "Cancelar",
            style: "cancel"
          }, {
            text: "OK", onPress: () => addPost(uri)
          }],
          { cancelable: false }
        );
      }

      toogleStatus(false);
    }

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getPosts()} />}>
          <CameraApp status={photoReady} onTakeCamera={(uri) => uploadPhoto(uri)} />

          {photoReady == false && <Button onPress={() => toogleStatus(true)}>Postar</Button>}

          {photoReady == false && posts.map((post, index) => (
            <Card key={index} style={styles.card}>
              <View style={styles.header}>
                <Avatar
                  size={'small'}
                  source={{ uri: post.author.avatar }}
                  style={styles.avatar} />
                <Text style={styles.title}>{post.author.name}</Text>
              </View>
              <Image style={styles.picture} source={{ uri: post.image }} />
              <Divider />
              <View style={styles.footer}>
                <Text style={styles.title}>{post.description}</Text>
              </View>
            </Card>))
          }
        </ScrollView>
      </Layout >);
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 1,
    margin: 4,
    backgroundColor: 'black'
  },
  header: {
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  scrollView: {
    backgroundColor: 'black',
    color: 'white',
    marginHorizontal: 20,
  },
  avatar: {
    marginRight: 5
  },
  picture: {
    width: 'auto',
    minHeight: 200,
    maxHeight: 500
  },
  footer: {
    paddingTop: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 15,
  },
});
