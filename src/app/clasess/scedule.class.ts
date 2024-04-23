export class SceduleItem  {
    date!: Date;
    time: string  = new Date().toLocaleTimeString().slice(0,-3);
    name: string = '';
    description: string = '';
    type : number = 1;
    id: number = 1
  }