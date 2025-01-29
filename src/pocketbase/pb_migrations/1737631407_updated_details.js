/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_UbeMwI9DYQ` ON `details` (\n  `device_id`,\n  `business`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
