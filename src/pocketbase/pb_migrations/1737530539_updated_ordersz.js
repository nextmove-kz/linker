/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180440")

  // update collection data
  unmarshal({
    "name": "orders"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180440")

  // update collection data
  unmarshal({
    "name": "ordersz"
  }, collection)

  return app.save(collection)
})
