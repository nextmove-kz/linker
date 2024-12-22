/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "name": "shoppingBasket"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update collection data
  unmarshal({
    "name": "shopping_basket"
  }, collection)

  return app.save(collection)
})
