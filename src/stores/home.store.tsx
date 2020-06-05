import { action, observable } from 'mobx';

import axios from 'axios';

type Post = {
    id: number;
    authorId: number;
    image: string;
    description: string;
    author: {
        id: number;
        name: string;
        avatar: string;
    }
}

export default class HomeStore {
    @observable posts: Post[] = [];

    @action getPosts = async () => {
        try {
            const { data: posts } = await axios.get<[Post]>('http://localhost:3000/feed?_expand=author')
            this.posts = posts;
        } catch (error) {
            this.posts = [];
        }
    }
}

const homeStore = new HomeStore();
export { homeStore };
