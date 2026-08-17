import { northDestinations } from './north';
import { southDestinations } from './south';

export const destinationData = [...northDestinations, ...southDestinations];

export type DestinationType = (typeof destinationData)[0];
