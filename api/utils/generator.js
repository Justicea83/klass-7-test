import Url from "../db/models/Url";

export const getRandomString =  async () => {
    let randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);

    let testItems =await Url.findAll({
        where:{
            shortened_url : randomString
        }
    });
    if(testItems.length > 0){
        return getRandomString()
    }
    return randomString;
};