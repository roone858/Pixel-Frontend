import Image from "../Image";
interface ImageDetails {
  fileName: string;
}
const ImageGrid = ({ images }: { images: ImageDetails[] }) => {
  const groupedImages = [];

  // Group images into sets of three
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-20 py-5">
        {groupedImages.map((imageGroup, groupIndex) => (
          <div key={groupIndex} className="grid gap-4">
            {imageGroup.map((image: ImageDetails, index: number) => (
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
