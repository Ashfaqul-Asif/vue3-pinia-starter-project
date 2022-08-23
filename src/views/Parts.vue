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
		<!-- <pre>
			<code>
		{{parts.data}}

			</code>
		</pre> -->
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Notes</th>
					<th class="text-left">inventory item code</th>
					<th class="text-left">inventory item name</th>

					<th class="text-left">Quantity</th>
					<th class="text-left">Unit Price</th>

					<th class="text-left">Extended price</th>
					<th class="text-left">Percent complete</th>
					<th class="text-left"></th>
				</tr>
			</thead>

			<tbody v-if="parts.data">
				<tr v-for="(item,i) in parts.data" :key="i">
					<td>{{ item.notes }}</td>
					<td>{{ item.inventoryItemCode }}</td>

					<td>{{ item.inventoryItemName }}</td>
					<td>{{ item.unitPrice }}</td>
					<td>{{ item.quantity }}</td>
					<td>{{ item.extendedPrice }}</td>

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
								<v-text-field label="Notes" v-model="partData.notes" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Service item code" v-model="partData.serviceItemCode" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Service item name" v-model="partData.inventoryItemCode" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Hours" v-model="partData.inventoryItemName" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="quantity" v-model="partData.quantity" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Extended price" v-model="partData.extendedPrice" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Percent complete" v-model="partData.percentComplete" required></v-text-field>
							</v-col>
							<v-select
								:items="allWorkOrders.data"
								item-title="description"
								item-value="id"
								label="Work order"
								v-model="partData.workOrderId"
							></v-select>
						</v-row>
					</v-form>
				</v-card-text>
				<div class="px-6 pt-3 pb-3 d-flex">
					<v-btn @click="closeDialog" class="mr-3" outlined color="error">Cancel</v-btn>

					<v-btn :loading="loading" v-if="isUpdate" @click="updatePart" outlined color="primary">Update</v-btn>
					<v-btn :loading="loading" v-else @click="createPart" outlined color="primary">Create</v-btn>
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
import { $partsStore } from '../stores/parts'

export default {
	setup() {
		const $workOrders = $workOrdersStore()
		const $parts = $partsStore()
		const dialog = ref(false)
		const date = ref(null)
		const menu = ref(false)
		const isUpdate = ref(false)

		const loading = ref(false)
		const id = ref(null)

		const allWorkOrders = reactive({
			data: null
		})
		const parts = reactive({
			data: null
		})
		const partData = reactive({
			workOrderId: null,
			serviceItemCode: null,
			inventoryItemCode: null,
			inventoryItemName: null,
			quantity: null,
			extendedPrice: null,
			notes: null,
			percentComplete: null,
			id: null
		});
		const handleDelete = async (id) => {
			loading.value = true
			let [res, err] = await $parts.deletePart(id)
			if (res) {
				console.log(res);
				await getParts()
			}
			loading.value = false
		}
		const getParts = async () => {
			console.log('getParts');
			loading.value = true
			let [res, err] = await $parts.getAllparts()
			if (res) {
				console.log(res);
				parts.data = res.data
			}
			loading.value = false
		}
		const createPart = async () => {
			console.log('createPart');
			loading.value = true
			let [res, err] = await $parts.createPart(partData)
			if (res) {
				console.log(res);
				dialog.value = false
				await getParts()

			}
			loading.value = false
		}

		const openModalFromEdit = (item) => {
			isUpdate.value = true
			partData.workOrderId = item.workOrderId
			partData.serviceItemCode = item.serviceItemCode
			partData.inventoryItemCode = item.inventoryItemCode
			partData.inventoryItemName = item.inventoryItemName
			partData.notes = item.notes
			partData.quantity = item.quantity
			partData.extendedPrice = item.extendedPrice
			partData.percentComplete = item.percentComplete
			partData.id = item.id

			id.value = item.id
			dialog.value = true

		}
		const updatePart = async () => {
			loading.value = true
			let [res, err] = await $parts.updatePart(partData, id.value)
			if (res) {
				console.log(res);
				dialog.value = false
			}
			loading.value = false
			await getParts()

		}
		const openDialog = () => {
			partData.workOrderId = null
			partData.serviceItemCode = null
			partData.inventoryItemCode = null
			partData.inventoryItemName = null
			partData.notes = null
			partData.quantity = null
			partData.extendedPrice = null
			partData.percentComplete = null
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
			getParts()
			getAllWorkOrders() // <div>
		})
		return { $parts, $workOrders, getParts, dialog, loading, parts, handleDelete, openDialog, isUpdate, partData, closeDialog, createPart, updatePart, openModalFromEdit, id, getAllWorkOrders, moment, allWorkOrders }
	},

}
</script>
