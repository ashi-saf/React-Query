export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.fullPath}
            onClick={() => onSelect(image.fullPath)}
            className={selectedImage === image.fullPath ? 'selected' : undefined}
          >
            <img
              src= {image.fullPath} 
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
