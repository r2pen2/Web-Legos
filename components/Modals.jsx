import { Modal, Text, Button, Card, Divider, Textarea, Dropdown } from "@nextui-org/react";
import { Component, useEffect, useState} from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import { WLHeader } from "./Text";
// @ts-ignore
import { createModel, deleteModel, sendModelData } from "../api/models.ts";
import "../assets/style/modals.css";
import { getFileNameByCurrentTime, openFileBrowser } from "../api/files";
import { UploadImageCard } from "./Images";
import { TextField } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { ImageCompressor } from "../api/images";

/**
 * @param {boolean} open - whether modal is open
 * @param {Function} setOpen - set whether modal is open
 * @param {boolean} buttonBordered - whether to display bordered close button instead of flat
 */
export class CardModal extends Component {

  static Item({title, subtitle, href, icon}) {
    return (
      <div className="mt-2">
        <Card 
          isHoverable 
          isPressable
          variant="bordered" 
          onPress={() => window.open(href, "_blank")}
          css={{
            flex: 1,
          }}
        >
          <Card.Body>
            <div className="d-flex flex-row align-items-center justify-content-space-between">
              {icon}
              <div className="d-flex flex-column align-items-start justify-content-center w-100">
                <Text b>
                  {title}
                </Text>
                {subtitle}
              </div>
              <LaunchIcon />
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <Modal
        closeButton
        className="mx-2"
        open={this.props.open}
        blur
        onClose={() => this.props.setOpen(false)}
      >
        <Modal.Header>
          <Text h3 size="$md" id="modal-title">
            Select a service to open the form in a new tab.
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            {this.props.children}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row align-items-center justify-content-center w-100">
            <Button auto flat={!this.props.buttonBordered} bordered={this.props.buttonBordered} color="error" onPress={() => this.props.setOpen(false)} >
                Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

/**
 * 
 * @param {boolean} open - whether modal is open 
 * @param {Function} setOpen - set open value 
 * @param {SiteModel} model - model to edit 
 * @returns 
 */
export function ModelEditModal({open, setOpen, model}) {
  
  const imageSize = 200;

  const [imagesState, setImagesState] = useState(model.images);
  const [editedImages, setEditedImages] = useState({});
  
  const [textState, setTextState] = useState({shortStrings: model.shortStrings, longStrings: model.longStrings});
  const [editedText, setEditedText] = useState({shortStrings: {}, longStrings: {}});
  
  const [numbersState, setNumbersState] = useState(model.numbers);
  const [editedNumbers, setEditedNumbers] = useState({});

  useEffect(() => {
    setImagesState(model.images);
    setEditedImages({});
    setTextState({shortStrings: model.shortStrings, longStrings: model.longStrings});
    setEditedText({shortStrings: {}, longStrings: {}});
    setNumbersState(model.numbers);
    setEditedNumbers({});
  }, [open, setOpen, model])

  function ImageEdit() {

    
    function handleImageClick(key) {
      openFileBrowser().then(img => {
        const newEditedImages = {...editedImages};
        newEditedImages[key] = img;
        
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            const newImagesState = {...imagesState};
            newImagesState[key] = result;
            setImagesState(newImagesState);
            setEditedImages(newEditedImages);
          }
        }
        fileReader.readAsDataURL(img);
      })
    }

    if (Object.keys(model.images).length === 0) { return; }
    return Object.keys(model.images).map((imageKey, index) => {
      return (
        <div key={index} className="py-2 px-lg-5 px-2 d-flex flex-column align-items-center justify-content-center col-xl-4 col-lg-6 col-md-12">
          <Text h5>{imageKey}</Text>
          { imagesState[imageKey] && <img onClick={() => handleImageClick(imageKey)} className="web-legos-editable-image" src={imagesState[imageKey]} alt={imageKey} style={{maxHeight: imageSize, width: "100%", height: "100%", objectFit:"contain",}}/> }
          { !imagesState[imageKey] && <UploadImageCard size={imageSize} fullSize onClick={() => handleImageClick(imageKey)}/> }
        </div>
      )
    })
  }

  function TextEdit() {

    if (Object.keys(model.shortStrings).length === 0) { return; }
    return Object.keys(model.shortStrings).map((stringKey, index) => {
      return (
        <EditableTextField textState={textState} editedText={editedText} setTextState={setTextState} setEditedText={setEditedText} stringKey={stringKey} key={index}/>
      )
    })
  }
  
  function NumbersEdit() {

    if (Object.keys(model.numbers).length === 0) { return; }
    return Object.keys(model.numbers).map((numberKey, index) => {
      return (
        <EditableNumberField numbersState={numbersState} editedNumbers={editedNumbers} setNumbersState={setNumbersState} setEditedNumbers={setEditedNumbers} numberKey={numberKey} key={index}/>
      )
    })
  }

  
  function BigTextEdit() {

    if (Object.keys(model.longStrings).length === 0) { return; }
    return Object.keys(model.longStrings).map((stringKey, index) => {
      return (
        <EditableTextBlock textState={textState} editedText={editedText} setTextState={setTextState} setEditedText={setEditedText} stringKey={stringKey} key={index}/>
      )
    })
  }

  function handleDeleteClick(key) {
    if (key === "confirm") {
      for (const image of Object.values(model.images)) {
        const imageToDeleteFilename = image.substring(image.lastIndexOf("/") + 1);
        fetch(`/delete-img?path=${model.collection}/${imageToDeleteFilename}`, {
          method: "POST",
        });
      }
      deleteModel(model.collection, model.id).then(() => window.location.reload());
    }
  }

  async function saveModelChanges() {
    const modelData = {
      ...imagesState,
      ...textState.shortStrings,
      ...textState.longStrings,
      ...numbersState,
    };
    for (const newImageKey of Object.keys(editedImages)) {
      const imageToReplace = model.images[newImageKey];
      const imageToReplaceFileName = imageToReplace.substring(imageToReplace.lastIndexOf("/") + 1);
      const newFileName = newImageKey + getFileNameByCurrentTime(editedImages[newImageKey]);
      const compressedImage = await ImageCompressor.compressImage(editedImages[newImageKey]);
      const formData = new FormData();
      const addPath = `images/${model.collection}/${newFileName}`;
      formData.append("file", compressedImage);
      await fetch(`/${addPath}`, {
        method: "POST",
        body: formData,
      });
      if (imageToReplace) {
        await fetch(`/delete-img?path=${model.collection}/${imageToReplaceFileName}`, {
          method: "POST",
        });
      }
      modelData[newImageKey] = addPath;
    }
    if (!model.id) {
      createModel(model.collection, modelData).then(() => {
        window.location.reload();
      })
    } else {
      sendModelData(model.collection, model.id, modelData).then(() => {
        window.location.reload();
      });
    }
  }

  function DeleteButton() {
    return (
      
      <div className="d-flex flex-row col-lg-2 col-12 py-2 justify-content-start align-items-center">
      <Dropdown>
        <Dropdown.Button flat color="error" icon={<DeleteForeverTwoToneIcon />} />
        <Dropdown.Menu
      aria-label="navbar-dropdown-menu"
      css={{
        $$dropdownMenuWidth: "340px",
        $$dropdownItemHeight: "fit-content",
        "& .nextui-dropdown-item": {
          py: "$4",
          svg: {
            color: "$secondary",
            mr: "$4",
          },
          "& .nextui-dropdown-item-content": {
            w: "100%",
            fontWeight: "$semibold",
          },
        },
      }}
      onAction={handleDeleteClick}
    >
      <Dropdown.Item
        icon={<DeleteForeverTwoToneIcon fontSize="large" style={{color: "red"}} />}
        showFullDescription
        description="Warning: This action cannot be undone."
        key="confirm"
      >
        Delete this "{model.name}"
      </Dropdown.Item>
      <Dropdown.Item
        icon={<FavoriteTwoToneIcon fontSize="large" style={{color: "limegreen"}} />}
        showFullDescription
        description="Oops! That's not what I meant to do."
        withDivider
        key="cancel"
      >
        Nevermind
      </Dropdown.Item>
    </Dropdown.Menu>
      </Dropdown>
    </div>
    )
  }

  return (
    <Modal
      open={open}
      closeButton
      blur
      width="100%"
      css={{marginInline:"3rem"}}
      onClose={() => setOpen(false)}
    >
      <Modal.Header className="d-flex flex-column align-items-center justify-content-start">
        { model.id && <DeleteButton /> }
        <WLHeader headerLevel={4}>
          {`${model.id ? "Edit" : "New"}: "${model.name}"`}
        </WLHeader>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          { (Object.keys(model.shortStrings).length !== 0 || Object.keys(model.longStrings).length !== 0) && <Text h4>Text</Text>}
          { (Object.keys(model.shortStrings).length !== 0 || Object.keys(model.longStrings).length !== 0) && <Divider />}
          <div className="row d-flex flex-row align-items-center justify-content-start">
            <TextEdit />
          </div>
          <div className="row d-flex flex-row align-items-center justify-content-start">
            <BigTextEdit />
          </div>
          { Object.keys(model.numbers).length !== 0 && <Text h4>Numbers</Text>}
          { Object.keys(model.numbers).length !== 0 && <Divider />}
          <div className="row d-flex flex-row align-items-center justify-content-start">
            <NumbersEdit />
          </div>
          { Object.keys(model.images).length !== 0 && <Text h4>Images</Text>}
          { Object.keys(model.images).length !== 0 && <Divider />}
          <div className="row d-flex flex-row align-items-center justify-content-start">
            <ImageEdit />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="container-fluid d-flex flex-column align-items-center">
        <div className="row w-100 d-flex flex-row justify-content-end">
          <div className="col-lg-4 py-2 col-md-12 d-flex flex-row justify-content-end">
            <Button flat style={{width: "100%"}} color="" onClick={() => setOpen(false)}>Discard</Button>
          </div>
          <div className="col-lg-4 py-2 col-md-12 d-flex flex-row justify-content-end">
            <Button flat style={{width: "100%"}} color="success" onClick={saveModelChanges}>Save</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

function EditableTextField({setTextState, setEditedText, stringKey, textState, editedText}) {
  
  const [currentText, setCurrentText] = useState(textState.shortStrings[stringKey] ? textState.shortStrings[stringKey] : "");

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  function saveChanges() {
    const newTextState = {...textState};
    newTextState.shortStrings[stringKey] = currentText;
    const newEditedText = {...editedText};
    newEditedText.shortStrings[stringKey] = currentText;
    setTextState(newTextState);
    setEditedText(newEditedText);
  }

  function checkEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveChanges();
    }
  }

  return (
    <div className="py-2 d-flex flex-column align-items-center justify-content-center col-lg-4 col-md-6 col-sm-12">
      <TextField label={stringKey} style={{width: "100%"}} value={currentText} onChange={handleTextChange} onBlur={saveChanges} onKeyDown={checkEnter}/>
    </div>
  )
}


function EditableNumberField({setNumbersState, setEditedNumbers, numberKey, numbersState, editedNumbers}) {
  
  const [currentNumber, setCurrentNumber] = useState(numbersState[numberKey] ? numbersState[numberKey] : "");

  function handleNumbersChange(e) {
    const num = parseInt(e.target.value);
    setCurrentNumber(isNaN(num) ? null : num);
  }

  function saveChanges() {
    const newNumbersState = {...numbersState};
    newNumbersState[numberKey] = currentNumber;
    const newEditedNumbers = {...editedNumbers};
    newEditedNumbers[numberKey] = currentNumber;
    setNumbersState(newNumbersState);
    setEditedNumbers(newEditedNumbers);
  }

  function checkEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveChanges();
    }
  }

  return (
    <div className="py-2 d-flex flex-column align-items-center justify-content-center col-lg-4 col-md-6 col-sm-12">
      <TextField label={numberKey} numeric style={{width: "100%"}} value={currentNumber ? currentNumber : ""} onChange={handleNumbersChange} onBlur={saveChanges} onKeyDown={checkEnter}/>
    </div>
  )
}

function EditableTextBlock({setTextState, setEditedText, stringKey, textState, editedText}) {
  
  const [currentText, setCurrentText] = useState(textState.longStrings[stringKey] ? textState.longStrings[stringKey] : "");

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  function saveChanges() {
    const newTextState = {...textState};
    newTextState.longStrings[stringKey] = currentText;
    const newEditedText = {...editedText};
    newEditedText.longStrings[stringKey] = currentText;
    setTextState(newTextState);
    setEditedText(newEditedText);
  }

  function checkEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveChanges();
    }
  }

  return (
    <div className="py-2 d-flex flex-column align-items-center justify-content-center col-12">
      <Textarea fullWidth label={stringKey} style={{width: "100%"}} value={currentText} onChange={handleTextChange} onBlur={saveChanges} onKeyDown={checkEnter}/>
    </div>
  )
}