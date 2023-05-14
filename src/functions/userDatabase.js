module.exports = async (userid, client) => {
    if (!userid) return null;
    const UserSchema = client.settings.schemas.get("User");

    if (!await UserSchema.exists({ id: userid })) {

        const userdb = await UserSchema.create({
            id: userid
        });

        return userdb
    } else {

        const userdb = await UserSchema.findOne({ id: userid });
        return userdb;
    }
}