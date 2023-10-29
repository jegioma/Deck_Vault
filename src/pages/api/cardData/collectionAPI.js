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

export async function deleteCollection(collection) {
    try {
        const { data, error } = await supabase
        .from('collecions')
        .delete()
        .eq('id', collection);
        
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
  
//   export async function addCardToCollection(supabase, card, collection, copyCount) {
//     try {
//         const cardID = card.id;

//         const { data, error } = await supabase
//             .from('collections')
//             .select('card_ids', 'copy_amt')
//             .eq('id', collection)
//             .single();

//         if (error) {
//             throw error;
//         }

//         let existingCardIds = data.card_ids || [];
//         let existingCopyAmt = data.copy_amt || [];

//         existingCardIds.push(cardID);
//         existingCopyAmt.push(copyCount);

//         const { info, updateError } = await supabase
//             .from('collections')
//             .update({
//                 card_ids: existingCardIds,
//                 copy_amt: existingCopyAmt
//             })
//             .eq('id', collection);

//         if (updateError) {
//             throw updateError;
//         }

//         // Handle the successful update
//         console.log('Card added to the collection with copies:', copyCount);

//     } catch (error) {
//         console.error('Error adding card to collection: ', error);
//         throw error;
//     }
// }



export async function addCardToCollection(supabase, card, collection) {
    try {
        const cardID = card.id;

        // Fetch the existing data
        const { data, error } = await supabase
            .from('collections')
            .select('card_ids')
            .eq('id', collection)
            .single();

        if (error) {
            throw error;
        }

        let existingCardIds = data.card_ids || [];

        // Ensure it's an array
        if (!Array.isArray(existingCardIds)) {
            existingCardIds = [existingCardIds];
        }

        // Add the new card ID
        existingCardIds.push(cardID);

        // Update the collection with the modified data
        const { updateError } = await supabase
            .from('collections')
            .update({
                card_ids: existingCardIds,
            })
            .eq('id', collection);

        if (updateError) {
            throw updateError;
        }

        addCardToTables(card, supabase);
        // Handle the successful update
        console.log('Card added to the collection.');

    } catch (error) {
        console.error('Error adding card to collection: ', error);
        throw error;
    }
}

async function addCardToTables(card, supabase) {
    console.log(card);
    switch (card.frameType) {
        case "link":
            addToLink(card, supabase);
            break;
        case "xyz":
            addToXyz(card, supabase);
            break;
        case "spell":
        case "trap":
            addToSAT(card, supabase);
            break;
        case "normal_pendulum":
        case "effect_pendulum":
        case "ritual_pendulum":
        case "fusion_pendulum":
        case "synchro_pendulum":
        case "xyz_pendulum":
            addToPend(card, supabase);
            break;
        case "normal":
        case "effect":
        case "ritual":
        case "fusion":
        case "synchro":
            addToMain(card, supabase);
            break;
        
    }
}

async function addToLink(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const attr = card.attribute;
    const linkVal = card.linkval;
    const frameType = card.frameType;
    const type = card.type;
    const atk = card.atk;
    const desc = card.desc;
    const race = card.race;
    const linkMarkers = card.linkmarkers;

    try {
        const { data, error } = await supabase
        .from('linkMonsters')
        .insert([{
            cardId: cardId,
            name: name,
            attribute: attr,
            linkvalue: linkVal,
            frameType: frameType,
            type: type,
            atk: atk,
            description: desc,
            race: race,
            linkMarkers: linkMarkers
        }])
        .select();

        if (error) {
            throw error;
        }

        console.log('Card added to link table')
    } catch (error) {
        console.log('Card not added to link table', error);
    }
    
}
async function addToXyz(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const attr = card.attribute;
    const rank = card.level;
    const frameType = card.frameType;
    const type = card.type;
    const atk = card.atk;
    const def = card.def;
    const desc = card.desc;
    const race = card.race;

    try {
        const { data, error } = await supabase
        .from('xyzMonsters')
        .insert([{
            cardId: cardId,
            name: name,
            attribute: attr,
            rank: rank,
            frameType: frameType,
            type: type,
            atk: atk,
            def: def,
            description: desc,
            race: race
        }])
        .select();

        if (error) {
            throw error;
        }

        console.log('Card added to xyz table')
    } catch (error) {
        console.log('Card not added to xyz table', error);
    }
}
async function addToSAT(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const frameType = card.frameType;
    const type = card.type;
    const desc = card.desc;
    const race = card.race;

    try {
        const { data, error } = await supabase
        .from('spellTrap')
        .insert([{
            cardId: cardId,
            name: name,
            frameType: frameType,
            type: type,
            description: desc,
            race: race
        }])
        .select();

        if (error) {
            throw error;
        }

        console.log('Card added to Spell/Trap table')
    } catch (error) {
        console.log('Card not added to Spell/Trap table', error);
    }
}
async function addToPend(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const attr = card.attribute;
    const level = card.level;
    const frameType = card.frameType;
    const type = card.type;
    const atk = card.atk;
    const def = card.def;
    const monster_desc = card.monster_desc;
    const pend_desc = card.pend_desc;
    const race = card.race;
    const scale = card.scale;

    try {
        const { data, error } = await supabase
        .from('pendulumMonsters')
        .insert([{
            cardId: cardId,
            name: name,
            attribute: attr,
            level: level,
            frameType: frameType,
            type: type,
            atk: atk,
            def: def,
            monster_desc: monster_desc,
            pend_desc: pend_desc,
            race: race,
            scale: scale
        }])
        .select();

        if (error) {
            throw error;
        }

        console.log('Card added to Pendulum table')
    } catch (error) {
        console.log('Card not added to Pendulum table', error);
    }
}
async function addToMain(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const attr = card.attribute;
    const level = card.level;
    const frameType = card.frameType;
    const type = card.type;
    const atk = card.atk;
    const def = card.def;
    const desc = card.desc;
    const race = card.race;

    try {
        const { data, error } = await supabase
        .from('mainMonsters')
        .insert([{
            cardId: cardId,
            name: name,
            attribute: attr,
            level: level,
            frameType: frameType,
            type: type,
            atk: atk,
            def: def,
            description: desc,
            race: race
        }])
        .select();

        if (error) {
            throw error;
        }

        console.log('Card added to Main table')
    } catch (error) {
        console.log('Card not added to Main table', error);
    }
}
export async function updateCopyAmount(supabase, collection, copyCount) {
    try {
        // Fetch the existing data
        const { data, error } = await supabase
            .from('collections')
            .select('copy_amnt')
            .eq('id', collection)
            .single();

        if (error) {
            throw error;
        }

        let existingCopyAmt = data.copy_amnt || [];

        // Ensure it's an array
        if (!Array.isArray(existingCopyAmt)) {
            existingCopyAmt = [existingCopyAmt];
        }

        // Add the new copy count
        existingCopyAmt.push(copyCount);

        // Update the collection with the modified data
        const { updateError } = await supabase
            .from('collections')
            .update({
                copy_amnt: existingCopyAmt,
            })
            .eq('id', collection);

        if (updateError) {
            throw updateError;
        }

        // Handle the successful update
        console.log('Copy amount updated:', copyCount);

    } catch (error) {
        console.error('Error updating copy amount: ', error);
        throw error;
    }
}

// export async function updateCopyAmount(supabase, collection, copyCount) {
//     try {
//         // Fetch the existing data
//         const { data, error } = await supabase
//             .from('collections')
//             .select('copy_amt')
//             .eq('id', collection)
//             .single();

//         if (error) {
//             throw error;
//         }

//         let existingCopyAmt = data.copy_amt || [];

//         // Ensure it's an array
//         if (!Array.isArray(existingCopyAmt)) {
//             existingCopyAmt = [existingCopyAmt];
//         }

//         // Add the new copy count
//         existingCopyAmt.push(parseInt(copyCount)); // Parse copyCount to an integer

//         // Update the collection with the modified data
//         const { updateError } = await supabase
//             .from('collections')
//             .update({
//                 copy_amt: existingCopyAmt,
//             })
//             .eq('id', collection);

//         if (updateError) {
//             throw updateError;
//         }

//         // Handle the successful update
//         console.log('Copy amount updated:', copyCount);

//     } catch (error) {
//         console.error('Error updating copy amount: ', error);
//         throw error;
//     }
// }

