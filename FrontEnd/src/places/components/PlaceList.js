import React from "react";

import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button/Button";
import "./PlaceList.css"
import Card from "../../shared/components/UIElements/Card";

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <Card>
          <h2>No places found. Maybe Create One?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          description={place.description}
          address={place.address}
          coordinate={place.location}
          creatorId={place.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
