import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

function AddPostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave = !!title && !!content && !!userId;

  const savePost = () => {
    if (!canSave) {
      return;
    }

    dispatch(addPost(title, content, userId));

    setTitle('');
    setContent('');
    setUserId('');
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savePost();
        }}
      >
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChange}>
          <option value=''></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor='postContent'>Post Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChange}
        />

        <button type='submit' disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
