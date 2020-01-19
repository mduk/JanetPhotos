import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

const home = '/home/daniel/Camera';
const http = 'http://eddie.local:81';

export default class {

  constructor(name) {
    this.db = new PouchDB(name);

    /*
    this.db.createIndex({
      index: { fields: ['CreateDate'] }
    });
    */
  }

  _transform(doc) {
    return {
      ...doc,
      SourceHttp: (doc.SourceFile) ? doc.SourceFile.replace(home, http) : '',
      ThumbHttp: (doc.ThumbFile) ? doc.ThumbFile.replace(home, http) : '',
    };
  }

  async getPhotoById(id) {
    const doc = await this.db.get(id);
    return this._transform(doc);
  }

  async getAllPhotos() {
    const results = await this.db.allDocs({include_docs: true});
    const docs = results.rows.map(result => result.doc);
    const photos = docs.map(this._transform);
    return photos
  }

  async getPhotosByYear(year) {
    const query = {
      selector: {
        CreateDate: {
          '$regex': `${year}`
        }
      },
      limit: 100
    };
    const results = await this.db.find(query);
    const docs = results.docs;
    const photos = docs.map(this._transform);
    return this._groupPhotos(photos);
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

