import supabase from "../../../../utils/supabase";

//fetch all collections from the specified user 
export async function fetchCollections(user, supabase) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .select(`*`)
        .eq('profile_id', user.id);
        
        if (error) throw error;
        // console.log('Collections fetched: ', data);
        return data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

//refresh collections to show the new/recently added collections
export async function refreshCollection(user, supabase) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .select(`*`)
        .eq('profile_id', user.id);
        
        if (error) throw error;
        // console.log('Collection refreshed: ', data);
        return data || []; // return the fetched collections
    } catch (error) {
        alert('Error refreshing collection!');
        console.log(error);
    }
}

//refresh selected collection to show new/recently added cards
export async function refreshCurrentCollection(id, supabase, callback) {
    try {
        const { data, error } = await supabase
            .from('collections')
            .select('*')  // Select all columns from the 'collections' table.
            .eq('id', id);

        if (error) {
            throw error;
        }

        if (data.length > 0) {
            // Assuming you're passing a callback function to update the collection.
            callback(data[0]);  // Execute the callback function with the refreshed data.
            console.log('Collection refreshed', data[0]);
        } else {
            alert('Collection not found or refreshed.');
        }
    } catch (error) {
        alert('Error refreshing collection!');
        console.log(error);
    }
}

//create new collection for the user 
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
        // console.log('Collection created: ', data);
        callback(); // call the callback function
    } catch (error) {
        alert('Error creating collection!');
        console.log(error);
    }
}

//update name of the selected collection
export async function updateCollectionName(id, name) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .update({ name })
        .eq('profile_id', id);
        
        if (error) throw error;
        // console.log('Collection name updated: ', data);
        refreshCollection(user, supabase);
    } catch (error) {
        alert('Error updating collection name!');
        console.log(error);
    }
}

//delete selected collection and all data inside of it
export async function deleteCollection(id, user, supabase) {
    try {
        const { data, error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);
        
        if (error) throw error;
        // console.log('Collection deleted: ', data);
        refreshCollection(user, supabase);
    } catch (error) {
        alert('Error deleting collection!');
        console.log(error);
    }
}

//delete all card data from selected collection
export async function deleteCard(cardId, id, supabase, callback) {
    try {
        const { data, error } = await supabase
            .from('collections')
            .select('card_ids, card_names, copy_amnt')
            .eq('id', id)
            .single();

        if (error) throw error;

        let existingCardIds = data.card_ids;
        let existingCardNames = data.card_names;
        let existingCopyAmt = data.copy_amnt;

        if (!Array.isArray(existingCardIds)) {
            existingCardIds = [existingCardIds];
        }
        if (!Array.isArray(existingCardNames)) {
            existingCardNames = [existingCardNames];
        }
        if (!Array.isArray(existingCopyAmt)) {
            existingCopyAmt = [existingCopyAmt];
        }

        const index = existingCardIds.indexOf(cardId);

        if (index !== -1) {
            existingCardIds.splice(index, 1);
            existingCardNames.splice(index, 1);
            existingCopyAmt.splice(index, 1);

            const { updateError } = await supabase
                .from('collections')
                .update({
                    card_ids: existingCardIds,
                    card_names: existingCardNames,
                    copy_amnt: existingCopyAmt,
                })
                .eq('id', id);

            if (updateError) throw updateError;

            console.log('Card deleted from collection');

            // If a callback function is provided, call it to refresh the collection.
            if (callback && typeof callback === 'function') {
                refreshCurrentCollection(id, supabase, callback);
            }
        } else {
            console.log('Card not found in collection');
        }
    } catch (error) {
        alert('Error deleting card!');
        console.log(error);
    }
}

//fetch the collection by name to display in the collectionName page
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
  
