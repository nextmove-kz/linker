/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_UbeMwI9DYQ` ON `details` (\n  `device_id`,\n  `business`\n)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation148074040",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "business",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_UbeMwI9DYQ` ON `details` (`device_id`)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("relation148074040")

  return app.save(collection)
})
