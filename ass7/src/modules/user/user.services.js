import { User } from "../../DB/models/user.model.js"

export const signUpUser = async (name , email, password, role) => {
    const newUser = await User.create({name, email, password, role});
    return newUser;
}

export const updateById = async (id, name, email, role) => {
    const user = await User.findByPk(id);
    if (!user) {
        return null; // return null if user not found
    }

    await user.update({ name, email, role }); // await the update
    return user;
};

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
}

export const getUserExcludingRole = async (id) => {
   const user = await User.findByPk(id, {
       attributes: { exclude: ['role','password'] }
   });
   return user;
}   
