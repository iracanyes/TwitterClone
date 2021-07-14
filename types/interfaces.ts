export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  image: string;
  status: string;
  updatedAt: string;
  fleets: {
    items: [IFleet]
  }
}

export interface IFleet {
  id: string;
  type: string;
  text: string;
  createdAt: string;

}

export interface IFleetViewProps {
  user: IUser|null;
  fleet: IFleet;
  progress: number;
  goToNextFleet: Function;
  goToPrevFleet: Function;
}


