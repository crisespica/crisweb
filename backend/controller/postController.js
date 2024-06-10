const Post = require("../models/post");
const fs = require("fs");
const path = require("path");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const currentDate = Date.now();
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      date: currentDate,
      category: req.body.category,
      content: req.body.content,
      imageUrl: req.files["imageFile"][0].path,
      secondImageUrl: req.files["imageFile2"][0].path,
      tags: req.body.tags,
      content2: req.body.content2,
      videoUrl: req.body.videoUrl,
    });

    const newPost = await post.save();

    const pageTitle = newPost.title.replace(/\s+/g, "-").toLowerCase(); // Convertir el título a un formato adecuado para el nombre del archivo
    const newPageContent = `
     <!DOCTYPE html>
<html data-wf-page="66095c4f9765fb9eae51e7eb">
<head>
  <script src="jquery.js"></script>
  <script src="jquery2.js"></script>
  <link rel="stylesheet" href="cloud.css">
  <link rel="stylesheet" href="style.css">
  <link href="blog.css" rel="stylesheet" type="text/css" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>aa</title>
  <script src="main.js"></script>

</head>
      <body>
      

              <div data-animation="over-left" class="navbar-transparent w-nav" data-easing2="ease" data-easing="ease"
        data-collapse="medium" role="banner" data-no-scroll="1" data-duration="400" data-doc-height="1">
        <div class="gradient"></div>
        <div class="nav-container w-container">
            <div class="nav-menu-wrapper"><a href="index.html" class=" brand w-nav-brand"><img
                        src="assets/flaticon home.png" loading="lazy" alt="logo" height="80" /></a>
                <nav role="navigation" class="nav-menu w-nav-menu">
                    <div class="tablet-menu"><a href="index.html" class="brand-tablet w-nav-brand"><img
                                src="assets/flaticon home.png" loading="lazy" alt="logo" height="40" /></a>
                  
                    </div>
                    <div class="menu-wrap">

                        <div data-hover="true" data-delay="0" data-w-id="1bba802f-7b9e-f63d-4f08-053960cc3754"
                            class="nav-dropdown w-dropdown">
                            <div class="nav-dropdown-toggle w-dropdown-toggle">
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <a href="about.html" style="color: white;">
                                            <div class="btn-title-text">About Me <span class="tablet-hidden">+</span>
                                            </div>

                                    </div>


                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">About Me +</div></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div data-hover="true" data-delay="0" data-w-id="1bba802f-7b9e-f63d-4f08-053960cc377a"
                            class="nav-dropdown w-dropdown">
                            <div class="nav-dropdown-toggle w-dropdown-toggle">
                                <div class="nav-dropdown-icon w-icon-dropdown-toggle"></div>
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <div class="btn-title-text">Works <span class="tablet-hidden">+</span></div>
                                    </div>
                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">Works +</div>
                                    </div>
                                </div>
                            </div>
                            <nav class="nav-dropdown-list w-dropdown-list">
                                <div class="nav-dropdown-link-wrapper"><a href="education.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Education</a><a href="entertaiment.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Entertaiment</a><a href="corporate.html"
                                        class="nav-dropdown-link w-dropdown-link"><span class="nav-dropdown-link-line">
                                        </span>Corporate</a>

                                </div>
                            </nav>
                        </div><a data-w-id="1bba802f-7b9e-f63d-4f08-053960cc379e" class="nav-link w-inline-block">
                            <div class="clip">
                                <div class="btn-banner-text">
                                    <div class="btn-title-text"></div>
                                </div>
                                <div class="btn-banner-text button-text-bottom">
                                    <div class="btn-title-text"></div>
                                </div>
                            </div>
                        </a>

                        <div class="nav-button-wrapper"><a data-w-id="1bba802f-7b9e-f63d-4f08-053960cc380e"
                                href="contact.html" class="nav-button w-inline-block">
                                <div class="clip">
                                    <div class="btn-banner-text">
                                        <div class="btn-title-text">Let&#x27;s Talk</div>
                                    </div>
                                    <div class="btn-banner-text button-text-bottom">
                                        <div class="btn-title-text">Let&#x27;s Talk</div>
                                    </div>
                                </div>
                            </a></div>
                    </div>
                </nav>
                <div class="menu-button w-nav-button"><img
                        src="https://assets-global.website-files.com/66095c4f9765fb9eae51e781/66095c4f9765fb9eae51e859_menu-btn.svg"
                        loading="lazy" alt="icon" height="16" class="image-burger" /></div>
            </div>
        </div>
    </div>

    <div id="posts-container">
      <div class="blog-detail-section section-spacing">
        <div class="container-medium w-container">
          <div class="blog-detail">
            <div class="blog-detail-date">Fecha del post</div>
            <h1>${newPost.title}</h1>
            <div class="blog-detail-meta">
              <div class="blog-dash"></div>
              <h2>Category: ${newPost.category}</h2>
            </div>
            <img id="blog-image" loading="eager" alt="${newPost.title}" class="blog-detail-image" src="/${newPost.imageUrl}">
            <img id="blog-image2" loading="eager" alt="${newPost.title}" class="blog-detail-image" src="/${newPost.secondImageUrl}">
            <div class="blog-rich-text">
              <div class="w-richtext">
                <h5></h5>
                <p>${newPost.content2}</p>
                <figure style="padding-bottom: 56.206088992974244%;" class="w-richtext-align-fullwidth w-richtext-figure-type-video">
                  <iframe id="video" allowfullscreen="" frameborder="0" scrolling="no" src="${newPost.videoUrl}" style="margin-top: 50px;"></iframe>
                </figure>
                <h5></h5>
                <p>${newPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
    `;

    const newPagePath = path.join(
      __dirname,
      "..",
      "public",
      "posts",
      `${pageTitle}.html`
    );
    fs.writeFileSync(newPagePath, newPageContent);

    // Enviar una respuesta con un objeto que incluye la propiedad 'success'
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
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
      return res.status(404).json({ message: "Cannot find post" });
    }

    await post.remove();
    res.json({ message: "Deleted post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostTitleById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json({ title: post.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
