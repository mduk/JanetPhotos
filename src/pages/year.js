import React from 'react';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import DB from '../db'

export default class extends React.Component {

  state = {
    db: new DB('http://localhost:5984/camera'),
    photos: [],
    year: null,
  };

  async componentDidMount() {
    this._loadPhotos();
  }

  async componentDidUpdate(prevProps, prevState) {
    const year = this.props.match.params.year;
    const prevYear = prevProps.match.params.year;
    if (year != prevYear) {
      this._loadPhotos();
    }
  }

  async _loadPhotos() {
    const year = this.props.match.params.year;
    const photos = await this.state.db.getPhotosByYear(year);

    this.setState((state, props) => {
      return {
        ...state,
        photos: photos,
        year: this.props.match.params.year
      };
    });
  }

  render() {
    const { photos, year } = this.state;
    const no_photos = <p>No Photos</p>;

    let content = photos.map(([date, photos]) => {
      const thumbnails = photos.map(photo => (
        <a href={`#/view/${photo._id}`}>
          <Image src={photo.ThumbHttp} rounded />
        </a>
      ));
      return (
        <>
          <h1>{date}</h1>
          {thumbnails}
        </>
      );
    });

    return (
      <Container fluid>
        {content}
      </Container>
    );
  }
}
