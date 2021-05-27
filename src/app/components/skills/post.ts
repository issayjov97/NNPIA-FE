import { Category } from './category';

export class Posts {
  totalCount: number;
  posts: Post[];
  constructor() {
    this.posts = [];
  }
}

export class Post {
  id: string;
  title: string;
  type: PostType;
  description: string;
  details: string;
  author: Author;
  category: Category;

}

export class Author {
  firstname: String;
  lastname: String;
  rating: String;
  available: String;
  earned: String;
  used: String;
  username: String;

}

export enum PostType {
  NEEDS,
  SKILLS
}


