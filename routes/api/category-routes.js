const router = require('express').Router();
const { Category, Product } = require('../../models');

  // Find all categories and associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value and associated product
router.get('/:id', async (req, res) => {
  
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new category 
router.post('/', async (req, res) => {

  try {
    const newCategoryData = await Category.create(
      req.body
    );
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update the name of a category where the id matches
router.put('/:id', (req, res) => {
  
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

//Delete a category with the selected id
router.delete('/:id', async (req, res) => {
  
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,     
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
