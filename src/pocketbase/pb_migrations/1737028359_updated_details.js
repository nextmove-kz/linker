/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json66128583",
    "maxSize": 0,
    "name": "orderData",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // remove field
  collection.fields.removeById("json66128583")

  return app.save(collection)
})
