import {Message} from "./Message";

export class User {
  id: number;
  name: string;
  level: number;
  hoursPlayed: number;
  email: string;
  messages:Message[];
  constructor(id: number, name: string, level: number, hoursPlayed: number, email: string) {
    this.id =id;
    this.name = name;
    this.level = level;
    this.hoursPlayed = hoursPlayed;
    this.email = email;
  }

}
