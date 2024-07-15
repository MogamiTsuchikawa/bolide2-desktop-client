declare module "electron-next" {
  interface Directories {
    production: string;
    development: string;
  }

  export default function (
    directories: Directories | string,
    port?: number
  ): Promise<void>;
}
type Message = {
  type: string;
  payload: any;
};

type FlowTextMessage = Message & {
  payload: FlowTextOption;
};
type FlowTextOption = {
  fontSize: number;
  fontColors: string[];
  flowAreas: number[];
  testMode: boolean;
  wsUrl?: string;
};
