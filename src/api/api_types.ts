/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Business = "business",
	BusinessFieldSettings = "business_field_settings",
	BusinessFields = "business_fields",
	Details = "details",
	FieldOptions = "field_options",
	FieldSettings = "field_settings",
	FieldTypes = "field_types",
	LandingUsers = "landing_users",
	OrderItems = "order_items",
	Orders = "orders",
	Products = "products",
	SettingOptions = "setting_options",
	SettingVariant = "setting_variant",
	Settings = "settings",
	ShoppingCart = "shopping_cart",
	Subscribers = "subscribers",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type BusinessRecord = {
	address?: string
	color?: string
	created?: IsoDateString
	description?: string
	display_name?: string
	email: string
	emailVisibility?: boolean
	id: string
	instagram?: string
	name?: string
	password: string
	phone_number?: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type BusinessFieldSettingsRecord = {
	businsess_field: RecordIdString
	created?: IsoDateString
	id: string
	setting: RecordIdString
	updated?: IsoDateString
	value?: string
}

export type BusinessFieldsRecord = {
	business?: RecordIdString
	created?: IsoDateString
	field_options?: RecordIdString[]
	field_settings?: RecordIdString[]
	field_type: RecordIdString
	id: string
	name: string
	position: number
	required?: boolean
	updated?: IsoDateString
}

export type DetailsRecord<TorderData = unknown> = {
	attachments?: string[]
	business?: RecordIdString
	created?: IsoDateString
	device_id: string
	id: string
	orderData?: null | TorderData
	updated?: IsoDateString
}

export type FieldOptionsRecord = {
	business_field: RecordIdString
	created?: IsoDateString
	id: string
	updated?: IsoDateString
	value: string
}

export enum FieldSettingsSettingTypeOptions {
	"text" = "text",
	"number" = "number",
	"boolean" = "boolean",
	"select" = "select",
}
export type FieldSettingsRecord = {
	created?: IsoDateString
	default_value?: string
	display_name: string
	field_type: RecordIdString
	id: string
	name: string
	setting_options?: RecordIdString[]
	setting_type: FieldSettingsSettingTypeOptions
	updated?: IsoDateString
}

export type FieldTypesRecord = {
	created?: IsoDateString
	display_name: string
	id: string
	name: string
}

export enum LandingUsersTariffOptions {
	"main" = "main",
	"lifetime" = "lifetime",
}

export enum LandingUsersConsultTypeOptions {
	"subscription" = "subscription",
	"question" = "question",
}
export type LandingUsersRecord = {
	business_name?: string
	consult_type?: LandingUsersConsultTypeOptions
	created?: IsoDateString
	email?: string
	id: string
	is_read?: boolean
	name: string
	phone: string
	tariff?: LandingUsersTariffOptions
	updated?: IsoDateString
}

export type OrderItemsRecord = {
	amount: number
	created?: IsoDateString
	device_id?: string
	id: string
	price: number
	product_name: string
	selected_variants?: string
	updated?: IsoDateString
}

export enum OrdersStatusOptions {
	"pending" = "pending",
	"declined" = "declined",
	"accepted" = "accepted",
	"finished" = "finished",
}
export type OrdersRecord = {
	attachments?: string[]
	business?: RecordIdString
	created?: IsoDateString
	details: string
	device_id: string
	id: string
	items: RecordIdString[]
	payment: string
	phone: string
	status: OrdersStatusOptions
	updated?: IsoDateString
}

export type ProductsRecord = {
	archive?: boolean
	business?: RecordIdString
	category_name?: string
	created?: IsoDateString
	description?: string
	id: string
	photo?: string
	price: number
	settings?: RecordIdString[]
	title: string
	updated?: IsoDateString
}

export type SettingOptionsRecord = {
	created?: IsoDateString
	id: string
	label: string
	setting: RecordIdString
	updated?: IsoDateString
	value: string
}

export type SettingVariantRecord = {
	created?: IsoDateString
	id: string
	name?: string
	price_change?: number
	setting?: RecordIdString
	updated?: IsoDateString
}

export enum SettingsTypeOptions {
	"single" = "single",
	"multiple" = "multiple",
}
export type SettingsRecord = {
	created?: IsoDateString
	id: string
	name?: string
	type: SettingsTypeOptions
	updated?: IsoDateString
	variants?: RecordIdString[]
}

export type ShoppingCartRecord = {
	amount: number
	created?: IsoDateString
	device_id: string
	id: string
	product: RecordIdString
	selected_variants?: RecordIdString[]
	updated?: IsoDateString
}

export type SubscribersRecord = {
	created?: IsoDateString
	email: string
	id: string
	name?: string
	updated?: IsoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BusinessResponse<Texpand = unknown> = Required<BusinessRecord> & AuthSystemFields<Texpand>
export type BusinessFieldSettingsResponse<Texpand = unknown> = Required<BusinessFieldSettingsRecord> & BaseSystemFields<Texpand>
export type BusinessFieldsResponse<Texpand = unknown> = Required<BusinessFieldsRecord> & BaseSystemFields<Texpand>
export type DetailsResponse<TorderData = unknown, Texpand = unknown> = Required<DetailsRecord<TorderData>> & BaseSystemFields<Texpand>
export type FieldOptionsResponse<Texpand = unknown> = Required<FieldOptionsRecord> & BaseSystemFields<Texpand>
export type FieldSettingsResponse<Texpand = unknown> = Required<FieldSettingsRecord> & BaseSystemFields<Texpand>
export type FieldTypesResponse<Texpand = unknown> = Required<FieldTypesRecord> & BaseSystemFields<Texpand>
export type LandingUsersResponse<Texpand = unknown> = Required<LandingUsersRecord> & BaseSystemFields<Texpand>
export type OrderItemsResponse<Texpand = unknown> = Required<OrderItemsRecord> & BaseSystemFields<Texpand>
export type OrdersResponse<Texpand = unknown> = Required<OrdersRecord> & BaseSystemFields<Texpand>
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> & BaseSystemFields<Texpand>
export type SettingOptionsResponse<Texpand = unknown> = Required<SettingOptionsRecord> & BaseSystemFields<Texpand>
export type SettingVariantResponse<Texpand = unknown> = Required<SettingVariantRecord> & BaseSystemFields<Texpand>
export type SettingsResponse<Texpand = unknown> = Required<SettingsRecord> & BaseSystemFields<Texpand>
export type ShoppingCartResponse<Texpand = unknown> = Required<ShoppingCartRecord> & BaseSystemFields<Texpand>
export type SubscribersResponse<Texpand = unknown> = Required<SubscribersRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	business: BusinessRecord
	business_field_settings: BusinessFieldSettingsRecord
	business_fields: BusinessFieldsRecord
	details: DetailsRecord
	field_options: FieldOptionsRecord
	field_settings: FieldSettingsRecord
	field_types: FieldTypesRecord
	landing_users: LandingUsersRecord
	order_items: OrderItemsRecord
	orders: OrdersRecord
	products: ProductsRecord
	setting_options: SettingOptionsRecord
	setting_variant: SettingVariantRecord
	settings: SettingsRecord
	shopping_cart: ShoppingCartRecord
	subscribers: SubscribersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	business: BusinessResponse
	business_field_settings: BusinessFieldSettingsResponse
	business_fields: BusinessFieldsResponse
	details: DetailsResponse
	field_options: FieldOptionsResponse
	field_settings: FieldSettingsResponse
	field_types: FieldTypesResponse
	landing_users: LandingUsersResponse
	order_items: OrderItemsResponse
	orders: OrdersResponse
	products: ProductsResponse
	setting_options: SettingOptionsResponse
	setting_variant: SettingVariantResponse
	settings: SettingsResponse
	shopping_cart: ShoppingCartResponse
	subscribers: SubscribersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'business'): RecordService<BusinessResponse>
	collection(idOrName: 'business_field_settings'): RecordService<BusinessFieldSettingsResponse>
	collection(idOrName: 'business_fields'): RecordService<BusinessFieldsResponse>
	collection(idOrName: 'details'): RecordService<DetailsResponse>
	collection(idOrName: 'field_options'): RecordService<FieldOptionsResponse>
	collection(idOrName: 'field_settings'): RecordService<FieldSettingsResponse>
	collection(idOrName: 'field_types'): RecordService<FieldTypesResponse>
	collection(idOrName: 'landing_users'): RecordService<LandingUsersResponse>
	collection(idOrName: 'order_items'): RecordService<OrderItemsResponse>
	collection(idOrName: 'orders'): RecordService<OrdersResponse>
	collection(idOrName: 'products'): RecordService<ProductsResponse>
	collection(idOrName: 'setting_options'): RecordService<SettingOptionsResponse>
	collection(idOrName: 'setting_variant'): RecordService<SettingVariantResponse>
	collection(idOrName: 'settings'): RecordService<SettingsResponse>
	collection(idOrName: 'shopping_cart'): RecordService<ShoppingCartResponse>
	collection(idOrName: 'subscribers'): RecordService<SubscribersResponse>
}
