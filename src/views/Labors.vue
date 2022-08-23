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
					<th class="text-left">Notes</th>
					<th class="text-left">Service item</th>
					<th class="text-left">Labor hours</th>
					<th class="text-left">Rate</th>
					<th class="text-left">Extended price</th>
					<th class="text-left">Percent complete</th>
					<th class="text-left"></th>
				</tr>
			</thead>

			<tbody v-if="labors.data">
				<tr v-for="(item,i) in labors.data" :key="i">
					<td>{{ item.notes }}</td>
					<td>{{ item.serviceItemName }}</td>

					<td>{{ item.laborHours }}</td>
					<td>{{ item.rate }}</td>
					<td>{{ item.extendedPrice }}</td>
					<td>{{ item.percentComplete }}</td>

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
				<v-card-title class="text-center">{{isUpdate ? 'Edit Labor' :'Create Labor'}}</v-card-title>
				<v-card-text>
					<v-form>
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field label="Notes" v-model="laborData.notes" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Service item code" v-model="laborData.serviceItemCode" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Service item name" v-model="laborData.serviceItemName" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Hours" v-model="laborData.laborHours" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="rate" v-model="laborData.rate" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Extended price" v-model="laborData.extendedPrice" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Percent complete" v-model="laborData.percentComplete" required></v-text-field>
							</v-col>
							<v-select
								:items="allWorkOrders.data"
								item-title="description"
								item-value="id"
								label="Work order"
								v-model="laborData.workOrderId"
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
		const laborData = reactive({
			workOrderId: null,
			serviceItemCode: null,
			serviceItemName: null,
			laborHours: null,
			rate: null,
			extendedPrice: null,
			notes: null,
			percentComplete: null,
			id: null
		});
		const handleDelete = async (id) => {
			loading.value = true
			let [res, err] = await $labors.deleteLabor(id)
			if (res) {
				console.log(res);
				await getLabors()
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
			let [res, err] = await $labors.createLabor(laborData)
			if (res) {
				console.log(res);
				dialog.value = false
				await getLabors()

			}
			loading.value = false
		}

		const openModalFromEdit = (item) => {
			isUpdate.value = true
			laborData.workOrderId = item.workOrderId
			laborData.serviceItemCode = item.serviceItemCode
			laborData.serviceItemName = item.serviceItemName
			laborData.laborHours = item.laborHours
			laborData.notes = item.notes
			laborData.rate = item.rate
			laborData.extendedPrice = item.extendedPrice
			laborData.percentComplete = item.percentComplete
			laborData.id = item.id

			id.value = item.id
			dialog.value = true

		}
		const updateLabor = async () => {
			loading.value = true
			let [res, err] = await $labors.updateLabor(laborData, id.value)
			if (res) {
				console.log(res);
				dialog.value = false
			}
			loading.value = false
			await getLabors()

		}
		const openDialog = () => {
			laborData.workOrderId = null
			laborData.serviceItemCode = null
			laborData.serviceItemName = null
			laborData.laborHours = null
			laborData.notes = null
			laborData.rate = null
			laborData.extendedPrice = null
			laborData.percentComplete = null
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
		return { $labors, $workOrders, getLabors, dialog, loading, labors, handleDelete, openDialog, isUpdate, laborData, closeDialog, createLabors, updateLabor, openModalFromEdit, id, getAllWorkOrders, moment, allWorkOrders }
	},

}
</script>
