import { useState } from "react";
import supabase from '../../../../utils/supabase';



export async function fetchCollections(user, supabase) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .select(`*`)
        .eq('profile_id', user.id);
        
        if (error) throw error;
        console.log('Collections fetched: ', data);
        return data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

// In your API file
export async function refreshCollection(user, supabase) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .select(`*`)
        .eq('profile_id', user.id);
        
        if (error) throw error;
        console.log('Collection refreshed: ', data);
        return data || []; // return the fetched collections
    } catch (error) {
        alert('Error refreshing collection!');
        console.log(error);
    }
}


// In your API file
export async function createCollection(collectionName, user, callback) {
    if (!collectionName) {
        alert('Please enter a name for the collection');
        return;
    }
    
    try {
        const { data, error } = await supabase
        .from('collections')
        .insert([{profile_id: user.id, name: collectionName}]);
        
        if (error) throw error;
        console.log('Collection created: ', data);
        callback(); // call the callback function
    } catch (error) {
        alert('Error creating collection!');
        console.log(error);
    }
}


export async function updateCollectionName(id, name) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .update({ name })
        .eq('profile_id', id);
        
        if (error) throw error;
        console.log('Collection name updated: ', data);
        refreshCollection();
    } catch (error) {
        alert('Error updating collection name!');
        console.log(error);
    }
}

export async function deleteCollection(name) {
    try {
        const { data, error } = await supabase
        .from('collecions')
        .delete()
        .eq('name', name);
        
        if (error) throw error;
        console.log('Collection deleted: ', data);
        refreshCollection();
    } catch (error) {
        alert('Error deleting collection!');
        console.log(error);
    }
}


// api/cardData/collectionAPI.js

export async function fetchCollectionByName(id, user, supabase) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('id', id)
      .eq('profile_id', user.id)
      .single();
  
    if (error) {
      console.error('Error fetching collection: ', error);
      throw error;
    }
  
    return data;
  }
  
  
// export async function getProfile(user) {
//     try {
//         let { data, error, status } = await supabase
//             .from('profiles')
//             .select(`avatar`)
//             .eq('id', user.id)
//             .single();

//             if (error & status !== 406) throw error;

//             if (data) const setAvatarUrl(data.avatar);
//     } catch (error) {
//         alert('Error loading user data!');
//         console.log(error);
//     }
// }

// export async function updateProfile({ avatar, user }) {
//     try {
//         const updates = {
//             id: user.id,
//             avatar,
//             updated_at: new Date().toISOString(),
//         }
        
//         let { error } = await supabase.from('profiles').upsert(updates);
//         if (error) throw error;
//         alert('Profile Updated!');
//     } catch (error) {
//         alert('Error updating the data!');
//         console.log(error);
//     }
// }