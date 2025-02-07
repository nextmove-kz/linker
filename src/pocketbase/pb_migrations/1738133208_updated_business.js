/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1218262561")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_PxcL4qa70H` ON `business2` (`name`)"
    ],
    "name": "business2"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1218262561")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_PxcL4qa70H` ON `business` (`name`)"
    ],
    "name": "business"
  }, collection)

  return app.save(collection)
})
