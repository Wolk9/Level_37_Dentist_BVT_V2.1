#CreateEntityAdapter Slice CRUD info

```js
export type EntityId = number | string

export type Comparer<T> = (a: T, b: T) => number

export type IdSelector<T> = (model: T) => EntityId

export interface DictionaryNum<T> {
[id: number]: T | undefined
}

export interface Dictionary<T> extends DictionaryNum<T> {
[id: string]: T | undefined
}

export type Update<T> = { id: EntityId; changes: Partial<T> }

export interface EntityState<T> {
ids: EntityId[]
entities: Dictionary<T>
}

export interface EntityDefinition<T> {
selectId: IdSelector<T>
sortComparer: false | Comparer<T>
}

export interface EntityStateAdapter<T> {
addOne<S extends EntityState<T>>(state: S, entity: T): S
addOne<S extends EntityState<T>>(state: S, action: PayloadAction<T>): S

addMany<S extends EntityState<T>>(state: S, entities: T[]): S
addMany<S extends EntityState<T>>(state: S, entities: PayloadAction<T[]>): S

setAll<S extends EntityState<T>>(state: S, entities: T[]): S
setAll<S extends EntityState<T>>(state: S, entities: PayloadAction<T[]>): S

removeOne<S extends EntityState<T>>(state: S, key: EntityId): S
removeOne<S extends EntityState<T>>(state: S, key: PayloadAction<EntityId>): S

removeMany<S extends EntityState<T>>(state: S, keys: EntityId[]): S
removeMany<S extends EntityState<T>>(
state: S,
keys: PayloadAction<EntityId[]>
): S

removeAll<S extends EntityState<T>>(state: S): S

updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S
updateOne<S extends EntityState<T>>(
state: S,
update: PayloadAction<Update<T>>
): S

updateMany<S extends EntityState<T>>(state: S, updates: Update<T>[]): S
updateMany<S extends EntityState<T>>(
state: S,
updates: PayloadAction<Update<T>[]>
): S

upsertOne<S extends EntityState<T>>(state: S, entity: T): S
upsertOne<S extends EntityState<T>>(state: S, entity: PayloadAction<T>): S

upsertMany<S extends EntityState<T>>(state: S, entities: T[]): S
upsertMany<S extends EntityState<T>>(
state: S,
entities: PayloadAction<T[]>
): S
}

export interface EntitySelectors<T, V> {
selectIds: (state: V) => EntityId[]
selectEntities: (state: V) => Dictionary<T>
selectAll: (state: V) => T[]
selectTotal: (state: V) => number
selectById: (state: V, id: EntityId) => T | undefined
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
selectId: IdSelector<T>
sortComparer: false | Comparer<T>
getInitialState(): EntityState<T>
getInitialState<S extends object>(state: S): EntityState<T> & S
getSelectors(): EntitySelectors<T, EntityState<T>>
getSelectors<V>(
selectState: (state: V) => EntityState<T>
): EntitySelectors<T, V>
}
```
