/**
 * Created by zhangxu on 2016/8/22.
 */
export interface Urls {
  labelsUrl: string;
  labelUrl(label: string): string;
  noteUrl(id: number): string;

}

export class RestUrls implements Urls {
  noteUrl(id: number): string {
    return `data/notes/${id}.json`;
  }

  labelUrl(label: string): string {
    return `data/label/${label}.json`;
  }

  labelsUrl: string = "data/labels.json"
}

export class FileUrls implements Urls {
  noteUrl(id: number): string {
    return `/api/note/${id}.json`;
  }

  labelUrl(label: string): string {
    return `/api/labels/${label}.json`;
  }

  labelsUrl: string = "/api/labels.json"
}

// export const UrlServices: Urls = new RestUrls()
export const UrlServices: Urls = new FileUrls()
