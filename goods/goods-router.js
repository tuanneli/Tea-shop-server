import Router from "express";
import GoodsController from "./goods-controller.js";

const router = new Router();

router.post('/additem', GoodsController.addItem);
router.get('/getitems', GoodsController.getItems);
router.get('/getitem', GoodsController.getItem);
router.put('/changeitem', GoodsController.changeItem);
router.delete('/deleteitem', GoodsController.deleteItem);
router.post('/addcategory', GoodsController.addCategory);
router.get('/getcategories', GoodsController.getCategories);
router.put('/changecategory', GoodsController.changeCategory);
router.delete('/deletecategory', GoodsController.deleteCategory);

export default router;