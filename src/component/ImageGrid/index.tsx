import Image from "../Image";

const ImageGrid = ({ images }) => {
  const groupedImages = [];

  // Group images into sets of three
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-20">
        {groupedImages.map((imageGroup, groupIndex) => (
          <div key={groupIndex} className="grid gap-4">
            {imageGroup.map((image, index) => (
              <div key={index}>
                <Image
                  className="h-auto max-w-full rounded-lg"
                  src={"http://localhost:3000/resource/" + image.fileName}
                  alt={`Image ${groupIndex * 3 + index + 1}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>     
  );
};

export default ImageGrid;
