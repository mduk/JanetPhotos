import {
  ImagesHost,
  ImagesPath
} from './data';

export function transformPhotos(doc) {
  return {
    ...doc,
    CreateDate: doc.CreateDate,
    SourceHttp: doc.SourceFile.replace(ImagesPath, ImagesHost),
    ThumbHttp: ('ThumbFile' in doc) ? doc.ThumbFile.replace(ImagesPath, ImagesHost)
                                    : doc.SourceFile.replace(ImagesPath, ImagesHost),
  };
}

export function groupPhotosByDay(photos) {
  return Object.values(photos.reduce((acc, photo) => {
    let [ year, month, day, ...tail ] = photo.CreateDate.split(/:| |\+/)
    let date = `${year}-${month}-${day}`;

    if (!(date in acc)) {
      acc[date] = {
        date,
        count: 0,
        photos: [],
      };
    }

    acc[date].photos.push(photo);
    acc[date].count++;
    return acc;
  }, {}));
}
