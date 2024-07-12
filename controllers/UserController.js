import User from "../models/User.js";

export const getUsers = async () => {
    const users = await User.find();
    return users;
}

export const getUser = async (_, { id }) => {
    const user = await User.findById(id).populate("posts");
    return user;
}

export const createUser = async (_, { name, email }) => {
    try {
        if (!name) {
            throw new Error("Name is required!");
        }

        if (!email) {
            throw new Error("Email is required!");
        }

        const user = new User({ name, email, posts: [] });
        await user.save();
        return user;
    } catch (error) {
        return error;
    }
}

export const deleteUser = async (_, { id }) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        await user.deleteOne();
        return user;
    } catch (error) {
        return error;
    }
};

export const updateUser = async (_, { id, name, email }) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error("User not found!");
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        await user.save();
        return user;
    } catch (error) {
        return error;
    }
}