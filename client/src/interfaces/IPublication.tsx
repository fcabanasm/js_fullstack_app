export type IPublication = {
  author: string;
  createdAt: Date;
  objectID: number;
  softDeleted: boolean;
  story_title: string;
  story_url: string;
  _id: string;
};

export type PublicationComponent = {
  publication: IPublication;
  handleDelete: (arg0: any, arg1: string) => void;
};
