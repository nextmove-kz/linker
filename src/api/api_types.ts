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
	Details = "details",
	Files = "files",
	Orders = "orders",
	Products = "products",
	SettingVariant = "setting_variant",
	Settings = "settings",
	ShoppingBasket = "shoppingBasket",
	Subscribers = "subscribers",
	Users = "users",
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
	created?: IsoDateString
	displayName?: string
	id: string
	name: string
	updated?: IsoDateString
}

export type DetailsRecord<TorderData = unknown> = {
	attachments?: string[]
	business?: RecordIdString
	created?: IsoDateString
	id: string
	orderData?: null | TorderData
	updated?: IsoDateString
}

export type OrdersRecord<Tpayment = unknown> = {
	business?: RecordIdString
	created?: IsoDateString
	details?: RecordIdString
	device_id: string
	id: string
	items?: RecordIdString[]
	payment?: null | Tpayment
	status?: boolean
	updated?: IsoDateString
}

export type FilesRecord = {
	created?: IsoDateString
	file?: string[]
	id: string
	updated?: IsoDateString
}

export type ProductsRecord = {
	business?: RecordIdString
	category_name?: string
	created?: IsoDateString
	description?: string
	id: string
	photo?: string
	price?: number
	settings?: RecordIdString[]
	title: string
	updated?: IsoDateString
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
	type?: SettingsTypeOptions
	updated?: IsoDateString
	variants?: RecordIdString[]
}

export type ShoppingBasketRecord = {
	amount: number
	business?: RecordIdString
	created?: IsoDateString
	device_id: string
	id: string
	selected_variants?: RecordIdString[]
	product: RecordIdString
	updated?: IsoDateString
}

export type SubscribersRecord = {
	created?: IsoDateString
	email: string
	id: string
	name?: string
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BusinessResponse<Texpand = unknown> = Required<BusinessRecord> & BaseSystemFields<Texpand>
export type DetailsResponse<TorderData = unknown, Texpand = unknown> = Required<DetailsRecord<TorderData>> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type OrdersResponse<TorderData = unknown, Texpand = unknown> = Required<OrdersRecord<TorderData>> & BaseSystemFields<Texpand>
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> & BaseSystemFields<Texpand>
export type SettingVariantResponse<Texpand = unknown> = Required<SettingVariantRecord> & BaseSystemFields<Texpand>
export type SettingsResponse<Texpand = unknown> = Required<SettingsRecord> & BaseSystemFields<Texpand>
export type ShoppingBasketResponse<Texpand = unknown> = Required<ShoppingBasketRecord> & BaseSystemFields<Texpand>
export type SubscribersResponse<Texpand = unknown> = Required<SubscribersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	business: BusinessRecord
	details: DetailsRecord
	files: FilesRecord
	orders: OrdersRecord
	products: ProductsRecord
	setting_variant: SettingVariantRecord
	settings: SettingsRecord
	shoppingBasket: ShoppingBasketRecord
	subscribers: SubscribersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	business: BusinessResponse
	details: DetailsResponse
	files: FilesResponse
	orders: OrdersResponse
	products: ProductsResponse
	setting_variant: SettingVariantResponse
	settings: SettingsResponse
	shoppingBasket: ShoppingBasketResponse
	subscribers: SubscribersResponse
	users: UsersResponse
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
	collection(idOrName: 'details'): RecordService<DetailsResponse>
	collection(idOrName: 'files'): RecordService<FilesResponse>
	collection(idOrName: 'orders'): RecordService<OrdersResponse>
	collection(idOrName: 'products'): RecordService<ProductsResponse>
	collection(idOrName: 'setting_variant'): RecordService<SettingVariantResponse>
	collection(idOrName: 'settings'): RecordService<SettingsResponse>
	collection(idOrName: 'shoppingBasket'): RecordService<ShoppingBasketResponse>
	collection(idOrName: 'subscribers'): RecordService<SubscribersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
