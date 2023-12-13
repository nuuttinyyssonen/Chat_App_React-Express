import { SlTrash } from 'react-icons/sl';
const ImagePreview = ({ setSelectedImage, selectedImage }) => {
  return (
    <div>
      {selectedImage && (
        <div className='imagePreview'>
          <div className='imagePreviewDetails'>
            <p>Selected Image:</p>
            <SlTrash onClick={() => setSelectedImage(null)} className='undoImage'/>
          </div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
