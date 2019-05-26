import {Message} from "./Message";


export class Forum {
  id:number;
  tag: string;
  owner_id: number;
  title: string;
  messageDtos:Message[];

  constructor( tag: string, owner_id: number,  title: string,messageDtos:Message[]) {
    this.tag = tag;
    this.owner_id = owner_id;
    this.title = title;
    this.messageDtos = messageDtos;
  }
  setNumber(id:number){
    this.id = id;
  }
  addMessage(message:Message){
    this.messageDtos.push(message)
  }
  setMessages(messages:Message[]){
    this.messageDtos = messages;
  }

}
