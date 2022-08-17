<template>
	<v-card flat class="transparent">
		<v-card-title class="mb-md-5">
			{{ title }}
			<v-spacer></v-spacer>
			<v-select
				v-if="!noPagination"
				dense
				outlined
				hide-details
				class="mr-md-3"
				v-model="itemsPP"
				label="Items Per Page"
				style="max-width: 150px"
				:items="[5, 10, 15, 20, 50]"
			/>
			<!-- <v-text-field
        dense
        outlined
        hide-details
        label="Filter"
        v-model="searchKeyModel"
        class="filter mt-md-0 mt-3"
        append-icon="mdi-search"
			></v-text-field>-->
		</v-card-title>
		<v-card-text>
			<v-data-table
				single-expand
				hide-default-footer
				:items="items"
				:headers="headers"
				:loading="loading"
				:expanded.sync="mExpanded"
				:show-expand="expanded"
				:items-per-page="options.perPage"
				item-key="id"
				class="pt-3 pb-5 transparent"
			>
				<template v-slot:[&#x60;item.name&#x60;]="{ item }">
					<div class="d-flex align-center">
						<v-avatar color="grey" class="white--text" size="24">
							{{
							item.name[0]
							}}
						</v-avatar>
						<span class="ml-3" style="white-space: nowrap">
							{{
							item.name
							}}
						</span>
					</div>
				</template>
				<template v-slot:[&#x60;item.role&#x60;]="{ item }">
					<v-chip small class="white--text capitalize" :color="roleColor || 'primary'">{{ item.role }}</v-chip>
				</template>
				<template v-slot:[&#x60;item.actions&#x60;]="{ item }">
					<v-menu bottom left transition="slide-x-transition">
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark icon v-bind="attrs" v-on="on" color="primary">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<slot name="actions">
							<v-list class="bg-sec">
								<v-list-item v-if="actions.update" link class="pl-5 pr-8" @click="$emit('update', item)">
									<v-list-item-title>
										<v-icon color="primary" size="18" class="mr-2">mdi-pencil</v-icon>
										<span class="body-2">Update</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item v-if="actions.remove" link class="pl-5 pr-8" @click="$emit('delete', item.id)">
									<v-list-item-title>
										<v-icon color="error" size="18" class="mr-2">mdi-trash-can</v-icon>
										<span class="body-2">Delete</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item
									link
									class="pl-5 pr-8"
									v-if="actions.cancel"
									:disabled="item.status === 'canceled'"
									@click="$emit('cancel', item.id)"
								>
									<v-list-item-title>
										<v-icon color="error" size="18" class="mr-2">mdi-cancel</v-icon>
										<span class="body-2">Cancel</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item link class="pl-5 pr-8" v-if="actions.view" @click="$emit('view', item)">
									<v-list-item-title>
										<v-icon color="error" size="18" class="mr-2">mdi-eye</v-icon>
										<span class="body-2">View</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item
									v-if="actions.suspend"
									link
									class="pl-5 pr-8"
									@click="
                    $emit('suspend', {
                      userId: item.user.id,
                      status: ['1', 1].includes(item.user.status) ? 0 : 1,
                    })
                  "
								>
									<v-list-item-title>
										<v-icon
											v-if="+item.user.status === 0"
											color="success"
											size="18"
											class="mr-2"
										>mdi-account-check</v-icon>
										<v-icon v-else color="error" size="18" class="mr-2">mdi-block-helper</v-icon>

										<span class="body-2">
											{{
											+item.user.status ? "Suspended" : "Active"
											}}
										</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item link class="pl-5 pr-8" v-if="actions.add" @click="$emit('add', item)">
									<v-list-item-title>
										<v-icon color="error" size="18" class="mr-2">mdi-plus</v-icon>
										<span class="body-2">ADD</span>
									</v-list-item-title>
								</v-list-item>
								<v-list-item link class="pl-5 pr-8" v-if="actions.reduce" @click="$emit('reduce', item)">
									<v-list-item-title>
										<v-icon color="error" size="18" class="mr-2">mdi-minus</v-icon>
										<span class="body-2">Reduce</span>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</slot>
					</v-menu>
				</template>
				<template v-if="!noPagination" v-slot:footer>
					<v-pagination v-model="pageNo" :length="pageCount" />
				</template>
				<template v-for="slot in slots" v-slot:[slot]="{ item }">
					<slot :name="slot.split('.').pop()" :item="item" />
				</template>
				<template v-if="expanded" v-slot:expanded-item="{ headers, item }">
					<td :colspan="headers.length" class="px-md-3">
						<slot name="expanded" :item="item" />
					</td>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "DataTable",
	props: {
		title: {
			type: String,
			default: "Table Title",
		},
		items: {
			type: Array,
			required: true,
		},
		noPagination: {
			type: Boolean,
			default: false,
		},
		headers: {
			type: Array,
			required: true,
		},
		actions: Object,
		roleColor: String,
		options: Object,
		loading: {
			type: Boolean,
			default: false,
		},
		slots: {
			type: Array,
			default: () => [],
		},
		expanded: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		st: "status",
		mExpanded: [],
		searchTimeout: null,
		searchKey: "",
	}),
	computed: {
		// searchKeyModel: {
		//   get() {
		//     return this.searchKey;
		//   },
		//   set(key) {
		//     this.searchKey = key;
		//     if (key.length % 3 === 0) this.$emit("keyword", key);
		//   },
		// },
		itemsPP: {
			get() {
				return this.options.perPage;
			},
			set(v) {
				return this.$emit("options", {
					...this.options,
					perPage: v,
				});
			},
		},
		pageNo: {
			get() {
				return this.options.page;
			},
			set(v) {
				return this.$emit("options", {
					...this.options,
					page: v,
				});
			},
		},
		pageCount() {
			let { totalPage, perPage } = this.options;
			return Math.ceil(totalPage / perPage);
		},
	},
};
</script>
<style lang="scss" scoped>
.filter {
	max-width: 350px;
	// @include on(mobile) {
	//   max-width: 100%;
	// }
}
</style>
