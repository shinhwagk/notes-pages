/**
 * Created by zhangxu on 2016/8/22.
 */
interface Urls {
  labelsUrl: string;
  labelUrl(label: string): string;

}

export class RestUrls implements Urls {
  labelUrl(label: string): string {
    return `/api/labels/${label}`;
  }

  labelsUrl: string = "/api/labels"

}

export class FileUrls implements Urls {
  labelUrl(label: string): string {
    return `/api/labels/${label}.json`;
  }

  labelsUrl: string = "/api/labels.json"

}

export const UrlServices: Urls = new RestUrls()