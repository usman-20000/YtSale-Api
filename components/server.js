require('./conn');
const express = require('express');
const Register = require('../components/register');
const app = express();
const cors = require('cors');
const Add = require('./add');
const Bill = require('./bill');
const Category = require('./category');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// app.post('/category', async (req, res) => {
//   try {
//     const { name, subCategory } = req.body;
//     const newCategory = new Category({ name, subcategories: [{ name: subCat }] });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error('Error creating Category', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/category', async (req, res) => {
//   try {
//     const category = await Category.find();
//     res.json(category);
//   } catch (error) {
//     console.error('Error fetching category', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.patch("/categories/:id/subcategories", async (req, res) => {
//   const { id } = req.params;
//   const { subcategoryName } = req.body;

//   try {
//     const category = await Category.findById(id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     category.subcategories.push({ name: subcategoryName });

//     const updatedCategory = await category.save();
//     res.status(200).json({
//       message: "Subcategory added successfully",
//       updatedCategory,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding subcategory", error });
//   }
// });


app.post('/bill', async (req, res) => {
  try {
    const { email, name, address, house, city, postalCode, phone, status, cart } = req.body;
    const newBill = new Bill({ email, name, address, house, city, postalCode, phone, status, cart });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    console.error('Error creating register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/bill', async (req, res) => {
  try {
    const bill = await Bill.find();
    res.json(bill);
  } catch (error) {
    console.error('Error fetching register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/bill/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedBill) {
      return res.status(404).send('Add not found');
    }
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error('Error updating add', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add', async (req, res) => {
  try {
    const { image, heading, detail, price, category } = req.body;
    const newAdd = new Add({ image, heading, detail, price, category });
    await newAdd.save();
    res.status(201).json(newAdd);
  } catch (error) {
    console.error('Error creating register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const add = await Add.findById(id);
    if (!add) {
      return res.status(404).json({ error: 'Add not found' });
    }
    res.json(add);
  } catch (error) {
    console.error('Error fetching add:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add', async (req, res) => {
  try {
    const add = await Add.find();
    res.json(add);
  } catch (error) {
    console.error('Error fetching register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/add/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { image, heading, detail, price } = req.body;
    const updatedAdd = await Add.findByIdAndUpdate(
      id,
      { image, heading, detail, price },
      { new: true, runValidators: true }
    );
    if (!updatedAdd) {
      return res.status(404).send('Add not found');
    }
    res.status(200).json(updatedAdd);
  } catch (error) {
    console.error('Error updating add', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/add/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdd = await Add.findByIdAndDelete(id);
    if (!deletedAdd) {
      return res.status(404).send('Add not found');
    }
    res.status(200).send('Add deleted successfully');
  } catch (error) {
    console.error('Error deleting add', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newRegister = new Register({ name, email, password });
    await newRegister.save();
    res.status(201).json(newRegister);
  } catch (error) {
    console.error('Error creating register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/register', async (req, res) => {
  try {
    const register = await Register.find();
    res.json(register);
  } catch (error) {
    console.error('Error fetching register', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
