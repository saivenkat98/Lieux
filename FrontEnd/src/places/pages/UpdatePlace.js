import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import useHttpClient from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";


const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const [loadedPlaces, setLoadedPlaces] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const placeId = useParams().placeId;

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    const fetchPlaces = async () => {
      try{
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,'GET');
        setLoadedPlaces(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      }
    catch(err){}
  };
  fetchPlaces();
},[sendRequest,setFormData,placeId]);


  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,'PATCH',
    JSON.stringify({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value
    }),{
      'Content-Type': 'application/json',
      Authorization : 'Bearer '+auth.token
    });
    history.push('/'+auth.userId+'/places');
    }
    catch(err){}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlaces && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form> }
    </React.Fragment>
  );
};

export default UpdatePlace;
