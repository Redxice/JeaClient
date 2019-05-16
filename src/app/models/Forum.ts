export class Forum {
  id:number;
  tag: string;
  owner_id: number;
  title: string;
  constructor( tag: string, owner_id: number,  title: string) {
    this.tag = tag;
    this.owner_id = owner_id;
    this.title = title;
  }
  setNumber(id:number){
    this.id = id;
  }
}
