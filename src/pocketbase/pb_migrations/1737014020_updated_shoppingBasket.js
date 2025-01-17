/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_xQDJvhl4FY` ON `shoppingBasket` (`device_id`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2493827028",
    "max": 36,
    "min": 36,
    "name": "device_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  // remove field
  collection.fields.removeById("text2493827028")

  return app.save(collection)
})
