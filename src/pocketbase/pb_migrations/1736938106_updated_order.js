/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // update collection data
  unmarshal({
    "name": "orders"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // update collection data
  unmarshal({
    "name": "order"
  }, collection)

  return app.save(collection)
})
