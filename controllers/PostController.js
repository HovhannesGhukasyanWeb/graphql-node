import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (_, { title, content, userId }) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found!");
        }

        const post = new Post({ title, content });
        await post.save();
        user.posts.push(post._id);
        await user.save();
        return post;
    } catch (error) {
        return error;
    }
}
export const deletePost = async (_, { id }) => {
    try {
        const post = await Post.findById(id);
        if (!post) {
            throw new Error("Post not found!");
        }
        await post.deleteOne();
        return post;
    } catch (error) {
        return error;
    }
}
export const updatePost = async (_, { id, title, content }) => {
    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error("Post not found!");
        }

        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }

        await post.save();
        return post;
    } catch (error) {
        return error;
    }
}