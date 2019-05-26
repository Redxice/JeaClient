export class Message {
  id: number;
  owner_id: number;
  username: string;
  content: string;
  forum_id: number;
  reactions: Message[];
  creationDate: String;

  constructor(owner_id: number, content: string, forum_id: number,
              reactions: Message[], creationDate: String) {
    this.owner_id=owner_id;
    this.content=content;
    this.forum_id = forum_id;
    this.reactions = reactions;
    this.creationDate = creationDate;
  }

}
