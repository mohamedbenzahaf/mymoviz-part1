const express = require('express');
const Joi = require('joi');

const app = express();
const PORT = 3000;

app.use(express.json());

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Schéma des posts
const postSchema = Joi.object({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().trim().min(1).required(),
  body: Joi.string().trim().min(1).required(),
});

const commentSchema = Joi.object({
  postId: Joi.number().required(),
  id: Joi.number().required(),
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  body: Joi.string().trim().min(1).required(),
});

const photoSchema = Joi.object({
  albumId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().trim().min(1).required(),
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  thumbnailUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
});

const todoSchema = Joi.object({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().trim().min(1).required(),
  completed: Joi.boolean().required(),
});

const forbiddenWords = ['spam', 'fake'];

const complexCommentSchema = commentSchema.keys({
  email: Joi.string()
    .email()
    .pattern(/@example\.com$/)
    .required(),
  body: Joi.string()
    .trim()
    .min(1)
    .custom((value, helpers) => {
      const containsForbiddenWord = forbiddenWords.some((word) =>
        value.toLowerCase().includes(word)
      );

      if (containsForbiddenWord) {
        return helpers.error('any.custom', {
          message: `Le commentaire contient un mot interdit : ${forbiddenWords.join(', ')}`,
        });
      }

      return value;
    }, 'Vérification des mots interdits')
    .required(),
});

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(`Erreur du service externe : HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function validateList(items, schema) {
  return Joi.array().items(schema).validate(items, {
    abortEarly: false,
  });
}

// 1. Récupérer et valider un post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await fetchJson(`${BASE_URL}/posts/${req.params.id}`);
    const { error, value } = postSchema.validate(post, { abortEarly: false });

    if (error) {
      return res.status(502).json({
        error: 'Validation du post échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 2. Récupérer et valider tous les posts
app.get('/api/validate-posts', async (req, res) => {
  try {
    const posts = await fetchJson(`${BASE_URL}/posts`);
    const { error, value } = validateList(posts, postSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation des posts échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 3. Récupérer et valider les commentaires d'un post
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const comments = await fetchJson(
      `${BASE_URL}/posts/${req.params.id}/comments`
    );
    const { error, value } = validateList(comments, commentSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation des commentaires échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 4. Récupérer et valider les photos d'un album
app.get('/api/albums/:albumId/photos', async (req, res) => {
  try {
    const photos = await fetchJson(
      `${BASE_URL}/albums/${req.params.albumId}/photos`
    );
    const { error, value } = validateList(photos, photoSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation des photos échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 5. Valider les posts et vérifier que l'utilisateur existe
app.get('/api/users/:userId/validated-posts', async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId < 1) {
      return res.status(400).json({
        error: 'Identifiant utilisateur invalide',
      });
    }

    const posts = await fetchJson(
      `${BASE_URL}/posts?userId=${userId}`
    );
    const { error, value } = validateList(posts, postSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation des posts échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    const userResponse = await fetch(`${BASE_URL}/users/${userId}`);

    if (!userResponse.ok) {
      return res.status(502).json({
        error: `Impossible de vérifier l'utilisateur (HTTP ${userResponse.status})`,
      });
    }

    const user = await userResponse.json();

    if (!user || !user.id) {
      return res.status(404).json({
        error: 'Utilisateur non trouvé',
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 6. Récupérer, valider et transformer les todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await fetchJson(`${BASE_URL}/todos`);
    const { error, value } = validateList(todos, todoSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation des tâches échouée',
        details: error.details.map((detail) => detail.message),
      });
    }

    const transformedTodos = value.map((todo) => ({
      ...todo,
      status: todo.completed ? 'Done' : 'Pending',
    }));

    return res.json(transformedTodos);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

// 7. Commentaires avec validations avancées
app.get('/api/posts/:postId/complex-comments', async (req, res) => {
  try {
    const comments = await fetchJson(
      `${BASE_URL}/posts/${req.params.postId}/comments`
    );
    const { error, value } = validateList(comments, complexCommentSchema);

    if (error) {
      return res.status(502).json({
        error: 'Validation avancée des commentaires échouée',
        details: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
          type: detail.type,
        })),
      });
    }

    return res.json(value);
  } catch (error) {
    return res.status(error.status || 502).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
