import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiWrapperService } from 'src/app/services/api-wrapper.service';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { DeviceType } from 'src/app/models/device-type';
import { saveAs } from 'file-saver';

declare var require: any;

@Component({
	selector: 'app-devices',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

	loadData() {
		this.errorMessage = '';

		this._api.getAll(this.deviceServiceApi).subscribe((data: Device[]) => {
			this.devices = data;
		});

		this._api.getAll(this.typeServiceApi).subscribe((data: DeviceType[]) => {
			this.deviceTypes = data;
		});

		const id = this._route.snapshot.paramMap.get('id');
		if (id != null) {
			this.edit(Guid.parse(id));
		}
	}

	
	ngOnInit() {
		this.loadData();
		this.FileSaver = require('file-saver');
	}

	FileSaver:any;

	readonly deviceServiceApi: string = "devices";
	readonly typeServiceApi: string = "deviceTypes";

	device: Device;
	devices: Device[];
	deviceTypes: DeviceType[];
	selectedType: DeviceType;

	deviceForm: FormGroup;
	loading = false;
	errorMessage = '';

	downloading = false;

	constructor(private _api: ApiWrapperService,
		private _route: ActivatedRoute,
		private _formBuilder: FormBuilder
	) { }

	initializeForm(device: Device) {
		this.deviceForm = this._formBuilder.group({
			name: [device.name, Validators.required],
			description: [device.description],
			twin: [device.twin],
			typeId: [device.deviceTypeId, Validators.required]
		})
	}
	get form() { return this.deviceForm.controls; }

	
	create() {
		this.loading = false;
		this.downloading = false
		this.device = new Device();
		this.initializeForm(this.device);
	}

	checkJson() {
		try {
			this.device.twin = JSON.parse(this.form.twin.value);
			this.form.twin.setErrors(null);
		} catch (error) {
			this.form.twin.setErrors({ jsonValidator: true });
		}
	}

	updateTwinWithDefault() {
		let type = this.deviceTypes.find(t => t.deviceTypeId == this.form.typeId.value);
		if (type !== undefined){
			this.form.twin.setValue(type.defaultTwin);
		}
	}

	edit(id: Guid) {
		this._api.getById(this.deviceServiceApi, id).subscribe(
			(data: Device) => {
				this.device = data;
				this.initializeForm(this.device);
			},
			error => console.log(error)
		);
		this.loading = false;
		this.downloading = false;
	}

	onSubmit() {
		this.device.name = this.form.name.value;
		this.device.twin = this.form.twin.value;
		this.device.deviceTypeId = this.form.typeId.value;

		// stop here if form is invalid
		if (this.deviceForm.invalid) {
			return;
		}

		this.loading = true;
		if (this.device != undefined && this.device.deviceId != undefined) {
			this.put();
		} else {
			this.post();
		}
		this.loading = false;
	}

	post() {
		this._api.post(this.deviceServiceApi, this.device).subscribe(
			(data: Device) => {
				this.device = data
				this.loadData();
				this.edit(data.deviceId);
			},
			error => {
				console.log(error);
				this.errorMessage = error
			}
		);
	}

	put() {
		this._api.put(this.deviceServiceApi, this.device).subscribe(
			() => {
				this.loadData();
				this.edit(this.device.deviceId);
			},
			error => {
				console.log(error);
				this.errorMessage = error
			}
		);
	}

	delete(id: Guid) {
		this._api.delete(this.deviceServiceApi, id).subscribe(
			() => this.loadData(),
			error => {
				this.edit(id);
				this.errorMessage = error;
			},
			() => {
				this.device = new Device();
				this.deviceForm = undefined;
			}
		);
	}

	getCertificate() {
		this.downloading = true;
		const url = `${environment.apiUrl}/${this.deviceServiceApi}/certify/${this.device.deviceId}`;
		window.open(url);
		this.downloading = false;
	}
}