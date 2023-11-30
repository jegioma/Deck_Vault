//get the profile info of the user
export async function getProfileInfo(user, supabase) {
    try {
        const { data, status, error } = await supabase
            .from ('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
 
        if (error & status !== 406) throw error;
 
        return data;
    } catch(error) {
        console.log(error);
        return null;
    }
 }
 
//download the user's profile avatar image
export async function downloadImage(path, supabase) {
 try {
   const { data: blob, error } = await supabase.storage.from('avatar').download(path);
   if (error) {
       throw error;
   }

   const url = URL.createObjectURL(blob);
   return url;

 } catch (error) {
   console.log('Error downloading image: ', error)
 }
}