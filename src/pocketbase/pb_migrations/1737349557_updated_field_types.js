/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2187738303")

  // remove field
  collection.fields.removeById("json2188556399")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2187738303")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json2188556399",
    "maxSize": 0,
    "name": "setting_schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
