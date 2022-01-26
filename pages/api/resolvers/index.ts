import { EPostPermission, IPost } from '../../../models/PostModel';

const initialState: Array<IPost> = [
  {
    id: 'adrian',
    dateTime: '1643110854416',
    likedBy: ['adrian', 'emelie'],
    image: 'https://picsum.photos/200/300',
    orgID: 'Adrian',
    orgName: 'Adrian Family',
    comments: [
      {
        id: 'commentOne',
        message: 'Test Message',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
      {
        id: 'commentTwo',
        message: 'Test Message Two',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
      {
        id: 'commentThree',
        message: 'Test Message Three',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
    ],
    permissions: [EPostPermission.ALLOW_COMMENT, EPostPermission.ALLOW_SHARE],
    postedBy: {
      id: 'Adrian',
      name: 'Adrian Dunham',
    },
  },
  {
    id: 'annabelle',
    dateTime: '1643110854416',
    description: 'I have a new comment',
    likedBy: ['adrian'],
    orgID: 'Emelie',
    orgName: 'Emelie Family',
    comments: [
      {
        id: 'commentFour',
        message:
          'Test Message Four. This is a super long comment. That I have on this set of text. It has a very long string. I have alot of words. Annabelle is a very good girl. ',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
    ],
    permissions: [EPostPermission.ALLOW_SHARE],
    postedBy: {
      id: 'Emelie',
      name: 'Emelie Dunham',
    },
  },
  {
    id: 'emelie',
    dateTime: '1643110854316',
    image: 'https://picsum.photos/200/200',
    likedBy: ['annabelle'],
    orgID: 'Adrian',
    orgName: 'Adrian Family',
    comments: [],
    permissions: [],
    postedBy: {
      id: 'Annabelle',
      name: 'Annabelle Dunham',
    },
  },
];

export const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = initialState;
        return posts.map((post) => post);
      } catch (error) {
        throw error;
      }
    },
    getPost: async (_, args) => {
      try {
        const post = initialState.find((post) => post.id === args.id);
        return {
          ...post,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
