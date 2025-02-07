/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // remove field
  collection.fields.removeById("number1146066909")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2794286213",
    "max": 0,
    "min": 0,
    "name": "user_phone",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1146066909",
    "max": null,
    "min": null,
    "name": "user_phone",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text2794286213")

  return app.save(collection)
})
