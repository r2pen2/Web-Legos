// Library Imports
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from "@mui/material";
import { Card, Text } from "@nextui-org/react";

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