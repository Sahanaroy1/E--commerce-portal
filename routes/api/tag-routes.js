const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

  // Find all tags and its associated Product data
router.get('/', async (req, res) => {

  try {
    const tagData  = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Find a single tag by its `id` and associated Product data
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // Create a new tag
router.post('/', async (req, res) => {
 
  try {
    const newTagData = await Tag.create(
      req.body
    );
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {

  try {
    const tagData = await Tag.update (
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where:{
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res.status(200).json(tagData, { message: 'No tag has been found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {

  try {
    const tagtData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagtData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagtDatas);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
