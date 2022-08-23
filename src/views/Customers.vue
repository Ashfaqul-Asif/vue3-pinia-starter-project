<template>
	<v-card class="p" elevation="2">
		<v-card-title class="d-flex justify-space-between">
			<div>Customers</div>
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
					<th class="text-left">Account Number</th>
					<th class="text-left">Company Name</th>
					<th class="text-left">Phone</th>
					<th class="text-left">Address</th>
					<th class="text-left"></th>
				</tr>
			</thead>
			<tbody v-if="customers.data">
				<tr v-for="(item,i) in customers.data.items" :key="i">
					<td>{{ item.accountNumber }}</td>
					<td>{{ item.companyName }}</td>
					<td>{{ item.phone }}</td>
					<td>{{ item.address }}</td>
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
								<v-text-field label="Account Number" v-model="customerData.accountNumber" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Company Name" v-model="customerData.companyName" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Address" v-model="customerData.address" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="City" v-model="customerData.city" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Zip Code" v-model="customerData.zipCode" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="Phone" v-model="customerData.phone" required></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field label="state" v-model="customerData.state" required></v-text-field>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<div class="px-6 pt-3 pb-3 d-flex">
					<v-btn @click="closeDialog" class="mr-3" outlined color="error">Cancel</v-btn>

					<v-btn
						:loading="loading"
						v-if="isUpdate"
						@click="updateCustomer"
						outlined
						color="primary"
					>Update</v-btn>
					<v-btn :loading="loading" v-else @click="createCustomers" outlined color="primary">Create</v-btn>
				</div>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import { defineComponent } from 'vue';
import { reactive } from 'vue-demi'
import { ref, onMounted } from 'vue'
import { $customersStore } from '../stores/customers'
export default {

	setup() {
		const $customers = $customersStore()
		const dialog = ref(false)
		const isUpdate = ref(false)

		const loading = ref(false)
		const id = ref(null)

		// const customers = reactive(null)
		const customers = reactive({
			data: null
		});
		const customerData = reactive({
			accountNumber: null,
			companyName: null,
			address: null,
			city: null,
			state: null,
			zipCode: null,
			phone: null,
			id: null
		});
		const handleDelete = async (id) => {
			loading.value = true
			let [res, err] = await $customers.deleteCustomer(id)
			if (res) {
				console.log(res);
				customers.data = res.data
			}
			loading.value = false
		}
		const getCustomers = async () => {
			loading.value = true
			let [res, err] = await $customers.getCustomers()
			if (res) {
				console.log(res);
				customers.data = res.data
			}
			loading.value = false
		}
		const createCustomers = async () => {
			console.log('createCustomers');
			loading.value = true
			let [res, err] = await $customers.createCustomer(customerData)
			if (res) {
				console.log(res);
				customers.data = res.data
				loading.value = false
				dialog.value = false
				getCustomers()
			}
		}

		const openModalFromEdit = (item) => {
			isUpdate.value = true
			customerData.accountNumber = item.accountNumber
			customerData.companyName = item.companyName
			customerData.address = item.address
			customerData.city = item.city
			customerData.state = item.state
			customerData.zipCode = item.zipCode
			customerData.phone = item.phone
			customerData.id = item.id

			id.value = item.id
			dialog.value = true

		}
		const updateCustomer = async () => {
			loading.value = true
			let [res, err] = await $customers.updateCustomer(customerData, id.value)
			if (res) {
				console.log(res);
				loading.value = false
				dialog.value = false
				getCustomers()

			}
		}
		const openDialog = () => {
			customerData.accountNumber = null
			customerData.companyName = null
			customerData.address = null
			customerData.city = null
			customerData.state = null
			customerData.zipCode = null
			customerData.phone = null
			isUpdate.value = false
			dialog.value = true
		}
		const closeDialog = () => {
			dialog.value = false
		}
		onMounted(() => {
			getCustomers() // <div>
		})
		return { $customers, getCustomers, dialog, loading, customers, handleDelete, openDialog, isUpdate, customerData, closeDialog, createCustomers, updateCustomer, openModalFromEdit, id }
	},

}
</script>
