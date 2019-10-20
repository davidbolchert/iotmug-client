import { ApiWrapperService } from './../../services/api-wrapper.service';
import { DeviceType } from './../../models/device-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-device-types',
	templateUrl: './device-types.component.html',
	styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {
	readonly serviceApi: string = "deviceTypes";

	deviceType: DeviceType;
	deviceTypes: DeviceType[];

	deviceTypeForm: FormGroup;
	loading = false;
	errorMessage = '';

	constructor(private _api: ApiWrapperService,
		private _route: ActivatedRoute,
		private _formBuilder: FormBuilder
		) { }

	ngOnInit() {
		this.loadData();
	}

	get form() { return this.deviceTypeForm.controls; }

	loadData() {
		this.errorMessage = '';

		this._api.getAll(this.serviceApi).subscribe((data: DeviceType[]) => {
			this.deviceTypes = data;
		})

		const id = this._route.snapshot.paramMap.get('id');
		if (id != null) {
			this.edit(Guid.parse(id));
		}
	}

	create() {
		this.loading = false;
		this.deviceType = new DeviceType();
		this.deviceTypeForm = this._formBuilder.group({
			name: ['', Validators.required],
			defaultTwin: ['{\n}']
		})
	}

	checkJson() {
		try {
			this.deviceType.defaultTwin = JSON.parse(this.form.defaultTwin.value);
			this.form.defaultTwin.setErrors(null);
		} catch (error) {
			this.form.defaultTwin.setErrors({jsonValidator: true});
		}
	}
	
	edit(id: Guid) {
		this._api.getById(this.serviceApi, id).subscribe(
			(data: DeviceType) => {
				this.deviceType = data;
				this.deviceTypeForm = this._formBuilder.group({
					name: [this.deviceType.name, Validators.required],
					defaultTwin: [this.deviceType.defaultTwin]
				})
			}, 
			error => console.log(error)
		);
		this.loading = false;

	}

	onSubmit() {
		this.deviceType.name = this.form.name.value;
		this.deviceType.defaultTwin = this.form.defaultTwin.value;

        // stop here if form is invalid
        if (this.deviceTypeForm.invalid) {
            return;
        }

		this.loading = true;
		if (this.deviceType.deviceTypeId != undefined){
			this.put();
		} else {
			this.post();
		} 
        this.loading = false;
	}

	post() {
		this._api.post(this.serviceApi, this.deviceType).subscribe(
			(data: DeviceType) => {
				this.deviceType = data
				this.loadData();
				this.edit(data.deviceTypeId);
			},
			error => {
				console.log(error);
				this.errorMessage = error
			}
		);
	}

	put() {
		this._api.put(this.serviceApi, this.deviceType).subscribe(
			(data: DeviceType) => {
				this.deviceType = data
				this.loadData();
				this.edit(data.deviceTypeId);
			},
			error => {
				console.log(error);
				this.errorMessage = error
			}
		);
	}

	delete(id: Guid) {
		this._api.delete(this.serviceApi, id).subscribe(
			() => this.loadData(),
			error => {
				this.edit(id);
				this.errorMessage = error;
			},
			() => {
				this.deviceType = new DeviceType();
				this.deviceTypeForm = undefined;
			}
		);
	}
}