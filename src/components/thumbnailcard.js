import React from 'react';
import { Menu, Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function({ photo, tags }) {
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
          <Menu.Item as={Link} to={`/view/${photo._id}`}>
            <Icon name='eye'/>
          </Menu.Item>
          <Menu.Item href={photo.SourceHttp}>
            <Icon name='download'/>
          </Menu.Item>
        </Menu>
      </Card.Content>
    {/*
      <Card.Content>

        <Dropdown floating labeled button fluid basic
          text='Tag'
          icon='tag'
          className='icon'
        >
          <Dropdown.Menu>
            <Input icon='search' iconPosition='left' className='search' />
            <Dropdown.Divider />
            <Dropdown.Header icon='tags' content='Tag' />
            <Dropdown.Menu scrolling>
                <Dropdown.Item key="key">Value</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        <div className='ui four buttons'>

          <Button basic icon color='grey'>
            <Icon name="download"/>
            <Dropdown>
              <Dropdown.Menu>
                <Dropdown.Header>Download</Dropdown.Header>
                <Dropdown.Item text='Original' />
                <Dropdown.Divider/>
                <Dropdown.Header>Effects</Dropdown.Header>
                <Dropdown.Item text='Grayscale' />
              </Dropdown.Menu>
            </Dropdown>
          </Button>

          <Button basic icon color='grey'>
            <Icon name="edit"/>
            <Dropdown>
              <Dropdown.Menu>
                <Dropdown.Header>Edit</Dropdown.Header>
                <Dropdown.Item icon="redo" text='Rotate Clockwise' />
                <Dropdown.Item icon="undo" text='Rotate Anticlockwise' />
                <Dropdown.Divider/>
                <Dropdown.Item text='Flip Vertical' />
                <Dropdown.Item text='Flip Horizontal' />
                <Dropdown.Divider/>
                <Dropdown.Item icon='crop' text='Crop' />
              </Dropdown.Menu>
            </Dropdown>
          </Button>

          <Button basic icon color='grey'>
            <Icon name='tag'/>
            <Dropdown>
              <Dropdown.Menu>
                <Dropdown.Header>Tags</Dropdown.Header>
                {tagItems}
              </Dropdown.Menu>
            </Dropdown>
          </Button>

          <Button basic icon='trash' color='red'/>

        </div>
      </Card.Content>
        */}
    </Card>
  );
};
