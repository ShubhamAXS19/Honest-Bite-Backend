import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const bucketName = "honest-bite-be";
const folderPath = "";

// Create an S3 client
const s3 = new S3Client({ region: "ap-south-1" });

async function listImageUrls() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: folderPath,
    });

    const response = await s3.send(command);

    // Extract URLs for each object
    if (response.Contents) {
      const imageUrls = response.Contents.map((obj) => {
        const objectKey = obj.Key;
        // Construct the object URL
        return `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
      });

      console.log(imageUrls);
      return imageUrls;
    } else {
      console.log("No objects found in the specified bucket and prefix.");
      return [];
    }
  } catch (error) {
    console.error("Error listing objects:", error);
  }
}

// Call the function
listImageUrls();

[
  "https://honest-bite-be.s3.amazonaws.com/FF.png",
  "https://honest-bite-be.s3.amazonaws.com/Lasagna.jpg",
  "https://honest-bite-be.s3.amazonaws.com/QUESADILLA.jpg",
  "https://honest-bite-be.s3.amazonaws.com/alfajor-latino.jpg",
  "https://honest-bite-be.s3.amazonaws.com/apple-pie.jpg",
  "https://honest-bite-be.s3.amazonaws.com/bagel-sandwich.jpg",
  "https://honest-bite-be.s3.amazonaws.com/bhelpuri.jpg",
  "https://honest-bite-be.s3.amazonaws.com/biryani.jpg",
  "https://honest-bite-be.s3.amazonaws.com/chole-bhature.jpg",
  "https://honest-bite-be.s3.amazonaws.com/burger.jpg",
  "https://honest-bite-be.s3.amazonaws.com/creme-brulee.jpg",
  "https://honest-bite-be.s3.amazonaws.com/dhokla.jpg",
  "https://honest-bite-be.s3.amazonaws.com/dosa.jpg",
  "https://honest-bite-be.s3.amazonaws.com/fafafel.jpg",
  "https://honest-bite-be.s3.amazonaws.com/gulab-jamun.jpg",
  "https://honest-bite-be.s3.amazonaws.com/idli-medu-vada.jpg",
  "https://honest-bite-be.s3.amazonaws.com/idli-with-sambar.jpg",
  "https://honest-bite-be.s3.amazonaws.com/korean-food-teokbokki.jpg",
  "https://honest-bite-be.s3.amazonaws.com/man-making-dosa.jpg",
  "https://honest-bite-be.s3.amazonaws.com/momos.jpg",
  "https://honest-bite-be.s3.amazonaws.com/orange-cheesecake.jpg",
  "https://honest-bite-be.s3.amazonaws.com/paneer-tikka.jpg",
  "https://honest-bite-be.s3.amazonaws.com/pav-bhaji.jpg",
  "https://honest-bite-be.s3.amazonaws.com/pasta.png",
  "https://honest-bite-be.s3.amazonaws.com/pho-vietnamese-noodle-soup.jpg",
  "https://honest-bite-be.s3.amazonaws.com/pizza.png",
  "https://honest-bite-be.s3.amazonaws.com/pizzaBanner.png",
  "https://honest-bite-be.s3.amazonaws.com/pretezel.jpg",
  "https://honest-bite-be.s3.amazonaws.com/ragda.jpg",
  "https://honest-bite-be.s3.amazonaws.com/ramen.jpg",
  "https://honest-bite-be.s3.amazonaws.com/rasmalai.jpg",
  "https://honest-bite-be.s3.amazonaws.com/samosa-jalebi.jpg",
  "https://honest-bite-be.s3.amazonaws.com/sandwich.jpg",
  "https://honest-bite-be.s3.amazonaws.com/vada-pav.png",
  "https://honest-bite-be.s3.amazonaws.com/south-indian-cook-with-masaladosa-.jpg",
  "https://honest-bite-be.s3.amazonaws.com/sushi-served-on-a-wooden.jpg",
  "https://honest-bite-be.s3.amazonaws.com/taco.jpg",
  "https://honest-bite-be.s3.amazonaws.com/tiramisu.jpg",
  "https://honest-bite-be.s3.amazonaws.com/waffle.jpg",
  "https://honest-bite-be.s3.amazonaws.com/watercolor-plate-of-fried-chicken.jpg",
];
