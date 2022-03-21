import { randomFileName } from './fileHelpers';
import { IImage } from '../models/IImage';
import JSZip from 'jszip';
// import JSZipUtils from 'jszip-utils';

export function imageDownloader(imgArray: Array<IImage>) {
  const zip = new JSZip();
  const count = 0;

  imgArray.forEach((img) => {
    const fileName = img?.fileName || `${randomFileName(6)}.jpg`;
    // JSZipUtils.getBinaryContent(url, (err: any, data: any) => {
    //   if (err) {
    //     throw err;
    //   }
    //   zip.file(fileName, data, { binary: true });
    // });
  });

  // const tempDownloadLink = document.createElement('a');
  // tempDownloadLink.style.display = 'none';
  // tempDownloadLink.setAttribute('target', '_blank');
  // document.body.append(tempDownloadLink);

  // imgArray.map((img) => {
  //   tempDownloadLink.setAttribute('href', img.url);
  //   tempDownloadLink.setAttribute(
  //     'download',
  //     img?.fileName || `${randomFileName(6)}.jpg`,
  //   );
  //   tempDownloadLink.click();
  // });

  // document.body.removeChild(tempDownloadLink);
}
