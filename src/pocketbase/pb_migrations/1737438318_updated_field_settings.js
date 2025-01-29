/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_345395871")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1298824143",
    "maxSelect": 1,
    "name": "setting_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "text",
      "number",
      "boolean",
      "select"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_345395871")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1298824143",
    "maxSelect": 1,
    "name": "setting_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "text",
      "number",
      "boolean"
    ]
  }))

  return app.save(collection)
})
