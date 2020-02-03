import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { Container, Card, Divider } from 'semantic-ui-react';

import { DatabaseHost, Tags, MonthOrdinals } from '../data';
import { transformPhotos, groupPhotosByDay } from '../photos';
import ThumbnailCard from '../components/thumbnailcard';

export default function(props) {
  const { match: { params: { year, month } } } = props;
  const [ days, setDays ] = useState([]);

  const fromDate = [parseInt(year), MonthOrdinals[month], 0];
  const   toDate = [parseInt(year), MonthOrdinals[month], 32];

  useEffect(() => {
    async function getData() {
      const dburl = `${DatabaseHost}/camera/_design/byYearMonth/_view/by-create-date`;
      const response = await axios({
        method: 'get',
        url: dburl,
        params: {
          start_key: JSON.stringify(fromDate),
          end_key: JSON.stringify(toDate)
        }
      });
      setDays(groupPhotosByDay(
        response.data.rows
          .map(r => r.value)
          .map(transformPhotos)
      ));
    }
    getData();
  }, [
    year, month
  ]);

  let content;

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
