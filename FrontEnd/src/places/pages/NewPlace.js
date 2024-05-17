import React,{useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState,inputHandler] = useForm({
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false
      }
    }},
    {isValid:false}
  );

  const history = useHistory();
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append('address',formState.inputs.address.value);
      formData.append('creator',auth.userId);
      formData.append('image',formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+'/places',
        'POST',
        formData,
        {
          Authorization: 'Bearer '+auth.token
        }
      );
      history.push('/')
    } 
    catch (err) {}
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter a minimum of 5 character description"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid address"
        onInput={inputHandler}
      />
      <ImageUpload center id="image" onInput={inputHandler} errorText="Please upload an image."/>
      {/* <Button type="submit" disabled={!formState.isValid}> */}
      <Button type="submit">
        ADD PLACE
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;