import { MongoClient, ObjectId } from 'mongodb';

// Connection URL
const url = 'mongodb+srv://sv773460:QaBPoeL3mcSQqS3r@cluster0.j84w7.mongodb.net/Final?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

// Database Name
const dbName = 'Final';

// Collection Name
const collectionName = 'posts';

// Data to be inserted
const data = [
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/waffle.jpg",
            "https://honest-bite-be.s3.amazonaws.com/alfajor-latino.jpg"
        ],
        "name": "test 0",
        "caption": "test post 0",
        "location": "mumbai 0",
        "likes": 52,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 96,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "indian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2022-12-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/chole-bhature.jpg",
            "https://honest-bite-be.s3.amazonaws.com/pho-vietnamese-noodle-soup.jpg"
        ],
        "name": "test 1",
        "caption": "test post 1",
        "location": "mumbai 1",
        "likes": 77,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 1,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "italian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-01-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/samosa-jalebi.jpg",
            "https://honest-bite-be.s3.amazonaws.com/idli-medu-vada.jpg"
        ],
        "name": "test 2",
        "caption": "test post 2",
        "location": "mumbai 2",
        "likes": 26,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 66,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-02-28T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/ragda.jpg",
            "https://honest-bite-be.s3.amazonaws.com/bagel-sandwich.jpg"
        ],
        "name": "test 3",
        "caption": "test post 3",
        "location": "mumbai 3",
        "likes": 3,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 75,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "indian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-03-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/orange-cheesecake.jpg",
            "https://honest-bite-be.s3.amazonaws.com/sushi-served-on-a-wooden.jpg"
        ],
        "name": "test 4",
        "caption": "test post 4",
        "location": "mumbai 4",
        "likes": 86,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 69,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-04-30T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/bhelpuri.jpg",
            "https://honest-bite-be.s3.amazonaws.com/sushi-served-on-a-wooden.jpg"
        ],
        "name": "test 5",
        "caption": "test post 5",
        "location": "mumbai 5",
        "likes": 92,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 39,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "indian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-05-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/taco.jpg",
            "https://honest-bite-be.s3.amazonaws.com/pasta.png"
        ],
        "name": "test 6",
        "caption": "test post 6",
        "location": "mumbai 6",
        "likes": 77,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 96,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-06-30T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/apple-pie.jpg",
            "https://honest-bite-be.s3.amazonaws.com/paneer-tikka.jpg"
        ],
        "name": "test 7",
        "caption": "test post 7",
        "location": "mumbai 7",
        "likes": 7,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 56,
        "bookmarked": false,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-07-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/gulab-jamun.jpg",
            "https://honest-bite-be.s3.amazonaws.com/paneer-tikka.jpg"
        ],
        "name": "test 8",
        "caption": "test post 8",
        "location": "mumbai 8",
        "likes": 84,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 63,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "indian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-08-31T18:30:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/south-indian-cook-with-masaladosa-.jpg",
            "https://honest-bite-be.s3.amazonaws.com/pasta.png"
        ],
        "name": "test 9",
        "caption": "test post 9",
        "location": "mumbai 9",
        "likes": 51,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 49,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "indian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-10-01T00:00:00.000Z",
        "Author": "67010a0494328777e1a60ad8"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/man-making-dosa.jpg",
            "https://honest-bite-be.s3.amazonaws.com/burger.jpg"
        ],
        "name": "test 10",
        "caption": "test post 10",
        "location": "mumbai 10",
        "likes": 45,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 54,
        "bookmarked": false,
        "Dietary": "veg",
        "Cuisine": "italian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-11-01T00:00:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/man-making-dosa.jpg",
            "https://honest-bite-be.s3.amazonaws.com/paneer-tikka.jpg"
        ],
        "name": "test 11",
        "caption": "test post 11",
        "location": "mumbai 11",
        "likes": 68,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 24,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-12-01T00:00:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/pizza.png",
            "https://honest-bite-be.s3.amazonaws.com/man-making-dosa.jpg"
        ],
        "name": "test 12",
        "caption": "test post 12",
        "location": "mumbai 12",
        "likes": 47,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 35,
        "bookmarked": false,
        "Dietary": "veg",
        "Cuisine": "indian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2022-12-31T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/pizza.png",
            "https://honest-bite-be.s3.amazonaws.com/pho-vietnamese-noodle-soup.jpg"
        ],
        "name": "test 13",
        "caption": "test post 13",
        "location": "mumbai 13",
        "likes": 58,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 77,
        "bookmarked": false,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-01-31T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/rasmalai.jpg",
            "https://honest-bite-be.s3.amazonaws.com/idli-medu-vada.jpg"
        ],
        "name": "test 14",
        "caption": "test post 14",
        "location": "mumbai 14",
        "likes": 113,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 53,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-02-28T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/taco.jpg",
            "https://honest-bite-be.s3.amazonaws.com/sushi-served-on-a-wooden.jpg"
        ],
        "name": "test 15",
        "caption": "test post 15",
        "location": "mumbai 15",
        "likes": 91,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 24,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "indian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-03-31T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/orange-cheesecake.jpg",
            "https://honest-bite-be.s3.amazonaws.com/pasta.png"
        ],
        "name": "test 16",
        "caption": "test post 16",
        "location": "mumbai 16",
        "likes": 35,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 56,
        "bookmarked": false,
        "Dietary": "non-veg",
        "Cuisine": "italian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-04-30T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/waffle.jpg",
            "https://honest-bite-be.s3.amazonaws.com/paneer-tikka.jpg"
        ],
        "name": "test 17",
        "caption": "test post 17",
        "location": "mumbai 17",
        "likes": 58,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 61,
        "bookmarked": false,
        "Dietary": "veg",
        "Cuisine": "indian",
        "mealType": "lunch",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-05-31T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/taco.jpg",
            "https://honest-bite-be.s3.amazonaws.com/samosa-jalebi.jpg"
        ],
        "name": "test 18",
        "caption": "test post 18",
        "location": "mumbai 18",
        "likes": 20,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 115,
        "bookmarked": true,
        "Dietary": "non-veg",
        "Cuisine": "indian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-06-30T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    },
    {
        "img": [
            "https://honest-bite-be.s3.amazonaws.com/watercolor-plate-of-fried-chicken.jpg",
            "https://honest-bite-be.s3.amazonaws.com/burger.jpg"
        ],
        "name": "test 19",
        "caption": "test post 19",
        "location": "mumbai 19",
        "likes": 46,
        "comments": [
            "test comment 1",
            "test comment 2",
            "test comment 3"
        ],
        "shares": 62,
        "bookmarked": true,
        "Dietary": "veg",
        "Cuisine": "italian",
        "mealType": "dinner",
        "tags": [
            "veg",
            "italian",
            "dinner"
        ],
        "createdAt": "2023-07-31T18:30:00.000Z",
        "Author": "6703856d852312106c898a76"
    }
]

const ensureFields = (documents) => {
    return documents.map(doc => {
        // Convert createdAt to a Date object
        if (typeof doc.createdAt === 'string') {
            doc.createdAt = new Date(doc.createdAt);
        }

        // Ensure author is an ObjectId
        if (typeof doc.author === 'string') {
            doc.author = new ObjectId(doc.author);
        }

        return doc;
    });
};

async function insertData() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure 'createdAt' is a Date object
        const dataWithDates = ensureFields(data);

        // Insert the data
        const result = await collection.insertMany(dataWithDates);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

// Run the insertion function
insertData();