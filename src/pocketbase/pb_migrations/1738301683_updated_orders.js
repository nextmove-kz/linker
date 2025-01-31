/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1146066909",
    "max": 12,
    "min": 12,
    "name": "phone",
    "pattern": "^\\+7\\d{10}$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(0, new Field({
    "autogeneratePattern": "[a-z0-9]{15}",
    "hidden": false,
    "id": "text3208210256",
    "max": 15,
    "min": 15,
    "name": "id",
    "pattern": "^[a-z0-9]+$",
    "presentable": true,
    "primaryKey": true,
    "required": true,
    "system": true,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // remove field
  collection.fields.removeById("text1146066909")

  // update field
  collection.fields.addAt(0, new Field({
    "autogeneratePattern": "[a-z0-9]{15}",
    "hidden": false,
    "id": "text3208210256",
    "max": 15,
    "min": 15,
    "name": "id",
    "pattern": "^[a-z0-9]+$",
    "presentable": false,
    "primaryKey": true,
    "required": true,
    "system": true,
    "type": "text"
  }))

  return app.save(collection)
})
