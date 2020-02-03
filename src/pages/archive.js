import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { Container, Card, Divider } from 'semantic-ui-react';

import { DatabaseHost, MonthOrdinals } from '../data';
import { transformPhotos, groupPhotosByDay } from '../photos';
import ThumbnailCard from '../components/thumbnailcard';

export default function(props) {
  const { match: { params: { year, month } } } = props;
  const [ days, setDays ] = useState([]);

  const fromDate = [parseInt(year), MonthOrdinals[month]];

  useEffect(() => {
    async function getData() {
      const request = {
        method: 'get',
        url: `${DatabaseHost}/camera/_design/byYearMonth/_view/photo-counts`,
        params: {
          key: JSON.stringify(fromDate),
          reduce: false
        }
      };
      const response = await axios(request);
      setDays(groupPhotosByDay(
        response.data.rows
          .map(({id, key, value}) => {
            return { id, ...value };
          })
          .map(transformPhotos)
      ));
    }
    getData();
  }, [
    year, month
  ]);

  let content;
  console.log(days);

  if (days.length > 0) {
    content = days.map(({ date, count, photos }) => {
      const thumbnails = photos.map(photo => (
        <ThumbnailCard photo={photo}/>
      ));

      return (
        <div className='month'>
          <h1>{date} ({count})</h1>
          <Card.Group>{thumbnails}</Card.Group>
          <Divider/>
        </div>
      );
    });
  }
  else {
    content = <p>Nothing to display</p>;
  }

  const month_photos = days.reduce((acc, d) => acc += d.count, 0);

  return (
    <Container fluid>
      <h1>There are {month_photos} photos in {month} {year}</h1>
      {content}
      <pre>
{JSON.stringify({ year, month, days }, null, 2)}</pre>
    </Container>
  );
}
