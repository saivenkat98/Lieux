import React, { useState,useRef,useEffect } from "react";

import "./ImageUpload.css";
import "./Input.css"
import Button from "./Button/Button";

const ImageUpload = (props) => {

    const [file,setFile] = useState();
    const [previewURL,setPreviewURL] = useState();
    const [isValid,setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect( () => {
    if(!file){
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
        setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  },[file])

  const pickedHandler= event => {
    console.log(event);
    let pickedFile;
    let fileIsValid=isValid;
    if(event.target.files && event.target.files.length===1){
        pickedFile = event.target.files[0]
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid=true;
    }
    else{
        setIsValid(false);
        fileIsValid=false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  }

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: "none" }}
        ref={filePickerRef}
        onClick={pickedHandler}
        type="file"
        accept=".jpeg,.jpg,.png"
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewURL && <img src={previewURL} alt="Preview" />}
          {!previewURL && <p>Please provide an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          {" "}
          PICK IMAGE{" "}
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
