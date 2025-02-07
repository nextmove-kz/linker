/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_7tNUcA3Cge` ON `business_fields` (\n  `position`,\n  `business`\n)",
      "CREATE UNIQUE INDEX `idx_LjqSrs9ZUG` ON `business_fields` (\n  `name`,\n  `business`\n)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(7, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_7tNUcA3Cge` ON `business_fields` (`position`)",
      "CREATE UNIQUE INDEX `idx_LjqSrs9ZUG` ON `business_fields` (`name`)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("relation148074040")

  return app.save(collection)
})
