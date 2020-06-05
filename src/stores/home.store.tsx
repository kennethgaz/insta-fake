import { Post, getPosts } from '../apis/posts.api';
import { action, observable } from 'mobx';

export default class HomeStore {
  @observable photoReady: boolean = false;
  @observable posts: Post[] = [];
  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false
    }
  }

  @action addPost = (uriPhoto) => {
    const post: Post = {
      author: {
        avatar: 'https://media-manager.noticiasaominuto.com/1920/1569828741/naom_5d91af55df2fe.jpg',
        id: 2,
        name: 'bojack'
      },
      authorId: 2,
      description: 'minha foto',
      id: this.posts.length + 1,
      image: uriPhoto
    };

    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }
}

const homeStore = new HomeStore();
export { homeStore };
