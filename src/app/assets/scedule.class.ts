import { ColorType } from "./type.enum";

export class SceduleItem  {
    date!: Date;
    time: string  = new Date().toLocaleTimeString().slice(0,-3);
    name: string = '';
    description: string = '';
    type: keyof typeof ColorType = getKeyByIndex(0);
    id: number = 1
  }

  const getKeyByIndex = (index: number): keyof typeof ColorType => {
    return Object.keys(ColorType)[index] as keyof typeof ColorType;
  }