/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_xQDJvhl4FY` ON `shopping_cart` (`device_id`)"
    ],
    "name": "shopping_cart"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_xQDJvhl4FY` ON `shoppingBasket` (`device_id`)"
    ],
    "name": "shoppingBasket"
  }, collection)

  return app.save(collection)
})
