import { Device } from './device';
import { Guid } from "guid-typescript";

export class DeviceType {
    deviceTypeId: Guid;
    name: string;
    defaultTwin: JSON;

    devices: Device[];
}
