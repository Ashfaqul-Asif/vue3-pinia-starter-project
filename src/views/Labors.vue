<template>
	<v-card class="p" elevation="2">
		<v-card-title class="d-flex justify-space-between">
			<div>Labors</div>
			<div>
				<v-btn @click="openDialog" color="primary">
					Add
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</div>
		</v-card-title>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Description</th>
					<th class="text-left">Drop Date</th>
					<th class="text-left">Order Date</th>
					<th class="text-left">Target Date</th>
					<th class="text-left">Total</th>

					<th class="text-left"></th>
				</tr>
			</thead>
			{{labors.data}}
			<tbody v-if="labors.data">
				<tr v-for="(item,i) in labors.data.items" :key="i">
					<td>{{ item.description }}</td>
					<td>{{ moment(item.dropDeadDateTime).format('MM-DD-YYYY') }}</td>

					<td>{{ moment(item.orderDateTime).format('MM-DD-YYYY') }}</td>
					<td>{{ moment(item.targetDateTime).format('MM-DD-YYYY') }}</td>

					<td>{{ item.total }}</td>

					<td class="d-flex align-center">
						<v-btn @click="openModalFromEdit(item)" class="mr-1" size="x-small" icon>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn @click="handleDelete(item.id)" size="x-small" icon>
							<v-icon color="error">mdi-delete</v-icon>
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-dialog scrollable persistent v-model="dialog" :max-width="'860px'">
			<v-card>
				<v-card-title class="text-center">{{isUpdate ? 'Edit Customer' :'Create Customer'}}</v-card-title>
				<v-card-text>
					<v-form>
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field label="Description" v-model="workOrderData.description" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<span>Order Date Time</span>
								<br />
								<input v-model="workOrderData.orderDateTime" type="date" />
							</v-col>
							<v-col cols="12" md="6">
								<span>Target Date Time</span>
								<br />
								<input v-model="workOrderData.targetDateTime" type="date" />
							</v-col>
							<v-col cols="12" md="6">
								<span>Drop Dead DateTime</span>
								<br />
								<input v-model="workOrderData.dropDeadDateTime" type="date" />
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field type="number" label="total" v-model="workOrderData.total" required></v-text-field>
							</v-col>
							<v-select
								:items="allWorkOrders.data"
								item-title="accountNumber"
								item-value="id"
								label="Customer"
								v-model="workOrderData.customerId"
							></v-select>
						</v-row>
					</v-form>
				</v-card-text>
				<div class="px-6 pt-3 pb-3 d-flex">
					<v-btn @click="closeDialog" class="mr-3" outlined color="error">Cancel</v-btn>

					<v-btn :loading="loading" v-if="isUpdate" @click="updateLabor" outlined color="primary">Update</v-btn>
					<v-btn :loading="loading" v-else @click="createLabors" outlined color="primary">Create</v-btn>
				</div>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import { reactive } from 'vue-demi'
import { ref, onMounted } from 'vue'
import { $workOrdersStore } from '../stores/workOrders'
import moment from 'moment'
import { $laborsStore } from '../stores/labors'

export default {
	setup() {
		const $workOrders = $workOrdersStore()
		const $labors = $laborsStore()
		const dialog = ref(false)
		const date = ref(null)
		const menu = ref(false)
		const isUpdate = ref(false)

		const loading = ref(false)
		const id = ref(null)

		const allWorkOrders = reactive({
			data: null
		})
		const labors = reactive({
			data: null
		})
		const workOrderData = reactive({
			customerId: null,
			orderDateTime: null,
			targetDateTime: null,
			dropDeadDateTime: null,
			description: null,
			total: null
		});
		const handleDelete = async (id) => {
			loading.value = true
			let [res, err] = await $labors.deleteLabor(id)
			if (res) {
				console.log(res);
			}
			loading.value = false
		}
		const getLabors = async () => {
			console.log('getLabors');
			loading.value = true
			let [res, err] = await $labors.getLabors()
			if (res) {
				console.log(res);
				labors.data = res.data
			}
			loading.value = false
		}
		const createLabors = async () => {
			console.log('createLabors');
			loading.value = true
			let [res, err] = await $labors.createLabor(workOrderData)
			if (res) {
				console.log(res);
				dialog.value = false
				await getLabors()

			}
			loading.value = false
		}

		const openModalFromEdit = (item) => {
			isUpdate.value = true
			workOrderData.customerId = item.customerId
			workOrderData.orderDateTime = item.orderDateTime
			workOrderData.targetDateTime = item.targetDateTime
			workOrderData.dropDeadDateTime = item.dropDeadDateTime
			workOrderData.description = item.description
			workOrderData.total = item.total
			id.value = item.id
			dialog.value = true

		}
		const updateLabor = async () => {
			loading.value = true
			let [res, err] = await $labors.updateLabor(workOrderData, id.value)
			if (res) {
				console.log(res);
			}
			loading.value = false
			await getLabors()

		}
		const openDialog = () => {
			workOrderData.customerId = null
			workOrderData.orderDateTime = null
			workOrderData.targetDateTime = null
			workOrderData.dropDeadDateTime = null
			workOrderData.description = null
			workOrderData.total = null
			isUpdate.value = false
			dialog.value = true
		}
		const closeDialog = () => {
			dialog.value = false
		}
		const getAllWorkOrders = async () => {
			loading.value = true
			let [res, err] = await $workOrders.getAllWorkOrders()
			if (res) {
				console.log(res);
				allWorkOrders.data = res.data
			}
			loading.value = false
		}
		onMounted(() => {
			getLabors()
			getAllWorkOrders() // <div>
		})
		return { $labors, $workOrders, getLabors, dialog, loading, labors, handleDelete, openDialog, isUpdate, workOrderData, closeDialog, createLabors, updateLabor, openModalFromEdit, id, getAllWorkOrders, moment, allWorkOrders }
	},

}
</script>
