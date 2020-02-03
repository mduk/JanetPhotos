import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { Container, Card, Divider } from 'semantic-ui-react';

import { DatabaseHost, Tags, MonthOrdinals } from '../data';
import { transformPhotos, groupPhotosByDay } from '../photos';
import ThumbnailCard from '../components/thumbnailcard';

export default function(props) {
  const { match: { params: { year, month } } } = props;
  const [ photos, setPhotos ] = useState([]);
  const [ reqres, setReqres ] = useState(undefined);

  const fromDate = [parseInt(year), MonthOrdinals[month], 0];
  const   toDate = [parseInt(year), MonthOrdinals[month], 32];

  useEffect(() => {
    async function getData() {
      const dburl = `${DatabaseHost}/camera/_design/byYearMonth/_view/by-create-date`;
      const request = {
        method: 'get',
        url: dburl,
        params: {
          include_docs: true,
          startkey: JSON.stringify(fromDate),
          endkey: JSON.stringify(toDate)
        }
      };
      const response = await axios(request);
      setReqres({request, response});

      setPhotos(groupPhotosByDay(
        response.data.rows
          .map(r => r.doc)
          .map(transformPhotos)
      ));
    }
    getData();
  }, [
    year, month
  ]);

  let content;

  if (photos.length > 0) {
    content = photos.map(([date, photos]) => {
      const thumbnails = photos.map(photo => (
        <ThumbnailCard photo={photo} tags={Tags}/>
      ));

      return (
        <div className='month'>
          <h1>{date}</h1>
          <Card.Group>{thumbnails}</Card.Group>
          <Divider/>
        </div>
      );
    });
  }
  else {
    content = <p>Nothing to display</p>;
  }

  return (
    <Container fluid>
      {content}
      <pre>
this:
{JSON.stringify({ year, month, ...reqres }, null, 2)}</pre>
    </Container>
  );
}
