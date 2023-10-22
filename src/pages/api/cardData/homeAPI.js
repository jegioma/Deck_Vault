const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes'; //staple cards url

//fetches staple cards data an places the imageUrls into an array 
const fetchData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const imageUrls = data.data.map(
        (result) => result.card_images[0].image_url);
        // Call a function to shuffle the array, place array inside function
        const shuffledImageUrls = shuffleArray(imageUrls);
        return shuffledImageUrls;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
  
//gets the staple cards array and shuffles into random order using Fisher-Yates algorithm
const shuffleArray = (array) => {
    const shuffledArr = [...array];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //random index j between 0 and i
        [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]]; //swaps elements at i and j
    }
    return shuffledArr;
};

export default fetchData;
  
  