//add card and data to selected collection
export async function addCardToCollection(supabase, card, collection, copyCount) {
    try {
        const cardID = card.id;
        const cardName = card.name;
        
        // uploadImage(cardID);
        // Fetch the existing data
        const { data, error } = await supabase
            .from('collections')
            .select('card_ids, card_names, copy_amnt')
            .eq('id', collection)
            .single();

        if (error) {
            throw error;
        }

        let existingCardIds = data.card_ids || [];
        let existingCardNames = data.card_names || [];
        let existingCopyAmt = data.copy_amnt || [];

        const cardIndex = existingCardIds.indexOf(cardID);

        if (cardIndex >= 0) {
            existingCopyAmt[cardIndex] += Number(copyCount);
        } else {
            existingCardIds.push(cardID);
            existingCardNames.push(cardName);
            existingCopyAmt.push(Number(copyCount));
        }
        
        // Update the collection with the modified data
        const { updateError } = await supabase
            .from('collections')
            .update({
                card_ids: existingCardIds,
                card_names: existingCardNames,
                copy_amnt: existingCopyAmt,
            })
            .eq('id', collection);

        if (updateError) {
            throw updateError;
        }
        console.log(collection)
        addCardToTables(card, supabase);
        // Handle the successful update
        console.log('Card added to the collection.');

    } catch (error) {
        console.error('Error adding card to collection: ', error);
        throw error;
    }
}

//add the image to a storage bucket
// async function uploadImage(cardID) {
//     const imageUrl = `https://images.ygoprodeck.com/images/cards/${cardID}.jpg`;
//     const response = await fetch(imageUrl);
//     const imageBuffer = response.buffer();

//     const base64Image = (await imageBuffer).toString('base64')
//     const dataUrl = `data:image/jpeg;base64,${base64Image}`
//     // Upload the image to the Supabase bucket
//     const { data, error } = await supabaseCli.storage.from('cardimages').upload(`${cardID}.jpg`, dataUrl);
 
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//         console.log(imageBuffer)

//         console.log('Card image added to bucket')
//     }
//  }
 



//goes through the card.frameType to filter which table the card data will be added to 
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

//add card to the linkMonsters table
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
        const { data: existingData, error: existingError } = await supabase
            .from('linkMonsters')
            .select('cardId')
            .eq('cardId', cardId);

        if (existingError) throw existingError;

        if (existingData.length === 0) {
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
        }
    } catch (error) {
        console.log('Card not added to link table', error);
    } 
}

//add card to the xyzMonsters table
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
        const { data: existingData, error: existingError } = await supabase
        .from('xyzMonsters')
        .select('cardId')
        .eq('cardId', cardId);

        if (existingError) throw existingError;

        if (existingData.length === 0) {
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
        }
    } catch (error) {
        console.log('Card not added to xyz table', error);
    }
}

//add card to the spell/trap table
async function addToSAT(card, supabase) {
    const cardId = card.id;
    const name = card.name;
    const frameType = card.frameType;
    const type = card.type;
    const desc = card.desc;
    const race = card.race;

    try {
        const { data: existingData, error: existingError } = await supabase
        .from('spellTrap')
        .select('cardId')
        .eq('cardId', cardId);

        if (existingError) throw existingError;

        if (existingData.length === 0) {
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
        }
    } catch (error) {
        console.log('Card not added to Spell/Trap table', error);
    }
}

//add card to the pendulumMonsters table
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
        const { data: existingData, error: existingError } = await supabase
            .from('pendulumMonsters')
            .select('cardId')
            .eq('cardId', cardId);

        if (existingError) throw existingError;

        if (existingData.length === 0) {
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
        }
    } catch (error) {
        console.log('Card not added to Pendulum table', error);
    }
}

//add card to the mainMonsters table
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
        const { data: existingData, error: existingError } = await supabase
            .from('mainMonsters')
            .select('cardId')
            .eq('cardId', cardId);

        if (existingError) throw existingError;

        if (existingData.length === 0) {
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
        }
    } catch (error) {
        console.log('Card not added to Main table', error);
    }
}

