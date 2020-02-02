import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import { Months } from './data';
import { transformPhotos } from './photos';

PouchDB.plugin(PouchDBFind);

const home = '/home/daniel/Camera';
const http = 'http://eddie.local:81';

export default class {

  constructor(name) {
    this.db = new PouchDB(name);
  }

  async getPhotoById(id) {
    const doc = await this.db.get(id);
    return transformPhotos(doc);
  }

  async getAllPhotos() {
    const results = await this.db.allDocs({include_docs: true});
    const docs = results.rows.map(result => result.doc);
    const photos = docs.map(transformPhotos);
    return photos
  }

  async _getPhotosByCreateDateMatch(regex, { limit=1000 } ) {
    const query = {
      selector: {
        CreateDate: {
          '$regex': `${regex}`
        }
      },
      limit: limit
    };
    const results = await this.db.find(query);
    const docs = results.docs;
    const photos = docs.map(transformPhotos);
    return this._groupPhotos(photos);
  }

  async getPhotosByYear(year) {
    return this._getPhotosByCreateDateMatch(year, { limit: 1000 });
  }

  async getPhotosByYearMonth(year, month) {
    const months = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12'
    };

    month = months[month];

    return this._getPhotosByCreateDateMatch(`${year}:${month}`, { limit: 1000 })
  }

  _groupPhotos(photos) {
    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };

    return Object.entries(photos.reduce((acc, photo) => {
      let [ year, month, day, hour, minute, seconds, ...tz] = photo.CreateDate.split(/:| |\+/)
      let date = `${year}-${month}-${day}`;
      if (!(date in acc)) {
        acc[date] = [];
      }
      acc[date].push(photo);
      return acc;
    }, {}));
  }

}

