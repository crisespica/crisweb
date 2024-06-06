// postController.js

const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  // Crear un nuevo objeto Post con los datos recibidos
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    date: req.body.date,
    category: req.body.category,
    content: req.body.content,
    imageUrl: req.file.path, // Aquí utilizamos req.file para obtener la ruta de la imagen subida
    tags: req.body.tags,
    content2: req.body.content2,
    videoUrl: req.body.videoUrl
  });

  try {
    // Guardar el nuevo post en la base de datos
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.description != null) {
      post.description = req.body.description;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }

    await post.remove();
    res.json({ message: 'Deleted post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostTitleById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
    res.json({ title: post.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
