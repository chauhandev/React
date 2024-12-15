export const  getAllMemes = async()=> {
    const apiurl = "https://api.imgflip.com/get_memes";
    const response = await fetch(apiurl);
     return await response.json();
}