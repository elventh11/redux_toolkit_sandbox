import { useDispatch } from 'react-redux';
import { Post, addReaction } from './postsSlice';

const REACTION_EMOJI = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useDispatch();

  return (
    <div>
      {Object.entries(REACTION_EMOJI).map((reaction) => {
        const [name, emoji] = reaction as [keyof typeof REACTION_EMOJI, string];

        return (
          <button
            key={name}
            type='button'
            className='reactionButton'
            onClick={() =>
              dispatch(addReaction({ postId: post.id, reaction: name }))
            }
          >
            {emoji} {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
}

export default ReactionButtons;

type ReactionButtonsProps = { post: Post };
