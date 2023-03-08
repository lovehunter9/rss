import { Injectable } from '@nestjs/common';

const RSSHub = require('rsshub');

RSSHub.init({
  // config
});

@Injectable()
export class AppService {
  getRSS(path: string): string {
    return RSSHub.request(path)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
