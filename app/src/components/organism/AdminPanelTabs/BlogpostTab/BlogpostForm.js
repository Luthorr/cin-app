import React, { useReducer, useRef, useState } from 'react';
import { Content, Form } from '../Forms.style';
import {
  Group,
  Label,
  Input,
  ButtonContainer,
  ErrorText,
} from '../../../atoms/Input/Input';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useBlogPost } from '../../../../hooks/useBlogPost';
import { toast } from 'react-toastify';

const BlogpostForm = ({
  setShowForm,
  editedBlogpost,
  setBlogposts,
  setEditedBlogpost,
}) => {
  const imageRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setShowForm(false);
    setEditedBlogpost(null);
  };

  const { postBlogPost, updateBlogpost } = useBlogPost();

  const initialState = {
    image: null,
    title: '',
    content: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'handleChange':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case 'reset':
        return initialState;
      default:
        return state;
    }
  };

  const [blogPost, dispatchBlogPost] = useReducer(
    reducer,
    editedBlogpost
      ? {
          title: editedBlogpost.title,
          content: editedBlogpost.content,
          image: editedBlogpost.image,
          id: editedBlogpost.id,
        }
      : initialState
  );

  const handleOnChange = (e, editor) => {
    const data = editor.getData();
    dispatchBlogPost({
      type: 'handleChange',
      payload: { name: 'content', value: data },
    });
  };

  const handleTextDispatch = (e) => {
    const { name, value } = e.target;
    dispatchBlogPost({
      type: 'handleChange',
      payload: {
        name,
        value,
      },
    });
  };

  const handleImageDispatch = (e) => {
    const { name } = e.target;
    dispatchBlogPost({
      type: 'handleChange',
      payload: {
        name,
        value: e.target.files[0],
      },
    });
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    if (!blogPost.title) {
      errors['title'] = 'Wprowad?? tytu?? posta';
      isValidated = false;
    }

    if (!blogPost.content) {
      errors['content'] = 'Wprowad?? zawarto???? widoczn?? dla u??ytkownik??w';
      isValidated = false;
    }

    if (!blogPost.image) {
      errors['image'] = 'Wybierz z dysku obraz wysokiej rozdzielczo??ci';
      isValidated = false;
    }

    setErrors(errors);
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) {
      return;
    }
    if (editedBlogpost) {
      const resultBlogpost = await updateBlogpost(blogPost);
      if (resultBlogpost) {
        setBlogposts((prevState) =>
          prevState.map((blogpost) =>
            blogpost.id !== resultBlogpost.id
              ? blogpost
              : { ...blogpost, ...resultBlogpost }
          )
        );
        setEditedBlogpost(null);
        toast.success('Rekord zosta?? pomy??lnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wyst??pi?? b????d podczas aktualizacji rekordu.. Spr??buj ponownie.'
        );
      }
    } else {
      const addedBlogpost = await postBlogPost(blogPost);
      if (addedBlogpost) {
        setBlogposts((prevState) => [addedBlogpost, ...prevState]);
        toast.success('Rekord zosta?? pomy??lnie dodany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wyst??pi?? b????d podczas dodawania rekordu.. Spr??buj ponownie.'
        );
      }
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label>Tytu?? posta</Label>
          <Input
            type='text'
            placeholder='Wprowad?? tytu?? posta'
            name='title'
            value={blogPost.title}
            onChange={handleTextDispatch}
          />
          {errors?.title && <ErrorText>{errors.title}</ErrorText>}
        </Group>
        <Group>
          <CKEditor
            editor={ClassicEditor}
            data={blogPost.content}
            onChange={handleOnChange}
          />
          {errors?.content && <ErrorText>{errors.content}</ErrorText>}
        </Group>
        <Group>
          <Label>Zdj??cie g????wne</Label>
          <Input
            type='file'
            ref={imageRef}
            placeholder='Wprowad?? tytu?? posta'
            name='image'
            onChange={handleImageDispatch}
          />
          {errors?.image && <ErrorText>{errors.image}</ErrorText>}
        </Group>
        <ButtonContainer>
          <OutlineButton type='button' onClick={handleCancel}>
            Anuluj
          </OutlineButton>
          <RectButton type='submit'>Zatwierd??</RectButton>
        </ButtonContainer>
      </Form>
    </Content>
  );
};

export default BlogpostForm;
