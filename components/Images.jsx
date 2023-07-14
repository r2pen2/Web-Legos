// Library Imports
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Card, Text } from "@nextui-org/react";
import { getFileNameByCurrentTime, openFileBrowser } from '../api/files';
import { useEffect, useState } from 'react';
import { ImageCompressor } from '../api/images';

// Style imports
import "../assets/style/images.css";

/**
 * A card component that prompts a user to upload an image
 * @param {Function} params.onClick - function to call when the user clicks the card
 * @param {number} params.size - size of the card
 * @default
 * const size = 300;
 */
export function UploadImageCard({onClick, size}) {
  
  /** Adjusted card size to match parameters */
  const cardSize = size ? size : 300;
  /** Adjusted icon size to match parameters */
  const iconSize = size ? size / 4.5 : 64;

  return (
    <Card variant='bordered' isPressable isHoverable onClick={onClick} css={{height: cardSize, width: cardSize}}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-2">
        <Text b>
          Click to upload an image
        </Text>
        <AddAPhotoIcon sx={{fontSize: iconSize}}/>
      </Card.Body>
    </Card>
  )
}

/**
 * 
 * @param {string} firestoreId
 * @param {boolean} editable 
 * @returns 
 */
export function WLImage(props) {

  function uploadImage() {
    openFileBrowser().then(async (img) => {
      if (img) {
        const fileName = getFileNameByCurrentTime(img);
        const compressedImage = await ImageCompressor.compressImage(img);
        const formData = new FormData();
        formData.append("file", compressedImage);
        formData.append("firestoreId", props.firestoreId);
        formData.append("fileName", fileName);
        formData.append("oldFileName", imageFileName);


        fetch(`/site-images`, {
          method: "POST",
          body: formData,
        }).then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        });
      }
    });
  }

  const [imageSource, setImageSource] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);

  useEffect(() => {
    fetch(`/site-images?id=${props.firestoreId}`).then((res) => {
      res.json().then(json => {
        setImageSource(json.source);
        setImageFileName(json.fileName);
      })
    })
  })

  return (
    <img 
      src={imageSource} 
      alt={props.firestoreId} 
      className={`img-shadow ${props.editable ? "web-legos-image-edit" : ""}`}
      onClick={() => {
        if (props.editable) {
          uploadImage()
        }
      }}
      style={props.imgCss}
    />
  )
}