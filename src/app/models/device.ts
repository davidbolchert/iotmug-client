import { Guid } from "guid-typescript";
import { DeviceType } from './device-type';

export class Device {
	deviceId: Guid;
	name: string;
	password: string;
	description: string;
	twin: string;
	deviceTypeId: Guid;
	type: DeviceType;
	isConnected: boolean;
}
