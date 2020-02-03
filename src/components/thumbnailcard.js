import React from 'react';
import { Menu, Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function({ photo }) {
  function onClickThumbnail(photo) {
    console.log("thumbnail click", photo);
  };

  return (
    <Card raised>
      <Image wrapped
        ui={false}
        src={photo.ThumbHttp}
        onClick={() => onClickThumbnail(photo)}
      />
      <Card.Content>
        <Menu fluid icon widths={2}>
          <Menu.Item as={Link} to={`/view/${photo.id}`}>
            <Icon name='eye'/>
          </Menu.Item>
          <Menu.Item href={photo.SourceHttp}>
            <Icon name='download'/>
          </Menu.Item>
        </Menu>
      </Card.Content>
    </Card>
  );
};
