export class Forum {
  id: number;
  tag: string;
  owner_id: number;
  title: string;
  constructor(id: number, tag: string, owner_id: number,  title: string) {
    this.id =id;
    this.tag = tag;
    this.owner_id = owner_id;
    this.title = title;
  }
}
