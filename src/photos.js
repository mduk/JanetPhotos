import {
  ImagesHost,
  ImagesPath
} from './data';

export function transformPhotos(doc) {
  return {
    ...doc,
    SourceHttp: (doc.SourceFile) ? doc.SourceFile.replace(ImagesPath, ImagesHost) : '',
    ThumbHttp: (doc.ThumbFile) ? doc.ThumbFile.replace(ImagesPath, ImagesHost) : '',
  };
}

export function groupPhotosByDay(photos) {
  return Object.entries(photos.reduce((acc, photo) => {
    let [ year, month, day, ...tail ] = photo.CreateDate.split(/:| |\+/)
    let date = `${year}-${month}-${day}`;
    if (!(date in acc)) {
      acc[date] = [];
    }
    acc[date].push(photo);
    return acc;
  }, {}));
}
