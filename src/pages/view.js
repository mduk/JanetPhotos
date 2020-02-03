import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

import { DatabaseHost } from '../data';
import { transformPhotos, groupPhotosByDay } from '../photos';

export default function() {
  const { id } = useParams();

  const [ photo, setPhoto ] = useState(null);
  useEffect(() => {
    async function getPhoto() {
      const request = {
        method: 'get',
        url: `${DatabaseHost}/camera/${id}`,
      };
      const response = await axios(request);
      setPhoto(transformPhotos(response.data));
    }
    getPhoto();
  });

  let media;
  if (!photo) {
    return (
      <p>Loading...</p>
    );
  }

  if (photo.MIMEType.startsWith('image/')) {
    media = <img src={photo.SourceHttp} width="100%" height="100%" alt={photo.CreateDate}/>
  }
  else {
    media = <ReactPlayer playing
              url={photo.SourceHttp}
              controls={true}
              muted={true}
              width="100%"
              height="100%"
            />
  }

  const metadata = Object.keys(photo).map(k => (
    <Table.Row>
      <Table.Cell>{k}</Table.Cell>
      <Table.Cell>{photo[k]}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      {media}
      <Table striped definition compact>
        <Table.Body>{metadata}</Table.Body>
      </Table>
    </>
  );
};
